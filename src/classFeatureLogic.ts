import type {
  AbilityKey,
  Character,
  ClassResourceState,
  ClassSubChoiceDef,
  ClassSubChoiceOption,
  ClassSubChoicePickDetail,
  SkillName,
  SkillState,
} from "./types";
import { isSkillName } from "./types";
import {
  CLASS_RESOURCES_BY_CLASS,
  CLASS_SUB_CHOICES_BY_CLASS,
  FIGHTING_STYLES,
  FIGHTING_MASTERIES,
  MONK_UNARMORED_MOVEMENT_BY_LEVEL,
} from "./data/classFeatureChoices";
import { abilityModifier, armorCatalogMatch } from "./utils";

const FIGHTING_STYLES_BY_NAME = new Map(FIGHTING_STYLES.map((s) => [s.name, s]));
const FIGHTING_MASTERIES_BY_NAME = new Map(FIGHTING_MASTERIES.map((m) => [m.name, m]));

function levelIndex(character: Character): number {
  return Math.max(1, Math.min(20, character.level || 1)) - 1;
}

// Maneuver-style prerequisite text is either "Proficiency in <Skill>" (hide the option unless the
// character has that skill proficiency) or "<Maneuver name> maneuver" / "<Maneuver name>
// (Improved) maneuver" (an Improved/Greater tier — hide unless the base tier is already known,
// and highlight+sort it to the top once it is). Every other prerequisite (casting ability,
// Companion, etc.) has no computed character state to check against, so it stays purely
// informational.
export function chainPrerequisiteName(prerequisite: string | undefined): string | null {
  if (!prerequisite) return null;
  const m = prerequisite.match(/^(.+) maneuver$/);
  return m ? m[1] : null;
}

export function skillPrerequisiteName(prerequisite: string | undefined): SkillName | null {
  if (!prerequisite) return null;
  const m = prerequisite.match(/^Proficiency in (.+)$/);
  return m && isSkillName(m[1]) ? m[1] : null;
}

export function isVisibleOption(
  option: ClassSubChoiceOption,
  knownNames: Set<string>,
  skills: Record<SkillName, SkillState>
): boolean {
  const chainReq = chainPrerequisiteName(option.prerequisite);
  if (chainReq) return knownNames.has(chainReq);
  const skillReq = skillPrerequisiteName(option.prerequisite);
  if (skillReq) return skills[skillReq]?.proficient ?? false;
  return true;
}

// A def's count-by-level, plus any countBonusFrom bonus once its triggering option is picked
// (e.g. Fighter's Maneuver Strategist adds 2 to Maneuvers Known).
function subChoiceCountAt(character: Character, def: ClassSubChoiceDef, idx: number): number {
  let count = def.countByLevel[idx] ?? 0;
  if (def.countBonusFrom) {
    const { defKey, optionName, bonus } = def.countBonusFrom;
    if ((character.classSubChoicePicks[defKey] ?? []).includes(optionName)) count += bonus;
  }
  return count;
}

export function applicableSubChoiceDefs(character: Character): ClassSubChoiceDef[] {
  const defs = CLASS_SUB_CHOICES_BY_CLASS.get(character.classAppliedName) ?? [];
  return defs.filter((d) => !d.archetypeName || d.archetypeName === character.archetypeAppliedName);
}

// Every option the character has picked across all applicable sub-choice defs (e.g. all chosen
// Berserker Instincts), used for generic effects like passiveBuffText/rageBuffText/speedBonus.
export function allChosenSubChoiceOptions(character: Character): ClassSubChoiceOption[] {
  const out: ClassSubChoiceOption[] = [];
  for (const def of applicableSubChoiceDefs(character)) {
    const chosen = character.classSubChoicePicks[def.key] ?? [];
    for (const name of chosen) {
      const option = def.options.find((o) => o.name === name);
      if (option) out.push(option);
    }
  }
  return out;
}

