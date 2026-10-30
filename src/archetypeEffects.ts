// Archetype features that change numbers on the sheet, applied automatically once the
// archetype's feature level is reached. Each helper returns labelled sources so the sheet can
// show where a bonus came from (HoverInfo lines). "(Companion)" archetype variants share their
// base archetype's owner effects (resources are read from the variant's own features); effects on
// the companion itself live in companionLogic.ts.

import type { AbilityKey, ArchetypeEntry, Character, ClassResourceDef, ClassResourceRefresh, SpeciesNaturalArmor } from "./types";
import { ARCHETYPES_CATALOG as ARCHETYPES_CATALOG_PHB } from "./data/archetypeDetails";
import { ARCHETYPES_CATALOG_EC } from "./data/archetypeDetailsEC";
import { abilityModifier, formatModifier, proficiencyBonus } from "./utils";
import type { EquippedDefense } from "./utils";

const ARCHETYPES_CATALOG: ArchetypeEntry[] = [...ARCHETYPES_CATALOG_PHB, ...ARCHETYPES_CATALOG_EC];

function levelOf(c: Character): number {
  return Math.max(1, Math.min(20, c.level || 1));
}

// "Mechanist Technique (Companion)" counts as "Mechanist Technique" for owner effects.
function baseArchetype(c: Character): string {
  return c.archetypeAppliedName.replace(/\s*\(Companion\)$/, "");
}

// True once the character's archetype is `archetype` and they've reached `level`.
export function hasArchetypeFeature(c: Character, archetype: string, level: number): boolean {
  return baseArchetype(c) === archetype && levelOf(c) >= level;
}

function mod(c: Character, key: AbilityKey): number {
  return abilityModifier(c.abilities[key]);
}

// --- Defense ---

// Way of Endurance's Upheld by the Force: base AC 13 + Con while unarmored (shields still add).
export function archetypeNaturalArmor(c: Character): SpeciesNaturalArmor | null {
  if (hasArchetypeFeature(c, "Way of Endurance", 3)) {
    return {
      base: 13 + mod(c, "con"),
      addDex: false,
      allowLightArmor: false,
      allowAnyArmor: false,
      sourceLabel: "Upheld by the Force (13 + Con modifier)",
    };
  }
  return null;
}

// The natural-armor candidate with the highest total for this Dex modifier.
export function bestNaturalArmor(
  candidates: (SpeciesNaturalArmor | null)[],
  dexModifier: number
): SpeciesNaturalArmor | null {
  let best: SpeciesNaturalArmor | null = null;
  let bestTotal = -Infinity;
  for (const n of candidates) {
    if (!n) continue;
    const total = n.base + (n.addDex ? dexModifier : 0);
    if (total > bestTotal) {
      best = n;
      bestTotal = total;
    }
  }
  return best;
}

// Path of Iron's Physical Conditioning: Wisdom or Charisma instead of Dexterity in light or
// medium armor. The choice is the player's, so the better of the two is used.
export function armorAbilitySubstitute(c: Character): { modifier: number; label: string } | null {
  if (!hasArchetypeFeature(c, "Path of Iron", 3)) return null;
  const useCha = mod(c, "cha") > mod(c, "wis");
  return {
    modifier: useCha ? mod(c, "cha") : mod(c, "wis"),
    label: `Physical Conditioning (${useCha ? "Charisma" : "Wisdom"} instead of Dexterity)`,
  };
}

// Flat AC bonuses that are on whenever their condition holds (added to the Defense number).
export function archetypeAcBonuses(c: Character, computed: EquippedDefense): { label: string; amount: number }[] {
  const out: { label: string; amount: number }[] = [];
  if (hasArchetypeFeature(c, "Performance Practice", 3)) {
    const heavyShield = computed.shields.some((s) => /medium|heavy/i.test(s.name));
    const half = Math.floor(mod(c, "cha") / 2);
    if (!computed.armor && !heavyShield && half > 0) out.push({ label: "Artful Dancer (half Charisma modifier)", amount: half });
  }
  return out;
}

