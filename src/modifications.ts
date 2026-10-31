import type { Character, ClassSubChoiceDef, ClassSubChoiceOption, EquipmentItem, SpeciesNaturalArmor, Weapon } from "./types";
import { CLASS_SUB_CHOICES, ENGINEER_MOD_SLOTS_BY_LEVEL } from "./data/classFeatureChoices";
import { WEAPON_CATALOG } from "./data/weapons";
import { abilityModifier, armorCatalogMatch, proficiencyBonus } from "./utils";

// Own lookup rather than weaponLogic's, which imports classFeatureLogic (and that imports this file).
const WEAPON_LOOKUP = new Map(WEAPON_CATALOG.map((w) => [w.name.toLowerCase(), w]));

// Engineer Engineering Disciplines (sw5e.com, "Modified Armor", "Modified Weaponry", etc.): from 3rd
// level the engineer keeps one modified item with modification slots per the engineer table. Each
// modification installed past the proficiency bonus lowers the tech point maximum by 1. Armormech
// (armor + shield) and Armstech (two weapons) keep a second item from 9th level with its own slots;
// Artificer keeps two lightsabers that share one pool. Picks live in classSubChoicePicks under the
// discipline's def (managedInPanel); the item a pick sits on is its detail's modItemId.

type ItemKind = "armor" | "weapon" | "lightsaber";

export interface ModDiscipline {
  archetype: string;
  defKey: string;
  itemLabel: string; // the feature's name for the modified item
  itemKind: ItemKind | null; // null: not a sheet row (harness, instrument, pack, your body, ...)
  secondItem?: "own-slots" | "shared-slots"; // from 9th level
}

export const MOD_DISCIPLINES: ModDiscipline[] = [
  { archetype: "Armormech Engineering", defKey: "engineer-armormech-modifications", itemLabel: "Modified Armor", itemKind: "armor", secondItem: "own-slots" },
  { archetype: "Armstech Engineering", defKey: "engineer-armstech-modifications", itemLabel: "Modified Weaponry", itemKind: "weapon", secondItem: "own-slots" },
  { archetype: "Artificer Engineering", defKey: "engineer-artificer-modifications", itemLabel: "Modified Lightsaber", itemKind: "lightsaber", secondItem: "shared-slots" },
  { archetype: "Gadgeteer Engineering", defKey: "engineer-gadgeteer-modifications", itemLabel: "Gadgeteer Harness", itemKind: null },
  { archetype: "Astrotech Engineering", defKey: "engineer-astrotech-modifications", itemLabel: "Electronic Warfare Platform", itemKind: null },
  { archetype: "Audiotech Engineering", defKey: "engineer-audiotech-modifications", itemLabel: "Modified Instrument", itemKind: null },
  { archetype: "Biochem Engineering", defKey: "engineer-biochem-modifications", itemLabel: "Modified Biochemist's Pack", itemKind: null },
  { archetype: "Biotech Engineering", defKey: "engineer-biotech-modifications", itemLabel: "Modified Self", itemKind: null },
  { archetype: "Cybertech Engineering", defKey: "engineer-cybertech-modifications", itemLabel: "Cyberpad", itemKind: null },
];

const DEFS_BY_KEY = new Map(CLASS_SUB_CHOICES.map((d) => [d.key, d]));

function levelOf(c: Character): number {
  return Math.max(1, Math.min(20, c.level || 1));
}

export function modDiscipline(c: Character): ModDiscipline | null {
  if (c.classAppliedName !== "Engineer" || levelOf(c) < 3) return null;
  return MOD_DISCIPLINES.find((d) => d.archetype === c.archetypeAppliedName) ?? null;
}

export function modDef(d: ModDiscipline): ClassSubChoiceDef {
  return DEFS_BY_KEY.get(d.defKey)!;
}

// ---- Items and slots ----

export function itemCount(c: Character, d: ModDiscipline): number {
  if (!d.itemKind) return 0;
  return d.secondItem && levelOf(c) >= 9 ? 2 : 1;
}

export function slotsPerItem(c: Character): number {
  return ENGINEER_MOD_SLOTS_BY_LEVEL[levelOf(c) - 1] ?? 0;
}

export function totalSlots(c: Character, d: ModDiscipline): number {
  return slotsPerItem(c) * (d.secondItem === "own-slots" && levelOf(c) >= 9 ? 2 : 1);
}

