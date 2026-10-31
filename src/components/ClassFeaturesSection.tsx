import type { AbilityKey, Character } from "../types";
import { BERSERKER_RAGE_DAMAGE_BY_LEVEL } from "../data/classFeatureChoices";
import { CLASSES_CATALOG } from "../data/classes";
import {
  allChosenSubChoiceOptions,
  applicableSubChoiceDefs,
  applicableClassResources,
  chosenDamageTypesFor,
  resourceMaxBonus,
} from "../classFeatureLogic";
import { abilityModifier, formatModifier, proficiencyBonus } from "../utils";
import { archetypePassiveChips, archetypeResourceDef } from "../archetypeEffects";
import { availableActiveEffects } from "../activeEffects";
import type { ActiveEffect } from "../activeEffects";
import HoverInfo from "./HoverInfo";import SectionHeader from "./SectionHeader";
import NumberInput from "./NumberInput";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  onUpdateResource: (key: string, current: number) => void;
  onOpenManeuverSwap: () => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
  // Simple mode: only the resource counters (#/#) and the actual class/archetype features.
  simple?: boolean;
}

const ABILITY_LABELS: Record<AbilityKey, string> = {
  str: "Strength",
  dex: "Dexterity",
  con: "Constitution",
  int: "Intelligence",
  wis: "Wisdom",
  cha: "Charisma",
};

interface ParsedFeature {
  title: string;
  meta: string;
  body: string;
}

function parseFeatureLine(line: string): ParsedFeature | null {
  const match = line.match(/^(.+?) \(([^)]+)\)\.\s*([\s\S]*)$/);
  if (!match) return null;
  return { title: match[1].trim(), meta: match[2].trim(), body: match[3].trim() };
}

function FeatureChips({ text, featuresOnly }: { text: string; featuresOnly?: boolean }) {
  const lines = text.split("\n\n").filter(Boolean);
  const notes: string[] = [];
  const features: ParsedFeature[] = [];
  for (const line of lines) {
    const parsed = parseFeatureLine(line);
    if (parsed) features.push(parsed);
    else notes.push(line);
  }
  return (
    <>
      {!featuresOnly && notes.map((n, i) => (
        <p key={i} className="species-trait-line">
          {n}
        </p>
      ))}
      <div className="chip-row">
        {features.map((f, i) => (
          <HoverInfo key={i} title={f.title} lines={[f.meta, f.body]}>
            <span className="info-chip">{f.title}</span>
          </HoverInfo>
        ))}
      </div>
    </>
  );
}

function ProficiencyNodes({
  label,
  armor,
  weapons,
}: {
  label: string;
  armor: string[];
  weapons: { label: string; note?: string }[];
}) {
  if (armor.length === 0 && weapons.length === 0) return null;
  return (
    <div className="species-traits-box">
      <div className="species-traits-header">{label} Proficiencies</div>
      <div className="prof-node-row">
        {armor.map((a) => (
          <span key={a} className="prof-node">
            <span className="prof-node-dot" />
            {a}
          </span>
        ))}
        {weapons.map((w) =>
          w.note ? (
            <HoverInfo key={w.label} title={w.label} lines={[w.note]}>
              <span className="prof-node is-partial">
                <span className="prof-node-dot" />
                {w.label}
              </span>
            </HoverInfo>
          ) : (
            <span key={w.label} className="prof-node">
              <span className="prof-node-dot" />
              {w.label}
            </span>
          )
        )}
      </div>
    </div>
  );
}

