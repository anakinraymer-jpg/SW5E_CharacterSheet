import type { Character } from "../types";
import { weaponTooltip } from "../simpleSummaries";
import HoverInfo from "./HoverInfo";

// The Character box in Simple mode: just species, class, archetype and level. Clicking opens the
// full Character box for editing.
export function SimpleIdentity({ character, onOpen }: { character: Character; onOpen: () => void }) {
  const cells: [string, string][] = [
    ["Species", character.species],
    ["Class", character.characterClass],
    ["Archetype", character.archetype],
    ["Level", String(character.level)],
  ];
  return (
    <section className="sheet-section simple-identity">
      <button type="button" className="simple-identity-button" onClick={onOpen} title="Click to edit your character">
        {character.name && <span className="simple-identity-name">{character.name}</span>}
        <span className="simple-identity-row">
          {cells.map(([label, value]) => (
            <span key={label} className="simple-identity-cell">
              <span className="simple-identity-label">{label}</span>
              <span className="simple-identity-value">{value || "—"}</span>
            </span>
          ))}
        </span>
      </button>
    </section>
  );
}

// Weapons & Ammunitions in Simple mode: weapon names and ammo counts only; hovering a weapon shows
// its stats. Clicking the header opens the full table.
export function SimpleWeapons({ character, onOpen }: { character: Character; onOpen: () => void }) {
  return (
    <section className="sheet-section simple-weapons">
      <button type="button" className="simple-card-button" onClick={onOpen}>
        <span className="simple-card-title">Weapons &amp; Ammunitions</span>
        <span className="simple-card-open" aria-hidden="true">
          ▸
        </span>
      </button>
      {character.weapons.length === 0 ? (
        <p className="section-hint">No weapons yet.</p>
      ) : (
        <ul className="simple-weapon-list">
          {character.weapons.map((w) => (
            <li key={w.id}>
              <HoverInfo title={w.name || "Unnamed weapon"} lines={weaponTooltip(character, w)}>
                <span className="simple-weapon-name">{w.name || "Unnamed weapon"}</span>
              </HoverInfo>
              <span className="simple-weapon-ammo">{w.ammoType || w.ammoCount > 0 ? `Ammo ${w.ammoCount}` : ""}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
