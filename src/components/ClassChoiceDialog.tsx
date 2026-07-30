import { useState } from "react";
import type { ClassEntry, ClassSelections, EquipmentPart, SkillName, SkillState } from "../types";
import { parseEquipmentOptions, parseStartingFunds, rollStartingFunds } from "../classLogic";
import Modal from "./Modal";

interface Props {
  classEntry: ClassEntry;
  skills: Record<SkillName, SkillState>;
  onCancel: () => void;
  onConfirm: (selections: ClassSelections) => void;
}

// Parts that need a secondary disambiguation select (abstract weapon categories, etc.).
function choiceParts(parts: EquipmentPart[] | undefined): EquipmentPart[] {
  return (parts ?? []).filter((p) => p.choiceLabel);
}

export default function ClassChoiceDialog({ classEntry, skills, onCancel, onConfirm }: Props) {
  const availableSkills = classEntry.skillChoice.options.filter(
    (o) => !skills[o as SkillName].proficient && !skills[o as SkillName].expertise
  );
  const [skillChoice, setSkillChoice] = useState<string[]>(
    Array(classEntry.skillChoice.count).fill("")
  );
  const [toolChoice, setToolChoice] = useState<string[][]>(
    classEntry.toolChoices.map((c) => Array(c.count).fill(""))
  );

  const equipmentLines = classEntry.equipmentText.map((line) => parseEquipmentOptions(line));
  const [equipmentChoice, setEquipmentChoice] = useState<string[]>(
    equipmentLines.map((opts) => opts[0] ?? "")
  );
  const [equipmentItemChoices, setEquipmentItemChoices] = useState<string[][]>(
    equipmentChoice.map((branch) => choiceParts(classEntry.equipmentGrants[branch]).map(() => ""))
  );
  const [useStartingFunds, setUseStartingFunds] = useState(false);
  const fundsFormula = parseStartingFunds(classEntry.startingFunds);
  const [rolledFunds, setRolledFunds] = useState<number>(0);

  function setEquipmentBranch(lineIndex: number, branch: string) {
    const nextChoice = [...equipmentChoice];
    nextChoice[lineIndex] = branch;
    setEquipmentChoice(nextChoice);
    const nextItemChoices = [...equipmentItemChoices];
    nextItemChoices[lineIndex] = choiceParts(classEntry.equipmentGrants[branch]).map(() => "");
    setEquipmentItemChoices(nextItemChoices);
  }

  function setEquipmentItemChoice(lineIndex: number, partIndex: number, value: string) {
    const next = equipmentItemChoices.map((arr) => [...arr]);
    next[lineIndex][partIndex] = value;
    setEquipmentItemChoices(next);
  }

  const skillsComplete =
    skillChoice.every(Boolean) && new Set(skillChoice).size === skillChoice.length;
  const toolsComplete = toolChoice.every(
    (picks) => picks.every(Boolean) && new Set(picks).size === picks.length
  );
  const equipmentItemsComplete = equipmentItemChoices.every((picks) => picks.every(Boolean));
  const equipmentComplete = useStartingFunds
    ? rolledFunds > 0
    : equipmentChoice.every(Boolean) && equipmentItemsComplete;
  const isComplete = skillsComplete && toolsComplete && equipmentComplete;

  function roll() {
    if (fundsFormula) setRolledFunds(rollStartingFunds(fundsFormula));
  }

  return (
    <Modal
      title={`${classEntry.name} Skills & Equipment`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!isComplete}
            onClick={() =>
              onConfirm({
                skillChoice,
                toolChoice,
                equipmentChoice,
                equipmentItemChoices,
                useStartingFunds,
                rolledFunds,
              })
            }
          >
            Apply
          </button>
        </>
      }
    >
      <p className="section-hint">
        Saving throws, hit dice, and other fixed proficiencies apply automatically. Choose your
        starting skills ({classEntry.skillChoice.count} from the {classEntry.name} list)
        {classEntry.toolChoices.length > 0 ? ", tool proficiencies," : ""} and equipment below.
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
              {availableSkills.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {classEntry.fixedToolProficiencies.length > 0 && (
        <div className="choice-group">
          <div className="choice-group-label">Tool Proficiencies</div>
          <div className="choice-group-hint">{classEntry.fixedToolProficiencies.join(", ")}</div>
        </div>
      )}

      {classEntry.toolChoices.map((choiceDef, i) => (
        <div className="choice-group" key={choiceDef.label + i}>
          <div className="choice-group-label">
            {choiceDef.label}
            {choiceDef.count > 1 ? ` (${choiceDef.count})` : ""}
          </div>
          <div className="choice-selects">
            {toolChoice[i].map((v, j) => (
              <select
                key={j}
                value={v}
                onChange={(e) => {
                  const next = toolChoice.map((arr) => [...arr]);
                  next[i][j] = e.target.value;
                  setToolChoice(next);
                }}
              >
                <option value="">Choose…</option>
                {choiceDef.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
      ))}

      <div className="choice-group">
        <div className="choice-group-label">Starting Equipment</div>
        <label className="choice-group-hint" style={{ display: "block", marginBottom: 6 }}>
          <input
            type="checkbox"
            checked={useStartingFunds}
            onChange={(e) => setUseStartingFunds(e.target.checked)}
          />{" "}
          Forgo the equipment below and roll starting funds instead ({classEntry.startingFunds})
        </label>

        {useStartingFunds ? (
          <div className="choice-selects">
            <button type="button" className="btn btn-secondary btn-small" onClick={roll}>
              {rolledFunds > 0 ? "Reroll" : "Roll"}
            </button>
            {rolledFunds > 0 && <span>{rolledFunds} cr</span>}
          </div>
        ) : (
          equipmentLines.map((opts, i) => (
            <div key={i} className="choice-selects">
              <select
                value={equipmentChoice[i] ?? ""}
                onChange={(e) => setEquipmentBranch(i, e.target.value)}
              >
                <option value="">Choose…</option>
                {opts.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {choiceParts(classEntry.equipmentGrants[equipmentChoice[i]]).map((part, j) => (
                <select
                  key={j}
                  value={equipmentItemChoices[i]?.[j] ?? ""}
                  onChange={(e) => setEquipmentItemChoice(i, j, e.target.value)}
                >
                  <option value="">{part.choiceLabel}…</option>
                  {(part.choiceOptions ?? []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
