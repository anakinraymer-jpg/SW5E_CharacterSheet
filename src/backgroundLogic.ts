import type { BackgroundEntry, BackgroundSelections, Character, SkillName } from "./types";
import { resolveEquipmentParts } from "./equipmentLogic";
import { revokeSkill } from "./grantOwnership";
import { BACKGROUND_FEAT_OPTIONS } from "./data/backgroundFeats";
import { FEATS_CATALOG } from "./data/feats";
import { removeFeat } from "./featLogic";

// The background's feat table, limited to feats the sheet knows.
export function backgroundFeatOptions(bg: BackgroundEntry): string[] {
  return (BACKGROUND_FEAT_OPTIONS[bg.name] ?? []).filter((name) => FEATS_CATALOG.some((f) => f.name === name));
}

export function backgroundNeedsChoices(bg: BackgroundEntry): boolean {
  return (
    bg.skillChoice.count > 0 ||
    bg.languages.choiceCount > 0 ||
    bg.toolChoices.length > 0 ||
    backgroundFeatOptions(bg).length > 0
  );
}

export function revertBackground(input: Character): Character {
  if (!input.backgroundAppliedName) return input;
  const grantedFeat = input.feats.find((f) => f.name === input.backgroundGrantedFeat);
  const character = grantedFeat ? removeFeat(input, grantedFeat.id) : input;
  const skills = { ...character.skills };
  for (const skillName of character.backgroundGrantedSkills) {
    revokeSkill(skills, skillName, character, { except: "background" });
  }
  const grantedEquipmentIds = new Set(character.backgroundGrantedEquipmentIds);
  const grantedWeaponIds = new Set(character.backgroundGrantedWeaponIds);
  return {
    ...character,
    skills,
    backgroundFeature:
      character.backgroundFeature === character.backgroundGrantedFeature ? "" : character.backgroundFeature,
    backgroundGrantedFeature: "",
    credits: character.credits - character.backgroundCreditsApplied,
    equipment: character.equipment.filter((item) => !grantedEquipmentIds.has(item.id)),
    weapons: character.weapons.filter((w) => !grantedWeaponIds.has(w.id)),
    backgroundAppliedName: "",
    backgroundGrantedFeat: "",
    backgroundGrantedSkills: [],
    backgroundGrantedLanguages: [],
    backgroundGrantedProficiencies: [],
    backgroundGrantedEquipmentIds: [],
    backgroundGrantedWeaponIds: [],
    backgroundCreditsApplied: 0,
  };
}

export function applyBackground(
  character: Character,
  bg: BackgroundEntry,
  selections: BackgroundSelections
): Character {
  const base = character.backgroundAppliedName ? revertBackground(character) : character;

  const skills = { ...base.skills };
  const grantedSkills: SkillName[] = [];
  for (const skillName of selections.skillChoice) {
    const sk = skillName as SkillName;
    skills[sk] = { ...skills[sk], proficient: true };
    grantedSkills.push(sk);
  }

  const grantedLanguages = [...bg.languages.fixed, ...selections.languageChoice];

  const grantedProficiencies = [...bg.fixedToolProficiencies];
  bg.toolChoices.forEach((choiceDef, i) => {
    const chosen = (selections.toolChoice[i] ?? []).filter(Boolean);
    chosen.forEach((val) => grantedProficiencies.push(`${val} (${choiceDef.label})`));
  });

  const grantedItems = resolveEquipmentParts(bg.equipmentGrants, [], selections.toolChoice);

  return {
    ...base,
    background: bg.name,
    skills,
    credits: base.credits + bg.startingCredits,
    backgroundAppliedName: bg.name,
    backgroundGrantedFeat: selections.feat ?? "",
    backgroundGrantedSkills: grantedSkills,
    backgroundGrantedLanguages: grantedLanguages,
    backgroundGrantedProficiencies: grantedProficiencies,
    backgroundGrantedEquipmentIds: grantedItems.equipment.map((i) => i.id),
    backgroundGrantedWeaponIds: grantedItems.weapons.map((w) => w.id),
    backgroundCreditsApplied: bg.startingCredits,
    backgroundFeature: `${bg.featureName}. ${bg.featureText}`,
    backgroundGrantedFeature: `${bg.featureName}. ${bg.featureText}`,
    equipment: [...base.equipment, ...grantedItems.equipment],
    weapons: [...base.weapons, ...grantedItems.weapons],
  };
}
