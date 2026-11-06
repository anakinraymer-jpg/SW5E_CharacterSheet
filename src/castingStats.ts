import type { Character } from "./types";
import { forceCastingAbilityKey } from "./classFeatureLogic";
import { hasFeat } from "./featLogic";
import { abilityModifier, proficiencyBonus } from "./utils";
import { modTechBonus } from "./modifications";
import { customCastingBonus } from "./customItems";

// Force/Tech attack bonus and save DC, shared by the Force & Tech Powers section and Simple mode.
export function castingStats(character: Character) {
  const pb = proficiencyBonus(character.level);
  const specialistBonus = hasFeat(character, "Casting Specialist") ? 1 : 0;
  const forceAbility = forceCastingAbilityKey(character);
  const forceMod = abilityModifier(character.abilities[forceAbility]);
  const techMod = abilityModifier(character.abilities.int);
  const mods = modTechBonus(character); // Engineer modifications (flat bonuses only; situational ones are notes)
  const item = customCastingBonus(character);
  return {
    pb,
    specialistBonus,
    forceAbility,
    forceMod,
    forceAttack: pb + forceMod + specialistBonus + item.forceAttack,
    forceDC: 8 + pb + forceMod + specialistBonus + item.forceDc,
    techMod,
    techAttack: pb + techMod + specialistBonus + mods.attack + item.techAttack,
    techDC: 8 + pb + techMod + specialistBonus + mods.dc + item.techDc,
    techMods: mods,
    itemLines: item.lines,
  };
}
