import type { Character } from "../types";
import { SKILL_ABILITY } from "../types";
import {
  abilityModifier,
  formatModifier,
  passivePerception,
  proficiencyBonus,
} from "../utils";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

function DeathSavePips({
  count,
  onSet,
}: {
  count: number;
  onSet: (n: number) => void;
}) {
  return (
    <div className="death-save-pips">
      {[1, 2, 3].map((n) => (
        <button
          key={n}
          type="button"
          className={`pip ${n <= count ? "pip-filled" : ""}`}
          onClick={() => onSet(n === count ? n - 1 : n)}
          aria-label={`Set ${n}`}
        />
      ))}
    </div>
  );
}

export default function CombatSection({ character, update }: Props) {
  const pb = proficiencyBonus(character.level);
  const dexMod = abilityModifier(character.abilities.dex);

  const perceptionState = character.skills.Perception;
  const wisMod = abilityModifier(character.abilities[SKILL_ABILITY.Perception]);
  let perceptionBonus = wisMod;
  if (perceptionState.proficient) perceptionBonus += pb;
  if (perceptionState.expertise) perceptionBonus += pb;

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
          <label>Proficiency Bonus</label>
          <div className="readonly-box">{formatModifier(pb)}</div>
        </div>

        <div className="field">
          <label>Passive Perception</label>
          <div className="readonly-box">{passivePerception(perceptionBonus)}</div>
        </div>

        <div className="field">
          <label className="inspiration-label">
            <input
              type="checkbox"
              checked={character.inspiration}
              onChange={(e) => update("inspiration", e.target.checked)}
            />
            Inspiration
          </label>
        </div>
      </div>

      <div className="combat-grid">
        <div className="field">
          <label htmlFor="speed-base">Speed (base)</label>
          <input
            id="speed-base"
            type="number"
            value={character.speedBase}
            onChange={(e) => update("speedBase", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="speed-hour">Speed (hour)</label>
          <input
            id="speed-hour"
            type="number"
            value={character.speedHour}
            onChange={(e) => update("speedHour", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="speed-day">Speed (day)</label>
          <input
            id="speed-day"
            type="number"
            value={character.speedDay}
            onChange={(e) => update("speedDay", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="vision">Vision</label>
          <input
            id="vision"
            type="text"
            placeholder="e.g. Darkvision 60 ft."
            value={character.vision}
            onChange={(e) => update("vision", e.target.value)}
          />
        </div>
        <div className="field field-wide">
          <label htmlFor="special-movement">Special Movement</label>
          <input
            id="special-movement"
            type="text"
            value={character.specialMovement}
            onChange={(e) => update("specialMovement", e.target.value)}
          />
        </div>
      </div>

      <div className="combat-grid">
        <div className="field">
          <label htmlFor="hit-dice-total">Hit Dice (Max)</label>
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

      <div className="death-saves">
        <div className="death-saves-row">
          <span>Death Saves — Successes</span>
          <DeathSavePips
            count={character.deathSaves.successes}
            onSet={(n) => update("deathSaves", { ...character.deathSaves, successes: n })}
          />
        </div>
        <div className="death-saves-row">
          <span>Death Saves — Failures</span>
          <DeathSavePips
            count={character.deathSaves.failures}
            onSet={(n) => update("deathSaves", { ...character.deathSaves, failures: n })}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="armor-notes">Armor, Shield, Protections</label>
        <textarea
          id="armor-notes"
          rows={3}
          placeholder="Name, enchantment bonus, base AC, max DEX, weight"
          value={character.armorNotes}
          onChange={(e) => update("armorNotes", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="resistances">Advantages, Resistances, Immunities</label>
        <textarea
          id="resistances"
          rows={3}
          value={character.resistances}
          onChange={(e) => update("resistances", e.target.value)}
        />
      </div>
    </section>
  );
}
