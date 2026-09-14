import type { LegendEntry } from "./data/legend";

// Splits a catalog property string (e.g. "Burst 4, Power cell (range 90/360), Reload 4") into its
// individual tokens, respecting commas inside parentheses (e.g. "Modal (Vibrosword, Vibroblade)"
// must stay one token).
export function splitPropertyTokens(property: string): string[] {
  const tokens: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of property) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      tokens.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) tokens.push(current.trim());
  return tokens;
}

// Strips a trailing number (e.g. "Burst 4" -> "Burst") and/or parenthetical (e.g. "Power cell
// (range 90/360)" -> "Power cell") to get the base property name a legend entry is keyed by.
export function propertyBaseName(token: string): string {
  return token
    .replace(/\s*\([^)]*\)\s*$/, "")
    .replace(/\s+\d+$/, "")
    .trim();
}

export function findPropertyDefinition(token: string, definitions: LegendEntry[]): LegendEntry | undefined {
  const base = propertyBaseName(token).toLowerCase();
  return definitions.find((d) => d.name.toLowerCase() === base);
}
