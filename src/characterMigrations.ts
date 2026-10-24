import type { Character, Power } from "./types";
import { CURRENT_DATA_VERSION } from "./types";
import { SPECIES_CATALOG as SPECIES_PHB } from "./data/species";
import { SPECIES_CATALOG_EC } from "./data/speciesEC";
import { SPECIES_CATALOG_HOMEBREW } from "./data/speciesHomebrew";
import { BACKGROUND_CATALOG } from "./data/backgrounds";
import { FEATS_CATALOG } from "./data/feats";
import { speciesMechanics } from "./speciesLogic";
import { appendFragment } from "./grantOwnership";
import { findPowerEntry } from "./pickerCatalogs";
import { normalizeCompanion } from "./companionLogic";

// Characters are saved in the browser, so one saved before a feature existed never got that feature's
// bookkeeping. Two layers repair that:
//  - autoRepair runs on every load. It only fills in tracking data the sheet can work out for certain
//    (never adds items, credits, skills or text) and stamps the character with the current version.
//  - pendingUpdates / applyUpdates are the "Update this character" button: changes that add or edit
//    something visible, shown to the player first so they can decline.

const SPECIES_CATALOG = [...SPECIES_PHB, ...SPECIES_CATALOG_EC, ...SPECIES_CATALOG_HOMEBREW];
const FEATS_BY_NAME = new Map(FEATS_CATALOG.map((f) => [f.name, f]));

function speciesFor(c: Character) {
  return c.speciesAppliedName ? SPECIES_CATALOG.find((s) => s.name === c.speciesAppliedName) : undefined;
}

// ---- Automatic, safe repairs (tracking only) ----

function repairCompanion(c: Character): Character {
  return c.companion ? { ...c, companion: normalizeCompanion(c.companion) } : c;
}

// Natural armor/weapon, HP bonus and extra speeds come from the species' traits, so an older character
// with a species applied but those fields empty can have them re-derived without touching anything else.
function repairSpeciesMechanics(c: Character): Character {
  const species = speciesFor(c);
  if (!species) return c;
  const m = speciesMechanics(species);
  const next = { ...c };
  if (c.speciesNaturalArmor === null && m.naturalArmor) next.speciesNaturalArmor = m.naturalArmor;
  if (c.speciesNaturalWeapon === null && m.naturalWeapon) next.speciesNaturalWeapon = m.naturalWeapon;
  if (c.speciesHpBonus === null && m.hpBonus) next.speciesHpBonus = m.hpBonus;
  if (c.speciesSpeeds === null && m.speeds) next.speciesSpeeds = m.speeds;
  // Remember what the species set, so switching species later restores size and speed cleanly.
  if (c.speciesBaseline === null && c.size === species.size && c.speedBase === species.speed) {
    next.speciesBaseline = { size: species.size, speed: species.speed, prevSize: "Medium", prevSpeed: 30 };
  }
  // If the auto-filled text is still sitting in the field untouched, record that it came from the species.
  if (!c.speciesGrantedVision && m.grantedVision && c.vision === m.grantedVision) {
    next.speciesGrantedVision = m.grantedVision;
  }
  if (!c.speciesGrantedSpecialMovement && m.grantedSpecialMovement && c.specialMovement === m.grantedSpecialMovement) {
    next.speciesGrantedSpecialMovement = m.grantedSpecialMovement;
  }
  if (!c.speciesGrantedResistances && m.grantedResistances && c.resistances.includes(m.grantedResistances)) {
    next.speciesGrantedResistances = m.grantedResistances;
  }
  return next;
}

function repairBackgroundTracking(c: Character): Character {
  if (!c.backgroundAppliedName || c.backgroundGrantedFeature) return c;
  const bg = BACKGROUND_CATALOG.find((b) => b.name === c.backgroundAppliedName);
  if (!bg) return c;
  const expected = `${bg.featureName}. ${bg.featureText}`;
  return c.backgroundFeature === expected ? { ...c, backgroundGrantedFeature: expected } : c;
}

