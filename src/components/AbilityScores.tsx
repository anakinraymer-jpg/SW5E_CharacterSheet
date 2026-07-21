import type { AbilityKey, Character } from "../types";
import { abilityModifier, formatModifier } from "../utils";

const ABILITY_LABELS: Record<AbilityKey, string> = {
  str: "Strength",
  dex: "Dexterity",
  con: "Constitution",
  int: "Intelligence",
  wis: "Wisdom",
  cha: "Charisma",
};

interface Props {
  character: Character;
  updateAbility: (key: AbilityKey, value: number) => void;
}

export default function AbilityScores({ character, updateAbility }: Props) {
  return (
    <section className="sheet-section abilities-section">
      <h2>Ability Scores</h2>
      <div className="ability-grid">
        {(Object.keys(ABILITY_LABELS) as AbilityKey[]).map((key) => {
          const score = character.abilities[key];
          const mod = abilityModifier(score);
          return (
            <div className="ability-box" key={key}>
              <label htmlFor={`ability-${key}`}>{ABILITY_LABELS[key]}</label>
              <input
                id={`ability-${key}`}
                type="number"
                value={score}
                onChange={(e) => updateAbility(key, Number(e.target.value) || 0)}
              />
              <div className="ability-mod">{formatModifier(mod)}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
