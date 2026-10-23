import type { AbilityKey, Companion } from "./types";
import type { CompanionRefresh, CompanionResourceDef } from "./companionResources";
import { abilityModifier } from "./utils";

// What each companion trait does to the companion's sheet. Hand-built from the trait text in the
// Expanded Content "Customization Options" chapter (sw5e.com); traits that only describe a combat
// option or roleplay perk are left out (their rules text still shows on hover). Keys are
// "Nature|Trait name" because a few traits (Darkvision, Light Plating...) work differently per nature.

export interface TraitUse {
  key: string;
  label: string;
  refresh: CompanionRefresh;
  // Uses for a trait taken `count` times (most are fixed at 1; charge traits grow per extra copy).
  max: (count: number, scores: Record<AbilityKey, number>) => number;
}

export interface TraitEffect {
  ac?: { base: number; dex: "full" | "max2" | "none" }; // "armor class becomes ..."
  speedBonus?: number;
  speedSet?: number; // walking speed becomes this (size traits)
  initiative?: number;
  hpPerLevel?: number; // flat HP per level (Durable, Durability Module)
  hpPlusLevel?: boolean; // hit points increase by level + 1 each time it is taken
  hitDie?: number; // hit die becomes this
  hitDieStep?: boolean; // hit die goes up one step each time (Power Core)
  size?: string;
  naturalDie?: number; // natural weapon damage die
  movement?: string[];
  senses?: string[];
  proficiencies?: string[];
  advantages?: string[];
  resistances?: string[];
  notes?: string[];
  pick?: "skillOrTool"; // grants proficiency in a skill or tool the player names
  uses?: TraitUse[];
}

const once = (key: string, label: string, refresh: CompanionRefresh): TraitUse => ({ key, label, refresh, max: () => 1 });
const charges = (key: string, label: string, start: number, cap: number): TraitUse => ({
  key,
  label,
  refresh: "Long Rest",
  max: (count) => Math.min(cap, start + Math.max(0, count - 1)),
});

const FORCE_SENSITIVE: TraitEffect = { uses: [once("forceSensitive", "Force power (lowest level)", "Long Rest")] };
const FORCE_ADEPT: TraitEffect = { uses: [once("forceAdept", "2nd-level force power", "Long Rest")] };
const TECH_DABBLER: TraitEffect = { uses: [once("techDabbler", "Tech power (lowest level)", "Long Rest")] };
const TECH_ADEPT: TraitEffect = { uses: [once("techAdept", "2nd-level tech power", "Long Rest")] };
const DARKVISION: TraitEffect = { senses: ["Darkvision 60 ft"] };
const CLIMB: TraitEffect = {
  movement: ["Climbing speed equal to walking speed"],
  advantages: ["Strength saves and Athletics checks for climbing"],
};
const keen = (sense: string): TraitEffect => ({ advantages: [`Perception checks that rely on ${sense}`] });
const SIZE = (size: string, die: number, speed: number | undefined, natural: number | undefined): TraitEffect => ({
  size,
  hitDie: die,
  hpPlusLevel: true,
  ...(speed ? { speedSet: speed } : {}),
  ...(natural ? { naturalDie: natural } : {}),
});
const BARRIER: TraitEffect = { uses: [once("barrier", "Barrier", "Short Rest")] };

