import type { CombatFeature, RefreshType, Weapon } from "../types";

interface Props {
  weapons: Weapon[];
  addWeapon: () => void;
  updateWeapon: (id: string, patch: Partial<Weapon>) => void;
  removeWeapon: (id: string) => void;
  combatFeatures: CombatFeature[];
  addCombatFeature: () => void;
  updateCombatFeature: (id: string, patch: Partial<CombatFeature>) => void;
  removeCombatFeature: (id: string) => void;
}

const REFRESH_OPTIONS: RefreshType[] = ["At Will", "Short Rest", "Long Rest"];

export default function WeaponsSection({
  weapons,
  addWeapon,
  updateWeapon,
  removeWeapon,
  combatFeatures,
  addCombatFeature,
  updateCombatFeature,
  removeCombatFeature,
}: Props) {
  return (
    <section className="sheet-section weapons-section">
      <h2>Weapons &amp; Ammunitions</h2>
      <table className="weapons-table">
        <thead>
          <tr>
            <th>Weapon</th>
            <th>Attack</th>
            <th>Damage/Type</th>
            <th>Range</th>
            <th>Weight</th>
            <th>Ammo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {weapons.map((w) => (
            <tr key={w.id}>
              <td>
                <input
                  type="text"
                  value={w.name}
                  onChange={(e) => updateWeapon(w.id, { name: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="attack-input"
                  value={w.attackBonus}
                  onChange={(e) => updateWeapon(w.id, { attackBonus: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={w.damage}
                  onChange={(e) => updateWeapon(w.id, { damage: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="range-input"
                  value={w.range}
                  onChange={(e) => updateWeapon(w.id, { range: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  className="weight-input"
                  value={w.weight}
                  onChange={(e) =>
                    updateWeapon(w.id, { weight: Number(e.target.value) || 0 })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ammo-input"
                  value={w.ammo}
                  onChange={(e) => updateWeapon(w.id, { ammo: e.target.value })}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => removeWeapon(w.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-secondary" onClick={addWeapon}>
        + Add Weapon
      </button>

      <h3>Combat Features</h3>
      <p className="section-hint">Feats, abilities, and other features for quick reference in combat.</p>
      <div className="combat-features-list">
        {combatFeatures.map((f) => (
          <div className="combat-feature-row" key={f.id}>
            <label className="feature-used-toggle">
              <input
                type="checkbox"
                checked={f.used}
                onChange={(e) => updateCombatFeature(f.id, { used: e.target.checked })}
              />
              Used
            </label>
            <input
              type="text"
              className="feature-name"
              placeholder="Feature name"
              value={f.name}
              onChange={(e) => updateCombatFeature(f.id, { name: e.target.value })}
            />
            <select
              value={f.refresh}
              onChange={(e) =>
                updateCombatFeature(f.id, { refresh: e.target.value as RefreshType })
              }
            >
              {REFRESH_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              className="btn btn-danger btn-small"
              onClick={() => removeCombatFeature(f.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary" onClick={addCombatFeature}>
        + Add Combat Feature
      </button>
    </section>
  );
}
