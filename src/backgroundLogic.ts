import type { BackgroundEntry, BackgroundSelections, Character, SkillName } from "./types";

export function backgroundNeedsChoices(bg: BackgroundEntry): boolean {
  return bg.skillChoice.count > 0 || bg.languages.choiceCount > 0;
}

export function revertBackground(character: Character): Character {
  if (!character.backgroundAppliedName) return character;
  const skills = { ...character.skills };
  for (const skillName of character.backgroundGrantedSkills) {
    skills[skillName] = { ...skills[skillName], proficient: false };
  }
  return {
    ...character,
    skills,
    credits: character.credits - character.backgroundCreditsApplied,
    backgroundAppliedName: "",
    backgroundGrantedSkills: [],
    backgroundGrantedLanguages: [],
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

  return {
    ...base,
    background: bg.name,
    skills,
    credits: base.credits + bg.startingCredits,
    backgroundAppliedName: bg.name,
    backgroundGrantedSkills: grantedSkills,
    backgroundGrantedLanguages: grantedLanguages,
    backgroundCreditsApplied: bg.startingCredits,
    backgroundFeature: `${bg.featureName}. ${bg.featureText}`,
  };
}
