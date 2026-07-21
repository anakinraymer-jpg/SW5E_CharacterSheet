import type { Character, Power, PowerAlignment } from "../types";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  addPower: () => void;
  updatePower: (id: string, patch: Partial<Power>) => void;
  removePower: (id: string) => void;
}

const ALIGNMENTS: PowerAlignment[] = ["Light", "Dark", "Universal"];

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
  const techCounts = countByAlignment(character.powers, "Tech");
  const forceCounts = countByAlignment(character.powers, "Force");

  const sortedPowers = [...character.powers].sort((a, b) => a.level - b.level);
  let lastLevel: number | null = null;

  return (
    <section className="sheet-section powers-section">
      <h2>Force &amp; Tech Powers</h2>

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

      <div className="powers-list">
        {sortedPowers.map((power) => {
          const showHeader = power.level !== lastLevel;
          lastLevel = power.level;
          return (
            <div key={power.id}>
              {showHeader && <h3 className="power-level-header">{levelLabel(power.level)}</h3>}
              <div className="power-card">
                <div className="power-card-row">
                  <input
                    type="text"
                    placeholder="Power name"
                    value={power.name}
                    onChange={(e) => updatePower(power.id, { name: e.target.value })}
                    className="power-name"
                  />
                  <select
                    value={power.type}
                    onChange={(e) =>
                      updatePower(power.id, { type: e.target.value as Power["type"] })
                    }
                  >
                    <option value="Force">Force</option>
                    <option value="Tech">Tech</option>
                  </select>
                  <select
                    value={power.alignment}
                    onChange={(e) =>
                      updatePower(power.id, { alignment: e.target.value as PowerAlignment })
                    }
                  >
                    {ALIGNMENTS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
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
                <div className="power-card-row">
                  <input
                    type="text"
                    placeholder="Casting time"
                    value={power.castingTime}
                    onChange={(e) => updatePower(power.id, { castingTime: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Range"
                    value={power.range}
                    onChange={(e) => updatePower(power.id, { range: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={power.duration}
                    onChange={(e) => updatePower(power.id, { duration: e.target.value })}
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={power.description}
                  onChange={(e) => updatePower(power.id, { description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn btn-secondary" onClick={addPower}>
        + Add Power
      </button>
    </section>
  );
}
