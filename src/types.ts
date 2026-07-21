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

export type SpeciesChoiceKind = "skill" | "language" | "instrument" | "tool" | "kit" | "weapon";

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

export type ItemLocation = "Donned" | "Backpack" | "Pouch" | "Storage";

export interface EquipmentItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  notes: string;
  location: ItemLocation;
}

export interface Weapon {
  id: string;
  name: string;
  attackBonus: string;
  damage: string;
  range: string;
  weight: number;
  ammo: string;
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
  weight: string;
  size: string;
  hair: string;
  eyes: string;
  skin: string;

  // Species trait application state
  speciesAppliedName: string;
  speciesAbilityBonus: AbilityScores;
  speciesGrantedSkills: SkillName[];
  speciesTraitsText: string;

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
  inspiration: boolean;
  initiativeBonus: number;
  weapons: Weapon[];
  combatFeatures: CombatFeature[];

  // Force / Tech
  forcePoints: { current: number; max: number };
  techPoints: { current: number; max: number };
  forceDie: string;
  techAttackModifier: number;
  techSaveDC: number;
  forceAttackModifier: number;
  forceSaveDC: number;
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
    weight: "",
    size: "Medium",
    hair: "",
    eyes: "",
    skin: "",
    speciesAppliedName: "",
    speciesAbilityBonus: emptyAbilities0(),
    speciesGrantedSkills: [],
    speciesTraitsText: "",
    abilities: emptyAbilities(),
    skills: emptySkills(),
    savingThrows: emptySavingThrows(),
    maxHp: 10,
    currentHp: 10,
    tempHp: 0,
    defense: 10,
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
    inspiration: false,
    initiativeBonus: 0,
    weapons: [],
    combatFeatures: [],
    forcePoints: { current: 0, max: 0 },
    techPoints: { current: 0, max: 0 },
    forceDie: "d6",
    techAttackModifier: 0,
    techSaveDC: 8,
    forceAttackModifier: 0,
    forceSaveDC: 8,
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
