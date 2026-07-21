import { useState } from "react";
import type { ClassEntry, ClassSelections } from "../types";
import Modal from "./Modal";

interface Props {
  classEntry: ClassEntry;
  onCancel: () => void;
  onConfirm: (selections: ClassSelections) => void;
}

export default function ClassChoiceDialog({ classEntry, onCancel, onConfirm }: Props) {
  const [skillChoice, setSkillChoice] = useState<string[]>(
    Array(classEntry.skillChoice.count).fill("")
  );

  const isComplete = skillChoice.every(Boolean) && new Set(skillChoice).size === skillChoice.length;

  return (
    <Modal
      title={`${classEntry.name} Skills`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!isComplete}
            onClick={() => onConfirm({ skillChoice })}
          >
            Apply
          </button>
        </>
      }
    >
      <p className="section-hint">
        Saving throws, hit dice, and other fixed proficiencies apply automatically. Choose your
        starting skills below ({classEntry.skillChoice.count} from the {classEntry.name} list).
      </p>
      <div className="choice-group">
        <div className="choice-group-label">Skills</div>
        <div className="choice-selects">
          {skillChoice.map((v, i) => (
            <select
              key={i}
              value={v}
              onChange={(e) => {
                const next = [...skillChoice];
                next[i] = e.target.value;
                setSkillChoice(next);
              }}
            >
              <option value="">Choose…</option>
              {classEntry.skillChoice.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
    </Modal>
  );
}
