import type { AbilityKey, Character, SkillName, SkillState } from "./types";

// Several sources (species, background, class, archetype features, class sub-choices, feats) can
// grant the same skill or saving throw. Each source tracks what it granted so it can be undone,
// but undoing one must not strip a proficiency another source still provides.

export type GrantSource = "species" | "background" | "class" | "archetype" | "subChoice" | "feat";

interface Exclusion {
  except?: GrantSource; // ignore everything this whole source granted (it is being reverted)
  ignoreFeatId?: string; // ignore just this one feat (it is being removed)
}

function featSkills(c: Character, ignoreFeatId?: string): SkillName[] {
  const out: SkillName[] = [];
  for (const f of c.feats) {
    if (f.id === ignoreFeatId) continue;
    if (f.skillProficiencyGranted) out.push(f.skillProficiencyGranted);
    if (f.choiceSkillsGranted) out.push(...f.choiceSkillsGranted);
  }
  return out;
}

export function skillGrantedByOther(c: Character, skill: SkillName, ex: Exclusion): boolean {
  const lists: [GrantSource, SkillName[]][] = [
    ["species", c.speciesGrantedSkills],
    ["background", c.backgroundGrantedSkills],
    ["class", c.classGrantedSkills],
    ["archetype", c.archetypeFeatureGrantedSkills],
    ["subChoice", c.classSubChoiceGrantedSkills],
    ["feat", ex.except === "feat" ? [] : featSkills(c, ex.ignoreFeatId)],
  ];
  return lists.some(([source, list]) => source !== ex.except && list.includes(skill));
}

// Removes a skill proficiency (and any expertise built on it) unless another source still grants it.
export function revokeSkill(
  skills: Record<SkillName, SkillState>,
  skill: SkillName,
  character: Character,
  ex: Exclusion
): void {
  if (skillGrantedByOther(character, skill, ex)) return;
  skills[skill] = { ...skills[skill], proficient: false, expertise: false };
}

// Free-text fields (Resistances) can mix species text, feat blurbs and the player's own notes.
// Adding/removing a source's blurb by exact substring never disturbs the rest.
export function appendFragment(text: string, fragment: string): string {
  if (!fragment || text.includes(fragment)) return text;
  return text.trim() ? `${text.trim()} ${fragment}` : fragment;
}

export function removeFragment(text: string, fragment: string): string {
  if (!fragment) return text;
  return text.replace(fragment, "").replace(/\s{2,}/g, " ").trim();
}

export function saveGrantedByOther(
  c: Character,
  key: AbilityKey,
  ex: { except?: "class" | "feat"; ignoreFeatId?: string }
): boolean {
  if (ex.except !== "class" && (c.classSavingThrowsApplied.includes(key) || c.classLevelSavingThrowsApplied.includes(key))) {
    return true;
  }
  if (ex.except === "feat") return false;
  return c.feats.some((f) => f.id !== ex.ignoreFeatId && f.savingThrowGranted === key);
}
