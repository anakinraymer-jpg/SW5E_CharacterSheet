import type { Character } from "../types";
import { abilityModifier, formatModifier, proficiencyBonus } from "../utils";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

export default function CombatSection({ character, update }: Props) {
  const pb = proficiencyBonus(character.level);
  const dexMod = abilityModifier(character.abilities.dex);

  return (
    <section className="sheet-section combat-section">
      <h2>Combat</h2>
      <div className="combat-grid">
        <div className="field">
          <label htmlFor="defense">Defense</label>
          <input
            id="defense"
            type="number"
            value={character.defense}
            onChange={(e) => update("defense", Number(e.target.value) || 0)}
          />
        </div>

        <div className="field">
          <label>Initiative</label>
          <div className="readonly-box">
            {formatModifier(dexMod + character.initiativeBonus)}
          </div>
        </div>

        <div className="field">
          <label htmlFor="init-bonus">Init. Bonus</label>
          <input
            id="init-bonus"
            type="number"
            value={character.initiativeBonus}
            onChange={(e) => update("initiativeBonus", Number(e.target.value) || 0)}
          />
        </div>

        <div className="field">
          <label htmlFor="speed">Speed</label>
          <input
            id="speed"
            type="number"
            value={character.speed}
            onChange={(e) => update("speed", Number(e.target.value) || 0)}
          />
        </div>

        <div className="field">
          <label>Proficiency Bonus</label>
          <div className="readonly-box">{formatModifier(pb)}</div>
        </div>

        <div className="field">
          <label htmlFor="hit-dice-total">Hit Dice (Total)</label>
          <input
            id="hit-dice-total"
            type="text"
            value={character.hitDiceTotal}
            onChange={(e) => update("hitDiceTotal", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="hit-dice-remaining">Hit Dice (Remaining)</label>
          <input
            id="hit-dice-remaining"
            type="text"
            value={character.hitDiceRemaining}
            onChange={(e) => update("hitDiceRemaining", e.target.value)}
          />
        </div>
      </div>

      <div className="hp-grid">
        <div className="field">
          <label htmlFor="max-hp">Max HP</label>
          <input
            id="max-hp"
            type="number"
            value={character.maxHp}
            onChange={(e) => update("maxHp", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="current-hp">Current HP</label>
          <input
            id="current-hp"
            type="number"
            value={character.currentHp}
            onChange={(e) => update("currentHp", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="temp-hp">Temp HP</label>
          <input
            id="temp-hp"
            type="number"
            value={character.tempHp}
            onChange={(e) => update("tempHp", Number(e.target.value) || 0)}
          />
        </div>
      </div>
    </section>
  );
}