// Situational AC bonuses, listed in the Defense breakdown but not added to the number.
export function archetypeDefenseNotes(c: Character): string[] {
  const notes: string[] = [];
  const pb = proficiencyBonus(levelOf(c));
  const forceMod = Math.max(1, Math.max(mod(c, "wis"), mod(c, "cha")));
  if (hasArchetypeFeature(c, "Way of Negation", 10)) notes.push("Enduring Focus: +2 AC (and +2 to all saves) while concentrating on a Force power");
  if (hasArchetypeFeature(c, "Way of Manipulation", 3)) notes.push(`Saber Storm: +${forceMod} AC (Wisdom or Charisma) while active with a weapon within 5 ft`);
  if (hasArchetypeFeature(c, "Fireteam Specialist", 10)) notes.push(`On Your Six: +${Math.floor(pb / 2)} AC while next to your chosen ally, no shield`);
  if (hasArchetypeFeature(c, "Exhibition Specialist", 15)) notes.push(`Glorious Defense (reaction): +${Math.max(1, mod(c, "cha"))} AC against one hit`);
  if (hasArchetypeFeature(c, "Geneticist Pursuit", 6)) {
    notes.push(`Mutagenic Transformation: +${Math.max(1, Math.floor(mod(c, "int") / 2))} AC (half Critical Analysis modifier) while transformed`);
  }
  return notes;
}

// --- Initiative ---

export function archetypeInitiativeSources(c: Character): { label: string; amount: number }[] {
  const out: { label: string; amount: number }[] = [];
  const cha = mod(c, "cha");
  if (hasArchetypeFeature(c, "Ruffian Practice", 3)) out.push({ label: "Rakish Audacity (Charisma modifier)", amount: cha });
  if (hasArchetypeFeature(c, "Performance Practice", 17)) out.push({ label: "Master of Dance (Charisma modifier)", amount: cha });
  return out;
}

export function archetypeInitiativeNotes(c: Character): string[] {
  const notes: string[] = [];
  if (hasArchetypeFeature(c, "Lethality Practice", 13)) notes.push("Bushmaster: advantage on initiative");
  if (hasArchetypeFeature(c, "Juyo/Vaapad Form", 7)) notes.push("Fury: advantage on initiative, +10 ft speed on your first turn");
  return notes;
}

// --- Weapons ---

// Assault Specialist's Brute Force: +2 to weapon damage rolls, +3 at 10th, +4 at 16th.
export function archetypeWeaponDamageBonus(c: Character): { label: string; amount: number } | null {
  if (!hasArchetypeFeature(c, "Assault Specialist", 3)) return null;
  const lvl = levelOf(c);
  return { label: "Brute Force", amount: lvl >= 16 ? 4 : lvl >= 10 ? 3 : 2 };
}

// --- Saving throws ---

// Saves an archetype feature grants at its level, applied with the class's level-granted saves.
export function archetypeSavingThrows(c: Character): AbilityKey[] {
  if (hasArchetypeFeature(c, "Praetorian Specialist", 7)) return ["wis"]; // Resilient Retainer
  return [];
}

// --- Speeds ---

export function archetypeExtraSpeeds(c: Character): string[] {
  const out: string[] = [];
  if (hasArchetypeFeature(c, "Explorer Pursuit", 9)) out.push("Unstoppable Adventurer: climbing and swimming speed equal to your walking speed");
  if (hasArchetypeFeature(c, "Beastmaster Approach", 6)) out.push("Animalistic Momentum: climbing or swimming speed (your choice) equal to your walking speed");
  return out;
}

// --- Passive chips (resistances, immunities and other always-on effects) ---

interface PassiveChip {
  archetype: string;
  level: number;
  title: string;
  chip: (c: Character) => string;
  lines: (c: Character) => string[];
}