// The sheet rows a discipline can modify. Armormech's second item must be the other kind (armor + shield).
export function modifiableItems(c: Character, d: ModDiscipline): { id: string; name: string; kind: "armor" | "shield" | "weapon" }[] {
  if (d.itemKind === "armor") {
    return c.equipment
      .map((i) => ({ i, entry: armorCatalogMatch(i.name) }))
      .filter((x) => x.entry)
      .map(({ i, entry }) => ({ id: i.id, name: i.name, kind: entry!.type === "Shield" ? ("shield" as const) : ("armor" as const) }));
  }
  if (d.itemKind === "weapon" || d.itemKind === "lightsaber") {
    return c.weapons
      .filter((w) => {
        const name = w.name.trim().toLowerCase();
        if (!name || name === "unarmed strike") return false;
        const entry = WEAPON_LOOKUP.get(name);
        return d.itemKind === "weapon" || !entry || /lightweapon/i.test(entry.type);
      })
      .map((w) => ({ id: w.id, name: w.name, kind: "weapon" as const }));
  }
  return [];
}

// The modified item ids still valid (row exists, discipline allows it), in slot order.
export function modifiedItems(c: Character, d: ModDiscipline | null = modDiscipline(c)): string[] {
  if (!d) return [];
  const valid = new Set(modifiableItems(c, d).map((x) => x.id));
  return (c.modifiedItemIds ?? []).slice(0, itemCount(c, d)).filter((id) => id && valid.has(id));
}

// A modified item is enhanced, so Infuse Item can't target it.
export function isModifiedItem(c: Character, id: string): boolean {
  return modifiedItems(c).includes(id);
}

export interface InstalledMod {
  index: number; // position in classSubChoicePicks[def.key]
  option: ClassSubChoiceOption;
  itemId: string; // "" when the discipline has no item row, or no item picked yet
}

export function installedMods(c: Character, d: ModDiscipline | null = modDiscipline(c)): InstalledMod[] {
  if (!d) return [];
  const def = modDef(d);
  const picks = c.classSubChoicePicks[def.key] ?? [];
  const details = c.classSubChoiceDetails[def.key] ?? [];
  const items = modifiedItems(c, d);
  const out: InstalledMod[] = [];
  picks.forEach((name, index) => {
    const option = def.options.find((o) => o.name === name);
    if (!option) return;
    const wanted = details[index]?.modItemId;
    // Older picks (before items were tracked) sit on the first modified item.
    const itemId = wanted && items.includes(wanted) ? wanted : (items[0] ?? "");
    out.push({ index, option, itemId });
  });
  return out;
}

// ---- Tech point cost ----

export function techPointPenaltySources(c: Character): { label: string; amount: number }[] {
  const out: { label: string; amount: number }[] = [];
  const pb = proficiencyBonus(c.level);
  const d = modDiscipline(c);
  if (d) {
    const excess = installedMods(c, d).length - pb;
    if (excess > 0) out.push({ label: `Modifications past proficiency bonus (${pb})`, amount: excess });
  }
  // Unstable Engineering: each override used past the proficiency bonus lowers the max until a long rest.
  if (c.classAppliedName === "Engineer" && c.archetypeAppliedName === "Unstable Engineering") {
    const r = c.classResources.find((x) => x.key === "engineer-tinkercannon-overrides");
    const excess = r ? r.max - r.current - pb : 0;
    if (excess > 0) out.push({ label: `Overrides used past proficiency bonus (${pb})`, amount: excess });
  }
  return out;
}

export function effectiveTechPointMax(c: Character): number {
  const penalty = techPointPenaltySources(c).reduce((sum, s) => sum + s.amount, 0);
  return Math.max(0, c.techPoints.max - penalty);
}

// ---- Prerequisites ----

const normalize = (s: string) => s.toLowerCase().replace(/prosthesis/g, "prothesis").replace(/[^a-z0-9]/g, "");

// Splits "11th level, Prototype Power Fist" into parts, re-joining option names that contain a comma
// ("Cryo Amplifier, Mk II") and "X, or Y" alternatives.
function prerequisiteParts(prereq: string, optionNames: Set<string>): string[][] {
  const raw = prereq.split(/,\s*/);
  const parts: string[][] = [];
  for (let i = 0; i < raw.length; i++) {
    const joined = i + 1 < raw.length ? `${raw[i]}, ${raw[i + 1]}` : "";
    if (joined && optionNames.has(normalize(joined))) {
      parts.push([joined]);
      i++;
    } else if (/^or\s+/i.test(raw[i]) && parts.length) {
      parts[parts.length - 1].push(raw[i].replace(/^or\s+/i, ""));
    } else {
      parts.push([raw[i]]);
    }
  }
  return parts;
}

