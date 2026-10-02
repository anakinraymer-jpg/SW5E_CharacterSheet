import type { AbilityKey, Character, SkillName, Weapon } from "./types";
import { SKILL_ABILITY, SKILL_LIST } from "./types";
import { ABILITY_LABEL } from "./speciesLogic";
import { abilityModifier, formatModifier, proficiencyBonus } from "./utils";
import { effectiveMaxHp } from "./classFeatureLogic";
import { hasFeat } from "./featLogic";
import { WEAPON_LOOKUP, toHitAbilityInfo } from "./weaponLogic";
import { castingStats } from "./castingStats";
import { grantedLanguages, grantedProficiencies } from "./grantsSummary";

// Hover-tooltip contents for Simple mode's collapsed cards. Kept short: tooltips are for a quick
// glance, and clicking a card opens the full section for editing.

const ABILITY_ORDER: AbilityKey[] = ["str", "dex", "con", "int", "wis", "cha"];

function clip(text: string, max = 150): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

function cap(lines: string[], max: number): string[] {
  return lines.length > max ? [...lines.slice(0, max), `…and ${lines.length - max} more — click to see everything.`] : lines;
}

export function abilitiesSummary(c: Character): string[] {
  return ABILITY_ORDER.map((k) => `${ABILITY_LABEL[k]}: ${c.abilities[k]} (${formatModifier(abilityModifier(c.abilities[k]))})`);
}

function skillBonus(c: Character, skill: SkillName): number {
  const pb = proficiencyBonus(c.level);
  const state = c.skills[skill];
  return abilityModifier(c.abilities[SKILL_ABILITY[skill]]) + (state.proficient ? pb : 0) + (state.expertise ? pb : 0);
}

export function skillsSummary(c: Character): string[] {
  const pb = proficiencyBonus(c.level);
  const trained = SKILL_LIST.filter((s) => c.skills[s].proficient).map(
    (s) => `${s}${c.skills[s].expertise ? " (expertise)" : ""}: ${formatModifier(skillBonus(c, s))}`
  );
  const saves = ABILITY_ORDER.filter((k) => c.savingThrows[k]).map(
    (k) => `${ABILITY_LABEL[k]} save: ${formatModifier(abilityModifier(c.abilities[k]) + pb)}`
  );
  return [
    ...(trained.length ? trained : ["No trained skills yet."]),
    ...(saves.length ? ["—", ...saves] : []),
  ];
}

export function combatSummary(c: Character): string[] {
  const pb = proficiencyBonus(c.level);
  const observant = hasFeat(c, "Observant") ? 5 : 0;
  const passive = (skill: SkillName) => 10 + skillBonus(c, skill) + observant;
  return [
    `HP: ${c.currentHp} / ${effectiveMaxHp(c)}${c.tempHp > 0 ? ` (+${c.tempHp} temp)` : ""}`,
    `Hit Dice: ${c.hitDiceRemaining} of ${c.hitDiceTotal}`,
    `Passive Perception: ${passive("Perception")} · Investigation: ${passive("Investigation")}`,
    `Proficiency Bonus: ${formatModifier(pb)}`,
    c.vision ? `Vision: ${c.vision}` : "",
    c.specialMovement ? `Movement: ${c.specialMovement}` : "",
    c.resistances ? `Resistances: ${clip(c.resistances, 200)}` : "",
    c.deathSaves.successes || c.deathSaves.failures
      ? `Death saves: ${c.deathSaves.successes} successes / ${c.deathSaves.failures} failures`
      : "",
  ].filter(Boolean);
}

export function featsSummary(c: Character): string[] {
  return c.feats.length ? c.feats.map((f) => f.name) : ["No feats yet."];
}

