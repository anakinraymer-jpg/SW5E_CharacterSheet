import { useRef, useState } from "react";
import type { Character } from "../types";
import {
  BACKUP_REMIND_DAYS,
  backupReminderDue,
  exportAllCharacters,
  lastBackupAt,
  snoozeBackupReminder,
} from "../storage";

interface Props {
  characters: Character[];
  onOpen: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onImport: (file: File) => void;
}

function backupLabel(at: number | null): string {
  if (!at) return "Never backed up";
  const days = Math.floor((Date.now() - at) / (24 * 60 * 60 * 1000));
  return `Last backup: ${days === 0 ? "today" : days === 1 ? "yesterday" : `${days} days ago`}`;
}

export default function CharacterList({
  characters,
  onOpen,
  onCreate,
  onDelete,
  onImport,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Bumped after an export or snooze so the reminder and label re-read storage.
  const [, setBackupTick] = useState(0);
  const remind = backupReminderDue(characters.length);
  const last = lastBackupAt();

  function backUp() {
    exportAllCharacters();
    setBackupTick((n) => n + 1);
  }

  return (
    <div className="character-list-page">
      <header className="app-header">
        <h1>Star Wars 5e Character Sheets</h1>
        <p className="subtitle">A galaxy of adventurers, saved locally on this device.</p>
      </header>

      {remind && (
        <div className="backup-reminder" role="status">
          <p>
            <strong>{last ? `It's been over ${BACKUP_REMIND_DAYS} days since your last backup.` : "Your characters aren't backed up yet."}</strong>{" "}
            They're only stored in this browser, so clearing site data or switching phones would lose them. Save a
            backup file (Import restores it on any device).
          </p>
          <div className="backup-reminder-actions">
            <button className="btn btn-primary btn-small" onClick={backUp}>
              Back up now
            </button>
            <button
              className="btn btn-secondary btn-small"
              onClick={() => {
                snoozeBackupReminder();
                setBackupTick((n) => n + 1);
              }}
            >
              Remind me in a week
            </button>
          </div>
        </div>
      )}

      <div className="list-actions">
        <button className="btn btn-primary" onClick={onCreate}>
          + New Character
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          Import JSON
        </button>
        {characters.length > 0 && (
          <button className="btn btn-secondary" onClick={backUp}>
            Export All (Backup)
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImport(file);
            e.target.value = "";
          }}
        />
      </div>
      {characters.length > 0 && <p className="backup-status">{backupLabel(last)}</p>}

      {characters.length === 0 ? (
        <p className="empty-state">
          No characters yet. Create one to get started.
        </p>
      ) : (
        <ul className="character-grid">
          {characters.map((c) => (
            <li key={c.id} className="character-card" onClick={() => onOpen(c.id)}>
              <div className="character-card-name">{c.name || "Unnamed"}</div>
              <div className="character-card-meta">
                {c.species || "Unknown species"} &middot;{" "}
                {c.characterClass || "No class"} &middot; Level {c.level}
              </div>
              <button
                className="btn btn-danger btn-small"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete "${c.name}"? This cannot be undone.`)) {
                    onDelete(c.id);
                  }
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
