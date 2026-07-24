import type { Character } from "../types";
import { CLASS_RESOURCES_BY_CLASS, CLASS_SUB_CHOICES_BY_CLASS } from "../data/classFeatureChoices";
import { CLASSES_CATALOG } from "../data/classes";
import HoverInfo from "./HoverInfo";

interface Props {
  character: Character;
  onUpdateResource: (key: string, current: number) => void;
}

interface ParsedFeature {
  title: string;
  meta: string;
  body: string;
}

function parseFeatureLine(line: string): ParsedFeature | null {
  const match = line.match(/^(.+?) \(([^)]+)\)\.\s*([\s\S]*)$/);
  if (!match) return null;
  return { title: match[1].trim(), meta: match[2].trim(), body: match[3].trim() };
}

function FeatureChips({ text }: { text: string }) {
  const lines = text.split("\n\n").filter(Boolean);
  const notes: string[] = [];
  const features: ParsedFeature[] = [];
  for (const line of lines) {
    const parsed = parseFeatureLine(line);
    if (parsed) features.push(parsed);
    else notes.push(line);
  }
  return (
    <>
      {notes.map((n, i) => (
        <p key={i} className="species-trait-line">
          {n}
        </p>
      ))}
      <div className="chip-row">
        {features.map((f, i) => (
          <HoverInfo key={i} title={f.title} lines={[f.meta, f.body]}>
            <span className="info-chip">{f.title}</span>
          </HoverInfo>
        ))}
      </div>
    </>
  );
}

function ProficiencyNodes({
  label,
  armor,
  weapons,
}: {
  label: string;
  armor: string[];
  weapons: { label: string; note?: string }[];
}) {
  if (armor.length === 0 && weapons.length === 0) return null;
  return (
    <div className="species-traits-box">
      <div className="species-traits-header">{label} Proficiencies</div>
      <div className="prof-node-row">
        {armor.map((a) => (
          <span key={a} className="prof-node">
            <span className="prof-node-dot" />
            {a}
          </span>
        ))}
        {weapons.map((w) =>
          w.note ? (
            <HoverInfo key={w.label} title={w.label} lines={[w.note]}>
              <span className="prof-node is-partial">
                <span className="prof-node-dot" />
                {w.label}
              </span>
            </HoverInfo>
          ) : (
            <span key={w.label} className="prof-node">
              <span className="prof-node-dot" />
              {w.label}
            </span>
          )
        )}
      </div>
    </div>
  );
}

export default function ClassFeaturesSection({ character, onUpdateResource }: Props) {
  const resources = CLASS_RESOURCES_BY_CLASS.get(character.classAppliedName) ?? [];
  const classEntry = CLASSES_CATALOG.find((c) => c.name === character.classAppliedName);
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
        Features unlocked by your class and archetype at your current level. Hover a title for
        details. Level up to reveal more.
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
          <div className="chip-row">
            {subChoiceDefs.map((def) => {
              const chosen = character.classSubChoicePicks[def.key] ?? [];
              return chosen.map((name) => {
                const option = def.options.find((o) => o.name === name);
                if (!option) return null;
                return (
                  <HoverInfo key={`${def.key}-${name}`} title={option.name} lines={[def.label, option.text]}>
                    <span className="info-chip">{option.name}</span>
                  </HoverInfo>
                );
              });
            })}
          </div>
        </div>
      )}

      {classEntry && (
        <ProficiencyNodes
          label={character.classAppliedName}
          armor={classEntry.armorProficiencies}
          weapons={classEntry.weaponProficiencies}
        />
      )}

      {character.classTraitsText && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.classAppliedName} Features</div>
          <FeatureChips text={character.classTraitsText} />
        </div>
      )}

      {character.archetypeTraitsText && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.archetypeAppliedName} Features</div>
          <FeatureChips text={character.archetypeTraitsText} />
        </div>
      )}
    </section>
  );
}
