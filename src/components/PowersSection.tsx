import { useState } from "react";
import type { Character, Power, PowerAlignment } from "../types";
import { FORCE_POWERS, TECH_POWERS, type ForcePowerEntry, type TechPowerEntry } from "../data/powers";
import PowerNameField, { type PowerPickerOption } from "./PowerNameField";
import { abilityModifier, formatModifier, proficiencyBonus } from "../utils";
import { ABILITY_LABEL } from "../speciesLogic";
import HoverInfo from "./HoverInfo";
import SectionHeader from "./SectionHeader";

const FORCE_POWER_LOOKUP = new Map(FORCE_POWERS.map((p) => [p.name.toLowerCase(), p]));
const TECH_POWER_LOOKUP = new Map(TECH_POWERS.map((p) => [p.name.toLowerCase(), p]));

function levelLabel(level: number): string {
  if (level <= 0) return "At-Will";
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  const suffix = suffixes[level] ?? "th";
  return `${level}${suffix} Level`;
}

function buildEntryTooltip(entry: ForcePowerEntry | TechPowerEntry): string[] {
  return [
    `Level: ${levelLabel(entry.level)}`,
    "alignment" in entry ? `Alignment: ${entry.alignment}` : "",
    entry.castingTime ? `Casting Time: ${entry.castingTime}` : "",
    entry.range ? `Range: ${entry.range}` : "",
    entry.duration ? `Duration: ${entry.duration}` : "",
    `Concentration: ${entry.concentration ? "Yes" : "No"}`,
    "prerequisite" in entry && entry.prerequisite !== "-" ? `Prerequisite: ${entry.prerequisite}` : "",
    entry.description,
  ].filter(Boolean);
}

const FORCE_OPTIONS: PowerPickerOption[] = FORCE_POWERS.map((p) => ({
  name: p.name,
  level: p.level,
  tooltip: buildEntryTooltip(p),
}));

const TECH_OPTIONS: PowerPickerOption[] = TECH_POWERS.map((p) => ({
  name: p.name,
  level: p.level,
  tooltip: buildEntryTooltip(p),
}));

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  addPower: (type: Power["type"]) => void;
  updatePower: (id: string, patch: Partial<Power>) => void;
  removePower: (id: string) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

function countByAlignment(powers: Power[], type: Power["type"]) {
  const counts: Record<PowerAlignment, number> = { Light: 0, Dark: 0, Universal: 0 };
  for (const p of powers) {
    if (p.type === type) counts[p.alignment]++;
  }
  return counts;
}

