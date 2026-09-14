import type { Character } from "../types";
import { FEATS_CATALOG } from "../data/feats";
import { buildFeatText } from "../featLogic";
import SectionHeader from "./SectionHeader";

const FEATS_BY_NAME = new Map(FEATS_CATALOG.map((f) => [f.name, f]));

interface Props {
  character: Character;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

function TraitsGroup({ title, text }: { title: string; text: string }) {
  if (!text) return null;
  return (
    <div className="species-traits-box">
      <div className="species-traits-header">{title}</div>
      {text.split("\n\n").map((line, i) => (
        <p key={i} className="species-trait-line">
          {line}
        </p>
      ))}
    </div>
  );
}

// A single read-only reference view combining every source of "things this character has" that
// are otherwise scattered across Character (species traits), Class Features (class + archetype),
// and Feats — for quickly reading through everything at once without hopping between sections.
export default function TraitsFeaturesSection({ character, collapsedSections, onToggleSection }: Props) {
  const collapsed = !!collapsedSections["traitsFeatures"];
  const featLines = character.feats
    .map((cf) => {
      const feat = FEATS_BY_NAME.get(cf.name);
      return feat ? `${feat.name}. ${buildFeatText(feat, cf)}` : null;
    })
    .filter((t): t is string => Boolean(t))
    .join("\n\n");

  const nothingYet =
    !character.speciesTraitsText && !character.classTraitsText && !character.archetypeTraitsText && !featLines;

  return (
    <section className="sheet-section traits-features-section">
      <SectionHeader
        title="Traits & Features"
        collapsed={collapsed}
        onToggle={() => onToggleSection("traitsFeatures")}
      />
      {!collapsed && (
        <>
          <p className="section-hint">
            Every species trait, class/archetype feature, and feat your character currently has, all
            in one place. Apply a species/class/archetype or add feats elsewhere on the sheet — they
            show up here automatically.
          </p>
          {nothingYet && <p className="section-hint">Nothing to show yet.</p>}
          <TraitsGroup title={`${character.speciesAppliedName} Traits`} text={character.speciesTraitsText} />
          <TraitsGroup title={`${character.classAppliedName} Class Features`} text={character.classTraitsText} />
          <TraitsGroup
            title={`${character.archetypeAppliedName} Archetype Features`}
            text={character.archetypeTraitsText}
          />
          <TraitsGroup title="Feats" text={featLines} />
        </>
      )}
    </section>
  );
}
