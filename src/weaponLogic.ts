import type { Character, Weapon } from "./types";
import { WEAPON_CATALOG } from "./data/weapons";
import { MONK_WEAPON_NAMES } from "./data/classes";
import { MONK_MARTIAL_ARTS_DIE_BY_LEVEL } from "./data/classFeatureChoices";
import { allChosenSubChoiceOptions, monkRetainsUnarmoredBenefits } from "./classFeatureLogic";
import { ABILITY_LABEL } from "./speciesLogic";
import { abilityModifier, formatModifier } from "./utils";

export const WEAPON_LOOKUP = new Map(WEAPON_CATALOG.map((w) => [w.name.toLowerCase(), w]));
const MONK_WEAPON_NAME_SET = new Set(MONK_WEAPON_NAMES.map((n) => n.toLowerCase()));

// Blasters use Dexterity; melee weapons use Strength unless Finesse allows the better of the two.
// Monk unarmed strikes/monk weapons additionally gain Martial Arts' finesse while the Monk is
// unarmored and shieldless, and Vow of Spirit replaces Str/Dex with Wis/Cha entirely (no armor
// requirement) — both are class/state-aware, so they're computed here rather than stored on the
// catalog entry itself, which is shared by every class. Shared by WeaponsSection and CombatSection.
export function toHitAbilityInfo(character: Character, weaponName: string): { mod: number; label: string } {
  const strMod = abilityModifier(character.abilities.str);
  const dexMod = abilityModifier(character.abilities.dex);
  const entry = WEAPON_LOOKUP.get(weaponName.trim().toLowerCase());
  if (!entry) return { mod: strMod, label: "Strength" };
  const isRanged = /blaster/i.test(entry.type);
  const isMonk = character.classAppliedName === "Monk";
  const isMonkWeapon = entry.name === "Unarmed Strike" || MONK_WEAPON_NAME_SET.has(entry.name.toLowerCase());

  // Vow of Spirit is scoped to unarmed strikes/monk weapons specifically (its own text), but
  // Martial Arts' finesse grant applies to any weapon the Monk wields while unarmored/shieldless.
  if (isMonk && isMonkWeapon && !isRanged) {
    const hasVowOfSpirit = allChosenSubChoiceOptions(character).some((o) => o.name === "Vow of Spirit");
    if (hasVowOfSpirit) {
      const ability = character.monkUnarmoredDefenseAbility;
      return { mod: abilityModifier(character.abilities[ability]), label: `${ABILITY_LABEL[ability]} (Vow of Spirit)` };
    }
  }

  const monkFinesse = isMonk && !isRanged && monkRetainsUnarmoredBenefits(character);
  const isFinesse = monkFinesse || /finesse/i.test(entry.property);
  if (isRanged) return { mod: dexMod, label: "Dexterity" };
  if (isFinesse && dexMod > strMod) {
    const isCatalogFinesse = /finesse/i.test(entry.property);
    return { mod: dexMod, label: isCatalogFinesse ? "Dexterity (Finesse)" : "Dexterity (Martial Arts)" };
  }
  return { mod: strMod, label: "Strength" };
}

// Unarmed Strike has no legitimate manual damage override (unlike other weapons, which can carry
// homebrew/magical bonuses) — its damage is fully determined by Martial Arts die (if any) plus the
// applicable ability modifier, so this is computed live rather than stored on the weapon row.
export function weaponDamageDisplay(character: Character, weapon: Weapon): { display: string; lines: string[] } {
  const { mod: abilityMod, label: abilityLabel } = toHitAbilityInfo(character, weapon.name);
  if (weapon.name.trim().toLowerCase() === "unarmed strike") {
    const hasMartialArts = character.classAppliedName === "Monk" && monkRetainsUnarmoredBenefits(character);
    const idx = Math.max(1, Math.min(20, character.level || 1)) - 1;
    const martialArtsDie = MONK_MARTIAL_ARTS_DIE_BY_LEVEL[idx];
    const dieNotation = hasMartialArts ? `1${martialArtsDie}` : "1";
    return {
      display: `${dieNotation}${formatModifier(abilityMod)} Kinetic`,
      lines: [
        hasMartialArts ? `Martial Arts die: 1${martialArtsDie}` : "Base unarmed strike damage: 1",
        `${abilityLabel} modifier: ${formatModifier(abilityMod)}`,
      ],
    };
  }
  return { display: weapon.damage, lines: [] };
}
