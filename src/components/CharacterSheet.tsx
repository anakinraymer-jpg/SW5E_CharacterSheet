import { useEffect, useState, type CSSProperties } from "react";
import type {
  AbilityKey,
  ArchetypeEntry,
  Character,
  ClassEntry,
  ClassSelections,
  CombatFeature,
  EquipmentItem,
  Power,
  SkillName,
  SpeciesEntry,
  SpeciesSelections,
  Valuable,
  Weapon,
} from "../types";
import { saveCharacter, exportCharacter } from "../storage";
import { SPECIES_CATALOG } from "../data/species";
import { CLASSES_CATALOG } from "../data/classes";
import { ARCHETYPES_CATALOG as ARCHETYPES_CATALOG_PHB } from "../data/archetypeDetails";
import { ARCHETYPES_CATALOG_EC } from "../data/archetypeDetailsEC";

const ARCHETYPES_CATALOG = [...ARCHETYPES_CATALOG_PHB, ...ARCHETYPES_CATALOG_EC];
import { applySpecies, revertSpecies, speciesNeedsChoices } from "../speciesLogic";
import {
  applyArchetype,
  applyAsi,
  applyClass,
  classNeedsChoices,
  pendingArchetypeChoice,
  pendingAsiLevel,
  recalcArchetypeForLevel,
  recalcClassForLevel,
  revertArchetype,
  revertAsisAboveLevel,
  revertClass,
} from "../classLogic";
import IdentitySection from "./IdentitySection";
import AbilityScores from "./AbilityScores";
import SkillsSection from "./SkillsSection";
import CombatSection from "./CombatSection";
import WeaponsSection from "./WeaponsSection";
import PowersSection from "./PowersSection";
import EquipmentSection from "./EquipmentSection";
import BackstorySection from "./BackstorySection";
import SpeciesChoiceDialog from "./SpeciesChoiceDialog";
import ClassChoiceDialog from "./ClassChoiceDialog";
import AbilityImprovementDialog from "./AbilityImprovementDialog";
import ClassFeaturesSection from "./ClassFeaturesSection";
import FeatsSection from "./FeatsSection";
import FeatChoiceDialog from "./FeatChoiceDialog";
import ArchetypeChoiceDialog from "./ArchetypeChoiceDialog";
import ClassSubChoiceDialog from "./ClassSubChoiceDialog";
import { FEATS_CATALOG } from "../data/feats";
import { addFeat, featNeedsChoices, removeFeat, type FeatSelections } from "../featLogic";
import type { ClassSubChoiceDef, FeatEntry } from "../types";
import { CLASS_ACCENTS } from "../data/classFeatureChoices";
import {
  applySubChoicePicks,
  pendingSubChoice,
  recalcClassResources,
  recalcClassSubChoices,
  updateClassResource,
} from "../classFeatureLogic";

interface Props {
  initial: Character;
  onBack: () => void;
}

