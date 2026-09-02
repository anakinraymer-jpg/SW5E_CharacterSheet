import { useState } from "react";
import type { ClassSubChoiceDef, SkillName, SkillState } from "../types";
import { chainPrerequisiteName, isVisibleOption } from "../classFeatureLogic";
import Modal from "./Modal";

interface Props {
  def: ClassSubChoiceDef;
  knownPicks: string[];
  skills: Record<SkillName, SkillState>;
  onCancel: () => void;
  onConfirm: (index: number, newName: string) => void;
}

export default function ManeuverSwapDialog({ def, knownPicks, skills, onCancel, onConfirm }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const [newName, setNewName] = useState("");

  const knownNames = new Set(knownPicks);
  const visibleNewOptions = def.options
    .filter((o) => !knownNames.has(o.name))
    .filter((o) => isVisibleOption(o, knownNames, skills))
    .sort(
      (a, b) =>
        Number(Boolean(chainPrerequisiteName(b.prerequisite))) - Number(Boolean(chainPrerequisiteName(a.prerequisite)))
    );

  const canConfirm = index !== null && Boolean(newName);

  return (
    <Modal
      title="Swap a Known Maneuver"
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={!canConfirm} onClick={() => onConfirm(index!, newName)}>
            Confirm Swap
          </button>
        </>
      }
    >
      <p className="section-hint">Choose a maneuver you know to give up, and the maneuver to learn in its place.</p>
      <div className="choice-group">
        <div className="choice-group-label">Give Up</div>
        <select value={index ?? ""} onChange={(e) => setIndex(e.target.value === "" ? null : Number(e.target.value))}>
          <option value="">Choose known maneuver…</option>
          {knownPicks.map((name, i) => (
            <option key={i} value={i}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="choice-group">
        <div className="choice-group-label">Learn Instead</div>
        <select value={newName} onChange={(e) => setNewName(e.target.value)}>
          <option value="">Choose new maneuver…</option>
          {visibleNewOptions.map((o) => {
            const highlighted = Boolean(chainPrerequisiteName(o.prerequisite));
            return (
              <option key={o.name} value={o.name} style={highlighted ? { fontWeight: "bold" } : undefined}>
                {highlighted ? "★ " : ""}
                {o.name}
                {o.prerequisite ? ` (${o.prerequisite})` : ""}
              </option>
            );
          })}
        </select>
      </div>
    </Modal>
  );
}
