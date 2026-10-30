import { readFileSync, writeFileSync } from "node:fs";

// Enhanced items (Wretched Hives + Expanded Content) for crafting blueprints, each assigned the artisan
// tool that crafts it. Also writes docs/CRAFTING_ITEMS.md, the same list grouped by tool.
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

// ---- Which artisan tool crafts each item (the Item Specific Tools table, Wretched Hives ch. 8) ----
// "*" means any artisan tool: the enhanced Tool items are crafted with the tool they improve.
const ARMORMECH = "Armormech's implements";
const ARMSTECH = "Armstech's implements";
const ARTIFICER = "Artificer's implements";
const ASTROTECH = "Astrotech's implements";
const BIOCHEMIST = "Biochemist's kit";
const BIOTECH = "Biotech's implements";
const BREWER = "Brewer's kit";
const CYBERTECH = "Cybertech's implements";
const DEMOLITIONS = "Demolitions kit";
const GADGETEER = "Gadgeteer's implements";
const JEWELER = "Jeweler's implements";
const MUNITIONS = "Munitions kit";
const POISONER = "Poisoner's kit";
const SECURITY = "Security kit";
const SLICER = "Slicer's kit";
const SPICER = "Spicer's kit";
const SYNTHWEAVER = "Synthweaver's implements";
const TINKER = "Tinker's implements";

const MOD_TOOL = {
  armor: ARMORMECH,
  blaster: ARMSTECH,
  vibroweapon: ARMSTECH,
  lightweapon: ARTIFICER,
  "focus generator": ARTIFICER,
  wristpad: CYBERTECH,
  clothing: SYNTHWEAVER,
  augment: TINKER,
};

