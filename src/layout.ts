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

export const DEFAULT_SECTION_ORDER: SectionId[] = [
  "abilities",
  "combat",
  "skills",
  "weapons",
  "powers",
  "classFeatures",
  "feats",
  "equipment",
  "backstory",
];

// Grid column span for each section in the 3-column sheet-blocks grid.
export const SECTION_SPAN: Record<SectionId, 1 | 3> = {
  abilities: 1,
  combat: 1,
  skills: 1,
  weapons: 1,
  powers: 1,
  classFeatures: 3,
  feats: 3,
  equipment: 3,
  backstory: 3,
};

const STORAGE_KEY = "sw5e-layout";

export function getStoredOrder(): SectionId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SECTION_ORDER;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_SECTION_ORDER;
    const known = new Set<string>(DEFAULT_SECTION_ORDER);
    const filtered = parsed.filter((id): id is SectionId => known.has(id));
    const missing = DEFAULT_SECTION_ORDER.filter((id) => !filtered.includes(id));
    return [...filtered, ...missing];
  } catch {
    return DEFAULT_SECTION_ORDER;
  }
}

export function saveOrder(order: SectionId[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}
