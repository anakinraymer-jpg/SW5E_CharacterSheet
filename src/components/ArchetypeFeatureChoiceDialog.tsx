import { useState } from "react";
import type { ClassFeature, SkillName, SkillState } from "../types";
import Modal from "./Modal";

interface Props {
  feature: ClassFeature;
  skills: Record<SkillName, SkillState>;
  onCancel: () => void;
  onConfirm: (selections: string[][]) => void;
}

export default function ArchetypeFeatureChoiceDialog({ feature, skills, onCancel, onConfirm }: Props) {
  const choiceDefs = feature.choices ?? [];
  const [picks, setPicks] = useState<string[][]>(choiceDefs.map((c) => Array(c.count).fill("")));

  const isComplete = picks.every(
    (arr) => arr.every(Boolean) && new Set(arr).size === arr.length
  );

  return (
    <Modal
      title={feature.name}
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
      <p className="section-hint">{feature.text}</p>

      {choiceDefs.map((choiceDef, ci) => (
        <div className="choice-group" key={ci}>
          <div className="choice-group-label">
            {choiceDef.label}
            {choiceDef.count > 1 ? ` (${choiceDef.count})` : ""}
          </div>
          <div className="choice-selects">
            {Array.from({ length: choiceDef.count }).map((_, pi) => (
              <select
                key={pi}
                value={picks[ci]?.[pi] ?? ""}
                onChange={(e) => {
                  const next = picks.map((arr) => [...arr]);
                  next[ci][pi] = e.target.value;
                  setPicks(next);
                }}
              >
                <option value="">Choose…</option>
                {(choiceDef.kind === "skill"
                  ? choiceDef.options.filter(
                      (o) => !skills[o as SkillName].proficient && !skills[o as SkillName].expertise
                    )
                  : choiceDef.options
                ).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
      ))}
    </Modal>
  );
}
