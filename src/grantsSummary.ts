import type { Character } from "./types";
import { CLASSES_CATALOG } from "./data/classes";
import { ARCHETYPES_CATALOG as ARCHETYPES_CATALOG_PHB } from "./data/archetypeDetails";
import { ARCHETYPES_CATALOG_EC } from "./data/archetypeDetailsEC";
import { grantedLanguagesFromFeat, grantedProficienciesFromFeat } from "./featLogic";
import { grantedProficienciesFromSubChoices, grantedLanguagesFromSubChoices } from "./classFeatureLogic";
import { grantedLanguagesFromArchetypeFeatures, grantedProficienciesFromArchetypeFeatures } from "./classLogic";

const ARCHETYPES_CATALOG = [...ARCHETYPES_CATALOG_PHB, ...ARCHETYPES_CATALOG_EC];

export function grantedLanguages(character: Character): string[] {
  const out = [...character.speciesGrantedLanguages, ...character.backgroundGrantedLanguages];
  for (const feat of character.feats) {
    out.push(...grantedLanguagesFromFeat(feat));
  }
  out.push(...grantedLanguagesFromSubChoices(character));
  const archetypeEntry = ARCHETYPES_CATALOG.find((a) => a.name === character.archetypeAppliedName);
  out.push(...grantedLanguagesFromArchetypeFeatures(character, archetypeEntry));
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
  const archetypeEntry = ARCHETYPES_CATALOG.find((a) => a.name === character.archetypeAppliedName);
  out.push(...grantedProficienciesFromArchetypeFeatures(character, archetypeEntry));
  out.push(...character.backgroundGrantedProficiencies);
  return [...new Set(out)];
}
