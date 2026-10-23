import type {
  AbilityKey,
  Character,
  Companion,
  CompanionClassDef,
  CompanionNature,
  CompanionNatureDef,
  CompanionTraitDef,
} from "./types";
import { COMPANION_NATURES } from "./data/companions";
import { COMPANION_CLASSES } from "./data/companionClasses";
import { abilityModifier } from "./utils";

export const COMPANION_NATURE_BY_NAME = new Map<CompanionNature, CompanionNatureDef>(
  COMPANION_NATURES.map((n) => [n.nature, n])
);

// The "Follower" table every companion levels on (Expanded Content: Customization Options).
export const FOLLOWER_FEATURES: { level: number; name: string; text: string }[] = [
  { level: 1, name: "Companion Traits", text: "Two traits, determined by its nature. One more trait at 5th, 9th, 13th and 17th level." },
  { level: 2, name: "Helpful", text: "It can take the Help action as a bonus action, but it can only help you in this way." },
  { level: 3, name: "Companion Class", text: "It chooses a class that grants features at 3rd, 7th, 11th, 15th and 18th level." },
  { level: 4, name: "Ability Score Improvement", text: "Increase one ability score by 2, or two by 1 (max 20). Again at 8th, 12th, 16th and 19th level." },
  { level: 6, name: "Expertise", text: "Gains expertise in one of its skill or tool proficiencies. Another at 14th level." },
  { level: 10, name: "Companion Freedom", text: "It no longer needs your bonus action to take an action other than Dash, Disengage, Dodge, Guard or Hide." },
  { level: 10, name: "Feat", text: "It gains one feat of your choice (not one that grants a companion)." },
  { level: 20, name: "Companion Capstone", text: "Two ability scores of its choice increase by 2, and their maximum increases by 2." },
];

export const COMPANION_CLASS_BY_NAME = new Map<string, CompanionClassDef>(COMPANION_CLASSES.map((c) => [c.name, c]));

export const ASI_LEVELS = [4, 8, 12, 16, 19];
export const CAPSTONE_LEVEL = 20;
export const EXPERTISE_LEVELS = [6, 14];

const ABILITY_KEYS: AbilityKey[] = ["str", "dex", "con", "int", "wis", "cha"];
const ABILITY_NAMES: Record<string, AbilityKey> = {
  strength: "str",
  dexterity: "dex",
  constitution: "con",
  intelligence: "int",
  wisdom: "wis",
  charisma: "cha",
};

// Companions saved before phase 2 lack these fields.
export function normalizeCompanion(c: Companion): Companion {
  return { ...c, asi: c.asi ?? {}, expertise: c.expertise ?? [], feat: c.feat ?? "" };
}

// Ability score improvements the companion has actually earned by `level`, as [level, picks] rows.
export function earnedAsiLevels(level: number): number[] {
  return [...ASI_LEVELS, CAPSTONE_LEVEL].filter((l) => level >= l);
}

// Final ability scores: the base scores plus every chosen improvement. Scores cap at 20, and the
// 20th-level capstone raises that cap by 2 for the abilities it improves.
export function companionAbilities(companion: Companion, level: number): Record<AbilityKey, number> {
  const asi = companion.asi ?? {};
  const bonus: Record<AbilityKey, number> = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  const capBonus: Record<AbilityKey, number> = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  for (const l of ASI_LEVELS) {
    if (level < l) continue;
    const picks = (asi[String(l)] ?? []).filter(Boolean);
    const amount = picks.length === 1 ? 2 : 1;
    picks.forEach((a) => (bonus[a] += amount));
  }
  if (level >= CAPSTONE_LEVEL) {
    (asi[String(CAPSTONE_LEVEL)] ?? []).filter(Boolean).forEach((a) => {
      bonus[a] += 2;
      capBonus[a] += 2;
    });
  }
  const out = { ...companion.abilities };
  ABILITY_KEYS.forEach((k) => {
    const base = companion.abilities[k];
    out[k] = Math.max(base, Math.min(base + bonus[k], 20 + capBonus[k]));
  });
  return out;
}

// Reads a class's "must have a Strength, Dexterity or ... score of 13 or higher" requirement.
export function classRequirement(cls: CompanionClassDef): { abilities: AbilityKey[]; min: number } | null {
  const m = cls.prerequisite.match(/must have (?:an? )?(.+?) score of (\d+)/i);
  if (!m) return null;
  const abilities = Object.entries(ABILITY_NAMES)
    .filter(([name]) => m[1].toLowerCase().includes(name))
    .map(([, key]) => key);
  return abilities.length ? { abilities, min: Number(m[2]) } : null;
}

