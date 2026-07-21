import { useState } from "react";
import type { ClassSubChoiceDef } from "../types";
import Modal from "./Modal";

interface Props {
  def: ClassSubChoiceDef;
  needed: number;
  alreadyChosen: string[];
  onCancel: () => void;
  onConfirm: (names: string[]) => void;
}

export default function ClassSubChoiceDialog({ def, needed, alreadyChosen, onCancel, onConfirm }: Props) {
  const [picks, setPicks] = useState<string[]>(Array(needed).fill(""));

  const takenElsewhere = new Set(alreadyChosen);
  const isComplete = picks.every(Boolean) && new Set(picks).size === picks.length;

  return (
    <Modal
      title={`${def.label} (${needed} to choose)`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={!isComplete} onClick={() => onConfirm(picks)}>
            Confirm
          </button>
        </>
      }
    >
      <p className="section-hint">Pick {needed} option{needed > 1 ? "s" : ""} below.</p>
      <div className="choice-group">
        <div className="choice-selects">
          {picks.map((v, i) => (
            <select
              key={i}
              value={v}
              onChange={(e) => {
                const next = [...picks];
                next[i] = e.target.value;
                setPicks(next);
              }}
            >
              <option value="">Choose…</option>
              {def.options
                .filter((o) => !takenElsewhere.has(o.name))
                .map((o) => (
                  <option key={o.name} value={o.name}>
                    {o.name}
                    {o.prerequisite ? ` (${o.prerequisite})` : ""}
                  </option>
                ))}
            </select>
          ))}
        </div>
      </div>

      {def.options.map((o) => (
        <div className="choice-group" key={o.name}>
          <div className="choice-group-label">
            {o.name}
            {o.prerequisite ? ` — Prerequisite: ${o.prerequisite}` : ""}
          </div>
          <div className="choice-group-hint">{o.text}</div>
        </div>
      ))}
    </Modal>
  );
}
