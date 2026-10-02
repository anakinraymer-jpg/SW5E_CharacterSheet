import { useState } from "react";
import type { Character } from "../types";
import { FEATS_CATALOG } from "../data/feats";
import { buildFeatText } from "../featLogic";
import { FEAT_OPTIONS, featDetails } from "../pickerCatalogs";
import HoverInfo from "./HoverInfo";
import PickerDialog from "./PickerDialog";
import SectionHeader from "./SectionHeader";

const FEATS_BY_NAME = new Map(FEATS_CATALOG.map((f) => [f.name, f]));

interface Props {
  character: Character;
  onAddFeat: (name: string) => void;
  onRemoveFeat: (id: string) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

export default function FeatsSection({
  character,
  onAddFeat,
  onRemoveFeat,
  collapsedSections,
  onToggleSection,
}: Props) {
  const collapsed = !!collapsedSections["feats"];
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <section className="sheet-section feats-section">
      <SectionHeader title="Feats" collapsed={collapsed} onToggle={() => onToggleSection("feats")} />
      {!collapsed && (
      <>
      <p className="section-hint">
        Choose a feat to add it to your character. Fixed benefits (ability increases, granted
        skills) apply automatically; feats with choices will prompt you.
      </p>

      <div className="choice-selects">
        <button className="btn btn-secondary" onClick={() => setPickerOpen(true)}>
          + Add Feat
        </button>
      </div>
      {pickerOpen && (
        <PickerDialog
          title="Add a feat"
          options={FEAT_OPTIONS}
          getDetails={featDetails}
          onClose={() => setPickerOpen(false)}
          onPick={(name) => {
            setPickerOpen(false);
            onAddFeat(name);
          }}
        />
      )}

      {character.feats.length === 0 && <p className="section-hint">No feats added yet.</p>}

      <div className="chip-row">
        {character.feats.map((cf) => {
          const feat = FEATS_BY_NAME.get(cf.name);
          if (!feat) return null;
          return (
            <HoverInfo key={cf.id} title={feat.name} lines={buildFeatText(feat, cf).split("\n\n")}>
              <span className="info-chip">
                {feat.name}
                <button className="btn btn-danger btn-small" onClick={() => onRemoveFeat(cf.id)}>
                  ×
                </button>
              </span>
            </HoverInfo>
          );
        })}
      </div>
      </>
      )}
    </section>
  );
}