export function powersSummary(c: Character): string[] {
  const s = castingStats(c);
  const known = (type: "Force" | "Tech") => c.powers.filter((p) => p.type === type && p.name).length;
  return [
    `Force: Save DC ${s.forceDC} · Attack ${formatModifier(s.forceAttack)} · ${c.forcePoints.current}/${c.forcePoints.max} points · ${known("Force")} known`,
    `Tech: Save DC ${s.techDC} · Attack ${formatModifier(s.techAttack)} · ${c.techPoints.current}/${c.techPoints.max} points · ${known("Tech")} known`,
  ];
}

export function equipmentSummary(c: Character): string[] {
  const weight = c.equipment.filter((i) => i.location !== "Storage").reduce((sum, i) => sum + i.weight * i.quantity, 0);
  const items = c.equipment
    .filter((i) => i.name.trim())
    .map((i) => `${i.quantity}× ${i.name}${i.equipped ? " (equipped)" : ""}`);
  return [
    `Credits: ${c.credits}`,
    ...cap(items.length ? items : ["No items yet."], 24),
    `Carrying ${weight} kg`,
  ];
}

export function weaponTooltip(c: Character, w: Weapon): string[] {
  const pb = proficiencyBonus(c.level);
  const entry = WEAPON_LOOKUP.get(w.name.trim().toLowerCase());
  const { mod, label } = toHitAbilityInfo(c, w.name);
  return [
    `To hit ${formatModifier(mod + (w.proficient ? pb : 0))} (${label}${w.proficient ? ", proficient" : ""})`,
    `Damage: ${w.damage || "—"} · Range: ${w.range || "Melee"}`,
    entry ? `${entry.type}${entry.property ? ` — ${entry.property}` : ""}` : "",
    w.ammoType ? `Ammo: ${w.ammoType} (${w.ammoCount})` : "",
  ].filter(Boolean);
}

export function characterDataSummary(c: Character): string[] {
  const languages = [...grantedLanguages(c), ...(c.languages ? [c.languages] : [])];
  const profs = [...grantedProficiencies(c), ...(c.proficiencies ? [c.proficiencies] : [])];
  return [
    languages.length ? `Languages: ${clip(languages.join(", "), 200)}` : "",
    profs.length ? `Proficiencies: ${clip(profs.join(", "), 240)}` : "",
    [c.age && `Age ${c.age}`, c.gender, c.height].filter(Boolean).join(" · "),
    c.appearance ? `Appearance: ${clip(c.appearance)}` : "",
    c.personalityTraits ? `Personality: ${clip(c.personalityTraits)}` : "",
    c.ideals ? `Ideals: ${clip(c.ideals)}` : "",
    c.bonds ? `Bonds: ${clip(c.bonds)}` : "",
    c.flaws ? `Flaws: ${clip(c.flaws)}` : "",
    c.backgroundFeature ? `Background feature: ${clip(c.backgroundFeature)}` : "",
  ].filter(Boolean);
}

export function notesSummary(c: Character): string[] {
  return [
    c.featsAndFeatures ? `Features: ${clip(c.featsAndFeatures, 200)}` : "",
    [c.allegiance && `Allegiance: ${c.allegiance}`, c.homeworld && `Homeworld: ${c.homeworld}`, c.placeOfBirth && `Born: ${c.placeOfBirth}`]
      .filter(Boolean)
      .join(" · "),
    c.backstory ? `Backstory: ${clip(c.backstory, 260)}` : "",
    c.notes ? `Notes: ${clip(c.notes, 260)}` : "",
  ].filter(Boolean);
}

function textLines(heading: string, text: string): string[] {
  if (!text) return [];
  return [`— ${heading} —`, ...text.split("\n\n").filter(Boolean).map((l) => clip(l, 130))];
}

export function traitsSummary(c: Character): string[] {
  return cap(
    [
      ...textLines(`${c.speciesAppliedName} traits`, c.speciesTraitsText),
      ...textLines(`${c.classAppliedName} features`, c.classTraitsText),
      ...textLines(`${c.archetypeAppliedName} features`, c.archetypeTraitsText),
      ...(c.feats.length ? ["— Feats —", c.feats.map((f) => f.name).join(", ")] : []),
    ],
    22
  );
}