export default function ClassFeaturesSection({
  character,
  update,
  onUpdateResource,
  onOpenManeuverSwap,
  collapsedSections,
  onToggleSection,
  simple = false,
}: Props) {
  const full = !simple;
  const collapsed = !!collapsedSections["classFeatures"];
  const resources = applicableClassResources(character);
  const classEntry = CLASSES_CATALOG.find((c) => c.name === character.classAppliedName);
  // Modifications (managedInPanel) have their own Modifications section instead of chips here.
  const subChoiceDefs = applicableSubChoiceDefs(character).filter((d) => !d.managedInPanel);
  const hasChosenSubChoices = subChoiceDefs.some(
    (def) => (character.classSubChoicePicks[def.key] ?? []).length > 0
  );
  const chosenOptions = allChosenSubChoiceOptions(character);
  const passiveBuffOptions = chosenOptions.filter((o) => o.passiveBuffText);
  const rageBuffOptions = chosenOptions.filter((o) => o.rageBuffText);
  const dewbackTypes = chosenOptions.some((o) => o.name === "Dewback's Instinct")
    ? chosenDamageTypesFor(character, "Dewback's Instinct")
    : [];
  const hasVowOfDeflection = chosenOptions.some((o) => o.name === "Vow of Deflection");
  const deflectionFlatBonus = abilityModifier(character.abilities.dex) + character.level;
  const isOperative = character.classAppliedName === "Operative";
  const hasReliableTalent = isOperative && character.level >= 11;
  const hasSlipperyMind = isOperative && character.level >= 15;
  const hasDiamondSoul = character.classAppliedName === "Monk" && character.level >= 14;
  const hasPurityOfBody = character.classAppliedName === "Monk" && character.level >= 13;
  const hasForcePurity = character.classAppliedName === "Guardian" && character.level >= 6;

  const archetypeChips = archetypePassiveChips(character);

  const toggles = availableActiveEffects(character);
  const activeKeys = character.activeEffects ?? [];
  function usesFor(e: ActiveEffect): { key: string; current: number; max: number } | null {
    const def = e.resourceKey ? resources.find((r) => r.key === e.resourceKey) : undefined;
    if (!def) return null;
    const idx = Math.max(1, Math.min(20, character.level || 1)) - 1;
    const max = (def.maxByLevel[idx] ?? 0) + resourceMaxBonus(character, def.key);
    const current = character.classResources.find((r) => r.key === def.key)?.current ?? max;
    return { key: def.key, current, max };
  }
  function toggleEffect(key: string, on: boolean, uses: { key: string; current: number } | null) {
    update("activeEffects", on ? activeKeys.filter((k) => k !== key) : [...activeKeys, key]);
    if (!on && uses && uses.current > 0) onUpdateResource(uses.key, uses.current - 1);
  }

  const hasManeuvers = subChoiceDefs.some((def) => def.key.endsWith("-maneuvers"));
  const canSwapManeuvers = hasManeuvers && chosenOptions.some((o) => o.allowsManeuverSwap);
  const pb = proficiencyBonus(character.level);
  const physicalManeuverMod = abilityModifier(character.abilities[character.maneuverPhysicalAbility]);
  const mentalManeuverMod = abilityModifier(character.abilities[character.maneuverMentalAbility]);
  const physicalManeuverDC = 8 + pb + physicalManeuverMod;
  const mentalManeuverDC = 8 + pb + mentalManeuverMod;

  if (!character.classTraitsText && !character.archetypeTraitsText && resources.length === 0) {
    return null;
  }

  return (
    <section className="sheet-section class-features-section">
      <SectionHeader
        title="Class Features"
        collapsed={collapsed}
        onToggle={() => onToggleSection("classFeatures")}
      />
      {!collapsed && (
      <>
      {full && (
        <p className="section-hint">
          Features unlocked by your class and archetype at your current level. Hover a title for
          details. Level up to reveal more.
        </p>
      )}

      {resources.length > 0 && (
        <div className="class-resources-grid">
          {resources.map((def) => {
            const state = character.classResources.find((r) => r.key === def.key);
            const idx = Math.max(1, Math.min(20, character.level || 1)) - 1;
            const max = (def.maxByLevel[idx] ?? 0) + resourceMaxBonus(character, def.key);
            const die = def.dieByLevel?.[idx];
            const archetypeDef = archetypeResourceDef(def.key);
            const current = state?.current ?? max;
            return (
              <div className="class-resource-card" key={def.key}>
                <div className="class-resource-label">
                  {archetypeDef ? (
                    <HoverInfo
                      title={def.label}
                      lines={[`${character.archetypeAppliedName}, level ${archetypeDef.minLevel}.`, archetypeDef.featureText]}
                    >
                      <span>{def.label}</span>
                    </HoverInfo>
                  ) : (
                    def.label
                  )}
                  {die ? ` (${die})` : ""}
                </div>
                <div className="class-resource-controls">
                  <NumberInput
                    stepper={false}
                    min={0}
                    max={max}
                    value={current}
                    onValue={(n) => onUpdateResource(def.key, n)}
                  />
                  <span>/ {max >= 99 ? "∞" : max}</span>
                  <button className="btn btn-secondary btn-small" onClick={() => onUpdateResource(def.key, max)}>
                    Reset
                  </button>
                </div>
                <div className="class-resource-refresh">{def.refresh}</div>
              </div>
            );
          })}
        </div>
      )}

      {full && character.classAppliedName === "Berserker" && (
        <div className="species-traits-box">
          <div className="species-traits-header">Rage</div>
          <button
            type="button"
            className={`btn btn-small ${character.isRaging ? "btn-primary" : "btn-secondary"}`}
            onClick={() => update("isRaging", !character.isRaging)}
          >
            {character.isRaging ? "Raging — Click to End" : "Start Raging"}
          </button>
          {character.isRaging && (
            <div className="chip-row" style={{ marginTop: 8 }}>
              <HoverInfo
                title="Advantage on Strength"
                lines={["Advantage on Strength checks and saving throws while raging."]}
              >
                <span className="info-chip">Advantage: Strength checks &amp; saves</span>
              </HoverInfo>
              <HoverInfo
                title="Damage Resistance"
                lines={["Resistance to kinetic and energy damage while raging."]}
              >
                <span className="info-chip">Resistance: Kinetic &amp; Energy</span>
              </HoverInfo>
              <HoverInfo
                title="Rage Damage"
                lines={[
                  `+${BERSERKER_RAGE_DAMAGE_BY_LEVEL[Math.max(1, Math.min(20, character.level || 1)) - 1]} to melee damage rolls using Strength.`,
                  "Shown automatically next to qualifying weapons in the Weapons & Ammunitions table.",
                ]}
              >
                <span className="info-chip">
                  {formatModifier(
                    BERSERKER_RAGE_DAMAGE_BY_LEVEL[Math.max(1, Math.min(20, character.level || 1)) - 1]
                  )}{" "}
                  melee damage (Str)
                </span>
              </HoverInfo>
              <HoverInfo title="Casting" lines={["You can't cast or concentrate on powers while raging."]}>
                <span className="info-chip">No casting/concentration</span>
              </HoverInfo>
              {rageBuffOptions.map((o) => (
                <HoverInfo key={o.name} title={o.name} lines={[o.rageBuffText!]}>
                  <span className="info-chip">{o.rageBuffText}</span>
                </HoverInfo>
              ))}
              {dewbackTypes.length > 0 && (
                <HoverInfo
                  title="Dewback's Instinct"
                  lines={[`Resistance to ${dewbackTypes.join(", ")} damage while raging.`]}
                >
                  <span className="info-chip">Resistance: {dewbackTypes.join(", ")}</span>
                </HoverInfo>
              )}
            </div>
          )}
        </div>
      )}

      {toggles.length > 0 && (
        <div className="species-traits-box">
          <div className="species-traits-header">Stances &amp; Active Effects</div>
          {full && (
            <p className="section-hint">
              Switch one on when you use it. Its effects show below and bonuses (AC, speed, damage) are added to the
              sheet. Uses are spent automatically; any rest ends them.
            </p>
          )}
          <div className="active-effects-list">
            {toggles.map((e) => {
              const on = activeKeys.includes(e.key);
              const uses = usesFor(e);
              const spent = !on && uses !== null && uses.current <= 0;
              return (
                <div key={e.key} className={`active-effect${on ? " is-on" : ""}`}>
                  <div className="active-effect-row">
                    <button
                      type="button"
                      className={`btn btn-small ${on ? "btn-primary" : "btn-secondary"}`}
                      disabled={spent}
                      onClick={() => toggleEffect(e.key, on, uses)}
                    >
                      {on ? `${e.name} — End` : e.name}
                    </button>
                    <HoverInfo title={e.feature} lines={[e.source, e.text]}>
                      <span className="rage-damage-note">
                        {uses ? `${uses.current}/${uses.max} uses` : "details"}
                        {spent ? " — none left" : ""}
                      </span>
                    </HoverInfo>
                  </div>
                  {on && (
                    <div className="chip-row">
                      {e.acBonus > 0 && <span className="info-chip">+{e.acBonus} AC (applied)</span>}
                      {e.chips.map((chip) => (
                        <HoverInfo key={chip.label} title={e.name} lines={[chip.detail]}>
                          <span className="info-chip">{chip.label}</span>
                        </HoverInfo>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {full && hasManeuvers && (
        <div className="species-traits-box">
          <div className="species-traits-header">Maneuver Save DC</div>
          <div className="combat-grid">
            <div className="field">
              <label>Physical Maneuver Ability</label>
              <div className="power-type-toggle">
                {(["str", "dex", "con"] as const).map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`btn btn-small ${character.maneuverPhysicalAbility === a ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => update("maneuverPhysicalAbility", a)}
                  >
                    {ABILITY_LABELS[a]}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Mental Maneuver Ability</label>
              <div className="power-type-toggle">
                {(["int", "wis", "cha"] as const).map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`btn btn-small ${character.maneuverMentalAbility === a ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => update("maneuverMentalAbility", a)}
                  >
                    {ABILITY_LABELS[a]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="chip-row" style={{ marginTop: 8 }}>
            <HoverInfo
              title="Physical Maneuver DC"
              lines={[
                "Base: 8",
                `Proficiency Bonus: ${formatModifier(pb)}`,
                `${ABILITY_LABELS[character.maneuverPhysicalAbility]} modifier: ${formatModifier(physicalManeuverMod)}`,
              ]}
            >
              <span className="info-chip">Physical Maneuver DC: {physicalManeuverDC}</span>
            </HoverInfo>
            <HoverInfo
              title="Mental Maneuver DC"
              lines={[
                "Base: 8",
                `Proficiency Bonus: ${formatModifier(pb)}`,
                `${ABILITY_LABELS[character.maneuverMentalAbility]} modifier: ${formatModifier(mentalManeuverMod)}`,
              ]}
            >
              <span className="info-chip">Mental Maneuver DC: {mentalManeuverDC}</span>
            </HoverInfo>
            <HoverInfo
              title="General Maneuvers"
              lines={["General maneuvers use whichever of your two maneuver ability modifiers is better for that maneuver, your choice each time you use one."]}
            >
              <span className="info-chip">General: your choice of the two</span>
            </HoverInfo>
          </div>
          {canSwapManeuvers && (
            <button type="button" className="btn btn-secondary btn-small" style={{ marginTop: 8 }} onClick={onOpenManeuverSwap}>
              Swap a Known Maneuver
            </button>
          )}
        </div>
      )}

      {full && (passiveBuffOptions.length > 0 ||
        hasVowOfDeflection ||
        hasReliableTalent ||
        hasSlipperyMind ||
        hasDiamondSoul ||
        hasPurityOfBody ||
        hasForcePurity ||
        archetypeChips.length > 0) && (
        <div className="species-traits-box">
          <div className="species-traits-header">Passive Feature Effects</div>
          <div className="chip-row">
            {hasVowOfDeflection && (
              <HoverInfo
                title="Vow of Deflection"
                lines={[
                  `Reaction: reduce a melee weapon attack's damage by 1d10 + ${formatModifier(deflectionFlatBonus)} (Dexterity modifier + monk level).`,
                ]}
              >
                <span className="info-chip">Deflect: 1d10 {formatModifier(deflectionFlatBonus)}</span>
              </HoverInfo>
            )}
            {hasReliableTalent && (
              <HoverInfo
                title="Reliable Talent"
                lines={["Ability checks that add your proficiency bonus treat a d20 roll of 9 or lower as a 10."]}
              >
                <span className="info-chip">Reliable Talent: treat 9 or lower as 10</span>
              </HoverInfo>
            )}
            {hasSlipperyMind && (
              <HoverInfo
                title="Slippery Mind"
                lines={["You gain proficiency in Wisdom saving throws — already applied above."]}
              >
                <span className="info-chip">Proficient: Wisdom saves</span>
              </HoverInfo>
            )}
            {hasDiamondSoul && (
              <HoverInfo
                title="Diamond Soul"
                lines={[
                  "You gain proficiency in all saving throws — already applied above.",
                  "On a failed save, you can spend 1 focus point to reroll it.",
                ]}
              >
                <span className="info-chip">Proficient: all saving throws</span>
              </HoverInfo>
            )}
            {hasPurityOfBody && (
              <HoverInfo title="Purity of Body" lines={["You are immune to disease and poison, and resistant to poison damage."]}>
                <span className="info-chip">Immune: disease, poison (resistant)</span>
              </HoverInfo>
            )}
            {hasForcePurity && (
              <HoverInfo title="Force Purity" lines={["The Force flowing through you makes you immune to poison and disease."]}>
                <span className="info-chip">Immune: poison, disease</span>
              </HoverInfo>
            )}
            {archetypeChips.map((c) => (
              <HoverInfo key={c.title} title={c.title} lines={c.lines}>
                <span className="info-chip">{c.chip}</span>
              </HoverInfo>
            ))}
            {passiveBuffOptions.map((o) => (
              <HoverInfo key={o.name} title={o.name} lines={[o.passiveBuffText!]}>
                <span className="info-chip">{o.passiveBuffText}</span>
              </HoverInfo>
            ))}
          </div>
        </div>
      )}

      {full && hasChosenSubChoices && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.classAppliedName} Choices</div>
          <div className="chip-row">
            {subChoiceDefs.map((def) => {
              const chosen = character.classSubChoicePicks[def.key] ?? [];
              const details = character.classSubChoiceDetails[def.key] ?? [];
              return chosen.map((name, i) => {
                const option = def.options.find((o) => o.name === name);
                if (!option) return null;
                const detail = details[i];
                const extra: string[] = [];
                if (detail?.languages?.length) extra.push(`Languages: ${detail.languages.join(", ")}`);
                if (detail?.skill) extra.push(`Skill: ${detail.skill}`);
                if (detail?.tools?.length) extra.push(`Tool${detail.tools.length > 1 ? "s" : ""}: ${detail.tools.join(", ")}`);
                if (detail?.weapons?.length) extra.push(`Weapons: ${detail.weapons.join(", ")}`);
                if (detail?.fightingStyle) extra.push(`Fighting Style: ${detail.fightingStyle}`);
                if (detail?.fightingMastery) extra.push(`Fighting Mastery: ${detail.fightingMastery}`);
                if (detail?.lightsaberForms?.length) extra.push(`Lightsaber Forms: ${detail.lightsaberForms.join(", ")}`);
                if (detail?.actions?.length) extra.push(`Bonus Action Options: ${detail.actions.join(", ")}`);
                if (detail?.substituteAbility) extra.push(`Substitute Ability: ${ABILITY_LABELS[detail.substituteAbility]}`);
                return (
                  <HoverInfo
                    key={`${def.key}-${name}-${i}`}
                    title={option.name}
                    lines={[def.label, option.text, ...extra]}
                  >
                    <span className="info-chip">{option.name}</span>
                  </HoverInfo>
                );
              });
            })}
          </div>
        </div>
      )}

      {full && classEntry && (
        <ProficiencyNodes
          label={character.classAppliedName}
          armor={classEntry.armorProficiencies}
          weapons={classEntry.weaponProficiencies}
        />
      )}

      {full && character.classEquipmentText.length > 0 && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.classAppliedName} Starting Equipment</div>
          {character.classEquipmentText.map((line, i) => (
            <p key={i} className="species-trait-line">
              {line}
            </p>
          ))}
          <p className="section-hint" style={{ marginTop: 6, marginBottom: 0 }}>
            Weapons and armor from these choices are added to your Weapons and Combat sections
            automatically. Starting packs are added as a single item — see sw5e.com for contents.
          </p>
        </div>
      )}

      {character.classTraitsText && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.classAppliedName} Features</div>
          <FeatureChips text={character.classTraitsText} featuresOnly={simple} />
        </div>
      )}

      {character.archetypeTraitsText && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.archetypeAppliedName} Features</div>
          <FeatureChips text={character.archetypeTraitsText} featuresOnly={simple} />
        </div>
      )}
      </>
      )}
    </section>
  );
}
