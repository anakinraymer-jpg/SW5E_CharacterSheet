import type { AbilityKey, Character, CharacterFeat, FeatEntry, SkillName } from "./types";
import { ABILITY_LABEL } from "./speciesLogic";
import { FEATS_CATALOG } from "./data/feats";

const FEATS_BY_NAME = new Map(FEATS_CATALOG.map((f) => [f.name, f]));

export function featNeedsChoices(feat: FeatEntry): boolean {
  if (feat.abilityOptions.length > 1) return true;
  if (feat.choices && feat.choices.length > 0) return true;
  return false;
}

export interface FeatSelections {
  abilityChoice: AbilityKey | "";
  choiceSelections: string[][];
}

export function addFeat(character: Character, feat: FeatEntry, selections: FeatSelections): Character {
  const bonus = { ...character.featAbilityBonus };
  const abilities = { ...character.abilities };
  const abilityChosen: AbilityKey[] = [];

  if (feat.abilityOptions.length === 1) {
    const a = feat.abilityOptions[0];
    bonus[a] += 1;
    abilities[a] += 1;
    abilityChosen.push(a);
  } else if (feat.abilityOptions.length > 1 && selections.abilityChoice) {
    const a = selections.abilityChoice;
    bonus[a] += 1;
    abilities[a] += 1;
    abilityChosen.push(a);
  }

  const skills = { ...character.skills };
  let skillProficiencyGranted: SkillName | undefined;
  let skillExpertiseGranted: SkillName | undefined;
  if (feat.grantsSkill) {
    if (skills[feat.grantsSkill].proficient) {
      skills[feat.grantsSkill] = { ...skills[feat.grantsSkill], expertise: true };
      skillExpertiseGranted = feat.grantsSkill;
    } else {
      skills[feat.grantsSkill] = { ...skills[feat.grantsSkill], proficient: true };
      skillProficiencyGranted = feat.grantsSkill;
    }
  }

  const savingThrows = { ...character.savingThrows };
  let savingThrowGranted: AbilityKey | undefined;
  if (feat.grantsSavingThrowForAbilityChoice && abilityChosen.length) {
    savingThrows[abilityChosen[0]] = true;
    savingThrowGranted = abilityChosen[0];
  }

  feat.choices?.forEach((choiceDef, i) => {
    if (choiceDef.kind !== "skill") return;
    const chosen = (selections.choiceSelections[i] ?? []).filter(Boolean) as SkillName[];
    chosen.forEach((sk) => {
      skills[sk] = { ...skills[sk], proficient: true };
    });
  });

  const characterFeat: CharacterFeat = {
    id: crypto.randomUUID(),
    name: feat.name,
    abilityChosen,
    skillProficiencyGranted,
    skillExpertiseGranted,
    savingThrowGranted,
    choiceSelections: selections.choiceSelections.map((arr) => arr.filter(Boolean)),
  };

  return {
    ...character,
    abilities,
    skills,
    savingThrows,
    featAbilityBonus: bonus,
    feats: [...character.feats, characterFeat],
  };
}

export function removeFeat(character: Character, featId: string): Character {
  const cf = character.feats.find((f) => f.id === featId);
  if (!cf) return character;
  const feat = FEATS_BY_NAME.get(cf.name);

  const bonus = { ...character.featAbilityBonus };
  const abilities = { ...character.abilities };
  cf.abilityChosen.forEach((a) => {
    bonus[a] -= 1;
    abilities[a] -= 1;
  });

  const skills = { ...character.skills };
  if (cf.skillProficiencyGranted) {
    skills[cf.skillProficiencyGranted] = { ...skills[cf.skillProficiencyGranted], proficient: false };
  }
  if (cf.skillExpertiseGranted) {
    skills[cf.skillExpertiseGranted] = { ...skills[cf.skillExpertiseGranted], expertise: false };
  }
  feat?.choices?.forEach((choiceDef, i) => {
    if (choiceDef.kind !== "skill") return;
    const chosen = (cf.choiceSelections[i] ?? []) as SkillName[];
    chosen.forEach((sk) => {
      skills[sk] = { ...skills[sk], proficient: false };
    });
  });

  const savingThrows = { ...character.savingThrows };
  if (cf.savingThrowGranted) {
    savingThrows[cf.savingThrowGranted] = false;
  }

  return {
    ...character,
    abilities,
    skills,
    savingThrows,
    featAbilityBonus: bonus,
    feats: character.feats.filter((f) => f.id !== featId),
  };
}

export function buildFeatText(feat: FeatEntry, cf: CharacterFeat): string {
  const extras: string[] = [];
  if (cf.abilityChosen.length) {
    extras.push(`Ability Score Increase: ${cf.abilityChosen.map((a) => ABILITY_LABEL[a]).join(", ")} +1`);
  }
  if (cf.savingThrowGranted) {
    extras.push(`Saving Throw Proficiency: ${ABILITY_LABEL[cf.savingThrowGranted]}`);
  }
  feat.choices?.forEach((choiceDef, i) => {
    const chosen = cf.choiceSelections[i] ?? [];
    extras.push(chosen.length ? `${choiceDef.label}: ${chosen.join(", ")}` : `${choiceDef.label}: (unset)`);
  });
  return extras.length ? `${feat.text}\n\n[${extras.join("; ")}]` : feat.text;
}
