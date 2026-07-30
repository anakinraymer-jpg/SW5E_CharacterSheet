import type { BackgroundEntry, BackgroundSelections, Character, SkillName } from "./types";
import { resolveEquipmentParts } from "./equipmentLogic";

export function backgroundNeedsChoices(bg: BackgroundEntry): boolean {
  return bg.skillChoice.count > 0 || bg.languages.choiceCount > 0 || bg.toolChoices.length > 0;
}

export function revertBackground(character: Character): Character {
  if (!character.backgroundAppliedName) return character;
  const skills = { ...character.skills };
  for (const skillName of character.backgroundGrantedSkills) {
    skills[skillName] = { ...skills[skillName], proficient: false };
  }
  const grantedEquipmentIds = new Set(character.backgroundGrantedEquipmentIds);
  const grantedWeaponIds = new Set(character.backgroundGrantedWeaponIds);
  return {
    ...character,
    skills,
    credits: character.credits - character.backgroundCreditsApplied,
    equipment: character.equipment.filter((item) => !grantedEquipmentIds.has(item.id)),
    weapons: character.weapons.filter((w) => !grantedWeaponIds.has(w.id)),
    backgroundAppliedName: "",
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
    backgroundGrantedSkills: grantedSkills,
    backgroundGrantedLanguages: grantedLanguages,
    backgroundGrantedProficiencies: grantedProficiencies,
    backgroundGrantedEquipmentIds: grantedItems.equipment.map((i) => i.id),
    backgroundGrantedWeaponIds: grantedItems.weapons.map((w) => w.id),
    backgroundCreditsApplied: bg.startingCredits,
    backgroundFeature: `${bg.featureName}. ${bg.featureText}`,
    equipment: [...base.equipment, ...grantedItems.equipment],
    weapons: [...base.weapons, ...grantedItems.weapons],
  };
}
