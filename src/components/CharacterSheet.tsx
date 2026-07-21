import { useEffect, useState } from "react";
import type { AbilityKey, Character, EquipmentItem, Power, SkillName } from "../types";
import { saveCharacter, exportCharacter } from "../storage";
import IdentitySection from "./IdentitySection";
import AbilityScores from "./AbilityScores";
import SkillsSection from "./SkillsSection";
import CombatSection from "./CombatSection";
import PowersSection from "./PowersSection";
import EquipmentSection from "./EquipmentSection";
import NotesSection from "./NotesSection";

interface Props {
  initial: Character;
  onBack: () => void;
}

export default function CharacterSheet({ initial, onBack }: Props) {
  const [character, setCharacter] = useState<Character>(initial);

  useEffect(() => {
    setCharacter(initial);
  }, [initial]);

  useEffect(() => {
    saveCharacter(character);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

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

  function addPower() {
    const newPower: Power = {
      id: crypto.randomUUID(),
      name: "",
      level: 0,
      type: "Force",
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

  return (
    <div className="character-sheet-page">
      <div className="sheet-toolbar">
        <button className="btn btn-secondary" onClick={onBack}>
          &larr; Back to Characters
        </button>
        <button className="btn btn-secondary" onClick={() => exportCharacter(character)}>
          Export JSON
        </button>
      </div>

      <IdentitySection character={character} update={update} />

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

      <EquipmentSection
        character={character}
        update={update}
        addItem={addItem}
        updateItem={updateItem}
        removeItem={removeItem}
      />

      <NotesSection character={character} update={update} />
    </div>
  );
}
