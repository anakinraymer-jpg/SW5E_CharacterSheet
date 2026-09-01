export type AbilityKey = "str" | "dex" | "con" | "int" | "wis" | "cha";

export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface SkillState {
  proficient: boolean;
  expertise: boolean;
}

export type SkillName =
  | "Athletics"
  | "Acrobatics"
  | "Sleight of Hand"
  | "Stealth"
  | "Lore"
  | "Piloting"
  | "Investigation"
  | "Nature"
  | "Technology"
  | "Animal Handling"
  | "Insight"
  | "Medicine"
  | "Perception"
  | "Survival"
  | "Deception"
  | "Intimidation"
  | "Performance"
  | "Persuasion";

export type PowerAlignment = "Light" | "Dark" | "Universal";

export type SpeciesChoiceKind =
  | "skill"
  | "language"
  | "instrument"
  | "tool"
  | "kit"
  | "weapon"
  | "other"
  | "skillOrTool" // a single pick that may be either a skill or a tool (e.g. Practiced)
  | "skillOrLanguage"; // a single pick that may be either a skill or a language (e.g. Bonus Proficiency)

export interface SpeciesTraitChoice {
  kind: SpeciesChoiceKind;
  label: string;
  count: number;
  options: string[];
}

export interface SpeciesTrait {
  name: string;
  text: string;
  grantsSkills?: SkillName[];
  grantsProficiency?: string; // fixed non-skill proficiency this trait grants (armor/weapon/tool)
  grantsCreditsMultiplier?: number; // e.g. Wealthy: bonus credits = level * proficiency bonus * this multiplier
  choices?: SpeciesTraitChoice[];
}

export interface AbilityChoiceIncrease {
  amount: number;
  count: number;
  options: AbilityKey[];
}

export interface AbilityIncrease {
  fixed: Partial<Record<AbilityKey, number>>;
  choices: AbilityChoiceIncrease[];
  humanVariant?: boolean;
}

export interface SpeciesEntry {
  name: string;
  size: string;
  speed: number;
  abilityIncrease: AbilityIncrease;
  knownLanguages: string[];
  languageChoice?: { count: number; options?: string[] };
  traits: SpeciesTrait[];
}

export interface SpeciesSelections {
  abilityChoices: AbilityKey[][]; // one array of chosen abilities per AbilityChoiceIncrease
  humanFixedTwo?: AbilityKey; // Human variant A: the +2 ability
  humanFixedOnes?: AbilityKey[]; // Human variant A: the two +1 abilities
  humanFourOnes?: AbilityKey[]; // Human variant B: four +1 abilities
  languageChoice: string[];
  traitChoices: Record<string, string[][]>; // trait name -> per-choice selected options
}

export interface ClassLevelRow {
  level: number;
  features: string; // raw "Features" column text, "-" if none
  forcePoints?: number;
  techPoints?: number;
  extra?: string; // other per-level resource columns, formatted for display
}

export interface ClassFeature {
  name: string;
  level: number;
  text: string;
  grantsProficiency?: string; // fixed proficiency this feature grants once its level is reached
  grantsSkills?: SkillName[]; // fixed skill proficiencies this feature grants once its level is reached
  choices?: SpeciesTraitChoice[]; // reused choice structure (skill/language/tool/weapon picks)
}

export interface ClassEntry {
  name: string;
  hitDie: number;
  primaryAbility: string;
  savingThrows: [AbilityKey, AbilityKey];
  armorProficiency: string;
  weaponProficiency: string;
  armorProficiencies: string[];
  weaponProficiencies: { label: string; note?: string }[];
  toolProficiency: string;
  fixedToolProficiencies: string[];
  toolChoices: SpeciesTraitChoice[];
  skillChoice: { count: number; options: string[] };
  equipmentText: string[];
  equipmentGrants: Record<string, EquipmentPart[]>; // keyed by the exact parseEquipmentOptions() branch string (or full line text for unlettered lines)
  startingFunds: string;
  archetypeLevel: number;
  archetypeNames: string[];
  asiLevels: number[];
  levels: ClassLevelRow[];
  features: ClassFeature[];
}

