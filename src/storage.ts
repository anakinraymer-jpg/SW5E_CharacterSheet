import type { Character } from "./types";

const STORAGE_KEY = "sw5e-characters";

export function loadAllCharacters(): Character[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAllCharacters(characters: Character[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

export function saveCharacter(character: Character): void {
  const all = loadAllCharacters();
  const idx = all.findIndex((c) => c.id === character.id);
  const updated = { ...character, updatedAt: new Date().toISOString() };
  if (idx >= 0) {
    all[idx] = updated;
  } else {
    all.push(updated);
  }
  saveAllCharacters(all);
}

export function deleteCharacter(id: string): void {
  const all = loadAllCharacters().filter((c) => c.id !== id);
  saveAllCharacters(all);
}

export function exportCharacter(character: Character): void {
  const blob = new Blob([JSON.stringify(character, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeName = character.name.trim().replace(/[^a-z0-9]+/gi, "_") || "character";
  a.download = `${safeName}.sw5e.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importCharacterFromFile(file: File): Promise<Character> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as Character;
        if (!parsed.id) {
          parsed.id = crypto.randomUUID();
        }
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
