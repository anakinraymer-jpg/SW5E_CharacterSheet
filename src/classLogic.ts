import type {
  AbilityKey,
  ArchetypeEntry,
  Character,
  ClassEntry,
  ClassFeature,
  ClassSelections,
  SkillName,
} from "./types";
import { emptyAbilities0 } from "./types";
import { ABILITY_LABEL } from "./speciesLogic";

export function classNeedsChoices(classEntry: ClassEntry): boolean {
  return classEntry.skillChoice.count > 0 || classEntry.toolChoices.length > 0;
}

// Parses a "(a) X or (b) Y" / "(a) X, (b) Y, or (c) Z" equipment line into its lettered options.
export function parseEquipmentOptions(line: string): string[] {
  return line
    .split(/\([a-z]\)\s*/i)
    .filter(Boolean)
    .map((part) =>
      part
        .replace(/\s+(or|and)\s*$/i, "")
        .replace(/,\s*$/, "")
        .trim()
    );
}

export interface StartingFundsFormula {
  count: number;
  sides: number;
  multiplier: number;
}

// Parses a "5d4 x 100 cr" starting-funds string into its roll formula.
export function parseStartingFunds(text: string): StartingFundsFormula | null {
  const m = text.match(/(\d+)d(\d+)\s*x\s*(\d+)/i);
  if (!m) return null;
  return { count: Number(m[1]), sides: Number(m[2]), multiplier: Number(m[3]) };
}

