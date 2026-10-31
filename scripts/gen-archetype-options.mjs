import { writeFileSync } from "node:fs";

// Archetype option lists that are picked like class choices: each Scholar pursuit's own discoveries
// (added to the Scholar's Discoveries choice while that pursuit is the archetype), the Enhancement
// Specialist's ammunition enhancements, and the Totem Specialist's totems.
// Usage: node scripts/gen-archetype-options.mjs src/data/archetypeOptionLists.ts
// Hand-added auto-apply fields (grantsProficiency, lightsaberFormChoiceCount, ...) live in EXTRAS below.
const res = await fetch("https://sw5eapi.azurewebsites.net/api/archetype");
const data = await res.json();

// Option name -> extra ClassSubChoiceOption fields that make its effect apply on the sheet.
// Speeds and natural armor (Icarian Mutation, Underground Adaptation, Athletic, Adapted Hide) are
// applied by name in archetypeEffects.ts.
const EXTRAS = {
  "Force Combat Knowledge": { grantsProficiency: "Simple lightweapons", lightsaberFormChoiceCount: 1 },
  "Fighting Style": { fightingStyleChoice: true },
  "Commander's Armor": { grantsProficiency: "Medium armor" },
  "Scrapper's Armor": { grantsProficiency: "Medium armor" },
  "Mutagenic Hardiness": { hpBonusPerLevel: 1 },
  "Observant Leader": { passiveBuffText: "Advantage on sight-based Perception checks" },
  "Dungeon Explorer": { passiveBuffText: "Resistant: trap damage; advantage finding secret doors and traps" },
  "Versatile Explorer": { passiveBuffText: "Hold breath twice as long; half fall damage" },
  "Atmospheric Adaptation": { passiveBuffText: "Breathe air and water" },
  "Predatory Senses": { passiveBuffText: "Darkvision 60 ft (or +30 ft if you already have it)" },
  "Enhanced Musculature": { carryingCapacityMultiplier: 2, passiveBuffText: "Carrying capacity doubled; long jump up to twice your Strength score" },
  "Arcane Membrane": { passiveBuffText: "Advantage on Lore and Nature checks" },
  "Savage Sortilege": { passiveBuffText: "Resistant: psychic; you ignore psychic resistance" },
  "Hexes and Superstitions": { passiveBuffText: "A 13 on an ability check counts as a 20" },
  "Ear for Deceit": { passiveBuffText: "Insight to spot lies: 7 or lower counts as 8" },
  "Unerring Eye": { passiveBuffText: "See true forms of shapechangers and illusions within 30 ft" },
  "Social Opportunist": { passiveBuffText: "Half proficiency bonus on Charisma checks without proficiency" },
  "Totem of the Acklay": { passiveBuffText: "Advantage on Nature and Intimidation checks (Acklay totem)" },
  "Totem of the Hawk": { passiveBuffText: "Advantage on Investigation; darkvision 60 ft or +30 ft (Hawk totem)" },
  "Totem of the Loth-wolf": { passiveBuffText: "Advantage on Sleight of Hand and Deception checks (Loth-wolf totem)" },
  "Totem of the Rancor": { passiveBuffText: "Resistant: poison; advantage on saves against poisoned (Rancor totem)" },
  "Totem of the Sarlacc": { passiveBuffText: "Expertise in one tool you're proficient with (Sarlacc totem)" },
  "Totem of the Vornskr": { passiveBuffText: "Advantage on Survival; can't be surprised (Vornskr totem)" },
};

const clean = (s) =>
  s
    .replace(/\r\n/g, "\n")
    .replace(/\*\*\*|\*\*|(?<!\w)_|_(?!\w)/g, "")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

// The "#### Name" blocks under a section heading, up to the next heading of the section's level or higher.
function optionsUnder(text, heading) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  // The last match: Enhancement Specialist names "Ammunition Enhancements" once in a feature before the list.
  const start = lines.findLastIndex((l) => new RegExp(`^#{2,4}\\s*${heading}\\s*$`).test(l));
  if (start < 0) throw new Error(`No "${heading}" section`);
  const depth = lines[start].match(/^#+/)[0].length;
  const out = [];
  let cur = null;
  for (const line of lines.slice(start + 1)) {
    const h = line.match(/^(#+)\s*(.+?)\s*$/);
    if (h && h[1].length <= depth && h[1].length < 4) break;
    if (h && h[1].length === 4) {
      cur = { name: h[2], lines: [] };
      out.push(cur);
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  return out.map(({ name, lines: body }) => {
    let prerequisite;
    const rest = [];
    for (const l of body) {
      const p = l.match(/^_\*\*Prerequisite:\*\*\s*(.+?)_\s*$/);
      if (p && prerequisite === undefined) prerequisite = clean(p[1]);
      else rest.push(l);
    }
    return { name, ...(prerequisite ? { prerequisite } : {}), text: clean(rest.join("\n")), ...EXTRAS[name] };
  });
}

const byName = new Map(data.map((a) => [a.name, a]));
const archetype = (name) => {
  const a = byName.get(name);
  if (!a) throw new Error(`No archetype ${name}`);
  return a;
};

const discoveries = {};
for (const a of data.filter((x) => x.className === "Scholar" && /Pursuit$/.test(x.name))) {
  const heading = `${a.name.replace(/ Pursuit$/, "")} Discoveries`;
  if (!new RegExp(`#+\\s*${heading}`).test(a.text)) continue;
  discoveries[a.name] = optionsUnder(a.text, heading);
}
const ammunition = optionsUnder(archetype("Enhancement Specialist").text, "Ammunition Enhancements");
const totems = optionsUnder(archetype("Totem Specialist").text, "Totem Options");

const json = (v) => JSON.stringify(v, null, 2).replace(/\n/g, "\n");
const out = `// Archetype option lists from sw5e.com, picked like class choices (see classFeatureChoices.ts).
// Generated from sw5eapi.azurewebsites.net/api/archetype by scripts/gen-archetype-options.mjs, not hand-typed;
// auto-apply fields are added in that script's EXTRAS.
import type { ClassSubChoiceOption } from "../types";

// Each Scholar pursuit's own discoveries, added to the Discoveries choice while it is the archetype.
export const PURSUIT_DISCOVERIES: Record<string, ClassSubChoiceOption[]> = ${json(discoveries)};

// Enhancement Specialist (Fighter): Special Ammunition.
export const AMMUNITION_ENHANCEMENTS: ClassSubChoiceOption[] = ${json(ammunition)};

// Totem Specialist (Fighter): Totem Creation.
export const TOTEMS: ClassSubChoiceOption[] = ${json(totems)};
`;
writeFileSync(process.argv[2], out, "utf8");
console.log(
  Object.entries(discoveries).map(([k, v]) => `${k}: ${v.length}`).join(", "),
  `| ammunition ${ammunition.length} | totems ${totems.length}`
);
