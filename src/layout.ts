export type SectionId =
  | "abilities"
  | "combat"
  | "skills"
  | "weapons"
  | "powers"
  | "classFeatures"
  | "feats"
  | "equipment"
  | "backstory";

// Narrow sections stack inside one of the 3 columns and can be dragged between columns.
// Wide sections always span the full width and only reorder among themselves.
export const NARROW_SECTIONS: SectionId[] = ["abilities", "combat", "skills", "weapons", "powers"];
export const WIDE_SECTIONS: SectionId[] = ["classFeatures", "feats", "equipment", "backstory"];

const ALL_SECTIONS = new Set<SectionId>([...NARROW_SECTIONS, ...WIDE_SECTIONS]);

export interface SheetLayout {
  columns: [SectionId[], SectionId[], SectionId[]];
  wide: SectionId[];
}

export const DEFAULT_LAYOUT: SheetLayout = {
  columns: [["abilities", "combat"], ["skills", "weapons"], ["powers"]],
  wide: ["classFeatures", "feats", "equipment", "backstory"],
};

function cloneLayout(layout: SheetLayout): SheetLayout {
  return {
    columns: [[...layout.columns[0]], [...layout.columns[1]], [...layout.columns[2]]],
    wide: [...layout.wide],
  };
}

// Validates persisted layout data: drops unknown ids, dedupes, and appends any section
// missing from the saved layout (e.g. a new section shipped after the user's save) using
// its default placement, so a stale save never silently hides content.
function sanitizeLayout(raw: unknown): SheetLayout {
  const seen = new Set<SectionId>();
  const columns: [SectionId[], SectionId[], SectionId[]] = [[], [], []];
  const wide: SectionId[] = [];

  if (raw && typeof raw === "object") {
    const obj = raw as { columns?: unknown; wide?: unknown };
    if (Array.isArray(obj.columns)) {
      obj.columns.slice(0, 3).forEach((col, i) => {
        if (!Array.isArray(col)) return;
        for (const id of col) {
          if (NARROW_SECTIONS.includes(id) && !seen.has(id)) {
            columns[i].push(id);
            seen.add(id);
          }
        }
      });
    }
    if (Array.isArray(obj.wide)) {
      for (const id of obj.wide) {
        if (WIDE_SECTIONS.includes(id) && !seen.has(id)) {
          wide.push(id);
          seen.add(id);
        }
      }
    }
  }

  for (const id of NARROW_SECTIONS) {
    if (!seen.has(id)) columns[0].push(id);
  }
  for (const id of WIDE_SECTIONS) {
    if (!seen.has(id)) wide.push(id);
  }
  return { columns, wide };
}

const STORAGE_KEY = "sw5e-layout";

export function getStoredLayout(): SheetLayout {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneLayout(DEFAULT_LAYOUT);
    return sanitizeLayout(JSON.parse(raw));
  } catch {
    return cloneLayout(DEFAULT_LAYOUT);
  }
}

export function saveLayout(layout: SheetLayout) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
}

export function isKnownSection(id: string): id is SectionId {
  return ALL_SECTIONS.has(id as SectionId);
}
