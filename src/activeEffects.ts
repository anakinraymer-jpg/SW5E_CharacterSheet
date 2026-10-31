// Stances and short buffs: features you switch on for a while (lightsaber-form stances, Mutagenic
// Transformation, Totemic Might, a Sentinel's Manifest...). Each one the character has unlocked
// gets an on/off toggle in Class Features; character.activeEffects holds the keys switched on.
// While on, its effects show as chips and the numeric ones (AC, speed, other speeds, extra weapon
// damage dice) are added to the sheet. Any rest ends them all. Berserker Rage keeps its own toggle.

import type { ArchetypeEntry, Character } from "./types";
import { ARCHETYPES_CATALOG as ARCHETYPES_CATALOG_PHB } from "./data/archetypeDetails";
import { ARCHETYPES_CATALOG_EC } from "./data/archetypeDetailsEC";
import { CLASSES_CATALOG } from "./data/classes";
import { allChosenSubChoiceOptions } from "./classFeatureLogic";
import { abilityModifier, formatModifier, proficiencyBonus } from "./utils";

const ARCHETYPES_CATALOG: ArchetypeEntry[] = [...ARCHETYPES_CATALOG_PHB, ...ARCHETYPES_CATALOG_EC];

export interface EffectChip {
  label: string;
  detail: string;
}

export interface ActiveEffect {
  key: string;
  name: string;
  feature: string; // the feature's own name (name may be a friendlier label)
  source: string;
  text: string;
  resourceKey?: string; // archetype resource spent when switched on
  chips: EffectChip[];
  acBonus: number;
  doublesSpeed: boolean;
  extraSpeeds: string[];
  weaponDice?: string; // extra damage dice on weapon attacks
}

// Hand-written effects for features whose numbers the sheet can apply (or whose text doesn't
// break into readable chips). Keyed by feature name; anything else gets chips read from its text.
interface Override {
  label?: string;
  chips?: (c: Character) => string[];
  ac?: (c: Character) => number;
  doublesSpeed?: boolean;
  speeds?: string[];
  weaponDice?: string;
}

function mod(c: Character, key: keyof Character["abilities"]): number {
  return abilityModifier(c.abilities[key]);
}
function forceMod(c: Character): number {
  return Math.max(1, mod(c, "wis"), mod(c, "cha"));
}

const OVERRIDES: Record<string, Override> = {
  "The Way of the Ysalamiri": {
    chips: (c) => [`${formatModifier(forceMod(c))} (Wis/Cha) to your first melee attack and damage roll each turn`],
  },
  "The Way of the Rancor": {
    chips: () => ["Melee attack as part of casting a force power", "Wisdom or Charisma for melee attack and damage rolls"],
  },
  "The Way of the Krayt Dragon": {
    chips: (c) => [`First Strength melee hit each turn: ${formatModifier(Math.max(1, mod(c, "str")))} damage, redirectable to an adjacent creature`],
  },
  "The Way of the Mynock": {
    chips: (c) => ["Saber ward as part of the bonus action and each turn", `${proficiencyBonus(levelOf(c))} special reactions for saber reflect`],
  },
  "Upheld by the Force": {
    label: "Force Resilience",
    chips: () => ["Resistant: kinetic, energy"],
  },
  "Saber Storm": {
    ac: (c) => forceMod(c),
    chips: () => ["Levitated weapon attacks a creature within 5 ft of it"],
  },
  "Mutagenic Transformation": {
    ac: (c) => Math.max(1, Math.floor(mod(c, "int") / 2)),
    chips: () => ["Attack twice when you take the Attack action", "Strength score equals your Critical Analysis score", "Lasts 1 hour"],
  },
  "Sovereign Protector": {
    ac: () => 2,
    doublesSpeed: true,
    chips: () => ["Double speed", "Advantage: Dexterity saves", "Extra limited action each turn"],
  },
  Avatar: {
    speeds: ["Avatar: burrowing, flying and swimming speed equal to your walking speed"],
    chips: () => ["Resistant: cold, energy, fire, kinetic, lightning, sonic", "Elemental bonus-action abilities"],
  },
  "Totemic Might": {
    weaponDice: "1d6",
    chips: () => ["+1d6 weapon damage", "Advantage: Strength checks & saves", "Carrying capacity doubled"],
  },
  "Flow State": {
    chips: () => ["Once per turn, use a d4 instead of a superiority die", "Ability checks and saves can't have disadvantage", "Attacks against you can't have advantage"],
  },
  "Razor Focus": {
    chips: () => ["Concentration", "+2 Sneak Attack dice each time you deal Sneak Attack (cumulative)"],
  },
  "One With the Dark": {
    chips: () => ["Invisible (enhanced) for 1 hour", "Ends after you deal damage or force a save"],
  },
  "Sharpen the Blade": {
    chips: () => ["Echani weapon: attack and damage bonus equal to focus points spent (up to 3)"],
  },
  "Empty Body": {
    chips: () => ["Invisible", "Resistant: all damage but force", "Costs 4 focus points"],
  },
};

// Archetype features that are stances or timed self-buffs. Lightsaber forms' "The Way of the ..."
// and "Master of ..." features are all of this kind; other archetypes are listed by name.
const NAMED_FEATURES = new Set(Object.keys(OVERRIDES).concat(["Forredari Stance", "Steel Hands Form"]));
const STANCE_TEXT = /\b(enter|take|assume)s? (an? |this |your )?[\w-]* ?stance\b/i;

