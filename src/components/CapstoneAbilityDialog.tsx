import { useState } from "react";
import type { AbilityKey, ClassFeature } from "../types";
import { ABILITY_LABEL } from "../speciesLogic";
import Modal from "./Modal";

interface Props {
  feature: ClassFeature;
  sourceLabel: string;
  onCancel: () => void;
  onConfirm: (picks: (AbilityKey | null)[]) => void;
}

export default function CapstoneAbilityDialog({ feature, sourceLabel, onCancel, onConfirm }: Props) {
  const slots = feature.abilityScoreIncrease ?? [];
  const [picks, setPicks] = useState<(AbilityKey | null)[]>(slots.map((s) => (s.options.length === 1 ? s.options[0] : null)));

  const isComplete = slots.every((s, i) => s.options.length === 1 || picks[i]);

  return (
    <Modal
      title={`${sourceLabel} — ${feature.name} (Level ${feature.level})`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={!isComplete} onClick={() => onConfirm(picks)}>
            Apply
          </button>
        </>
      }
    >
      <p className="section-hint">{feature.text}</p>
      <div className="choice-group">
        {slots.map((slot, i) =>
          slot.options.length === 1 ? (
            <p key={i} className="species-trait-line">
              {ABILITY_LABEL[slot.options[0]]} +{slot.amount}
            </p>
          ) : (
            <div key={i} className="choice-selects" style={{ marginBottom: 6 }}>
              {slot.options.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`btn btn-small ${picks[i] === a ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => {
                    const next = [...picks];
                    next[i] = a;
                    setPicks(next);
                  }}
                >
                  {ABILITY_LABEL[a]} +{slot.amount}
                </button>
              ))}
            </div>
          )
        )}
      </div>
    </Modal>
  );
}
