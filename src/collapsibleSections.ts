const STORAGE_KEY = "sw5e-collapsed-sections";

export function getStoredCollapsedSections(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // The Legend runs to thousands of pixels, so it starts folded until the player opens it.
    if (!raw) return { legend: true };
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCollapsedSections(state: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
