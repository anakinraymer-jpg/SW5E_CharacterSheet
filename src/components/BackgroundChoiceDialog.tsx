import { useState } from "react";
import type { BackgroundEntry, BackgroundSelections, SkillName, SkillState } from "../types";
import { LANGUAGES } from "../data/sw5eData";
import Modal from "./Modal";

interface Props {
  background: BackgroundEntry;
  skills: Record<SkillName, SkillState>;
  onCancel: () => void;
  onConfirm: (selections: BackgroundSelections) => void;
}

export default function BackgroundChoiceDialog({ background, skills, onCancel, onConfirm }: Props) {
  const [skillChoice, setSkillChoice] = useState<string[]>(
    Array(background.skillChoice.count).fill("")
  );
  const availableSkills = background.skillChoice.options.filter(
    (o) => !skills[o as SkillName].proficient && !skills[o as SkillName].expertise
  );
  const [languageChoice, setLanguageChoice] = useState<string[]>(
    Array(background.languages.choiceCount).fill("")
  );
  const [toolChoice, setToolChoice] = useState<string[][]>(
    background.toolChoices.map((c) => Array(c.count).fill(""))
  );

  const skillsComplete =
    skillChoice.every(Boolean) && new Set(skillChoice).size === skillChoice.length;
  const languagesComplete =
    languageChoice.every(Boolean) && new Set(languageChoice).size === languageChoice.length;
  const toolsComplete = toolChoice.every(
    (picks) => picks.every(Boolean) && new Set(picks).size === picks.length
  );
  const isComplete = skillsComplete && languagesComplete && toolsComplete;

  return (
    <Modal
      title={`${background.name} Choices`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!isComplete}
            onClick={() => onConfirm({ skillChoice, languageChoice, toolChoice })}
          >
            Apply
          </button>
        </>
      }
    >
      <p className="section-hint">
        Starting equipment, credits, and your background feature apply automatically. Choose your
        starting skills, languages, and tool proficiencies below.
      </p>

      {background.skillChoice.count > 0 && (
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
      )}

      {background.languages.choiceCount > 0 && (
        <div className="choice-group">
          <div className="choice-group-label">
            Language{background.languages.choiceCount > 1 ? "s" : ""} ({background.languages.choiceCount})
          </div>
          <div className="choice-selects">
            {languageChoice.map((v, i) => (
              <select
                key={i}
                value={v}
                onChange={(e) => {
                  const next = [...languageChoice];
                  next[i] = e.target.value;
                  setLanguageChoice(next);
                }}
              >
                <option value="">Choose…</option>
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
      )}

      {background.fixedToolProficiencies.length > 0 && (
        <div className="choice-group">
          <div className="choice-group-label">Tool Proficiencies</div>
          <div className="choice-group-hint">{background.fixedToolProficiencies.join(", ")}</div>
        </div>
      )}

      {background.toolChoices.map((choiceDef, i) => (
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
        <div className="choice-group-label">{background.featureName}</div>
        <div className="choice-group-hint">{background.featureText}</div>
      </div>
    </Modal>
  );
}
