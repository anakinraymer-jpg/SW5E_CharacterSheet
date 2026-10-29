import { readFileSync, writeFileSync } from "node:fs";

// Builds src/data/companions.ts from the Customization Options chapter (Expanded Content) of
// sw5eapi.azurewebsites.net/api/ExpandedContent. Usage: node gen-companions.mjs <custom.md> <out.ts>
const [mdPath, outPath] = process.argv.slice(2);
const lines = readFileSync(mdPath, "utf8").split(/\r?\n/);

const clean = (s) =>
  s
    .replace(/^\s*[-*]\s+/, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/(^|[\s(])_([^_]+)_/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim();

// Split into H2 blocks, each into H3 groups, each into H4 subsections.
function blocks(headingRe) {
  const out = [];
  let inBlock = false;
  let group = null;
  let sub = null;
  for (const raw of lines) {
    const h2 = raw.match(/^## (.+?)\s*$/);
    if (h2) {
      inBlock = headingRe.test(h2[1]);
      group = null;
      sub = null;
      if (inBlock) out.push({ title: h2[1], intro: [], groups: [] });
      continue;
    }
    if (!inBlock) continue;
    const cur = out[out.length - 1];
    const h3 = raw.match(/^### (.+?)\s*$/);
    const h4 = raw.match(/^#### (.+?)\s*$/);
    if (h3) {
      group = { title: h3[1], intro: [], subs: [] };
      cur.groups.push(group);
      sub = null;
    } else if (h4) {
      sub = { title: h4[1], lines: [] };
      (group ? group.subs : (cur.loose ||= [])).push(sub);
    } else if (/^_{3,}\s*$/.test(raw) || !raw.trim()) {
      // divider / blank
    } else if (sub) sub.lines.push(clean(raw));
    else if (group) group.intro.push(clean(raw));
    else cur.intro.push(clean(raw));
  }
  return out;
}

const NATURES = [
  ["Beast", "Beast Companion"],
  ["Droid", "Droid Companion"],
  ["Humanoid", "Humanoid Companion"],
  ["Tracker Droid", "Tracker Droid Companion"],
  ["Turret", "Turret Companion"],
];

// Prerequisites live in the "Companion Natures" overview.
const overview = blocks(/^Companion Natures$/)[0];
const overviewSubs = overview.groups.flatMap((g) => g.subs).concat(overview.loose ?? []);

const natureBlocks = blocks(/ Companion\s*$/);
const result = NATURES.map(([nature, title]) => {
  const b = natureBlocks.find((x) => x.title.trim() === title);
  if (!b) throw new Error("missing " + title);
  const pre = overviewSubs.find((s) => s.title.trim() === title);
  const prerequisite = (pre?.lines.find((l) => /^Prerequisite:/.test(l)) ?? "").replace(/^Prerequisite:\s*/, "");
  const traitsGroup = b.groups.find((g) => /Traits$/.test(g.title));
  const commonGroup = b.groups.find((g) => /Features$/.test(g.title));
  const variantGroups = b.groups.filter((g) => g !== traitsGroup && g !== commonGroup);
  const hitDieOf = (subs) => {
    const hp = subs.find((s) => s.title === "Hit Points");
    const m = hp?.lines.join(" ").match(/Hit Dice:\s*1d(\d+)/);
    return m ? Number(m[1]) : 0;
  };
  const featureLines = (subs) =>
    subs.filter((s) => s.title !== "Hit Points").flatMap((s) => s.lines);
  const commonHitDie = hitDieOf(commonGroup.subs);
  const variants =
    variantGroups.length > 0
      ? variantGroups.map((v) => ({
          name: v.title.replace(/s$/, ""),
          summary: v.intro[0] ?? "",
          hitDie: hitDieOf(v.subs),
          lines: featureLines(v.subs),
        }))
      : [{ name: nature, summary: "", hitDie: commonHitDie, lines: [] }];
  if (variants.some((v) => !v.hitDie && !commonHitDie)) throw new Error("no hit die for " + nature);
  return {
    nature,
    prerequisite,
    summary: b.intro.join(" "),
    commonLines: featureLines(commonGroup.subs),
    variantLabel: variantGroups.length ? (nature === "Droid" ? "Droid class" : "Size") : "",
    variants: variants.map((v) => ({ ...v, hitDie: v.hitDie || commonHitDie })),
    traits: traitsGroup.subs.map((t) => ({ name: t.title, text: t.lines.join("\n") })),
  };
});

const out = `// Companion natures, hit dice, features and traits for the Companions rules in the Expanded Content
// "Customization Options" chapter (sw5e.com). Generated from sw5eapi.azurewebsites.net/api/ExpandedContent,
// not hand-typed. Aberrant, Spirit and Thrall natures are still marked work-in-progress on sw5e.com, so
// they are not included.
import type { CompanionNatureDef } from "../types";

export const COMPANION_NATURES: CompanionNatureDef[] = ${JSON.stringify(result, null, 2)};
`;
writeFileSync(outPath, out, "utf8");
console.log(result.map((n) => `${n.nature}: ${n.variants.length} variant(s), ${n.traits.length} traits, pre="${n.prerequisite}"`).join("\n"));
