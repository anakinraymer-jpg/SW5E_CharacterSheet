import { useState } from "react";
import type { AbilityKey, Character, Companion, CompanionNature, CompanionTraitDef } from "../types";
import { COMPANION_NATURES } from "../data/companions";
import {
  COMPANION_NATURE_BY_NAME,
  FOLLOWER_FEATURES,
  companionAsiCount,
  companionLevel,
  companionMaxHp,
  companionProficiencyBonus,
  companionTraitSlots,
  companionVariantDef,
  createCompanion,
  traitAllowsRepeats,
  traitEligibility,
  traitPrerequisite,
  withCompanionVariant,
} from "../companionLogic";
import { abilityModifier, formatModifier } from "../utils";
import HoverInfo from "./HoverInfo";
import NumberInput from "./NumberInput";
import PickerDialog, { type PickerOption } from "./PickerDialog";
import SectionHeader from "./SectionHeader";

const ABILITIES: { key: AbilityKey; label: string }[] = [
  { key: "str", label: "Strength" },
  { key: "dex", label: "Dexterity" },
  { key: "con", label: "Constitution" },
  { key: "int", label: "Intelligence" },
  { key: "wis", label: "Wisdom" },
  { key: "cha", label: "Charisma" },
];

const COMPANION_CLASSES = [
  "Berserker",
  "Consular",
  "Engineer",
  "Fighter",
  "Guardian",
  "Monk",
  "Operative",
  "Scholar",
  "Scout",
  "Sentinel",
];

const NATURE_OPTIONS: PickerOption[] = COMPANION_NATURES.map((n) => ({
  name: n.nature,
  subtitle: `Requires: ${n.prerequisite}`,
}));

function natureDetails(name: string): string[] {
  const def = COMPANION_NATURE_BY_NAME.get(name as CompanionNature);
  if (!def) return [];
  return [def.summary, `Prerequisite: ${def.prerequisite}`, `${def.traits.length} traits to choose from.`].filter(Boolean);
}