// True while a Monk keeps their Martial Arts/Unarmored Movement benefits: unarmored and
// shieldless, or (with Vow of the Sentry) in light/medium armor and still shieldless.
export function monkRetainsUnarmoredBenefits(character: Character): boolean {
  if (character.classAppliedName !== "Monk") return false;
  const equippedArmor = character.equipment
    .filter((i) => i.equipped)
    .map((i) => armorCatalogMatch(i.name))
    .filter((a): a is NonNullable<ReturnType<typeof armorCatalogMatch>> => Boolean(a));
  if (equippedArmor.some((a) => a.type === "Shield")) return false;
  const armor = equippedArmor.find((a) => a.type !== "Shield");
  if (!armor) return true;
  const hasVowOfSentry = allChosenSubChoiceOptions(character).some((o) => o.name === "Vow of the Sentry");
  return hasVowOfSentry && (armor.type === "Light" || armor.type === "Medium");
}

// The ability a Monk with Vow of the Focused has chosen to substitute for Wisdom/Charisma on
// monk class features (e.g. Unarmored Defense), or null if not applicable.
export function monkSubstituteAbility(character: Character): AbilityKey | null {
  for (const def of applicableSubChoiceDefs(character)) {
    const chosen = character.classSubChoicePicks[def.key] ?? [];
    const idx = chosen.indexOf("Vow of the Focused");
    if (idx === -1) continue;
    const detail = (character.classSubChoiceDetails[def.key] ?? [])[idx];
    if (detail?.substituteAbility) return detail.substituteAbility;
  }
  return null;
}

// Every source contributing to the character's effective walking speed bonus, for both the
// summed total (activeSpeedBonus) and a labeled breakdown (e.g. the Speed Base hover tooltip).
export function activeSpeedBonusSources(character: Character): { label: string; amount: number }[] {
  const sources: { label: string; amount: number }[] = [];
  for (const o of allChosenSubChoiceOptions(character)) {
    if (o.speedBonus) sources.push({ label: o.name, amount: o.speedBonus });
  }
  if (monkRetainsUnarmoredBenefits(character)) {
    const bonus = MONK_UNARMORED_MOVEMENT_BY_LEVEL[levelIndex(character)] ?? 0;
    if (bonus > 0) sources.push({ label: "Unarmored Movement", amount: bonus });
  }
  return sources;
}

export function activeSpeedBonus(character: Character): number {
  return activeSpeedBonusSources(character).reduce((sum, s) => sum + s.amount, 0);
}

export function activeCarryingCapacityMultiplier(character: Character): number {
  return allChosenSubChoiceOptions(character).reduce((mult, o) => mult * (o.carryingCapacityMultiplier ?? 1), 1);
}

export function activeTravelPaceMultiplier(character: Character): number {
  return allChosenSubChoiceOptions(character).reduce((mult, o) => mult * (o.travelPaceMultiplier ?? 1), 1);
}

// The stored damage-type pick(s) for a specific sub-choice option (e.g. Dewback's Instinct),
// found by scanning classSubChoiceDetails at the same index as the matching pick.
export function chosenDamageTypesFor(character: Character, optionName: string): string[] {
  for (const def of applicableSubChoiceDefs(character)) {
    const chosen = character.classSubChoicePicks[def.key] ?? [];
    const idx = chosen.indexOf(optionName);
    if (idx === -1) continue;
    const detail = (character.classSubChoiceDetails[def.key] ?? [])[idx];
    if (detail?.damageTypes) return detail.damageTypes;
  }
  return [];
}

// Class resources filtered to those the character currently qualifies for — either unconditional,
// or gated behind a specific sub-choice pick (e.g. Fyrnock's Leap only once that instinct is chosen).
export function applicableClassResources(character: Character) {
  const defs = CLASS_RESOURCES_BY_CLASS.get(character.classAppliedName) ?? [];
  return defs.filter((def) => {
    if (!def.requiresSubChoicePick) return true;
    const { defKey, optionName } = def.requiresSubChoicePick;
    return (character.classSubChoicePicks[defKey] ?? []).includes(optionName);
  });
}

