import type {
  AbilityKey,
  Character,
  Companion,
  CompanionClassDef,
  CompanionNature,
  CompanionNatureDef,
  CompanionTraitDef,
  FeatEntry,
  SkillName,
} from "./types";
import { isSkillName } from "./types";
import { COMPANION_NATURES } from "./data/companions";
import { COMPANION_CLASSES } from "./data/companionClasses";
import { FEATS_CATALOG } from "./data/feats";
import { restoreCompanionResources } from "./companionResources";
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
  return {
    ...c,
    asi: c.asi ?? {},
    expertise: c.expertise ?? [],
    feat: c.feat ?? "",
    featAbilityChoice: c.featAbilityChoice ?? "",
    featChoices: c.featChoices ?? [],
    resourceUsed: c.resourceUsed ?? {},
  };
}

const FEATS_BY_NAME = new Map(FEATS_CATALOG.map((f) => [f.name, f]));

export interface CompanionFeatEffects {
  feat: FeatEntry | undefined;
  abilityBonus: Partial<Record<AbilityKey, number>>; // +1 from the feat's ability increase
  speedBonus: number;
  hpPerLevel: number;
  resistance: string;
  savingThrows: AbilityKey[]; // saving throw proficiencies the feat grants
  skill: SkillName | null; // a skill proficiency the feat grants
  skillPicks: string[]; // skills picked through the feat's choices
  proficiencies: string[]; // other proficiencies (armor/weapon/tool picks)
  languages: string[];
}

// What the companion's 10th-level feat does, applied to the companion only (never to its owner).
export function companionFeatEffects(companion: Companion): CompanionFeatEffects {
  const feat = companion.feat ? FEATS_BY_NAME.get(companion.feat) : undefined;
  const out: CompanionFeatEffects = {
    feat,
    abilityBonus: {},
    speedBonus: 0,
    hpPerLevel: 0,
    resistance: "",
    savingThrows: [],
    skill: null,
    skillPicks: [],
    proficiencies: [],
    languages: [],
  };
  if (!feat) return out;
  const chosen: AbilityKey | "" =
    feat.abilityOptions.length === 1 ? feat.abilityOptions[0] : (companion.featAbilityChoice ?? "");
  if (chosen && feat.abilityOptions.includes(chosen)) out.abilityBonus[chosen] = 1;
  out.speedBonus = feat.speedBonus ?? 0;
  out.hpPerLevel = feat.hpBonusPerLevel ?? 0;
  out.resistance = feat.grantsResistance ?? "";
  if (feat.grantsSavingThrowForAbilityChoice && chosen) out.savingThrows.push(chosen);
  else if (feat.grantsSavingThrow) out.savingThrows.push(feat.grantsSavingThrow);
  out.skill = feat.grantsSkill ?? null;
  if (feat.grantsProficiency) out.proficiencies.push(feat.grantsProficiency);
  feat.choices?.forEach((choiceDef, i) => {
    const picks = (companion.featChoices?.[i] ?? []).filter(Boolean);
    if (choiceDef.kind === "language") out.languages.push(...picks);
    else if (choiceDef.kind === "skill") out.skillPicks.push(...picks);
    else
      picks.forEach((p) => {
        if (choiceDef.kind === "skillOrTool" && isSkillName(p)) out.skillPicks.push(p);
        else out.proficiencies.push(`${p} (${choiceDef.label})`);
      });
  });
  return out;
}

// A companion's saving throw proficiencies: its class's, plus any its feat grants.
export function companionSaveProficiencies(companion: Companion): AbilityKey[] {
  const cls = COMPANION_CLASS_BY_NAME.get(companion.className);
  const line = cls?.proficiencies.find((p) => /Saving Throws/i.test(p)) ?? "";
  const fromClass = Object.entries(ABILITY_NAMES)
    .filter(([name]) => line.toLowerCase().includes(name))
    .map(([, key]) => key);
  return [...new Set([...fromClass, ...companionFeatEffects(companion).savingThrows])];
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
  const featBonus = companionFeatEffects(companion).abilityBonus;
  const out = { ...companion.abilities };
  ABILITY_KEYS.forEach((k) => {
    const base = companion.abilities[k];
    out[k] = Math.max(base, Math.min(base + bonus[k] + (featBonus[k] ?? 0), 20 + capBonus[k]));
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
  return first + perLevel * Math.max(0, level - 1) + companionFeatEffects(companion).hpPerLevel * level;
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
    featAbilityChoice: "",
    featChoices: [],
    resourceUsed: {},
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

// A short rest restores the companion's Short Rest resources; a long rest also heals it fully,
// clears its temp HP and restores everything.
export function restCompanion(character: Character, kind: "short" | "long"): Character {
  if (!character.companion) return character;
  const companion = normalizeCompanion(character.companion);
  const resourceUsed = restoreCompanionResources(companion, kind);
  if (kind === "short") return { ...character, companion: { ...companion, resourceUsed } };
  return {
    ...character,
    companion: {
      ...companion,
      resourceUsed,
      currentHp: companionMaxHp(companion, companionLevel(character)),
      tempHp: 0,
    },
  };
}
