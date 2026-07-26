import type { Character } from "./types";
import { CLASSES_CATALOG } from "./data/classes";
import { grantedLanguagesFromFeat, grantedProficienciesFromFeat } from "./featLogic";
import { grantedProficienciesFromSubChoices } from "./classFeatureLogic";

export function grantedLanguages(character: Character): string[] {
  const out = [...character.speciesGrantedLanguages];
  for (const feat of character.feats) {
    out.push(...grantedLanguagesFromFeat(feat));
  }
  return [...new Set(out)];
}

export function grantedProficiencies(character: Character): string[] {
  const out = [...character.speciesGrantedProficiencies];
  for (const feat of character.feats) {
    out.push(...grantedProficienciesFromFeat(feat));
  }
  const classEntry = CLASSES_CATALOG.find((c) => c.name === character.classAppliedName);
  const tool = classEntry?.toolProficiency?.trim();
  if (tool && !/^(none|-)$/i.test(tool)) {
    out.push(`${tool} (Class)`);
  }
  out.push(...grantedProficienciesFromSubChoices(character));
  return [...new Set(out)];
}
