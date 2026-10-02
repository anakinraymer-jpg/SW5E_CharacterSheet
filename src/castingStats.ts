import type { Character } from "./types";
import { forceCastingAbilityKey } from "./classFeatureLogic";
import { hasFeat } from "./featLogic";
import { abilityModifier, proficiencyBonus } from "./utils";

// Force/Tech attack bonus and save DC, shared by the Force & Tech Powers section and Simple mode.
export function castingStats(character: Character) {
  const pb = proficiencyBonus(character.level);
  const specialistBonus = hasFeat(character, "Casting Specialist") ? 1 : 0;
  const forceAbility = forceCastingAbilityKey(character);
  const forceMod = abilityModifier(character.abilities[forceAbility]);
  const techMod = abilityModifier(character.abilities.int);
  return {
    pb,
    specialistBonus,
    forceAbility,
    forceMod,
    forceAttack: pb + forceMod + specialistBonus,
    forceDC: 8 + pb + forceMod + specialistBonus,
    techMod,
    techAttack: pb + techMod + specialistBonus,
    techDC: 8 + pb + techMod + specialistBonus,
  };
}