export default function PowersSection({
  character,
  update,
  addPower,
  updatePower,
  removePower,
  collapsedSections,
  onToggleSection,
}: Props) {
  const collapsed = !!collapsedSections["powers"];
  const [activeType, setActiveType] = useState<Power["type"]>("Force");

  const pb = proficiencyBonus(character.level);
  const forceAbilityLabel = `${ABILITY_LABEL[character.forceCastingAbility]} (${
    character.forceCastingAbility === "wis" ? "Light side" : "Dark side"
  })`;
  const forceMod = abilityModifier(character.abilities[character.forceCastingAbility]);
  const forceAttack = pb + forceMod;
  const forceDC = 8 + pb + forceMod;
  const forceAttackLines = [`Proficiency Bonus: ${formatModifier(pb)}`, `${forceAbilityLabel} modifier: ${formatModifier(forceMod)}`];
  const forceDCLines = [`Base: 8`, `Proficiency Bonus: ${formatModifier(pb)}`, `${forceAbilityLabel} modifier: ${formatModifier(forceMod)}`];
  const techMod = abilityModifier(character.abilities.int);
  const techAttack = pb + techMod;
  const techDC = 8 + pb + techMod;
  const techAttackLines = [`Proficiency Bonus: ${formatModifier(pb)}`, `Intelligence modifier: ${formatModifier(techMod)}`];
  const techDCLines = [`Base: 8`, `Proficiency Bonus: ${formatModifier(pb)}`, `Intelligence modifier: ${formatModifier(techMod)}`];

  const techCounts = countByAlignment(character.powers, "Tech");
  const forceCounts = countByAlignment(character.powers, "Force");
  const techTotal = techCounts.Light + techCounts.Dark + techCounts.Universal;

  const sortedPowers = [...character.powers]
    .filter((p) => p.type === activeType)
    .sort((a, b) => a.level - b.level);
  let lastLevel: number | null = null;

  function handleSelect(power: Power, name: string) {
    if (power.type === "Force") {
      const knownPower = FORCE_POWER_LOOKUP.get(name.toLowerCase());
      if (knownPower) {
        updatePower(power.id, {
          name: knownPower.name,
          level: knownPower.level,
          alignment: knownPower.alignment,
          castingTime: knownPower.castingTime,
          range: knownPower.range,
          duration: knownPower.duration,
        });
        return;
      }
    } else {
      const knownPower = TECH_POWER_LOOKUP.get(name.toLowerCase());
      if (knownPower) {
        updatePower(power.id, {
          name: knownPower.name,
          level: knownPower.level,
          castingTime: knownPower.castingTime,
          range: knownPower.range,
          duration: knownPower.duration,
        });
        return;
      }
    }
    updatePower(power.id, { name });
  }

  return (
    <section className="sheet-section powers-section">
      <SectionHeader title="Force & Tech Powers" collapsed={collapsed} onToggle={() => onToggleSection("powers")} />
      {!collapsed && (
      <>
      <div className="power-type-toggle">
        <button
          type="button"
          className={`btn ${activeType === "Force" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveType("Force")}
        >
          Force
        </button>
        <button
          type="button"
          className={`btn ${activeType === "Tech" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveType("Tech")}
        >
          Tech
        </button>
      </div>

      {activeType === "Force" ? (
        <div className="points-grid">
          <div className="field">
            <label htmlFor="force-current">Force Points</label>
            <div className="points-pair">
              <input
                id="force-current"
                type="number"
                value={character.forcePoints.current}
                onChange={(e) =>
                  update("forcePoints", {
                    ...character.forcePoints,
                    current: Number(e.target.value) || 0,
                  })
                }
              />
              <span>/</span>
              <input
                type="number"
                value={character.forcePoints.max}
                onChange={(e) =>
                  update("forcePoints", {
                    ...character.forcePoints,
                    max: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="force-die">Force Die</label>
            <input
              id="force-die"
              type="text"
              value={character.forceDie}
              onChange={(e) => update("forceDie", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Force Casting Ability</label>
            <div className="power-type-toggle">
              <button
                type="button"
                className={`btn btn-small ${character.forceCastingAbility === "wis" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => update("forceCastingAbility", "wis")}
              >
                Light side (Wisdom)
              </button>
              <button
                type="button"
                className={`btn btn-small ${character.forceCastingAbility === "cha" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => update("forceCastingAbility", "cha")}
              >
                Dark side (Charisma)
              </button>
            </div>
          </div>
          <div className="field">
            <label htmlFor="force-attack">Force Attack</label>
            <HoverInfo title="Force Attack Breakdown" lines={forceAttackLines}>
              <div id="force-attack" className="readonly-box">
                {formatModifier(forceAttack)}
              </div>
            </HoverInfo>
          </div>
          <div className="field">
            <label htmlFor="force-dc">Force Save DC</label>
            <HoverInfo title="Force Save DC Breakdown" lines={forceDCLines}>
              <div id="force-dc" className="readonly-box">
                {forceDC}
              </div>
            </HoverInfo>
          </div>
        </div>
      ) : (
        <div className="points-grid">
          <div className="field">
            <label htmlFor="tech-current">Tech Points</label>
            <div className="points-pair">
              <input
                id="tech-current"
                type="number"
                value={character.techPoints.current}
                onChange={(e) =>
                  update("techPoints", {
                    ...character.techPoints,
                    current: Number(e.target.value) || 0,
                  })
                }
              />
              <span>/</span>
              <input
                type="number"
                value={character.techPoints.max}
                onChange={(e) =>
                  update("techPoints", {
                    ...character.techPoints,
                    max: Number(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="tech-attack">Tech Attack</label>
            <HoverInfo title="Tech Attack Breakdown" lines={techAttackLines}>
              <div id="tech-attack" className="readonly-box">
                {formatModifier(techAttack)}
              </div>
            </HoverInfo>
          </div>
          <div className="field">
            <label htmlFor="tech-dc">Tech Save DC</label>
            <HoverInfo title="Tech Save DC Breakdown" lines={techDCLines}>
              <div id="tech-dc" className="readonly-box">
                {techDC}
              </div>
            </HoverInfo>
          </div>
        </div>
      )}

      <div className="alignment-counts">
        {activeType === "Force"
          ? `Known — Light ${forceCounts.Light}, Dark ${forceCounts.Dark}, Universal ${forceCounts.Universal}`
          : `Known — ${techTotal} power${techTotal === 1 ? "" : "s"}`}
      </div>

      <div className="powers-list">
        {sortedPowers.map((power) => {
          const showHeader = power.level !== lastLevel;
          lastLevel = power.level;
          return (
            <div key={power.id}>
              {showHeader && <h3 className="power-level-header">{levelLabel(power.level)}</h3>}
              <div className="power-row">
                <PowerNameField
                  value={power.name}
                  options={power.type === "Force" ? FORCE_OPTIONS : TECH_OPTIONS}
                  onSelect={(name) => handleSelect(power, name)}
                  onTextChange={(name) => updatePower(power.id, { name })}
                  placeholder="Power name"
                  className="power-name"
                />
                {power.type === "Force" && power.name && (
                  <span className="power-alignment-suffix">({power.alignment})</span>
                )}
                <input
                  type="number"
                  min={0}
                  max={9}
                  value={power.level}
                  onChange={(e) => updatePower(power.id, { level: Number(e.target.value) || 0 })}
                  title="Power level"
                  className="power-level"
                />
                <label className="prepared-toggle" title="Prepared">
                  <input
                    type="checkbox"
                    checked={power.prepared}
                    onChange={(e) => updatePower(power.id, { prepared: e.target.checked })}
                  />
                  P
                </label>
                <button
                  className="btn btn-danger btn-small"
                  title="Remove power"
                  onClick={() => removePower(power.id)}
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn btn-secondary" onClick={() => addPower(activeType)}>
        + Add {activeType} Power
      </button>
      </>
      )}
    </section>
  );
}
