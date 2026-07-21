import type { Character, ClassResourceState, ClassSubChoiceDef } from "./types";
import { CLASS_RESOURCES_BY_CLASS, CLASS_SUB_CHOICES_BY_CLASS } from "./data/classFeatureChoices";

function levelIndex(character: Character): number {
  return Math.max(1, Math.min(20, character.level || 1)) - 1;
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

// Truncates classSubChoicePicks to the current level's allowed count per def, and drops
// picks belonging to a def that no longer applies (e.g. after a class change).
export function recalcClassSubChoices(character: Character): Character {
  const defs = CLASS_SUB_CHOICES_BY_CLASS.get(character.classAppliedName) ?? [];
  const idx = levelIndex(character);
  const validKeys = new Set(defs.map((d) => d.key));
  const picks: Record<string, string[]> = {};
  for (const [key, chosen] of Object.entries(character.classSubChoicePicks)) {
    if (validKeys.has(key)) picks[key] = chosen;
  }
  for (const def of defs) {
    const max = def.countByLevel[idx] ?? 0;
    const chosen = picks[def.key] ?? [];
    if (chosen.length > max) picks[def.key] = chosen.slice(0, max);
  }
  return { ...character, classSubChoicePicks: picks };
}

// The next sub-choice def (if any) that has fewer picks than the current level allows.
export function pendingSubChoice(character: Character): { def: ClassSubChoiceDef; needed: number } | null {
  const defs = CLASS_SUB_CHOICES_BY_CLASS.get(character.classAppliedName) ?? [];
  const idx = levelIndex(character);
  for (const def of defs) {
    const max = def.countByLevel[idx] ?? 0;
    const have = (character.classSubChoicePicks[def.key] ?? []).length;
    if (have < max) return { def, needed: max - have };
  }
  return null;
}

export function applySubChoicePicks(character: Character, defKey: string, newPicks: string[]): Character {
  const existing = character.classSubChoicePicks[defKey] ?? [];
  return {
    ...character,
    classSubChoicePicks: { ...character.classSubChoicePicks, [defKey]: [...existing, ...newPicks] },
  };
}

export function updateClassResource(character: Character, key: string, current: number): Character {
  return {
    ...character,
    classResources: character.classResources.map((r) => (r.key === key ? { ...r, current } : r)),
  };
}
