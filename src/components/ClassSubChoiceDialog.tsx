import { useState } from "react";
import type { ClassSubChoiceDef, ClassSubChoiceOption, ClassSubChoicePickDetail, SkillName, SkillState } from "../types";
import { SKILL_LIST } from "../types";
import { LANGUAGES } from "../data/sw5eData";
import { GEAR_CATALOG } from "../data/gear";
import { WEAPON_CATALOG } from "../data/weapons";
import {
  BONUS_ACTION_CONVERTIBLE_ACTIONS,
  DAMAGE_TYPES,
  FIGHTING_STYLES,
  FIGHTING_MASTERIES,
  LIGHTSABER_FORMS,
} from "../data/classFeatureChoices";
import { chainPrerequisiteName, isVisibleOption } from "../classFeatureLogic";
import HoverInfo from "./HoverInfo";
import Modal from "./Modal";

const TOOL_OPTIONS = GEAR_CATALOG.filter((g) => g.category === "Tool" || g.category === "Kit").map((g) => g.name);

// A row of selectable buttons, one per option, each wrapped in the sheet's own HoverInfo tooltip
// showing that option's full, unmodified description — used for picks with a catalog of named
// options with rules text (Fighting Style, Fighting Mastery, Lightsaber Form), so the player can
// preview the exact text before choosing without a native <select>'s unstyled tooltip.
function HoverOptionButtons({
  options,
  value,
  onSelect,
}: {
  options: ClassSubChoiceOption[];
  value: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="chip-row" style={{ marginTop: 4 }}>
      {options.map((o) => (
        <HoverInfo key={o.name} title={o.name} lines={[o.text]}>
          <button
            type="button"
            className={`btn btn-small ${value === o.name ? "btn-primary" : "btn-secondary"}`}
            onClick={() => onSelect(o.name)}
          >
            {o.name}
          </button>
        </HoverInfo>
      ))}
    </div>
  );
}

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
  if (option.damageTypeChoiceCount) {
    const types = detail.damageTypes ?? [];
    return (
      types.length === option.damageTypeChoiceCount &&
      types.every(Boolean) &&
      new Set(types).size === types.length
    );
  }
  if (option.actionChoiceCount) {
    const actions = detail.actions ?? [];
    return (
      actions.length === option.actionChoiceCount &&
      actions.every(Boolean) &&
      new Set(actions).size === actions.length
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
  const knownNames = new Set(alreadyChosen);
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
                    .filter((o) => isVisibleOption(o, knownNames, skills))
                    .sort(
                      (a, b) =>
                        Number(Boolean(chainPrerequisiteName(b.prerequisite))) -
                        Number(Boolean(chainPrerequisiteName(a.prerequisite)))
                    )
                    .map((o) => {
                      const upgradeAvailable = Boolean(chainPrerequisiteName(o.prerequisite));
                      return (
                        <option key={o.name} value={o.name} style={upgradeAvailable ? { fontWeight: "bold" } : undefined}>
                          {upgradeAvailable ? "★ " : ""}
                          {o.name}
                          {o.prerequisite ? ` (${o.prerequisite})` : ""}
                        </option>
                      );
                    })}
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
                  <HoverOptionButtons
                    options={FIGHTING_STYLES}
                    value={detail.fightingStyle ?? ""}
                    onSelect={(name) => updateDetail(i, { ...detail, fightingStyle: name })}
                  />
                )}

                {option?.fightingMasteryChoice && (
                  <HoverOptionButtons
                    options={FIGHTING_MASTERIES}
                    value={detail.fightingMastery ?? ""}
                    onSelect={(name) => updateDetail(i, { ...detail, fightingMastery: name })}
                  />
                )}

                {option?.lightsaberFormChoiceCount && (
                  <div>
                    {Array.from({ length: option.lightsaberFormChoiceCount }).map((_, fi) => (
                      <HoverOptionButtons
                        key={fi}
                        options={LIGHTSABER_FORMS}
                        value={detail.lightsaberForms?.[fi] ?? ""}
                        onSelect={(name) => {
                          const forms = [...(detail.lightsaberForms ?? Array(option.lightsaberFormChoiceCount).fill(""))];
                          forms[fi] = name;
                          updateDetail(i, { ...detail, lightsaberForms: forms });
                        }}
                      />
                    ))}
                  </div>
                )}

                {option?.damageTypeChoiceCount && (
                  <div className="choice-selects" style={{ marginTop: 4 }}>
                    {Array.from({ length: option.damageTypeChoiceCount }).map((_, di) => (
                      <select
                        key={di}
                        value={detail.damageTypes?.[di] ?? ""}
                        onChange={(e) => {
                          const types = [...(detail.damageTypes ?? Array(option.damageTypeChoiceCount).fill(""))];
                          types[di] = e.target.value;
                          updateDetail(i, { ...detail, damageTypes: types });
                        }}
                      >
                        <option value="">Choose damage type…</option>
                        {DAMAGE_TYPES.map((dt) => (
                          <option key={dt} value={dt}>
                            {dt}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                )}

                {option?.actionChoiceCount && (
                  <div className="choice-selects" style={{ marginTop: 4 }}>
                    {Array.from({ length: option.actionChoiceCount }).map((_, ai) => (
                      <select
                        key={ai}
                        value={detail.actions?.[ai] ?? ""}
                        onChange={(e) => {
                          const actions = [...(detail.actions ?? Array(option.actionChoiceCount).fill(""))];
                          actions[ai] = e.target.value;
                          updateDetail(i, { ...detail, actions });
                        }}
                      >
                        <option value="">Choose action…</option>
                        {BONUS_ACTION_CONVERTIBLE_ACTIONS.map((a) => (
                          <option key={a} value={a}>
                            {a}
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
                    <div className="choice-selects" style={{ marginBottom: 4 }}>
                      <button
                        type="button"
                        className={`btn btn-small ${!(detail.tools?.length === 2) ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => updateDetail(i, { skill: undefined, tools: [""] })}
                      >
                        Skill + Tool
                      </button>
                      <button
                        type="button"
                        className={`btn btn-small ${detail.tools?.length === 2 ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => updateDetail(i, { skill: undefined, tools: ["", ""] })}
                      >
                        Two Tools
                      </button>
                    </div>
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

      {def.options
        .filter((o) => isVisibleOption(o, knownNames, skills))
        .map((o) => (
          <div className="choice-group" key={o.name}>
            <div className="choice-group-label">
              {chainPrerequisiteName(o.prerequisite) ? "★ " : ""}
              {o.name}
              {o.prerequisite ? ` — Prerequisite: ${o.prerequisite}` : ""}
            </div>
            <div className="choice-group-hint">{o.text}</div>
          </div>
        ))}
    </Modal>
  );
}