export const TRAIT_EFFECTS: Record<string, TraitEffect> = {
  // ---- Beast ----
  "Beast|Aerial": {
    movement: ["Flying speed equal to walking speed"],
    advantages: ["Opportunity attacks against it have disadvantage"],
  },
  "Beast|Amphibious": { movement: ["Swimming speed equal to walking speed", "Breathes air and water"] },
  "Beast|Burrower": { movement: ["Burrowing speed equal to walking speed"], senses: ["Blindsight 10 ft"] },
  "Beast|Climber": CLIMB,
  "Beast|Closed Mind": { advantages: ["Wisdom and Charisma saves against force powers"] },
  "Beast|Darkvision": DARKVISION,
  "Beast|Force Adept": FORCE_ADEPT,
  "Beast|Force Contention": { advantages: ["Strength and Constitution saves against force powers"] },
  "Beast|Force-Sensitive": FORCE_SENSITIVE,
  "Beast|Heavy Hide": { ac: { base: 14, dex: "none" } },
  "Beast|Light Hide": { ac: { base: 11, dex: "full" } },
  "Beast|Medium Hide": { ac: { base: 13, dex: "max2" } },
  "Beast|Keen Hearing": keen("hearing"),
  "Beast|Keen Sight": keen("sight"),
  "Beast|Keen Smell": keen("smell"),
  "Beast|Nimble Reflexes": { advantages: ["Dexterity and Intelligence saves against force powers"] },
  "Beast|Nimble Weapon": { notes: ["Natural weapon has the finesse property"] },
  "Beast|Powerful Build": { notes: ["Carrying capacity and push/drag/lift doubled (tripled if it already doubles)"] },
  "Beast|Ranged Weapon": { notes: ["Natural ranged weapon, 30/90 ft"] },
  "Beast|Reach Weapon": { notes: ["Natural weapon has the reach property"] },
  "Beast|Size: Small": SIZE("Small", 6, 25, 6),
  "Beast|Size: Medium": SIZE("Medium", 8, 30, 8),
  "Beast|Size: Large": SIZE("Large", 10, 35, 10),
  "Beast|Size: Huge": SIZE("Huge", 12, 40, 12),
  "Beast|Sturdy-Legged": {
    advantages: ["Strength and Dexterity saves against effects that knock it prone"],
    notes: ["Long jump 20 ft, high jump 10 ft"],
  },
  "Beast|Tremorsense": { senses: ["Tremorsense 30 ft"] },

  // ---- Droid ----
  "Droid|Alarm Protocol": { initiative: 5, notes: ["You and it can't be surprised while it is conscious"] },
  "Droid|Arm Cannons": { uses: [charges("armCannons", "Arm cannon charges", 2, 4)] },
  "Droid|Back-Up Protocol": { uses: [once("backUp", "Back-Up Protocol", "Long Rest")] },
  "Droid|Celerity Augment": { speedBonus: 10 },
  "Droid|Charisma Chip": { uses: [once("charismaChip", "Charisma Chip", "Short Rest")] },
  "Droid|Darkvision Optics": { senses: ["Darkvision 60 ft"] },
  "Droid|Durability Module": { hpPerLevel: 2 },
  "Droid|Energy Shield": { uses: [charges("energyShield", "Energy shield charges", 1, 3)] },
  "Droid|Flamethrower": { uses: [charges("flamethrower", "Flamethrower charges", 1, 3)] },
  "Droid|Heavy Plating": { proficiencies: ["Heavy armor"] },
  "Droid|Light Plating": { proficiencies: ["Light armor"] },
  "Droid|Medium Plating": { proficiencies: ["Medium armor"] },
  "Droid|Power Core": { hitDieStep: true, hpPlusLevel: true },
  "Droid|Powerful Droid": { notes: ["Carrying capacity and push/drag/lift doubled (tripled if it already doubles)"] },
  "Droid|Proficiency Protocol": { pick: "skillOrTool" },
  "Droid|Repulsor Coil": { movement: ["Flying speed equal to walking speed (halved in medium or heavy armor)"] },
  "Droid|Sensor Augmentation": {
    advantages: ["Perception/Investigation checks to find secret doors", "Saves to avoid or resist traps"],
    resistances: ["Damage from traps"],
  },
  "Droid|Shard Modification": { uses: [once("shard", "Sense force (once per day)", "Long Rest")] },
  "Droid|Stun Ray": { uses: [charges("stunRay", "Stun ray charges", 1, 3)] },
  "Droid|Techcasting Protocol": { uses: [once("techcastingProtocol", "Tech power (lowest level)", "Long Rest")] },
  "Droid|Techcasting Protocol Mark II": { uses: [once("techcastingMark2", "2nd-level tech power", "Long Rest")] },
  "Droid|Truesight Optics": { senses: ["Truesight 30 ft"] },
  "Droid|Performance Protocol": {
    uses: [{ key: "performance", label: "Performance Protocol", refresh: "Long Rest", max: (_c, s) => Math.max(1, abilityModifier(s.cha)) }],
  },

  // ---- Humanoid ----
  "Humanoid|Adaptive Resilience": { advantages: ["Strength and Constitution saves against tech powers"] },
  "Humanoid|Alert": { initiative: 5, notes: ["You and it can't be surprised while it is conscious"] },
  "Humanoid|Amphibious": { movement: ["Breathes air and water"] },
  "Humanoid|Cannibalize": { uses: [once("cannibalize", "Cannibalize", "Short Rest")] },
  "Humanoid|Closed Mind": { advantages: ["Wisdom and Charisma saves against force powers"] },
  "Humanoid|Darkvision": DARKVISION,
  "Humanoid|Defiant": { uses: [once("defiant", "Defiant", "Short Rest")] },
  "Humanoid|Dungeon Delver": {
    advantages: ["Perception/Investigation checks to find secret doors", "Saves to avoid or resist traps"],
    resistances: ["Damage from traps"],
  },
  "Humanoid|Durable": { hpPerLevel: 2 },
  "Humanoid|Enthralling Pheromones": { uses: [once("pheromones", "Enthralling Pheromones", "Short Rest")] },
  "Humanoid|Flight": { movement: ["Flying speed equal to walking speed (halved in medium or heavy armor)"] },
  "Humanoid|Force Adept": FORCE_ADEPT,
  "Humanoid|Force Contention": { advantages: ["Strength and Constitution saves against force powers"] },
  "Humanoid|Force-Sensitive": FORCE_SENSITIVE,
  "Humanoid|Grovel, Cower, and Beg": { uses: [once("grovel", "Grovel, Cower, and Beg", "Short Rest")] },
  "Humanoid|Hardy Cleverness": { advantages: ["Wisdom and Charisma saves against tech powers"] },
  "Humanoid|Heavily Armored": { proficiencies: ["Heavy armor"] },
  "Humanoid|Hidden Step": { uses: [once("hiddenStep", "Hidden Step", "Short Rest")] },
  "Humanoid|Hide": { ac: { base: 13, dex: "full" }, notes: ["Hide AC applies while it isn't wearing armor"] },
  "Humanoid|Keen Hearing": keen("hearing"),
  "Humanoid|Keen Sight": keen("sight"),
  "Humanoid|Keen Smell": keen("smell"),
  "Humanoid|Lightly Armored": { proficiencies: ["Light armor"] },
  "Humanoid|Linguist": { notes: ["Learns three languages of its choice"] },
  "Humanoid|Mobile": { speedBonus: 10 },
  "Humanoid|Moderately Armored": { proficiencies: ["Medium armor"] },
  "Humanoid|Nimble Reflexes": { advantages: ["Dexterity and Intelligence saves against force powers"] },
  "Humanoid|Powerful Build": { notes: ["Carrying capacity and push/drag/lift doubled (tripled if it already doubles)"] },
  "Humanoid|Proficient": { pick: "skillOrTool" },
  "Humanoid|Savage Shorty": { speedBonus: 5 },
  "Humanoid|Second Heart": { uses: [once("secondHeart", "Second Heart", "Long Rest")] },
  "Humanoid|Tech Adept": TECH_ADEPT,
  "Humanoid|Tech Dabbler": TECH_DABBLER,
  "Humanoid|Tech Resistance": { advantages: ["Dexterity and Intelligence saves against tech powers"] },
  "Humanoid|Tiny Terror": { speedBonus: 5 },
  "Humanoid|Weapon Expert": { proficiencies: ["All blasters, lightweapons and vibroweapons"] },

  // ---- Tracker Droid ----
  "Tracker Droid|Aerial Travel Package": {
    movement: ["Flying speed 30 ft"],
    advantages: ["Opportunity attacks against it have disadvantage"],
  },
  "Tracker Droid|Darkvision Optics": { senses: ["Darkvision 60 ft"] },
  "Tracker Droid|Heavy Plating": { ac: { base: 14, dex: "none" } },
  "Tracker Droid|Keen Hearing": keen("hearing"),
  "Tracker Droid|Keen Sight": keen("sight"),
  "Tracker Droid|Keen Smell": keen("smell"),
  "Tracker Droid|Light Plating": { ac: { base: 11, dex: "full" } },
  "Tracker Droid|Medium Plating": { ac: { base: 13, dex: "max2" } },
  "Tracker Droid|Proficiency Protocol": { pick: "skillOrTool" },
  "Tracker Droid|Sentry Dish": { uses: [once("sentryDish", "Alarm (sentry dish)", "Long Rest")] },
  "Tracker Droid|Size: Small": SIZE("Small", 6, 25, undefined),
  "Tracker Droid|Spider Legs": CLIMB,
  "Tracker Droid|Truesight Optics": { senses: ["Truesight 60 ft"] },

  // ---- Turret ----
  "Turret|Augmenting Barrier": BARRIER,
  "Turret|Climbing Turret": CLIMB,
  "Turret|Cloaking Barrier": BARRIER,
  "Turret|Phalanx Barrier": BARRIER,
  "Turret|Rejuvenating Barrier": BARRIER,
  "Turret|Size: Medium": SIZE("Medium", 8, undefined, undefined),
  "Turret|Size: Large": SIZE("Large", 10, undefined, undefined),
};

