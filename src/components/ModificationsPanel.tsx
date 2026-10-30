import { useState } from "react";
import type { Character } from "../types";
import { abilityModifier, proficiencyBonus } from "../utils";
import {
  effectiveTechPointMax,
  installMod,
  installedMods,
  itemCount,
  modDef,
  modDiscipline,
  modEffects,
  modLockReason,
  modifiableItems,
  modifiedItems,
  moveMod,
  removeMod,
  slotsPerItem,
  totalSlots,
} from "../modifications";
import HoverInfo from "./HoverInfo";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

// Engineer discipline modifications: the modified item(s), slots used, the tech point cost, and an
// install menu that shows locked options with the reason. See modifications.ts for the rules.
export default function ModificationsPanel({ character, update }: Props) {
  const [chosenTarget, setChosenTarget] = useState("");
  const d = modDiscipline(character);
  if (!d) return null;
  const def = modDef(d);
  const pb = proficiencyBonus(character.level);
  const items = modifiedItems(character, d);
  const choices = modifiableItems(character, d);
  const mods = installedMods(character, d);
  const slots = totalSlots(character, d);
  const perItem = slotsPerItem(character);
  const ownSlots = d.secondItem === "own-slots" && items.length > 1;
  const swapsPerRest = Math.max(1, abilityModifier(character.abilities.int));
  const nameOf = (id: string) => choices.find((x) => x.id === id)?.name ?? "";
  const usedOn = (id: string) => mods.filter((m) => m.itemId === id).length;

  // Where a new modification goes: the item picked under "Install on", else the first one with room.
  const hasRoom = (id: string) => !ownSlots || usedOn(id) < perItem;
  const targetItem =
    items.includes(chosenTarget) && hasRoom(chosenTarget) ? chosenTarget : (items.find(hasRoom) ?? items[0] ?? "");
  const full = mods.length >= slots || (ownSlots && !items.some(hasRoom));
  const installed = new Set(mods.map((m) => m.option.name));

  function apply(next: Character) {
    update("classSubChoicePicks", next.classSubChoicePicks);
    update("classSubChoiceDetails", next.classSubChoiceDetails);
  }

  function setItem(slot: number, id: string) {
    const ids = [...(character.modifiedItemIds ?? [])];
    while (ids.length <= slot) ids.push("");
    ids[slot] = id;
    update("modifiedItemIds", ids.slice(0, itemCount(character, d!)));
  }

  // Armormech's second item is the other kind: one suit of armor plus one shield.
  function itemOptions(slot: number) {
    if (d!.itemKind !== "armor" || slot === 0) return choices.filter((x) => x.id !== items[0] || slot === 0);
    const first = choices.find((x) => x.id === items[0]);
    return choices.filter((x) => x.id !== items[0] && (!first || x.kind !== first.kind));
  }

  const excess = Math.max(0, mods.length - pb);

  return (
    <div className="species-traits-box">
      <div className="species-traits-header">
        {d.itemLabel} · {mods.length}/{slots} slots
      </div>

      {d.itemKind &&
        Array.from({ length: itemCount(character, d) }).map((_, slot) => (
          <div className="field" key={slot}>
            <label htmlFor={`mod-item-${slot}`}>
              {slot === 0 ? "Modified item" : "Second modified item"}
              {ownSlots && items[slot] ? ` (${usedOn(items[slot])}/${perItem} slots)` : ""}
            </label>
            <select
              id={`mod-item-${slot}`}
              value={items[slot] ?? ""}
              onChange={(e) => setItem(slot, e.target.value)}
            >
              <option value="">Not chosen</option>
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
        ))}

      {mods.length > 0 ? (
        <div className="armor-equip-list">
          {mods.map((m) => {
            const effects = modEffects(m.option, character.level);
            return (
              <div key={`${m.option.name}-${m.index}`} className="armor-equip-row is-readonly">
                <span className="armor-equip-text">
                  <HoverInfo title={m.option.name} lines={[m.option.text, ...(m.option.prerequisite ? [`Prerequisite: ${m.option.prerequisite}`] : [])]}>
                    <span className="armor-equip-name">{m.option.name}</span>
                  </HoverInfo>
                  <span className="armor-equip-meta">
                    {effects.length === 0
                      ? "Ability (tap the name for details)"
                      : d.itemKind && !m.itemId
                        ? "Pick the modified item to apply it"
                        : "Applied to the sheet"}
                    {items.length > 1 ? "" : m.itemId ? ` · on ${nameOf(m.itemId)}` : ""}
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
                  onClick={() => apply(removeMod(character, d, m.index))}
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

      {items.length > 1 && (
        <div className="field">
          <label htmlFor="mod-target">Install on</label>
          <select id="mod-target" value={targetItem} onChange={(e) => setChosenTarget(e.target.value)}>
            {items.map((id) => (
              <option key={id} value={id} disabled={!hasRoom(id)}>
                {nameOf(id)}
                {hasRoom(id) ? "" : " (full)"}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="field">
        <label htmlFor="mod-install">Install a modification</label>
        <select
          id="mod-install"
          value=""
          disabled={full}
          onChange={(e) => e.target.value && apply(installMod(character, d, e.target.value, targetItem))}
        >
          <option value="">{full ? "All slots are full" : "Choose…"}</option>
          {def.options
            .filter((o) => !installed.has(o.name))
            .map((o) => ({ o, lock: modLockReason(character, d, o, targetItem) }))
            .sort((a, b) => Number(Boolean(a.lock)) - Number(Boolean(b.lock)) || a.o.name.localeCompare(b.o.name))
            .map(({ o, lock }) => (
              <option key={o.name} value={o.name} disabled={Boolean(lock)}>
                {o.name}
                {lock ? ` (locked: ${lock})` : ""}
              </option>
            ))}
        </select>
      </div>

      <p className="section-hint">
        {excess > 0
          ? `${mods.length} installed with proficiency bonus ${pb}: tech point maximum −${excess} (now ${effectiveTechPointMax(character)}). `
          : `Up to ${pb} modifications (your proficiency bonus) cost nothing; each one past that lowers your tech point maximum by 1. `}
        Over a long rest you can install, replace or remove up to {swapsPerRest} (your Intelligence modifier, minimum 1).
      </p>
    </div>
  );
}
