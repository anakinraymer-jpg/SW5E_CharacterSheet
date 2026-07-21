import type { Character } from "../types";
import { CLASS_RESOURCES_BY_CLASS, CLASS_SUB_CHOICES_BY_CLASS } from "../data/classFeatureChoices";

interface Props {
  character: Character;
  onUpdateResource: (key: string, current: number) => void;
}

export default function ClassFeaturesSection({ character, onUpdateResource }: Props) {
  const resources = CLASS_RESOURCES_BY_CLASS.get(character.classAppliedName) ?? [];
  const subChoiceDefs = CLASS_SUB_CHOICES_BY_CLASS.get(character.classAppliedName) ?? [];
  const hasChosenSubChoices = subChoiceDefs.some(
    (def) => (character.classSubChoicePicks[def.key] ?? []).length > 0
  );

  if (!character.classTraitsText && !character.archetypeTraitsText && resources.length === 0) {
    return null;
  }

  return (
    <section className="sheet-section class-features-section">
      <h2>Class Features</h2>
      <p className="section-hint">
        Features unlocked by your class and archetype at your current level. Level up to reveal
        more.
      </p>

      {resources.length > 0 && (
        <div className="class-resources-grid">
          {resources.map((def) => {
            const state = character.classResources.find((r) => r.key === def.key);
            const idx = Math.max(1, Math.min(20, character.level || 1)) - 1;
            const max = def.maxByLevel[idx] ?? 0;
            const die = def.dieByLevel?.[idx];
            const current = state?.current ?? max;
            return (
              <div className="class-resource-card" key={def.key}>
                <div className="class-resource-label">
                  {def.label}
                  {die ? ` (${die})` : ""}
                </div>
                <div className="class-resource-controls">
                  <input
                    type="number"
                    min={0}
                    max={max}
                    value={current}
                    onChange={(e) => onUpdateResource(def.key, Number(e.target.value) || 0)}
                  />
                  <span>/ {max >= 99 ? "∞" : max}</span>
                  <button className="btn btn-secondary btn-small" onClick={() => onUpdateResource(def.key, max)}>
                    Reset
                  </button>
                </div>
                <div className="class-resource-refresh">{def.refresh}</div>
              </div>
            );
          })}
        </div>
      )}

      {hasChosenSubChoices && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.classAppliedName} Choices</div>
          {subChoiceDefs.map((def) => {
            const chosen = character.classSubChoicePicks[def.key] ?? [];
            if (chosen.length === 0) return null;
            return chosen.map((name) => {
              const option = def.options.find((o) => o.name === name);
              if (!option) return null;
              return (
                <p key={`${def.key}-${name}`} className="species-trait-line">
                  <strong>{option.name}</strong> ({def.label}). {option.text}
                </p>
              );
            });
          })}
        </div>
      )}

      {character.classTraitsText && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.classAppliedName} Features</div>
          {character.classTraitsText.split("\n\n").map((line, i) => (
            <p key={i} className="species-trait-line">
              {line}
            </p>
          ))}
        </div>
      )}

      {character.archetypeTraitsText && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.archetypeAppliedName} Features</div>
          {character.archetypeTraitsText.split("\n\n").map((line, i) => (
            <p key={i} className="species-trait-line">
              {line}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
