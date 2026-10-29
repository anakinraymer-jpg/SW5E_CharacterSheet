import { readFileSync, writeFileSync } from "node:fs";

// Builds src/data/companionClasses.ts from the "Companion Classes" part of the Customization Options
// chapter (Expanded Content). Usage: node gen-companion-classes.mjs <custom.md> <out.ts>
const [mdPath, outPath] = process.argv.slice(2);
const lines = readFileSync(mdPath, "utf8").split(/\r?\n/);

const start = lines.findIndex((l) => /^## Companion Classes/.test(l));
if (start < 0) throw new Error("Companion Classes section not found");
const CLASSES = ["Berserker", "Consular", "Engineer", "Fighter", "Guardian", "Monk", "Operative", "Scholar", "Scout", "Sentinel"];

const tidy = (s) =>
  s
    .replace(/^\s*[-*]\s+/, "• ")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/(^|[\s(])_([^_]+)_/g, "$1$2")
    .replace(/[ \t]+/g, " ")
    .trim();

const classes = [];
let cls = null;
let feature = null;
let section = null; // "intro" | "prof" | "feature"
for (let i = start + 1; i < lines.length; i++) {
  const raw = lines[i];
  const h2 = raw.match(/^## (.+?)\s*$/);
  if (h2) {
    const name = h2[1].trim();
    if (!CLASSES.includes(name)) break; // end of the companion classes
    cls = { name, prerequisite: "", proficiencies: [], features: [] };
    classes.push(cls);
    section = "intro";
    feature = null;
    continue;
  }
  if (!cls) continue;
  const h3 = raw.match(/^### (.+?)\s*$/);
  const h4 = raw.match(/^#### (.+?)\s*$/);
  if (h3) {
    feature = { name: h3[1].trim(), text: [] };
    cls.features.push(feature);
    section = "feature";
    continue;
  }
  if (h4) {
    if (/^Proficiencies$/i.test(h4[1].trim()) && section !== "feature") {
      section = "prof";
    } else if (feature) {
      feature.text.push(`${h4[1].trim()}:`);
    }
    continue;
  }
  if (/^_{3,}\s*$/.test(raw) || !raw.trim()) continue;
  if (section === "intro") {
    if (/^In order to become/.test(raw)) cls.prerequisite = tidy(raw);
  } else if (section === "prof") {
    cls.proficiencies.push(tidy(raw));
  } else if (feature) {
    feature.text.push(tidy(raw));
  }
}

const levelOf = (f) => {
  const m = f.text.join(" ").match(/\b(\d+)(?:st|nd|rd|th) level/i);
  return m ? Number(m[1]) : 3;
};

const out = classes.map((c) => ({
  name: c.name,
  prerequisite: c.prerequisite,
  proficiencies: c.proficiencies,
  features: c.features.map((f) => ({ name: f.name, level: levelOf(f), text: f.text.join("\n") })),
}));

writeFileSync(
  outPath,
  `// Companion class features (a companion picks a class at 3rd level), from the "Companion Classes" part of the
// Expanded Content "Customization Options" chapter on sw5e.com. Generated from
// sw5eapi.azurewebsites.net/api/ExpandedContent, not hand-typed. A feature's level is the first
// "Nth level" in its text (3rd when it names none).
import type { CompanionClassDef } from "../types";

export const COMPANION_CLASSES: CompanionClassDef[] = ${JSON.stringify(out, null, 2)};
`,
  "utf8"
);
for (const c of out) {
  console.log(`${c.name} | ${c.prerequisite.slice(0, 70)} | prof ${c.proficiencies.length} | ${c.features.map((f) => `${f.name}@${f.level}`).join(", ")}`);
}
