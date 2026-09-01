import type { Character } from "../types";
import {
  BERSERKER_RAGE_DAMAGE_BY_LEVEL,
  CLASS_RESOURCES_BY_CLASS,
  CLASS_SUB_CHOICES_BY_CLASS,
} from "../data/classFeatureChoices";
import { CLASSES_CATALOG } from "../data/classes";
import { formatModifier } from "../utils";
import HoverInfo from "./HoverInfo";
import SectionHeader from "./SectionHeader";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  onUpdateResource: (key: string, current: number) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
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

export default function ClassFeaturesSection({
  character,
  update,
  onUpdateResource,
  collapsedSections,
  onToggleSection,
}: Props) {
  const collapsed = !!collapsedSections["classFeatures"];
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
      <SectionHeader
        title="Class Features"
        collapsed={collapsed}
        onToggle={() => onToggleSection("classFeatures")}
      />
      {!collapsed && (
      <>
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

      {character.classAppliedName === "Berserker" && (
        <div className="species-traits-box">
          <div className="species-traits-header">Rage</div>
          <button
            type="button"
            className={`btn btn-small ${character.isRaging ? "btn-primary" : "btn-secondary"}`}
            onClick={() => update("isRaging", !character.isRaging)}
          >
            {character.isRaging ? "Raging — Click to End" : "Start Raging"}
          </button>
          {character.isRaging && (
            <div className="chip-row" style={{ marginTop: 8 }}>
              <HoverInfo
                title="Advantage on Strength"
                lines={["Advantage on Strength checks and saving throws while raging."]}
              >
                <span className="info-chip">Advantage: Strength checks &amp; saves</span>
              </HoverInfo>
              <HoverInfo
                title="Damage Resistance"
                lines={["Resistance to kinetic and energy damage while raging."]}
              >
                <span className="info-chip">Resistance: Kinetic &amp; Energy</span>
              </HoverInfo>
              <HoverInfo
                title="Rage Damage"
                lines={[
                  `+${BERSERKER_RAGE_DAMAGE_BY_LEVEL[Math.max(1, Math.min(20, character.level || 1)) - 1]} to melee damage rolls using Strength.`,
                  "Shown automatically next to qualifying weapons in the Weapons & Ammunitions table.",
                ]}
              >
                <span className="info-chip">
                  {formatModifier(
                    BERSERKER_RAGE_DAMAGE_BY_LEVEL[Math.max(1, Math.min(20, character.level || 1)) - 1]
                  )}{" "}
                  melee damage (Str)
                </span>
              </HoverInfo>
              <HoverInfo title="Casting" lines={["You can't cast or concentrate on powers while raging."]}>
                <span className="info-chip">No casting/concentration</span>
              </HoverInfo>
            </div>
          )}
        </div>
      )}

      {hasChosenSubChoices && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.classAppliedName} Choices</div>
          <div className="chip-row">
            {subChoiceDefs.map((def) => {
              const chosen = character.classSubChoicePicks[def.key] ?? [];
              const details = character.classSubChoiceDetails[def.key] ?? [];
              return chosen.map((name, i) => {
                const option = def.options.find((o) => o.name === name);
                if (!option) return null;
                const detail = details[i];
                const extra: string[] = [];
                if (detail?.languages?.length) extra.push(`Languages: ${detail.languages.join(", ")}`);
                if (detail?.skill) extra.push(`Skill: ${detail.skill}`);
                if (detail?.tools?.length) extra.push(`Tool${detail.tools.length > 1 ? "s" : ""}: ${detail.tools.join(", ")}`);
                if (detail?.weapons?.length) extra.push(`Weapons: ${detail.weapons.join(", ")}`);
                if (detail?.fightingStyle) extra.push(`Fighting Style: ${detail.fightingStyle}`);
                if (detail?.fightingMastery) extra.push(`Fighting Mastery: ${detail.fightingMastery}`);
                if (detail?.lightsaberForms?.length) extra.push(`Lightsaber Forms: ${detail.lightsaberForms.join(", ")}`);
                return (
                  <HoverInfo
                    key={`${def.key}-${name}-${i}`}
                    title={option.name}
                    lines={[def.label, option.text, ...extra]}
                  >
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

      {character.classEquipmentText.length > 0 && (
        <div className="species-traits-box">
          <div className="species-traits-header">{character.classAppliedName} Starting Equipment</div>
          {character.classEquipmentText.map((line, i) => (
            <p key={i} className="species-trait-line">
              {line}
            </p>
          ))}
          <p className="section-hint" style={{ marginTop: 6, marginBottom: 0 }}>
            Weapons and armor from these choices are added to your Weapons and Combat sections
            automatically. Starting packs are added as a single item — see sw5e.com for contents.
          </p>
        </div>
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
      </>
      )}
    </section>
  );
}
