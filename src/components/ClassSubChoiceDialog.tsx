import { useState } from "react";
import type { ClassSubChoiceDef, ClassSubChoicePickDetail, SkillName, SkillState } from "../types";
import { SKILL_LIST } from "../types";
import { LANGUAGES } from "../data/sw5eData";
import { GEAR_CATALOG } from "../data/gear";
import { WEAPON_CATALOG } from "../data/weapons";
import { FIGHTING_STYLES, FIGHTING_MASTERIES, LIGHTSABER_FORMS } from "../data/classFeatureChoices";
import Modal from "./Modal";

const TOOL_OPTIONS = GEAR_CATALOG.filter((g) => g.category === "Tool" || g.category === "Kit").map((g) => g.name);
const FIGHTING_STYLE_NAMES = FIGHTING_STYLES.map((s) => s.name);
const FIGHTING_MASTERY_NAMES = FIGHTING_MASTERIES.map((m) => m.name);
const LIGHTSABER_FORM_NAMES = LIGHTSABER_FORMS.map((f) => f.name);

// Blasters/vibroweapons without the heavy property or a Strength requirement, per Weaponmaster's Exploit.
const NON_HEAVY_WEAPON_OPTIONS = WEAPON_CATALOG.filter((w) => {
  if (!/blaster|vibroweapon/i.test(w.type)) return false;
  const tags = w.property.split(",").map((t) => t.trim());
  return !tags.some((t) => t === "Heavy" || /^Strength\b/.test(t));
}).map((w) => w.name);

interface Props {
  def: ClassSubChoiceDef;
  needed: number;
  alreadyChosen: string[];
  skills: Record<SkillName, SkillState>;
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
  if (option.weaponChoiceCount) {
    const weapons = detail.weapons ?? [];
    return (
      weapons.length === option.weaponChoiceCount &&
      weapons.every(Boolean) &&
      new Set(weapons).size === weapons.length
    );
  }
  if (option.fightingStyleChoice) {
    return Boolean(detail.fightingStyle);
  }
  if (option.fightingMasteryChoice) {
    return Boolean(detail.fightingMastery);
  }
  if (option.lightsaberFormChoiceCount) {
    const forms = detail.lightsaberForms ?? [];
    return (
      forms.length === option.lightsaberFormChoiceCount &&
      forms.every(Boolean) &&
      new Set(forms).size === forms.length
    );
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

export default function ClassSubChoiceDialog({ def, needed, alreadyChosen, skills, onCancel, onConfirm }: Props) {
  const [picks, setPicks] = useState<string[]>(Array(needed).fill(""));
  const [details, setDetails] = useState<ClassSubChoicePickDetail[]>(Array(needed).fill({}));
  const availableSkills = SKILL_LIST.filter((s) => !skills[s].proficient && !skills[s].expertise);

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

                {option?.weaponChoiceCount && (
                  <div className="choice-selects" style={{ marginTop: 4 }}>
                    {Array.from({ length: option.weaponChoiceCount }).map((_, wi) => (
                      <select
                        key={wi}
                        value={detail.weapons?.[wi] ?? ""}
                        onChange={(e) => {
                          const weapons = [...(detail.weapons ?? Array(option.weaponChoiceCount).fill(""))];
                          weapons[wi] = e.target.value;
                          updateDetail(i, { ...detail, weapons });
                        }}
                      >
                        <option value="">Choose weapon…</option>
                        {NON_HEAVY_WEAPON_OPTIONS.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                )}

                {option?.fightingStyleChoice && (
                  <div className="choice-selects" style={{ marginTop: 4 }}>
                    <select
                      value={detail.fightingStyle ?? ""}
                      onChange={(e) => updateDetail(i, { ...detail, fightingStyle: e.target.value || undefined })}
                    >
                      <option value="">Choose fighting style…</option>
                      {FIGHTING_STYLE_NAMES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {option?.fightingMasteryChoice && (
                  <div className="choice-selects" style={{ marginTop: 4 }}>
                    <select
                      value={detail.fightingMastery ?? ""}
                      onChange={(e) => updateDetail(i, { ...detail, fightingMastery: e.target.value || undefined })}
                    >
                      <option value="">Choose fighting mastery…</option>
                      {FIGHTING_MASTERY_NAMES.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {option?.lightsaberFormChoiceCount && (
                  <div className="choice-selects" style={{ marginTop: 4 }}>
                    {Array.from({ length: option.lightsaberFormChoiceCount }).map((_, fi) => (
                      <select
                        key={fi}
                        value={detail.lightsaberForms?.[fi] ?? ""}
                        onChange={(e) => {
                          const forms = [...(detail.lightsaberForms ?? Array(option.lightsaberFormChoiceCount).fill(""))];
                          forms[fi] = e.target.value;
                          updateDetail(i, { ...detail, lightsaberForms: forms });
                        }}
                      >
                        <option value="">Choose lightsaber form…</option>
                        {LIGHTSABER_FORM_NAMES.map((f) => (
                          <option key={f} value={f}>
                            {f}
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
                      {availableSkills.map((s) => (
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
                          {availableSkills.map((s) => (
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
