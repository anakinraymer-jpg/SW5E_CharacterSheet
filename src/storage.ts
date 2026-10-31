import type { Character } from "./types";
import { createBlankCharacter } from "./types";

const STORAGE_KEY = "sw5e-characters";

// Characters saved by an older version of the app lack any fields added since; fill those in
// from a blank character so newer code never sees `undefined`.
// Anything without a version stamp predates versioning, so it is treated as version 0; the safe
// tracking repairs in characterMigrations.ts run when the sheet opens (CharacterSheet), which keeps
// this module, and so the character list, free of the big data catalogs for a fast first load.
function withDefaults(saved: Partial<Character>): Character {
  const merged = { ...createBlankCharacter(), ...saved } as Character;
  if (saved.dataVersion === undefined) merged.dataVersion = 0;
  return merged;
}

export function loadAllCharacters(): Character[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(withDefaults) : [];
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
  const safeName = character.name.trim().replace(/[^a-z0-9]+/gi, "_") || "character";
  downloadJson(character, `${safeName}.sw5e.json`);
  // Exporting the only character is a full backup.
  if (loadAllCharacters().length <= 1) writeTime(LAST_BACKUP_KEY, Date.now());
}

// Reads a single-character export or a full backup (an array from exportAllCharacters).
export function importCharactersFromFile(file: File): Promise<Character[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as unknown;
        const list = (Array.isArray(data) ? data : [data]) as Partial<Character>[];
        if (list.length === 0 || list.some((x) => !x || typeof x !== "object")) throw new Error("not a character file");
        resolve(
          list.map((x) => {
            const parsed = withDefaults(x);
            if (!parsed.id) parsed.id = crypto.randomUUID();
            return parsed;
          })
        );
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

// Saves imported characters. A character already on this device with a newer save is kept, so
// restoring an old backup never overwrites more recent play. Returns how many were saved/skipped.
export function restoreCharacters(incoming: Character[]): { saved: number; skipped: string[] } {
  const all = loadAllCharacters();
  const skipped: string[] = [];
  let saved = 0;
  for (const c of incoming) {
    const idx = all.findIndex((x) => x.id === c.id);
    if (idx >= 0 && (all[idx].updatedAt ?? "") > (c.updatedAt ?? "")) {
      skipped.push(all[idx].name || "Unnamed");
      continue;
    }
    if (idx >= 0) all[idx] = c;
    else all.push(c);
    saved++;
  }
  saveAllCharacters(all);
  return { saved, skipped };
}

// --- Backups ---
// Characters live only in this browser, so the list nudges for a backup file now and then.

const LAST_BACKUP_KEY = "sw5e-last-backup";
const SNOOZE_KEY = "sw5e-backup-snooze";
const DAY = 24 * 60 * 60 * 1000;
export const BACKUP_REMIND_DAYS = 14;

function readTime(key: string): number | null {
  try {
    const v = Number(localStorage.getItem(key));
    return v > 0 ? v : null;
  } catch {
    return null;
  }
}

function writeTime(key: string, value: number): void {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // storage unavailable: the reminder just shows again next time
  }
}

export function lastBackupAt(): number | null {
  return readTime(LAST_BACKUP_KEY);
}

export function backupReminderDue(characterCount: number): boolean {
  if (characterCount === 0) return false;
  const now = Date.now();
  const snooze = readTime(SNOOZE_KEY);
  if (snooze && snooze > now) return false;
  const last = lastBackupAt();
  return !last || now - last > BACKUP_REMIND_DAYS * DAY;
}

export function snoozeBackupReminder(days = 7): void {
  writeTime(SNOOZE_KEY, Date.now() + days * DAY);
}

function downloadJson(data: unknown, fileName: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// One file with every character on this device; Import on the list restores it.
export function exportAllCharacters(): void {
  const all = loadAllCharacters();
  const date = new Date().toISOString().slice(0, 10);
  downloadJson(all, `sw5e-characters-backup-${date}.json`);
  writeTime(LAST_BACKUP_KEY, Date.now());
}
