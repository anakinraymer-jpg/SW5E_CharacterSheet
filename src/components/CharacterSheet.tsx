import { useEffect, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import type {
  AbilityKey,
  ArchetypeEntry,
  BackgroundEntry,
  BackgroundSelections,
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
import { SPECIES_CATALOG as SPECIES_CATALOG_PHB } from "../data/species";
import { SPECIES_CATALOG_EC } from "../data/speciesEC";
import { SPECIES_CATALOG_HOMEBREW } from "../data/speciesHomebrew";
import { CLASSES_CATALOG } from "../data/classes";
import { BACKGROUND_CATALOG } from "../data/backgrounds";
import { ARCHETYPES_CATALOG as ARCHETYPES_CATALOG_PHB } from "../data/archetypeDetails";
import { ARCHETYPES_CATALOG_EC } from "../data/archetypeDetailsEC";

const ARCHETYPES_CATALOG = [...ARCHETYPES_CATALOG_PHB, ...ARCHETYPES_CATALOG_EC];
const SPECIES_CATALOG = [...SPECIES_CATALOG_PHB, ...SPECIES_CATALOG_EC, ...SPECIES_CATALOG_HOMEBREW];
import { applySpecies, recalcSpeciesForLevel, revertSpecies, speciesNeedsChoices } from "../speciesLogic";
import { applyBackground, backgroundNeedsChoices, revertBackground } from "../backgroundLogic";
import {
  applyArchetype,
  applyArchetypeFeatureChoice,
  applyAsi,
  applyClass,
  classNeedsChoices,
  pendingArchetypeChoice,
  pendingArchetypeFeatureChoice,
  pendingAsiLevel,
  recalcArchetypeFeatureChoices,
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
import BackgroundChoiceDialog from "./BackgroundChoiceDialog";
import ClassChoiceDialog from "./ClassChoiceDialog";
import AbilityImprovementDialog from "./AbilityImprovementDialog";
import ClassFeaturesSection from "./ClassFeaturesSection";
import FeatsSection from "./FeatsSection";
import FeatChoiceDialog from "./FeatChoiceDialog";
import ArchetypeChoiceDialog from "./ArchetypeChoiceDialog";
import ArchetypeFeatureChoiceDialog from "./ArchetypeFeatureChoiceDialog";
import ClassSubChoiceDialog from "./ClassSubChoiceDialog";
import ManeuverSwapDialog from "./ManeuverSwapDialog";
import SectionBlock from "./SectionBlock";
import HealthBar from "./HealthBar";
import { DefenseBox, InitiativeBox, ProficiencyBonusBox, SpeedBaseBox } from "./StatBoxes";
import {
  DEFAULT_LAYOUT,
  STAT_SECTIONS,
  WIDE_SECTIONS,
  getStoredLayout,
  saveLayout,
  type SectionId,
  type SheetLayout,
} from "../layout";
import { getStoredCollapsedSections, saveCollapsedSections } from "../collapsibleSections";
import { FEATS_CATALOG } from "../data/feats";
import { addFeat, featNeedsChoices, removeFeat, type FeatSelections } from "../featLogic";
import type { ClassFeature, ClassSubChoiceDef, ClassSubChoicePickDetail, FeatEntry } from "../types";
import { CLASS_ACCENTS } from "../data/classFeatureChoices";
import {
  applySubChoicePicks,
  maneuverSwapDef,
  pendingSubChoice,
  recalcClassResources,
  recalcClassSubChoices,
  swapSubChoicePick,
  updateClassResource,
} from "../classFeatureLogic";

interface Props {
  initial: Character;
  onBack: () => void;
}

export default function CharacterSheet({ initial, onBack }: Props) {
  const [character, setCharacter] = useState<Character>(initial);
  const [pendingSpecies, setPendingSpecies] = useState<SpeciesEntry | null>(null);
  const [pendingBackground, setPendingBackground] = useState<BackgroundEntry | null>(null);
  const [pendingClass, setPendingClass] = useState<ClassEntry | null>(null);
  const [pendingAsi, setPendingAsi] = useState<{ level: number; className: string } | null>(null);
  const [pendingFeat, setPendingFeat] = useState<FeatEntry | null>(null);
  const [pendingArchetypeClass, setPendingArchetypeClass] = useState<ClassEntry | null>(null);
  const [pendingSubChoiceDef, setPendingSubChoiceDef] = useState<{ def: ClassSubChoiceDef; needed: number } | null>(
    null
  );
  const [pendingArchetypeFeature, setPendingArchetypeFeature] = useState<ClassFeature | null>(null);
  const [maneuverSwapOpen, setManeuverSwapOpen] = useState(false);
  const [editLayout, setEditLayout] = useState(false);
  const [layout, setLayout] = useState<SheetLayout>(() => getStoredLayout());
  const [draggedId, setDraggedId] = useState<SectionId | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() =>
    getStoredCollapsedSections()
  );

  function toggleSection(id: string) {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  useEffect(() => {
    setCharacter(initial);
  }, [initial]);

  useEffect(() => {
    saveCharacter(character);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  useEffect(() => {
    saveCollapsedSections(collapsedSections);
  }, [collapsedSections]);

  // Reactive level engine: recompute class/archetype resources & feature text,
  // revert any ASI above the new level, and surface a pending ASI prompt.
  useEffect(() => {
    const speciesEntry = SPECIES_CATALOG.find((s) => s.name === character.speciesAppliedName);
    if (speciesEntry) {
      setCharacter((prev) => recalcSpeciesForLevel(prev, speciesEntry));
    }
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
      setCharacter((prev) => recalcArchetypeFeatureChoices(recalcArchetypeForLevel(prev, archetypeEntry), archetypeEntry));
      const pendingFeature = pendingArchetypeFeatureChoice(character, archetypeEntry);
      if (pendingFeature && pendingFeature.name !== pendingArchetypeFeature?.name) {
        setPendingArchetypeFeature(pendingFeature);
      } else if (!pendingFeature && pendingArchetypeFeature) {
        setPendingArchetypeFeature(null);
      }
    } else if (pendingArchetypeFeature) {
      setPendingArchetypeFeature(null);
    }

    setCharacter((prev) => recalcClassSubChoices(recalcClassResources(prev)));
    const pending = pendingSubChoice(character);
    if (pending && (!pendingSubChoiceDef || pendingSubChoiceDef.def.key !== pending.def.key)) {
      setPendingSubChoiceDef(pending);
    } else if (!pending && pendingSubChoiceDef) {
      setPendingSubChoiceDef(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    character.level,
    character.classAppliedName,
    character.archetypeAppliedName,
    character.asiChoices,
    character.speciesAppliedName,
    character.abilities,
    character.forceCastingAbility,
  ]);

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

  function handleBackgroundCommit(value: string) {
    const match = BACKGROUND_CATALOG.find(
      (b) => b.name.toLowerCase() === value.trim().toLowerCase()
    );
    if (!match) {
      if (character.backgroundAppliedName) {
        setCharacter((prev) => revertBackground(prev));
      }
      return;
    }
    if (match.name === character.backgroundAppliedName) return;
    if (backgroundNeedsChoices(match)) {
      setPendingBackground(match);
    } else {
      setCharacter((prev) =>
        applyBackground(prev, match, { skillChoice: [], languageChoice: [], toolChoice: [] })
      );
    }
  }

  function handleBackgroundConfirm(selections: BackgroundSelections) {
    if (!pendingBackground) return;
    setCharacter((prev) => applyBackground(prev, pendingBackground, selections));
    setPendingBackground(null);
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
      setCharacter((prev) =>
        applyClass(prev, match, {
          skillChoice: [],
          toolChoice: [],
          equipmentChoice: [],
          equipmentItemChoices: [],
          useStartingFunds: false,
          rolledFunds: 0,
        })
      );
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

  function handleSubChoiceConfirm(names: string[], details: ClassSubChoicePickDetail[]) {
    if (!pendingSubChoiceDef) return;
    const applied = applySubChoicePicks(character, pendingSubChoiceDef.def.key, names, details);
    setCharacter(applied);
    // Chain straight to the next pending sub-choice (if any) rather than waiting for a
    // level/class change to re-trigger the reactive effect.
    setPendingSubChoiceDef(pendingSubChoice(applied));
  }

  function handleManeuverSwapConfirm(index: number, newName: string) {
    const def = maneuverSwapDef(character);
    if (!def) return;
    setCharacter((prev) => swapSubChoicePick(prev, def.key, index, newName));
    setManeuverSwapOpen(false);
  }

  function handleArchetypeFeatureChoiceConfirm(selections: string[][]) {
    if (!pendingArchetypeFeature) return;
    const archetypeEntry = ARCHETYPES_CATALOG.find((a) => a.name === character.archetypeAppliedName);
    if (!archetypeEntry) return;
    const applied = applyArchetypeFeatureChoice(character, archetypeEntry, pendingArchetypeFeature.name, selections);
    setCharacter(applied);
    setPendingArchetypeFeature(pendingArchetypeFeatureChoice(applied, archetypeEntry));
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

  function addPower(type: Power["type"]) {
    const newPower: Power = {
      id: crypto.randomUUID(),
      name: "",
      level: 0,
      type,
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
      equipped: false,
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
      proficient: true,
      damage: "",
      range: "",
      weight: 0,
      ammoCount: 0,
      ammoType: "",
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

  function handleSectionHandlePointerDown(id: SectionId, e: ReactPointerEvent) {
    e.preventDefault();
    setDraggedId(id);
  }

  function removeFromLayout(current: SheetLayout, id: SectionId): SheetLayout {
    return {
      statRow: current.statRow.filter((x) => x !== id),
      columns: current.columns.map((col) => col.filter((x) => x !== id)) as SheetLayout["columns"],
      wide: current.wide.filter((x) => x !== id),
    };
  }

  // Pointer Events (not the HTML5 Drag and Drop API) so reordering works with touch as well
  // as mouse — native HTML5 drag-and-drop isn't supported by touch input on mobile browsers.
  // Stat sections only reorder within the stat row; narrow sections can move between/within
  // the 3 columns; wide sections only reorder among themselves, since a full-width table
  // doesn't make sense squeezed into a narrow column.
  useEffect(() => {
    if (!draggedId) return;
    const dragging = draggedId;
    const isStat = STAT_SECTIONS.includes(dragging);
    const isWide = WIDE_SECTIONS.includes(dragging);

    function handlePointerMove(e: globalThis.PointerEvent) {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const overBlock = target?.closest<HTMLElement>(".sheet-block[data-section-id]");
      const overId = overBlock?.dataset.sectionId as SectionId | undefined;
      if (overId === dragging) return;

      setLayout((prev) => {
        const without = removeFromLayout(prev, dragging);

        if (isStat) {
          const overStatRow = target?.closest<HTMLElement>(".sheet-stat-row");
          if (!overStatRow) return prev;
          let insertAt = without.statRow.length;
          if (overId) {
            const idx = without.statRow.indexOf(overId);
            if (idx !== -1) insertAt = idx;
          }
          const nextStatRow = [...without.statRow];
          nextStatRow.splice(insertAt, 0, dragging);
          return { ...without, statRow: nextStatRow };
        }

        if (isWide) {
          const overWideStack = target?.closest<HTMLElement>(".sheet-wide-stack");
          if (!overWideStack) return prev;
          let insertAt = without.wide.length;
          if (overId) {
            const idx = without.wide.indexOf(overId);
            if (idx !== -1) insertAt = idx;
          }
          const nextWide = [...without.wide];
          nextWide.splice(insertAt, 0, dragging);
          return { ...without, wide: nextWide };
        }

        let columnIndex = -1;
        if (overId) {
          columnIndex = without.columns.findIndex((col) => col.includes(overId));
        } else {
          const overColumn = target?.closest<HTMLElement>(".sheet-column[data-column-index]");
          if (overColumn) columnIndex = Number(overColumn.dataset.columnIndex);
        }
        if (columnIndex < 0) return prev;

        const targetColumn = without.columns[columnIndex];
        let insertAt = targetColumn.length;
        if (overId) {
          const idx = targetColumn.indexOf(overId);
          if (idx !== -1) insertAt = idx;
        }
        const nextColumns = without.columns.map((col, i) => {
          if (i !== columnIndex) return col;
          const next = [...col];
          next.splice(insertAt, 0, dragging);
          return next;
        }) as SheetLayout["columns"];
        return { ...without, columns: nextColumns };
      });
    }

    function handlePointerUp() {
      setDraggedId(null);
      setLayout((current) => {
        saveLayout(current);
        return current;
      });
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [draggedId]);

  function handleResetLayout() {
    const fresh: SheetLayout = {
      statRow: [...DEFAULT_LAYOUT.statRow],
      columns: [[...DEFAULT_LAYOUT.columns[0]], [...DEFAULT_LAYOUT.columns[1]], [...DEFAULT_LAYOUT.columns[2]]],
      wide: [...DEFAULT_LAYOUT.wide],
    };
    setLayout(fresh);
    saveLayout(fresh);
  }

  const accent = CLASS_ACCENTS[character.classAppliedName];

  // ClassFeaturesSection renders nothing until a class/archetype is applied — skip its
  // block entirely rather than showing an empty draggable box in edit mode.
  const hasClassFeaturesContent = Boolean(character.classTraitsText || character.archetypeTraitsText);

  function renderSectionContent(id: SectionId) {
    switch (id) {
      case "defense":
        return <DefenseBox character={character} update={update} />;
      case "initiative":
        return <InitiativeBox character={character} update={update} />;
      case "proficiencyBonus":
        return <ProficiencyBonusBox character={character} update={update} />;
      case "speedBase":
        return <SpeedBaseBox character={character} update={update} />;
      case "abilities":
        return (
          <AbilityScores
            character={character}
            updateAbility={updateAbility}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
          />
        );
      case "combat":
        return (
          <CombatSection
            character={character}
            update={update}
            updateItem={updateItem}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
          />
        );
      case "skills":
        return (
          <SkillsSection
            character={character}
            toggleSkillProficiency={toggleSkillProficiency}
            toggleSkillExpertise={toggleSkillExpertise}
            toggleSavingThrow={toggleSavingThrow}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
          />
        );
      case "weapons":
        return (
          <WeaponsSection
            character={character}
            weapons={character.weapons}
            addWeapon={addWeapon}
            updateWeapon={updateWeapon}
            removeWeapon={removeWeapon}
            combatFeatures={character.combatFeatures}
            addCombatFeature={addCombatFeature}
            updateCombatFeature={updateCombatFeature}
            removeCombatFeature={removeCombatFeature}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
          />
        );
      case "powers":
        return (
          <PowersSection
            character={character}
            update={update}
            addPower={addPower}
            updatePower={updatePower}
            removePower={removePower}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
          />
        );
      case "classFeatures":
        return (
          <ClassFeaturesSection
            character={character}
            update={update}
            onUpdateResource={handleUpdateResource}
            onOpenManeuverSwap={() => setManeuverSwapOpen(true)}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
          />
        );
      case "feats":
        return (
          <FeatsSection
            character={character}
            onAddFeat={handleAddFeat}
            onRemoveFeat={handleRemoveFeat}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
          />
        );
      case "equipment":
        return (
          <EquipmentSection
            character={character}
            update={update}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
            addValuable={addValuable}
            updateValuable={updateValuable}
            removeValuable={removeValuable}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
          />
        );
      case "backstory":
        return (
          <BackstorySection
            character={character}
            update={update}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
          />
        );
    }
  }

  return (
    <div
      className="character-sheet-page"
      style={accent ? ({ "--accent": accent } as CSSProperties) : undefined}
    >
      <div className="sheet-toolbar">
        <button className="btn btn-secondary" onClick={onBack}>
          &larr; Back to Characters
        </button>
        <div className="sheet-toolbar-right">
          {editLayout && (
            <button className="btn btn-secondary" onClick={handleResetLayout}>
              Reset Layout
            </button>
          )}
          <button
            className={`btn ${editLayout ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setEditLayout((v) => !v)}
          >
            {editLayout ? "Done Editing" : "Edit Layout"}
          </button>
          <button className="btn btn-secondary" onClick={() => exportCharacter(character)}>
            Export JSON
          </button>
        </div>
      </div>

      <IdentitySection
        character={character}
        update={update}
        onSpeciesCommit={handleSpeciesCommit}
        onClassCommit={handleClassCommit}
        onArchetypeCommit={handleArchetypeCommit}
        onBackgroundCommit={handleBackgroundCommit}
        archetypeOptions={currentClassArchetypes.map((a) => a.name)}
      />

      <HealthBar character={character} update={update} />

      <div className="sheet-stat-row">
        {layout.statRow.map((id) => (
          <SectionBlock
            key={id}
            id={id}
            editMode={editLayout}
            isDragging={draggedId === id}
            onHandlePointerDown={handleSectionHandlePointerDown}
          >
            {renderSectionContent(id)}
          </SectionBlock>
        ))}
      </div>

      <div className="sheet-columns-wrap">
        {layout.columns.map((col, i) => (
          <div
            key={i}
            className={`sheet-column${editLayout ? " edit-mode" : ""}`}
            data-column-index={i}
          >
            {col.map((id) => (
              <SectionBlock
                key={id}
                id={id}
                editMode={editLayout}
                isDragging={draggedId === id}
                onHandlePointerDown={handleSectionHandlePointerDown}
              >
                {renderSectionContent(id)}
              </SectionBlock>
            ))}
          </div>
        ))}
      </div>

      <div className="sheet-wide-stack">
        {layout.wide
          .filter((id) => id !== "classFeatures" || hasClassFeaturesContent)
          .map((id) => (
            <SectionBlock
              key={id}
              id={id}
              editMode={editLayout}
              isDragging={draggedId === id}
              onHandlePointerDown={handleSectionHandlePointerDown}
            >
              {renderSectionContent(id)}
            </SectionBlock>
          ))}
      </div>

      {pendingSpecies && (
        <SpeciesChoiceDialog
          species={pendingSpecies}
          skills={character.skills}
          onCancel={() => setPendingSpecies(null)}
          onConfirm={handleSpeciesConfirm}
        />
      )}

      {pendingBackground && (
        <BackgroundChoiceDialog
          background={pendingBackground}
          skills={character.skills}
          onCancel={() => setPendingBackground(null)}
          onConfirm={handleBackgroundConfirm}
        />
      )}

      {pendingClass && (
        <ClassChoiceDialog
          classEntry={pendingClass}
          skills={character.skills}
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
          skills={character.skills}
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

      {pendingArchetypeFeature && (
        <ArchetypeFeatureChoiceDialog
          key={pendingArchetypeFeature.name}
          feature={pendingArchetypeFeature}
          skills={character.skills}
          onCancel={() => setPendingArchetypeFeature(null)}
          onConfirm={handleArchetypeFeatureChoiceConfirm}
        />
      )}

      {pendingSubChoiceDef && (
        <ClassSubChoiceDialog
          key={`${pendingSubChoiceDef.def.key}-${(character.classSubChoicePicks[pendingSubChoiceDef.def.key] ?? []).length}-${pendingSubChoiceDef.needed}`}
          def={pendingSubChoiceDef.def}
          needed={pendingSubChoiceDef.needed}
          alreadyChosen={character.classSubChoicePicks[pendingSubChoiceDef.def.key] ?? []}
          skills={character.skills}
          onCancel={() => setPendingSubChoiceDef(null)}
          onConfirm={handleSubChoiceConfirm}
        />
      )}

      {maneuverSwapOpen &&
        (() => {
          const def = maneuverSwapDef(character);
          if (!def) return null;
          return (
            <ManeuverSwapDialog
              def={def}
              knownPicks={character.classSubChoicePicks[def.key] ?? []}
              skills={character.skills}
              onCancel={() => setManeuverSwapOpen(false)}
              onConfirm={handleManeuverSwapConfirm}
            />
          );
        })()}
    </div>
  );
}
