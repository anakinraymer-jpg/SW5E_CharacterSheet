import { writeFileSync } from "node:fs";

// Enhanced items (Wretched Hives + Echoes of the Force) for crafting blueprints.
// Usage: node scripts/gen-enhanced-items.mjs src/data/enhancedItems.ts
// Starship parts and the generic "Blueprint (rarity)" entries are left out.
const res = await fetch("https://sw5eapi.azurewebsites.net/api/enhancedItem");
const data = await res.json();

const SUBTYPE_FIELD = {
  Weapon: "enhancedWeaponType",
  Armor: "enhancedArmorType",
  Shield: "enhancedShieldType",
  Consumable: "consumableType",
  Focus: "focusType",
  AdventuringGear: "adventuringGearType",
  ItemModification: "itemModificationType",
  CyberneticAugmentation: "cyberneticAugmentationType",
  DroidCustomization: "droidCustomizationType",
};
const RARITY = (r) => r.trim().toLowerCase().replace(/^./, (c) => c.toUpperCase());

const rows = data
  .filter((e) => !e.type.startsWith("Ship") && !/^Blueprint \(/.test(e.name))
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((e) => {
    const entry = {
      name: e.name,
      type: e.type,
      group: e[SUBTYPE_FIELD[e.type]] ?? "",
      subtype: (e.subtype ?? "").trim().toLowerCase(),
      rarities: [...new Set((e.rarityOptions ?? []).map(RARITY))],
      attunement: Boolean(e.requiresAttunement),
      prerequisite: e.prerequisite ?? "",
      text: (e.text ?? "").replace(/\r\n/g, "\n").trim(),
      source: e.contentSource,
    };
    return `  ${JSON.stringify(entry)},`;
  });

const out = `// Enhanced items from sw5e.com (Wretched Hives and Echoes of the Force), used for crafting blueprints.
// Generated from sw5eapi.azurewebsites.net/api/enhancedItem by scripts/gen-enhanced-items.mjs, not hand-typed.
// Loaded on demand (dynamic import) because it is large.
export interface EnhancedItemEntry {
  name: string;
  type: string; // Weapon, Armor, Shield, Consumable, Focus, AdventuringGear, ItemModification, CyberneticAugmentation, DroidCustomization
  group: string; // the API's per-type subtype (e.g. "AnyBlaster", "Explosives", "Augment"); "None"/"Other" when it has none
  subtype: string; // lower-case item subtype (e.g. "blaster pistol", "wristpad", "back")
  rarities: string[];
  attunement: boolean;
  prerequisite: string;
  text: string;
  source: string;
}

export const ENHANCED_ITEMS: EnhancedItemEntry[] = [
${rows.join("\n")}
];
`;
writeFileSync(process.argv[2], out, "utf8");
console.log(rows.length, "enhanced items written");
