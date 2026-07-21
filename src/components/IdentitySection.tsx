import type { Character } from "../types";
import { ARCHETYPES, BACKGROUNDS, ALIGNMENTS, ALLEGIANCES, SIZES } from "../data/sw5eData";
import { SPECIES_CATALOG } from "../data/species";
import { CLASSES_CATALOG } from "../data/classes";

const SPECIES_NAMES = SPECIES_CATALOG.map((s) => s.name);
const CLASS_NAMES = CLASSES_CATALOG.map((c) => c.name);

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  onSpeciesCommit: (value: string) => void;
  onClassCommit: (value: string) => void;
  onArchetypeCommit: (value: string) => void;
  archetypeOptions: string[];
}

function Datalist({ id, options }: { id: string; options: string[] }) {
  return (
    <datalist id={id}>
      {options.map((o) => (
        <option key={o} value={o} />
      ))}
    </datalist>
  );
}

export default function IdentitySection({
  character,
  update,
  onSpeciesCommit,
  onClassCommit,
  onArchetypeCommit,
  archetypeOptions,
}: Props) {
  return (
    <section className="sheet-section identity-section">
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
          <input
            id="species"
            list="species-list"
            value={character.species}
            onChange={(e) => update("species", e.target.value)}
            onBlur={(e) => onSpeciesCommit(e.target.value)}
          />
          <Datalist id="species-list" options={SPECIES_NAMES} />
        </div>

        <div className="field">
          <label htmlFor="class">Class</label>
          <input
            id="class"
            list="class-list"
            value={character.characterClass}
            onChange={(e) => update("characterClass", e.target.value)}
            onBlur={(e) => onClassCommit(e.target.value)}
          />
          <Datalist id="class-list" options={CLASS_NAMES} />
        </div>

        <div className="field">
          <label htmlFor="archetype">Archetype</label>
          <input
            id="archetype"
            list="archetype-list"
            value={character.archetype}
            onChange={(e) => update("archetype", e.target.value)}
            onBlur={(e) => onArchetypeCommit(e.target.value)}
          />
          <Datalist
            id="archetype-list"
            options={archetypeOptions.length > 0 ? archetypeOptions : ARCHETYPES}
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
          <input
            id="background"
            list="background-list"
            value={character.background}
            onChange={(e) => update("background", e.target.value)}
          />
          <Datalist id="background-list" options={BACKGROUNDS} />
        </div>

        <div className="field">
          <label htmlFor="alignment">Force Alignment</label>
          <input
            id="alignment"
            list="alignment-list"
            value={character.alignment}
            onChange={(e) => update("alignment", e.target.value)}
          />
          <Datalist id="alignment-list" options={ALIGNMENTS} />
        </div>

        <div className="field">
          <label htmlFor="allegiance">Allegiance</label>
          <input
            id="allegiance"
            list="allegiance-list"
            value={character.allegiance}
            onChange={(e) => update("allegiance", e.target.value)}
          />
          <Datalist id="allegiance-list" options={ALLEGIANCES} />
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

        <div className="field">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="text"
            value={character.age}
            onChange={(e) => update("age", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="gender">Gender</label>
          <input
            id="gender"
            type="text"
            value={character.gender}
            onChange={(e) => update("gender", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="size">Size</label>
          <input id="size" list="size-list" value={character.size} onChange={(e) => update("size", e.target.value)} />
          <Datalist id="size-list" options={SIZES} />
        </div>

        <div className="field">
          <label htmlFor="height">Height</label>
          <input
            id="height"
            type="text"
            value={character.height}
            onChange={(e) => update("height", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="weight">Weight</label>
          <input
            id="weight"
            type="text"
            value={character.weight}
            onChange={(e) => update("weight", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="hair">Hair</label>
          <input
            id="hair"
            type="text"
            value={character.hair}
            onChange={(e) => update("hair", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="eyes">Eyes</label>
          <input
            id="eyes"
            type="text"
            value={character.eyes}
            onChange={(e) => update("eyes", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="skin">Skin</label>
          <input
            id="skin"
            type="text"
            value={character.skin}
            onChange={(e) => update("skin", e.target.value)}
          />
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

    </section>
  );
}