export function classRequirementMet(cls: CompanionClassDef, scores: Record<AbilityKey, number>): boolean {
  const req = classRequirement(cls);
  return !req || req.abilities.some((a) => scores[a] >= req.min);
}
const TRAIT_LEVELS = [5, 9, 13, 17];

export function companionLevel(character: Character): number {
  return Math.max(1, Math.min(20, character.level || 1));
}

// A companion's level always equals its owner's.
export function companionProficiencyBonus(level: number): number {
  return Math.ceil(Math.max(1, level) / 4) + 1;
}

export function companionTraitSlots(level: number): number {
  return 2 + TRAIT_LEVELS.filter((l) => level >= l).length;
}


export function companionVariantDef(companion: Companion) {
  const def = COMPANION_NATURE_BY_NAME.get(companion.nature);
  return def?.variants.find((v) => v.name === companion.variant) ?? def?.variants[0];
}

// Hit die at level 1, then the fixed average (die/2 + 1) plus Constitution for each level after 1st.
export function companionMaxHp(companion: Companion, level: number): number {
  const variant = companionVariantDef(companion);
  if (!variant) return 0;
  const conMod = abilityModifier(companionAbilities(companion, level).con);
  const first = Math.max(1, variant.hitDie + conMod);
  const perLevel = Math.max(1, Math.floor(variant.hitDie / 2) + 1 + conMod);
  return first + perLevel * Math.max(0, level - 1);
}

export function createCompanion(nature: CompanionNature, level: number): Companion {
  const def = COMPANION_NATURE_BY_NAME.get(nature);
  const abilities: Record<AbilityKey, number> = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  if (nature === "Beast") abilities.int = 6; // beasts always have Intelligence 6
  const base: Companion = {
    name: "",
    nature,
    variant: def?.variants[0]?.name ?? nature,
    appearance: "",
    abilities,
    traits: [],
    className: "",
    asi: {},
    expertise: [],
    feat: "",
    currentHp: 0,
    tempHp: 0,
    notes: "",
  };
  return { ...base, currentHp: companionMaxHp(base, level) };
}

// Changing a variant (droid class / humanoid size) changes the hit die, so keep current HP in range.
export function withCompanionVariant(companion: Companion, variant: string, level: number): Companion {
  const next = { ...companion, variant };
  return { ...next, currentHp: Math.min(next.currentHp, companionMaxHp(next, level)) };
}

export interface TraitEligibility {
  eligible: boolean;
  reason: string; // why not, or "" when eligible
}

// Checks the parts of a trait's "Prerequisite:" line the sheet can verify (level and the
// droid class / humanoid size); anything else (ability scores, other traits) is left to the player.
export function traitEligibility(trait: CompanionTraitDef, companion: Companion, level: number): TraitEligibility {
  const first = trait.text.split("\n")[0] ?? "";
  if (!/^Prerequisite:/i.test(first)) return { eligible: true, reason: "" };
  const levelMatch = first.match(/(\d+)(?:st|nd|rd|th) level/i);
  if (levelMatch && level < Number(levelMatch[1])) {
    return { eligible: false, reason: `Requires level ${levelMatch[1]}` };
  }
  const kinds = first.match(/Class [IV]+ Droid|(?:Tiny|Small|Medium) Humanoid/gi);
  if (kinds && !kinds.some((k) => k.toLowerCase() === companion.variant.toLowerCase())) {
    return { eligible: false, reason: `Requires ${kinds.join(" or ")}` };
  }
  return { eligible: true, reason: "" };
}

export function traitPrerequisite(trait: CompanionTraitDef): string {
  const first = trait.text.split("\n")[0] ?? "";
  return /^Prerequisite:/i.test(first) ? first.replace(/^Prerequisite:\s*/i, "") : "";
}

export function traitAllowsRepeats(trait: CompanionTraitDef): boolean {
  return /multiple times/i.test(trait.text);
}

export function healCompanionFully(character: Character): Character {
  const companion = character.companion;
  if (!companion) return character;
  return {
    ...character,
    companion: { ...companion, currentHp: companionMaxHp(companion, companionLevel(character)), tempHp: 0 },
  };
}
