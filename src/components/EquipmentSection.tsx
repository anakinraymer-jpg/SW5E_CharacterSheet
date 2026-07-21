import type { Character, EquipmentItem } from "../types";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  addItem: () => void;
  updateItem: (id: string, patch: Partial<EquipmentItem>) => void;
  removeItem: (id: string) => void;
}

export default function EquipmentSection({
  character,
  update,
  addItem,
  updateItem,
  removeItem,
}: Props) {
  const totalWeight = character.equipment.reduce(
    (sum, item) => sum + item.weight * item.quantity,
    0
  );

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

      <table className="equipment-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Weight</th>
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
                  value={item.name}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
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
            <td colSpan={2}>Total Weight</td>
            <td>{totalWeight.toFixed(1)} kg</td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>

      <button className="btn btn-secondary" onClick={addItem}>
        + Add Item
      </button>
    </section>
  );
}
