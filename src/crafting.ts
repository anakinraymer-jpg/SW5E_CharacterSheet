import type { Character, CraftingProject, CraftingState } from "./types";
import type { EnhancedItemEntry } from "./data/enhancedItems";
import { WEAPON_CATALOG } from "./data/weapons";
import { ARMOR_CATALOG } from "./data/armor";
import { GEAR_CATALOG } from "./data/gear";
import { grantedProficiencies } from "./grantsSummary";
import { abilityModifier, proficiencyBonus } from "./utils";

// Crafting, from Wretched Hives (sw5e.com): Chapter 2's Crafting downtime activity, Chapter 8's Item
// Specific Tools table, Chapter 7's Enhanced Item Value by Rarity, and the Introduction's "Crafting and
// Blueprints" option. Any character proficient with an artisan tool can craft, whatever their class.

// The Item Specific Tools table. Tools whose row lists nothing (archaeologist kit, gaming set, musical
// instrument, scavenging kit) aren't crafting tools. Audiotech's implements has a row with no uses given.
export const CRAFTING_TOOLS: { name: string; uses: string }[] = [
  { name: "Armormech's implements", uses: "Armor, shields" },
  { name: "Armstech's implements", uses: "Blasters, vibroweapons" },
  { name: "Artificer's implements", uses: "Focus generators, holocrons, lightweapons" },
  { name: "Artillerist's kit", uses: "Turrets" },
  { name: "Artist's implements", uses: "Artwork, sculptures" },
  { name: "Astrotech's implements", uses: "Droid customizations, droids" },
  { name: "Audiotech's implements", uses: "" },
  { name: "Bioanalysis kit", uses: "Antitoxins" },
  { name: "Biochemist's kit", uses: "Adrenals, medpacs, stimpacs" },
  { name: "Biotech's implements", uses: "Cybernetic augmentations" },
  { name: "Brewer's kit", uses: "Alcohol" },
  { name: "Chef's kit", uses: "Food" },
  { name: "Constructor's implements", uses: "Buildings and structures" },
  { name: "Cybertech's implements", uses: "Datacrons, wristpads" },
  { name: "Demolitions kit", uses: "Explosives" },
  { name: "Disguise kit", uses: "Disguises" },
  { name: "Forgery kit", uses: "Falsified documents" },
  { name: "Gadgeteer's implements", uses: "Barriers, gadgets, jetpacks" },
  { name: "Geneticist's implements", uses: "Genetic mutations" },
  { name: "Jeweler's implements", uses: "Jewelry" },
  { name: "Mechanic's kit", uses: "Starships, vehicles" },
  { name: "Munitions kit", uses: "Ammunition" },
  { name: "Poisoner's kit", uses: "Poisons" },
  { name: "Security kit", uses: "Containers, locks" },
  { name: "Slicer's kit", uses: "Computers, software" },
  { name: "Spicer's kit", uses: "Substances" },
  { name: "Surveyor's implements", uses: "Maps" },
  { name: "Synthweaver's implements", uses: "Clothing, footwear" },
  { name: "Tinker's implements", uses: "Augments, trinkets" },
];

// Archetype features that make crafting with one tool twice as fast.
const DOUBLE_SPEED: { archetype: string; tool: string }[] = [
  { archetype: "Gadgeteer Engineering", tool: "Gadgeteer's implements" },
  { archetype: "Unstable Engineering", tool: "Tinker's implements" },
];

export const RARITIES = ["Standard", "Premium", "Prototype", "Advanced", "Legendary", "Artifact"] as const;
export type Rarity = (typeof RARITIES)[number];

