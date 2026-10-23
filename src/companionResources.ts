import type { AbilityKey, Companion } from "./types";
import { abilityModifier } from "./utils";
import { summarizeTraits } from "./companionTraits";

// Limited-use resources a companion's class gives it, hand-built from the "Companion Classes" part of the
// Expanded Content "Customization Options" chapter (sw5e.com). Each entry names the feature it comes
// from; counts and refreshes follow that feature's text.

export type CompanionRefresh = "Short Rest" | "Long Rest";

export interface CompanionResourceDef {
  key: string;
  label: string;
  source: string; // the class feature it comes from
  minLevel: number;
  refresh: CompanionRefresh;
  max: (level: number, scores: Record<AbilityKey, number>) => number;
  note?: (level: number) => string;
}

const ORDINAL = ["", "1st", "2nd", "3rd", "4th", "5th"];

// "Can cast powers at Nth-level <count> times", gained at `minLevel` and refreshed on `refresh`.
function casting(source: string, powerLevel: number, minLevel: number, count: number, refresh: CompanionRefresh): CompanionResourceDef {
  return {
    key: `cast${powerLevel}`,
    label: `${ORDINAL[powerLevel]}-level powers`,
    source,
    minLevel,
    refresh,
    max: () => count,
  };
}

const atLeast = (level: number, thresholds: number[], base: number) =>
  base + thresholds.filter((t) => level >= t).length;

export const COMPANION_RESOURCES: Record<string, CompanionResourceDef[]> = {
  Berserker: [
    { key: "rage", label: "Rage", source: "Rage", minLevel: 3, refresh: "Long Rest", max: (l) => (l >= 11 ? 3 : 2) },
  ],
  Consular: [
    casting("Forcecasting", 1, 3, 2, "Long Rest"),
    casting("Apprentice Forcecasting", 2, 7, 2, "Long Rest"),
    casting("Journeyman Forcecasting", 3, 11, 2, "Long Rest"),
    casting("Adept Forcecasting", 4, 15, 2, "Long Rest"),
    casting("Master Forcecasting", 5, 18, 1, "Long Rest"),
    { key: "forceShield", label: "Force Shield", source: "Force Shield", minLevel: 3, refresh: "Long Rest", max: () => 2 },
  ],
  Engineer: [
    casting("Techcasting", 1, 3, 1, "Short Rest"),
    casting("Techcasting, Mark II", 2, 7, 1, "Short Rest"),
    casting("Techcasting, Mark III", 3, 11, 1, "Short Rest"),
    casting("Techcasting, Mark IV", 4, 15, 1, "Short Rest"),
    casting("Techcasting, Mark V", 5, 18, 1, "Long Rest"),
    {
      key: "potentAptitude",
      label: "Potent Aptitude",
      source: "Potent Aptitude",
      minLevel: 3,
      refresh: "Short Rest",
      max: () => 1,
      note: (l) => (l >= 15 ? "d8" : l >= 7 ? "d6" : "d4"),
    },
  ],
  Fighter: [
    { key: "secondWind", label: "Second Wind", source: "Second Wind", minLevel: 3, refresh: "Short Rest", max: () => 1 },
    { key: "actionSurge", label: "Action Surge", source: "Action Surge", minLevel: 3, refresh: "Short Rest", max: () => 1 },
    {
      key: "superiorityDice",
      label: "Superiority dice",
      source: "Martial Superiority",
      minLevel: 7,
      refresh: "Short Rest",
      max: (l) => atLeast(l, [9, 17], 1),
      note: (l) => (l >= 17 ? "d8" : l >= 9 ? "d6" : "d4"),
    },
    { key: "indomitable", label: "Indomitable", source: "Indomitable", minLevel: 15, refresh: "Long Rest", max: () => 2 },
  ],
  Guardian: [
    casting("Forcecasting", 1, 3, 2, "Long Rest"),
    casting("Apprentice Forcecasting", 2, 7, 2, "Long Rest"),
    casting("Journeyman Forcecasting", 3, 18, 1, "Long Rest"),
    {
      key: "channelTheForce",
      label: "Channel the Force",
      source: "Channel the Force",
      minLevel: 3,
      refresh: "Short Rest",
      max: (_l, s) => Math.max(1, abilityModifier(s.wis), abilityModifier(s.cha)),
    },
  ],
  Monk: [
    {
      key: "focus",
      label: "Focus points",
      source: "Focus",
      minLevel: 7,
      refresh: "Short Rest",
      max: (l) => atLeast(l, [9, 13, 17], 3),
    },
  ],
  Operative: [
    { key: "badFeeling", label: "Bad Feeling", source: "Bad Feeling", minLevel: 7, refresh: "Long Rest", max: () => 1 },
  ],
  Scholar: [
    {
      key: "superiorityDice",
      label: "Superiority dice",
      source: "Academic Superiority",
      minLevel: 3,
      refresh: "Short Rest",
      max: (l) => atLeast(l, [5, 9, 13, 17], 2),
      note: (l) => (l >= 17 ? "d8" : l >= 9 ? "d6" : "d4"),
    },
    { key: "sageAdvice", label: "Sage Advice", source: "Sage Advice", minLevel: 15, refresh: "Short Rest", max: () => 1 },
    { key: "calmAndCollected", label: "Calm and Collected", source: "Calm and Collected", minLevel: 18, refresh: "Short Rest", max: () => 1 },
  ],
  Scout: [
    casting("Techcasting", 1, 3, 1, "Short Rest"),
    casting("Techcasting, Mark II", 2, 7, 1, "Short Rest"),
    casting("Techcasting, Mark III", 3, 18, 1, "Long Rest"),
  ],
  Sentinel: [
    casting("Forcecasting", 1, 3, 2, "Long Rest"),
    casting("Apprentice Forcecasting", 2, 7, 2, "Long Rest"),
    casting("Journeyman Forcecasting", 3, 15, 2, "Long Rest"),
    casting("Adept Forcecasting", 4, 18, 1, "Long Rest"),
  ],
};

export interface ActiveCompanionResource {
  def: CompanionResourceDef;
  max: number;
  remaining: number;
}

// The resources the companion's class has unlocked by `level`, with how many uses are left.
export function activeCompanionResources(
  companion: Companion,
  level: number,
  scores: Record<AbilityKey, number>
): ActiveCompanionResource[] {
  const defs = [
    ...(COMPANION_RESOURCES[companion.className] ?? []),
    ...summarizeTraits(companion, level, scores, 8, 0).resources,
  ];
  const used = companion.resourceUsed ?? {};
  return defs
    .filter((d) => level >= d.minLevel)
    .map((def) => {
      const max = def.max(level, scores);
      return { def, max, remaining: Math.max(0, Math.min(max, max - (used[def.key] ?? 0))) };
    });
}

// Puts uses back after a rest: a short rest restores Short Rest resources, a long rest all of them.
export function restoreCompanionResources(companion: Companion, kind: "short" | "long"): Record<string, number> {
  const defs = [
    ...(COMPANION_RESOURCES[companion.className] ?? []),
    ...summarizeTraits(companion, 1, companion.abilities, 8, 0).resources,
  ];
  const used = { ...(companion.resourceUsed ?? {}) };
  for (const d of defs) {
    if (kind === "long" || d.refresh === "Short Rest") delete used[d.key];
  }
  return used;
}
