import { useState } from "react";
import type { AbilityKey, CustomItem, CustomItemAbility } from "../types";
import { ARMOR_CATALOG } from "../data/armor";
import { WEAPON_CATALOG } from "../data/weapons";
import { ARMOR_PROPERTY_DEFINITIONS, WEAPON_PROPERTY_DEFINITIONS } from "../data/legend";
import { FORCE_POWER_OPTIONS, TECH_POWER_OPTIONS, WEAPON_OPTIONS, powerInfoLines } from "../pickerCatalogs";
import { propertyBaseName, splitPropertyTokens } from "../propertyLegend";
import { ABILITY_LABEL } from "../speciesLogic";
import {
  customItemSummary,
  loadCustomItemLibrary,
  newCustomItem,
  saveCustomItemLibrary,
} from "../customItems";
import Modal from "./Modal";
import NumberInput from "./NumberInput";
import PickerDialog from "./PickerDialog";
import type { PickerOption } from "./PickerDialog";

interface Props {
  onClose: () => void;
  onAdd: (item: CustomItem) => void;
}

const ABILITY_KEYS: AbilityKey[] = ["str", "dex", "con", "int", "wis", "cha"];
const DICE = [4, 6, 8, 10, 12, 20];
const DAMAGE_TYPES = ["Kinetic", "Energy", "Ion", "Acid", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Poison", "Psychic", "Sonic"];
const OFFICIAL_NAMES = new Set([
  ...ARMOR_CATALOG.map((a) => a.name.toLowerCase()),
  ...WEAPON_CATALOG.map((w) => w.name.toLowerCase()),
]);
// Existing weapons and armor that a custom item can start from.
const BASE_OPTIONS: PickerOption[] = [
  ...WEAPON_OPTIONS.map((o) => ({ ...o, group: `Weapon: ${o.group}` })),
  ...ARMOR_CATALOG.map((a) => ({ name: a.name, group: `Armor: ${a.type}`, subtitle: a.ac })),
];

// Lets a custom item name collide with an official armor/weapon only if it is changed, because the
// sheet matches armor and weapons by name.
function uniqueName(name: string): string {
  const trimmed = name.trim();
  return OFFICIAL_NAMES.has(trimmed.toLowerCase()) ? `${trimmed} (Custom)` : trimmed;
}

// Fills a draft from an official weapon or armor so only the differences need editing.
function draftFromCatalog(base: CustomItem, name: string): CustomItem {
  const w = WEAPON_CATALOG.find((x) => x.name === name);
  if (w) {
    const range = w.property.match(/range\s+(\d+\/\d+)/i)?.[1];
    return {
      ...base,
      name: w.name,
      kind: "weapon",
      weight: w.weight,
      weaponStyle: /blaster/i.test(w.type) ? "ranged" : "melee",
      damage: w.damage,
      property: w.property,
      range: range ?? "Melee",
    };
  }
  const a = ARMOR_CATALOG.find((x) => x.name === name);
  if (!a) return base;
  const ac = a.ac.trim();
  const shield = a.type === "Shield";
  const num = Number(ac.match(/\d+/)?.[0] ?? (shield ? 2 : 10));
  const cap = ac.match(/max\s*(\d+)/i)?.[1];
  return {
    ...base,
    name: a.name,
    kind: shield ? "shield" : "armor",
    weight: a.weight,
    armorType: shield ? undefined : (a.type as CustomItem["armorType"]),
    baseAc: num,
    dexMode: shield ? undefined : /dex/i.test(ac) ? (cap ? "max" : "full") : "none",
    dexMax: cap ? Number(cap) : undefined,
    property: a.property,
  };
}

function parseDamage(damage: string): { count: number; die: number; type: string } | null {
  const m = damage.trim().match(/^(\d+)d(\d+)\s*(.*)$/i);
  return m ? { count: Number(m[1]), die: Number(m[2]), type: m[3].trim() } : null;
}

export default function CustomItemDialog({ onClose, onAdd }: Props) {
  const [library, setLibrary] = useState<CustomItem[]>(() => loadCustomItemLibrary());
  const [draft, setDraft] = useState<CustomItem | null>(null);
  const [picker, setPicker] = useState<"base" | "Force" | "Tech" | null>(null);

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
    const abilities = draft.abilities ?? [];
    const powers = draft.powers ?? [];
    const dmg = parseDamage(draft.damage ?? "");
    const isArmorLike = draft.kind === "armor" || draft.kind === "shield";
    const propertyDefs = draft.kind === "weapon" ? WEAPON_PROPERTY_DEFINITIONS : isArmorLike ? ARMOR_PROPERTY_DEFINITIONS : [];
    const propertyTokens = splitPropertyTokens(draft.property ?? "");
    const hasProperty = (name: string) => propertyTokens.some((t) => propertyBaseName(t).toLowerCase() === name.toLowerCase());
    function toggleProperty(name: string) {
      const next = hasProperty(name)
        ? propertyTokens.filter((t) => propertyBaseName(t).toLowerCase() !== name.toLowerCase())
        : [...propertyTokens, name];
      patch({ property: next.join(", ") });
    }
    function patchAbility(id: string, p: Partial<CustomItemAbility>) {
      patch({ abilities: abilities.map((a) => (a.id === id ? { ...a, ...p } : a)) });
    }
    function setDice(p: Partial<{ count: number; die: number; type: string }>) {
      const cur = dmg ?? { count: 1, die: 6, type: "" };
      const next = { ...cur, ...p };
      patch({ damage: `${next.count}d${next.die}${next.type ? ` ${next.type}` : ""}` });
    }

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
          <button className="btn btn-secondary btn-small" onClick={() => setPicker("base")}>
            Start from an existing weapon or armor…
          </button>
        </div>
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
                placeholder="Range, e.g. 80/320"
                value={draft.range ?? ""}
                onChange={(e) => patch({ range: e.target.value })}
              />
            </div>
            <div className="choice-selects">
              <label className="feature-used-toggle">
                Dice
                <NumberInput value={dmg?.count ?? 1} onValue={(n) => setDice({ count: n })} min={1} max={20} />
              </label>
              <select value={dmg?.die ?? 6} onChange={(e) => setDice({ die: Number(e.target.value) })}>
                {DICE.map((d) => (
                  <option key={d} value={d}>
                    d{d}
                  </option>
                ))}
              </select>
              <select
                value={dmg && DAMAGE_TYPES.includes(dmg.type) ? dmg.type : ""}
                onChange={(e) => setDice({ type: e.target.value })}
              >
                <option value="">Type…</option>
                {DAMAGE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Damage as text, e.g. 1d8 Energy (edit freely for anything unusual)"
              value={draft.damage ?? ""}
              onChange={(e) => patch({ damage: e.target.value })}
            />
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

        {isArmorLike && (
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

        {propertyDefs.length > 0 && (
          <div className="choice-group">
            <div className="choice-group-label">Properties</div>
            <div className="chip-row">
              {propertyDefs.map((d) => (
                <button
                  key={d.name}
                  type="button"
                  title={d.description}
                  aria-pressed={hasProperty(d.name)}
                  className={`btn btn-small ${hasProperty(d.name) ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => toggleProperty(d.name)}
                >
                  {d.name}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Properties with numbers, e.g. Burst 4, Reload 8, Strength 13"
              value={draft.property ?? ""}
              onChange={(e) => patch({ property: e.target.value })}
            />
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
          <div className="choice-selects">
            <label className="feature-used-toggle">
              Force save DC
              <NumberInput value={draft.forceDcBonus ?? 0} onValue={(n) => patch({ forceDcBonus: n })} min={-10} max={10} />
            </label>
            <label className="feature-used-toggle">
              Force attack
              <NumberInput value={draft.forceAttackBonus ?? 0} onValue={(n) => patch({ forceAttackBonus: n })} min={-10} max={10} />
            </label>
            <label className="feature-used-toggle">
              Tech save DC
              <NumberInput value={draft.techDcBonus ?? 0} onValue={(n) => patch({ techDcBonus: n })} min={-10} max={10} />
            </label>
            <label className="feature-used-toggle">
              Tech attack
              <NumberInput value={draft.techAttackBonus ?? 0} onValue={(n) => patch({ techAttackBonus: n })} min={-10} max={10} />
            </label>
          </div>
          <p className="section-hint">
            Tick Equipped for the item (Armor, Shield, Protections in Combat, or Weapons) to switch these on.
          </p>
        </div>

        <div className="choice-group">
          <div className="choice-group-label">Powers it grants (while equipped)</div>
          <div className="chip-row">
            {powers.map((p) => (
              <span key={`${p.type}-${p.name}`} className="info-chip">
                {p.name} <small>({p.type})</small>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => patch({ powers: powers.filter((x) => x !== p) })}
                  aria-label={`Remove ${p.name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="choice-selects">
            <button className="btn btn-secondary btn-small" onClick={() => setPicker("Force")}>
              + Force power
            </button>
            <button className="btn btn-secondary btn-small" onClick={() => setPicker("Tech")}>
              + Tech power
            </button>
          </div>
        </div>

        <div className="choice-group">
          <div className="choice-group-label">Abilities</div>
          <p className="section-hint">
            Passive abilities are always on while equipped. Activated ones get an on/off button in Class Features
            (Stances). AC and speed numbers are optional.
          </p>
          {abilities.map((ab) => (
            <div key={ab.id} className="choice-group">
              <div className="choice-selects">
                <input
                  type="text"
                  placeholder="Ability name"
                  value={ab.name}
                  onChange={(e) => patchAbility(ab.id, { name: e.target.value })}
                />
                <select value={ab.active ? "active" : "passive"} onChange={(e) => patchAbility(ab.id, { active: e.target.value === "active" })}>
                  <option value="passive">Passive</option>
                  <option value="active">Activated (toggle)</option>
                </select>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => patch({ abilities: abilities.filter((a) => a.id !== ab.id) })}
                  aria-label={`Remove ${ab.name || "ability"}`}
                >
                  ×
                </button>
              </div>
              <textarea
                rows={2}
                placeholder="What it does"
                value={ab.text}
                onChange={(e) => patchAbility(ab.id, { text: e.target.value })}
              />
              <div className="choice-selects">
                <label className="feature-used-toggle">
                  AC
                  <NumberInput value={ab.acBonus ?? 0} onValue={(n) => patchAbility(ab.id, { acBonus: n })} min={-10} max={10} />
                </label>
                <label className="feature-used-toggle">
                  Speed (ft)
                  <NumberInput value={ab.speedBonus ?? 0} onValue={(n) => patchAbility(ab.id, { speedBonus: n })} min={-30} max={60} step={5} />
                </label>
              </div>
            </div>
          ))}
          <button
            className="btn btn-secondary btn-small"
            onClick={() =>
              patch({ abilities: [...abilities, { id: crypto.randomUUID(), name: "", text: "", active: false }] })
            }
          >
            + Add ability
          </button>
        </div>

        <textarea
          rows={3}
          placeholder="Notes / other effects (skill bonuses, anything the sheet can't apply)"
          value={draft.notes}
          onChange={(e) => patch({ notes: e.target.value })}
        />

        {picker === "base" && (
          <PickerDialog
            title="Start from…"
            options={BASE_OPTIONS}
            onClose={() => setPicker(null)}
            onPick={(name) => {
              setDraft((d) => (d ? draftFromCatalog(d, name) : d));
              setPicker(null);
            }}
          />
        )}
        {(picker === "Force" || picker === "Tech") && (
          <PickerDialog
            title={`Add a ${picker} power`}
            options={picker === "Force" ? FORCE_POWER_OPTIONS : TECH_POWER_OPTIONS}
            getDetails={(name) => powerInfoLines({ name, type: picker, description: "" })}
            allowCustom
            onClose={() => setPicker(null)}
            onPick={(name) => {
              const type = picker;
              setPicker(null);
              if (!powers.some((p) => p.name === name && p.type === type)) {
                patch({ powers: [...powers, { name, type }] });
              }
            }}
          />
        )}
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