function isToggleFeature(name: string, text: string): boolean {
  if (NAMED_FEATURES.has(name)) return true;
  if (name.startsWith("The Way of the ")) return true;
  if (name.startsWith("Master of ") && /for (1|one) minute/i.test(text)) return true;
  return STANCE_TEXT.test(text);
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function shorten(s: string, max = 90): string {
  let t = s.trim().replace(/\.$/, "");
  t = t.charAt(0).toUpperCase() + t.slice(1);
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

// Chips read from feature text: "- Bullet" benefit lists (a short "Name." prefix becomes the
// label), else the "While in this stance, ..." / "Additionally, ..." sentences, else the PHB
// summary's clause after "for 1 minute".
function chipsFromText(text: string): EffectChip[] {
  const bullets = text.split(/\n-\s+/).slice(1);
  if (bullets.length) {
    return bullets.map((b) => {
      const clean = b.split(/\n|(?<=\.)\s+(?=This effect ends|Once you)/)[0].trim();
      const named = clean.match(/^([A-Z][\w' -]{2,30})\.\s+(.*)$/);
      return named
        ? { label: named[1], detail: named[2] }
        : { label: shorten(clean.split(/(?<=\.)\s/)[0]), detail: clean };
    });
  }
  const flat = text.replace(/\s+/g, " ");
  const sentences = flat.match(/(While (in this stance|this (form|ability|stance) is active)|Additionally),[^.]*\./g);
  if (sentences) return sentences.map((s) => ({ label: shorten(s.replace(/^[^,]*,\s*/, "")), detail: s }));
  // Up to the next sentence end ("vs. force powers" doesn't end one).
  const after = flat.match(/for (?:1|one) minute[,;:]?\s*(.*?)(?:\.\s+(?=[A-Z])|\.$|$)/i);
  const body = after?.[1]?.trim() ? after[1] : flat.split(/(?<=\.)\s/)[0];
  return body
    .split(/;\s*/)
    .filter((part) => part.trim())
    .map((part) => ({ label: shorten(part.replace(/^(adding|letting you|and)\s+/i, "")), detail: part.trim() }));
}

interface ToggleSource {
  name: string;
  source: string;
  text: string;
  resourceKey?: string;
}

function toEffect(c: Character, src: ToggleSource): ActiveEffect {
  const o = OVERRIDES[src.name];
  const name = o?.label ?? src.name;
  return {
    key: slug(`${src.source}-${src.name}`),
    name,
    feature: src.name,
    source: src.source,
    text: src.text,
    resourceKey: src.resourceKey,
    chips: o?.chips ? o.chips(c).map((chip) => ({ label: chip, detail: chip })) : chipsFromText(src.text),
    acBonus: o?.ac?.(c) ?? 0,
    doublesSpeed: !!o?.doublesSpeed,
    extraSpeeds: o?.speeds ?? [],
    weaponDice: o?.weaponDice,
  };
}

function levelOf(c: Character): number {
  return Math.max(1, Math.min(20, c.level || 1));
}

// Every stance/buff the character has unlocked, in feature-level order.
export function availableActiveEffects(c: Character): ActiveEffect[] {
  const lvl = levelOf(c);
  const sources: ToggleSource[] = [];
  const arch = ARCHETYPES_CATALOG.find((a) => a.name === c.archetypeAppliedName && a.className === c.classAppliedName);
  for (const f of arch?.features ?? []) {
    if (f.level > lvl || !isToggleFeature(f.name, f.text)) continue;
    sources.push({
      name: f.name,
      source: arch!.name,
      text: f.text,
      resourceKey: `arch-${slug(arch!.name)}-${slug(f.name)}`,
    });
  }
  const cls = CLASSES_CATALOG.find((k) => k.name === c.classAppliedName);
  for (const f of cls?.features ?? []) {
    if (f.level <= lvl && OVERRIDES[f.name]) sources.push({ name: f.name, source: cls!.name, text: f.text });
  }
  // Sentinel Ideals: "Manifest (bonus action): for 1 minute, ..."
  for (const o of allChosenSubChoiceOptions(c)) {
    const m = o.text.match(/Manifest \(bonus action\):\s*(.*)$/);
    if (m) sources.push({ name: `Manifest: ${o.name}`, source: o.name, text: `Bonus action: ${m[1]}` });
  }
  return sources.map((s) => toEffect(c, s));
}

export function activeEffects(c: Character): ActiveEffect[] {
  const on = c.activeEffects ?? [];
  if (!on.length) return [];
  return availableActiveEffects(c).filter((e) => on.includes(e.key));
}

// True while the toggle for the feature named `feature` is on.
export function isEffectActive(c: Character, feature: string): boolean {
  return activeEffects(c).some((e) => e.feature === feature);
}

export function activeEffectAcBonuses(c: Character): { label: string; amount: number }[] {
  return activeEffects(c)
    .filter((e) => e.acBonus > 0)
    .map((e) => ({ label: e.name, amount: e.acBonus }));
}

// `otherBonus` is every other speed bonus; "double speed" adds base + those once more.
export function activeEffectSpeedSources(c: Character, otherBonus: number): { label: string; amount: number }[] {
  const doubler = activeEffects(c).find((e) => e.doublesSpeed);
  return doubler ? [{ label: `${doubler.name} (double speed)`, amount: c.speedBase + otherBonus }] : [];
}

export function activeEffectExtraSpeeds(c: Character): string[] {
  return activeEffects(c).flatMap((e) => e.extraSpeeds);
}

export function activeEffectWeaponDice(c: Character): { label: string; dice: string }[] {
  return activeEffects(c)
    .filter((e) => e.weaponDice)
    .map((e) => ({ label: e.name, dice: e.weaponDice! }));
}
