import { writeFileSync } from "node:fs";

const res = await fetch("https://sw5eapi.azurewebsites.net/api/background");
const data = await res.json();
const norm = (s) => s.trim().replace(/^./, (c) => c.toUpperCase());
const rows = data
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((b) => `  ${JSON.stringify(b.name)}: [${b.featOptions.map((f) => JSON.stringify(norm(f.name))).join(", ")}],`);
const out = `// Suggested starting feats for each background (the "Feat" table in each sw5e.com background).
// Sourced from sw5eapi.azurewebsites.net/api/background (PHB + EC backgrounds), generated, not hand-typed.
export const BACKGROUND_FEAT_OPTIONS: Record<string, string[]> = {
${rows.join("\n")}
};
`;
writeFileSync(process.argv[2], out, "utf8");
console.log(data.length, "backgrounds written");