export interface BackgroundSkillChoice {
  count: number;
  options: SkillName[];
}

export interface BackgroundLanguageGrant {
  fixed: string[];
  choiceCount: number;
}

export interface BackgroundEntry {
  name: string;
  skillChoice: BackgroundSkillChoice;
  toolProficienciesText: string;
  fixedToolProficiencies: string[];
  toolChoices: SpeciesTraitChoice[];
  languages: BackgroundLanguageGrant;
  equipmentText: string;
  equipmentGrants: EquipmentPart[];
  startingCredits: number;
  featureName: string;
  featureText: string;
}

export interface BackgroundSelections {
  skillChoice: string[];
  languageChoice: string[];
  toolChoice: string[][];
}

export interface ArchetypeEntry {
  name: string;
  className: string;
  features: ClassFeature[];
}

export interface ClassSelections {
  skillChoice: string[];
  toolChoice: string[][];
  equipmentChoice: string[];
  equipmentItemChoices: string[][]; // indexed [lineIndex][partIndex], one entry per EquipmentPart with choiceLabel in that line's equipmentGrants
  useStartingFunds: boolean;
  rolledFunds: number;
}

export type ClassResourceRefresh = "Short Rest" | "Long Rest";

export interface ClassResourceDef {
  key: string;
  label: string;
  className: string;
  refresh: ClassResourceRefresh;
  maxByLevel: number[]; // length 20, index 0 = level 1
  dieByLevel?: (string | null)[]; // parallel die-size text, e.g. "d4"
}

export interface ClassResourceState {
  key: string;
  current: number;
  max: number;
}

export interface ClassSubChoiceOption {
  name: string;
  text: string;
  prerequisite?: string;
  grantsProficiency?: string; // fixed proficiency this option grants (e.g. "Medium armor"), if any
  languageChoiceCount?: number; // e.g. Scholar's Ambassador discovery: pick this many languages
  skillChoice?: boolean; // grants one skill of the player's choice (e.g. Monk's Vow of the Open Mind)
  skillOrToolFork?: boolean; // "a skill and a tool, or two tools" pattern (Learner's Exploit, etc.)
  weaponChoiceCount?: number; // e.g. Operative's Weaponmaster's Exploit: pick this many weapons
  fightingStyleChoice?: boolean; // nested pick of one FIGHTING_STYLES option (e.g. Berserker's Fighter's Instinct)
  fightingMasteryChoice?: boolean; // nested pick of one FIGHTING_MASTERIES option (e.g. Fighter's Mastery Strategist)
  lightsaberFormChoiceCount?: number; // e.g. Formfighting Style/Mastery: learn this many LIGHTSABER_FORMS
  repeatable?: boolean; // option text explicitly allows choosing it again for a fresh grant
}

export interface ClassSubChoiceDef {
  key: string;
  label: string;
  className: string;
  archetypeName?: string; // when set, only applies if character.archetypeAppliedName matches
  countByLevel: number[]; // length 20, index 0 = level 1
  options: ClassSubChoiceOption[];
}

// Player-chosen detail for one entry of classSubChoicePicks[key], at the same array index.
// Empty ({}) for picks that don't need any further detail.
export interface ClassSubChoicePickDetail {
  languages?: string[];
  skill?: SkillName;
  tools?: string[];
  weapons?: string[];
  fightingStyle?: string;
  fightingMastery?: string;
  lightsaberForms?: string[];
}

