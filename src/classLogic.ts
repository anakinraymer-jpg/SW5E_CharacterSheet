import type {
  AbilityKey,
  ArchetypeEntry,
  Character,
  ClassEntry,
  ClassSelections,
  SkillName,
} from "./types";
import { emptyAbilities0 } from "./types";
import { ABILITY_LABEL } from "./speciesLogic";

export function classNeedsChoices(classEntry: ClassEntry): boolean {
  return classEntry.skillChoice.count > 0;
}

export function revertClass(character: Character): Character {
  if (!character.classAppliedName) return character;
  const savingThrows = { ...character.savingThrows };
  for (const key of character.classSavingThrowsApplied) {
    savingThrows[key] = false;
  }
  const skills = { ...character.skills };
  for (const skillName of character.classGrantedSkills) {
    skills[skillName] = { ...skills[skillName], proficient: false };
  }
  return {
    ...character,
    savingThrows,
    skills,
    classAppliedName: "",
    classSavingThrowsApplied: [],
    classGrantedSkills: [],
    classTraitsText: "",
  };
}

export function applyClass(
  character: Character,
  classEntry: ClassEntry,
  selections: ClassSelections
): Character {
  const base = character.classAppliedName ? revertClass(character) : character;

  const savingThrows = { ...base.savingThrows };
  for (const key of classEntry.savingThrows) {
    savingThrows[key] = true;
  }

  const skills = { ...base.skills };
  const grantedSkills: SkillName[] = [];
  for (const skillName of selections.skillChoice) {
    const sk = skillName as SkillName;
    skills[sk] = { ...skills[sk], proficient: true };
    grantedSkills.push(sk);
  }

  const level = Math.max(1, Math.min(20, base.level || 1));
  const row = classEntry.levels[level - 1];

  const next: Character = {
    ...base,
    characterClass: classEntry.name,
    savingThrows,
    skills,
    hitDiceTotal: `${level}d${classEntry.hitDie}`,
    hitDiceRemaining: `${level}d${classEntry.hitDie}`,
    forcePoints: row?.forcePoints !== undefined ? { ...base.forcePoints, max: row.forcePoints } : base.forcePoints,
    techPoints: row?.techPoints !== undefined ? { ...base.techPoints, max: row.techPoints } : base.techPoints,
    classAppliedName: classEntry.name,
    classSavingThrowsApplied: [...classEntry.savingThrows],
    classGrantedSkills: grantedSkills,
  };
  next.classTraitsText = buildClassTraitsText(classEntry, next);
  return next;
}

export function recalcClassForLevel(character: Character, classEntry: ClassEntry): Character {
  const level = Math.max(1, Math.min(20, character.level || 1));
  const row = classEntry.levels[level - 1];
  const next: Character = {
    ...character,
    hitDiceTotal: `${level}d${classEntry.hitDie}`,
    forcePoints:
      row?.forcePoints !== undefined ? { ...character.forcePoints, max: row.forcePoints } : character.forcePoints,
    techPoints:
      row?.techPoints !== undefined ? { ...character.techPoints, max: row.techPoints } : character.techPoints,
  };
  next.classTraitsText = buildClassTraitsText(classEntry, next);
  return next;
}

function buildClassTraitsText(classEntry: ClassEntry, character: Character): string {
  const level = Math.max(1, Math.min(20, character.level || 1));
  const row = classEntry.levels[level - 1];
  const lines: string[] = [];
  lines.push(
    `Hit Die: 1d${classEntry.hitDie} per level. Saving Throws: ${classEntry.savingThrows
      .map((k) => ABILITY_LABEL[k])
      .join(", ")}.`
  );
  lines.push(`Tools: ${classEntry.toolProficiency}.`);
  if (row?.extra) lines.push(`Level ${level} resources — ${row.extra}`);
  lines.push(`Archetype (chosen at ${classEntry.archetypeLevel}rd level) — see the Archetype field for the full list of options, including Echoes of the Force archetypes.`);

  for (const feature of classEntry.features) {
    if (feature.level <= level) {
      lines.push(`${feature.name} (${classEntry.name} ${feature.level}). ${feature.text}`);
    }
  }
  return lines.join("\n\n");
}

export function revertArchetype(character: Character): Character {
  if (!character.archetypeAppliedName) return character;
  return { ...character, archetypeAppliedName: "", archetypeTraitsText: "" };
}

export function applyArchetype(character: Character, archetypeEntry: ArchetypeEntry): Character {
  const next: Character = {
    ...character,
    archetype: archetypeEntry.name,
    archetypeAppliedName: archetypeEntry.name,
  };
  next.archetypeTraitsText = buildArchetypeTraitsText(archetypeEntry, next);
  return next;
}

export function recalcArchetypeForLevel(character: Character, archetypeEntry: ArchetypeEntry): Character {
  return { ...character, archetypeTraitsText: buildArchetypeTraitsText(archetypeEntry, character) };
}

function buildArchetypeTraitsText(archetypeEntry: ArchetypeEntry, character: Character): string {
  const level = Math.max(1, Math.min(20, character.level || 1));
  return archetypeFeaturesText(archetypeEntry, level);
}

// Preview text for an archetype's features unlocked up to (and including) the given level.
// Used both for the applied character's feature panel and the archetype choice dialog.
export function archetypeFeaturesText(archetypeEntry: ArchetypeEntry, level: number): string {
  const lines: string[] = [];
  for (const feature of archetypeEntry.features) {
    if (feature.level <= level) {
      lines.push(`${feature.name} (${archetypeEntry.name} ${feature.level}). ${feature.text}`);
    }
  }
  return lines.join("\n\n");
}

// Whether the character has just reached (or already passed) the class's archetype level
// without having chosen one yet — used to trigger the archetype choice popup.
export function pendingArchetypeChoice(character: Character, classEntry: ClassEntry): boolean {
  return (character.level || 1) >= classEntry.archetypeLevel && !character.archetypeAppliedName;
}

// --- Ability Score Improvement engine ---

export function pendingAsiLevel(character: Character, classEntry: ClassEntry): number | null {
  const level = character.level || 1;
  for (const asiLevel of classEntry.asiLevels) {
    if (asiLevel <= level && !character.asiChoices[asiLevel]) {
      return asiLevel;
    }
  }
  return null;
}

export function applyAsi(character: Character, level: number, abilities: AbilityKey[]): Character {
  const bonus = { ...character.classAbilityBonus };
  const scores = { ...character.abilities };
  const amount = abilities.length === 1 ? 2 : 1;
  for (const a of abilities) {
    bonus[a] += amount;
    scores[a] += amount;
  }
  return {
    ...character,
    abilities: scores,
    classAbilityBonus: bonus,
    asiChoices: { ...character.asiChoices, [level]: abilities },
  };
}

export function revertAsisAboveLevel(character: Character, newLevel: number): Character {
  const toRevert = Object.keys(character.asiChoices)
    .map(Number)
    .filter((lvl) => lvl > newLevel);
  if (toRevert.length === 0) return character;

  const bonus = { ...character.classAbilityBonus };
  const scores = { ...character.abilities };
  const asiChoices = { ...character.asiChoices };
  for (const lvl of toRevert) {
    const abilities = asiChoices[lvl];
    const amount = abilities.length === 1 ? 2 : 1;
    for (const a of abilities) {
      bonus[a] -= amount;
      scores[a] -= amount;
    }
    delete asiChoices[lvl];
  }
  return { ...character, abilities: scores, classAbilityBonus: bonus, asiChoices };
}

export function emptyClassAbilityBonus() {
  return emptyAbilities0();
}