// Item-type requirements, checked against the item the modification would go on.
function itemTypeMet(req: string, c: Character, itemId: string): boolean | null {
  const r = req.toLowerCase();
  const item = c.equipment.find((i) => i.id === itemId);
  const armor = item ? armorCatalogMatch(item.name) : null;
  if (r === "armor") return Boolean(armor && armor.type !== "Shield");
  if (r === "physical shield") return Boolean(armor && armor.type === "Shield" && !/generator/i.test(armor.name));
  if (r === "shield generator") return Boolean(armor && armor.type === "Shield" && /generator/i.test(armor.name));
  const m = r.match(/^(blaster|vibroweapon)(?: with the (strength|dexterity) property)?$/);
  if (!m) return null;
  const w = c.weapons.find((x) => x.id === itemId);
  const entry = w ? WEAPON_LOOKUP.get(w.name.trim().toLowerCase()) : undefined;
  if (!entry) return Boolean(w); // homebrew weapon names: can't tell, so allow
  if (!new RegExp(m[1], "i").test(entry.type)) return false;
  return !m[2] || new RegExp(m[2], "i").test(entry.property);
}

// Why an option can't be installed right now (on itemId), or null when it can. Unknown requirement
// text stays informational, as elsewhere on the sheet.
export function modLockReason(c: Character, d: ModDiscipline, option: ClassSubChoiceOption, itemId: string): string | null {
  if (!option.prerequisite) return null;
  const def = modDef(d);
  const optionNames = new Set(def.options.map((o) => normalize(o.name)));
  const installed = new Set(installedMods(c, d).map((m) => normalize(m.option.name)));
  for (const alternatives of prerequisiteParts(option.prerequisite, optionNames)) {
    const reasons: string[] = [];
    let met = false;
    for (const req of alternatives) {
      const lvl = req.match(/^(\d+)(?:st|nd|rd|th) level$/i);
      if (lvl) {
        if (levelOf(c) >= Number(lvl[1])) met = true;
        else reasons.push(`needs level ${lvl[1]}`);
        continue;
      }
      if (optionNames.has(normalize(req))) {
        if (installed.has(normalize(req))) met = true;
        else reasons.push(`needs ${req}`);
        continue;
      }
      const typeOk = itemTypeMet(req, c, itemId);
      if (typeOk === null || typeOk) met = true;
      else reasons.push(itemId ? `item must be ${req.toLowerCase()}` : `needs a modified ${req.toLowerCase()}`);
    }
    if (!met) return reasons.join(" or ");
  }
  return null;
}

// ---- Effects (read from the modification's own text) ----

export type ModEffectKind =
  | "weaponAttack"
  | "weaponDamage"
  | "acMelee"
  | "acRanged"
  | "techAttack"
  | "techAttackMelee"
  | "techAttackRanged"
  | "techDC"
  | "techDCSaves"
  | "speedWithArmor"
  | "unarmoredAC";

export interface ModEffect {
  kind: ModEffectKind;
  amount: number;
  saves?: string; // techDCSaves: e.g. "Strength or Constitution"
  condition?: string; // e.g. "while using your instrument as a tech focus"
}

// "+1 ... This bonus increases to +2 at 9th level and +3 at 13th level."
function scaled(text: string, level: number): number {
  const m = text.match(/increases to \+2 at (\d+)\w\w level and \+3 at (\d+)\w\w level/);
  if (!m) return 1;
  return level >= Number(m[2]) ? 3 : level >= Number(m[1]) ? 2 : 1;
}

