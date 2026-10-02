import type { PickerOption } from "./components/PickerDialog";
import { SPECIES_CATALOG as SPECIES_PHB } from "./data/species";
import { SPECIES_CATALOG_EC } from "./data/speciesEC";
import { SPECIES_CATALOG_HOMEBREW } from "./data/speciesHomebrew";
import { CLASSES_CATALOG } from "./data/classes";
import { ARCHETYPES_CATALOG as ARCHETYPES_PHB } from "./data/archetypeDetails";
import { ARCHETYPES_CATALOG_EC } from "./data/archetypeDetailsEC";
import { BACKGROUND_CATALOG } from "./data/backgrounds";
import { FEATS_CATALOG } from "./data/feats";
import { WEAPON_CATALOG } from "./data/weapons";
import { ARMOR_CATALOG } from "./data/armor";
import { GEAR_CATALOG } from "./data/gear";
import { FORCE_POWERS, TECH_POWERS, type ForcePowerEntry, type TechPowerEntry } from "./data/powers";
import { ABILITY_LABEL } from "./speciesLogic";

const byName = (a: PickerOption, b: PickerOption) => a.name.localeCompare(b.name);
const byGroupThenName = (a: PickerOption, b: PickerOption) =>
  (a.group ?? "").localeCompare(b.group ?? "") || a.name.localeCompare(b.name);

// ---- Species ----
const ALL_SPECIES = [...SPECIES_PHB, ...SPECIES_CATALOG_EC, ...SPECIES_CATALOG_HOMEBREW];
export const SPECIES_OPTIONS: PickerOption[] = [
  ...SPECIES_PHB.map((s) => ({ name: s.name, group: "Core species", subtitle: `${s.size}, ${s.speed} ft.` })),
  ...SPECIES_CATALOG_EC.map((s) => ({ name: s.name, group: "Echoes of the Force", subtitle: `${s.size}, ${s.speed} ft.` })),
  ...SPECIES_CATALOG_HOMEBREW.map((s) => ({ name: s.name, group: "Homebrew", subtitle: `${s.size}, ${s.speed} ft.` })),
];
export function speciesDetails(name: string): string[] {
  const s = ALL_SPECIES.find((x) => x.name === name);
  if (!s) return [];
  return [`Size: ${s.size} · Speed: ${s.speed} ft.`, ...s.traits.map((t) => `${t.name}. ${t.text}`)];
}

// ---- Classes ----
export const CLASS_OPTIONS: PickerOption[] = CLASSES_CATALOG.map((c) => ({
  name: c.name,
  subtitle: `Hit die d${c.hitDie} · ${c.primaryAbility}`,
}));
export function classDetails(name: string): string[] {
  const c = CLASSES_CATALOG.find((x) => x.name === name);
  if (!c) return [];
  return [
    `Hit die: d${c.hitDie}. Primary ability: ${c.primaryAbility}.`,
    `Saving throws: ${c.savingThrows.map((k) => ABILITY_LABEL[k]).join(", ")}.`,
    `Armor: ${c.armorProficiency}`,
    `Weapons: ${c.weaponProficiency}`,
    `Tools: ${c.toolProficiency}`,
  ];
}

// ---- Archetypes ----
const ALL_ARCHETYPES = [...ARCHETYPES_PHB, ...ARCHETYPES_CATALOG_EC];
export function archetypeOptionsFor(className: string, fallbackNames: string[]): PickerOption[] {
  const forClass = ALL_ARCHETYPES.filter((a) => a.className === className);
  const entries = forClass.length > 0 ? forClass : [];
  if (entries.length > 0) return entries.map((a) => ({ name: a.name })).sort(byName);
  return fallbackNames.map((name) => ({ name })).sort(byName);
}
export function archetypeDetails(name: string): string[] {
  const a = ALL_ARCHETYPES.find((x) => x.name === name);
  if (!a) return [];
  return [...a.features].sort((x, y) => x.level - y.level).map((f) => `${f.name} (level ${f.level}). ${f.text}`);
}

// ---- Backgrounds ----
export const BACKGROUND_OPTIONS: PickerOption[] = BACKGROUND_CATALOG.map((b) => ({ name: b.name })).sort(byName);
export function backgroundDetails(name: string): string[] {
  const b = BACKGROUND_CATALOG.find((x) => x.name === name);
  if (!b) return [];
  return [
    b.toolProficienciesText ? `Tools: ${b.toolProficienciesText}` : "",
    b.equipmentText ? `Equipment: ${b.equipmentText}` : "",
    `Starting credits: ${b.startingCredits}`,
    b.featureName ? `${b.featureName}. ${b.featureText}` : "",
  ].filter(Boolean);
}

// ---- Feats ----
export const FEAT_OPTIONS: PickerOption[] = FEATS_CATALOG.map((f) => ({
  name: f.name,
  subtitle: f.prerequisite ? `Requires: ${f.prerequisite}` : undefined,
})).sort(byName);
export function featDetails(name: string): string[] {
  const f = FEATS_CATALOG.find((x) => x.name === name);
  if (!f) return [];
  return [f.prerequisite ? `Prerequisite: ${f.prerequisite}` : "", ...f.text.split("\n")].filter(Boolean);
}