const PASSIVE_CHIPS: PassiveChip[] = [
  { archetype: "Way of Lightning", level: 14, title: "Electric Attunement", chip: () => "Resistant: lightning", lines: () => ["Resistance to lightning damage; your force powers ignore resistance to lightning damage."] },
  { archetype: "Way of Balance", level: 18, title: "Force Resistance", chip: () => "Resistant: force powers", lines: () => ["Advantage on saving throws against force powers, and resistance to their damage."] },
  { archetype: "Way of the Seer", level: 14, title: "Shielded Thoughts", chip: () => "Resistant: psychic", lines: () => ["Your thoughts can't be read unless you allow it. Resistance to psychic damage, and a creature that deals psychic damage to you takes the same amount."] },
  { archetype: "Mechanist Technique", level: 11, title: "High Voltage", chip: () => "Resistant: ion, lightning", lines: () => ["You gain resistance to ion and lightning damage."] },
  { archetype: "Geneticist Pursuit", level: 9, title: "Geneticist's Resilience", chip: () => "Immune: poison, disease (resistant)", lines: () => ["Your genetic alterations make you immune to poison and disease. Additionally, you have resistance to poison damage."] },
  { archetype: "Path of Aggression", level: 3, title: "Thunderous Momentum", chip: () => "Immune: shocked", lines: () => ["You are immune to the shocked condition, and each slowed level only reduces your speed by 5 feet, unless it would reduce your speed to 0."] },
  { archetype: "Acquisitions Practice", level: 9, title: "Supreme Sneak", chip: () => "Immune: fall damage under 100 ft", lines: () => ["Advantage on Stealth if you move no more than half speed; resistance to and immunity from damage on falls under 100 feet."] },
  { archetype: "Armored Approach", level: 6, title: "Environmental Shielding", chip: () => "Resistant: chosen type (spiked armor)", lines: () => ["While wearing your spiked armor, resistance to your chosen damage type: acid, cold, fire, lightning, or sonic. Note the type in Advantages, Resistances, Immunities."] },
  { archetype: "Ataru Form", level: 7, title: "Hawk-Bat Swoop", chip: () => "No fall damage up to your speed", lines: () => ["You can move along vertical surfaces, and take no damage from falls no longer than your walking speed."] },
  {
    archetype: "Biotech Engineering",
    level: 18,
    title: "Focused Augmentation",
    chip: (c) => `Concentration saves ${formatModifier(mod(c, "int"))} (Int)`,
    lines: (c) => [`You add your Intelligence modifier (${formatModifier(mod(c, "int"))}) to Constitution saving throws to maintain concentration.`],
  },
  {
    archetype: "Praetorian Specialist",
    level: 7,
    title: "Resilient Retainer",
    chip: () => "Proficient: Wisdom saves",
    lines: () => [
      "You gain proficiency in Persuasion and Wisdom saving throws — already applied above.",
      "If you already had Wisdom save proficiency from somewhere else, mark Intelligence or Charisma saves instead (your choice).",
    ],
  },
];

export function archetypePassiveChips(c: Character): { title: string; chip: string; lines: string[] }[] {
  return PASSIVE_CHIPS.filter((p) => hasArchetypeFeature(c, p.archetype, p.level)).map((p) => ({
    title: p.title,
    chip: p.chip(c),
    lines: p.lines(c),
  }));
}

// --- Limited-use features as class resources ---

// A ClassResourceDef read from an archetype feature's "You can use this feature twice. You gain an
// additional use at 5th, 9th... You regain all expended uses when you finish a short or long rest."
// text (or the PHB summaries' "3 uses, more at 9th/13th/17th level" / "Long rest to reuse." / "Once
// you use this feature, you can't ... until you finish a long rest."). Built once from the catalog.
export interface ArchetypeResourceDef extends ClassResourceDef {
  minLevel: number;
  featureText: string;
  abilityMax?: AbilityKey; // uses equal to this ability modifier (minimum 1) instead of maxByLevel
}

const COUNT_WORDS: Record<string, number> = { once: 1, twice: 2, "three times": 3, "four times": 4, "five times": 5, "six times": 6 };
const ABILITY_WORDS: Record<string, AbilityKey> = {
  strength: "str", dexterity: "dex", constitution: "con", intelligence: "int", wisdom: "wis", charisma: "cha",
};

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function refreshFrom(text: string): ClassResourceRefresh {
  return /(short or long|short\/long) rest/i.test(text) ? "Short Rest" : "Long Rest";
}

function levelsFrom(list: string): number[] {
  return [...list.matchAll(/(\d+)(?:st|nd|rd|th)/g)].map((m) => Number(m[1]));
}

// Features that are lists of options (modifications, discoveries, totems) or describe a
// companion's own uses are left as text.
const SKIP_FEATURE = /(Modifications|Discoveries|Options|Enhancements)$/;
const COMPANION_SUBJECT = /\b(your|its) (companion|beast|droid|turret|familiar)\b/i;