export interface FeatEntry {
  name: string;
  prerequisite: string | null;
  text: string;
  abilityOptions: AbilityKey[]; // [] = no ASI; 1 = fixed auto +1; 2+ = player picks one of these for +1
  grantsSkill?: SkillName; // fixed skill proficiency (upgrades to expertise if already proficient)
  grantsSavingThrow?: AbilityKey; // fixed saving throw proficiency (e.g. Titan's Power)
  grantsSavingThrowForAbilityChoice?: boolean; // Resilient: proficiency in the saving throw of the chosen ability
  grantsProficiency?: string; // fixed non-skill proficiency (armor/weapon/tool), if any (e.g. Weapon Expert)
  choices?: SpeciesTraitChoice[]; // reused choice structure (tool/instrument/kit/skill/other picks)
}

export interface CharacterFeat {
  id: string;
  name: string;
  abilityChosen: AbilityKey[]; // 0 or 1 entries: the ability that got +1 for this feat instance
  skillProficiencyGranted?: SkillName;
  skillExpertiseGranted?: SkillName;
  savingThrowGranted?: AbilityKey;
  choiceSelections: string[][]; // per feat.choices index -> selected options
}

export interface Power {
  id: string;
  name: string;
  level: number; // 0 = at-will, 1-9
  type: "Force" | "Tech";
  alignment: PowerAlignment;
  castingTime: string;
  range: string;
  duration: string;
  description: string;
  prepared: boolean;
}

// One concrete grant produced by resolving a class/background equipmentText branch into real inventory.
export interface EquipmentPart {
  quantity?: number; // default 1
  item?: string; // exact catalog name (WEAPON_CATALOG / ARMOR_CATALOG / GEAR_CATALOG)
  choiceLabel?: string; // present => player must pick one of choiceOptions via a nested select
  choiceOptions?: string[]; // concrete catalog names offered for the choiceLabel select
  proficientTool?: boolean; // resolve to one of the entry's own already-chosen toolChoice selections
  proficientToolChoiceIndex?: number; // which toolChoices[] def to read from; default 0
  proficientToolPickIndex?: number; // which pick within that def's selections; default 0
  freeText?: string; // literal display name when no catalog entry exists (e.g. a named starting pack)
}

export type ItemLocation = "Donned" | "Backpack" | "Pouch" | "Storage";

export interface EquipmentItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  notes: string;
  location: ItemLocation;
  equipped: boolean;
}

export interface Weapon {
  id: string;
  name: string;
  proficient: boolean; // whether to add proficiency bonus to the computed To Hit Bonus
  damage: string;
  range: string;
  weight: number;
  ammoCount: number;
  ammoType: string;
}

export type RefreshType = "Short Rest" | "Long Rest" | "At Will";

export interface CombatFeature {
  id: string;
  name: string;
  refresh: RefreshType;
  used: boolean;
}

export interface Valuable {
  id: string;
  where: string;
  howMuch: string;
  when: string;
}

export interface DeathSaves {
  successes: number; // 0-3
  failures: number; // 0-3
}

export interface Character {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Identity
  name: string;
  playerName: string;
  species: string;
  characterClass: string;
  archetype: string;
  background: string;
  backgroundAppliedName: string;
  backgroundGrantedSkills: SkillName[];
  backgroundGrantedLanguages: string[];
  backgroundGrantedProficiencies: string[];
  backgroundGrantedEquipmentIds: string[]; // EquipmentItem ids created by applyBackground, so revert only removes background-granted items
  backgroundGrantedWeaponIds: string[]; // Weapon ids created by applyBackground, so revert only removes background-granted weapons
  backgroundCreditsApplied: number;
  level: number;
  alignment: string;
  allegiance: string;
  homeworld: string;
  placeOfBirth: string;
  experiencePoints: number;
  xpNextLevel: number;
  age: string;
  gender: string;
  height: string;
  size: string;

  // Species trait application state
  speciesAppliedName: string;
  speciesAbilityBonus: AbilityScores;
  speciesGrantedSkills: SkillName[];
  speciesGrantedLanguages: string[];
  speciesGrantedProficiencies: string[];
  speciesTraitsText: string;
  speciesCreditsApplied: number; // bonus credits from traits like Wealthy, so revert/relevel can cleanly adjust