// Enhanced Item Ingredients: suggested creature CR guarding the rare material, and the d100 modifier.
export const RARITY_INGREDIENTS: Record<Rarity, { cr: string; d100: number }> = {
  Standard: { cr: "1-3", d100: 10 },
  Premium: { cr: "4-7", d100: 0 },
  Prototype: { cr: "8-11", d100: -10 },
  Advanced: { cr: "12-14", d100: -20 },
  Legendary: { cr: "15-18", d100: -30 },
  Artifact: { cr: "19+", d100: -40 },
};
// Enhanced Item Value by Rarity (halved for consumables and item modifications).
export const RARITY_VALUE: Record<Rarity, string> = {
  Standard: "up to 1,000 cr",
  Premium: "1,001 to 5,000 cr",
  Prototype: "5,000 to 25,000 cr",
  Advanced: "25,000 to 100,000 cr",
  Legendary: "100,000 to 500,000 cr",
  Artifact: "at least 500,000 cr",
};
export const BLUEPRINT_DC: Record<Rarity, number> = {
  Standard: 10, Premium: 14, Prototype: 18, Advanced: 22, Legendary: 26, Artifact: 30,
};
export const REVERSE_ENGINEER_DC: Record<Rarity, number> = {
  Standard: 15, Premium: 19, Prototype: 23, Advanced: 27, Legendary: 31, Artifact: 35,
};
// The level a character can start knowing blueprints of each rarity.
export const RARITY_LEVEL: Record<Rarity, number> = {
  Standard: 1, Premium: 5, Prototype: 9, Advanced: 13, Legendary: 17, Artifact: 20,
};

export const CRAFT_RATE = 250; // credits of item value per day

// Crafting Roll Modifier: the highest DC the Intelligence check met.
export function checkModifier(total: number): number {
  if (total >= 30) return 25;
  if (total >= 25) return 20;
  if (total >= 20) return 15;
  if (total >= 15) return 10;
  if (total >= 10) return 5;
  return 0;
}

// Crafting Results: how much of the raw materials the final d100 total uses.
export function craftingResult(total: number): { multiplier: number; text: string } {
  if (total <= 40) return { multiplier: 2, text: "Inefficient: twice the raw materials." };
  if (total <= 70) return { multiplier: 1.5, text: "Inefficient: one and a half times the raw materials." };
  if (total <= 100) return { multiplier: 1, text: "Crafted with no significant issue." };
  if (total <= 110) return { multiplier: 0.5, text: "Efficient: only half the raw materials (and less rare material)." };
  return { multiplier: 0.25, text: "Expert: only a quarter of the raw materials (and less rare material)." };
}

export function emptyCrafting(): CraftingState {
  return { tools: {}, addedTools: [], projects: [] };
}

export function craftingState(c: Character): CraftingState {
  const s = c.crafting ?? emptyCrafting();
  return { tools: s.tools ?? {}, addedTools: s.addedTools ?? [], projects: s.projects ?? [] };
}

const norm = (s: string) => s.toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, " ");

// Crafting tools the character is proficient with: from what their species, class, background and feats
// granted, the free-text Proficiencies field, and any the player added in the Crafting section.
export function detectedTools(c: Character): string[] {
  const text = norm([...grantedProficiencies(c), c.proficiencies ?? ""].join(" | "));
  return CRAFTING_TOOLS.filter((t) => text.includes(norm(t.name))).map((t) => t.name);
}

export function craftingTools(c: Character): string[] {
  const detected = detectedTools(c);
  const added = craftingState(c).addedTools.filter((t) => !detected.includes(t));
  return [...detected, ...added];
}

export function toolUses(tool: string): string {
  return CRAFTING_TOOLS.find((t) => t.name === tool)?.uses ?? "";
}

export function hasExpertise(c: Character, tool: string): boolean {
  return Boolean(craftingState(c).tools[tool]?.expertise);
}

export function toolCheckBonus(c: Character, tool: string): number {
  const pb = proficiencyBonus(c.level);
  return abilityModifier(c.abilities.int) + pb + (hasExpertise(c, tool) ? pb : 0);
}

// Proficiency: half your level (rounded up). Expertise: your level.
export function blueprintLimit(c: Character, tool: string): number {
  const level = Math.max(1, c.level || 1);
  return hasExpertise(c, tool) ? level : Math.ceil(level / 2);
}

export function maxRarity(level: number): Rarity {
  return [...RARITIES].reverse().find((r) => level >= RARITY_LEVEL[r]) ?? "Standard";
}

export function speedMultiplier(c: Character, tool: string): number {
  return DOUBLE_SPEED.some((d) => d.tool === tool && c.archetypeAppliedName === d.archetype && c.level >= 3) ? 2 : 1;
}

// ---- Which tool crafts an enhanced item ----

const ARMORMECH = "Armormech's implements";
const ARMSTECH = "Armstech's implements";
const ARTIFICER = "Artificer's implements";
const SYNTHWEAVER = "Synthweaver's implements";