export function grantedProficienciesFromSubChoices(character: Character): string[] {
  const out: string[] = [];
  for (const def of applicableSubChoiceDefs(character)) {
    const chosen = character.classSubChoicePicks[def.key] ?? [];
    for (const name of chosen) {
      const option = def.options.find((o) => o.name === name);
      if (option?.grantsProficiency) out.push(option.grantsProficiency);
    }
    for (const detail of character.classSubChoiceDetails[def.key] ?? []) {
      for (const tool of detail.tools ?? []) out.push(tool);
      for (const weapon of detail.weapons ?? []) out.push(weapon);
      if (detail.fightingStyle) {
        const granted = FIGHTING_STYLES_BY_NAME.get(detail.fightingStyle)?.grantsProficiency;
        if (granted) out.push(granted);
      }
      if (detail.fightingMastery) {
        const granted = FIGHTING_MASTERIES_BY_NAME.get(detail.fightingMastery)?.grantsProficiency;
        if (granted) out.push(granted);
      }
    }
  }
  return out;
}

export function grantedLanguagesFromSubChoices(character: Character): string[] {
  const out: string[] = [];
  for (const detailsArr of Object.values(character.classSubChoiceDetails)) {
    for (const detail of detailsArr) out.push(...(detail.languages ?? []));
  }
  return out;
}

// Un-proficients the previously tracked sub-choice skill grants, then re-proficients whatever
// classSubChoiceDetails currently holds — same revert-then-reapply shape used for
// species/class/background, kept in sync here since picks/details grow and shrink over levels.
function resyncSubChoiceGrantedSkills(character: Character): Character {
  const skills = { ...character.skills };
  for (const sk of character.classSubChoiceGrantedSkills) {
    skills[sk] = { ...skills[sk], proficient: false };
  }
  const granted: SkillName[] = [];
  for (const detailsArr of Object.values(character.classSubChoiceDetails)) {
    for (const detail of detailsArr) {
      if (detail.skill) granted.push(detail.skill);
    }
  }
  for (const sk of granted) {
    skills[sk] = { ...skills[sk], proficient: true };
  }
  return { ...character, skills, classSubChoiceGrantedSkills: granted };
}

// Rebuilds classResources from scratch for the character's current class, dropping resources
// from a previous class. When a resource's max grows (leveling up), current grows by the same
// delta (newly available uses start unspent); when max shrinks, current is clamped down.
// Monk's Vow of Serenity adds half the character's Wisdom/Charisma modifier (min +1) to their
// maximum focus points — a formula-based bonus, unlike the flat countBonusFrom mechanism, so it's
// special-cased here rather than added as a new generic ClassResourceDef field for one resource.
export function resourceMaxBonus(character: Character, defKey: string): number {
  if (defKey !== "monk-focus-points") return 0;
  if (!allChosenSubChoiceOptions(character).some((o) => o.name === "Vow of Serenity")) return 0;
  const mod = abilityModifier(character.abilities[character.monkUnarmoredDefenseAbility]);
  return Math.max(1, Math.floor(mod / 2));
}

export function recalcClassResources(character: Character): Character {
  const defs = applicableClassResources(character);
  const idx = levelIndex(character);
  const existingByKey = new Map(character.classResources.map((r) => [r.key, r]));
  const next: ClassResourceState[] = defs.map((def) => {
    const max = (def.maxByLevel[idx] ?? 0) + resourceMaxBonus(character, def.key);
    const existing = existingByKey.get(def.key);
    if (!existing) return { key: def.key, current: max, max };
    const delta = max - existing.max;
    const current = Math.max(0, Math.min(max, existing.current + delta));
    return { key: def.key, current, max };
  });
  return { ...character, classResources: next };
}

