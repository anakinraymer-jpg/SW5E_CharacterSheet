import { useEffect, useState } from "react";
import type { Character, CraftingProject, CraftingState, EquipmentItem, Weapon } from "../types";
import type { EnhancedItemEntry } from "../data/enhancedItems";
import {
  BLUEPRINT_DC,
  CRAFTING_TOOLS,
  CRAFT_RATE,
  RARITIES,
  RARITY_INGREDIENTS,
  RARITY_LEVEL,
  RARITY_VALUE,
  REVERSE_ENGINEER_DC,
  blueprintLimit,
  checkModifier,
  craftingState,
  craftingTools,
  detectedTools,
  enhancedItemTools,
  halfValueItem,
  hasExpertise,
  itemRarity,
  maxRarity,
  newProject,
  normalItems,
  projectDays,
  projectOutcome,
  rarityModifier,
  rawMaterials,
  speedMultiplier,
  toolCheckBonus,
  toolUses,
  type Rarity,
} from "../crafting";
import { formatModifier } from "../utils";
import { catalogWeaponPatch } from "./WeaponsSection";
import HoverInfo from "./HoverInfo";
import NumberInput from "./NumberInput";
import PickerDialog from "./PickerDialog";
import SectionHeader from "./SectionHeader";

interface Props {
  character: Character;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  addWeapon: (patch?: Partial<Weapon>) => void;
  addItem: (patch?: Partial<EquipmentItem>) => void;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

// The enhanced item catalog is large, so it loads the first time a Crafting section opens.
let enhancedCache: EnhancedItemEntry[] | null = null;
function useEnhancedItems(active: boolean) {
  const [items, setItems] = useState<EnhancedItemEntry[] | null>(enhancedCache);
  useEffect(() => {
    if (!active || items) return;
    import("../data/enhancedItems").then((m) => {
      enhancedCache = m.ENHANCED_ITEMS;
      setItems(m.ENHANCED_ITEMS);
    });
  }, [active, items]);
  return items;
}

function enhancedLines(e: EnhancedItemEntry): string[] {
  const rarity = itemRarity(e);
  return [
    `${e.rarities.join(" / ") || rarity}${e.attunement ? " · requires attunement" : ""}`,
    ...(e.prerequisite ? [`Prerequisite: ${e.prerequisite}`] : []),
    ...e.text.split(/\n+/).filter(Boolean),
  ];
}

// Crafting with artisan tools (Wretched Hives). Shown for any character proficient with a crafting tool.
// Rules and tables live in crafting.ts.
export default function CraftingSection({ character, update, addWeapon, addItem, collapsedSections, onToggleSection }: Props) {
  const collapsed = !!collapsedSections["crafting"];
  const enhanced = useEnhancedItems(!collapsed);
  const [blueprintPickerFor, setBlueprintPickerFor] = useState("");
  const [craftPickerFor, setCraftPickerFor] = useState("");
  const [payFor, setPayFor] = useState<Record<string, boolean>>({});
  const state = craftingState(character);
  const tools = craftingTools(character);
  const detected = detectedTools(character);
  if (tools.length === 0) return null;
  const level = Math.max(1, character.level || 1);
  const allowed = maxRarity(level);
  const byName = new Map((enhanced ?? []).map((e) => [e.name, e]));

  function save(next: Partial<CraftingState>) {
    update("crafting", { ...state, ...next });
  }
  function setTool(tool: string, patch: Partial<{ expertise: boolean; blueprints: string[] }>) {
    const cur = state.tools[tool] ?? { expertise: false, blueprints: [] };
    save({ tools: { ...state.tools, [tool]: { ...cur, ...patch } } });
  }
  function setProject(id: string, patch: Partial<CraftingProject>) {
    save({ projects: state.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  }
  function removeProject(id: string) {
    save({ projects: state.projects.filter((p) => p.id !== id) });
  }

  function blueprintsOf(tool: string) {
    return state.tools[tool]?.blueprints ?? [];
  }

  // Enhanced items this tool can know: those the Item Specific Tools table gives it, plus the ones the
  // table leaves to the GM. Only rarities the character's level allows.
  function blueprintOptions(tool: string) {
    const known = new Set(blueprintsOf(tool));
    return (enhanced ?? [])
      .filter((e) => !known.has(e.name) && RARITY_LEVEL[itemRarity(e)] <= level)
      .map((e) => ({ e, tools: enhancedItemTools(e) }))
      .filter(({ tools: t }) => t.length === 0 || t.includes(tool))
      .map(({ e, tools: t }) => ({
        name: e.name,
        group: t.length === 0 ? "Other (your GM decides the tool)" : e.type.replace(/([a-z])([A-Z])/g, "$1 $2"),
        subtitle: itemRarity(e),
        other: t.length === 0,
      }))
      .sort((a, b) => Number(a.other) - Number(b.other) || a.group.localeCompare(b.group) || a.name.localeCompare(b.name))
      .map(({ other: _other, ...o }) => o);
  }

  function craftOptions(tool: string) {
    return [
      ...normalItems(tool).map((n) => ({ name: n.name, group: "Normal items", subtitle: `${n.value.toLocaleString()} cr` })),
      ...blueprintsOf(tool).map((b) => ({ name: b, group: "Your blueprints", subtitle: byName.get(b) ? itemRarity(byName.get(b)!) : "" })),
    ];
  }

  function startProject(tool: string, name: string) {
    setCraftPickerFor("");
    const normal = normalItems(tool).find((n) => n.name === name);
    const e = blueprintsOf(tool).includes(name) ? byName.get(name) : undefined;
    const project = normal
      ? newProject({ name: normal.name, tool, kind: normal.kind, value: normal.value, weight: normal.weight })
      : e
        ? newProject({ name: e.name, tool, kind: "enhanced", enhanced: true, rarity: itemRarity(e) })
        : newProject({ name, tool, kind: "custom" });
    save({ projects: [...state.projects, project] });
  }

  function finish(p: CraftingProject) {
    const outcome = projectOutcome(p);
    if (!outcome) return;
    if (p.kind === "weapon") addWeapon(catalogWeaponPatch(character.classAppliedName, p.name));
    else addItem({ name: p.name, weight: p.weight, notes: p.enhanced ? `Crafted · ${p.rarity} enhanced item` : "Crafted" });
    if (payFor[p.id] !== false) update("credits", Math.max(0, character.credits - outcome.cost));
    removeProject(p.id);
  }

  const addable = CRAFTING_TOOLS.map((t) => t.name).filter((t) => !tools.includes(t));

  return (
    <section className="sheet-section crafting-section">
      <SectionHeader title="Crafting" collapsed={collapsed} onToggle={() => onToggleSection("crafting")} />
      {!collapsed && (
        <>
          <p className="section-hint">
            Anyone proficient with an artisan tool can craft every normal item it covers, and knows blueprints for
            enhanced ones. Rules from Wretched Hives.
          </p>

          {tools.map((tool) => {
            const bps = blueprintsOf(tool);
            const limit = blueprintLimit(character, tool);
            const fast = speedMultiplier(character, tool) > 1;
            return (
              <div className="species-traits-box crafting-tool" key={tool}>
                <div className="species-traits-header">{tool}</div>
                <p className="section-hint">Crafts: {toolUses(tool) || "nothing listed in the rules table (ask your GM)"}</p>
                <div className="combat-grid">
                  <div className="field">
                    <label>Tool Check</label>
                    <HoverInfo
                      title="Tool Check"
                      lines={[
                        `Intelligence modifier + proficiency bonus${hasExpertise(character, tool) ? " × 2 (expertise)" : ""}.`,
                        "Used to finish an item, learn a blueprint and reverse engineer.",
                      ]}
                    >
                      <div className="readonly-box">{formatModifier(toolCheckBonus(character, tool))}</div>
                    </HoverInfo>
                  </div>
                  <div className="field">
                    <label>Blueprints</label>
                    <HoverInfo
                      title="Blueprints Known"
                      lines={[
                        "Proficiency: half your level (rounded up). Expertise: your level.",
                        `Rarity unlocks: Premium at 5th, Prototype at 9th, Advanced at 13th, Legendary at 17th, Artifact at 20th level. You're at ${allowed}.`,
                        "Whenever you gain a level, you can swap one blueprint for another.",
                      ]}
                    >
                      <div className="readonly-box">
                        {bps.length} / {limit}
                      </div>
                    </HoverInfo>
                  </div>
                </div>
                <label className="crafting-check">
                  <input
                    type="checkbox"
                    checked={hasExpertise(character, tool)}
                    onChange={(e) => setTool(tool, { expertise: e.target.checked })}
                  />{" "}
                  Expertise with this tool
                </label>
                {fast && <p className="section-hint">Your archetype crafts twice as fast with this tool.</p>}

                <div className="chip-row">
                  {bps.map((b) => {
                    const e = byName.get(b);
                    return (
                      <HoverInfo key={b} title={b} lines={e ? enhancedLines(e) : [enhanced ? "Not in the enhanced item list." : "Loading…"]}>
                        <span className="info-chip">
                          {b}
                          {e ? ` · ${itemRarity(e)}` : ""}
                          <button
                            type="button"
                            className="btn btn-danger btn-small"
                            aria-label={`Forget ${b}`}
                            onClick={() => setTool(tool, { blueprints: bps.filter((x) => x !== b) })}
                          >
                            ×
                          </button>
                        </span>
                      </HoverInfo>
                    );
                  })}
                </div>
                <div className="crafting-actions">
                  <button
                    type="button"
                    className="btn btn-secondary btn-small"
                    disabled={!enhanced || bps.length >= limit}
                    onClick={() => setBlueprintPickerFor(tool)}
                  >
                    {!enhanced ? "Loading items…" : bps.length >= limit ? "Blueprints full" : "+ Blueprint"}
                  </button>
                  <button type="button" className="btn btn-primary btn-small" onClick={() => setCraftPickerFor(tool)}>
                    Craft an item
                  </button>
                  {!detected.includes(tool) && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-small"
                      onClick={() => save({ addedTools: state.addedTools.filter((t) => t !== tool) })}
                    >
                      Remove tool
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {addable.length > 0 && (
            <div className="field">
              <label htmlFor="crafting-add-tool">Add a Tool You're Proficient With</label>
              <select
                id="crafting-add-tool"
                value=""
                onChange={(e) => e.target.value && save({ addedTools: [...state.addedTools, e.target.value] })}
              >
                <option value="">Choose…</option>
                {addable.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}

          <h3>In Progress</h3>
          {state.projects.length === 0 && <p className="section-hint">Nothing being crafted. Use "Craft an item" on a tool.</p>}
          {state.projects.map((p) => {
            const days = projectDays(character, p);
            const outcome = projectOutcome(p);
            const e = p.enhanced ? byName.get(p.name) : undefined;
            const rarity = p.rarity as Rarity;
            const ready = p.daysWorked >= days && (!p.enhanced || p.rareMaterial) && p.value > 0;
            return (
              <div className="species-traits-box crafting-project" key={p.id}>
                <div className="species-traits-header">
                  {e ? (
                    <HoverInfo title={p.name} lines={enhancedLines(e)}>
                      <span>{p.name}</span>
                    </HoverInfo>
                  ) : p.kind === "custom" ? (
                    <input
                      aria-label="Item name"
                      value={p.name}
                      onChange={(ev) => setProject(p.id, { name: ev.target.value })}
                    />
                  ) : (
                    p.name
                  )}
                </div>
                <p className="section-hint">
                  {p.tool}
                  {p.enhanced ? ` · ${p.rarity} enhanced item` : ""}
                </p>
                <div className="combat-grid">
                  <div className="field">
                    <label htmlFor={`craft-value-${p.id}`}>Item Value (cr)</label>
                    <NumberInput id={`craft-value-${p.id}`} value={p.value} min={0} onValue={(n) => setProject(p.id, { value: n })} />
                  </div>
                  <div className="field">
                    <label>Raw Materials</label>
                    <HoverInfo title="Raw Materials" lines={["Half the item's value.", "The crafting result can change how much is used."]}>
                      <div className="readonly-box">{rawMaterials(p).toLocaleString()} cr</div>
                    </HoverInfo>
                  </div>
                  <div className="field">
                    <label htmlFor={`craft-workers-${p.id}`}>Crafters</label>
                    <NumberInput id={`craft-workers-${p.id}`} value={p.workers} min={1} emptyValue={1} stepper onValue={(n) => setProject(p.id, { workers: n })} />
                  </div>
                  <div className="field">
                    <label htmlFor={`craft-days-${p.id}`}>Days Worked / {days}</label>
                    <NumberInput id={`craft-days-${p.id}`} value={p.daysWorked} min={0} step={0.5} stepper onValue={(n) => setProject(p.id, { daysWorked: n })} />
                  </div>
                </div>
                {p.enhanced && p.value === 0 && (
                  <p className="section-hint">
                    Enter the value your GM sets. {p.rarity} items are worth {RARITY_VALUE[rarity] ?? "?"}
                    {e && halfValueItem(e) ? " (halved for consumables and item modifications)" : ""}.
                  </p>
                )}
                {p.enhanced && (
                  <label className="crafting-check">
                    <input type="checkbox" checked={p.rareMaterial} onChange={(ev) => setProject(p.id, { rareMaterial: ev.target.checked })} />{" "}
                    Rare material found (guarded by a CR {RARITY_INGREDIENTS[rarity]?.cr ?? "?"} creature; your GM may waive it for
                    standard or premium consumables and modifications)
                  </label>
                )}

                <div className="combat-grid">
                  <div className="field">
                    <label htmlFor={`craft-check-${p.id}`}>Tool Check Total</label>
                    <NumberInput
                      id={`craft-check-${p.id}`}
                      value={p.checkTotal ?? 0}
                      min={0}
                      onValue={(n) => setProject(p.id, { checkTotal: n })}
                      title={`Intelligence check with ${p.tool} (${formatModifier(toolCheckBonus(character, p.tool))})`}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`craft-d100-${p.id}`}>d100 Roll</label>
                    <NumberInput id={`craft-d100-${p.id}`} value={p.d100 ?? 0} min={0} max={100} onValue={(n) => setProject(p.id, { d100: n })} />
                  </div>
                  <div className="field">
                    <label>d100 Modifier</label>
                    <HoverInfo
                      title="d100 Modifier"
                      lines={[
                        "Tool check: DC 10 +5, DC 15 +10, DC 20 +15, DC 25 +20, DC 30 +25.",
                        ...(p.enhanced ? [`${p.rarity} rarity: ${formatModifier(rarityModifier(p))}.`] : []),
                      ]}
                    >
                      <div className="readonly-box">
                        {formatModifier((p.checkTotal !== null ? checkModifier(p.checkTotal) : 0) + rarityModifier(p))}
                      </div>
                    </HoverInfo>
                  </div>
                </div>

                {outcome && (
                  <p className="species-trait-line">
                    Result {outcome.total}: {outcome.text} Materials used: {outcome.cost.toLocaleString()} cr.
                  </p>
                )}
                {outcome && (
                  <label className="crafting-check">
                    <input
                      type="checkbox"
                      checked={payFor[p.id] !== false}
                      onChange={(ev) => setPayFor({ ...payFor, [p.id]: ev.target.checked })}
                    />{" "}
                    Take {outcome.cost.toLocaleString()} cr from my credits ({character.credits.toLocaleString()} cr)
                  </label>
                )}
                <div className="crafting-actions">
                  <button type="button" className="btn btn-primary btn-small" disabled={!outcome || !ready} onClick={() => finish(p)}>
                    Finish and add to {p.kind === "weapon" ? "Weapons" : "Equipment"}
                  </button>
                  <button type="button" className="btn btn-secondary btn-small" onClick={() => removeProject(p.id)}>
                    Cancel
                  </button>
                </div>
                {!ready && (
                  <p className="section-hint">
                    {p.value <= 0
                      ? "Set the item's value first."
                      : p.daysWorked < days
                        ? `${Math.round((days - p.daysWorked) * 10) / 10} more days of work.`
                        : "Find the rare material first."}
                    {" "}Then enter your tool check and d100 roll.
                  </p>
                )}
              </div>
            );
          })}

          <HoverInfo
            title="Crafting Rules"
            lines={[
              `Time: 1 day per ${CRAFT_RATE} cr of value, divided among the crafters. Items can be crafted together if their combined value is no more than twice your crafting rate.`,
              "Every workweek of crafting has a 10% chance of a complication.",
              `Learning a blueprint (10 minutes): DC ${RARITIES.map((r) => `${r} ${BLUEPRINT_DC[r]}`).join(", ")}. On a failure, wait 24 hours.`,
              `Reverse engineering an enhanced item (1 hour): DC ${RARITIES.map((r) => `${r} ${REVERSE_ENGINEER_DC[r]}`).join(", ")}. Success: half its raw materials back and the blueprint. Failure: the item is destroyed.`,
            ]}
          >
            <span className="info-chip">Crafting rules and DCs</span>
          </HoverInfo>

          {blueprintPickerFor && (
            <PickerDialog
              title={`Learn a Blueprint: ${blueprintPickerFor}`}
              options={blueprintOptions(blueprintPickerFor)}
              getDetails={(name) => (byName.get(name) ? enhancedLines(byName.get(name)!) : [])}
              onClose={() => setBlueprintPickerFor("")}
              onPick={(name) => {
                setTool(blueprintPickerFor, { blueprints: [...blueprintsOf(blueprintPickerFor), name] });
                setBlueprintPickerFor("");
              }}
            />
          )}
          {craftPickerFor && (
            <PickerDialog
              title={`Craft with ${craftPickerFor}`}
              options={craftOptions(craftPickerFor)}
              getDetails={(name) => (byName.get(name) ? enhancedLines(byName.get(name)!) : [])}
              allowCustom
              onClose={() => setCraftPickerFor("")}
              onPick={(name) => startProject(craftPickerFor, name)}
            />
          )}
        </>
      )}
    </section>
  );
}
