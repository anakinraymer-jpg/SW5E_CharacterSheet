import { useState } from "react";
import type { AbilityKey, Character, Companion, CompanionNature, CompanionTraitDef, SkillName, SkillState } from "../types";
import { SKILL_LIST } from "../types";
import { COMPANION_NATURES } from "../data/companions";
import { COMPANION_CLASSES } from "../data/companionClasses";
import {
  ASI_LEVELS,
  CAPSTONE_LEVEL,
  COMPANION_CLASS_BY_NAME,
  COMPANION_NATURE_BY_NAME,
  EXPERTISE_LEVELS,
  FOLLOWER_FEATURES,
  classRequirement,
  classRequirementMet,
  companionAbilities,
  companionFeatEffects,
  companionLevel,
  companionMaxHp,
  companionProficiencyBonus,
  companionSaveProficiencies,
  companionSkillSlots,
  companionSkills,
  companionTraitSlots,
  companionVariantDef,
  earnedAsiLevels,
  normalizeCompanion,
  traitAllowsRepeats,
  traitEligibility,
  traitPrerequisite,
  withCompanionVariant,
} from "../companionLogic";
import { activeCompanionResources } from "../companionResources";
import { buildFeatText, featNeedsChoices, type FeatSelections } from "../featLogic";
import { FEATS_CATALOG } from "../data/feats";
import { FEAT_OPTIONS, featDetails } from "../pickerCatalogs";
import { abilityModifier, formatModifier } from "../utils";
import FeatChoiceDialog from "./FeatChoiceDialog";
import HoverInfo from "./HoverInfo";
import NumberInput from "./NumberInput";
import PickerDialog, { type PickerOption } from "./PickerDialog";
import PickerField from "./PickerField";
import SectionHeader from "./SectionHeader";

const ABILITIES: { key: AbilityKey; label: string }[] = [
  { key: "str", label: "Strength" },
  { key: "dex", label: "Dexterity" },
  { key: "con", label: "Constitution" },
  { key: "int", label: "Intelligence" },
  { key: "wis", label: "Wisdom" },
  { key: "cha", label: "Charisma" },
];

const ABILITY_SHORT: Record<AbilityKey, string> = {
  str: "STR",
  dex: "DEX",
  con: "CON",
  int: "INT",
  wis: "WIS",
  cha: "CHA",
};

const FEATS_BY_NAME = new Map(FEATS_CATALOG.map((f) => [f.name, f]));

// A companion has no skill list of its own, so the feat dialog is shown an empty one.
const NO_SKILLS = Object.fromEntries(
  SKILL_LIST.map((name) => [name, { proficient: false, expertise: false }])
) as Record<SkillName, SkillState>;

export const NATURE_OPTIONS: PickerOption[] = COMPANION_NATURES.map((n) => ({
  name: n.nature,
  subtitle: `Requires: ${n.prerequisite}`,
}));

export function natureDetails(name: string): string[] {
  const def = COMPANION_NATURE_BY_NAME.get(name as CompanionNature);
  if (!def) return [];
  return [def.summary, `Prerequisite: ${def.prerequisite}`, `${def.traits.length} traits to choose from.`].filter(Boolean);
}