// Truncates classSubChoicePicks (and the parallel classSubChoiceDetails) to the current level's
// allowed count per def, and drops picks belonging to a def that no longer applies (e.g. after
// a class change).
export function recalcClassSubChoices(character: Character): Character {
  const defs = applicableSubChoiceDefs(character);
  const idx = levelIndex(character);
  const validKeys = new Set(defs.map((d) => d.key));
  const picks: Record<string, string[]> = {};
  const details: Record<string, ClassSubChoicePickDetail[]> = {};
  for (const [key, chosen] of Object.entries(character.classSubChoicePicks)) {
    if (validKeys.has(key)) picks[key] = chosen;
  }
  for (const [key, detailsArr] of Object.entries(character.classSubChoiceDetails)) {
    if (validKeys.has(key)) details[key] = detailsArr;
  }
  for (const def of defs) {
    const max = subChoiceCountAt(character, def, idx);
    const chosen = picks[def.key] ?? [];
    if (chosen.length > max) {
      picks[def.key] = chosen.slice(0, max);
      details[def.key] = (details[def.key] ?? []).slice(0, max);
    }
  }
  return resyncSubChoiceGrantedSkills({ ...character, classSubChoicePicks: picks, classSubChoiceDetails: details });
}

// The next sub-choice def (if any) that has fewer picks than the current level allows.
export function pendingSubChoice(character: Character): { def: ClassSubChoiceDef; needed: number } | null {
  const defs = applicableSubChoiceDefs(character);
  const idx = levelIndex(character);
  for (const def of defs) {
    const max = subChoiceCountAt(character, def, idx);
    const have = (character.classSubChoicePicks[def.key] ?? []).length;
    if (have < max) return { def, needed: max - have };
  }
  return null;
}

export function applySubChoicePicks(
  character: Character,
  defKey: string,
  newPicks: string[],
  newDetails: ClassSubChoicePickDetail[]
): Character {
  const existingPicks = character.classSubChoicePicks[defKey] ?? [];
  const existingDetails = character.classSubChoiceDetails[defKey] ?? [];
  return resyncSubChoiceGrantedSkills({
    ...character,
    classSubChoicePicks: { ...character.classSubChoicePicks, [defKey]: [...existingPicks, ...newPicks] },
    classSubChoiceDetails: { ...character.classSubChoiceDetails, [defKey]: [...existingDetails, ...newDetails] },
  });
}

export function updateClassResource(character: Character, key: string, current: number): Character {
  return {
    ...character,
    classResources: character.classResources.map((r) => (r.key === key ? { ...r, current } : r)),
  };
}

// The character's maneuvers def (e.g. "fighter-maneuvers"), if any applicable chosen sub-choice
// option grants the ability to swap a known maneuver (e.g. Fighter's Maneuver Strategist).
export function maneuverSwapDef(character: Character): ClassSubChoiceDef | null {
  const hasSwapPerk = allChosenSubChoiceOptions(character).some((o) => o.allowsManeuverSwap);
  if (!hasSwapPerk) return null;
  return applicableSubChoiceDefs(character).find((d) => d.key.endsWith("-maneuvers")) ?? null;
}

// Replaces one already-known pick (by index) within a sub-choice def with a different option,
// clearing any stored detail for that slot (maneuvers never need one).
export function swapSubChoicePick(character: Character, defKey: string, index: number, newName: string): Character {
  const picks = [...(character.classSubChoicePicks[defKey] ?? [])];
  const details = [...(character.classSubChoiceDetails[defKey] ?? [])];
  if (index < 0 || index >= picks.length) return character;
  picks[index] = newName;
  details[index] = {};
  return resyncSubChoiceGrantedSkills({
    ...character,
    classSubChoicePicks: { ...character.classSubChoicePicks, [defKey]: picks },
    classSubChoiceDetails: { ...character.classSubChoiceDetails, [defKey]: details },
  });
}
