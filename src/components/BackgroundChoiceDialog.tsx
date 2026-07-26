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

  const skillsComplete =
    skillChoice.every(Boolean) && new Set(skillChoice).size === skillChoice.length;
  const languagesComplete =
    languageChoice.every(Boolean) && new Set(languageChoice).size === languageChoice.length;
  const isComplete = skillsComplete && languagesComplete;

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
            onClick={() => onConfirm({ skillChoice, languageChoice })}
          >
            Apply
          </button>
        </>
      }
    >
      <p className="section-hint">
        Tool proficiencies, starting equipment, credits, and your background feature apply
        automatically. Choose your starting skills and languages below.
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

      {background.toolProficienciesText && (
        <div className="choice-group">
          <div className="choice-group-label">Tool Proficiencies</div>
          <div className="choice-group-hint">{background.toolProficienciesText}</div>
        </div>
      )}

      <div className="choice-group">
        <div className="choice-group-label">{background.featureName}</div>
        <div className="choice-group-hint">{background.featureText}</div>
      </div>
    </Modal>
  );
}