// Adventuring gear and technology consumables, which the table doesn't name directly: matched by name to
// the tool whose uses fit best. First match wins.
const GEAR_TOOL = [
  [/^tool \(/, "*"],
  [/holocron|force storing/, ARTIFICER],
  [/datacron/, CYBERTECH],
  [/computer spike|credit chip/, SLICER],
  [/security spike|binders|camtono/, SECURITY],
  [/remote detonator/, DEMOLITIONS],
  [/restraining bolt|repair kit/, ASTROTECH],
  [/catalyzer/, BIOCHEMIST],
  [/cardio-regulator|respiration facilitator/, BIOTECH],
  [/mandalorian helmet|jensaarai headgear|shuk'orok|crushgaunts|gauntlets of|pauldron|vambraces|orbalisk/, ARMORMECH],
  [/jetpack|rocketpack|rocket boots|grappling hook|teleporter|goggles|decanting vessel|echo belt|stealth unit|mimicker|strength enhancer|strength belt|dominator belt/, GADGETEER],
  [/\bring\b|necklace|amulet|circlet/, JEWELER],
  [/./, SYNTHWEAVER], // what's left is worn cloth: clothes, robes, cloaks, chassis, boots, handwraps, packs
];

// Drinks among the substances (they age: Aged, Matured, Reserve, Special) go to the brewer; the rest are spice.
const DRINKS = /deuterium-pyro|mummergy|novanian grog|raava|spicebrew|tihaar|tsiraki|vayerbok/;

function toolsFor(e, group, subtype) {
  const n = e.name.toLowerCase();
  switch (e.type) {
    case "Armor":
    case "Shield":
      return [ARMORMECH];
    case "Weapon":
      if (group === "Any") return [ARMSTECH, ARTIFICER];
      if (group === "AnyLightweapon" || /saber|lightweapon/.test(subtype)) return [ARTIFICER];
      return [ARMSTECH]; // every other enhanced weapon is a blaster or vibroweapon
    case "ItemModification":
      return [MOD_TOOL[subtype]];
    case "Consumable":
      if (subtype === "ammunition") return [MUNITIONS];
      if (subtype === "explosive") return [DEMOLITIONS];
      if (subtype === "poison") return [POISONER];
      if (subtype === "barrier") return [GADGETEER];
      if (subtype === "substance") return [DRINKS.test(n) ? BREWER : SPICER];
      if (["adrenal", "stimpac", "medpac"].includes(subtype)) return [BIOCHEMIST];
      break;
    case "CyberneticAugmentation":
      return [BIOTECH];
    case "DroidCustomization":
      return [ASTROTECH];
    case "Focus":
      return [subtype === "tech" ? CYBERTECH : ARTIFICER];
  }
  const hit = GEAR_TOOL.find(([re]) => re.test(n));
  return [hit[1]];
}

const items = data
  .filter((e) => !e.type.startsWith("Ship") && !/^Blueprint \(/.test(e.name))
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((e) => {
    const group = e[SUBTYPE_FIELD[e.type]] ?? "";
    const subtype = (e.subtype ?? "").trim().toLowerCase();
    const tools = toolsFor(e, group, subtype);
    if (tools.some((t) => !t)) throw new Error(`No tool for ${e.name} (${e.type}/${subtype})`);
    return {
      name: e.name,
      type: e.type,
      group,
      subtype,
      tools,
      rarities: [...new Set((e.rarityOptions ?? []).map(RARITY))],
      attunement: Boolean(e.requiresAttunement),
      prerequisite: e.prerequisite ?? "",
      text: (e.text ?? "").replace(/\r\n/g, "\n").trim(),
      source: e.contentSource,
    };
  });

const out = `// Enhanced items from sw5e.com (Wretched Hives and Expanded Content), used for crafting blueprints.
// Generated from sw5eapi.azurewebsites.net/api/enhancedItem by scripts/gen-enhanced-items.mjs, not hand-typed;
// change tool assignments there. Loaded on demand (dynamic import) because it is large.
export interface EnhancedItemEntry {
  name: string;
  type: string; // Weapon, Armor, Shield, Consumable, Focus, AdventuringGear, ItemModification, CyberneticAugmentation, DroidCustomization
  group: string; // the API's per-type subtype (e.g. "AnyBlaster", "Explosives", "Augment"); "None"/"Other" when it has none
  subtype: string; // lower-case item subtype (e.g. "blaster pistol", "wristpad", "back")
  tools: string[]; // the artisan tool(s) that craft it; "*" means any (the tool the item improves)
  rarities: string[];
  attunement: boolean;
  prerequisite: string;
  text: string;
  source: string; // WH (Wretched Hives) or EC (Expanded Content)
}

export const ENHANCED_ITEMS: EnhancedItemEntry[] = [
${items.map((i) => `  ${JSON.stringify(i)},`).join("\n")}
];
`;
writeFileSync(process.argv[2], out, "utf8");
console.log(items.length, "enhanced items written");

// ---- docs/CRAFTING_ITEMS.md ----
const toolRows = [...readFileSync("src/crafting.ts", "utf8").matchAll(/\{ name: "([^"]+)", uses: "([^"]*)" \}/g)].map((m) => ({
  name: m[1],
  uses: m[2],
}));
const TYPE_LABEL = {
  Weapon: "Weapons",
  Armor: "Armor",
  Shield: "Shields",
  Consumable: "Consumables",
  Focus: "Focuses",
  AdventuringGear: "Adventuring gear",
  ItemModification: "Item modifications",
  CyberneticAugmentation: "Cybernetic augmentations",
  DroidCustomization: "Droid customizations",
};
const category = (i) => {
  const sub = i.subtype && !/^any/.test(i.subtype) ? i.subtype : "";
  return TYPE_LABEL[i.type] + (sub ? ` (${sub})` : "");
};
const summary = (text) => {
  const plain = text.replace(/_\*\*Requires attunement\*\*_\s*/i, "").replace(/[_*]/g, "").replace(/\s+/g, " ").trim();
  const first = plain.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? plain;
  return (first.length > 140 ? first.slice(0, 137).trimEnd() + "..." : first).replace(/\|/g, "/");
};
const cell = (s) => s.replace(/\|/g, "/");

const sections = [];
const anyTool = items.filter((i) => i.tools.includes("*"));
for (const t of toolRows) {
  const mine = items.filter((i) => i.tools.includes(t.name));
  const lines = [`## ${t.name}`, "", `**Uses (rules table):** ${t.uses || "none listed"}`, ""];
  if (mine.length === 0) {
    lines.push("No enhanced items. Crafts only normal items in its uses (and the enhanced Tool items, below).", "");
  } else {
    const cats = [...new Set(mine.map(category))].sort();
    lines.push(`**Enhanced items:** ${mine.length} (${cats.join(", ")})`, "");
    lines.push("| Item | Category | Rarity | Attune | Source | What it does |", "|---|---|---|---|---|---|");
    for (const i of [...mine].sort((a, b) => category(a).localeCompare(category(b)) || a.name.localeCompare(b.name))) {
      const shared = i.tools.length > 1 ? " (also " + i.tools.filter((x) => x !== t.name).join(", ") + ")" : "";
      lines.push(`| ${cell(i.name)}${shared} | ${category(i)} | ${i.rarities.join(", ")} | ${i.attunement ? "Yes" : ""} | ${i.source} | ${summary(i.text)} |`);
    }
    lines.push("");
  }
  sections.push(lines.join("\n"));
}
const counts = (src) => items.filter((i) => i.source === src).length;
const md = `# Enhanced items by crafting tool

Generated by \`scripts/gen-enhanced-items.mjs\` from the sw5e API. Do not edit by hand: change the tool
assignments in that script and re-run it.

Every enhanced item from Wretched Hives (WH, ${counts("WH")}) and Expanded Content (EC, ${counts("EC")}) is
assigned the artisan tool that crafts it, ${items.length} in all (starship items left out). The Item Specific
Tools table names the tool for most of them. For gear it doesn't name, the tool whose uses fit best was chosen:

- Holocrons and force-storing rings: Artificer's (holocrons). Datacrons: Cybertech's.
- Jetpacks, rocketpacks, rocket boots, grappling hook, teleporters, goggles, field and strength belts,
  barriers: Gadgeteer's (gadgets).
- Binders, camtonos, security spikes: Security kit (containers, locks).
- Computer spikes, credit chips: Slicer's kit (computers, software).
- Restraining bolts, droid repair kits: Astrotech's (droids). Remote detonators: Demolitions kit.
- Machinist's catalyzers: Biochemist's kit (adrenals). Cardio-regulator, respiration facilitator: Biotech's.
- Helmets, gauntlets, pauldrons, vambraces, Orbalisk armor: Armormech's.
- Rings, necklaces, amulets, circlets: Jeweler's. Other worn cloth (clothes, robes, cloaks, chassis,
  boots, handwraps, packs): Synthweaver's.
- Aging drinks among the substances (Tihaar, Spicebrew, Novanian Grog and so on): Brewer's kit. Spices: Spicer's kit.
- Weapons enhanced for "any weapon": Armstech's or Artificer's.

## Any artisan tool

The enhanced Tool items (${anyTool.map((i) => i.name).join(", ")}) are crafted with the tool they improve.

${sections.join("\n")}`;
writeFileSync("docs/CRAFTING_ITEMS.md", md, "utf8");
console.log("docs/CRAFTING_ITEMS.md written");
