import type { Character } from "../types";
import { abilityModifier, formatModifier, proficiencyBonus } from "../utils";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

export function DefenseBox({ character, update }: Props) {
  return (
    <section className="sheet-section stat-box-section">
      <div className="field">
        <label htmlFor="defense">Defense</label>
        <input
          id="defense"
          type="number"
          value={character.defense}
          onChange={(e) => update("defense", Number(e.target.value) || 0)}
        />
      </div>
    </section>
  );
}

export function InitiativeBox({ character }: Props) {
  const dexMod = abilityModifier(character.abilities.dex);
  return (
    <section className="sheet-section stat-box-section">
      <div className="field">
        <label>Initiative</label>
        <div className="readonly-box">{formatModifier(dexMod)}</div>
      </div>
    </section>
  );
}

export function ProficiencyBonusBox({ character }: Props) {
  const pb = proficiencyBonus(character.level);
  return (
    <section className="sheet-section stat-box-section">
      <div className="field">
        <label>Proficiency Bonus</label>
        <div className="readonly-box">{formatModifier(pb)}</div>
      </div>
    </section>
  );
}

export function SpeedBaseBox({ character, update }: Props) {
  return (
    <section className="sheet-section stat-box-section">
      <div className="field">
        <label htmlFor="speed-base">Speed (Base)</label>
        <input
          id="speed-base"
          type="number"
          value={character.speedBase}
          onChange={(e) => update("speedBase", Number(e.target.value) || 0)}
        />
      </div>
    </section>
  );
}
