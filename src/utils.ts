import type { EquipmentItem } from "./types";
import { ARMOR_CATALOG, type ArmorCatalogEntry } from "./data/armor";

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function proficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

const SIZE_MULTIPLIERS: Record<string, number> = {
  tiny: 0.5,
  small: 1,
  medium: 1,
  large: 2,
  huge: 4,
  gargantuan: 8,
};

export function sizeMultiplier(size: string): number {
  return SIZE_MULTIPLIERS[size.trim().toLowerCase()] ?? 1;
}

export interface CarryingCapacity {
  encumbered: number;
  heavilyEncumbered: number;
  maxCarrying: number;
  pushDragLift: number;
}

export function carryingCapacity(strength: number, size: string): CarryingCapacity {
  const mult = sizeMultiplier(size);
  return {
    encumbered: Math.floor(strength * 5 * mult),
    heavilyEncumbered: Math.floor(strength * 10 * mult),
    maxCarrying: Math.floor(strength * 15 * mult),
    pushDragLift: Math.floor(strength * 30 * mult),
  };
}

export function passivePerception(perceptionBonus: number): number {
  return 10 + perceptionBonus;
}

export function armorClassFromFormula(ac: string, dexModifier: number): number {
  const trimmed = ac.trim();
  const shieldMatch = trimmed.match(/^\+(\d+)$/);
  if (shieldMatch) return Number(shieldMatch[1]);
  const cappedMatch = trimmed.match(/^(\d+)\s*\+\s*Dex modifier\s*\(max\s*(\d+)\)$/i);
  if (cappedMatch) return Number(cappedMatch[1]) + Math.min(dexModifier, Number(cappedMatch[2]));
  const uncappedMatch = trimmed.match(/^(\d+)\s*\+\s*Dex modifier$/i);
  if (uncappedMatch) return Number(uncappedMatch[1]) + dexModifier;
  const fixedMatch = trimmed.match(/^\d+$/);
  if (fixedMatch) return Number(trimmed);
  return 10 + dexModifier;
}

export function armorCatalogMatch(itemName: string): ArmorCatalogEntry | undefined {
  const name = itemName.trim().toLowerCase();
  return ARMOR_CATALOG.find((a) => a.name.toLowerCase() === name);
}

export interface EquippedDefense {
  total: number;
  armor: ArmorCatalogEntry | null;
  shields: ArmorCatalogEntry[];
}

export function computeDefense(equipment: EquipmentItem[], dexModifier: number): EquippedDefense | null {
  const equippedMatches = equipment
    .filter((item) => item.equipped)
    .map((item) => armorCatalogMatch(item.name))
    .filter((a): a is ArmorCatalogEntry => Boolean(a));
  const shields = equippedMatches.filter((a) => a.type === "Shield");
  const armor = equippedMatches.find((a) => a.type !== "Shield") ?? null;
  if (!armor && shields.length === 0) return null;

  const base = armor ? armorClassFromFormula(armor.ac, dexModifier) : 10 + dexModifier;
  const shieldBonus = shields.reduce((sum, s) => sum + armorClassFromFormula(s.ac, dexModifier), 0);
  return { total: base + shieldBonus, armor, shields };
}
