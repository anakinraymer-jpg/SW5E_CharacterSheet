import { useState } from "react";
import type { AbilityKey, CustomItem } from "../types";
import { ARMOR_CATALOG } from "../data/armor";
import { WEAPON_CATALOG } from "../data/weapons";
import { ABILITY_LABEL } from "../speciesLogic";
import {
  customItemSummary,
  loadCustomItemLibrary,
  newCustomItem,
  saveCustomItemLibrary,
} from "../customItems";
import Modal from "./Modal";
import NumberInput from "./NumberInput";

interface Props {
  onClose: () => void;
  onAdd: (item: CustomItem) => void;
}

const ABILITY_KEYS: AbilityKey[] = ["str", "dex", "con", "int", "wis", "cha"];
const OFFICIAL_NAMES = new Set([
  ...ARMOR_CATALOG.map((a) => a.name.toLowerCase()),
  ...WEAPON_CATALOG.map((w) => w.name.toLowerCase()),
]);

// Lets a custom item name collide with an official armor/weapon only if it is changed, because the
// sheet matches armor and weapons by name.
function uniqueName(name: string): string {
  const trimmed = name.trim();
  return OFFICIAL_NAMES.has(trimmed.toLowerCase()) ? `${trimmed} (Custom)` : trimmed;
}

