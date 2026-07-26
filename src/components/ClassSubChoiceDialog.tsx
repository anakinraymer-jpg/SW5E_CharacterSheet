import { useState } from "react";
import type { ClassSubChoiceDef, ClassSubChoicePickDetail, SkillName } from "../types";
import { SKILL_LIST } from "../types";
import { LANGUAGES } from "../data/sw5eData";
import { GEAR_CATALOG } from "../data/gear";
import Modal from "./Modal";

const TOOL_OPTIONS = GEAR_CATALOG.filter((g) => g.category === "Tool" || g.category === "Kit").map((g) => g.name);

interface Props {
  def: ClassSubChoiceDef;
  needed: number;
  alreadyChosen: string[];
  onCancel: () => void;
  onConfirm: (names: string[], details: ClassSubChoicePickDetail[]) => void;
}

function detailComplete(option: ClassSubChoiceDef["options"][number] | undefined, detail: ClassSubChoicePickDetail): boolean {
  if (!option) return false;
  if (option.languageChoiceCount) {
    const langs = detail.languages ?? [];
    return langs.length === option.languageChoiceCount && langs.every(Boolean) && new Set(langs).size === langs.length;
  }
  if (option.skillChoice) {
    return Boolean(detail.skill);
  }
  if (option.skillOrToolFork) {
    const tools = detail.tools ?? [];
    if (detail.skill) {
      return tools.length === 1 && Boolean(tools[0]);
    }
    return tools.length === 2 && tools.every(Boolean) && new Set(tools).size === tools.length;
  }
  return true;
}

export default function ClassSubChoiceDialog({ def, needed, alreadyChosen, onCancel, onConfirm }: Props) {
  const [picks, setPicks] = useState<string[]>(Array(needed).fill(""));
  const [details, setDetails] = useState<ClassSubChoicePickDetail[]>(Array(needed).fill({}));

  function updateDetail(i: number, patch: ClassSubChoicePickDetail) {
    setDetails((prev) => prev.map((d, idx) => (idx === i ? patch : d)));
  }

  const repeatableNames = new Set(def.options.filter((o) => o.repeatable).map((o) => o.name));
  const takenElsewhere = new Set([...alreadyChosen].filter((n) => !repeatableNames.has(n)));
  const nonRepeatablePicks = picks.filter((n) => n && !repeatableNames.has(n));
  const picksValid =
    picks.every(Boolean) && new Set(nonRepeatablePicks).size === nonRepeatablePicks.length;
  const detailsValid = picks.every((name, i) =>
    detailComplete(def.options.find((o) => o.name === name), details[i])
  );
  const isComplete = picksValid && detailsValid;

  return (
    <Modal
      title={`${def.label} (${needed} to choose)`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!isComplete}
            onClick={() => onConfirm(picks, details)}
          >
            Confirm
          </button>
        </>
      }
    >
      <p className="section-hint">Pick {needed} option{needed > 1 ? "s" : ""} below.</p>
      <div className="choice-group">
        <div className="choice-selects">
          {picks.map((v, i) => {
            const option = def.options.find((o) => o.name === v);
            const detail = details[i] ?? {};
            return (
              <div key={i}>
                <select
                  value={v}
                  onChange={(e) => {
                    const next = [...picks];
                    next[i] = e.target.value;
                    setPicks(next);
                    updateDetail(i, {});
                  }}
                >
                  <option value="">Choose…</option>
                  {def.options
                    .filter((o) => !takenElsewhere.has(o.name) || o.repeatable || o.name === v)
                    .map((o) => (
                      <option key={o.name} value={o.name}>
                        {o.name}
                        {o.prerequisite ? ` (${o.prerequisite})` : ""}
                      </option>
                    ))}
                </select>

                {option?.languageChoiceCount && (
                  <div className="choice-selects" style={{ marginTop: 4 }}>
                    {Array.from({ length: option.languageChoiceCount }).map((_, li) => (
                      <select
                        key={li}
                        value={detail.languages?.[li] ?? ""}
                        onChange={(e) => {
                          const langs = [...(detail.languages ?? Array(option.languageChoiceCount).fill(""))];
                          langs[li] = e.target.value;
                          updateDetail(i, { ...detail, languages: langs });
                        }}
                      >
                        <option value="">Choose language…</option>
                        {LANGUAGES.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                )}

                {option?.skillChoice && (
                  <div className="choice-selects" style={{ marginTop: 4 }}>
                    <select
                      value={detail.skill ?? ""}
                      onChange={(e) =>
                        updateDetail(i, { ...detail, skill: (e.target.value || undefined) as SkillName | undefined })
                      }
                    >
                      <option value="">Choose skill…</option>
                      {SKILL_LIST.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {option?.skillOrToolFork && (
                  <div style={{ marginTop: 4 }}>
                    <label className="choice-group-hint" style={{ display: "block", marginBottom: 4 }}>
                      <input
                        type="checkbox"
                        checked={!detail.skill}
                        onChange={(e) =>
                          updateDetail(i, e.target.checked ? { tools: ["", ""] } : { skill: undefined, tools: [""] })
                        }
                      />{" "}
                      Two tools instead of a skill and a tool
                    </label>
                    <div className="choice-selects">
                      {!(detail.tools && detail.tools.length === 2) && (
                        <select
                          value={detail.skill ?? ""}
                          onChange={(e) =>
                        updateDetail(i, { ...detail, skill: (e.target.value || undefined) as SkillName | undefined })
                      }
                        >
                          <option value="">Choose skill…</option>
                          {SKILL_LIST.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      )}
                      {(detail.tools ?? [""]).map((t, ti) => (
                        <select
                          key={ti}
                          value={t}
                          onChange={(e) => {
                            const tools = [...(detail.tools ?? [""])];
                            tools[ti] = e.target.value;
                            updateDetail(i, { ...detail, tools });
                          }}
                        >
                          <option value="">Choose tool…</option>
                          {TOOL_OPTIONS.map((tool) => (
                            <option key={tool} value={tool}>
                              {tool}
                            </option>
                          ))}
                        </select>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
