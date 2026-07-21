import type { Character, EquipmentItem, ItemLocation, Valuable } from "../types";
import { carryingCapacity } from "../utils";
import { GEAR_CATALOG } from "../data/gear";
import { WEAPON_CATALOG } from "../data/weapons";
import { ARMOR_CATALOG } from "../data/armor";

const ITEM_LOOKUP = new Map<string, { name: string; weight: number }>([
  ...GEAR_CATALOG.map((g) => [g.name.toLowerCase(), { name: g.name, weight: g.weight }] as const),
  ...WEAPON_CATALOG.map((w) => [w.name.toLowerCase(), { name: w.name, weight: w.weight }] as const),
  ...ARMOR_CATALOG.map((a) => [a.name.toLowerCase(), { name: a.name, weight: a.weight }] as const),
]);

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  addItem: () => void;
  updateItem: (id: string, patch: Partial<EquipmentItem>) => void;
  removeItem: (id: string) => void;
  addValuable: () => void;
  updateValuable: (id: string, patch: Partial<Valuable>) => void;
  removeValuable: (id: string) => void;
}

const LOCATIONS: ItemLocation[] = ["Donned", "Backpack", "Pouch", "Storage"];

export default function EquipmentSection({
  character,
  update,
  addItem,
  updateItem,
  removeItem,
  addValuable,
  updateValuable,
  removeValuable,
}: Props) {
  const totalWeight = character.equipment.reduce(
    (sum, item) => sum + item.weight * item.quantity,
    0
  );
  const carriedWeight = character.equipment
    .filter((item) => item.location !== "Storage")
    .reduce((sum, item) => sum + item.weight * item.quantity, 0);

  const capacity = carryingCapacity(character.abilities.str, character.size);

  return (
    <section className="sheet-section equipment-section">
      <h2>Equipment</h2>

      <div className="field field-credits">
        <label htmlFor="credits">Credits</label>
        <input
          id="credits"
          type="number"
          value={character.credits}
          onChange={(e) => update("credits", Number(e.target.value) || 0)}
        />
      </div>

      <datalist id="gear-catalog-list">
        {GEAR_CATALOG.map((g) => (
          <option key={g.name} value={g.name} />
        ))}
        {WEAPON_CATALOG.map((w) => (
          <option key={w.name} value={w.name} />
        ))}
        {ARMOR_CATALOG.map((a) => (
          <option key={a.name} value={a.name} />
        ))}
      </datalist>

      <table className="equipment-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Weight</th>
            <th>Location</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {character.equipment.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="text"
                  list="gear-catalog-list"
                  value={item.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const known = ITEM_LOOKUP.get(name.toLowerCase());
                    if (known) {
                      updateItem(item.id, { name: known.name, weight: known.weight });
                    } else {
                      updateItem(item.id, { name });
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  className="qty-input"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, { quantity: Number(e.target.value) || 0 })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  className="weight-input"
                  value={item.weight}
                  onChange={(e) =>
                    updateItem(item.id, { weight: Number(e.target.value) || 0 })
                  }
                />
              </td>
              <td>
                <select
                  value={item.location}
                  onChange={(e) =>
                    updateItem(item.id, { location: e.target.value as ItemLocation })
                  }
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={item.notes}
                  onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Total Weight on Character</td>
            <td>{carriedWeight.toFixed(1)} kg</td>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={2}>Total Weight (incl. Storage)</td>
            <td>{totalWeight.toFixed(1)} kg</td>
            <td colSpan={3}></td>
          </tr>
        </tfoot>
      </table>

      <button className="btn btn-secondary" onClick={addItem}>
        + Add Item
      </button>

      <div className="carrying-capacity">
        <div className="capacity-box">
          <div className="capacity-label">Encumbered</div>
          <div className="capacity-value">{capacity.encumbered} kg</div>
        </div>
        <div className="capacity-box">
          <div className="capacity-label">Heavily Encumbered</div>
          <div className="capacity-value">{capacity.heavilyEncumbered} kg</div>
        </div>
        <div className="capacity-box">
          <div className="capacity-label">Max Carrying</div>
          <div className="capacity-value">{capacity.maxCarrying} kg</div>
        </div>
        <div className="capacity-box">
          <div className="capacity-label">Push / Drag / Lift</div>
          <div className="capacity-value">{capacity.pushDragLift} kg</div>
        </div>
      </div>

      <div className="field">
        <label htmlFor="gems">Gems &amp; Treasure</label>
        <textarea
          id="gems"
          rows={3}
          value={character.gemsAndTreasure}
          onChange={(e) => update("gemsAndTreasure", e.target.value)}
        />
      </div>

      <h3>Valuables</h3>
      <p className="section-hint">Loaned, deposited, or received values or goods.</p>
      <table className="valuables-table">
        <thead>
          <tr>
            <th>Where</th>
            <th>How Much</th>
            <th>When</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {character.valuables.map((v) => (
            <tr key={v.id}>
              <td>
                <input
                  type="text"
                  value={v.where}
                  onChange={(e) => updateValuable(v.id, { where: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={v.howMuch}
                  onChange={(e) => updateValuable(v.id, { howMuch: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={v.when}
                  onChange={(e) => updateValuable(v.id, { when: e.target.value })}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-small"
                  onClick={() => removeValuable(v.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-secondary" onClick={addValuable}>
        + Add Valuable
      </button>
    </section>
  );
}