export default function CustomItemDialog({ onClose, onAdd }: Props) {
  const [library, setLibrary] = useState<CustomItem[]>(() => loadCustomItemLibrary());
  const [draft, setDraft] = useState<CustomItem | null>(null);

  function persist(next: CustomItem[]) {
    setLibrary(next);
    saveCustomItemLibrary(next);
  }

  function patch(p: Partial<CustomItem>) {
    setDraft((d) => (d ? { ...d, ...p } : d));
  }

  function saveDraft(): CustomItem | null {
    if (!draft || !draft.name.trim()) return null;
    const item: CustomItem = { ...draft, name: uniqueName(draft.name) };
    persist(library.some((i) => i.id === item.id) ? library.map((i) => (i.id === item.id ? item : i)) : [...library, item]);
    return item;
  }

  if (draft) {
    const bonus = draft.abilityBonus ?? {};
    return (
      <Modal
        title={library.some((i) => i.id === draft.id) ? "Edit custom item" : "New custom item"}
        onClose={onClose}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setDraft(null)}>
              Back
            </button>
            <button
              className="btn btn-secondary"
              disabled={!draft.name.trim()}
              onClick={() => {
                if (saveDraft()) setDraft(null);
              }}
            >
              Save to library
            </button>
            <button
              className="btn btn-primary"
              disabled={!draft.name.trim()}
              onClick={() => {
                const item = saveDraft();
                if (item) onAdd(item);
              }}
            >
              Save &amp; add to character
            </button>
          </>
        }
      >
        <div className="choice-group">
          <div className="choice-selects">
            <input
              type="text"
              placeholder="Item name"
              value={draft.name}
              onChange={(e) => patch({ name: e.target.value })}
            />
            <select value={draft.kind} onChange={(e) => patch({ kind: e.target.value as CustomItem["kind"] })}>
              <option value="gear">Gear / wearable</option>
              <option value="weapon">Weapon</option>
              <option value="armor">Armor</option>
              <option value="shield">Shield</option>
            </select>
            <label className="feature-used-toggle">
              Weight (kg)
              <NumberInput value={draft.weight} onValue={(n) => patch({ weight: n })} min={0} step={0.5} />
            </label>
          </div>
        </div>

        {draft.kind === "weapon" && (
          <div className="choice-group">
            <div className="choice-group-label">Weapon</div>
            <div className="choice-selects">
              <select
                value={draft.weaponStyle ?? "melee"}
                onChange={(e) => patch({ weaponStyle: e.target.value as "melee" | "ranged" })}
              >
                <option value="melee">Melee (Strength)</option>
                <option value="ranged">Blaster / ranged (Dexterity)</option>
              </select>
              <input
                type="text"
                placeholder="Damage, e.g. 1d8 Energy"
                value={draft.damage ?? ""}
                onChange={(e) => patch({ damage: e.target.value })}
              />
              <input
                type="text"
                placeholder="Range, e.g. 80/320"
                value={draft.range ?? ""}
                onChange={(e) => patch({ range: e.target.value })}
              />
              <input
                type="text"
                placeholder="Properties, e.g. Finesse, Light"
                value={draft.property ?? ""}
                onChange={(e) => patch({ property: e.target.value })}
              />
            </div>
            <div className="choice-selects">
              <label className="feature-used-toggle">
                Attack bonus
                <NumberInput value={draft.attackBonus ?? 0} onValue={(n) => patch({ attackBonus: n })} min={-10} max={10} />
              </label>
              <label className="feature-used-toggle">
                Damage bonus
                <NumberInput value={draft.damageBonus ?? 0} onValue={(n) => patch({ damageBonus: n })} min={-10} max={10} />
              </label>
            </div>
          </div>
        )}

        {(draft.kind === "armor" || draft.kind === "shield") && (
          <div className="choice-group">
            <div className="choice-group-label">{draft.kind === "armor" ? "Armor" : "Shield"}</div>
            <div className="choice-selects">
              {draft.kind === "armor" && (
                <select
                  value={draft.armorType ?? "Light"}
                  onChange={(e) => patch({ armorType: e.target.value as CustomItem["armorType"] })}
                >
                  <option value="Light">Light</option>
                  <option value="Medium">Medium</option>
                  <option value="Heavy">Heavy</option>
                </select>
              )}
              <label className="feature-used-toggle">
                {draft.kind === "armor" ? "Base AC" : "AC bonus"}
                <NumberInput
                  value={draft.baseAc ?? (draft.kind === "shield" ? 2 : 11)}
                  onValue={(n) => patch({ baseAc: n })}
                  min={0}
                  max={30}
                />
              </label>
              {draft.kind === "armor" && (
                <select
                  value={draft.dexMode ?? "none"}
                  onChange={(e) => patch({ dexMode: e.target.value as CustomItem["dexMode"] })}
                >
                  <option value="none">No Dex bonus</option>
                  <option value="full">+ Dex modifier</option>
                  <option value="max">+ Dex modifier (capped)</option>
                </select>
              )}
              {draft.kind === "armor" && draft.dexMode === "max" && (
                <label className="feature-used-toggle">
                  Dex cap
                  <NumberInput value={draft.dexMax ?? 2} onValue={(n) => patch({ dexMax: n })} min={0} max={10} />
                </label>
              )}
            </div>
          </div>
        )}

        <div className="choice-group">
          <div className="choice-group-label">Bonuses while equipped</div>
          <div className="choice-selects">
            <label className="feature-used-toggle">
              AC
              <NumberInput value={draft.acBonus ?? 0} onValue={(n) => patch({ acBonus: n })} min={-10} max={10} />
            </label>
            <label className="feature-used-toggle">
              Speed (ft)
              <NumberInput value={draft.speedBonus ?? 0} onValue={(n) => patch({ speedBonus: n })} min={-30} max={60} step={5} />
            </label>
          </div>
          <div className="choice-selects">
            {ABILITY_KEYS.map((a) => (
              <label key={a} className="feature-used-toggle">
                {ABILITY_LABEL[a]}
                <NumberInput
                  value={bonus[a] ?? 0}
                  onValue={(n) => patch({ abilityBonus: { ...bonus, [a]: n } })}
                  min={-10}
                  max={10}
                />
              </label>
            ))}
          </div>
          <p className="section-hint">
            Tick Equipped for the item (Armor, Shield, Protections in Combat, or Weapons) to switch these on.
            Anything else (skill bonuses, special effects) goes in the notes.
          </p>
        </div>

        <textarea
          rows={3}
          placeholder="Notes / special effects"
          value={draft.notes}
          onChange={(e) => patch({ notes: e.target.value })}
        />
      </Modal>
    );
  }

  return (
    <Modal
      title="Custom items"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => setDraft(newCustomItem())}>
            + New custom item
          </button>
        </>
      }
    >
      <p className="section-hint">
        Your saved items (kept on this device). Adding one copies it to the character, so later edits here don't
        change items already added.
      </p>
      {library.length === 0 && <p className="section-hint">No custom items yet.</p>}
      <div className="armor-equip-list">
        {library.map((item) => (
          <div key={item.id} className="armor-equip-row is-readonly">
            <span className="armor-equip-text">
              <span className="armor-equip-name">
                {item.name} <small>({item.kind})</small>
              </span>
              <span className="armor-equip-meta">{customItemSummary(item)}</span>
            </span>
            <button className="btn btn-primary btn-small" onClick={() => onAdd(item)}>
              Add
            </button>
            <button className="btn btn-secondary btn-small" onClick={() => setDraft({ ...item })}>
              Edit
            </button>
            <button
              className="btn btn-danger btn-small"
              onClick={() => persist(library.filter((i) => i.id !== item.id))}
              aria-label={`Delete ${item.name}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
