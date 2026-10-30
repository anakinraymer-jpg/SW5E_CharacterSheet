import type { Character, EquipmentItem, Weapon } from "./types";
import { WEAPON_LOOKUP } from "./weaponLogic";
import { armorCatalogMatch } from "./utils";

// Engineer's Infuse Item (2nd level): at the end of a long rest, one unenhanced suit of armor, shield,
// or simple/martial weapon becomes an enhanced item until the end of the next long rest: +1 to AC, or
// +1 to attack and damage rolls, rising to +2 at 10th level and +3 at 15th. The choice is stored as
// the infused Weapon's or EquipmentItem's id, so the bonus follows that one row and drops away by
// itself if the row is deleted or the character stops being a 2nd-level+ Engineer.

export const INFUSE_ITEM_TEXT =
  "At the end of a long rest, touch one unenhanced suit of armor, shield, or simple or martial weapon. Until the end of your next long rest, it grants +1 to AC (armor or shield) or +1 to attack and damage rolls (weapon). +2 at 10th level, +3 at 15th.";

export function infuseItemBonus(c: Character): number {
  if (c.classAppliedName !== "Engineer" || c.level < 2) return 0;
  return c.level >= 15 ? 3 : c.level >= 10 ? 2 : 1;
}

// Simple or martial weapons only (no exotic weapons, no unarmed strike). Names not in the catalog are
// homebrew or renamed weapons, so they're allowed rather than silently left out.
export function canInfuseWeapon(w: Weapon): boolean {
  const name = w.name.trim().toLowerCase();
  if (!name || name === "unarmed strike") return false;
  const entry = WEAPON_LOOKUP.get(name);
  return !entry || /^(simple|martial)/i.test(entry.type);
}

export function canInfuseArmor(item: EquipmentItem): boolean {
  return Boolean(armorCatalogMatch(item.name));
}

export function infusedWeaponBonus(c: Character, w: Weapon): number {
  return c.infusedItemId && c.infusedItemId === w.id && canInfuseWeapon(w) ? infuseItemBonus(c) : 0;
}

// The infused armor or shield, for Defense. Only counts while it is equipped (computeDefense checks).
export function armorInfusion(c: Character): { itemId: string; bonus: number } | null {
  const bonus = infuseItemBonus(c);
  if (!bonus || !c.infusedItemId) return null;
  const item = c.equipment.find((i) => i.id === c.infusedItemId);
  return item && canInfuseArmor(item) ? { itemId: item.id, bonus } : null;
}