function parseUses(
  text: string
): { base: number | "pb" | "halfPb" | AbilityKey; extraAt: number[]; refresh: ClassResourceRefresh } | null {
  // "You can use this feature twice." / "a combined three times" / "a number of times equal to ..."
  const full = text.match(
    /(?:^|[.\n]\s*)You can use (?:this|these) (?:feature|features|ability)(?: a combined)? (once|twice|three times|four times|five times|six times|(?:a )?(?:combined )?number of times equal to (half )?your proficiency bonus|a number of times equal to your (\w+) modifier)/
  );
  if (full) {
    const word = full[1].toLowerCase();
    const base = COUNT_WORDS[word] ?? (full[3] ? ABILITY_WORDS[full[3].toLowerCase()] : full[2] ? "halfPb" : "pb");
    if (!base) return null;
    const rest = text.slice(full.index ?? 0);
    const extra = rest.match(/additional uses? at ([^.]+?) level/i);
    const regain = rest.match(/regain[^.]*?(?:finish|complete) a ([^.]*?rest)/i);
    return { base, extraAt: extra ? levelsFrom(extra[1]) : [], refresh: refreshFrom(regain ? regain[1] : "long rest") };
  }
  // PHB summary: "3 uses, more at 9th/13th/17th level; regains on short/long rest."
  const summary = text.match(/(\d+) uses, more at ([\d\w/]+?)(?: level)?(?:[;,.]|$)([^.]*)/);
  if (summary) {
    return { base: Number(summary[1]), extraAt: levelsFrom(summary[2]), refresh: refreshFrom(summary[3]) };
  }
  const reuse = text.match(/(Short\/long|Long) rest to reuse\./);
  if (reuse) return { base: 1, extraAt: [], refresh: refreshFrom(reuse[1]) };
  const once = text.match(/Once you(?:'ve)? use[d]? (?:this|that) (?:feature|ability)[^.]*?(?:can't|cannot) [^.]*?until you (?:finish|complete) a ([^.]*?rest)/);
  if (once) return { base: 1, extraAt: [], refresh: refreshFrom(once[1]) };
  return null;
}

function buildArchetypeResources(): ArchetypeResourceDef[] {
  const out: ArchetypeResourceDef[] = [];
  for (const entry of ARCHETYPES_CATALOG) {
    for (const f of entry.features) {
      if (SKIP_FEATURE.test(f.name) || COMPANION_SUBJECT.test(f.text)) continue;
      const uses = parseUses(f.text);
      if (!uses) continue;
      const maxByLevel = Array.from({ length: 20 }, (_, i) => {
        const lvl = i + 1;
        if (lvl < f.level) return 0;
        if (uses.base === "pb") return proficiencyBonus(lvl);
        if (uses.base === "halfPb") return Math.max(1, Math.floor(proficiencyBonus(lvl) / 2));
        if (typeof uses.base === "string") return 0; // ability-based, see abilityMax
        return uses.base + uses.extraAt.filter((l) => l <= lvl).length;
      });
      out.push({
        key: `arch-${slug(entry.name)}-${slug(f.name)}`,
        label: f.name,
        className: entry.className,
        archetypeName: entry.name,
        refresh: uses.refresh,
        maxByLevel,
        minLevel: f.level,
        featureText: f.text,
        abilityMax: typeof uses.base === "string" && uses.base !== "pb" && uses.base !== "halfPb" ? uses.base : undefined,
      });
    }
  }
  return out;
}

export const ARCHETYPE_RESOURCES: ArchetypeResourceDef[] = buildArchetypeResources();
const ARCHETYPE_RESOURCES_BY_KEY = new Map(ARCHETYPE_RESOURCES.map((r) => [r.key, r]));

export function archetypeResourceDef(key: string): ArchetypeResourceDef | undefined {
  return ARCHETYPE_RESOURCES_BY_KEY.get(key);
}

// The character's archetype resources unlocked at their level.
export function applicableArchetypeResources(c: Character): ArchetypeResourceDef[] {
  // Exact name: a "(Companion)" variant has its own feature list.
  return ARCHETYPE_RESOURCES.filter(
    (r) => r.archetypeName === c.archetypeAppliedName && r.className === c.classAppliedName && levelOf(c) >= r.minLevel
  );
}

// Extra max for ability-based archetype resources (e.g. "a number of times equal to your
// Intelligence modifier (minimum of 1)").
export function archetypeResourceMaxBonus(c: Character, key: string): number {
  const def = ARCHETYPE_RESOURCES_BY_KEY.get(key);
  return def?.abilityMax ? Math.max(1, mod(c, def.abilityMax)) : 0;
}
