import type {
  AbilityKey,
  Character,
  SkillName,
  SpeciesEntry,
  SpeciesSelections,
} from "./types";
import { emptyAbilities0 } from "./types";

export const ABILITY_LABEL: Record<AbilityKey, string> = {
  str: "Strength",
  dex: "Dexterity",
  con: "Constitution",
  int: "Intelligence",
  wis: "Wisdom",
  cha: "Charisma",
};

export function speciesNeedsChoices(species: SpeciesEntry): boolean {
  if (species.abilityIncrease.humanVariant) return true;
  if (species.abilityIncrease.choices.length > 0) return true;
  if (species.languageChoice) return true;
  if (species.traits.some((t) => t.choices && t.choices.length > 0)) return true;
  return false;
}

export function revertSpecies(character: Character): Character {
  if (!character.speciesAppliedName) return character;
  const abilities = { ...character.abilities };
  (Object.keys(abilities) as AbilityKey[]).forEach((k) => {
    abilities[k] -= character.speciesAbilityBonus[k] ?? 0;
  });
  const skills = { ...character.skills };
  for (const skillName of character.speciesGrantedSkills) {
    skills[skillName] = { ...skills[skillName], proficient: false };
  }
  return {
    ...character,
    abilities,
    skills,
    speciesAppliedName: "",
    speciesAbilityBonus: emptyAbilities0(),
    speciesGrantedSkills: [],
    speciesTraitsText: "",
  };
}

export function applySpecies(
  character: Character,
  species: SpeciesEntry,
  selections: SpeciesSelections
): Character {
  const base = character.speciesAppliedName ? revertSpecies(character) : character;

  const bonus = emptyAbilities0();
  for (const [k, v] of Object.entries(species.abilityIncrease.fixed) as [AbilityKey, number][]) {
    bonus[k] += v ?? 0;
  }
  species.abilityIncrease.choices.forEach((choiceDef, i) => {
    const picked = selections.abilityChoices[i] ?? [];
    picked.forEach((ability) => {
      bonus[ability] += choiceDef.amount;
    });
  });
  if (species.abilityIncrease.humanVariant) {
    if (selections.humanFixedTwo) bonus[selections.humanFixedTwo] += 2;
    (selections.humanFixedOnes ?? []).forEach((a) => {
      bonus[a] += 1;
    });
    (selections.humanFourOnes ?? []).forEach((a) => {
      bonus[a] += 1;
    });
  }

  const abilities = { ...base.abilities };
  (Object.keys(abilities) as AbilityKey[]).forEach((k) => {
    abilities[k] += bonus[k];
  });

  const grantedSkills: SkillName[] = [];
  const skills = { ...base.skills };
  for (const trait of species.traits) {
    if (trait.grantsSkills) {
      for (const sk of trait.grantsSkills) {
        skills[sk] = { ...skills[sk], proficient: true };
        grantedSkills.push(sk);
      }
    }
    if (trait.choices) {
      const picks = selections.traitChoices[trait.name] ?? [];
      trait.choices.forEach((choiceDef, i) => {
        if (choiceDef.kind !== "skill") return;
        const chosen = (picks[i] ?? []) as SkillName[];
        chosen.forEach((sk) => {
          skills[sk] = { ...skills[sk], proficient: true };
          grantedSkills.push(sk);
        });
      });
    }
  }

  return {
    ...base,
    species: species.name,
    size: species.size,
    speedBase: species.speed,
    abilities,
    skills,
    speciesAppliedName: species.name,
    speciesAbilityBonus: bonus,
    speciesGrantedSkills: grantedSkills,
    speciesTraitsText: buildTraitsText(species, selections),
  };
}

function buildTraitsText(species: SpeciesEntry, selections: SpeciesSelections): string {
  const lines: string[] = [];

  if (species.abilityIncrease.humanVariant) {
    if (selections.humanFixedTwo) {
      const two = ABILITY_LABEL[selections.humanFixedTwo];
      const ones = (selections.humanFixedOnes ?? []).map((a) => ABILITY_LABEL[a]).join(", ");
      lines.push(`Ability Score Increase: ${two} +2; ${ones} +1 each.`);
    } else if (selections.humanFourOnes?.length) {
      const four = selections.humanFourOnes.map((a) => ABILITY_LABEL[a]).join(", ");
      lines.push(`Ability Score Increase: ${four} +1 each.`);
    }
  } else {
    const parts: string[] = [];
    for (const [k, v] of Object.entries(species.abilityIncrease.fixed) as [AbilityKey, number][]) {
      parts.push(`${ABILITY_LABEL[k]} +${v}`);
    }
    species.abilityIncrease.choices.forEach((choiceDef, i) => {
      const picked = selections.abilityChoices[i] ?? [];
      if (picked.length) {
        parts.push(`${picked.map((a) => ABILITY_LABEL[a]).join(" or ")} +${choiceDef.amount}`);
      } else {
        parts.push(
          `${choiceDef.options.map((a) => ABILITY_LABEL[a]).join(" or ")} +${choiceDef.amount} (unset)`
        );
      }
    });
    if (parts.length) lines.push(`Ability Score Increase: ${parts.join(", ")}.`);
  }

  lines.push(`Size: ${species.size}. Speed: ${species.speed} ft.`);

  const langs = [...species.knownLanguages];
  if (species.languageChoice) {
    const chosen = selections.languageChoice;
    if (chosen.length) langs.push(...chosen);
    else langs.push(`${species.languageChoice.count} language(s) of your choice (unset)`);
  }
  lines.push(`Languages: ${langs.join(", ")}.`);

  for (const trait of species.traits) {
    let line = `${trait.name}. ${trait.text}`;
    if (trait.choices?.length) {
      const picks = selections.traitChoices[trait.name] ?? [];
      const resolved = trait.choices.map((choiceDef, i) => {
        const chosen = picks[i] ?? [];
        return chosen.length ? `${choiceDef.label}: ${chosen.join(", ")}` : `${choiceDef.label}: (unset)`;
      });
      line += ` [${resolved.join("; ")}]`;
    }
    lines.push(line);
  }

  return lines.join("\n\n");
}
