import type { EquipmentItem, EquipmentPart, Weapon } from "./types";
import { WEAPON_CATALOG, type WeaponCatalogEntry } from "./data/weapons";
import { ARMOR_CATALOG, type ArmorCatalogEntry } from "./data/armor";
import { GEAR_CATALOG, type GearCatalogEntry } from "./data/gear";

function extractWeaponRange(property: string): string {
  const match = property.match(/\((?:range )?(\d+(?:\/\d+)?)\)/i);
  return match ? `${match[1]} ft` : "Melee";
}

type CatalogHit =
  | { kind: "weapon"; entry: WeaponCatalogEntry }
  | { kind: "armor"; entry: ArmorCatalogEntry }
  | { kind: "gear"; entry: GearCatalogEntry };

function findCatalogItem(name: string): CatalogHit | null {
  const key = name.toLowerCase();
  const weapon = WEAPON_CATALOG.find((w) => w.name.toLowerCase() === key);
  if (weapon) return { kind: "weapon", entry: weapon };
  const armor = ARMOR_CATALOG.find((a) => a.name.toLowerCase() === key);
  if (armor) return { kind: "armor", entry: armor };
  const gear = GEAR_CATALOG.find((g) => g.name.toLowerCase() === key);
  if (gear) return { kind: "gear", entry: gear };
  return null;
}

// Resolves one class/background equipmentText branch's EquipmentPart[] into real Weapon/EquipmentItem
// rows. `itemChoices` supplies the player's pick for each part with a choiceLabel, in order.
// `toolChoice` is the entry's own already-made tool-proficiency picks, used to resolve `proficientTool`
// parts (e.g. "a tool with which you are proficient") without a separate equipment-only selection.
export function resolveEquipmentParts(
  parts: EquipmentPart[],
  itemChoices: string[],
  toolChoice: string[][]
): { weapons: Weapon[]; equipment: EquipmentItem[] } {
  const weapons: Weapon[] = [];
  const equipment: EquipmentItem[] = [];
  let choiceIndex = 0;

  for (const part of parts) {
    const quantity = part.quantity ?? 1;

    if (part.freeText) {
      equipment.push({
        id: crypto.randomUUID(),
        name: part.freeText,
        quantity,
        weight: 0,
        notes: "",
        location: "Backpack",
        equipped: false,
      });
      continue;
    }

    let resolvedName: string | null;
    if (part.proficientTool) {
      const ci = part.proficientToolChoiceIndex ?? 0;
      const pi = part.proficientToolPickIndex ?? 0;
      resolvedName = toolChoice[ci]?.[pi] || null;
    } else if (part.choiceLabel) {
      resolvedName = itemChoices[choiceIndex] || null;
      choiceIndex++;
    } else {
      resolvedName = part.item ?? null;
    }
    if (!resolvedName) continue;

    const hit = findCatalogItem(resolvedName);
    if (!hit) {
      equipment.push({
        id: crypto.randomUUID(),
        name: resolvedName,
        quantity,
        weight: 0,
        notes: "",
        location: "Backpack",
        equipped: false,
      });
      continue;
    }

    if (hit.kind === "weapon") {
      for (let i = 0; i < quantity; i++) {
        weapons.push({
          id: crypto.randomUUID(),
          name: hit.entry.name,
          attackBonus: "",
          damage: hit.entry.damage,
          range: extractWeaponRange(hit.entry.property),
          weight: hit.entry.weight,
          ammo: "",
        });
      }
    } else if (hit.kind === "armor") {
      equipment.push({
        id: crypto.randomUUID(),
        name: hit.entry.name,
        quantity,
        weight: hit.entry.weight,
        notes: "",
        location: "Donned",
        equipped: true,
      });
    } else {
      equipment.push({
        id: crypto.randomUUID(),
        name: hit.entry.name,
        quantity,
        weight: hit.entry.weight,
        notes: "",
        location: "Backpack",
        equipped: false,
      });
    }
  }

  return { weapons, equipment };
}