// ---- Weapons ----
export const WEAPON_OPTIONS: PickerOption[] = WEAPON_CATALOG.map((w) => ({
  name: w.name,
  group: w.type,
  subtitle: w.damage,
})).sort(byGroupThenName);
export function weaponDetails(name: string): string[] {
  const w = WEAPON_CATALOG.find((x) => x.name === name);
  if (!w) return [];
  return [`${w.type} · Damage: ${w.damage}`, w.property ? `Properties: ${w.property}` : "", `Cost: ${w.cost} cr · Weight: ${w.weight} kg`].filter(Boolean);
}

// ---- Equipment (gear + weapons + armor) ----
export const EQUIPMENT_OPTIONS: PickerOption[] = [
  ...GEAR_CATALOG.map((g) => ({ name: g.name, group: `Gear — ${g.category}`, subtitle: `${g.cost} cr` })),
  ...WEAPON_CATALOG.map((w) => ({ name: w.name, group: `Weapon — ${w.type}`, subtitle: `${w.cost} cr` })),
  ...ARMOR_CATALOG.map((a) => ({ name: a.name, group: `Armor — ${a.type}`, subtitle: `${a.cost} cr` })),
].sort(byGroupThenName);
export function equipmentDetails(name: string): string[] {
  const lower = name.toLowerCase();
  const g = GEAR_CATALOG.find((x) => x.name.toLowerCase() === lower);
  if (g) return [g.category, `Cost: ${g.cost} cr`, `Weight: ${g.weight} kg`];
  const w = WEAPON_CATALOG.find((x) => x.name.toLowerCase() === lower);
  if (w) return weaponDetails(w.name);
  const a = ARMOR_CATALOG.find((x) => x.name.toLowerCase() === lower);
  if (a) {
    return [
      `${a.type} armor · AC: ${a.ac}`,
      a.property ? `Properties: ${a.property}` : "",
      `Stealth: ${a.stealth}`,
      `Cost: ${a.cost} cr · Weight: ${a.weight} kg`,
    ].filter(Boolean);
  }
  return [];
}
export function equipmentCatalogWeight(name: string): { name: string; weight: number } | undefined {
  const lower = name.toLowerCase();
  const hit =
    GEAR_CATALOG.find((x) => x.name.toLowerCase() === lower) ??
    WEAPON_CATALOG.find((x) => x.name.toLowerCase() === lower) ??
    ARMOR_CATALOG.find((x) => x.name.toLowerCase() === lower);
  return hit ? { name: hit.name, weight: hit.weight } : undefined;
}

// ---- Powers ----
function levelLabel(level: number): string {
  if (level <= 0) return "At-Will";
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  return `${level}${suffixes[level] ?? "th"} Level`;
}
function powerGroupOrder(a: PickerOption, b: PickerOption, levelOf: (name: string) => number): number {
  return levelOf(a.name) - levelOf(b.name) || a.name.localeCompare(b.name);
}
function powerDetailLines(entry: ForcePowerEntry | TechPowerEntry): string[] {
  return [
    "alignment" in entry ? `Alignment: ${entry.alignment}` : "",
    entry.castingTime ? `Casting Time: ${entry.castingTime}` : "",
    entry.range ? `Range: ${entry.range}` : "",
    entry.duration ? `Duration: ${entry.duration}` : "",
    `Concentration: ${entry.concentration ? "Yes" : "No"}`,
    "prerequisite" in entry && entry.prerequisite !== "-" ? `Prerequisite: ${entry.prerequisite}` : "",
    entry.description,
  ].filter(Boolean);
}
const FORCE_LEVEL = new Map(FORCE_POWERS.map((p) => [p.name, p.level]));
const TECH_LEVEL = new Map(TECH_POWERS.map((p) => [p.name, p.level]));
export const FORCE_POWER_OPTIONS: PickerOption[] = FORCE_POWERS.map((p) => ({
  name: p.name,
  group: levelLabel(p.level),
  subtitle: p.alignment,
})).sort((a, b) => powerGroupOrder(a, b, (n) => FORCE_LEVEL.get(n) ?? 0));
export const TECH_POWER_OPTIONS: PickerOption[] = TECH_POWERS.map((p) => ({
  name: p.name,
  group: levelLabel(p.level),
})).sort((a, b) => powerGroupOrder(a, b, (n) => TECH_LEVEL.get(n) ?? 0));
export function forcePowerDetails(name: string): string[] {
  const p = FORCE_POWERS.find((x) => x.name === name);
  return p ? powerDetailLines(p) : [];
}
export function techPowerDetails(name: string): string[] {
  const p = TECH_POWERS.find((x) => x.name === name);
  return p ? powerDetailLines(p) : [];
}
