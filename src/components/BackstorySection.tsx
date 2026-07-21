import type { Character } from "../types";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

export default function BackstorySection({ character, update }: Props) {
  return (
    <>
      <section className="sheet-section backstory-section">
        <h2>Character Data</h2>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="proficiencies">Proficiencies</label>
            <textarea
              id="proficiencies"
              rows={3}
              value={character.proficiencies}
              onChange={(e) => update("proficiencies", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="languages">Languages</label>
            <textarea
              id="languages"
              rows={3}
              value={character.languages}
              onChange={(e) => update("languages", e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="appearance">Appearance</label>
          <textarea
            id="appearance"
            rows={2}
            value={character.appearance}
            onChange={(e) => update("appearance", e.target.value)}
          />
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="personality">Personality Traits</label>
            <textarea
              id="personality"
              rows={3}
              value={character.personalityTraits}
              onChange={(e) => update("personalityTraits", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="ideals">Ideals</label>
            <textarea
              id="ideals"
              rows={3}
              value={character.ideals}
              onChange={(e) => update("ideals", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="bonds">Bonds</label>
            <textarea
              id="bonds"
              rows={3}
              value={character.bonds}
              onChange={(e) => update("bonds", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="flaws">Flaws</label>
            <textarea
              id="flaws"
              rows={3}
              value={character.flaws}
              onChange={(e) => update("flaws", e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="background-feature">Background Feature</label>
          <textarea
            id="background-feature"
            rows={2}
            value={character.backgroundFeature}
            onChange={(e) => update("backgroundFeature", e.target.value)}
          />
        </div>
      </section>

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
            rows={6}
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
    </>
  );
}
