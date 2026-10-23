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
import { SKILL_ABILITY, SKILL_LIST, isSkillName } from "./types";
import { COMPANION_NATURES } from "./data/companions";
import { COMPANION_CLASSES } from "./data/companionClasses";
import { FEATS_CATALOG } from "./data/feats";
import { restoreCompanionResources } from "./companionResources";
import { summarizeTraits, type TraitSummary } from "./companionTraits";
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
    skillPicks: { nature: c.skillPicks?.nature ?? [], class: c.skillPicks?.class ?? [] },
    traitPicks: c.traitPicks ?? {},
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
  const scores = companionAbilities(companion, level);
  const conMod = abilityModifier(scores.con);
  const traits = summarizeTraits(companion, level, scores, variant.hitDie, abilityModifier(scores.dex));
  const first = Math.max(1, traits.hitDie + conMod);
  const perLevel = Math.max(1, Math.floor(traits.hitDie / 2) + 1 + conMod);
  return first + perLevel * Math.max(0, level - 1) + traits.hpFlat + companionFeatEffects(companion).hpPerLevel * level;
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
    skillPicks: { nature: [], class: [] },
    traitPicks: {},
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

const normTrait = (name: string) => name.toLowerCase().replace(/[-:]/g, " ").replace(/\s+/g, " ").trim();

