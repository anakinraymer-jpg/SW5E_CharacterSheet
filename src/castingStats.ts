import type { Character } from "./types";
import { forceCastingAbilityKey } from "./classFeatureLogic";
import { hasFeat } from "./featLogic";
import { abilityModifier, proficiencyBonus } from "./utils";
import { modTechBonus } from "./modifications";

// Force/Tech attack bonus and save DC, shared by the Force & Tech Powers section and Simple mode.
export function castingStats(character: Character) {
  const pb = proficiencyBonus(character.level);
  const specialistBonus = hasFeat(character, "Casting Specialist") ? 1 : 0;
  const forceAbility = forceCastingAbilityKey(character);
  const forceMod = abilityModifier(character.abilities[forceAbility]);
  const techMod = abilityModifier(character.abilities.int);
  const mods = modTechBonus(character); // Engineer modifications (flat bonuses only; situational ones are notes)
  return {
    pb,
    specialistBonus,
    forceAbility,
    forceMod,
    forceAttack: pb + forceMod + specialistBonus,
    forceDC: 8 + pb + forceMod + specialistBonus,
    techMod,
    techAttack: pb + techMod + specialistBonus + mods.attack,
    techDC: 8 + pb + techMod + specialistBonus + mods.dc,
    techMods: mods,
  };
}