export function autoRepair(c: Character): Character {
  if ((c.dataVersion ?? 0) >= CURRENT_DATA_VERSION) return c;
  let next = repairCompanion(c);
  next = repairSpeciesMechanics(next);
  next = repairBackgroundTracking(next);
  return { ...next, dataVersion: CURRENT_DATA_VERSION };
}

// ---- Updates the player confirms ----

export interface PendingUpdate {
  id: string;
  title: string;
  detail: string;
}

interface Fix {
  id: string;
  title: string;
  // Returns the repaired character and a one-line description, or null when there is nothing to do.
  run: (c: Character) => { character: Character; detail: string } | null;
}

const FIXES: Fix[] = [
  {
    id: "feat-notes",
    title: "Add the advantage and resistance notes your feats give",
    run: (c) => {
      let resistances = c.resistances;
      const added: string[] = [];
      for (const cf of c.feats) {
        const text = FEATS_BY_NAME.get(cf.name)?.grantsResistance;
        if (text && !resistances.includes(text)) {
          resistances = appendFragment(resistances, text);
          if (!added.includes(cf.name)) added.push(cf.name);
        }
      }
      return added.length
        ? { character: { ...c, resistances }, detail: `Adds notes to Combat for: ${added.join(", ")}.` }
        : null;
    },
  },
  {
    id: "species-text",
    title: "Fill in what your species gives (vision, movement, resistances)",
    run: (c) => {
      const species = speciesFor(c);
      if (!species) return null;
      const m = speciesMechanics(species);
      const next = { ...c };
      const filled: string[] = [];
      if (m.grantedVision && !c.vision.trim()) {
        next.vision = m.grantedVision;
        next.speciesGrantedVision = m.grantedVision;
        filled.push("Vision");
      }
      if (m.grantedSpecialMovement && !c.specialMovement.trim()) {
        next.specialMovement = m.grantedSpecialMovement;
        next.speciesGrantedSpecialMovement = m.grantedSpecialMovement;
        filled.push("Special Movement");
      }
      if (m.grantedResistances && !c.resistances.includes(m.grantedResistances)) {
        next.resistances = appendFragment(c.resistances, m.grantedResistances);
        next.speciesGrantedResistances = m.grantedResistances;
        filled.push("Resistances");
      }
      return filled.length
        ? { character: next, detail: `${species.name}: fills in ${filled.join(", ")} in Combat.` }
        : null;
    },
  },
  {
    id: "powers",
    title: "Link your powers to the catalog so their info boxes work",
    run: (c) => {
      const notes: string[] = [];
      const powers: Power[] = c.powers.map((p) => {
        const found = findPowerEntry(p.name, p.type);
        if (!found) return p;
        const e = found.entry;
        const next: Power = { ...p };
        if (p.name !== e.name) {
          notes.push(`${p.name} → ${e.name}`);
          next.name = e.name;
        }
        if (p.type !== found.type) {
          notes.push(`${e.name} moved to ${found.type} powers`);
          next.type = found.type;
        }
        if (found.type === "Force" && "alignment" in e && !p.alignment) next.alignment = e.alignment;
        if (!p.castingTime && e.castingTime) next.castingTime = e.castingTime;
        if (!p.range && e.range) next.range = e.range;
        if (!p.duration && e.duration) next.duration = e.duration;
        return next;
      });
      const changed = powers.some((p, i) => JSON.stringify(p) !== JSON.stringify(c.powers[i]));
      if (!changed) return null;
      return {
        character: { ...c, powers },
        detail: notes.length ? `Corrects: ${notes.join("; ")}.` : "Fills in missing casting time, range and duration.",
      };
    },
  },
];

export function pendingUpdates(c: Character): PendingUpdate[] {
  const out: PendingUpdate[] = [];
  for (const fix of FIXES) {
    const result = fix.run(c);
    if (result) out.push({ id: fix.id, title: fix.title, detail: result.detail });
  }
  return out;
}

export function applyUpdates(c: Character, ids?: string[]): Character {
  let next = c;
  for (const fix of FIXES) {
    if (ids && !ids.includes(fix.id)) continue;
    const result = fix.run(next);
    if (result) next = result.character;
  }
  return next;
}