export function modEffects(option: ClassSubChoiceOption, level: number): ModEffect[] {
  const t = option.text;
  const n = scaled(t, level);
  const focus = t.match(/While using your ([\w' ]+?) as a tech focus/i);
  const condition = focus ? `while using your ${focus[1]} as a tech focus` : undefined;
  const out: ModEffect[] = [];
  if (/\+1 bonus to attack rolls made with this weapon/.test(t)) out.push({ kind: "weaponAttack", amount: n });
  if (/\+1 bonus to damage rolls made with this weapon/.test(t)) out.push({ kind: "weaponDamage", amount: n });
  if (/\+1 bonus to AC against melee attacks/.test(t)) out.push({ kind: "acMelee", amount: n });
  if (/\+1 bonus to AC against ranged attacks/.test(t)) out.push({ kind: "acRanged", amount: n });
  if (/\+1 bonus to your armor class against melee weapon attacks/.test(t)) {
    out.push({ kind: "acMelee", amount: 1, condition: "while wielding your modified lightsaber" });
  }
  const techAttack = t.match(/\+1 bonus to (melee |ranged )?tech attack rolls/);
  if (techAttack) {
    const kind = techAttack[1] === "melee " ? "techAttackMelee" : techAttack[1] === "ranged " ? "techAttackRanged" : "techAttack";
    out.push({ kind, amount: n, condition });
  }
  const savesDC = t.match(/\+1 bonus to the tech save DC of powers you cast that requires? an? (\w+ or \w+) saving throw/);
  if (savesDC) out.push({ kind: "techDCSaves", amount: n, saves: savesDC[1], condition });
  else if (/\+1 bonus to your tech save DC/.test(t)) out.push({ kind: "techDC", amount: n, condition });
  if (/While wearing your modified armor your speed increases by 10 feet/.test(t)) out.push({ kind: "speedWithArmor", amount: 10 });
  if (/When you aren't wearing armor, your AC becomes 13 \+ your Dexterity modifier/.test(t)) out.push({ kind: "unarmoredAC", amount: 13 });
  return out;
}

function activeEffects(c: Character): { mod: InstalledMod; effect: ModEffect }[] {
  const level = levelOf(c);
  return installedMods(c).flatMap((mod) => modEffects(mod.option, level).map((effect) => ({ mod, effect })));
}

export function modWeaponBonus(c: Character, w: Weapon): { attack: number; damage: number; lines: string[] } {
  let attack = 0;
  let damage = 0;
  const lines: string[] = [];
  for (const { mod, effect } of activeEffects(c)) {
    if (mod.itemId !== w.id) continue;
    if (effect.kind === "weaponAttack") {
      attack += effect.amount;
      lines.push(`${mod.option.name}: +${effect.amount} attack`);
    } else if (effect.kind === "weaponDamage") {
      damage += effect.amount;
      lines.push(`${mod.option.name}: +${effect.amount} damage`);
    }
  }
  return { attack, damage, lines };
}

// Situational AC bonuses (not added to the Defense number) for the Defense box.
export function modDefenseNotes(c: Character): string[] {
  return activeEffects(c)
    .filter(({ effect }) => effect.kind === "acMelee" || effect.kind === "acRanged")
    .map(
      ({ mod, effect }) =>
        `${mod.option.name}: +${effect.amount} AC against ${effect.kind === "acMelee" ? "melee" : "ranged"} attacks${effect.condition ? ` ${effect.condition}` : ""}`
    );
}

// Integrated Subdermal Armor works like natural armor (13 + Dex while unarmored).
export function modNaturalArmor(c: Character): SpeciesNaturalArmor | null {
  const hit = activeEffects(c).find(({ effect }) => effect.kind === "unarmoredAC");
  if (!hit) return null;
  return { base: hit.effect.amount, addDex: true, allowLightArmor: false, allowAnyArmor: false, sourceLabel: hit.mod.option.name };
}

// The better of two natural-armor sources (species vs. modification) for computeDefense.
export function betterNaturalArmor(a: SpeciesNaturalArmor | null, b: SpeciesNaturalArmor | null): SpeciesNaturalArmor | null {
  if (!a || !b) return a ?? b;
  return b.base > a.base ? b : a;
}

export function modTechBonus(c: Character): { attack: number; dc: number; lines: { attack: string[]; dc: string[] }; notes: string[] } {
  let attack = 0;
  let dc = 0;
  const lines = { attack: [] as string[], dc: [] as string[] };
  const notes: string[] = [];
  for (const { mod, effect } of activeEffects(c)) {
    const when = effect.condition ? ` (${effect.condition})` : "";
    if (effect.kind === "techAttack") {
      attack += effect.amount;
      lines.attack.push(`${mod.option.name}: +${effect.amount}${when}`);
    } else if (effect.kind === "techDC") {
      dc += effect.amount;
      lines.dc.push(`${mod.option.name}: +${effect.amount}${when}`);
    } else if (effect.kind === "techAttackMelee" || effect.kind === "techAttackRanged") {
      notes.push(`${mod.option.name}: +${effect.amount} to ${effect.kind === "techAttackMelee" ? "melee" : "ranged"} tech attacks${when}`);
    } else if (effect.kind === "techDCSaves") {
      notes.push(`${mod.option.name}: +${effect.amount} tech save DC for ${effect.saves} saves${when}`);
    }
  }
  return { attack, dc, lines, notes };
}

// Accelerated Movement: +10 ft while the modified armor is worn.
export function modSpeedSources(c: Character): { label: string; amount: number }[] {
  const worn = new Set(c.equipment.filter((i: EquipmentItem) => i.equipped).map((i) => i.id));
  return activeEffects(c)
    .filter(({ mod, effect }) => effect.kind === "speedWithArmor" && worn.has(mod.itemId))
    .map(({ mod, effect }) => ({ label: mod.option.name, amount: effect.amount }));
}

// ---- Editing ----

// --- Long-rest change limit ---
// "Over the course of a long rest, you can install, replace, or remove a number of modifications up
// to your Intelligence modifier (minimum of one)." Each install and each removal since the last long
// rest counts; undoing one (removing a mod added since, or reinstalling one removed since) is free.
// A removal paired with an install is one replacement, so the count is the larger of the two lists.

export function modChangesPerRest(c: Character): number {
  return Math.max(1, abilityModifier(c.abilities.int));
}

function restChanges(c: Character): { added: string[]; removed: string[] } {
  return { added: c.modRestChanges?.added ?? [], removed: c.modRestChanges?.removed ?? [] };
}

export function modChangesUsed(c: Character): number {
  const r = restChanges(c);
  return Math.max(r.added.length, r.removed.length);
}

// Whether installing/removing `name` stays within this long rest's limit.
export function modChangeAllowed(c: Character, name: string, kind: "install" | "remove"): boolean {
  return modChangesUsed(recordModChange(c, name, kind)) <= modChangesPerRest(c);
}

export function modChangesLeft(c: Character): number {
  return Math.max(0, modChangesPerRest(c) - modChangesUsed(c));
}

// Records an install/removal against the limit (or cancels the change it undoes).
export function recordModChange(c: Character, name: string, kind: "install" | "remove"): Character {
  const r = restChanges(c);
  const drop = (list: string[]) => {
    const i = list.indexOf(name);
    return list.filter((_, j) => j !== i);
  };
  const next =
    kind === "install"
      ? r.removed.includes(name)
        ? { ...r, removed: drop(r.removed) }
        : { ...r, added: [...r.added, name] }
      : r.added.includes(name)
        ? { ...r, added: drop(r.added) }
        : { ...r, removed: [...r.removed, name] };
  return { ...c, modRestChanges: next };
}

export function installMod(c: Character, d: ModDiscipline, name: string, itemId: string): Character {
  const key = d.defKey;
  return {
    ...c,
    classSubChoicePicks: { ...c.classSubChoicePicks, [key]: [...(c.classSubChoicePicks[key] ?? []), name] },
    classSubChoiceDetails: {
      ...c.classSubChoiceDetails,
      [key]: [...padDetails(c, key), itemId ? { modItemId: itemId } : {}],
    },
  };
}

export function removeMod(c: Character, d: ModDiscipline, index: number): Character {
  const key = d.defKey;
  return {
    ...c,
    classSubChoicePicks: { ...c.classSubChoicePicks, [key]: (c.classSubChoicePicks[key] ?? []).filter((_, i) => i !== index) },
    classSubChoiceDetails: { ...c.classSubChoiceDetails, [key]: padDetails(c, key).filter((_, i) => i !== index) },
  };
}

export function moveMod(c: Character, d: ModDiscipline, index: number, itemId: string): Character {
  const key = d.defKey;
  const details = padDetails(c, key).map((x, i) => (i === index ? { ...x, modItemId: itemId } : x));
  return { ...c, classSubChoiceDetails: { ...c.classSubChoiceDetails, [key]: details } };
}

// Details run parallel to picks; older saves may have fewer entries.
function padDetails(c: Character, key: string) {
  const picks = c.classSubChoicePicks[key] ?? [];
  const details = c.classSubChoiceDetails[key] ?? [];
  return picks.map((_, i) => details[i] ?? {});
}
