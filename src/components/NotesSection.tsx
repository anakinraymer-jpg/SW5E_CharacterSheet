import type { Character } from "../types";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

export default function NotesSection({ character, update }: Props) {
  return (
    <section className="sheet-section notes-section">
      <h2>Features, Backstory &amp; Notes</h2>

      <div className="field">
        <label htmlFor="feats">Feats &amp; Class Features</label>
        <textarea
          id="feats"
          rows={5}
          value={character.featsAndFeatures}
          onChange={(e) => update("featsAndFeatures", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="backstory">Backstory</label>
        <textarea
          id="backstory"
          rows={5}
          value={character.backstory}
          onChange={(e) => update("backstory", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          rows={5}
          value={character.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>
    </section>
  );
}