const STEP_UP: Record<number, number> = { 4: 6, 6: 8, 8: 10, 10: 12, 12: 12 };

export interface TraitSummary {
  acOptions: { label: string; value: number }[]; // each trait's resulting AC, best one wins
  speedSet: number | null;
  speedBonus: number;
  initiative: number;
  hitDie: number; // after size / Power Core traits
  hpFlat: number; // extra max HP from traits at this level
  size: string | null;
  naturalDie: number | null;
  movement: string[];
  senses: string[];
  proficiencies: string[];
  advantages: string[];
  resistances: string[];
  notes: string[];
  picks: { key: string; trait: string }[]; // traits waiting for a skill/tool name
  resources: CompanionResourceDef[];
  finesse: boolean;
}

const uniq = (list: string[]) => [...new Set(list)];

// Picks are keyed by trait name and which copy of it this is ("Proficiency Protocol#1").
export function pickKeyFor(traits: string[], index: number): string {
  const name = traits[index];
  const nth = traits.slice(0, index).filter((t) => t === name).length;
  return `${name}#${nth + 1}`;
}

// Adds up everything the chosen traits do, in the order they were chosen (so a Power Core after a
// size trait steps up from the new die).
export function summarizeTraits(
  companion: Companion,
  level: number,
  scores: Record<AbilityKey, number>,
  baseHitDie: number,
  dexMod: number
): TraitSummary {
  const out: TraitSummary = {
    acOptions: [],
    speedSet: null,
    speedBonus: 0,
    initiative: 0,
    hitDie: baseHitDie,
    hpFlat: 0,
    size: null,
    naturalDie: null,
    movement: [],
    senses: [],
    proficiencies: [],
    advantages: [],
    resistances: [],
    notes: [],
    picks: [],
    resources: [],
    finesse: false,
  };
  const counts = new Map<string, number>();
  companion.traits.forEach((name, i) => {
    counts.set(name, (counts.get(name) ?? 0) + 1);
    const fx = TRAIT_EFFECTS[`${companion.nature}|${name}`];
    if (!fx) return;
    if (fx.ac) {
      const dex = fx.ac.dex === "full" ? dexMod : fx.ac.dex === "max2" ? Math.min(2, dexMod) : 0;
      out.acOptions.push({ label: name, value: fx.ac.base + dex });
    }
    if (fx.speedSet) out.speedSet = fx.speedSet;
    out.speedBonus += fx.speedBonus ?? 0;
    out.initiative += fx.initiative ?? 0;
    if (fx.hitDie) out.hitDie = fx.hitDie;
    if (fx.hitDieStep) out.hitDie = STEP_UP[out.hitDie] ?? out.hitDie;
    if (fx.hpPlusLevel) out.hpFlat += level + 1;
    if (fx.hpPerLevel) out.hpFlat += fx.hpPerLevel * level;
    if (fx.size) out.size = fx.size;
    if (fx.naturalDie) out.naturalDie = fx.naturalDie;
    out.movement.push(...(fx.movement ?? []));
    out.senses.push(...(fx.senses ?? []));
    out.proficiencies.push(...(fx.proficiencies ?? []));
    out.advantages.push(...(fx.advantages ?? []));
    out.resistances.push(...(fx.resistances ?? []));
    out.notes.push(...(fx.notes ?? []));
    if (fx.notes?.some((n) => /finesse/i.test(n))) out.finesse = true;
    if (fx.pick) out.picks.push({ key: pickKeyFor(companion.traits, i), trait: name });
  });
  // One resource card per limited-use trait, sized by how many copies were taken.
  for (const [name, count] of counts) {
    for (const use of TRAIT_EFFECTS[`${companion.nature}|${name}`]?.uses ?? []) {
      out.resources.push({
        key: `trait:${use.key}`,
        label: use.label,
        source: name,
        minLevel: 1,
        refresh: use.refresh,
        max: () => use.max(count, scores),
      });
    }
  }
  out.movement = uniq(out.movement);
  out.senses = uniq(out.senses);
  out.proficiencies = uniq(out.proficiencies);
  out.advantages = uniq(out.advantages);
  out.resistances = uniq(out.resistances);
  out.notes = uniq(out.notes);
  return out;
}
