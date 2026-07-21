import type { AbilityKey, Character, SkillName } from "../types";
import { SKILL_LIST, SKILL_ABILITY } from "../types";
import { abilityModifier, formatModifier, proficiencyBonus } from "../utils";

const ABILITY_SHORT: Record<AbilityKey, string> = {
  str: "STR",
  dex: "DEX",
  con: "CON",
  int: "INT",
  wis: "WIS",
  cha: "CHA",
};

interface Props {
  character: Character;
  toggleSkillProficiency: (skill: SkillName) => void;
  toggleSkillExpertise: (skill: SkillName) => void;
  toggleSavingThrow: (key: AbilityKey) => void;
}

export default function SkillsSection({
  character,
  toggleSkillProficiency,
  toggleSkillExpertise,
  toggleSavingThrow,
}: Props) {
  const pb = proficiencyBonus(character.level);

  function skillBonus(skill: SkillName): number {
    const ability = SKILL_ABILITY[skill];
    const mod = abilityModifier(character.abilities[ability]);
    const state = character.skills[skill];
    let bonus = mod;
    if (state.proficient) bonus += pb;
    if (state.expertise) bonus += pb;
    return bonus;
  }

  function saveBonus(key: AbilityKey): number {
    const mod = abilityModifier(character.abilities[key]);
    return character.savingThrows[key] ? mod + pb : mod;
  }

  return (
    <section className="sheet-section skills-section">
      <h2>Skills</h2>
      <div className="proficiency-bonus">
        Proficiency Bonus: <strong>{formatModifier(pb)}</strong>
      </div>
      <table className="skills-table">
        <thead>
          <tr>
            <th>Prof.</th>
            <th>Exp.</th>
            <th>Skill</th>
            <th>Ability</th>
            <th>Bonus</th>
          </tr>
        </thead>
        <tbody>
          {SKILL_LIST.map((skill) => {
            const state = character.skills[skill];
            return (
              <tr key={skill}>
                <td>
                  <input
                    type="checkbox"
                    checked={state.proficient}
                    onChange={() => toggleSkillProficiency(skill)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={state.expertise}
                    disabled={!state.proficient}
                    onChange={() => toggleSkillExpertise(skill)}
                  />
                </td>
                <td>{skill}</td>
                <td className="ability-short">{ABILITY_SHORT[SKILL_ABILITY[skill]]}</td>
                <td className="skill-bonus">{formatModifier(skillBonus(skill))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Saving Throws</h3>
      <table className="saves-table">
        <tbody>
          {(Object.keys(ABILITY_SHORT) as AbilityKey[]).map((key) => (
            <tr key={key}>
              <td>
                <input
                  type="checkbox"
                  checked={character.savingThrows[key]}
                  onChange={() => toggleSavingThrow(key)}
                />
              </td>
              <td>{ABILITY_SHORT[key]}</td>
              <td className="skill-bonus">{formatModifier(saveBonus(key))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
