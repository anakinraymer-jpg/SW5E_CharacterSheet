import { useRef } from "react";
import type { Character } from "../types";

interface Props {
  characters: Character[];
  onOpen: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onImport: (file: File) => void;
}

export default function CharacterList({
  characters,
  onOpen,
  onCreate,
  onDelete,
  onImport,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="character-list-page">
      <header className="app-header">
        <h1>Star Wars 5e Character Sheets</h1>
        <p className="subtitle">A galaxy of adventurers, saved locally on this device.</p>
      </header>

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
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImport(file);
            e.target.value = "";
          }}
        />
      </div>

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