// The tool(s) that craft an enhanced item. Assigned in scripts/gen-enhanced-items.mjs (see
// docs/CRAFTING_ITEMS.md for the full list); "*" (the enhanced Tool items) means any artisan tool.
export function enhancedItemTools(e: EnhancedItemEntry): string[] {
  const tools = e.tools ?? [];
  return tools.includes("*") ? CRAFTING_TOOLS.map((t) => t.name) : tools;
}

// Lowest rarity an item comes in (some come in several).
export function itemRarity(e: EnhancedItemEntry): Rarity {
  const known = e.rarities.filter((r): r is Rarity => (RARITIES as readonly string[]).includes(r));
  return known.sort((a, b) => RARITIES.indexOf(a) - RARITIES.indexOf(b))[0] ?? "Standard";
}

// Consumables and item modifications are worth half the rarity's value.
export function halfValueItem(e: EnhancedItemEntry): boolean {
  return e.type === "Consumable" || e.type === "ItemModification";
}

// ---- Normal (unenhanced) items a tool can make, from the sheet's own catalogs ----

export interface CatalogCraft {
  name: string;
  value: number;
  weight: number;
  kind: "weapon" | "armor" | "gear";
}

export function normalItems(tool: string): CatalogCraft[] {
  const weapons = (re: RegExp) =>
    WEAPON_CATALOG.filter((w) => re.test(w.type)).map((w) => ({ name: w.name, value: w.cost, weight: w.weight, kind: "weapon" as const }));
  const gear = (test: (g: (typeof GEAR_CATALOG)[number]) => boolean) =>
    GEAR_CATALOG.filter(test).map((g) => ({ name: g.name, value: g.cost, weight: g.weight, kind: "gear" as const }));
  switch (tool) {
    case ARMORMECH:
      return ARMOR_CATALOG.map((a) => ({ name: a.name, value: a.cost, weight: a.weight, kind: "armor" as const }));
    case ARMSTECH:
      return weapons(/Blaster|Vibroweapon/);
    case ARTIFICER:
      return weapons(/Lightweapon/);
    case "Munitions kit":
      return gear((g) => g.category === "Ammunition");
    case "Demolitions kit":
      return gear((g) => g.category === "Explosive");
    case "Biochemist's kit":
      return gear((g) => g.category === "Medical" && /adrenal|medpac|stim/i.test(g.name));
    case "Bioanalysis kit":
      return gear((g) => g.category === "Medical" && /antitox/i.test(g.name));
    case "Poisoner's kit":
      return gear((g) => g.category === "Medical" && /poison/i.test(g.name));
    case "Brewer's kit":
      return gear((g) => g.category === "Alcoholic Beverage");
    case "Spicer's kit":
      return gear((g) => g.category === "Spice");
    case SYNTHWEAVER:
      return gear((g) => g.category === "Clothing");
  }
  return [];
}

// ---- Projects ----

export function projectDays(c: Character, p: CraftingProject): number {
  const days = p.value / CRAFT_RATE / Math.max(1, p.workers) / speedMultiplier(c, p.tool);
  return Math.round(days * 10) / 10;
}

export function rawMaterials(p: CraftingProject): number {
  return Math.ceil(p.value / 2);
}

export function rarityModifier(p: CraftingProject): number {
  return p.enhanced ? (RARITY_INGREDIENTS[p.rarity as Rarity]?.d100 ?? 0) : 0;
}

// The final d100 total and what it means, once both rolls are entered.
export function projectOutcome(p: CraftingProject) {
  if (p.checkTotal === null || p.d100 === null) return null;
  const total = p.d100 + checkModifier(p.checkTotal) + rarityModifier(p);
  const result = craftingResult(total);
  return { total, ...result, cost: Math.ceil(rawMaterials(p) * result.multiplier) };
}

export function newProject(patch: Partial<CraftingProject>): CraftingProject {
  return {
    id: crypto.randomUUID(),
    name: "",
    tool: "",
    kind: "custom",
    enhanced: false,
    rarity: "",
    value: 0,
    weight: 0,
    workers: 1,
    daysWorked: 0,
    rareMaterial: false,
    checkTotal: null,
    d100: null,
    ...patch,
  };
}
