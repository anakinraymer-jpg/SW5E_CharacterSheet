import type { Character } from "../types";
import { ALLEGIANCES } from "../data/sw5eData";
import { grantedLanguages, grantedProficiencies } from "../grantsSummary";
import PickerField from "./PickerField";
import SectionHeader from "./SectionHeader";

const ALLEGIANCE_OPTIONS = ALLEGIANCES.map((name) => ({ name }));

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

const PORTRAIT_MAX_SIDE = 480;

// Shrinks an uploaded picture to a small JPEG data URL so it fits comfortably in localStorage.
function downscaleImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, PORTRAIT_MAX_SIDE / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve("");
    };
    img.src = url;
  });
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

        <div className="portrait-row">
          <div className="portrait-box">
            {character.portrait ? (
              <img src={character.portrait} alt={`${character.name || "Character"} portrait`} />
            ) : (
              <span className="portrait-placeholder">No image</span>
            )}
            <div className="portrait-actions">
              <label className="btn btn-secondary btn-small portrait-upload">
                {character.portrait ? "Change" : "Add image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (file) update("portrait", await downscaleImage(file));
                  }}
                />
              </label>
              {character.portrait && (
                <button type="button" className="btn btn-danger btn-small" onClick={() => update("portrait", "")}>
                  Remove
                </button>
              )}
            </div>
          </div>
          <div className="field portrait-appearance">
            <label htmlFor="appearance">Appearance</label>
            <textarea
              id="appearance"
              rows={5}
              value={character.appearance}
              onChange={(e) => update("appearance", e.target.value)}
            />
          </div>
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
            <PickerField
              id="allegiance"
              title="Choose an allegiance"
              value={character.allegiance}
              options={ALLEGIANCE_OPTIONS}
              allowCustom
              onPick={(name) => update("allegiance", name)}
            />
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