// Checks a trait's "Prerequisite:" lines: level, droid class / humanoid size, current size, ability
// scores, and other traits the companion must already have. Requirements the sheet can't verify (like
// armor proficiency) are treated as met, so the player can still take the trait.
export function traitEligibility(trait: CompanionTraitDef, companion: Companion, level: number): TraitEligibility {
  const prereqLines: string[] = [];
  for (const line of trait.text.split("\n")) {
    if (/^Prerequisite/i.test(line)) prereqLines.push(line.replace(/^Prerequisite:?\s*/i, ""));
    else break;
  }
  if (prereqLines.length === 0) return { eligible: true, reason: "" };

  const derived = companionDerived(companion, level);
  const chosen = new Set(companion.traits.map(normTrait));
  const sizeNow = derived.size.toLowerCase();
  const scoreNames: Record<string, AbilityKey> = ABILITY_NAMES;

  // true = met, false = not met, null = can't tell
  const check = (part: string): boolean | null => {
    const text = part.trim();
    if (!text) return null;
    const lvl = text.match(/(\d+)(?:st|nd|rd|th) level/i);
    if (lvl) return level >= Number(lvl[1]);
    const kind = text.match(/^(Class [IV]+ Droid|(?:Tiny|Small|Medium) Humanoid)$/i);
    if (kind) return kind[1].toLowerCase() === companion.variant.toLowerCase();
    const size = text.match(/^size:?\s*(tiny|small|medium|large|huge)$/i);
    if (size) return sizeNow.startsWith(size[1].toLowerCase());
    const ability = text.match(/^(strength|dexterity|constitution|intelligence|wisdom|charisma)\s+(\d+)/i);
    if (ability) return derived.scores[scoreNames[ability[1].toLowerCase()]] >= Number(ability[2]);
    if (/^(proficiency|the ability|ability to)/i.test(text)) return null;
    return chosen.has(normTrait(text)) ? true : false;
  };

  for (const line of prereqLines) {
    for (const required of line.split(/,\s*/)) {
      const results = required.split(/\s+or\s+/i).map(check);
      if (results.some((r) => r === true) || results.every((r) => r === null)) continue;
      return { eligible: false, reason: `Requires ${required.trim()}` };
    }
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

// ---- Skills ----

const NUMBER_WORDS: Record<string, number> = { one: 1, two: 2, three: 3, four: 4 };

export interface SkillChoiceSlot {
  source: "nature" | "class";
  label: string;
  count: number;
  options: SkillName[]; // every skill that may be picked here
}

export interface CompanionSkill {
  name: SkillName;
  ability: AbilityKey;
  proficient: boolean;
  expertise: boolean;
  bonus: number;
  sources: string[]; // where the proficiency comes from
}

const skillsIn = (text: string): SkillName[] => SKILL_LIST.filter((s) => text.includes(s));

// Reads a "Skills: ..." line from the nature/variant or the class into either a fixed skill or a pick-N slot.
function parseSkillLine(
  line: string,
  source: SkillChoiceSlot["source"],
  label: string
): { fixed: SkillName[]; slot: SkillChoiceSlot | null } {
  const text = line.replace(/^•\s*/, "").replace(/^Skills:\s*/i, "");
  const named = skillsIn(text);
  const choose = text.match(/^(?:Choose\s+)?(?:any\s+)?(one|two|three|four)\b/i);
  const count = choose ? NUMBER_WORDS[choose[1].toLowerCase()] : 0;
  const isChoice = /choose|of your choice/i.test(text);
  if (!isChoice) return { fixed: named, slot: null };
  let options: SkillName[] = named;
  const abilitiesNamed = Object.entries(ABILITY_NAMES)
    .filter(([name]) => text.toLowerCase().includes(name))
    .map(([, key]) => key);
  if (/of your choice/i.test(text) && named.length === 0) {
    options = abilitiesNamed.length ? SKILL_LIST.filter((sk) => abilitiesNamed.includes(SKILL_ABILITY[sk])) : [...SKILL_LIST];
  } else if (/any/i.test(text) && named.length === 0) {
    options = [...SKILL_LIST];
  }
  return { fixed: [], slot: count > 0 ? { source, label, count, options } : null };
}

function natureSkillLine(companion: Companion): string | undefined {
  const def = COMPANION_NATURE_BY_NAME.get(companion.nature);
  const variant = companionVariantDef(companion);
  return [...(variant?.lines ?? []), ...(def?.commonLines ?? [])].find((l) => /^Skills:/i.test(l));
}

// The skill picks this companion still has to (or may) make: its nature/variant's, and its class's from 3rd level.
export function companionSkillSlots(companion: Companion, level: number): SkillChoiceSlot[] {
  const slots: SkillChoiceSlot[] = [];
  const natureLine = natureSkillLine(companion);
  if (natureLine) {
    const parsed = parseSkillLine(natureLine, "nature", `${companion.variant || companion.nature} skills`);
    if (parsed.slot) slots.push(parsed.slot);
  }
  const cls = COMPANION_CLASS_BY_NAME.get(companion.className);
  if (cls && level >= 3) {
    const line = cls.proficiencies.find((p) => /Skills:/i.test(p));
    if (line) {
      const parsed = parseSkillLine(line.replace(/^•\s*/, "").replace(/^Skills:\s*/i, "").replace(/^Choose (\w+) skills /i, "Choose $1 "), "class", `${cls.name} skills`);
      if (parsed.slot) slots.push(parsed.slot);
    }
  }
  return slots;
}

// Every skill's proficiency, expertise and bonus. Sources: a fixed nature skill, picks for the nature and
// class, and the feat (which upgrades to expertise if the companion already had the skill).
export function companionSkills(companion: Companion, level: number): CompanionSkill[] {
  const scores = companionAbilities(companion, level);
  const pb = companionProficiencyBonus(level);
  const sources = new Map<SkillName, string[]>();
  const add = (skill: string, why: string) => {
    if (!isSkillName(skill)) return false;
    const list = sources.get(skill) ?? [];
    list.push(why);
    sources.set(skill, list);
    return true;
  };
  const natureLine = natureSkillLine(companion);
  if (natureLine) {
    const parsed = parseSkillLine(natureLine, "nature", "");
    parsed.fixed.forEach((s) => add(s, companion.variant || companion.nature));
  }
  const slots = companionSkillSlots(companion, level);
  for (const slot of slots) {
    (companion.skillPicks?.[slot.source] ?? []).slice(0, slot.count).forEach((s) => {
      if (slot.options.includes(s as SkillName)) add(s, slot.label.replace(/ skills$/, ""));
    });
  }
  const traitSummary = companionTraitSummary(companion, level);
  for (const pick of traitSummary.picks) {
    const named = SKILL_LIST.find((s) => s.toLowerCase() === (companion.traitPicks?.[pick.key] ?? "").trim().toLowerCase());
    if (named) add(named, pick.trait);
  }
  const fx = companionFeatEffects(companion);
  const expertise = new Set<SkillName>();
  const featSkills = [fx.skill, ...fx.skillPicks].filter((s): s is SkillName => Boolean(s) && isSkillName(s as string));
  for (const s of featSkills) {
    if (sources.has(s)) expertise.add(s);
    add(s, companion.feat);
  }
  (companion.expertise ?? []).forEach((text, i) => {
    const needed = EXPERTISE_LEVELS[i];
    const name = SKILL_LIST.find((s) => s.toLowerCase() === text.trim().toLowerCase());
    if (name && needed !== undefined && level >= needed && sources.has(name)) expertise.add(name);
  });
  return SKILL_LIST.map((name) => {
    const proficient = sources.has(name);
    const isExpert = expertise.has(name);
    const bonus = abilityModifier(scores[SKILL_ABILITY[name]]) + (proficient ? pb : 0) + (isExpert ? pb : 0);
    return { name, ability: SKILL_ABILITY[name], proficient, expertise: isExpert, bonus, sources: sources.get(name) ?? [] };
  });
}

// ---- Derived sheet stats (everything the traits and feat change) ----

export function companionTraitSummary(companion: Companion, level: number): TraitSummary {
  const variant = companionVariantDef(companion);
  const scores = companionAbilities(companion, level);
  return summarizeTraits(companion, level, scores, variant?.hitDie ?? 8, abilityModifier(scores.dex));
}

function featureLineValue(lines: string[], label: string): string {
  const prefix = `${label}: `;
  const hit = lines.find((l) => l.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : "";
}

export interface CompanionDerived {
  scores: Record<AbilityKey, number>;
  traits: TraitSummary;
  featureLines: string[];
  ac: number;
  acSource: string;
  speed: number | null;
  speedLines: string[];
  initiative: number;
  size: string;
  type: string;
  attack: { toHit: number; damage: string; note: string } | null;
}

// The companion's AC, speed, initiative, size and natural attack once every chosen trait and its feat
// have been applied.
export function companionDerived(companion: Companion, level: number): CompanionDerived {
  const def = COMPANION_NATURE_BY_NAME.get(companion.nature);
  const variant = companionVariantDef(companion);
  const featureLines = [...(def?.commonLines ?? []), ...(variant?.lines ?? [])];
  const scores = companionAbilities(companion, level);
  const dexMod = abilityModifier(scores.dex);
  const traits = companionTraitSummary(companion, level);
  const fx = companionFeatEffects(companion);

  let ac = 10 + dexMod;
  let acSource = `10 + Dex (${dexMod >= 0 ? "+" : ""}${dexMod})`;
  for (const option of traits.acOptions) {
    if (option.value > ac) {
      ac = option.value;
      acSource = option.label;
    }
  }

  const baseSpeedMatch = featureLineValue(featureLines, "Speed").match(/(\d+)/);
  const baseSpeed = baseSpeedMatch ? Number(baseSpeedMatch[1]) : null;
  const speedLines: string[] = [];
  let speed: number | null = null;
  if (baseSpeed !== null) {
    const walking = traits.speedSet ?? baseSpeed;
    speed = walking + traits.speedBonus + fx.speedBonus;
    speedLines.push(`Base ${baseSpeed} ft`);
    if (traits.speedSet) speedLines.push(`Size trait: walking speed ${traits.speedSet} ft`);
    if (traits.speedBonus) speedLines.push(`Traits: +${traits.speedBonus} ft`);
    if (fx.speedBonus) speedLines.push(`${companion.feat}: +${fx.speedBonus} ft`);
  }

  const pb = companionProficiencyBonus(level);
  let attack: CompanionDerived["attack"] = null;
  if (companion.nature === "Beast") {
    const strMod = abilityModifier(scores.str);
    const mod = traits.finesse ? Math.max(strMod, dexMod) : strMod;
    const die = traits.naturalDie ?? 4;
    attack = {
      toHit: pb + mod,
      damage: `1d${die}${mod === 0 ? "" : mod > 0 ? `+${mod}` : `${mod}`} kinetic`,
      note: traits.finesse ? "Finesse: uses the better of Strength or Dexterity" : "Uses Strength",
    };
  }

  return {
    scores,
    traits,
    featureLines,
    ac,
    acSource,
    speed,
    speedLines,
    initiative: dexMod + traits.initiative,
    size: traits.size ?? featureLineValue(featureLines, "Size"),
    type: featureLineValue(featureLines, "Type"),
    attack,
  };
}
