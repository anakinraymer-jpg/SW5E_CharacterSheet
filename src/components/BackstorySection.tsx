import type { Character } from "../types";
import { ALLEGIANCES } from "../data/sw5eData";
import { grantedLanguages, grantedProficiencies } from "../grantsSummary";
import SectionHeader from "./SectionHeader";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

export default function BackstorySection({ character, update, collapsedSections, onToggleSection }: Props) {
  const languages = grantedLanguages(character);
  const proficiencies = grantedProficiencies(character);
  const characterDataCollapsed = !!collapsedSections["characterData"];
  const backstoryNotesCollapsed = !!collapsedSections["backstoryNotes"];

  return (
    <>
      <section className="sheet-section backstory-section">
        <SectionHeader
          title="Character Data"
          collapsed={characterDataCollapsed}
          onToggle={() => onToggleSection("characterData")}
        />
        {!characterDataCollapsed && (
        <>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="proficiencies">Proficiencies</label>
            {proficiencies.length > 0 && (
              <div className="chip-row granted-chip-row">
                {proficiencies.map((p) => (
                  <span key={p} className="info-chip">
                    {p}
                  </span>
                ))}
              </div>
            )}
            <textarea
              id="proficiencies"
              rows={3}
              placeholder="Anything not already granted above"
              value={character.proficiencies}
              onChange={(e) => update("proficiencies", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="languages">Languages</label>
            {languages.length > 0 && (
              <div className="chip-row granted-chip-row">
                {languages.map((l) => (
                  <span key={l} className="info-chip">
                    {l}
                  </span>
                ))}
              </div>
            )}
            <textarea
              id="languages"
              rows={3}
              placeholder="Anything not already granted above"
              value={character.languages}
              onChange={(e) => update("languages", e.target.value)}
            />
          </div>
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="age">Age</label>
            <input id="age" type="text" value={character.age} onChange={(e) => update("age", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="gender">Gender</label>
            <input id="gender" type="text" value={character.gender} onChange={(e) => update("gender", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="height">Height</label>
            <input id="height" type="text" value={character.height} onChange={(e) => update("height", e.target.value)} />
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
        </>
        )}
      </section>

      <section className="sheet-section notes-section">
        <SectionHeader
          title="Features, Backstory & Notes"
          collapsed={backstoryNotesCollapsed}
          onToggle={() => onToggleSection("backstoryNotes")}
        />
        {!backstoryNotesCollapsed && (
        <>

        <div className="field">
          <label htmlFor="feats">Feats &amp; Class Features</label>
          <textarea
            id="feats"
            rows={5}
            value={character.featsAndFeatures}
            onChange={(e) => update("featsAndFeatures", e.target.value)}
          />
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="allegiance">Allegiance</label>
            <input
              id="allegiance"
              list="allegiance-list"
              value={character.allegiance}
              onChange={(e) => update("allegiance", e.target.value)}
            />
            <datalist id="allegiance-list">
              {ALLEGIANCES.map((a) => (
                <option key={a} value={a} />
              ))}
            </datalist>
          </div>
          <div className="field">
            <label htmlFor="homeworld">Homeworld</label>
            <input
              id="homeworld"
              type="text"
              value={character.homeworld}
              onChange={(e) => update("homeworld", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="place-of-birth">Place of Birth</label>
            <input
              id="place-of-birth"
              type="text"
              value={character.placeOfBirth}
              onChange={(e) => update("placeOfBirth", e.target.value)}
            />
          </div>
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
        </>
        )}
      </section>
    </>
  );
}
