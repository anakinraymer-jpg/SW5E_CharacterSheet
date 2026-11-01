// Custom items: homebrew or one-off weapons, armor, shields and gear. A reusable library lives in
// localStorage ("sw5e-custom-items"); when added to a character the definition is copied onto the
// Weapon/EquipmentItem row (`custom`), so the character keeps working on another device or after
// the library entry is edited or deleted.
//
// Custom armor and weapons plug into the existing name-based lookups (armorCatalogMatch,
// WEAPON_LOOKUP) through a registry that CharacterSheet refreshes from the open character
// (syncCustomRegistry in weaponLogic.ts), so Defense, the equip lists and to-hit all work unchanged.

import type { ArmorCatalogEntry } from "./data/armor";
import type { AbilityKey, AbilityScores, Character, CustomItem, Weapon } from "./types";
import { emptyAbilities0 } from "./types";

const STORAGE_KEY = "sw5e-custom-items";

export const customArmor = new Map<string, ArmorCatalogEntry>();

export function loadCustomItemLibrary(): CustomItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((i) => i && typeof i.id === "string" && typeof i.name === "string") : [];
  } catch {
    return [];
  }
}

export function saveCustomItemLibrary(items: CustomItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable: the library just won't persist
  }
}

export function newCustomItem(): CustomItem {
  return { id: crypto.randomUUID(), name: "", kind: "gear", weight: 0, notes: "" };
}

export function armorEntryFor(item: CustomItem, name = item.name): ArmorCatalogEntry | null {
  if (item.kind !== "armor" && item.kind !== "shield") return null;
  const base = Math.max(0, Math.round(item.baseAc ?? (item.kind === "shield" ? 2 : 10)));
  let ac: string;
  if (item.kind === "shield") ac = `+${base}`;
  else if (item.dexMode === "full") ac = `${base} + Dex modifier`;
  else if (item.dexMode === "max") ac = `${base} + Dex modifier (max ${Math.max(0, Math.round(item.dexMax ?? 2))})`;
  else ac = `${base}`;
  return {
    name,
    type: item.kind === "shield" ? "Shield" : (item.armorType ?? "Light"),
    property: "",
    cost: 0,
    weight: item.weight,
    ac,
    stealth: "-",
  };
}

export function weaponEntryFor(item: CustomItem, name = item.name) {
  return {
    name,
    type: item.weaponStyle === "ranged" ? "Custom Blaster" : "Custom Melee",
    property: item.property ?? "",
    cost: 0,
    weight: item.weight,
    damage: item.damage ?? "",
  };
}

function equippedCustom(c: Character): CustomItem[] {
  return [
    ...c.equipment.filter((i) => i.equipped && i.custom).map((i) => i.custom as CustomItem),
    ...c.weapons.filter((w) => w.equipped && w.custom).map((w) => w.custom as CustomItem),
  ];
}

export function customAcBonuses(c: Character): { label: string; amount: number }[] {
  return equippedCustom(c)
    .filter((i) => i.acBonus)
    .map((i) => ({ label: i.name, amount: i.acBonus as number }));
}

export function customSpeedSources(c: Character): { label: string; amount: number }[] {
  return equippedCustom(c)
    .filter((i) => i.speedBonus)
    .map((i) => ({ label: i.name, amount: i.speedBonus as number }));
}

export function customAbilityTotals(c: Character): AbilityScores {
  const total = emptyAbilities0();
  for (const item of equippedCustom(c)) {
    for (const [k, v] of Object.entries(item.abilityBonus ?? {})) {
      if (v) total[k as AbilityKey] += v;
    }
  }
  return total;
}

// A weapon's own enchantment: counts whether or not it is currently equipped.
export function customWeaponBonus(w: Weapon): { attack: number; damage: number; lines: string[] } {
  const attack = w.custom?.attackBonus ?? 0;
  const damage = w.custom?.damageBonus ?? 0;
  const lines: string[] = [];
  if (attack) lines.push(`${w.custom?.name}: ${attack > 0 ? "+" : ""}${attack} attack`);
  if (damage) lines.push(`${w.custom?.name}: ${damage > 0 ? "+" : ""}${damage} damage`);
  return { attack, damage, lines };
}

export function customItemSummary(item: CustomItem): string {
  const parts: string[] = [];
  if (item.kind === "weapon") parts.push(item.damage || "weapon");
  else if (item.kind === "armor" || item.kind === "shield") parts.push(`AC ${armorEntryFor(item)?.ac}`);
  else parts.push("gear");
  if (item.attackBonus) parts.push(`${item.attackBonus > 0 ? "+" : ""}${item.attackBonus} attack`);
  if (item.damageBonus) parts.push(`${item.damageBonus > 0 ? "+" : ""}${item.damageBonus} damage`);
  if (item.acBonus) parts.push(`${item.acBonus > 0 ? "+" : ""}${item.acBonus} AC`);
  if (item.speedBonus) parts.push(`${item.speedBonus > 0 ? "+" : ""}${item.speedBonus} ft speed`);
  for (const [k, v] of Object.entries(item.abilityBonus ?? {})) {
    if (v) parts.push(`${v > 0 ? "+" : ""}${v} ${k.toUpperCase()}`);
  }
  return parts.join(" · ");
}
