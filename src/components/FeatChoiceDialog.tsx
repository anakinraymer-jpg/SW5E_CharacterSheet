import { useState } from "react";
import type { AbilityKey, FeatEntry } from "../types";
import { ABILITY_LABEL } from "../speciesLogic";
import type { FeatSelections } from "../featLogic";
import Modal from "./Modal";

interface Props {
  feat: FeatEntry;
  onCancel: () => void;
  onConfirm: (selections: FeatSelections) => void;
}

function OptionSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Choose…</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export default function FeatChoiceDialog({ feat, onCancel, onConfirm }: Props) {
  const [abilityChoice, setAbilityChoice] = useState<AbilityKey | "">("");
  const [choiceSelections, setChoiceSelections] = useState<string[][]>(
    (feat.choices ?? []).map((c) => Array(c.count).fill(""))
  );

  const needsAbility = feat.abilityOptions.length > 1;

  function isComplete(): boolean {
    if (needsAbility && !abilityChoice) return false;
    for (const arr of choiceSelections) {
      if (arr.some((v) => !v)) return false;
    }
    return true;
  }

  return (
    <Modal
      title={`${feat.name} — Choices`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!isComplete()}
            onClick={() => onConfirm({ abilityChoice, choiceSelections })}
          >
            Add Feat
          </button>
        </>
      }
    >
      <p className="section-hint">{feat.text}</p>

      {needsAbility && (
        <div className="choice-group">
          <div className="choice-group-label">Ability Score Increase (+1)</div>
          <div className="choice-selects">
            <select value={abilityChoice} onChange={(e) => setAbilityChoice(e.target.value as AbilityKey)}>
              <option value="">Choose…</option>
              {feat.abilityOptions.map((a) => (
                <option key={a} value={a}>
                  {ABILITY_LABEL[a]}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {(feat.choices ?? []).map((choiceDef, ci) => (
        <div className="choice-group" key={ci}>
          <div className="choice-group-label">
            {choiceDef.label}
            {choiceDef.count > 1 ? ` (${choiceDef.count})` : ""}
          </div>
          <div className="choice-selects">
            {Array.from({ length: choiceDef.count }).map((_, pi) => (
              <OptionSelect
                key={pi}
                value={choiceSelections[ci]?.[pi] ?? ""}
                onChange={(v) => {
                  const next = choiceSelections.map((arr) => [...arr]);
                  next[ci][pi] = v;
                  setChoiceSelections(next);
                }}
                options={choiceDef.options}
              />
            ))}
          </div>
        </div>
      ))}
    </Modal>
  );
}
