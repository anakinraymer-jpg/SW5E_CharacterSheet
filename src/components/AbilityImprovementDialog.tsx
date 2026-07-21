import { useState } from "react";
import type { AbilityKey } from "../types";
import { ABILITY_LABEL } from "../speciesLogic";
import Modal from "./Modal";

interface Props {
  level: number;
  className: string;
  onCancel: () => void;
  onConfirm: (abilities: AbilityKey[]) => void;
}

const ABILITY_KEYS: AbilityKey[] = ["str", "dex", "con", "int", "wis", "cha"];

export default function AbilityImprovementDialog({ level, className, onCancel, onConfirm }: Props) {
  const [mode, setMode] = useState<"two" | "one-one">("two");
  const [single, setSingle] = useState("");
  const [pair, setPair] = useState(["", ""]);

  const isComplete = mode === "two" ? !!single : pair[0] && pair[1] && pair[0] !== pair[1];

  function handleConfirm() {
    if (mode === "two") {
      onConfirm([single as AbilityKey]);
    } else {
      onConfirm(pair as AbilityKey[]);
    }
  }

  return (
    <Modal
      title={`${className} — Ability Score Improvement (Level ${level})`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={!isComplete} onClick={handleConfirm}>
            Apply
          </button>
        </>
      }
    >
      <p className="section-hint">
        Increase one ability score by 2, or two ability scores by 1 each. Can't exceed 20 this way.
      </p>
      <div className="choice-group">
        <div className="choice-selects" style={{ marginBottom: 6 }}>
          <label className="feature-used-toggle">
            <input type="radio" checked={mode === "two"} onChange={() => setMode("two")} />
            One ability +2
          </label>
          <label className="feature-used-toggle">
            <input type="radio" checked={mode === "one-one"} onChange={() => setMode("one-one")} />
            Two abilities +1
          </label>
        </div>
        {mode === "two" ? (
          <div className="choice-selects">
            <select value={single} onChange={(e) => setSingle(e.target.value)}>
              <option value="">Choose…</option>
              {ABILITY_KEYS.map((a) => (
                <option key={a} value={a}>
                  {ABILITY_LABEL[a]}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="choice-selects">
            {pair.map((v, i) => (
              <select
                key={i}
                value={v}
                onChange={(e) => {
                  const next = [...pair];
                  next[i] = e.target.value;
                  setPair(next);
                }}
              >
                <option value="">Choose…</option>
                {ABILITY_KEYS.map((a) => (
                  <option key={a} value={a}>
                    {ABILITY_LABEL[a]}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
