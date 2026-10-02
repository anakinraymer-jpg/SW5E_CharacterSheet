import type { Character } from "../types";
import { ARCHETYPES, ALIGNMENTS, SIZES } from "../data/sw5eData";
import {
  BACKGROUND_OPTIONS,
  CLASS_OPTIONS,
  SPECIES_OPTIONS,
  archetypeDetails,
  archetypeOptionsFor,
  backgroundDetails,
  classDetails,
  speciesDetails,
} from "../pickerCatalogs";
import PickerField from "./PickerField";
import SectionHeader from "./SectionHeader";

const ALIGNMENT_OPTIONS = ALIGNMENTS.map((name) => ({ name }));

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  onSpeciesCommit: (value: string) => void;
  onClassCommit: (value: string) => void;
  onArchetypeCommit: (value: string) => void;
  onBackgroundCommit: (value: string) => void;
  archetypeOptions: string[];
  collapsed: boolean;
  onToggleSection: () => void;
}

export default function IdentitySection({
  character,
  update,
  onSpeciesCommit,
  onClassCommit,
  onArchetypeCommit,
  onBackgroundCommit,
  archetypeOptions,
  collapsed,
  onToggleSection,
}: Props) {
  const archetypePickerOptions = archetypeOptionsFor(
    character.classAppliedName,
    archetypeOptions.length > 0 ? archetypeOptions : ARCHETYPES
  );
  return (
    <section className="sheet-section identity-section">
      <SectionHeader title="Character" collapsed={collapsed} onToggle={onToggleSection} />
      {!collapsed && (
      <>
      <div className="field field-name">
        <label htmlFor="name">Character Name</label>
        <input
          id="name"
          type="text"
          value={character.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="player-name">Player's Name</label>
          <input
            id="player-name"
            type="text"
            value={character.playerName}
            onChange={(e) => update("playerName", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="species">Species</label>
          <PickerField
            id="species"
            title="Choose a species"
            value={character.species}
            options={SPECIES_OPTIONS}
            getDetails={speciesDetails}
            allowCustom
            onPick={(name) => {
              update("species", name);
              onSpeciesCommit(name);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="class">Class</label>
          <PickerField
            id="class"
            title="Choose a class"
            value={character.characterClass}
            options={CLASS_OPTIONS}
            getDetails={classDetails}
            allowCustom
            onPick={(name) => {
              update("characterClass", name);
              onClassCommit(name);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="archetype">Archetype</label>
          <PickerField
            id="archetype"
            title="Choose an archetype"
            value={character.archetype}
            options={archetypePickerOptions}
            getDetails={archetypeDetails}
            allowCustom
            onPick={(name) => {
              update("archetype", name);
              onArchetypeCommit(name);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="level">Level</label>
          <input
            id="level"
            type="number"
            min={1}
            max={20}
            value={character.level}
            onChange={(e) => update("level", Number(e.target.value) || 1)}
          />
        </div>

        <div className="field">
          <label htmlFor="xp">Experience Points</label>
          <input
            id="xp"
            type="number"
            min={0}
            value={character.experiencePoints}
            onChange={(e) => update("experiencePoints", Number(e.target.value) || 0)}
          />
        </div>

        <div className="field">
          <label htmlFor="xp-next">XP Next Level</label>
          <input
            id="xp-next"
            type="number"
            min={0}
            value={character.xpNextLevel}
            onChange={(e) => update("xpNextLevel", Number(e.target.value) || 0)}
          />
        </div>

        <div className="field">
          <label htmlFor="background">Background</label>
          <PickerField
            id="background"
            title="Choose a background"
            value={character.background}
            options={BACKGROUND_OPTIONS}
            getDetails={backgroundDetails}
            allowCustom
            onPick={(name) => {
              update("background", name);
              onBackgroundCommit(name);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="alignment">Force Alignment</label>
          <PickerField
            id="alignment"
            title="Choose a Force alignment"
            value={character.alignment}
            options={ALIGNMENT_OPTIONS}
            allowCustom
            onPick={(name) => update("alignment", name)}
          />
        </div>

        <div className="field">
          <label htmlFor="size">Size</label>
          <select id="size" value={character.size} onChange={(e) => update("size", e.target.value)}>
            {!SIZES.includes(character.size) && <option value={character.size}>{character.size || "—"}</option>}
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {character.speciesTraitsText && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.speciesAppliedName} Traits</div>
          {character.speciesTraitsText.split("\n\n").map((line, i) => (
            <p key={i} className="species-trait-line">
              {line}
            </p>
          ))}
        </div>
      )}
      </>
      )}
    </section>
  );
}
