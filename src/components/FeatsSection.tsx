import { useState } from "react";
import type { Character } from "../types";
import { FEATS_CATALOG } from "../data/feats";
import { buildFeatText } from "../featLogic";
import HoverInfo from "./HoverInfo";

const FEATS_BY_NAME = new Map(FEATS_CATALOG.map((f) => [f.name, f]));
const FEAT_NAMES = FEATS_CATALOG.map((f) => f.name);

interface Props {
  character: Character;
  onAddFeat: (name: string) => void;
  onRemoveFeat: (id: string) => void;
}

export default function FeatsSection({ character, onAddFeat, onRemoveFeat }: Props) {
  const [pendingName, setPendingName] = useState("");

  function handleAdd() {
    const match = FEATS_CATALOG.find((f) => f.name.toLowerCase() === pendingName.trim().toLowerCase());
    if (!match) return;
    onAddFeat(match.name);
    setPendingName("");
  }

  return (
    <section className="sheet-section feats-section">
      <h2>Feats</h2>
      <p className="section-hint">
        Choose a feat to add it to your character. Fixed benefits (ability increases, granted
        skills) apply automatically; feats with choices will prompt you.
      </p>

      <datalist id="feats-catalog-list">
        {FEAT_NAMES.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>
      <div className="choice-selects">
        <input
          type="text"
          list="feats-catalog-list"
          placeholder="Feat name…"
          value={pendingName}
          onChange={(e) => setPendingName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        <button className="btn btn-secondary" onClick={handleAdd}>
          + Add Feat
        </button>
      </div>

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
    </section>
  );
}
