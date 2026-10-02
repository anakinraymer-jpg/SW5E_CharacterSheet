import type { AbilityKey, Character, CharacterFeat, FeatEntry, SkillName } from "./types";
import { isSkillName } from "./types";
import { ABILITY_LABEL } from "./speciesLogic";
import { FEATS_CATALOG } from "./data/feats";
import { appendFragment, removeFragment, revokeSkill, saveGrantedByOther } from "./grantOwnership";

const FEATS_BY_NAME = new Map(FEATS_CATALOG.map((f) => [f.name, f]));

export function hasFeat(character: Character, name: string): boolean {
  return character.feats.some((f) => f.name === name);
}

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
    if (!savingThrows[abilityChosen[0]]) {
      savingThrows[abilityChosen[0]] = true;
      savingThrowGranted = abilityChosen[0];
    }
  } else if (feat.grantsSavingThrow && !savingThrows[feat.grantsSavingThrow]) {
    savingThrows[feat.grantsSavingThrow] = true;
    savingThrowGranted = feat.grantsSavingThrow;
  }

  // Only skills the feat newly made proficient are remembered, so removing it can't strip a skill
  // the character already had from elsewhere.
  const choiceSkillsGranted: SkillName[] = [];
  feat.choices?.forEach((choiceDef, i) => {
    if (choiceDef.kind !== "skill" && choiceDef.kind !== "skillOrTool") return;
    const chosen = (selections.choiceSelections[i] ?? []).filter(Boolean);
    chosen.forEach((val) => {
      if (!isSkillName(val) || skills[val].proficient) return;
      skills[val] = { ...skills[val], proficient: true };
      choiceSkillsGranted.push(val);
    });
  });

  const characterFeat: CharacterFeat = {
    id: crypto.randomUUID(),
    name: feat.name,
    abilityChosen,
    skillProficiencyGranted,
    skillExpertiseGranted,
    savingThrowGranted,
    choiceSkillsGranted,
    choiceSelections: selections.choiceSelections.map((arr) => arr.filter(Boolean)),
  };

  // Non-destructively append this feat's advantage/resistance blurb to the Combat tab's
  // Advantages/Resistances/Immunities field, unless it's already present (e.g. re-adding after undo).
  const resistances = appendFragment(character.resistances, feat.grantsResistance ?? "");

  return {
    ...character,
    abilities,
    skills,
    savingThrows,
    featAbilityBonus: bonus,
    feats: [...character.feats, characterFeat],
    resistances,
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

  const ex = { ignoreFeatId: cf.id };
  const skills = { ...character.skills };
  if (cf.skillProficiencyGranted) {
    revokeSkill(skills, cf.skillProficiencyGranted, character, ex);
  }
  if (cf.skillExpertiseGranted) {
    skills[cf.skillExpertiseGranted] = { ...skills[cf.skillExpertiseGranted], expertise: false };
  }
  // Feats added before choice skills were tracked fall back to every skill their choices named.
  const choiceSkills: string[] =
    cf.choiceSkillsGranted ??
    (feat?.choices ?? []).flatMap((choiceDef, i) =>
      choiceDef.kind === "skill" || choiceDef.kind === "skillOrTool" ? (cf.choiceSelections[i] ?? []) : []
    );
  for (const val of choiceSkills) {
    if (isSkillName(val)) revokeSkill(skills, val, character, ex);
  }

  const savingThrows = { ...character.savingThrows };
  if (cf.savingThrowGranted && !saveGrantedByOther(character, cf.savingThrowGranted, ex)) {
    savingThrows[cf.savingThrowGranted] = false;
  }

  // Remove this feat's auto-filled resistance blurb (unless another copy of the same feat still
  // needs it), leaving any other text — species-granted or player-typed — untouched.
  const blurbStillNeeded = character.feats.some((f) => f.id !== cf.id && f.name === cf.name);
  const resistances =
    feat?.grantsResistance && !blurbStillNeeded
      ? removeFragment(character.resistances, feat.grantsResistance)
      : character.resistances;

  return {
    ...character,
    abilities,
    skills,
    savingThrows,
    featAbilityBonus: bonus,
    feats: character.feats.filter((f) => f.id !== featId),
    resistances,
  };
}

export function grantedLanguagesFromFeat(cf: CharacterFeat): string[] {
  const feat = FEATS_BY_NAME.get(cf.name);
  if (!feat?.choices) return [];
  const out: string[] = [];
  feat.choices.forEach((choiceDef, i) => {
    if (choiceDef.kind !== "language") return;
    out.push(...(cf.choiceSelections[i] ?? []));
  });
  return out;
}

export function grantedProficienciesFromFeat(cf: CharacterFeat): string[] {
  const feat = FEATS_BY_NAME.get(cf.name);
  if (!feat) return [];
  const out: string[] = [];
  if (feat.grantsProficiency) out.push(feat.grantsProficiency);
  feat.choices?.forEach((choiceDef, i) => {
    if (choiceDef.kind === "skill" || choiceDef.kind === "language") return;
    const chosen = cf.choiceSelections[i] ?? [];
    chosen.forEach((val) => {
      if (choiceDef.kind === "skillOrTool" && isSkillName(val)) return;
      out.push(`${val} (${choiceDef.label})`);
    });
  });
  return out;
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