export default function CharacterSheet({ initial, onBack }: Props) {
  const [character, setCharacter] = useState<Character>(initial);
  const [pendingSpecies, setPendingSpecies] = useState<SpeciesEntry | null>(null);
  const [pendingClass, setPendingClass] = useState<ClassEntry | null>(null);
  const [pendingAsi, setPendingAsi] = useState<{ level: number; className: string } | null>(null);
  const [pendingFeat, setPendingFeat] = useState<FeatEntry | null>(null);
  const [pendingArchetypeClass, setPendingArchetypeClass] = useState<ClassEntry | null>(null);
  const [pendingSubChoiceDef, setPendingSubChoiceDef] = useState<{ def: ClassSubChoiceDef; needed: number } | null>(
    null
  );

  useEffect(() => {
    setCharacter(initial);
  }, [initial]);

  useEffect(() => {
    saveCharacter(character);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  // Reactive level engine: recompute class/archetype resources & feature text,
  // revert any ASI above the new level, and surface a pending ASI prompt.
  useEffect(() => {
    const classEntry = CLASSES_CATALOG.find((c) => c.name === character.classAppliedName);
    if (classEntry) {
      setCharacter((prev) => {
        const reverted = revertAsisAboveLevel(prev, prev.level);
        return recalcClassForLevel(reverted, classEntry);
      });
      const lvl = pendingAsiLevel(character, classEntry);
      if (lvl && (!pendingAsi || pendingAsi.level !== lvl)) {
        setPendingAsi({ level: lvl, className: classEntry.name });
      } else if (!lvl && pendingAsi) {
        setPendingAsi(null);
      }

      if (pendingArchetypeChoice(character, classEntry)) {
        if (!pendingArchetypeClass || pendingArchetypeClass.name !== classEntry.name) {
          setPendingArchetypeClass(classEntry);
        }
      } else if (pendingArchetypeClass) {
        setPendingArchetypeClass(null);
      }
    }
    const archetypeEntry = ARCHETYPES_CATALOG.find(
      (a) => a.name === character.archetypeAppliedName
    );
    if (archetypeEntry) {
      setCharacter((prev) => recalcArchetypeForLevel(prev, archetypeEntry));
    }

    setCharacter((prev) => recalcClassSubChoices(recalcClassResources(prev)));
    const pending = pendingSubChoice(character);
    if (pending && (!pendingSubChoiceDef || pendingSubChoiceDef.def.key !== pending.def.key)) {
      setPendingSubChoiceDef(pending);
    } else if (!pending && pendingSubChoiceDef) {
      setPendingSubChoiceDef(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.level, character.classAppliedName, character.archetypeAppliedName, character.asiChoices]);

  function update<K extends keyof Character>(key: K, value: Character[K]) {
    setCharacter((prev) => ({ ...prev, [key]: value }));
  }

  function updateAbility(key: AbilityKey, value: number) {
    setCharacter((prev) => ({
      ...prev,
      abilities: { ...prev.abilities, [key]: value },
    }));
  }

  function toggleSkillProficiency(skill: SkillName) {
    setCharacter((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: {
          proficient: !prev.skills[skill].proficient,
          expertise: !prev.skills[skill].proficient ? prev.skills[skill].expertise : false,
        },
      },
    }));
  }

  function toggleSkillExpertise(skill: SkillName) {
    setCharacter((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: {
          ...prev.skills[skill],
          expertise: !prev.skills[skill].expertise,
        },
      },
    }));
  }

  function toggleSavingThrow(key: AbilityKey) {
    setCharacter((prev) => ({
      ...prev,
      savingThrows: { ...prev.savingThrows, [key]: !prev.savingThrows[key] },
    }));
  }

  function handleSpeciesCommit(value: string) {
    const match = SPECIES_CATALOG.find(
      (s) => s.name.toLowerCase() === value.trim().toLowerCase()
    );
    if (!match) {
      if (character.speciesAppliedName) {
        setCharacter((prev) => revertSpecies(prev));
      }
      return;
    }
    if (match.name === character.speciesAppliedName) return;
    if (speciesNeedsChoices(match)) {
      setPendingSpecies(match);
    } else {
      setCharacter((prev) => applySpecies(prev, match, emptySelections()));
    }
  }

  function emptySelections(): SpeciesSelections {
    return { abilityChoices: [], languageChoice: [], traitChoices: {} };
  }

  function handleSpeciesConfirm(selections: SpeciesSelections) {
    if (!pendingSpecies) return;
    setCharacter((prev) => applySpecies(prev, pendingSpecies, selections));
    setPendingSpecies(null);
  }

  function handleClassCommit(value: string) {
    const match = CLASSES_CATALOG.find((c) => c.name.toLowerCase() === value.trim().toLowerCase());
    if (!match) {
      if (character.classAppliedName) {
        setCharacter((prev) => revertClass(prev));
      }
      return;
    }
    if (match.name === character.classAppliedName) return;
    if (classNeedsChoices(match)) {
      setPendingClass(match);
    } else {
      setCharacter((prev) => applyClass(prev, match, { skillChoice: [] }));
    }
  }

  function handleClassConfirm(selections: ClassSelections) {
    if (!pendingClass) return;
    setCharacter((prev) => applyClass(prev, pendingClass, selections));
    setPendingClass(null);
  }

  function handleArchetypeCommit(value: string) {
    const match = ARCHETYPES_CATALOG.find(
      (a) => a.name.toLowerCase() === value.trim().toLowerCase() && a.className === character.classAppliedName
    );
    if (!match) {
      if (character.archetypeAppliedName) {
        setCharacter((prev) => revertArchetype(prev));
      }
      return;
    }
    if (match.name === character.archetypeAppliedName) return;
    setCharacter((prev) => applyArchetype(prev, match));
  }

  function handleAsiConfirm(abilities: AbilityKey[]) {
    if (!pendingAsi) return;
    setCharacter((prev) => applyAsi(prev, pendingAsi.level, abilities));
    setPendingAsi(null);
  }

  function handleArchetypeChoiceConfirm(name: string) {
    if (!pendingArchetypeClass) return;
    const match = ARCHETYPES_CATALOG.find(
      (a) => a.name === name && a.className === pendingArchetypeClass.name
    );
    if (match) {
      setCharacter((prev) => applyArchetype(prev, match));
    }
    setPendingArchetypeClass(null);
  }

  function handleSubChoiceConfirm(names: string[]) {
    if (!pendingSubChoiceDef) return;
    const applied = applySubChoicePicks(character, pendingSubChoiceDef.def.key, names);
    setCharacter(applied);
    // Chain straight to the next pending sub-choice (if any) rather than waiting for a
    // level/class change to re-trigger the reactive effect.
    setPendingSubChoiceDef(pendingSubChoice(applied));
  }

  function handleUpdateResource(key: string, current: number) {
    setCharacter((prev) => updateClassResource(prev, key, current));
  }

  function handleAddFeat(name: string) {
    const match = FEATS_CATALOG.find((f) => f.name === name);
    if (!match) return;
    if (featNeedsChoices(match)) {
      setPendingFeat(match);
    } else {
      setCharacter((prev) => addFeat(prev, match, { abilityChoice: "", choiceSelections: [] }));
    }
  }

  function handleFeatConfirm(selections: FeatSelections) {
    if (!pendingFeat) return;
    setCharacter((prev) => addFeat(prev, pendingFeat, selections));
    setPendingFeat(null);
  }

  function handleRemoveFeat(id: string) {
    setCharacter((prev) => removeFeat(prev, id));
  }

  const currentClassArchetypes: ArchetypeEntry[] = ARCHETYPES_CATALOG.filter(
    (a) => a.className === character.classAppliedName
  );

  function addPower() {
    const newPower: Power = {
      id: crypto.randomUUID(),
      name: "",
      level: 0,
      type: "Force",
      alignment: "Universal",
      castingTime: "",
      range: "",
      duration: "",
      description: "",
      prepared: false,
    };
    setCharacter((prev) => ({ ...prev, powers: [...prev.powers, newPower] }));
  }

  function updatePower(id: string, patch: Partial<Power>) {
    setCharacter((prev) => ({
      ...prev,
      powers: prev.powers.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }

  function removePower(id: string) {
    setCharacter((prev) => ({
      ...prev,
      powers: prev.powers.filter((p) => p.id !== id),
    }));
  }

  function addItem() {
    const newItem: EquipmentItem = {
      id: crypto.randomUUID(),
      name: "",
      quantity: 1,
      weight: 0,
      notes: "",
      location: "Backpack",
    };
    setCharacter((prev) => ({ ...prev, equipment: [...prev.equipment, newItem] }));
  }

  function updateItem(id: string, patch: Partial<EquipmentItem>) {
    setCharacter((prev) => ({
      ...prev,
      equipment: prev.equipment.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    }));
  }

  function removeItem(id: string) {
    setCharacter((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((i) => i.id !== id),
    }));
  }

  function addWeapon() {
    const newWeapon: Weapon = {
      id: crypto.randomUUID(),
      name: "",
      attackBonus: "",
      damage: "",
      range: "",
      weight: 0,
      ammo: "",
    };
    setCharacter((prev) => ({ ...prev, weapons: [...prev.weapons, newWeapon] }));
  }

  function updateWeapon(id: string, patch: Partial<Weapon>) {
    setCharacter((prev) => ({
      ...prev,
      weapons: prev.weapons.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    }));
  }

  function removeWeapon(id: string) {
    setCharacter((prev) => ({
      ...prev,
      weapons: prev.weapons.filter((w) => w.id !== id),
    }));
  }

  function addCombatFeature() {
    const newFeature: CombatFeature = {
      id: crypto.randomUUID(),
      name: "",
      refresh: "At Will",
      used: false,
    };
    setCharacter((prev) => ({
      ...prev,
      combatFeatures: [...prev.combatFeatures, newFeature],
    }));
  }

  function updateCombatFeature(id: string, patch: Partial<CombatFeature>) {
    setCharacter((prev) => ({
      ...prev,
      combatFeatures: prev.combatFeatures.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));
  }

  function removeCombatFeature(id: string) {
    setCharacter((prev) => ({
      ...prev,
      combatFeatures: prev.combatFeatures.filter((f) => f.id !== id),
    }));
  }

  function addValuable() {
    const newValuable: Valuable = {
      id: crypto.randomUUID(),
      where: "",
      howMuch: "",
      when: "",
    };
    setCharacter((prev) => ({ ...prev, valuables: [...prev.valuables, newValuable] }));
  }

  function updateValuable(id: string, patch: Partial<Valuable>) {
    setCharacter((prev) => ({
      ...prev,
      valuables: prev.valuables.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    }));
  }

  function removeValuable(id: string) {
    setCharacter((prev) => ({
      ...prev,
      valuables: prev.valuables.filter((v) => v.id !== id),
    }));
  }

  const accent = CLASS_ACCENTS[character.classAppliedName];

  return (
    <div
      className="character-sheet-page"
      style={accent ? ({ "--accent": accent } as CSSProperties) : undefined}
    >
      <div className="sheet-toolbar">
        <button className="btn btn-secondary" onClick={onBack}>
          &larr; Back to Characters
        </button>
        <button className="btn btn-secondary" onClick={() => exportCharacter(character)}>
          Export JSON
        </button>
      </div>

      <IdentitySection
        character={character}
        update={update}
        onSpeciesCommit={handleSpeciesCommit}
        onClassCommit={handleClassCommit}
        onArchetypeCommit={handleArchetypeCommit}
        archetypeOptions={currentClassArchetypes.map((a) => a.name)}
      />

      <div className="sheet-columns">
        <div className="sheet-column">
          <AbilityScores character={character} updateAbility={updateAbility} />
          <CombatSection character={character} update={update} />
        </div>

        <div className="sheet-column">
          <SkillsSection
            character={character}
            toggleSkillProficiency={toggleSkillProficiency}
            toggleSkillExpertise={toggleSkillExpertise}
            toggleSavingThrow={toggleSavingThrow}
          />
          <WeaponsSection
            weapons={character.weapons}
            addWeapon={addWeapon}
            updateWeapon={updateWeapon}
            removeWeapon={removeWeapon}
            combatFeatures={character.combatFeatures}
            addCombatFeature={addCombatFeature}
            updateCombatFeature={updateCombatFeature}
            removeCombatFeature={removeCombatFeature}
          />
        </div>

        <div className="sheet-column">
          <PowersSection
            character={character}
            update={update}
            addPower={addPower}
            updatePower={updatePower}
            removePower={removePower}
          />
        </div>
      </div>

      <ClassFeaturesSection character={character} onUpdateResource={handleUpdateResource} />

      <FeatsSection character={character} onAddFeat={handleAddFeat} onRemoveFeat={handleRemoveFeat} />

      <EquipmentSection
        character={character}
        update={update}
        addItem={addItem}
        updateItem={updateItem}
        removeItem={removeItem}
        addValuable={addValuable}
        updateValuable={updateValuable}
        removeValuable={removeValuable}
      />

      <BackstorySection character={character} update={update} />

      {pendingSpecies && (
        <SpeciesChoiceDialog
          species={pendingSpecies}
          onCancel={() => setPendingSpecies(null)}
          onConfirm={handleSpeciesConfirm}
        />
      )}

      {pendingClass && (
        <ClassChoiceDialog
          classEntry={pendingClass}
          onCancel={() => setPendingClass(null)}
          onConfirm={handleClassConfirm}
        />
      )}

      {pendingAsi && (
        <AbilityImprovementDialog
          level={pendingAsi.level}
          className={pendingAsi.className}
          onCancel={() => setPendingAsi(null)}
          onConfirm={handleAsiConfirm}
        />
      )}

      {pendingFeat && (
        <FeatChoiceDialog
          feat={pendingFeat}
          onCancel={() => setPendingFeat(null)}
          onConfirm={handleFeatConfirm}
        />
      )}

      {pendingArchetypeClass && (
        <ArchetypeChoiceDialog
          classEntry={pendingArchetypeClass}
          options={ARCHETYPES_CATALOG.filter((a) => a.className === pendingArchetypeClass.name)}
          level={character.level}
          onCancel={() => setPendingArchetypeClass(null)}
          onConfirm={handleArchetypeChoiceConfirm}
        />
      )}

      {pendingSubChoiceDef && (
        <ClassSubChoiceDialog
          def={pendingSubChoiceDef.def}
          needed={pendingSubChoiceDef.needed}
          alreadyChosen={character.classSubChoicePicks[pendingSubChoiceDef.def.key] ?? []}
          onCancel={() => setPendingSubChoiceDef(null)}
          onConfirm={handleSubChoiceConfirm}
        />
      )}
    </div>
  );
}