  // Class/archetype trait application state
  classAppliedName: string;
  classSavingThrowsApplied: AbilityKey[];
  classGrantedSkills: SkillName[];
  classGrantedProficiencies: string[];
  classAbilityBonus: AbilityScores;
  asiChoices: Record<number, AbilityKey[]>;
  classTraitsText: string;
  classEquipmentText: string[];
  classGrantedEquipmentIds: string[]; // EquipmentItem ids created by applyClass, so revert only removes class-granted items
  classGrantedWeaponIds: string[]; // Weapon ids created by applyClass, so revert only removes class-granted weapons
  classCreditsApplied: number;
  archetypeAppliedName: string;
  archetypeTraitsText: string;
  archetypeFeatureChoiceSelections: Record<string, string[][]>; // keyed by feature name
  archetypeFeatureGrantedSkills: SkillName[]; // tracked so revert/relevel can cleanly un-proficient
  classResources: ClassResourceState[];
  classSubChoicePicks: Record<string, string[]>;
  classSubChoiceDetails: Record<string, ClassSubChoicePickDetail[]>; // parallel to classSubChoicePicks[key]
  classSubChoiceGrantedSkills: SkillName[]; // tracked so revert/relevel can cleanly un-proficient

  // Feats
  feats: CharacterFeat[];
  featAbilityBonus: AbilityScores;

  // Abilities
  abilities: AbilityScores;

  // Skills
  skills: Record<SkillName, SkillState>;
  savingThrows: Record<AbilityKey, boolean>;

  // Combat
  maxHp: number;
  currentHp: number;
  tempHp: number;
  defense: number;
  monkUnarmoredDefenseAbility: "wis" | "cha"; // Monk's Unarmored Defense: Wisdom or Charisma (player's choice)
  isRaging: boolean; // Berserker's Rage: toggles the advantage/resistance/damage buffs on and off
  armorNotes: string;
  resistances: string;
  hitDiceTotal: string;
  hitDiceRemaining: string;
  deathSaves: DeathSaves;
  speedBase: number;
  speedHour: number;
  speedDay: number;
  specialMovement: string;
  vision: string;
  weapons: Weapon[];
  combatFeatures: CombatFeature[];

  // Force / Tech
  forcePoints: { current: number; max: number };
  techPoints: { current: number; max: number };
  forceDie: string;
  forceCastingAbility: "wis" | "cha"; // light side (Wisdom) vs dark side (Charisma); used for Universal-alignment powers too
  powers: Power[];

  // Equipment
  credits: number;
  equipment: EquipmentItem[];
  gemsAndTreasure: string;
  valuables: Valuable[];

  // Features / Notes
  proficiencies: string;
  languages: string;
  featsAndFeatures: string;
  appearance: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backgroundFeature: string;
  backstory: string;
  notes: string;
}

export const emptyAbilities = (): AbilityScores => ({
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
});

export const emptyAbilities0 = (): AbilityScores => ({
  str: 0,
  dex: 0,
  con: 0,
  int: 0,
  wis: 0,
  cha: 0,
});

export const SKILL_LIST: SkillName[] = [
  "Athletics",
  "Acrobatics",
  "Sleight of Hand",
  "Stealth",
  "Lore",
  "Piloting",
  "Investigation",
  "Nature",
  "Technology",
  "Animal Handling",
  "Insight",
  "Medicine",
  "Perception",
  "Survival",
  "Deception",
  "Intimidation",
  "Performance",
  "Persuasion",
];

export function isSkillName(v: string): v is SkillName {
  return (SKILL_LIST as readonly string[]).includes(v);
}

