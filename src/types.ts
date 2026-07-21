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

export interface Power {
  id: string;
  name: string;
  level: number;
  type: "Force" | "Tech";
  castingTime: string;
  range: string;
  duration: string;
  description: string;
  prepared: boolean;
}

export interface EquipmentItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  notes: string;
}

export interface Character {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Identity
  name: string;
  species: string;
  characterClass: string;
  archetype: string;
  background: string;
  level: number;
  alignment: string;
  allegiance: string;
  homeworld: string;
  age: string;
  gender: string;
  height: string;
  weight: string;

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
  hitDiceTotal: string;
  hitDiceRemaining: string;
  speed: number;
  initiativeBonus: number;

  // Force / Tech
  forcePoints: { current: number; max: number };
  techPoints: { current: number; max: number };
  forceDie: string;
  powers: Power[];

  // Equipment
  credits: number;
  equipment: EquipmentItem[];

  // Features / Notes
  featsAndFeatures: string;
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
    species: "",
    characterClass: "",
    archetype: "",
    background: "",
    level: 1,
    alignment: "",
    allegiance: "",
    homeworld: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    abilities: emptyAbilities(),
    skills: emptySkills(),
    savingThrows: emptySavingThrows(),
    maxHp: 10,
    currentHp: 10,
    tempHp: 0,
    defense: 10,
    hitDiceTotal: "1d8",
    hitDiceRemaining: "1d8",
    speed: 30,
    initiativeBonus: 0,
    forcePoints: { current: 0, max: 0 },
    techPoints: { current: 0, max: 0 },
    forceDie: "d6",
    powers: [],
    credits: 0,
    equipment: [],
    featsAndFeatures: "",
    backstory: "",
    notes: "",
  };
}
