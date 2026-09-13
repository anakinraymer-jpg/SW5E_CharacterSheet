import type {
  AbilityKey,
  AbilityScores,
  AbilityScoreIncreaseGrant,
  ArchetypeEntry,
  Character,
  ClassEntry,
  ClassFeature,
  ClassSelections,
  EquipmentItem,
  SkillName,
  Weapon,
} from "./types";
import { emptyAbilities0, isSkillName } from "./types";
import { ABILITY_LABEL } from "./speciesLogic";
import { resolveEquipmentParts } from "./equipmentLogic";
import { monkSubstituteAbility } from "./classFeatureLogic";
import { abilityModifier } from "./utils";

export interface UnarmoredDefenseBonus {
  modifier: number; // the class's secondary ability modifier, added on top of 10 + Dex
  allowShield: boolean; // whether wearing a shield still permits this formula
  sourceLabel: string; // e.g. "Berserker Unarmored Defense"
  abilityLabel: string; // e.g. "Constitution"
}

// Class/archetype-granted alternatives to the flat "10 + Dex" unarmored AC. Only one applies at
// a time in practice (a character only has one class), so the first match wins.
export function computeUnarmoredDefenseBonus(character: Character): UnarmoredDefenseBonus | null {
  if (character.classAppliedName === "Berserker") {
    return {
      modifier: abilityModifier(character.abilities.con),
      allowShield: true,
      sourceLabel: "Berserker Unarmored Defense",
      abilityLabel: "Constitution",
    };
  }
  if (character.classAppliedName === "Monk") {
    const substitute = monkSubstituteAbility(character);
    const ability = substitute ?? character.monkUnarmoredDefenseAbility;
    return {
      modifier: abilityModifier(character.abilities[ability]),
      allowShield: false,
      sourceLabel: substitute ? "Monk Unarmored Defense (Vow of the Focused)" : "Monk Unarmored Defense",
      abilityLabel: ABILITY_LABEL[ability],
    };
  }
  if (
    character.classAppliedName === "Fighter" &&
    character.archetypeAppliedName === "Blademaster Specialist" &&
    character.level >= 3
  ) {
    return {
      modifier: abilityModifier(character.abilities.str),
      allowShield: false,
      sourceLabel: "Blademaster Unarmored Defense",
      abilityLabel: "Strength",
    };
  }
  return null;
}

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

// Resolves every chosen equipmentText branch for a class into real inventory rows.
function resolveClassEquipmentGrants(
  classEntry: ClassEntry,
  selections: ClassSelections
): { weapons: Weapon[]; equipment: EquipmentItem[] } {
  const weapons: Weapon[] = [];
  const equipment: EquipmentItem[] = [];
  selections.equipmentChoice.forEach((branchKey, lineIndex) => {
    const parts = classEntry.equipmentGrants[branchKey];
    if (!parts) return;
    const itemChoices = selections.equipmentItemChoices[lineIndex] ?? [];
    const resolved = resolveEquipmentParts(parts, itemChoices, selections.toolChoice);
    weapons.push(...resolved.weapons);
    equipment.push(...resolved.equipment);
  });
  return { weapons, equipment };
}

// Saving throw proficiencies granted by a level threshold rather than at class-apply time
// (e.g. Operative's Slippery Mind, level 15: proficiency in Wisdom saving throws) — re-evaluated
// on every level change via recalcClassForLevel, distinct from the fixed base saves in
// classSavingThrowsApplied.
const ALL_ABILITIES: AbilityKey[] = ["str", "dex", "con", "int", "wis", "cha"];

function levelGrantedSavingThrows(className: string, level: number): AbilityKey[] {
  if (className === "Operative" && level >= 15) return ["wis"];
  if (className === "Monk" && level >= 14) return ALL_ABILITIES; // Diamond Soul
  return [];
}

// --- Capstone ability score increases (e.g. Monk's Perfect Self, Guardian's "Master of X" forms) ---
// A capstone feature's abilityScoreIncrease slots that have only one option are fixed and always
// apply once the feature's level is reached; slots with multiple options need a player pick, which
// is what `choice[i]` holds. Auto-fills fixed slots and leaves choice-slots as-is (null if unset).
function fillCapstoneChoice(
  grant: AbilityScoreIncreaseGrant[] | undefined,
  choice: (AbilityKey | null)[]
): (AbilityKey | null)[] {
  if (!grant) return [];
  return grant.map((slot, i) => {
    if (slot.options.length === 1) return slot.options[0];
    const existing = choice[i];
    return existing && slot.options.includes(existing) ? existing : null;
  });
}

