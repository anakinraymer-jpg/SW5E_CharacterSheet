import type { Character, EquipmentItem } from "../types";
import { SKILL_ABILITY } from "../types";
import type { ArmorCatalogEntry } from "../data/armor";
import { abilityModifier, armorCatalogMatch, formatModifier, passivePerception, proficiencyBonus } from "../utils";
import { activeHpBonusSources, activeTravelPaceMultiplier, effectiveMaxHp, extraAttackInfo } from "../classFeatureLogic";
import { customItemSummary } from "../customItems";
import { toHitAbilityInfo, weaponDamageDisplay } from "../weaponLogic";
import { hasFeat } from "../featLogic";
import { INFUSE_ITEM_TEXT, canInfuseWeapon, infuseItemBonus, infusedWeaponBonus } from "../infuseItem";
import { isModifiedItem, modWeaponBonus } from "../modifications";
import { archetypeWeaponDamageBonus } from "../archetypeEffects";
import { ARMOR_PROPERTY_DEFINITIONS } from "../data/legend";
import SectionHeader from "./SectionHeader";
import HoverInfo from "./HoverInfo";
import PropertyTagList from "./PropertyTagList";
import NumberInput from "./NumberInput";

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
  const hpBonusSources = activeHpBonusSources(character);
  const hpBonus = hpBonusSources.reduce((sum, s) => sum + s.amount, 0);
  const extraAttack = extraAttackInfo(character);
  const equippedWeapons = character.weapons.filter((w) => w.equipped);

  const armorItems = character.equipment
    .map((item) => ({ item, catalog: armorCatalogMatch(item.name) }))
    .filter(
      (x): x is { item: EquipmentItem; catalog: ArmorCatalogEntry } => Boolean(x.catalog)
    );
  // Custom gear (not armor) that gives bonuses while worn also needs an Equipped box.
  const wornCustomGear = character.equipment.filter(
    (i) => i.custom && i.custom.kind === "gear" && (i.custom.acBonus || i.custom.speedBonus || Object.values(i.custom.abilityBonus ?? {}).some(Boolean))
  );

  const infuseBonus = infuseItemBonus(character);
  // A discipline's modified item is already enhanced, so it can't be infused.
  const infusedChoices = [
    ...character.weapons.filter(canInfuseWeapon).map((w) => ({ id: w.id, label: `${w.name} (weapon: +${infuseBonus} attack & damage)` })),
    ...armorItems.map(({ item, catalog }) => ({
      id: item.id,
      label: `${item.name} (${catalog.type === "Shield" ? "shield" : "armor"}: +${infuseBonus} AC)`,
    })),
  ].filter((x) => !isModifiedItem(character, x.id));

  const isObservant = hasFeat(character, "Observant");

  const perceptionState = character.skills.Perception;
  const wisMod = abilityModifier(character.abilities[SKILL_ABILITY.Perception]);
  let perceptionBonus = wisMod;
  if (perceptionState.proficient) perceptionBonus += pb;
  if (perceptionState.expertise) perceptionBonus += pb;
  if (isObservant) perceptionBonus += 5;

  const investigationState = character.skills.Investigation;
  const intMod = abilityModifier(character.abilities[SKILL_ABILITY.Investigation]);
  let investigationBonus = intMod;
  if (investigationState.proficient) investigationBonus += pb;
  if (investigationState.expertise) investigationBonus += pb;
  if (isObservant) investigationBonus += 5;

  return (
    <section className="sheet-section combat-section">
      <SectionHeader title="Combat" collapsed={collapsed} onToggle={() => onToggleSection("combat")} />
      {!collapsed && (
      <>
      <div className="combat-grid">
        <div className="field">
          <label>Passive Perception</label>
          {isObservant ? (
            <HoverInfo
              title="Observant"
              lines={["Considered to have advantage when determining passive Perception: +5."]}
            >
              <div className="readonly-box">{passivePerception(perceptionBonus)}</div>
            </HoverInfo>
          ) : (
            <div className="readonly-box">{passivePerception(perceptionBonus)}</div>
          )}
        </div>
        <div className="field">
          <label>Passive Investigation</label>
          {isObservant ? (
            <HoverInfo
              title="Observant"
              lines={["Considered to have advantage when determining passive Investigation: +5."]}
            >
              <div className="readonly-box">{passivePerception(investigationBonus)}</div>
            </HoverInfo>
          ) : (
            <div className="readonly-box">{passivePerception(investigationBonus)}</div>
          )}
        </div>
      </div>

      <div className="combat-grid">
        <div className="field">
          <label htmlFor="speed-hour">Speed (hour)</label>
          <NumberInput
            id="speed-hour"
            value={character.speedHour}
            onValue={(n) => update("speedHour", n)}
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
          <NumberInput
            id="speed-day"
            value={character.speedDay}
            onValue={(n) => update("speedDay", n)}
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
        <div className="field field-wide">
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
          <NumberInput
            id="max-hp"
            value={character.maxHp}
            onValue={(n) => update("maxHp", n)}
          />
          {hpBonus !== 0 && (
            <HoverInfo
              title="Max HP Bonus"
              lines={[
                `Effective Max HP: ${effectiveMaxHp(character)} (${character.maxHp} ${hpBonus >= 0 ? "+" : "−"} ${Math.abs(hpBonus)}).`,
                ...hpBonusSources.map((s) => `${s.label}: ${s.amount >= 0 ? "+" : "−"}${Math.abs(s.amount)}`),
              ]}
            >
              <span className="rage-damage-note">Effective {effectiveMaxHp(character)}</span>
            </HoverInfo>
          )}
        </div>
        <div className="field">
          <label htmlFor="current-hp">Current HP</label>
          <NumberInput
            id="current-hp"
            value={character.currentHp}
            onValue={(n) => update("currentHp", n)}
          />
        </div>
        <div className="field">
          <label htmlFor="temp-hp">Temp HP</label>
          <NumberInput
            id="temp-hp"
            value={character.tempHp}
            onValue={(n) => update("tempHp", n)}
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

      {infuseBonus > 0 && (
        <div className="field field-wide">
          <label htmlFor="infused-item">Infuse Item (+{infuseBonus})</label>
          <select
            id="infused-item"
            value={infusedChoices.some((x) => x.id === character.infusedItemId) ? character.infusedItemId : ""}
            onChange={(e) => update("infusedItemId", e.target.value)}
          >
            <option value="">Nothing infused</option>
            {infusedChoices.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
          <p className="section-hint">
            {INFUSE_ITEM_TEXT} The choice carries over each long rest; change it here when you infuse
            something else.
          </p>
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
                <span className="armor-equip-text">
                  <span className="armor-equip-name">{item.name}</span>
                  <span className="armor-equip-meta">
                    {catalog.type} · AC {catalog.ac}
                    {infuseBonus > 0 && item.id === character.infusedItemId && !isModifiedItem(character, item.id) && ` · Infused +${infuseBonus} AC`}
                    {isModifiedItem(character, item.id) && " · Modified"}
                  </span>
                  {catalog.property && (
                    <PropertyTagList property={catalog.property} definitions={ARMOR_PROPERTY_DEFINITIONS} />
                  )}
                </span>
              </label>
            ))}
          </div>
        ) : wornCustomGear.length === 0 ? (
          <p className="section-hint">
            No armor or shields in your Equipment inventory yet. Add one there and it'll show up
            here to equip.
          </p>
        ) : null}
        {wornCustomGear.length > 0 && (
          <div className="armor-equip-list">
            {wornCustomGear.map((item) => (
              <label key={item.id} className="armor-equip-row">
                <input
                  type="checkbox"
                  checked={item.equipped}
                  onChange={(e) => updateItem(item.id, { equipped: e.target.checked })}
                />
                <span className="armor-equip-text">
                  <span className="armor-equip-name">{item.name}</span>
                  <span className="armor-equip-meta">{item.custom ? customItemSummary(item.custom) : ""}</span>
                </span>
              </label>
            ))}
          </div>
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
        {extraAttack && (
          <HoverInfo
            title={extraAttack.label}
            lines={[`You can attack ${extraAttack.attacks} times, instead of once, when you take the Attack action.`]}
          >
            <span className="rage-damage-note">{extraAttack.label}: {extraAttack.attacks} attacks per action</span>
          </HoverInfo>
        )}
        {equippedWeapons.length > 0 ? (
          <div className="armor-equip-list">
            {equippedWeapons.map((w) => {
              const { mod: abilityMod, label: abilityLabel } = toHitAbilityInfo(character, w.name);
              const infusion = infusedWeaponBonus(character, w);
              const mods = modWeaponBonus(character, w);
              const toHit = abilityMod + (w.proficient ? pb : 0) + infusion + mods.attack;
              const { display: baseDamage } = weaponDamageDisplay(character, w);
              const damageBonus = infusion + mods.damage + (archetypeWeaponDamageBonus(character)?.amount ?? 0);
              const damageDisplay = baseDamage && damageBonus ? `${baseDamage} +${damageBonus}` : baseDamage;
              return (
                <div key={w.id} className="armor-equip-row is-readonly">
                  <span className="armor-equip-text">
                    <span className="armor-equip-name">{w.name || "Unnamed weapon"}</span>
                    <span className="armor-equip-meta">
                      To Hit {formatModifier(toHit)} ({abilityLabel}) · {damageDisplay || "no damage set"} · {w.range || "Melee"}
                    </span>
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