// Pulls "Label: value" out of the feature lines (e.g. "Speed: 20 ft.").
function lineValue(lines: string[], label: string): string {
  const prefix = `${label}: `;
  const hit = lines.find((l) => l.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : "";
}

interface Props {
  character: Character;
  onChange: (companion: Companion | null) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

export default function CompanionSection({ character, onChange, collapsedSections, onToggleSection }: Props) {
  const collapsed = !!collapsedSections["companion"];
  const [naturePickerOpen, setNaturePickerOpen] = useState(false);
  const [traitPickerOpen, setTraitPickerOpen] = useState(false);
  const companion = character.companion;
  const level = companionLevel(character);

  function patch(changes: Partial<Companion>) {
    if (companion) onChange({ ...companion, ...changes });
  }

  function body() {
    if (!companion) {
      return (
        <>
          <p className="section-hint">
            Some archetypes (Beastmaster, Astrotech Engineer, Zoologist and others) and the Companion Keeper feat
            give you a companion. It levels with you, and you can only have one at a time.
          </p>
          <button type="button" className="btn btn-secondary" onClick={() => setNaturePickerOpen(true)}>
            + Add Companion
          </button>
        </>
      );
    }

    const def = COMPANION_NATURE_BY_NAME.get(companion.nature);
    const variant = companionVariantDef(companion);
    const featureLines = [...(def?.commonLines ?? []), ...(variant?.lines ?? [])];
    const maxHp = companionMaxHp(companion, level);
    const conMod = abilityModifier(companion.abilities.con);
    const dexMod = abilityModifier(companion.abilities.dex);
    const pb = companionProficiencyBonus(level);
    const slots = companionTraitSlots(level);
    const traitDefs = new Map((def?.traits ?? []).map((t) => [t.name, t]));
    const overLimit = companion.traits.length > slots;
    const asiCount = companionAsiCount(level);

    const traitOptions: PickerOption[] = (def?.traits ?? [])
      .filter((t) => {
        if (companion.traits.includes(t.name) && !traitAllowsRepeats(t)) return false;
        return traitEligibility(t, companion, level).eligible;
      })
      .map((t) => ({ name: t.name, subtitle: traitPrerequisite(t) ? `Requires: ${traitPrerequisite(t)}` : undefined }));

    function traitLines(t: CompanionTraitDef): string[] {
      return t.text.split("\n");
    }

    return (
      <>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="companion-name">Companion name</label>
            <input
              id="companion-name"
              type="text"
              value={companion.name}
              onChange={(e) => patch({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Nature</label>
            <div className="readonly-box">{companion.nature}</div>
          </div>
          {def && def.variantLabel && (
            <div className="field">
              <label htmlFor="companion-variant">{def.variantLabel}</label>
              <select
                id="companion-variant"
                value={companion.variant}
                onChange={(e) => onChange(withCompanionVariant(companion, e.target.value, level))}
              >
                {def.variants.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="field">
            <label htmlFor="companion-class">Companion class{level < 3 ? " (from level 3)" : ""}</label>
            <select
              id="companion-class"
              value={companion.className}
              disabled={level < 3}
              onChange={(e) => patch({ className: e.target.value })}
            >
              <option value="">None</option>
              {COMPANION_CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="field field-wide">
            <label htmlFor="companion-appearance">Appearance</label>
            <input
              id="companion-appearance"
              type="text"
              value={companion.appearance}
              onChange={(e) => patch({ appearance: e.target.value })}
            />
          </div>
        </div>
        {variant?.summary && <p className="section-hint">{variant.summary}</p>}

        <div className="hp-grid">
          <div className="field">
            <label>Level</label>
            <HoverInfo title="Companion Level" lines={["A companion's level always equals yours."]}>
              <div className="readonly-box">{level}</div>
            </HoverInfo>
          </div>
          <div className="field">
            <label>Proficiency</label>
            <div className="readonly-box">{formatModifier(pb)}</div>
          </div>
          <div className="field">
            <label>Max HP</label>
            <HoverInfo
              title="Max HP"
              lines={[
                `Hit die: d${variant?.hitDie ?? 0}`,
                `1st level: ${variant?.hitDie ?? 0} + Con (${formatModifier(conMod)})`,
                `Each level after: ${Math.floor((variant?.hitDie ?? 0) / 2) + 1} + Con (${formatModifier(conMod)}), minimum 1`,
              ]}
            >
              <div className="readonly-box">{maxHp}</div>
            </HoverInfo>
          </div>
          <div className="field">
            <label htmlFor="companion-hp">Current HP</label>
            <NumberInput
              id="companion-hp"
              min={0}
              value={companion.currentHp}
              onValue={(n) => patch({ currentHp: n })}
            />
          </div>
          <div className="field">
            <label htmlFor="companion-temp-hp">Temp HP</label>
            <NumberInput
              id="companion-temp-hp"
              min={0}
              value={companion.tempHp}
              onValue={(n) => patch({ tempHp: n })}
            />
          </div>
          <div className="field">
            <label>Armor Class</label>
            <HoverInfo
              title="Armor Class"
              lines={[`10 + Dexterity (${formatModifier(dexMod)}). Armor or barding the companion is proficient with adds to this.`]}
            >
              <div className="readonly-box">{10 + dexMod}</div>
            </HoverInfo>
          </div>
          <div className="field">
            <label>Initiative</label>
            <HoverInfo
              title="Initiative"
              lines={["You and your companion both roll; you act together on the lower of the two results."]}
            >
              <div className="readonly-box">{formatModifier(dexMod)}</div>
            </HoverInfo>
          </div>
          <div className="field">
            <label>Speed</label>
            <div className="readonly-box">{lineValue(featureLines, "Speed").split(".")[0] || "—"}</div>
          </div>
          <div className="field">
            <label>Size / Type</label>
            <div className="readonly-box">
              {[lineValue(featureLines, "Size"), lineValue(featureLines, "Type")].filter(Boolean).join(" / ") || "—"}
            </div>
          </div>
        </div>

        <h3>Ability Scores</h3>
        <p className="section-hint">
          {companion.nature === "Beast"
            ? "A beast's Intelligence is 6; assign the standard array (16, 14, 12, 10, 8) to its other scores. "
            : "Assign the scores as your GM allows. "}
          Ability score improvements ({asiCount} earned so far, at 4th, 8th, 12th, 16th and 19th level) are applied here by hand.
        </p>
        <div className="ability-grid">
          {ABILITIES.map(({ key, label }) => (
            <div className="ability-box" key={key}>
              <label htmlFor={`companion-${key}`}>{label}</label>
              <NumberInput
                id={`companion-${key}`}
                min={1}
                max={30}
                emptyValue={10}
                value={companion.abilities[key]}
                onValue={(n) => patch({ abilities: { ...companion.abilities, [key]: n } })}
              />
              <div className="ability-mod">{formatModifier(abilityModifier(companion.abilities[key]))}</div>
            </div>
          ))}
        </div>

        <h3>
          Traits ({companion.traits.length}/{slots})
        </h3>
        <p className="section-hint">
          Your companion gains a trait at 1st level (two), then at 5th, 9th, 13th and 17th. Whenever it levels up it
          can swap one trait for another.
          {overLimit && " You have more traits than its level allows."}
        </p>
        <div className="chip-row">
          {companion.traits.map((name, i) => {
            const t = traitDefs.get(name);
            return (
              <HoverInfo key={`${name}-${i}`} title={name} lines={t ? traitLines(t) : []}>
                <span className="info-chip">
                  {name}
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => patch({ traits: companion.traits.filter((_, idx) => idx !== i) })}
                  >
                    ×
                  </button>
                </span>
              </HoverInfo>
            );
          })}
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={companion.traits.length >= slots}
          title={companion.traits.length >= slots ? "No free trait slots at this level" : undefined}
          onClick={() => setTraitPickerOpen(true)}
        >
          + Add Trait
        </button>
        {traitPickerOpen && (
          <PickerDialog
            title={`Add a ${companion.nature} trait`}
            options={traitOptions}
            getDetails={(name) => {
              const t = traitDefs.get(name);
              return t ? traitLines(t) : [];
            }}
            onClose={() => setTraitPickerOpen(false)}
            onPick={(name) => {
              setTraitPickerOpen(false);
              patch({ traits: [...companion.traits, name] });
            }}
          />
        )}

        <div className="species-traits-box">
          <div className="species-traits-header">
            {companion.nature}
            {variant && def?.variantLabel ? ` — ${variant.name}` : ""} features
          </div>
          {featureLines.map((line, i) => {
            const split = line.indexOf(": ");
            return (
              <p className="species-trait-line" key={i}>
                {split > 0 ? (
                  <>
                    <strong>{line.slice(0, split)}.</strong> {line.slice(split + 2)}
                  </>
                ) : (
                  line
                )}
              </p>
            );
          })}
        </div>

        <div className="species-traits-box">
          <div className="species-traits-header">Follower features (level {level})</div>
          {FOLLOWER_FEATURES.filter((f) => f.level <= level).map((f) => (
            <p className="species-trait-line" key={f.name}>
              <strong>{f.name}.</strong> {f.text}
            </p>
          ))}
        </div>

        <div className="field">
          <label htmlFor="companion-notes">Companion notes</label>
          <textarea
            id="companion-notes"
            rows={3}
            value={companion.notes}
            onChange={(e) => patch({ notes: e.target.value })}
          />
        </div>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm(`Remove ${companion.name || "this companion"}? Its stats and traits will be lost.`)) {
              onChange(null);
            }
          }}
        >
          Remove Companion
        </button>
      </>
    );
  }

  return (
    <section className="sheet-section companion-section">
      <SectionHeader title="Companion" collapsed={collapsed} onToggle={() => onToggleSection("companion")} />
      {!collapsed && body()}
      {naturePickerOpen && (
        <PickerDialog
          title="Choose a companion nature"
          options={NATURE_OPTIONS}
          getDetails={natureDetails}
          onClose={() => setNaturePickerOpen(false)}
          onPick={(name) => {
            setNaturePickerOpen(false);
            onChange(createCompanion(name as CompanionNature, level));
          }}
        />
      )}
    </section>
  );
}
