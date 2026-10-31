import { useState } from "react";
import type { Character } from "../types";
import { proficiencyBonus } from "../utils";
import {
  effectiveTechPointMax,
  installMod,
  installedMods,
  itemCount,
  modChangeAllowed,
  modChangesLeft,
  modChangesPerRest,
  modDef,
  modDiscipline,
  modEffects,
  modLockReason,
  modifiableItems,
  modifiedItems,
  moveMod,
  recordModChange,
  removeMod,
  slotsPerItem,
  totalSlots,
} from "../modifications";
import HoverInfo from "./HoverInfo";
import SectionHeader from "./SectionHeader";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

// Engineer discipline modifications: slots used of the engineer table's maximum, the modified item(s),
// a menu of the discipline's modifications (locked ones show why), and what's installed. Any number of
// modifications can be chosen; only the item's slots limit them. Rules live in modifications.ts.
export default function ModificationsSection({ character, update, collapsedSections, onToggleSection }: Props) {
  const [chosenTarget, setChosenTarget] = useState("");
  const [selected, setSelected] = useState("");
  const [freeEdit, setFreeEdit] = useState(false);
  const d = modDiscipline(character);
  if (!d) return null;
  const collapsed = !!collapsedSections["modifications"];
  const def = modDef(d);
  const pb = proficiencyBonus(character.level);
  const items = modifiedItems(character, d);
  const choices = modifiableItems(character, d);
  const mods = installedMods(character, d);
  const slots = totalSlots(character, d);
  const perItem = slotsPerItem(character);
  const ownSlots = d.secondItem === "own-slots" && items.length > 1;
  const swapsPerRest = modChangesPerRest(character);
  const changesLeft = modChangesLeft(character);
  // Free edit (not saved) lifts the long-rest limit for building the character or a GM's okay.
  const canChange = (name: string, kind: "install" | "remove") => freeEdit || modChangeAllowed(character, name, kind);
  const nameOf = (id: string) => choices.find((x) => x.id === id)?.name ?? "";
  const usedOn = (id: string) => mods.filter((m) => m.itemId === id).length;
  const excess = Math.max(0, mods.length - pb);

  // Where a new modification goes: the item picked under "Install on", else the first one with room.
  const hasRoom = (id: string) => !ownSlots || usedOn(id) < perItem;
  const targetItem =
    items.includes(chosenTarget) && hasRoom(chosenTarget) ? chosenTarget : (items.find(hasRoom) ?? items[0] ?? "");
  const full = mods.length >= slots || (ownSlots && !items.some(hasRoom));
  const installed = new Set(mods.map((m) => m.option.name));
  const menu = def.options
    .filter((o) => !installed.has(o.name))
    .map((o) => ({ o, lock: modLockReason(character, d, o, targetItem) }))
    .sort((a, b) => Number(Boolean(a.lock)) - Number(Boolean(b.lock)) || a.o.name.localeCompare(b.o.name));
  const preview = menu.find((x) => x.o.name === selected) ?? null;

  function apply(next: Character) {
    update("classSubChoicePicks", next.classSubChoicePicks);
    update("classSubChoiceDetails", next.classSubChoiceDetails);
    if (next.modRestChanges !== character.modRestChanges) update("modRestChanges", next.modRestChanges);
  }

  // Counts against the long-rest limit unless Free edit is on.
  function counted(next: Character, name: string, kind: "install" | "remove") {
    return freeEdit ? next : recordModChange(next, name, kind);
  }

  function setItem(slot: number, id: string) {
    const ids = [...(character.modifiedItemIds ?? [])];
    while (ids.length <= slot) ids.push("");
    ids[slot] = id;
    update("modifiedItemIds", ids.slice(0, itemCount(character, d!)));
  }

  // Armormech's second item is the other kind: one suit of armor plus one shield.
  function itemOptions(slot: number) {
    if (slot === 0) return choices;
    const first = choices.find((x) => x.id === items[0]);
    return choices.filter((x) => x.id !== items[0] && (d!.itemKind !== "armor" || !first || x.kind !== first.kind));
  }

  function install() {
    if (!preview || preview.lock || full || !canChange(preview.o.name, "install")) return;
    apply(counted(installMod(character, d!, preview.o.name, targetItem), preview.o.name, "install"));
    setSelected("");
  }

  return (
    <section className="sheet-section modifications-section">
      <SectionHeader title="Modifications" collapsed={collapsed} onToggle={() => onToggleSection("modifications")} />
      {!collapsed && (
        <>
          <p className="section-hint">
            {d.archetype}: {d.itemLabel}
          </p>

          <div className="combat-grid">
            <div className="field">
              <label>Slots Used</label>
              <HoverInfo
                title="Modification Slots"
                lines={[
                  `${perItem} slots per item at level ${character.level} (engineer table).`,
                  ...(slots > perItem && d.secondItem === "own-slots" ? ["Your second modified item has its own slots."] : []),
                  ...(d.secondItem === "shared-slots" && character.level >= 9 ? ["Your two lightsabers share these slots."] : []),
                ]}
              >
                <div className="readonly-box">
                  {mods.length} / {slots}
                </div>
              </HoverInfo>
            </div>
            <div className="field">
              <label>Tech Point Cost</label>
              <HoverInfo
                title="Tech Point Cost"
                lines={[
                  `Up to ${pb} modifications (your proficiency bonus) are free.`,
                  "Each one past that lowers your tech point maximum by 1.",
                  `Effective tech point maximum: ${effectiveTechPointMax(character)}.`,
                ]}
              >
                <div className="readonly-box">{excess > 0 ? `−${excess}` : "None"}</div>
              </HoverInfo>
            </div>
            <div className="field">
              <label>Changes Left</label>
              <HoverInfo
                title="Changes per Long Rest"
                lines={[
                  `Over a long rest you can install, replace or remove up to ${swapsPerRest} modifications (your Intelligence modifier, minimum 1).`,
                  "Each install or removal counts; a removal plus an install is one replacement. Undoing a change you made since your last long rest is free.",
                  "A long rest resets this. Turn on Free edit below while building the character.",
                ]}
              >
                <div className="readonly-box">
                  {freeEdit ? "Free edit" : `${changesLeft} / ${swapsPerRest}`}
                </div>
              </HoverInfo>
            </div>
          </div>

          {d.itemKind ? (
            Array.from({ length: itemCount(character, d) }).map((_, slot) => (
              <div className="field" key={slot}>
                <label htmlFor={`mod-item-${slot}`}>
                  {slot === 0 ? d.itemLabel : "Second Modified Item"}
                  {ownSlots && items[slot] ? ` (${usedOn(items[slot])}/${perItem} slots)` : ""}
                </label>
                <select id={`mod-item-${slot}`} value={items[slot] ?? ""} onChange={(e) => setItem(slot, e.target.value)}>
                  <option value="">Choose the item…</option>
                  {itemOptions(slot).map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
                {choices.length === 0 && (
                  <p className="section-hint">
                    Add the {d.itemKind === "armor" ? "armor or shield" : d.itemKind} to your{" "}
                    {d.itemKind === "armor" ? "Equipment" : "Weapons"} first, then pick it here.
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="field">
              <label>Modified Item</label>
              <div className="readonly-box">{d.itemLabel}</div>
            </div>
          )}

          <div className="field">
            <label htmlFor="mod-install">Choose a Modification</label>
            <select id="mod-install" value={selected} disabled={full} onChange={(e) => setSelected(e.target.value)}>
              <option value="">{full ? "All slots are full" : "Choose…"}</option>
              {menu.map(({ o, lock }) => (
                <option key={o.name} value={o.name} disabled={Boolean(lock)}>
                  {o.name}
                  {lock ? ` (locked: ${lock})` : ""}
                </option>
              ))}
            </select>
            {preview && (
              <div className="species-traits-box">
                <div className="species-traits-header">{preview.o.name}</div>
                {preview.o.prerequisite && <p className="section-hint">Prerequisite: {preview.o.prerequisite}</p>}
                <p className="species-trait-line">{preview.o.text}</p>
              </div>
            )}
            {items.length > 1 && (
              <>
                <label htmlFor="mod-target">Install on</label>
                <select id="mod-target" value={targetItem} onChange={(e) => setChosenTarget(e.target.value)}>
                  {items.map((id) => (
                    <option key={id} value={id} disabled={!hasRoom(id)}>
                      {nameOf(id)}
                      {hasRoom(id) ? "" : " (full)"}
                    </option>
                  ))}
                </select>
              </>
            )}
            <button
              type="button"
              className="btn btn-primary btn-small"
              disabled={!preview || Boolean(preview.lock) || full || !canChange(preview.o.name, "install")}
              onClick={install}
            >
              Install
            </button>
            {preview && !preview.lock && !full && !canChange(preview.o.name, "install") && (
              <p className="section-hint">No changes left until your next long rest.</p>
            )}
          </div>

          <div className="field">
            <label>Current Modifications</label>
            {mods.length > 0 ? (
              <div className="armor-equip-list">
                {mods.map((m) => {
                  const effects = modEffects(m.option, character.level);
                  return (
                    <div key={`${m.option.name}-${m.index}`} className="armor-equip-row is-readonly">
                      <span className="armor-equip-text">
                        <HoverInfo
                          title={m.option.name}
                          lines={[m.option.text, ...(m.option.prerequisite ? [`Prerequisite: ${m.option.prerequisite}`] : [])]}
                        >
                          <span className="armor-equip-name">{m.option.name}</span>
                        </HoverInfo>
                        <span className="armor-equip-meta">
                          {effects.length === 0
                            ? "Ability (tap the name for details)"
                            : d.itemKind && !m.itemId
                              ? "Choose the modified item to apply it"
                              : "Applied to the sheet"}
                          {items.length === 1 && m.itemId ? ` · on ${nameOf(m.itemId)}` : ""}
                        </span>
                        {items.length > 1 && (
                          <select
                            aria-label={`Item for ${m.option.name}`}
                            value={m.itemId}
                            onChange={(e) => apply(moveMod(character, d, m.index, e.target.value))}
                          >
                            {items.map((id) => (
                              <option key={id} value={id} disabled={ownSlots && id !== m.itemId && usedOn(id) >= perItem}>
                                on {nameOf(id)}
                              </option>
                            ))}
                          </select>
                        )}
                      </span>
                      <button
                        type="button"
                        className="btn btn-secondary btn-small"
                        disabled={!canChange(m.option.name, "remove")}
                        title={canChange(m.option.name, "remove") ? undefined : "No changes left until your next long rest"}
                        onClick={() => apply(counted(removeMod(character, d, m.index), m.option.name, "remove"))}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="section-hint">No modifications installed yet.</p>
            )}
          </div>

          <div className="mod-free-edit">
            <label className="crafting-check">
              <input type="checkbox" checked={freeEdit} onChange={(e) => setFreeEdit(e.target.checked)} />{" "}
              Free edit (building the character, or your GM allows it)
            </label>
          </div>
        </>
      )}
    </section>
  );
}
