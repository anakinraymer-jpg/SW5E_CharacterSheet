import { useState } from "react";
import type { ArchetypeEntry, ClassEntry } from "../types";
import { archetypeFeaturesText } from "../classLogic";
import Modal from "./Modal";

interface Props {
  classEntry: ClassEntry;
  options: ArchetypeEntry[];
  level: number;
  onCancel: () => void;
  onConfirm: (archetypeName: string) => void;
}

export default function ArchetypeChoiceDialog({ classEntry, options, level, onCancel, onConfirm }: Props) {
  const [selected, setSelected] = useState("");

  return (
    <Modal
      title={`${classEntry.name} — Choose Your Archetype (Level ${classEntry.archetypeLevel})`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!selected}
            onClick={() => onConfirm(selected)}
          >
            Choose Archetype
          </button>
        </>
      }
    >
      <p className="section-hint">
        Your {classEntry.name} has reached level {classEntry.archetypeLevel} and gains an
        archetype. Read through the options below and pick one — only features unlocked at your
        current level ({level}) are shown; more will appear as you level up.
      </p>

      {options.map((a) => (
        <label className="archetype-choice-card" key={a.name}>
          <div className="archetype-choice-header">
            <input
              type="radio"
              name="archetype-choice"
              checked={selected === a.name}
              onChange={() => setSelected(a.name)}
            />
            <span>{a.name}</span>
          </div>
          {archetypeFeaturesText(a, level)
            .split("\n\n")
            .map((line, i) => (
              <p key={i} className="species-trait-line">
                {line}
              </p>
            ))}
        </label>
      ))}
    </Modal>
  );
}
