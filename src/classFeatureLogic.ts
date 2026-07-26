import type { Character, ClassResourceState, ClassSubChoiceDef, ClassSubChoicePickDetail, SkillName } from "./types";
import { CLASS_RESOURCES_BY_CLASS, CLASS_SUB_CHOICES_BY_CLASS } from "./data/classFeatureChoices";

function levelIndex(character: Character): number {
  return Math.max(1, Math.min(20, character.level || 1)) - 1;
}

export function applicableSubChoiceDefs(character: Character): ClassSubChoiceDef[] {
  const defs = CLASS_SUB_CHOICES_BY_CLASS.get(character.classAppliedName) ?? [];
  return defs.filter((d) => !d.archetypeName || d.archetypeName === character.archetypeAppliedName);
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
export function recalcClassResources(character: Character): Character {
  const defs = CLASS_RESOURCES_BY_CLASS.get(character.classAppliedName) ?? [];
  const idx = levelIndex(character);
  const existingByKey = new Map(character.classResources.map((r) => [r.key, r]));
  const next: ClassResourceState[] = defs.map((def) => {
    const max = def.maxByLevel[idx] ?? 0;
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
    const max = def.countByLevel[idx] ?? 0;
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
    const max = def.countByLevel[idx] ?? 0;
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