function capstoneBonusFromChoice(
  grant: AbilityScoreIncreaseGrant[] | undefined,
  choice: (AbilityKey | null)[]
): AbilityScores {
  const bonus = emptyAbilities0();
  if (!grant) return bonus;
  grant.forEach((slot, i) => {
    const ability = choice[i];
    if (ability) bonus[ability] += slot.amount;
  });
  return bonus;
}

function applyAbilityBonusDiff(abilities: AbilityScores, oldBonus: AbilityScores, newBonus: AbilityScores): AbilityScores {
  const next = { ...abilities };
  (Object.keys(next) as AbilityKey[]).forEach((k) => {
    next[k] += newBonus[k] - oldBonus[k];
  });
  return next;
}

function abilityScoresEqual(a: AbilityScores, b: AbilityScores): boolean {
  return (Object.keys(a) as AbilityKey[]).every((k) => a[k] === b[k]);
}

function capstoneChoicesEqual(a: (AbilityKey | null)[], b: (AbilityKey | null)[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

// The class's own capstone feature (if any) reached at the current level — there is at most one
// per class in the catalog today, but this scans the full features list rather than assuming a
// fixed index.
function classCapstoneFeature(classEntry: ClassEntry, level: number): ClassFeature | undefined {
  return classEntry.features.find((f) => f.abilityScoreIncrease && f.level <= level);
}

function archetypeCapstoneFeature(archetypeEntry: ArchetypeEntry, level: number): ClassFeature | undefined {
  return archetypeEntry.features.find((f) => f.abilityScoreIncrease && f.level <= level);
}

// Recomputes the class capstone's applied bonus for the current level, auto-filling any
// fixed (single-option) slots. Leaves choice-slots null until the player picks via
// applyClassCapstoneChoice — pendingClassCapstone() surfaces that as a dialog trigger.
// Returns `character` unchanged (same reference) when nothing actually needs to change — critical
// here, not just an optimization: this runs inside the level-reactive effect, which watches
// character.abilities, so producing a fresh (even if value-identical) abilities object on every
// call would retrigger that effect forever.
function recalcClassCapstone(character: Character, classEntry: ClassEntry): Character {
  const level = Math.max(1, Math.min(20, character.level || 1));
  const feature = classCapstoneFeature(classEntry, level);
  const choice = fillCapstoneChoice(feature?.abilityScoreIncrease, character.classCapstoneChoice);
  const bonus = capstoneBonusFromChoice(feature?.abilityScoreIncrease, choice);
  if (capstoneChoicesEqual(choice, character.classCapstoneChoice) && abilityScoresEqual(bonus, character.classCapstoneBonus)) {
    return character;
  }
  return {
    ...character,
    abilities: applyAbilityBonusDiff(character.abilities, character.classCapstoneBonus, bonus),
    classCapstoneChoice: choice,
    classCapstoneBonus: bonus,
  };
}

function recalcArchetypeCapstone(character: Character, archetypeEntry: ArchetypeEntry): Character {
  const level = Math.max(1, Math.min(20, character.level || 1));
  const feature = archetypeCapstoneFeature(archetypeEntry, level);
  const choice = fillCapstoneChoice(feature?.abilityScoreIncrease, character.archetypeCapstoneChoice);
  const bonus = capstoneBonusFromChoice(feature?.abilityScoreIncrease, choice);
  if (capstoneChoicesEqual(choice, character.archetypeCapstoneChoice) && abilityScoresEqual(bonus, character.archetypeCapstoneBonus)) {
    return character;
  }
  return {
    ...character,
    abilities: applyAbilityBonusDiff(character.abilities, character.archetypeCapstoneBonus, bonus),
    archetypeCapstoneChoice: choice,
    archetypeCapstoneBonus: bonus,
  };
}

// The class capstone feature is visible (level reached) but has at least one choice-slot the
// player hasn't picked yet — used to trigger the ability-choice dialog, same shape as pendingAsiLevel.
export function pendingClassCapstone(character: Character, classEntry: ClassEntry): ClassFeature | null {
  const level = Math.max(1, Math.min(20, character.level || 1));
  const feature = classCapstoneFeature(classEntry, level);
  if (!feature?.abilityScoreIncrease) return null;
  const choice = fillCapstoneChoice(feature.abilityScoreIncrease, character.classCapstoneChoice);
  return choice.some((c) => c === null) ? feature : null;
}

export function pendingArchetypeCapstone(character: Character, archetypeEntry: ArchetypeEntry): ClassFeature | null {
  const level = Math.max(1, Math.min(20, character.level || 1));
  const feature = archetypeCapstoneFeature(archetypeEntry, level);
  if (!feature?.abilityScoreIncrease) return null;
  const choice = fillCapstoneChoice(feature.abilityScoreIncrease, character.archetypeCapstoneChoice);
  return choice.some((c) => c === null) ? feature : null;
}

// `picks` is index-aligned with the feature's abilityScoreIncrease slots; entries for fixed
// (single-option) slots are ignored (recalcClassCapstone re-fills them regardless).
export function applyClassCapstoneChoice(character: Character, classEntry: ClassEntry, picks: (AbilityKey | null)[]): Character {
  return recalcClassCapstone({ ...character, classCapstoneChoice: picks }, classEntry);
}

export function applyArchetypeCapstoneChoice(character: Character, archetypeEntry: ArchetypeEntry, picks: (AbilityKey | null)[]): Character {
  return recalcArchetypeCapstone({ ...character, archetypeCapstoneChoice: picks }, archetypeEntry);
}

export function revertClass(character: Character): Character {
  if (!character.classAppliedName) return character;
  const savingThrows = { ...character.savingThrows };
  for (const key of character.classSavingThrowsApplied) {
    savingThrows[key] = false;
  }
  for (const key of character.classLevelSavingThrowsApplied) {
    savingThrows[key] = false;
  }
  const skills = { ...character.skills };
  for (const skillName of character.classGrantedSkills) {
    skills[skillName] = { ...skills[skillName], proficient: false };
  }
  const grantedEquipmentIds = new Set(character.classGrantedEquipmentIds);
  const grantedWeaponIds = new Set(character.classGrantedWeaponIds);
  const abilities = applyAbilityBonusDiff(character.abilities, character.classCapstoneBonus, emptyAbilities0());
  return {
    ...character,
    abilities,
    savingThrows,
    skills,
    credits: character.credits - character.classCreditsApplied,
    equipment: character.equipment.filter((item) => !grantedEquipmentIds.has(item.id)),
    weapons: character.weapons.filter((w) => !grantedWeaponIds.has(w.id)),
    classAppliedName: "",
    classSavingThrowsApplied: [],
    classLevelSavingThrowsApplied: [],
    classGrantedSkills: [],
    classGrantedProficiencies: [],
    classCapstoneChoice: [],
    classCapstoneBonus: emptyAbilities0(),
    classTraitsText: "",
    classEquipmentText: [],
    classGrantedEquipmentIds: [],
    classGrantedWeaponIds: [],
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
  const levelSavingThrows = levelGrantedSavingThrows(classEntry.name, Math.max(1, Math.min(20, base.level || 1)));
  for (const key of levelSavingThrows) {
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

  const grantedItems = selections.useStartingFunds
    ? { weapons: [], equipment: [] }
    : resolveClassEquipmentGrants(classEntry, selections);

  const forceMod = abilityModifier(base.abilities[base.forceCastingAbility]);
  const techMod = abilityModifier(base.abilities.int);

  const next: Character = {
    ...base,
    characterClass: classEntry.name,
    savingThrows,
    skills,
    credits: base.credits + creditsApplied,
    hitDiceTotal: `${level}d${classEntry.hitDie}`,
    hitDiceRemaining: `${level}d${classEntry.hitDie}`,
    forcePoints:
      row?.forcePoints !== undefined ? { ...base.forcePoints, max: row.forcePoints + forceMod } : base.forcePoints,
    techPoints:
      row?.techPoints !== undefined ? { ...base.techPoints, max: row.techPoints + techMod } : base.techPoints,
    classAppliedName: classEntry.name,
    classSavingThrowsApplied: [...classEntry.savingThrows],
    classLevelSavingThrowsApplied: levelSavingThrows,
    classGrantedSkills: grantedSkills,
    classGrantedProficiencies: grantedProficiencies,
    classEquipmentText: equipmentText,
    classGrantedEquipmentIds: grantedItems.equipment.map((i) => i.id),
    classGrantedWeaponIds: grantedItems.weapons.map((w) => w.id),
    classCreditsApplied: creditsApplied,
    equipment: [...base.equipment, ...grantedItems.equipment],
    weapons: [...base.weapons, ...grantedItems.weapons],
  };
  next.classTraitsText = buildClassTraitsText(classEntry, next);
  return next;
}

export function recalcClassForLevel(character: Character, classEntry: ClassEntry): Character {
  const level = Math.max(1, Math.min(20, character.level || 1));
  const row = classEntry.levels[level - 1];
  const forceMod = abilityModifier(character.abilities[character.forceCastingAbility]);
  const techMod = abilityModifier(character.abilities.int);

  const savingThrows = { ...character.savingThrows };
  for (const key of character.classLevelSavingThrowsApplied) {
    // Don't strip a save that's independently granted by the class's fixed base saves —
    // only unset it if this level-granted feature (e.g. Diamond Soul) was its sole source.
    if (!character.classSavingThrowsApplied.includes(key)) {
      savingThrows[key] = false;
    }
  }
  const levelSavingThrows = levelGrantedSavingThrows(classEntry.name, level);
  for (const key of levelSavingThrows) {
    savingThrows[key] = true;
  }

  const next: Character = {
    ...character,
    savingThrows,
    classLevelSavingThrowsApplied: levelSavingThrows,
    hitDiceTotal: `${level}d${classEntry.hitDie}`,
    forcePoints:
      row?.forcePoints !== undefined
        ? { ...character.forcePoints, max: row.forcePoints + forceMod }
        : character.forcePoints,
    techPoints:
      row?.techPoints !== undefined
        ? { ...character.techPoints, max: row.techPoints + techMod }
        : character.techPoints,
  };
  next.classTraitsText = buildClassTraitsText(classEntry, next);
  return recalcClassCapstone(next, classEntry);
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
  const abilities = applyAbilityBonusDiff(character.abilities, character.archetypeCapstoneBonus, emptyAbilities0());
  return {
    ...character,
    abilities,
    skills,
    archetypeAppliedName: "",
    archetypeTraitsText: "",
    archetypeFeatureChoiceSelections: {},
    archetypeFeatureGrantedSkills: [],
    archetypeCapstoneChoice: [],
    archetypeCapstoneBonus: emptyAbilities0(),
  };
}

export function applyArchetype(character: Character, archetypeEntry: ArchetypeEntry): Character {
  const base: Character = {
    ...character,
    archetype: archetypeEntry.name,
    archetypeAppliedName: archetypeEntry.name,
  };
  const next = resyncArchetypeFeatureGrantedSkills(base, archetypeEntry);
  next.archetypeTraitsText = buildArchetypeTraitsText(archetypeEntry, next);
  return recalcArchetypeCapstone(next, archetypeEntry);
}

export function recalcArchetypeForLevel(character: Character, archetypeEntry: ArchetypeEntry): Character {
  const next = { ...character, archetypeTraitsText: buildArchetypeTraitsText(archetypeEntry, character) };
  return recalcArchetypeCapstone(next, archetypeEntry);
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
  const level = Math.max(1, Math.min(20, character.level || 1));
  const granted: SkillName[] = [];
  for (const feature of archetypeEntry.features) {
    if (feature.level <= level && feature.grantsSkills) {
      granted.push(...feature.grantsSkills);
    }
    const selections = character.archetypeFeatureChoiceSelections[feature.name];
    if (!selections) continue;
    feature.choices?.forEach((choiceDef, i) => {
      if (choiceDef.kind !== "skill" && choiceDef.kind !== "skillOrTool" && choiceDef.kind !== "skillOrLanguage") return;
      const chosen = selections[i] ?? [];
      chosen.forEach((val) => {
        if (isSkillName(val)) granted.push(val);
      });
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
      if (choiceDef.kind === "language") {
        out.push(...(selections[i] ?? []));
      } else if (choiceDef.kind === "skillOrLanguage") {
        (selections[i] ?? []).forEach((val) => {
          if (!isSkillName(val)) out.push(val);
        });
      }
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
      chosen.forEach((val) => {
        if (choiceDef.kind === "skillOrTool" && isSkillName(val)) return;
        if (choiceDef.kind === "skillOrLanguage") return;
        out.push(`${val} (${choiceDef.label})`);
      });
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