export function rollStartingFunds(formula: StartingFundsFormula): number {
  let total = 0;
  for (let i = 0; i < formula.count; i++) {
    total += 1 + Math.floor(Math.random() * formula.sides);
  }
  return total * formula.multiplier;
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
    credits: character.credits - character.classCreditsApplied,
    classAppliedName: "",
    classSavingThrowsApplied: [],
    classGrantedSkills: [],
    classGrantedProficiencies: [],
    classTraitsText: "",
    classEquipmentText: [],
    classCreditsApplied: 0,
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

  const creditsApplied = selections.useStartingFunds ? selections.rolledFunds : 0;
  const equipmentText = selections.useStartingFunds ? [] : selections.equipmentChoice;

  const grantedProficiencies = [...classEntry.fixedToolProficiencies];
  classEntry.toolChoices.forEach((choiceDef, i) => {
    const chosen = (selections.toolChoice[i] ?? []).filter(Boolean);
    chosen.forEach((val) => grantedProficiencies.push(`${val} (${choiceDef.label})`));
  });

  const next: Character = {
    ...base,
    characterClass: classEntry.name,
    savingThrows,
    skills,
    credits: base.credits + creditsApplied,
    hitDiceTotal: `${level}d${classEntry.hitDie}`,
    hitDiceRemaining: `${level}d${classEntry.hitDie}`,
    forcePoints: row?.forcePoints !== undefined ? { ...base.forcePoints, max: row.forcePoints } : base.forcePoints,
    techPoints: row?.techPoints !== undefined ? { ...base.techPoints, max: row.techPoints } : base.techPoints,
    classAppliedName: classEntry.name,
    classSavingThrowsApplied: [...classEntry.savingThrows],
    classGrantedSkills: grantedSkills,
    classGrantedProficiencies: grantedProficiencies,
    classEquipmentText: equipmentText,
    classCreditsApplied: creditsApplied,
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
  const toolsText =
    character.classGrantedProficiencies.length > 0
      ? character.classGrantedProficiencies.join(", ")
      : classEntry.toolProficiency;
  lines.push(`Tools: ${toolsText}.`);
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
  const skills = { ...character.skills };
  for (const sk of character.archetypeFeatureGrantedSkills) {
    skills[sk] = { ...skills[sk], proficient: false };
  }
  return {
    ...character,
    skills,
    archetypeAppliedName: "",
    archetypeTraitsText: "",
    archetypeFeatureChoiceSelections: {},
    archetypeFeatureGrantedSkills: [],
  };
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
  const lines: string[] = [];
  for (const feature of archetypeEntry.features) {
    if (feature.level > level) continue;
    let text = feature.text;
    const selections = character.archetypeFeatureChoiceSelections[feature.name];
    if (selections && feature.choices?.length) {
      const extras = feature.choices.map((choiceDef, i) => {
        const chosen = selections[i] ?? [];
        return chosen.length ? `${choiceDef.label}: ${chosen.join(", ")}` : `${choiceDef.label}: (unset)`;
      });
      text = `${text} [${extras.join("; ")}]`;
    }
    lines.push(`${feature.name} (${archetypeEntry.name} ${feature.level}). ${text}`);
  }
  return lines.join("\n\n");
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

// --- Archetype feature choices (e.g. Silver Tongue's languages+skill, Gambler's Aptitude's skill) ---

// The next archetype feature (at or below current level) whose choices haven't been resolved yet.
export function pendingArchetypeFeatureChoice(
  character: Character,
  archetypeEntry: ArchetypeEntry
): ClassFeature | null {
  const level = Math.max(1, Math.min(20, character.level || 1));
  for (const feature of archetypeEntry.features) {
    if (feature.level > level) continue;
    if (!feature.choices || feature.choices.length === 0) continue;
    if (character.archetypeFeatureChoiceSelections[feature.name]) continue;
    return feature;
  }
  return null;
}

export function applyArchetypeFeatureChoice(
  character: Character,
  archetypeEntry: ArchetypeEntry,
  featureName: string,
  selections: string[][]
): Character {
  const next: Character = {
    ...character,
    archetypeFeatureChoiceSelections: {
      ...character.archetypeFeatureChoiceSelections,
      [featureName]: selections.map((arr) => arr.filter(Boolean)),
    },
  };
  const synced = resyncArchetypeFeatureGrantedSkills(next, archetypeEntry);
  return { ...synced, archetypeTraitsText: buildArchetypeTraitsText(archetypeEntry, synced) };
}

// Un-proficients the previously tracked archetype-feature skill grants, then re-proficients
// whatever archetypeFeatureChoiceSelections currently holds — same revert-then-reapply shape
// used for class sub-choices, kept in sync as selections are added/pruned across levels.
function resyncArchetypeFeatureGrantedSkills(character: Character, archetypeEntry: ArchetypeEntry): Character {
  const skills = { ...character.skills };
  for (const sk of character.archetypeFeatureGrantedSkills) {
    skills[sk] = { ...skills[sk], proficient: false };
  }
  const granted: SkillName[] = [];
  for (const feature of archetypeEntry.features) {
    const selections = character.archetypeFeatureChoiceSelections[feature.name];
    if (!selections) continue;
    feature.choices?.forEach((choiceDef, i) => {
      if (choiceDef.kind !== "skill") return;
      const chosen = (selections[i] ?? []) as SkillName[];
      chosen.forEach((sk) => granted.push(sk));
    });
  }
  for (const sk of granted) {
    skills[sk] = { ...skills[sk], proficient: true };
  }
  return { ...character, skills, archetypeFeatureGrantedSkills: granted };
}

// Prunes selections for features whose level requirement is no longer met (e.g. leveling down),
// and resyncs the skills they grant. No-op if no archetype is applied.
export function recalcArchetypeFeatureChoices(character: Character, archetypeEntry: ArchetypeEntry | undefined): Character {
  if (!archetypeEntry) return character;
  const level = Math.max(1, Math.min(20, character.level || 1));
  const validNames = new Set(archetypeEntry.features.filter((f) => f.level <= level).map((f) => f.name));
  const selections: Record<string, string[][]> = {};
  for (const [name, sel] of Object.entries(character.archetypeFeatureChoiceSelections)) {
    if (validNames.has(name)) selections[name] = sel;
  }
  const synced = resyncArchetypeFeatureGrantedSkills(
    { ...character, archetypeFeatureChoiceSelections: selections },
    archetypeEntry
  );
  return { ...synced, archetypeTraitsText: buildArchetypeTraitsText(archetypeEntry, synced) };
}

export function grantedLanguagesFromArchetypeFeatures(character: Character, archetypeEntry: ArchetypeEntry | undefined): string[] {
  if (!archetypeEntry) return [];
  const out: string[] = [];
  for (const feature of archetypeEntry.features) {
    const selections = character.archetypeFeatureChoiceSelections[feature.name];
    if (!selections) continue;
    feature.choices?.forEach((choiceDef, i) => {
      if (choiceDef.kind !== "language") return;
      out.push(...(selections[i] ?? []));
    });
  }
  return out;
}

export function grantedProficienciesFromArchetypeFeatures(character: Character, archetypeEntry: ArchetypeEntry | undefined): string[] {
  if (!archetypeEntry) return [];
  const level = Math.max(1, Math.min(20, character.level || 1));
  const out: string[] = [];
  for (const feature of archetypeEntry.features) {
    if (feature.level > level) continue;
    if (feature.grantsProficiency) out.push(feature.grantsProficiency);
    const selections = character.archetypeFeatureChoiceSelections[feature.name];
    if (!selections) continue;
    feature.choices?.forEach((choiceDef, i) => {
      if (choiceDef.kind === "skill" || choiceDef.kind === "language") return;
      const chosen = selections[i] ?? [];
      chosen.forEach((val) => out.push(`${val} (${choiceDef.label})`));
    });
  }
  return out;
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
