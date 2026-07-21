import type { Character, Power } from "../types";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  addPower: () => void;
  updatePower: (id: string, patch: Partial<Power>) => void;
  removePower: (id: string) => void;
}

export default function PowersSection({
  character,
  update,
  addPower,
  updatePower,
  removePower,
}: Props) {
  return (
    <section className="sheet-section powers-section">
      <h2>Force &amp; Tech Powers</h2>

      <div className="points-grid">
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
          <label htmlFor="force-die">Force Die</label>
          <input
            id="force-die"
            type="text"
            value={character.forceDie}
            onChange={(e) => update("forceDie", e.target.value)}
          />
        </div>
      </div>

      <div className="powers-list">
        {character.powers.map((power) => (
          <div className="power-card" key={power.id}>
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
        ))}
      </div>

      <button className="btn btn-secondary" onClick={addPower}>
        + Add Power
      </button>
    </section>
  );
}
