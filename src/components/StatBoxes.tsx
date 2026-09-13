import type { Character } from "../types";
import { abilityModifier, computeDefense, formatModifier, proficiencyBonus } from "../utils";
import { computeUnarmoredDefenseBonus } from "../classLogic";
import { activeSpeedBonusSources } from "../classFeatureLogic";
import { hasFeat } from "../featLogic";
import HoverInfo from "./HoverInfo";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

export function DefenseBox({ character, update }: Props) {
  const dexMod = abilityModifier(character.abilities.dex);
  const unarmoredDefense = computeUnarmoredDefenseBonus(character);
  const naturalArmor = character.speciesNaturalArmor;
  const computed = computeDefense(character.equipment, dexMod, unarmoredDefense, naturalArmor);

  if (computed) {
    const lines = [
      computed.naturalArmorApplied && naturalArmor
        ? `${naturalArmor.sourceLabel}: ${naturalArmor.base}${naturalArmor.addDex ? " + Dex modifier" : ""}`
        : computed.armor
          ? `${computed.armor.name}: ${computed.armor.ac}`
          : computed.unarmoredDefenseApplied && unarmoredDefense
            ? `${unarmoredDefense.sourceLabel}: 10 + Dex + ${unarmoredDefense.abilityLabel}`
            : `Unarmored: 10 + Dex modifier`,
      `Dex modifier: ${formatModifier(dexMod)}`,
      ...(computed.unarmoredDefenseApplied && unarmoredDefense
        ? [`${unarmoredDefense.abilityLabel} modifier: ${formatModifier(unarmoredDefense.modifier)}`]
        : []),
      ...(computed.naturalArmorApplied && computed.armor ? [`(overrides ${computed.armor.name}'s own AC)`] : []),
      ...computed.shields.map((s) => `${s.name}: ${s.ac}`),
    ];
    return (
      <section className="sheet-section stat-box-section">
        <div className="field">
          <label htmlFor="defense">Defense</label>
          <HoverInfo title="Defense Breakdown" lines={lines}>
            <div id="defense" className="readonly-box">
              {computed.total}
            </div>
          </HoverInfo>
        </div>
      </section>
    );
  }

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
  const isAlert = hasFeat(character, "Alert");
  const pb = proficiencyBonus(character.level);
  const initiative = dexMod + (isAlert ? pb : 0);
  return (
    <section className="sheet-section stat-box-section">
      <div className="field">
        <label>Initiative</label>
        {isAlert ? (
          <HoverInfo
            title="Alert"
            lines={[
              `Dexterity modifier: ${formatModifier(dexMod)}`,
              `Proficiency Bonus (Alert): ${formatModifier(pb)}`,
            ]}
          >
            <div className="readonly-box">{formatModifier(initiative)}</div>
          </HoverInfo>
        ) : (
          <div className="readonly-box">{formatModifier(initiative)}</div>
        )}
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
  const sources = activeSpeedBonusSources(character);
  const bonus = sources.reduce((sum, s) => sum + s.amount, 0);
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
        {bonus > 0 && (
          <HoverInfo
            title="Speed Bonus"
            lines={[
              `Effective speed: ${character.speedBase + bonus} ft (${character.speedBase} + ${bonus}).`,
              ...sources.map((s) => `${s.label}: +${s.amount} ft`),
            ]}
          >
            <span className="rage-damage-note">Effective {character.speedBase + bonus} ft</span>
          </HoverInfo>
        )}
      </div>
    </section>
  );
}