export const SKILL_ABILITY: Record<SkillName, AbilityKey> = {
  Athletics: "str",
  Acrobatics: "dex",
  "Sleight of Hand": "dex",
  Stealth: "dex",
  Lore: "int",
  Piloting: "int",
  Investigation: "int",
  Nature: "int",
  Technology: "int",
  "Animal Handling": "wis",
  Insight: "wis",
  Medicine: "wis",
  Perception: "wis",
  Survival: "wis",
  Deception: "cha",
  Intimidation: "cha",
  Performance: "cha",
  Persuasion: "cha",
};

// Skills that suffer an armor check penalty (stealth in light/med/heavy armor with str requirement not met, etc.)
export const ARMOR_PENALTY_SKILLS: SkillName[] = ["Stealth"];

export const emptySkills = (): Record<SkillName, SkillState> => {
  const skills = {} as Record<SkillName, SkillState>;
  for (const s of SKILL_LIST) {
    skills[s] = { proficient: false, expertise: false };
  }
  return skills;
};

export const emptySavingThrows = (): Record<AbilityKey, boolean> => ({
  str: false,
  dex: false,
  con: false,
  int: false,
  wis: false,
  cha: false,
});

export function createBlankCharacter(): Character {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    name: "New Character",
    playerName: "",
    species: "",
    characterClass: "",
    archetype: "",
    background: "",
    backgroundAppliedName: "",
    backgroundGrantedSkills: [],
    backgroundGrantedLanguages: [],
    backgroundGrantedProficiencies: [],
    backgroundGrantedEquipmentIds: [],
    backgroundGrantedWeaponIds: [],
    backgroundCreditsApplied: 0,
    level: 1,
    alignment: "",
    allegiance: "",
    homeworld: "",
    placeOfBirth: "",
    experiencePoints: 0,
    xpNextLevel: 300,
    age: "",
    gender: "",
    height: "",
    size: "Medium",
    speciesAppliedName: "",
    speciesAbilityBonus: emptyAbilities0(),
    speciesGrantedSkills: [],
    speciesGrantedLanguages: [],
    speciesGrantedProficiencies: [],
    speciesTraitsText: "",
    speciesCreditsApplied: 0,
    classAppliedName: "",
    classSavingThrowsApplied: [],
    classGrantedSkills: [],
    classGrantedProficiencies: [],
    classAbilityBonus: emptyAbilities0(),
    asiChoices: {},
    classTraitsText: "",
    classEquipmentText: [],
    classGrantedEquipmentIds: [],
    classGrantedWeaponIds: [],
    classCreditsApplied: 0,
    archetypeAppliedName: "",
    archetypeTraitsText: "",
    archetypeFeatureChoiceSelections: {},
    archetypeFeatureGrantedSkills: [],
    classResources: [],
    classSubChoicePicks: {},
    classSubChoiceDetails: {},
    classSubChoiceGrantedSkills: [],
    feats: [],
    featAbilityBonus: emptyAbilities0(),
    abilities: emptyAbilities(),
    skills: emptySkills(),
    savingThrows: emptySavingThrows(),
    maxHp: 10,
    currentHp: 10,
    tempHp: 0,
    defense: 10,
    monkUnarmoredDefenseAbility: "wis",
    isRaging: false,
    armorNotes: "",
    resistances: "",
    hitDiceTotal: "1d8",
    hitDiceRemaining: "1d8",
    deathSaves: { successes: 0, failures: 0 },
    speedBase: 30,
    speedHour: 3,
    speedDay: 24,
    specialMovement: "",
    vision: "",
    weapons: [],
    combatFeatures: [],
    forcePoints: { current: 0, max: 0 },
    techPoints: { current: 0, max: 0 },
    forceDie: "d6",
    forceCastingAbility: "wis",
    powers: [],
    credits: 0,
    equipment: [],
    gemsAndTreasure: "",
    valuables: [],
    proficiencies: "",
    languages: "",
    featsAndFeatures: "",
    appearance: "",
    personalityTraits: "",
    ideals: "",
    bonds: "",
    flaws: "",
    backgroundFeature: "",
    backstory: "",
    notes: "",
  };
}
