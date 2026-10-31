// Stances and short buffs: features you switch on for a while (lightsaber-form stances, Mutagenic
// Transformation, Totemic Might, a Sentinel's Manifest...). Each one the character has unlocked
// gets an on/off toggle in Class Features; character.activeEffects holds the keys switched on.
// While on, its effects show as chips and the numeric ones (AC, speed, other speeds, extra weapon
// damage dice) are added to the sheet. Any rest ends them all. Berserker Rage keeps its own toggle.

import type { ArchetypeEntry, Character, SpeciesNaturalArmor } from "./types";
import { findPowerEntry } from "./pickerCatalogs";
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
  speedBonus: number;
  naturalArmor: SpeciesNaturalArmor | null;
  extraSpeeds: string[];
  weaponNotes: WeaponNote[];
  meleeForceAbility: boolean; // melee attacks may use Wisdom or Charisma (applied in toHitAbilityInfo)
}

// A badge next to weapon damage while an effect is on.
export interface WeaponNote {
  badge: string; // short text, e.g. "+1d6 Totemic Might"
  detail: string;
  appliesTo: "melee" | "ranged" | "any";
  strengthOnly?: boolean; // only weapons attacking with Strength
}

// Hand-written effects for features whose numbers the sheet can apply (or whose text doesn't
// break into readable chips). Keyed by feature name; anything else gets chips read from its text.
interface Override {
  label?: string;
  chips?: (c: Character) => string[];
  ac?: (c: Character) => number;
  doublesSpeed?: boolean;
  speed?: number; // flat walking speed bonus
  naturalArmor?: (c: Character) => SpeciesNaturalArmor;
  speeds?: string[];
  weaponNotes?: (c: Character) => WeaponNote[];
  meleeForceAbility?: boolean;
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
    weaponNotes: (c) => [
      {
        badge: `${formatModifier(forceMod(c))} 1st attack/turn`,
        detail: `Way of the Ysalamiri: add ${formatModifier(forceMod(c))} (Wisdom or Charisma) to the first melee attack roll and its damage each turn.`,
        appliesTo: "melee",
      },
    ],
  },
  "The Way of the Rancor": {
    chips: () => ["Melee attack as part of casting a force power", "Wisdom or Charisma for melee attack and damage rolls (applied to To Hit)"],
    meleeForceAbility: true,
    weaponNotes: (c) => [
      {
        badge: `Wis/Cha ${formatModifier(forceMod(c))} for damage`,
        detail: `Way of the Rancor: use your Wisdom or Charisma modifier (${formatModifier(forceMod(c))}) instead of Strength or Dexterity for this melee damage roll. To Hit already uses it.`,
        appliesTo: "melee",
      },
    ],
  },
  "The Way of the Krayt Dragon": {
    chips: (c) => [`First Strength melee hit each turn: ${formatModifier(Math.max(1, mod(c, "str")))} damage, redirectable to an adjacent creature`],
    weaponNotes: (c) => [
      {
        badge: `${formatModifier(Math.max(1, mod(c, "str")))} 1st hit/turn`,
        detail: `Way of the Krayt Dragon: the first Strength melee hit each turn deals ${formatModifier(Math.max(1, mod(c, "str")))} extra damage (Strength modifier), which you can redirect to a creature within 5 ft of the target.`,
        appliesTo: "melee",
        strengthOnly: true,
      },
    ],
  },
  "The Way of the Acklay": {
    weaponNotes: (c) => {
      const half = Math.max(1, Math.floor(Math.max(mod(c, "str"), mod(c, "dex")) / 2));
      return [
        {
          badge: `+${half} Acklay (off-hand)`,
          detail: `Way of the Acklay: add half your Strength or Dexterity modifier (+${half}) to melee weapon damage rolls that don't already include that modifier, such as off-hand attacks.`,
          appliesTo: "melee",
        },
      ];
    },
  },
  "The Way of the Yerdua": {
    weaponNotes: (c) => [
      {
        badge: `${formatModifier(forceMod(c))} one shot/turn`,
        detail: `Way of the Yerdua: add your Wisdom or Charisma modifier (${formatModifier(forceMod(c))}) to one ranged weapon attack and its damage each turn.`,
        appliesTo: "ranged",
      },
    ],
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
    weaponNotes: () => [{ badge: "+1d6 Totemic Might", detail: "Totemic Might: your weapon attacks deal an extra 1d6 damage.", appliesTo: "any" }],
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

function toEffect(c: Character, src: ToggleSource, o: Override | undefined = OVERRIDES[src.name]): ActiveEffect {
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
    speedBonus: o?.speed ?? 0,
    naturalArmor: o?.naturalArmor?.(c) ?? null,
    extraSpeeds: o?.speeds ?? [],
    weaponNotes: o?.weaponNotes?.(c) ?? [],
    meleeForceAbility: !!o?.meleeForceAbility,
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
  const effects = sources.map((s) => toEffect(c, s));
  // Known self-buff powers that aren't concentration (Battle Precognition, Saber Ward); concentration
  // powers go through the concentration tracker instead.
  for (const p of c.powers ?? []) {
    const buff = POWER_BUFFS[p.name];
    const found = buff && findPowerEntry(p.name, p.type);
    if (!found || found.entry.concentration) continue;
    const key = `power-${slug(p.name)}`;
    if (effects.some((e) => e.key === key)) continue;
    effects.push({ ...toEffect(c, { name: p.name, source: `${found.type} power`, text: found.entry.description }, buff), key });
  }
  return effects;
}

export function activeEffects(c: Character): ActiveEffect[] {
  const on = c.activeEffects ?? [];
  const toggled = on.length ? availableActiveEffects(c).filter((e) => on.includes(e.key)) : [];
  const conc = concentrationEffect(c);
  return conc ? [...toggled, conc] : toggled;
}

// --- Concentration ---

// Buff powers whose numbers the sheet applies while they affect you. Powers not listed still show
// in the concentration tracker, just without automatic numbers.
const SPEED_POWER: Override = {
  ac: () => 2,
  doublesSpeed: true,
  chips: () => ["Double speed", "+2 AC", "Advantage: Dexterity saves", "Extra limited action each turn"],
};
const POWER_BUFFS: Record<string, Override> = {
  "Improved Force Intuition": { ac: () => 2, chips: () => ["+2 AC", "Advantage on initiative"] },
  "Knight Speed": SPEED_POWER,
  "Master Speed": SPEED_POWER,
  "Tactical Advantage": SPEED_POWER,
  "Tactical Superiority": SPEED_POWER,
  "Motivator Boost": { ac: () => 2, doublesSpeed: true, chips: () => ["Double speed", "+2 AC", "Advantage: Dexterity saves"] },
  "Tactical Barrier": { ac: () => 2, chips: () => ["+2 AC"] },
  "Art of Movement": { speed: 10, chips: () => ["+10 ft speed", "Leap over obstacles"] },
  "Force Focus": {
    chips: () => ["+1d4 force damage on weapon hits"],
    weaponNotes: () => [{ badge: "+1d4 Force Focus", detail: "Force Focus: your weapon attacks deal an extra 1d4 force damage on a hit.", appliesTo: "any" }],
  },
  "Aura of Vigor": {
    chips: () => ["+1d4 weapon damage (you and allies within 30 ft)"],
    weaponNotes: () => [{ badge: "+1d4 Aura of Vigor", detail: "Aura of Vigor: creatures in the aura, including you, deal an extra 1d4 damage with weapon attacks.", appliesTo: "any" }],
  },
  "Dark Aura": {
    chips: () => ["+1d8 necrotic on hits within 10 ft"],
    weaponNotes: () => [{ badge: "+1d8 Dark Aura (10 ft)", detail: "Dark Aura: any attack you make deals an extra 1d8 necrotic damage when you hit a creature within 10 feet of you.", appliesTo: "any" }],
  },
  "Ballistic Shield": { chips: () => ["Resistant: kinetic, energy, ion"] },
  "Disperse Energy": { chips: () => ["Resistant: acid, cold, fire, lightning, sonic"] },
  "Shroud of Darkness": { chips: () => ["Resistant: force", "Heavily obscured"] },
  Valor: { chips: () => ["+1d4 to attack rolls and saving throws"] },
  "Battle Precognition": {
    naturalArmor: () => ({ base: 13, addDex: true, allowLightArmor: false, allowAnyArmor: false, sourceLabel: "Battle Precognition (13 + Dex modifier)" }),
    chips: () => ["Base AC 13 + Dex (no armor)"],
  },
  "Saber Ward": { chips: () => ["Resistant: kinetic, energy, ion from weapons", "Until the end of your next turn"] },
};

export interface ConcentrationInfo {
  name: string;
  type: "Force" | "Tech";
  selfRange: boolean; // Self-range powers always affect the caster
  affectsMe: boolean;
  text: string;
  effect: ActiveEffect | null; // numbers/chips applied while it affects you
}

export function concentrationInfo(c: Character): ConcentrationInfo | null {
  const name = c.concentratingOn;
  if (!name) return null;
  const known = (c.powers ?? []).find((p) => p.name === name);
  const found = findPowerEntry(name, known?.type ?? "Force");
  const selfRange = found ? /^Self/i.test(found.entry.range) : false;
  const affectsMe = selfRange || c.concentrationSelf !== false;
  const buff = POWER_BUFFS[found?.entry.name ?? name];
  const effect =
    buff && affectsMe
      ? { ...toEffect(c, { name, source: "Concentration", text: found?.entry.description ?? "" }, buff), key: `conc-${slug(name)}` }
      : null;
  return { name, type: found?.type ?? known?.type ?? "Force", selfRange, affectsMe, text: found?.entry.description ?? "", effect };
}

function concentrationEffect(c: Character): ActiveEffect | null {
  return concentrationInfo(c)?.effect ?? null;
}

// Whether a power needs concentration (catalog entry), for the Powers list's C button.
export function isConcentrationPower(name: string, type: "Force" | "Tech"): boolean {
  return !!findPowerEntry(name, type)?.entry.concentration;
}

export function activeEffectNaturalArmor(c: Character): SpeciesNaturalArmor | null {
  return activeEffects(c).find((e) => e.naturalArmor)?.naturalArmor ?? null;
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
  const effects = activeEffects(c);
  const flat = effects.filter((e) => e.speedBonus > 0).map((e) => ({ label: e.name, amount: e.speedBonus }));
  const flatTotal = flat.reduce((sum, s) => sum + s.amount, 0);
  const doubler = effects.find((e) => e.doublesSpeed);
  return doubler
    ? [...flat, { label: `${doubler.name} (double speed)`, amount: c.speedBase + otherBonus + flatTotal }]
    : flat;
}

export function activeEffectExtraSpeeds(c: Character): string[] {
  return activeEffects(c).flatMap((e) => e.extraSpeeds);
}

export function activeEffectWeaponNotes(c: Character): WeaponNote[] {
  return activeEffects(c).flatMap((e) => e.weaponNotes);
}

// Way of the Rancor: Wisdom or Charisma (the higher) for melee attacks, if better than the usual.
export function meleeForceAbilitySubstitute(c: Character): { mod: number; label: string } | null {
  const e = activeEffects(c).find((x) => x.meleeForceAbility);
  if (!e) return null;
  const useCha = mod(c, "cha") > mod(c, "wis");
  return { mod: useCha ? mod(c, "cha") : mod(c, "wis"), label: `${useCha ? "Charisma" : "Wisdom"} (${e.name})` };
}
