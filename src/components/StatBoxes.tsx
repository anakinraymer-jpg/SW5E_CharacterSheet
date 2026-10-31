import type { Character } from "../types";
import { abilityModifier, computeDefense, formatModifier, proficiencyBonus } from "../utils";
import { computeUnarmoredDefenseBonus } from "../classLogic";
import { activeSpeedBonusSources } from "../classFeatureLogic";
import { hasFeat } from "../featLogic";
import { armorInfusion } from "../infuseItem";
import { modDefenseNotes, modNaturalArmor } from "../modifications";
import {
  archetypeAcBonuses,
  archetypeDefenseNotes,
  archetypeExtraSpeeds,
  archetypeInitiativeNotes,
  archetypeInitiativeSources,
  archetypeNaturalArmor,
  armorAbilitySubstitute,
  bestNaturalArmor,
} from "../archetypeEffects";
import { activeEffectAcBonuses, activeEffectExtraSpeeds, activeEffects } from "../activeEffects";
import HoverInfo from "./HoverInfo";
import NumberInput from "./NumberInput";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
}

export function DefenseBox({ character }: Props) {
  const dexMod = abilityModifier(character.abilities.dex);
  const unarmoredDefense = computeUnarmoredDefenseBonus(character);
  const naturalArmor = bestNaturalArmor(
    [character.speciesNaturalArmor, modNaturalArmor(character), archetypeNaturalArmor(character)],
    dexMod
  );
  const armorAbility = armorAbilitySubstitute(character);
  const computed = computeDefense(character.equipment, dexMod, unarmoredDefense, naturalArmor, armorInfusion(character), armorAbility);
  const effects = activeEffects(character);
  const acBonuses = [...archetypeAcBonuses(character, computed), ...activeEffectAcBonuses(character)];
  const total = computed.total + acBonuses.reduce((sum, b) => sum + b.amount, 0);
  const infusedName = character.equipment.find((i) => i.id === character.infusedItemId)?.name;
  // A situational note whose stance/buff is switched on is already counted above.
  const situational = [
    ...modDefenseNotes(character),
    ...archetypeDefenseNotes(character).filter((n) => !effects.some((e) => e.acBonus > 0 && n.startsWith(`${e.feature}:`))),
  ];

  const lines = [
    computed.naturalArmorApplied && naturalArmor
      ? `${naturalArmor.sourceLabel}: ${naturalArmor.base}${naturalArmor.addDex ? " + Dex modifier" : ""}`
      : computed.armor
        ? `${computed.armor.name}: ${computed.armor.ac}`
        : computed.unarmoredDefenseApplied && unarmoredDefense
          ? `${unarmoredDefense.sourceLabel}: 10 + Dex + ${unarmoredDefense.abilityLabel}`
          : `Unarmored: 10 + Dex modifier`,
    computed.armorAbilityApplied && armorAbility
      ? `${armorAbility.label}: ${formatModifier(armorAbility.modifier)}`
      : `Dex modifier: ${formatModifier(dexMod)}`,
    ...(computed.unarmoredDefenseApplied && unarmoredDefense
      ? [`${unarmoredDefense.abilityLabel} modifier: ${formatModifier(unarmoredDefense.modifier)}`]
      : []),
    ...(computed.naturalArmorApplied && computed.armor ? [`(overrides ${computed.armor.name}'s own AC)`] : []),
    ...computed.shields.map((s) => `${s.name}: ${s.ac}`),
    ...(computed.infusionBonus ? [`Infuse Item (${infusedName}): +${computed.infusionBonus}`] : []),
    ...acBonuses.map((b) => `${b.label}: +${b.amount}`),
    ...(situational.length ? ["Situational (not included above):", ...situational] : []),
  ];
  return (
    <section className="sheet-section stat-box-section">
      <div className="field">
        <label htmlFor="defense">Defense</label>
        <HoverInfo title="Defense Breakdown" lines={lines}>
          <div id="defense" className="readonly-box">
            {total}
          </div>
        </HoverInfo>
        {situational.length > 0 && (
          <HoverInfo title="Situational Defense" lines={situational}>
            <span className="rage-damage-note">+ situational</span>
          </HoverInfo>
        )}
      </div>
    </section>
  );
}

export function InitiativeBox({ character }: Props) {
  const dexMod = abilityModifier(character.abilities.dex);
  const isAlert = hasFeat(character, "Alert");
  const pb = proficiencyBonus(character.level);
  const archetypeSources = archetypeInitiativeSources(character);
  const notes = archetypeInitiativeNotes(character);
  const initiative = dexMod + (isAlert ? pb : 0) + archetypeSources.reduce((sum, s) => sum + s.amount, 0);
  return (
    <section className="sheet-section stat-box-section">
      <div className="field">
        <label>Initiative</label>
        {isAlert || archetypeSources.length > 0 || notes.length > 0 ? (
          <HoverInfo
            title="Initiative"
            lines={[
              `Dexterity modifier: ${formatModifier(dexMod)}`,
              ...(isAlert ? [`Proficiency Bonus (Alert): ${formatModifier(pb)}`] : []),
              ...archetypeSources.map((s) => `${s.label}: ${formatModifier(s.amount)}`),
              ...notes,
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
  const otherSpeeds = [...archetypeExtraSpeeds(character), ...activeEffectExtraSpeeds(character)];
  return (
    <section className="sheet-section stat-box-section">
      <div className="field">
        <label htmlFor="speed-base">Speed (Base)</label>
        <NumberInput
          id="speed-base"
          value={character.speedBase}
          onValue={(n) => update("speedBase", n)}
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
        {otherSpeeds.length > 0 && (
          <HoverInfo title="Other Speeds" lines={otherSpeeds}>
            <span className="rage-damage-note">+ other speeds</span>
          </HoverInfo>
        )}
      </div>
    </section>
  );
}
