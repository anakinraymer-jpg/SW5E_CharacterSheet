import type { Character, CombatFeature, RefreshType, Weapon } from "../types";
import { WEAPON_CATALOG, type WeaponCatalogEntry } from "../data/weapons";
import { GEAR_CATALOG } from "../data/gear";
import { CLASSES_CATALOG, MONK_WEAPON_NAMES } from "../data/classes";
import { BERSERKER_RAGE_DAMAGE_BY_LEVEL, MONK_MARTIAL_ARTS_DIE_BY_LEVEL } from "../data/classFeatureChoices";
import { monkRetainsUnarmoredBenefits } from "../classFeatureLogic";
import { WEAPON_LOOKUP, toHitAbilityInfo, weaponDamageDisplay } from "../weaponLogic";
import { formatModifier, proficiencyBonus } from "../utils";
import SectionHeader from "./SectionHeader";
import HoverInfo from "./HoverInfo";

const MONK_WEAPON_NAME_SET = new Set(MONK_WEAPON_NAMES.map((n) => n.toLowerCase()));

function extractRange(property: string): string {
  const match = property.match(/\((?:range )?(\d+(?:\/\d+)?)\)/i);
  return match ? `${match[1]} ft` : "Melee";
}

const AMMO_TYPES = GEAR_CATALOG.filter((g) => g.category === "Ammunition").map((g) => g.name);

// Best-effort default for a newly-picked catalog weapon: does the applied class's broad
// proficiency list (e.g. "All Vibroweapons", "Simple Blasters") cover this weapon's type?
// Ignores per-entry exclusion notes (e.g. Monk's "lacking heavy/dex/special/two-handed") since
// this is only a starting point — the Proficient checkbox is always player-editable.
function classProficientWithType(weaponType: string, label: string): boolean {
  const normLabel = label.toLowerCase();
  const normType = weaponType.toLowerCase();
  const category = normType.includes("blaster")
    ? "blaster"
    : normType.includes("vibroweapon")
      ? "vibroweapon"
      : normType.includes("lightweapon")
        ? "lightweapon"
        : null;
  if (!category || !normLabel.includes(category)) return false;
  if (normLabel.startsWith("all")) return true;
  if (normLabel.startsWith("simple")) return normType.startsWith("simple");
  if (normLabel.startsWith("martial")) return normType.startsWith("martial");
  return false;
}

function defaultProficient(className: string, entry: WeaponCatalogEntry): boolean {
  if (entry.name === "Unarmed Strike") return true; // everyone is always proficient with unarmed strikes
  const classEntry = CLASSES_CATALOG.find((c) => c.name === className);
  if (!classEntry) return false;
  return classEntry.weaponProficiencies.some((wp) => classProficientWithType(entry.type, wp.label));
}