function ordinal(n: number): string {
  const rem = n % 100;
  if (rem >= 11 && rem <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10 > 3 ? 0 : n % 10]}`;
}

// Pulls "Label: value" out of the feature lines (e.g. "Speed: 20 ft.").
function lineValue(lines: string[], label: string): string {
  const prefix = `${label}: `;
  const hit = lines.find((l) => l.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : "";
}

function AbilitySelect({
  value,
  onChange,
  label,
}: {
  value: AbilityKey | "";
  onChange: (v: AbilityKey | "") => void;
  label: string;
}) {
  return (
    <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value as AbilityKey | "")}>
      <option value="">—</option>
      {ABILITIES.map((a) => (
        <option key={a.key} value={a.key}>
          {a.label}
        </option>
      ))}
    </select>
  );
}

interface Props {
  character: Character;
  onChange: (companion: Companion | null) => void;
  onRequestAdd: () => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

export default function CompanionSection({
  character,
  onChange,
  onRequestAdd,
  collapsedSections,
  onToggleSection,
}: Props) {
  const collapsed = !!collapsedSections["companion"];
  const [traitPickerOpen, setTraitPickerOpen] = useState(false);
  const [pendingFeat, setPendingFeat] = useState<string | null>(null);
  const companion = character.companion ? normalizeCompanion(character.companion) : null;
  const level = companionLevel(character);

  function patch(changes: Partial<Companion>) {
    if (companion) onChange({ ...companion, ...changes });
  }

  function chooseFeat(name: string) {
    const feat = FEATS_BY_NAME.get(name);
    if (!feat) return;
    if (featNeedsChoices(feat)) setPendingFeat(name);
    else patch({ feat: name, featAbilityChoice: "", featChoices: [] });
  }

  function setAsi(asiLevel: number, slot: number, value: AbilityKey | "") {
    if (!companion) return;
    const key = String(asiLevel);
    const picks = [...(companion.asi[key] ?? [])];
    picks[slot] = value as AbilityKey;
    const cleaned = picks.filter(Boolean);
    patch({ asi: { ...companion.asi, [key]: cleaned } });
  }

  function body() {
    if (!companion) {
      return (
        <>
          <p className="section-hint">
            Some archetypes (Beastmaster, Astrotech Engineer, Zoologist and others) and the Companion Keeper feat
            give you a companion. It levels with you, and you can only have one at a time.
          </p>
          <button type="button" className="btn btn-secondary" onClick={onRequestAdd}>
            + Add Companion
          </button>
        </>
      );
    }

    const def = COMPANION_NATURE_BY_NAME.get(companion.nature);
    const variant = companionVariantDef(companion);
    const featureLines = [...(def?.commonLines ?? []), ...(variant?.lines ?? [])];
    const scores = companionAbilities(companion, level);
    const maxHp = companionMaxHp(companion, level);
    const conMod = abilityModifier(scores.con);
    const dexMod = abilityModifier(scores.dex);
    const pb = companionProficiencyBonus(level);
    const slots = companionTraitSlots(level);
    const traitDefs = new Map((def?.traits ?? []).map((t) => [t.name, t]));
    const overLimit = companion.traits.length > slots;
    const asiLevels = earnedAsiLevels(level);
    const cls = COMPANION_CLASS_BY_NAME.get(companion.className);
    const req = cls ? classRequirement(cls) : null;
    const classUnmet = cls ? !classRequirementMet(cls, scores) : false;
    const expertiseSlots = EXPERTISE_LEVELS.filter((l) => level >= l).length;
    const fx = companionFeatEffects(companion);
    const resources = activeCompanionResources(companion, level, scores);
    const saveProf = companionSaveProficiencies(companion);
    const skills = companionSkills(companion, level);
    const skillSlots = companionSkillSlots(companion, level);
    const proficientSkills = skills.filter((sk) => sk.proficient).map((sk) => sk.name);
    const perception = skills.find((sk) => sk.name === "Perception");
    const speedBase = lineValue(featureLines, "Speed").split(".")[0];
    const speedFeet = speedBase.match(/(\d+)/);

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
                <option key={c.name} value={c.name}>
                  {c.name}
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
        {classUnmet && req && (
          <p className="section-hint companion-warning">
            {companion.className} needs {req.abilities.map((a) => ABILITY_SHORT[a]).join(" or ")} {req.min}+ and this
            companion doesn't have it yet.
          </p>
        )}

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
                ...(fx.hpPerLevel ? [`${companion.feat}: +${fx.hpPerLevel * level} (${fx.hpPerLevel} per level)`] : []),
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
            {fx.speedBonus > 0 && speedFeet ? (
              <HoverInfo
                title="Speed"
                lines={[`${speedFeet[1]} ft + ${fx.speedBonus} from ${companion.feat}`]}
              >
                <div className="readonly-box">{Number(speedFeet[1]) + fx.speedBonus} ft</div>
              </HoverInfo>
            ) : (
              <div className="readonly-box">{speedBase || "—"}</div>
            )}
          </div>
          <div className="field">
            <label>Size / Type</label>
            <div className="readonly-box">
              {[lineValue(featureLines, "Size"), lineValue(featureLines, "Type")].filter(Boolean).join(" / ") || "—"}
            </div>
          </div>
        </div>

        {resources.length > 0 && (
          <>
            <h3>{companion.className} Resources</h3>
            <div className="class-resources-grid">
              {resources.map(({ def, max, remaining }) => (
                <div className="class-resource-card" key={def.key}>
                  <div className="class-resource-label">
                    {def.label}
                    {def.note ? ` (${def.note(level)})` : ""}
                  </div>
                  <div className="class-resource-controls">
                    <NumberInput
                      min={0}
                      max={max}
                      value={remaining}
                      onValue={(n) =>
                        patch({
                          resourceUsed: { ...companion.resourceUsed, [def.key]: Math.max(0, max - Math.min(max, n)) },
                        })
                      }
                    />
                    <span>/ {max}</span>
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => {
                        const next = { ...companion.resourceUsed };
                        delete next[def.key];
                        patch({ resourceUsed: next });
                      }}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="class-resource-refresh">
                    {def.source} · refreshes on {def.refresh}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <h3>Ability Scores</h3>
        <p className="section-hint">
          {companion.nature === "Beast"
            ? "A beast's Intelligence is 6; assign the standard array (16, 14, 12, 10, 8) to its other scores. "
            : "Assign the base scores as your GM allows. "}
          Improvements below are added on top.
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
              <HoverInfo
                title={label}
                lines={[
                  `Base ${companion.abilities[key]}`,
                  scores[key] !== companion.abilities[key]
                    ? `With improvements ${scores[key]}`
                    : "No improvements yet",
                ]}
              >
                <div className="ability-mod">
                  {formatModifier(abilityModifier(scores[key]))}
                  {scores[key] !== companion.abilities[key] && (
                    <span className="companion-effective"> ({scores[key]})</span>
                  )}
                </div>
              </HoverInfo>
            </div>
          ))}
        </div>

        <div className="companion-saves">
          <span className="companion-saves-label">Saving throws</span>
          {ABILITIES.map(({ key }) => {
            const proficient = saveProf.includes(key);
            const mod = abilityModifier(scores[key]) + (proficient ? pb : 0);
            return (
              <span className={`companion-save${proficient ? " is-proficient" : ""}`} key={key}>
                {ABILITY_SHORT[key]} {formatModifier(mod)}
              </span>
            );
          })}
        </div>

        <h3>Skills</h3>
        {skillSlots.length > 0 && (
          <div className="companion-skill-picks">
            {skillSlots.map((slot) => {
              const picks = companion.skillPicks[slot.source];
              // A skill already held from another source can't be picked again here.
              const heldElsewhere = new Set(
                skills.filter((sk) => sk.proficient && !picks.includes(sk.name)).map((sk) => sk.name)
              );
              return (
                <div className="choice-group" key={slot.source}>
                  <div className="choice-group-label">
                    {slot.label} ({slot.count})
                  </div>
                  <div className="choice-selects">
                    {Array.from({ length: slot.count }, (_, i) => (
                      <select
                        key={i}
                        aria-label={`${slot.label} ${i + 1}`}
                        value={picks[i] ?? ""}
                        onChange={(e) => {
                          const next = [...picks];
                          next[i] = e.target.value;
                          patch({
                            skillPicks: { ...companion.skillPicks, [slot.source]: next.filter((v, idx) => v || idx < i) },
                          });
                        }}
                      >
                        <option value="">Choose…</option>
                        {slot.options
                          .filter((o) => o === picks[i] || (!heldElsewhere.has(o) && !picks.includes(o)))
                          .map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                      </select>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="companion-skill-grid">
          {skills.map((sk) => (
            <HoverInfo
              key={sk.name}
              title={sk.name}
              lines={[
                `${ABILITY_SHORT[sk.ability]} ${formatModifier(abilityModifier(scores[sk.ability]))}${
                  sk.proficient ? ` + proficiency ${formatModifier(pb)}` : ""
                }${sk.expertise ? ` + expertise ${formatModifier(pb)}` : ""}`,
                ...(sk.sources.length ? [`From: ${sk.sources.join(", ")}`] : ["Not proficient"]),
              ]}
              className="companion-skill-wrap"
            >
              <div className={`companion-skill${sk.proficient ? " is-proficient" : ""}${sk.expertise ? " is-expert" : ""}`}>
                <span className="companion-skill-dot" aria-hidden="true" />
                <span className="companion-skill-name">{sk.name}</span>
                <span className="companion-skill-ability">{ABILITY_SHORT[sk.ability]}</span>
                <span className="companion-skill-bonus">{formatModifier(sk.bonus)}</span>
              </div>
            </HoverInfo>
          ))}
        </div>
        <p className="section-hint">
          Passive Perception {10 + (perception?.bonus ?? 0)} · a filled dot is proficient, a ringed dot has expertise.
        </p>

        {asiLevels.length > 0 && (
          <div className="companion-asi">
            <h3>Ability Score Improvements</h3>
            <p className="section-hint">
              One ability gains +2, or pick two for +1 each (scores cap at 20). The 20th-level capstone gives two
              abilities +2 each and raises their cap by 2.
            </p>
            {asiLevels.map((l) => {
              const picks = companion.asi[String(l)] ?? [];
              const capstone = l === CAPSTONE_LEVEL;
              return (
                <div className="companion-asi-row" key={l}>
                  <span className="companion-asi-level">Level {l}</span>
                  <AbilitySelect
                    label={`Level ${l} first ability`}
                    value={picks[0] ?? ""}
                    onChange={(v) => setAsi(l, 0, v)}
                  />
                  {(capstone || picks.length >= 1) && (
                    <AbilitySelect
                      label={`Level ${l} second ability`}
                      value={picks[1] ?? ""}
                      onChange={(v) => setAsi(l, 1, v)}
                    />
                  )}
                  <span className="companion-asi-note">
                    {capstone
                      ? "+2 each"
                      : picks.length === 1
                        ? "+2"
                        : picks.length === 2
                          ? "+1 each"
                          : ASI_LEVELS.includes(l)
                            ? "unspent"
                            : ""}
                  </span>
                </div>
              );
            })}
          </div>
        )}

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

        {(expertiseSlots > 0 || level >= 10) && (
          <div className="field-grid companion-extras">
            {Array.from({ length: expertiseSlots }, (_, i) => (
              <div className="field" key={i}>
                <label htmlFor={`companion-expertise-${i}`}>
                  Expertise ({ordinal(EXPERTISE_LEVELS[i])} level)
                </label>
                <input
                  id={`companion-expertise-${i}`}
                  type="text"
                  placeholder="Skill or tool"
                  list="companion-expertise-options"
                  value={companion.expertise[i] ?? ""}
                  onChange={(e) => {
                    const next = [...companion.expertise];
                    next[i] = e.target.value;
                    patch({ expertise: next });
                  }}
                />
              </div>
            ))}
            <datalist id="companion-expertise-options">
              {proficientSkills.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
            {level >= 10 && (
              <div className="field">
                <label htmlFor="companion-feat">Feat (10th level)</label>
                <PickerField
                  id="companion-feat"
                  title="Choose the companion's feat"
                  value={companion.feat}
                  options={FEAT_OPTIONS.filter((o) => o.name !== "Companion Keeper")}
                  getDetails={featDetails}
                  onPick={chooseFeat}
                />
              </div>
            )}
          </div>
        )}

        {fx.feat && (
          <div className="species-traits-box">
            <div className="species-traits-header">{fx.feat.name} (companion feat)</div>
            <p className="section-hint">Its effects apply to the companion only.</p>
            {Object.keys(fx.abilityBonus).length > 0 && (
              <p className="species-trait-line">
                <strong>Ability score.</strong>{" "}
                {Object.keys(fx.abilityBonus)
                  .map((k) => `${ABILITY_SHORT[k as AbilityKey]} +1`)
                  .join(", ")}
              </p>
            )}
            {fx.speedBonus > 0 && (
              <p className="species-trait-line">
                <strong>Speed.</strong> +{fx.speedBonus} ft
              </p>
            )}
            {fx.hpPerLevel > 0 && (
              <p className="species-trait-line">
                <strong>Hit points.</strong> +{fx.hpPerLevel * level} max HP ({fx.hpPerLevel} per level)
              </p>
            )}
            {fx.savingThrows.length > 0 && (
              <p className="species-trait-line">
                <strong>Saving throws.</strong> {fx.savingThrows.map((a) => ABILITY_SHORT[a]).join(", ")} proficiency
              </p>
            )}
            {(fx.skill || fx.skillPicks.length > 0) && (
              <p className="species-trait-line">
                <strong>Skills.</strong> {[fx.skill, ...fx.skillPicks].filter(Boolean).join(", ")} proficiency
              </p>
            )}
            {fx.proficiencies.length > 0 && (
              <p className="species-trait-line">
                <strong>Proficiencies.</strong> {fx.proficiencies.join(", ")}
              </p>
            )}
            {fx.languages.length > 0 && (
              <p className="species-trait-line">
                <strong>Languages.</strong> {fx.languages.join(", ")}
              </p>
            )}
            {fx.resistance && (
              <p className="species-trait-line">
                <strong>Resistances and advantages.</strong> {fx.resistance}
              </p>
            )}
            <p className="species-trait-line companion-feature">
              {buildFeatText(fx.feat, {
                id: "",
                name: fx.feat.name,
                abilityChosen: Object.keys(fx.abilityBonus) as AbilityKey[],
                choiceSelections: companion.featChoices,
              })}
            </p>
          </div>
        )}

        {cls && (
          <div className="species-traits-box">
            <div className="species-traits-header">{cls.name} class features (level {level})</div>
            {cls.proficiencies.length > 0 && (
              <p className="species-trait-line">
                <strong>Proficiencies.</strong> {cls.proficiencies.map((p) => p.replace(/^• /, "")).join(" · ")}
              </p>
            )}
            {cls.features
              .filter((f) => f.level <= level)
              .map((f) => (
                <p className="species-trait-line companion-feature" key={f.name}>
                  <strong>
                    {f.name} ({ordinal(f.level)} level).
                  </strong>{" "}
                  {f.text}
                </p>
              ))}
            {level < 3 && <p className="section-hint">Class features begin at 3rd level.</p>}
          </div>
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
        {pendingFeat && FEATS_BY_NAME.get(pendingFeat) && (
          <FeatChoiceDialog
            feat={FEATS_BY_NAME.get(pendingFeat)!}
            skills={NO_SKILLS}
            onCancel={() => setPendingFeat(null)}
            onConfirm={(selections: FeatSelections) => {
              patch({
                feat: pendingFeat,
                featAbilityChoice: selections.abilityChoice,
                featChoices: selections.choiceSelections,
              });
              setPendingFeat(null);
            }}
          />
        )}
      </>
    );
  }

  return (
    <section className="sheet-section companion-section">
      <SectionHeader title="Companion" collapsed={collapsed} onToggle={() => onToggleSection("companion")} />
      {!collapsed && body()}
    </section>
  );
}
