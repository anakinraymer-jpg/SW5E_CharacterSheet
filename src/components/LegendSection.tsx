import { useState } from "react";
import type { LegendEntry } from "../data/legend";
import {
  AMMUNITION_DEFINITIONS,
  ARMOR_MATERIAL_DEFINITIONS,
  ARMOR_MATERIAL_NOTE,
  ARMOR_PROPERTY_DEFINITIONS,
  ARMOR_TYPE_DEFINITIONS,
  CASTING_PROPERTY_DEFINITIONS,
  CASTING_PROPERTY_NOTE,
  WEAPON_PROPERTY_DEFINITIONS,
} from "../data/legend";
import SectionHeader from "./SectionHeader";

interface Props {
  collapsedSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
}

const CATEGORIES: { title: string; entries: LegendEntry[]; note?: string }[] = [
  { title: "Armor Materials", entries: ARMOR_MATERIAL_DEFINITIONS, note: ARMOR_MATERIAL_NOTE },
  { title: "Armor Properties", entries: ARMOR_PROPERTY_DEFINITIONS },
  { title: "Weapon Properties", entries: WEAPON_PROPERTY_DEFINITIONS },
  { title: "Casting Properties (Focuses)", entries: CASTING_PROPERTY_DEFINITIONS, note: CASTING_PROPERTY_NOTE },
  { title: "Ammunition", entries: AMMUNITION_DEFINITIONS },
  { title: "Armor Types", entries: ARMOR_TYPE_DEFINITIONS },
];

// A browsable glossary of the sheet's game terms (sourced from sw5e.com — see data/legend.ts),
// with a name filter since the combined list runs to 100+ entries.
export default function LegendSection({ collapsedSections, onToggleSection }: Props) {
  const collapsed = !!collapsedSections["legend"];
  const [filter, setFilter] = useState("");
  const needle = filter.trim().toLowerCase();

  return (
    <section className="sheet-section legend-section">
      <SectionHeader title="Legend" collapsed={collapsed} onToggle={() => onToggleSection("legend")} />
      {!collapsed && (
        <>
          <p className="section-hint">
            Reference definitions for armor materials, armor/weapon/casting properties, and
            ammunition — sourced from sw5e.com. Hovering a property tag elsewhere on the sheet shows
            the same text.
          </p>
          <input
            type="text"
            placeholder="Filter by name…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="legend-filter"
          />
          {CATEGORIES.map(({ title, entries, note }) => {
            const matches = needle ? entries.filter((e) => e.name.toLowerCase().includes(needle)) : entries;
            if (matches.length === 0) return null;
            return (
              <div className="species-traits-box" key={title}>
                <div className="species-traits-header">{title}</div>
                {note && !needle && <p className="section-hint">{note}</p>}
                {matches.map((entry) => (
                  <p key={entry.name} className="species-trait-line">
                    <strong>{entry.name}.</strong> {entry.description}
                  </p>
                ))}
              </div>
            );
          })}
        </>
      )}
    </section>
  );
}