interface Props {
  character: Character;
  weapons: Weapon[];
  addWeapon: () => void;
  updateWeapon: (id: string, patch: Partial<Weapon>) => void;
  removeWeapon: (id: string) => void;
  combatFeatures: CombatFeature[];
  addCombatFeature: () => void;
  updateCombatFeature: (id: string, patch: Partial<CombatFeature>) => void;
  removeCombatFeature: (id: string) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

const REFRESH_OPTIONS: RefreshType[] = ["At Will", "Short Rest", "Long Rest"];

export default function WeaponsSection({
  character,
  weapons,
  addWeapon,
  updateWeapon,
  removeWeapon,
  combatFeatures,
  addCombatFeature,
  updateCombatFeature,
  removeCombatFeature,
  collapsedSections,
  onToggleSection,
}: Props) {
  const collapsed = !!collapsedSections["weapons"];
  const pb = proficiencyBonus(character.level);
  const isRaging = character.classAppliedName === "Berserker" && character.isRaging;
  const rageDamageBonus = BERSERKER_RAGE_DAMAGE_BY_LEVEL[Math.max(1, Math.min(20, character.level || 1)) - 1];
  const hasMartialArts = character.classAppliedName === "Monk" && monkRetainsUnarmoredBenefits(character);
  const martialArtsDie = MONK_MARTIAL_ARTS_DIE_BY_LEVEL[Math.max(1, Math.min(20, character.level || 1)) - 1];
  return (
    <section className="sheet-section weapons-section">
      <SectionHeader
        title="Weapons & Ammunitions"
        collapsed={collapsed}
        onToggle={() => onToggleSection("weapons")}
      />
      {!collapsed && (
      <>
      <datalist id="weapon-catalog-list">
        {WEAPON_CATALOG.map((w) => (
          <option key={w.name} value={w.name} />
        ))}
      </datalist>
      <datalist id="ammo-type-list">
        {AMMO_TYPES.map((a) => (
          <option key={a} value={a} />
        ))}
      </datalist>
      <div className="table-scroll">
      <table className="weapons-table">
        <thead>
          <tr>
            <th>Weapon</th>
            <th>Equipped</th>
            <th>Prof.</th>
            <th>To Hit Bonus</th>
            <th>Damage/Type</th>
            <th>Range</th>
            <th>Weight</th>
            <th>Ammo Count</th>
            <th>Ammo Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {weapons.map((w) => {
            const { mod: abilityMod, label: abilityLabel } = toHitAbilityInfo(character, w.name);
            const toHit = abilityMod + (w.proficient ? pb : 0);
            const toHitLines = [
              `${abilityLabel} modifier: ${formatModifier(abilityMod)}`,
              w.proficient ? `Proficiency Bonus: ${formatModifier(pb)}` : "Not proficient",
            ];
            return (
            <tr key={w.id}>
              <td>
                <input
                  type="text"
                  list="weapon-catalog-list"
                  value={w.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const known = WEAPON_LOOKUP.get(name.toLowerCase());
                    if (known) {
                      updateWeapon(w.id, {
                        name: known.name,
                        damage: known.damage,
                        weight: known.weight,
                        range: extractRange(known.property),
                        proficient: defaultProficient(character.classAppliedName, known),
                      });
                    } else {
                      updateWeapon(w.id, { name });
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={w.equipped}
                  onChange={(e) => updateWeapon(w.id, { equipped: e.target.checked })}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={w.proficient}
                  onChange={(e) => updateWeapon(w.id, { proficient: e.target.checked })}
                />
              </td>
              <td>
                <HoverInfo title="To Hit Bonus Breakdown" lines={toHitLines}>
                  <div className="readonly-box to-hit-box">{formatModifier(toHit)}</div>
                </HoverInfo>
              </td>
              <td>
                {w.name.trim().toLowerCase() === "unarmed strike" ? (
                  (() => {
                    const { display, lines } = weaponDamageDisplay(character, w);
                    return (
                      <HoverInfo title="Unarmed Strike Damage" lines={lines}>
                        <div className="readonly-box to-hit-box">{display}</div>
                      </HoverInfo>
                    );
                  })()
                ) : (
                  <>
                    <input
                      type="text"
                      value={w.damage}
                      onChange={(e) => updateWeapon(w.id, { damage: e.target.value })}
                    />
                    {isRaging && abilityLabel === "Strength" && (
                      <HoverInfo
                        title="Rage Damage"
                        lines={[`+${rageDamageBonus} to this melee damage roll while raging (Strength-based).`]}
                      >
                        <span className="rage-damage-note">+{rageDamageBonus} Rage</span>
                      </HoverInfo>
                    )}
                    {hasMartialArts && MONK_WEAPON_NAME_SET.has(w.name.trim().toLowerCase()) && (
                      <HoverInfo
                        title="Martial Arts"
                        lines={[
                          `You can roll 1${martialArtsDie} + ${abilityLabel} modifier (${formatModifier(abilityMod)}) in place of this weapon's normal damage when you make a monk weapon attack.`,
                        ]}
                      >
                        <span className="rage-damage-note">Martial Arts: 1{martialArtsDie}{formatModifier(abilityMod)}</span>
                      </HoverInfo>
                    )}
                  </>
                )}
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
                  type="number"
                  min={0}
                  className="ammo-count-input"
                  value={w.ammoCount}
                  onChange={(e) => updateWeapon(w.id, { ammoCount: Number(e.target.value) || 0 })}
                />
              </td>
              <td>
                <input
                  type="text"
                  list="ammo-type-list"
                  className="ammo-type-input"
                  value={w.ammoType}
                  onChange={(e) => updateWeapon(w.id, { ammoType: e.target.value })}
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
            );
          })}
        </tbody>
      </table>
      </div>
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
      </>
      )}
    </section>
  );
}
