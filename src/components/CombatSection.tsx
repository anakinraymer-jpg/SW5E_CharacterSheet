import type { Character, EquipmentItem } from "../types";
import { SKILL_ABILITY } from "../types";
import type { ArmorCatalogEntry } from "../data/armor";
import { abilityModifier, armorCatalogMatch, formatModifier, passivePerception, proficiencyBonus } from "../utils";
import { activeTravelPaceMultiplier } from "../classFeatureLogic";
import { toHitAbilityInfo, weaponDamageDisplay } from "../weaponLogic";
import SectionHeader from "./SectionHeader";
import HoverInfo from "./HoverInfo";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  updateItem: (id: string, patch: Partial<EquipmentItem>) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

function DeathSavePips({
  count,
  onSet,
}: {
  count: number;
  onSet: (n: number) => void;
}) {
  return (
    <div className="death-save-pips">
      {[1, 2, 3].map((n) => (
        <button
          key={n}
          type="button"
          className={`pip ${n <= count ? "pip-filled" : ""}`}
          onClick={() => onSet(n === count ? n - 1 : n)}
          aria-label={`Set ${n}`}
        />
      ))}
    </div>
  );
}

export default function CombatSection({
  character,
  update,
  updateItem,
  collapsedSections,
  onToggleSection,
}: Props) {
  const collapsed = !!collapsedSections["combat"];
  const pb = proficiencyBonus(character.level);
  const travelPaceMultiplier = activeTravelPaceMultiplier(character);
  const equippedWeapons = character.weapons.filter((w) => w.equipped);

  const armorItems = character.equipment
    .map((item) => ({ item, catalog: armorCatalogMatch(item.name) }))
    .filter(
      (x): x is { item: EquipmentItem; catalog: ArmorCatalogEntry } => Boolean(x.catalog)
    );

  const perceptionState = character.skills.Perception;
  const wisMod = abilityModifier(character.abilities[SKILL_ABILITY.Perception]);
  let perceptionBonus = wisMod;
  if (perceptionState.proficient) perceptionBonus += pb;
  if (perceptionState.expertise) perceptionBonus += pb;

  return (
    <section className="sheet-section combat-section">
      <SectionHeader title="Combat" collapsed={collapsed} onToggle={() => onToggleSection("combat")} />
      {!collapsed && (
      <>
      <div className="combat-grid">
        <div className="field">
          <label>Passive Perception</label>
          <div className="readonly-box">{passivePerception(perceptionBonus)}</div>
        </div>
      </div>

      <div className="combat-grid">
        <div className="field">
          <label htmlFor="speed-hour">Speed (hour)</label>
          <input
            id="speed-hour"
            type="number"
            value={character.speedHour}
            onChange={(e) => update("speedHour", Number(e.target.value) || 0)}
          />
          {travelPaceMultiplier > 1 && (
            <HoverInfo
              title="Travel Pace"
              lines={[`Effective: ${character.speedHour * travelPaceMultiplier} (Blurrg's Instinct doubles travel pace).`]}
            >
              <span className="rage-damage-note">
                Effective {character.speedHour * travelPaceMultiplier} (Blurrg's Instinct)
              </span>
            </HoverInfo>
          )}
        </div>
        <div className="field">
          <label htmlFor="speed-day">Speed (day)</label>
          <input
            id="speed-day"
            type="number"
            value={character.speedDay}
            onChange={(e) => update("speedDay", Number(e.target.value) || 0)}
          />
          {travelPaceMultiplier > 1 && (
            <HoverInfo
              title="Travel Pace"
              lines={[`Effective: ${character.speedDay * travelPaceMultiplier} (Blurrg's Instinct doubles travel pace).`]}
            >
              <span className="rage-damage-note">
                Effective {character.speedDay * travelPaceMultiplier} (Blurrg's Instinct)
              </span>
            </HoverInfo>
          )}
        </div>
        <div className="field">
          <label htmlFor="vision">Vision</label>
          <input
            id="vision"
            type="text"
            placeholder="e.g. Darkvision 60 ft."
            value={character.vision}
            onChange={(e) => update("vision", e.target.value)}
          />
        </div>
        <div className="field field-wide">
          <label htmlFor="special-movement">Special Movement</label>
          <input
            id="special-movement"
            type="text"
            value={character.specialMovement}
            onChange={(e) => update("specialMovement", e.target.value)}
          />
        </div>
      </div>

      <div className="combat-grid">
        <div className="field">
          <label htmlFor="hit-dice-total">Hit Dice (Max)</label>
          <input
            id="hit-dice-total"
            type="text"
            value={character.hitDiceTotal}
            onChange={(e) => update("hitDiceTotal", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="hit-dice-remaining">Hit Dice (Remaining)</label>
          <input
            id="hit-dice-remaining"
            type="text"
            value={character.hitDiceRemaining}
            onChange={(e) => update("hitDiceRemaining", e.target.value)}
          />
        </div>
      </div>

      <div className="hp-grid">
        <div className="field">
          <label htmlFor="max-hp">Max HP</label>
          <input
            id="max-hp"
            type="number"
            value={character.maxHp}
            onChange={(e) => update("maxHp", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="current-hp">Current HP</label>
          <input
            id="current-hp"
            type="number"
            value={character.currentHp}
            onChange={(e) => update("currentHp", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="temp-hp">Temp HP</label>
          <input
            id="temp-hp"
            type="number"
            value={character.tempHp}
            onChange={(e) => update("tempHp", Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="death-saves">
        <div className="death-saves-row">
          <span>Death Saves — Successes</span>
          <DeathSavePips
            count={character.deathSaves.successes}
            onSet={(n) => update("deathSaves", { ...character.deathSaves, successes: n })}
          />
        </div>
        <div className="death-saves-row">
          <span>Death Saves — Failures</span>
          <DeathSavePips
            count={character.deathSaves.failures}
            onSet={(n) => update("deathSaves", { ...character.deathSaves, failures: n })}
          />
        </div>
      </div>

      {character.classAppliedName === "Monk" && (
        <div className="field">
          <label>Unarmored Defense Ability</label>
          <div className="power-type-toggle">
            <button
              type="button"
              className={`btn btn-small ${character.monkUnarmoredDefenseAbility === "wis" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => update("monkUnarmoredDefenseAbility", "wis")}
            >
              Wisdom
            </button>
            <button
              type="button"
              className={`btn btn-small ${character.monkUnarmoredDefenseAbility === "cha" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => update("monkUnarmoredDefenseAbility", "cha")}
            >
              Charisma
            </button>
          </div>
        </div>
      )}

      <div className="field field-wide">
        <label>Armor, Shield, Protections</label>
        {armorItems.length > 0 ? (
          <div className="armor-equip-list">
            {armorItems.map(({ item, catalog }) => (
              <label key={item.id} className="armor-equip-row">
                <input
                  type="checkbox"
                  checked={item.equipped}
                  onChange={(e) => updateItem(item.id, { equipped: e.target.checked })}
                />
                <span className="armor-equip-name">{item.name}</span>
                <span className="armor-equip-meta">
                  {catalog.type} · AC {catalog.ac}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <p className="section-hint">
            No armor or shields in your Equipment inventory yet. Add one there and it'll show up
            here to equip.
          </p>
        )}
        <textarea
          id="armor-notes"
          rows={2}
          placeholder="Additional notes: enchantment bonus, special properties, etc."
          value={character.armorNotes}
          onChange={(e) => update("armorNotes", e.target.value)}
        />
      </div>

      <div className="field field-wide">
        <label>Equipped Weapons</label>
        {equippedWeapons.length > 0 ? (
          <div className="armor-equip-list">
            {equippedWeapons.map((w) => {
              const { mod: abilityMod, label: abilityLabel } = toHitAbilityInfo(character, w.name);
              const toHit = abilityMod + (w.proficient ? pb : 0);
              const { display: damageDisplay } = weaponDamageDisplay(character, w);
              return (
                <div key={w.id} className="armor-equip-row is-readonly">
                  <span className="armor-equip-name">{w.name || "Unnamed weapon"}</span>
                  <span className="armor-equip-meta">
                    To Hit {formatModifier(toHit)} ({abilityLabel}) · {damageDisplay || "no damage set"} · {w.range || "Melee"}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="section-hint">
            No weapons equipped. Check Equipped in the Weapons &amp; Ammunitions table to show them
            here.
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="resistances">Advantages, Resistances, Immunities</label>
        <textarea
          id="resistances"
          rows={3}
          value={character.resistances}
          onChange={(e) => update("resistances", e.target.value)}
        />
      </div>
      </>
      )}
    </section>
  );
}
