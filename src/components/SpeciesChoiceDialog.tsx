import { useState } from "react";
import type { AbilityKey, SpeciesEntry, SpeciesSelections } from "../types";
import { LANGUAGES } from "../data/sw5eData";
import { ABILITY_LABEL } from "../speciesLogic";
import Modal from "./Modal";

interface Props {
  species: SpeciesEntry;
  onCancel: () => void;
  onConfirm: (selections: SpeciesSelections) => void;
}

const ABILITY_KEYS: AbilityKey[] = ["str", "dex", "con", "int", "wis", "cha"];

function AbilitySelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: AbilityKey) => void;
  options: AbilityKey[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as AbilityKey)}>
      <option value="">Choose…</option>
      {options.map((a) => (
        <option key={a} value={a}>
          {ABILITY_LABEL[a]}
        </option>
      ))}
    </select>
  );
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

export default function SpeciesChoiceDialog({ species, onCancel, onConfirm }: Props) {
  const [abilityChoices, setAbilityChoices] = useState<string[][]>(
    species.abilityIncrease.choices.map(() => [""])
  );
  const [humanVariant, setHumanVariant] = useState<"two-one" | "four">("two-one");
  const [humanFixedTwo, setHumanFixedTwo] = useState("");
  const [humanFixedOnes, setHumanFixedOnes] = useState(["", ""]);
  const [humanFourOnes, setHumanFourOnes] = useState(["", "", "", ""]);
  const [languageChoice, setLanguageChoice] = useState<string[]>(
    species.languageChoice ? Array(species.languageChoice.count).fill("") : []
  );
  const [traitChoices, setTraitChoices] = useState<Record<string, string[][]>>(() => {
    const init: Record<string, string[][]> = {};
    for (const t of species.traits) {
      if (t.choices) init[t.name] = t.choices.map((c) => Array(c.count).fill(""));
    }
    return init;
  });

  const isHuman = !!species.abilityIncrease.humanVariant;

  function isComplete(): boolean {
    if (isHuman) {
      if (humanVariant === "two-one") {
        if (!humanFixedTwo || humanFixedOnes.some((v) => !v)) return false;
      } else {
        if (humanFourOnes.some((v) => !v)) return false;
      }
    }
    if (abilityChoices.some((arr) => arr.some((v) => !v))) return false;
    if (languageChoice.some((v) => !v)) return false;
    for (const t of species.traits) {
      if (!t.choices) continue;
      const picks = traitChoices[t.name] ?? [];
      if (picks.some((arr) => arr.some((v) => !v))) return false;
    }
    return true;
  }

  function handleConfirm() {
    const selections: SpeciesSelections = {
      abilityChoices: abilityChoices.map((arr) => arr.filter(Boolean) as AbilityKey[]),
      languageChoice: languageChoice.filter(Boolean),
      traitChoices,
    };
    if (isHuman) {
      if (humanVariant === "two-one") {
        selections.humanFixedTwo = humanFixedTwo as AbilityKey;
        selections.humanFixedOnes = humanFixedOnes.filter(Boolean) as AbilityKey[];
      } else {
        selections.humanFourOnes = humanFourOnes.filter(Boolean) as AbilityKey[];
      }
    }
    onConfirm(selections);
  }

  return (
    <Modal
      title={`${species.name} Traits`}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={!isComplete()} onClick={handleConfirm}>
            Apply Traits
          </button>
        </>
      }
    >
      <p className="section-hint">
        {species.name} grants some choices. Pick the options below — everything else (fixed
        ability increases, size, speed, and other traits) will be applied automatically.
      </p>

      {isHuman && (
        <div className="choice-group">
          <div className="choice-group-label">Ability Score Increase</div>
          <div className="choice-selects" style={{ marginBottom: 6 }}>
            <label className="feature-used-toggle">
              <input
                type="radio"
                checked={humanVariant === "two-one"}
                onChange={() => setHumanVariant("two-one")}
              />
              One +2, two +1
            </label>
            <label className="feature-used-toggle">
              <input
                type="radio"
                checked={humanVariant === "four"}
                onChange={() => setHumanVariant("four")}
              />
              Four +1
            </label>
          </div>
          {humanVariant === "two-one" ? (
            <div className="choice-selects">
              <AbilitySelect value={humanFixedTwo} onChange={setHumanFixedTwo} options={ABILITY_KEYS} />
              <AbilitySelect
                value={humanFixedOnes[0]}
                onChange={(v) => setHumanFixedOnes([v, humanFixedOnes[1]])}
                options={ABILITY_KEYS}
              />
              <AbilitySelect
                value={humanFixedOnes[1]}
                onChange={(v) => setHumanFixedOnes([humanFixedOnes[0], v])}
                options={ABILITY_KEYS}
              />
            </div>
          ) : (
            <div className="choice-selects">
              {humanFourOnes.map((v, i) => (
                <AbilitySelect
                  key={i}
                  value={v}
                  onChange={(nv) => {
                    const next = [...humanFourOnes];
                    next[i] = nv;
                    setHumanFourOnes(next);
                  }}
                  options={ABILITY_KEYS}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {species.abilityIncrease.choices.map((choiceDef, i) => (
        <div className="choice-group" key={i}>
          <div className="choice-group-label">
            Ability Score Increase (+{choiceDef.amount})
          </div>
          <div className="choice-selects">
            <AbilitySelect
              value={abilityChoices[i][0]}
              onChange={(v) => {
                const next = abilityChoices.map((arr) => [...arr]);
                next[i][0] = v;
                setAbilityChoices(next);
              }}
              options={choiceDef.options}
            />
          </div>
        </div>
      ))}

      {species.languageChoice && (
        <div className="choice-group">
          <div className="choice-group-label">
            Language{species.languageChoice.count > 1 ? "s" : ""} ({species.languageChoice.count})
          </div>
          <div className="choice-selects">
            {languageChoice.map((v, i) => (
              <OptionSelect
                key={i}
                value={v}
                onChange={(nv) => {
                  const next = [...languageChoice];
                  next[i] = nv;
                  setLanguageChoice(next);
                }}
                options={(species.languageChoice!.options ?? LANGUAGES).filter(
                  (lang) => !species.knownLanguages.some((known) => known.startsWith(lang))
                )}
              />
            ))}
          </div>
        </div>
      )}

      {species.traits
        .filter((t) => t.choices?.length)
        .map((t) => (
          <div className="choice-group" key={t.name}>
            <div className="choice-group-label">{t.name}</div>
            <div className="choice-group-hint">{t.text}</div>
            {t.choices!.map((choiceDef, ci) => (
              <div className="choice-selects" key={ci}>
                {Array.from({ length: choiceDef.count }).map((_, pi) => (
                  <OptionSelect
                    key={pi}
                    value={traitChoices[t.name]?.[ci]?.[pi] ?? ""}
                    onChange={(v) => {
                      const next = { ...traitChoices };
                      next[t.name] = next[t.name].map((arr) => [...arr]);
                      next[t.name][ci][pi] = v;
                      setTraitChoices(next);
                    }}
                    options={choiceDef.options}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
    </Modal>
  );
}
