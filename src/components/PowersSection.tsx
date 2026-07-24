import { useState } from "react";
import type { Character, Power, PowerAlignment } from "../types";
import { FORCE_POWERS, TECH_POWERS } from "../data/powers";
import HoverInfo from "./HoverInfo";

const FORCE_POWER_LOOKUP = new Map(FORCE_POWERS.map((p) => [p.name.toLowerCase(), p]));
const TECH_POWER_LOOKUP = new Map(TECH_POWERS.map((p) => [p.name.toLowerCase(), p]));

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  addPower: (type: Power["type"]) => void;
  updatePower: (id: string, patch: Partial<Power>) => void;
  removePower: (id: string) => void;
}

function levelLabel(level: number): string {
  if (level <= 0) return "At-Will";
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  const suffix = suffixes[level] ?? "th";
  return `${level}${suffix} Level`;
}

function countByAlignment(powers: Power[], type: Power["type"]) {
  const counts: Record<PowerAlignment, number> = { Light: 0, Dark: 0, Universal: 0 };
  for (const p of powers) {
    if (p.type === type) counts[p.alignment]++;
  }
  return counts;
}

export default function PowersSection({
  character,
  update,
  addPower,
  updatePower,
  removePower,
}: Props) {
  const [activeType, setActiveType] = useState<Power["type"]>("Force");

  const techCounts = countByAlignment(character.powers, "Tech");
  const forceCounts = countByAlignment(character.powers, "Force");

  const sortedPowers = [...character.powers]
    .filter((p) => p.type === activeType)
    .sort((a, b) => a.level - b.level);
  let lastLevel: number | null = null;

  return (
    <section className="sheet-section powers-section">
      <h2>Force &amp; Tech Powers</h2>

      <datalist id="force-power-list">
        {FORCE_POWERS.map((p) => (
          <option key={p.name} value={p.name} />
        ))}
      </datalist>
      <datalist id="tech-power-list">
        {TECH_POWERS.map((p) => (
          <option key={p.name} value={p.name} />
        ))}
      </datalist>

      <div className="points-grid">
        <div className="field">
          <label htmlFor="tech-current">Tech Points</label>
          <div className="points-pair">
            <input
              id="tech-current"
              type="number"
              value={character.techPoints.current}
              onChange={(e) =>
                update("techPoints", {
                  ...character.techPoints,
                  current: Number(e.target.value) || 0,
                })
              }
            />
            <span>/</span>
            <input
              type="number"
              value={character.techPoints.max}
              onChange={(e) =>
                update("techPoints", {
                  ...character.techPoints,
                  max: Number(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="force-current">Force Points</label>
          <div className="points-pair">
            <input
              id="force-current"
              type="number"
              value={character.forcePoints.current}
              onChange={(e) =>
                update("forcePoints", {
                  ...character.forcePoints,
                  current: Number(e.target.value) || 0,
                })
              }
            />
            <span>/</span>
            <input
              type="number"
              value={character.forcePoints.max}
              onChange={(e) =>
                update("forcePoints", {
                  ...character.forcePoints,
                  max: Number(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="force-die">Force Die</label>
          <input
            id="force-die"
            type="text"
            value={character.forceDie}
            onChange={(e) => update("forceDie", e.target.value)}
          />
        </div>
      </div>

      <div className="points-grid">
        <div className="field">
          <label htmlFor="tech-attack">Tech Attack Modifier</label>
          <input
            id="tech-attack"
            type="number"
            value={character.techAttackModifier}
            onChange={(e) => update("techAttackModifier", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="tech-dc">Tech Save DC</label>
          <input
            id="tech-dc"
            type="number"
            value={character.techSaveDC}
            onChange={(e) => update("techSaveDC", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="force-attack">Force Attack Modifier</label>
          <input
            id="force-attack"
            type="number"
            value={character.forceAttackModifier}
            onChange={(e) => update("forceAttackModifier", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="force-dc">Force Save DC</label>
          <input
            id="force-dc"
            type="number"
            value={character.forceSaveDC}
            onChange={(e) => update("forceSaveDC", Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="alignment-counts">
        <div>
          Tech known — Light {techCounts.Light}, Dark {techCounts.Dark}, Universal{" "}
          {techCounts.Universal}
        </div>
        <div>
          Force known — Light {forceCounts.Light}, Dark {forceCounts.Dark}, Universal{" "}
          {forceCounts.Universal}
        </div>
      </div>

      <div className="power-type-toggle">
        <button
          type="button"
          className={`btn ${activeType === "Force" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveType("Force")}
        >
          Force
        </button>
        <button
          type="button"
          className={`btn ${activeType === "Tech" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveType("Tech")}
        >
          Tech
        </button>
      </div>

      <div className="powers-list">
        {sortedPowers.map((power) => {
          const showHeader = power.level !== lastLevel;
          lastLevel = power.level;
          const known =
            power.type === "Force"
              ? FORCE_POWER_LOOKUP.get(power.name.toLowerCase())
              : TECH_POWER_LOOKUP.get(power.name.toLowerCase());
          const tooltipLines = [
            `Level: ${levelLabel(power.level)}`,
            power.type === "Force" ? `Alignment: ${power.alignment}` : "",
            power.castingTime ? `Casting Time: ${power.castingTime}` : "",
            power.range ? `Range: ${power.range}` : "",
            power.duration ? `Duration: ${power.duration}` : "",
            known ? `Concentration: ${known.concentration ? "Yes" : "No"}` : "",
            known && "prerequisite" in known && known.prerequisite !== "-"
              ? `Prerequisite: ${known.prerequisite}`
              : "",
            known?.description ?? "",
            power.description,
          ].filter(Boolean);
          return (
            <div key={power.id}>
              {showHeader && <h3 className="power-level-header">{levelLabel(power.level)}</h3>}
              <div className="power-card">
                <HoverInfo className="power-name-wrap" title={power.name || "Power"} lines={tooltipLines}>
                  <div className="power-name-line">
                    <input
                      type="text"
                      placeholder="Power name"
                      list={power.type === "Force" ? "force-power-list" : "tech-power-list"}
                      value={power.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        if (power.type === "Force") {
                          const knownPower = FORCE_POWER_LOOKUP.get(name.toLowerCase());
                          if (knownPower) {
                            updatePower(power.id, {
                              name: knownPower.name,
                              level: knownPower.level,
                              alignment: knownPower.alignment,
                              castingTime: knownPower.castingTime,
                              range: knownPower.range,
                              duration: knownPower.duration,
                            });
                            return;
                          }
                        } else {
                          const knownPower = TECH_POWER_LOOKUP.get(name.toLowerCase());
                          if (knownPower) {
                            updatePower(power.id, {
                              name: knownPower.name,
                              level: knownPower.level,
                              castingTime: knownPower.castingTime,
                              range: knownPower.range,
                              duration: knownPower.duration,
                            });
                            return;
                          }
                        }
                        updatePower(power.id, { name });
                      }}
                      className="power-name"
                    />
                    {power.type === "Force" && power.name && (
                      <span className="power-alignment-suffix">({power.alignment})</span>
                    )}
                  </div>
                </HoverInfo>
                <div className="power-card-row">
                  <input
                    type="number"
                    min={0}
                    max={9}
                    value={power.level}
                    onChange={(e) =>
                      updatePower(power.id, { level: Number(e.target.value) || 0 })
                    }
                    title="Power level"
                    className="power-level"
                  />
                  <label className="prepared-toggle">
                    <input
                      type="checkbox"
                      checked={power.prepared}
                      onChange={(e) => updatePower(power.id, { prepared: e.target.checked })}
                    />
                    Prepared
                  </label>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => removePower(power.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn btn-secondary" onClick={() => addPower(activeType)}>
        + Add {activeType} Power
      </button>
    </section>
  );
}
