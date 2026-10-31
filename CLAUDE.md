# CLAUDE.md

Working notes for Claude Code in this repo. See [README.md](README.md) for the human-facing project description. Global git/commit/response-style conventions live in the user's `~/.claude/CLAUDE.md` and apply here too — this file only covers things specific to this project.

## Stack & dev server

React + TypeScript + Vite (rolldown-vite), no backend. All persistence is browser `localStorage`:
- `sw5e-characters` — character data
- `sw5e-theme` — dark/light choice
- `sw5e-layout` — draggable sheet section layout (a section added later is slotted into its `DEFAULT_LAYOUT` column for older saved layouts)
- `sw5e-collapsed-sections` — which sections are folded (Legend starts folded)
- `sw5e-simple-mode` — Simple mode on/off

**Phone-first:** the user plays on phones and with older saved characters, so every feature must work with touch (no hover) and must not break or skip older saves (see the repair code below).

**Deploy:** `npm run deploy` runs `tsc -b && vite build` and publishes `dist` to the `gh-pages` branch. Live at https://anakinraymer-jpg.github.io/SW5E_CharacterSheet/. `vite.config.ts` sets `base` to `/SW5E_CharacterSheet/` for builds only. Push to master is automatic; deploy only when the user says "deploy".

Start the dev server with the Browser tool's `preview_start` using name `sw5e-charactersheet` (config in `.claude/launch.json`), not Bash/PowerShell.

**PowerShell gotcha:** `npx`/`npm` aren't on PATH by default in this shell. Prefix any PowerShell call that needs them with:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

**PowerShell gotcha:** `git` isn't on PATH either. Also add the GitHub Desktop git folder: `%LOCALAPPDATA%\GitHubDesktop\app-*\resources\app\git\cmd`.

**PowerShell gotcha:** `Invoke-RestMethod` silently returns garbage/empty on large JSON responses (>~100KB) in this environment. Use `Invoke-WebRequest -UseBasicParsing` and pipe `.Content` through `ConvertFrom-Json` instead — or better, use the Browser tool's `javascript_tool` with `fetch()`, which has no such issue and is generally faster for large payloads (see below).

## Data catalogs (`src/data/`)

Reference data (species, classes, archetypes, powers, weapons, armor, gear, feats, backgrounds) is sourced from sw5e.com and split by sourcebook: **PHB** (core), **EC** (Echoes of the Force), **WH** (Wretched Hives). Convention, established across the catalog:

- Small/medium catalogs keep all sources in one file, one array (`feats.ts`, `weapons.ts`, `armor.ts`, `gear.ts`, `powers.ts`, `backgrounds.ts`; `sw5eData.ts` only holds shared lists such as languages and sizes). Header comment lists which sourcebooks are included.
- Large catalogs split PHB and EC into separate files, merged at the call site with `[...CATALOG_PHB, ...CATALOG_EC]` (see `archetypeDetails.ts` + `archetypeDetailsEC.ts`, `species.ts` + `speciesEC.ts`). Follow this pattern if a catalog grows too large for one file.
- `classFeatureChoices.ts` holds fighting styles, maneuvers, and per-class resource pools (`CLASS_RESOURCES`) — the latter only for resources with their own charge count and refresh (Rages, Superiority Dice, Focus Points, Potent Aptitude). Don't add things like Guardian's Focused Strikes or Sentinel's Kinetic Combat there — those are damage/die-size caps on *spending Force Points*, not independent pools; forcing them into `ClassResourceDef` misrepresents the mechanic. Their per-level values are already shown in `classes.ts`'s level tables.

**Checking a catalog for completeness against sw5e.com:** the site's own REST API is at `https://sw5eapi.azurewebsites.net/api/<endpoint>` (JSON, no auth). Known endpoints and their `contentSource` values (`PHB`/`EC`/`WH`, or `None`/absent if a category has no non-PHB content): `power` (465: 399 PHB + 66 EC), `species` (141: 30 PHB + 111 EC), `equipment` (507: 186 PHB + 123 EC + 198 WH — weapons/armor/gear combined, split by `equipmentCategory`), `archetype` (137: 40 PHB + 97 EC, note some EC entries are `(Companion)`/`(Depreciated)`/`(Old)` duplicates meant to be excluded), `feat` (119: 65 PHB + 44 EC + 10 WH), `ExpandedContent` (capital E; 10 chapters, each with `chapterName` and `contentMarkdown`, holding the Customization Options chapter with companions, natures, traits and companion classes, and the Archetypes chapter; `dataVersion` lists every dataset name), `background` (61: 20 PHB + 41 EC), `class` (10, PHB only), `fightingstyle` (32, PHB only), `maneuvers` (119: 100 PHB + 19 EC — note the plural endpoint name), `armorproperty`/`weaponproperty` (metadata, no source split). A class's full level table (including resource-pool columns) is in its `levelChangesJson`/`levelChangeHeadersJson` fields from `/api/class`; per-feature rules text is in `/api/feature`, filterable by `sourceName` (class/archetype name) and `name`.

The archetype catalog is 135 entries (40 PHB + 95 EC). The API has 97 EC; the two `(Depreciated)` and `(Old)` Cybertech Engineering entries are left out on purpose, so don't re-add the "missing" EC archetypes: they are all present.

**Generated data.** `data/companions.ts`, `data/companionClasses.ts` and `data/backgroundFeats.ts` are generated, never hand-typed or scraped from the sw5e.com page (its text isn't in the JS bundle; it is fetched from the API at runtime). The generators are in `scripts/`: `node scripts/gen-companions.mjs <chapter.md> <out.ts>` and `gen-companion-classes.mjs <chapter.md> <out.ts>` take the Customization Options chapter's `contentMarkdown` from `/api/ExpandedContent` saved to a file, and `gen-bgfeats.mjs <out.ts>` fetches `/api/background` itself. Check the output against the raw data before committing.

When pulling data from this API for a catalog update: fetch via browser `fetch()`, transform to the target TS literal syntax in JS, and pull the result out via the tool's return value — don't paste it into a PowerShell heredoc or write it from memory. Always cross-check the transformed output against the raw fetched data (e.g. diff line-by-line) before writing it to a file; entries have been hand-typed from memory by mistake before and it produced fabricated data.

**Reusable weapon-category filters:** `classes.ts` already derives common proficiency/category pools from `WEAPON_CATALOG` via `weaponNamesByType()` — `ALL_VIBROWEAPONS`, `ALL_LIGHTWEAPONS`, `ALL_LIGHT_OR_VIBRO_WEAPONS`, `SIMPLE_BLASTERS`, `SIMPLE_LIGHTWEAPONS`, `SIMPLE_VIBROWEAPONS`, `SIMPLE_LIGHT_OR_VIBRO_WEAPONS`, `MONK_PROFICIENT_VIBROWEAPONS`, `OPERATIVE_PROFICIENT_VIBROWEAPONS`, `SENTINEL_PROFICIENT_LIGHT_OR_VIBRO_WEAPONS`, `SHIELD_LIGHT_OR_MEDIUM`. Before re-deriving a "which weapons match X property/type" list by reading the full catalog, check whether one of these (or `weaponNamesByType` itself) already covers it.

## Keeping context/token spend down on catalog work

Catalog files (`weapons.ts`, `armor.ts`, `feats.ts`, `species.ts`, `archetypeDetails*.ts`, etc.) are large and mostly irrelevant to any one task. To avoid burning context/credits on them:

- **Grep for specific names/patterns, don't Read the whole file**, when only a handful of entries are needed (e.g. looking up 5 weapon stat blocks). A full-file Read dumps every irrelevant line into context too.
- **Delegate open-ended catalog research to the `Explore` subagent** (e.g. "find every weapon with the Auto property", "list all class tool-choice defs") rather than doing several sequential Read/Grep calls directly in the main conversation — the subagent's full search stays out of main context and only the distilled answer comes back.
- **Check for an existing derived constant/helper first** (see above) before re-fetching or re-filtering catalog data that's likely already been computed once.

## Where things live (quick index)

- Class starting-equipment resolution: parsing → `classLogic.ts`'s `parseEquipmentOptions`; hand-authored grants → `classes.ts`'s `equipmentGrants` (keyed by the exact parsed branch string); resolving grants into real items → `classLogic.ts`'s `resolveClassEquipmentGrants`/`resolveEquipmentParts`, called from `applyClass`/`revertClass`.
- Auto AC calculation: `utils.ts`'s `armorCatalogMatch` + `computeDefense`, consumed by `StatBoxes.tsx`'s `DefenseBox`. Only `EquipmentItem.equipped` + an exact `ARMOR_CATALOG` name match matter — `location` is cosmetic.
- Weapons & Ammunitions table: `WeaponsSection.tsx`, backed by `character.weapons: Weapon[]` (separate array from `EquipmentItem`, no linking field).
- Engineer's Infuse Item (+1/+2/+3 on one armor, shield or simple/martial weapon): `infuseItem.ts`, stored as `character.infusedItemId` (a Weapon or EquipmentItem id). Picker is in `CombatSection.tsx`; the bonus feeds `computeDefense`'s `infusion` param and the to-hit in WeaponsSection/CombatSection/`weaponTooltip`. A discipline's modified item can't be infused.
- Engineer modifications: data lists in `classFeatureChoices.ts` (defs flagged `managedInPanel`, so they skip the level-up prompt); rules in `modifications.ts` (discipline table, modified item(s) in `character.modifiedItemIds`, which item each pick sits on in its detail's `modItemId`, slots, tech-point cost, prerequisite locks, and effects read from the option text by regex: weapon attack/damage, AC vs melee/ranged, tech attack/DC, Accelerated Movement, Integrated Subdermal Armor); UI is its own sheet section, `components/ModificationsSection.tsx` (SectionId `modifications`, shown only when `modDiscipline()` returns a discipline). There's no cap on which modifications can be chosen, only the item's slots. Armormech/Armstech get a second item with its own slots at 9th (`ENGINEER_DUAL_MOD_SLOTS_BY_LEVEL`); Artificer's two lightsabers share one pool. Unstable Engineering's overrides are a class resource (`archetypeName`-gated). Effective tech point max: `effectiveTechPointMax`.
- Crafting (any class, Wretched Hives rules): `crafting.ts` (Item Specific Tools table, rarity tables, blueprint limits, `enhancedItemTools` reads each enhanced item's `tools` field, normal items per tool from the weapon/armor/gear catalogs, project days/materials/d100 outcome). State in `character.crafting` (tool expertise, blueprints, hand-added tools, projects). UI is its own wide section, `components/CraftingSection.tsx` (SectionId `crafting`, shown when `craftingTools()` finds a tool in granted proficiencies, the free-text Proficiencies field, or hand-added tools). The enhanced item list `data/enhancedItems.ts` (~900 KB, generated by `node scripts/gen-enhanced-items.mjs src/data/enhancedItems.ts`) is dynamic-imported, so never import it statically (type imports are fine). The rules never give the faster "experienced craftsman" rate, so everyone crafts at 250 cr/day; Gadgeteer/Unstable Engineering double it for their tool. Every enhanced item (WH + EC) is assigned a tool in the generator script (`toolsFor`/`GEAR_TOOL`), which also writes `docs/CRAFTING_ITEMS.md`, the full list grouped by tool (~340 KB: grep it, don't read it whole). Change assignments there and re-run, never hand-edit either output. `"*"` = any tool (the enhanced Tool items).
- "Armor, Shield, Protections" panel: not a separate field — it's `CombatSection.tsx` filtering `character.equipment` through `armorCatalogMatch`.
- Nested/secondary choice UI pattern (skill/tool/weapon/fighting-style/lightsaber-form picks, and now equipment-category disambiguation): `SpeciesTraitChoice` / `ClassSubChoiceOption` in `types.ts`, rendered by `ClassSubChoiceDialog.tsx` / `ClassChoiceDialog.tsx`.

- Grants and revert: `grantOwnership.ts` (`revokeSkill` and friends: a proficiency is only removed when no other source grants it); `classLogic.ts`, `speciesLogic.ts`, `backgroundLogic.ts`, `featLogic.ts` apply and revert. `speciesMechanics()` in `speciesLogic.ts` is shared with the repair code.
- Old-character repair: `characterMigrations.ts` plus `CURRENT_DATA_VERSION` in `types.ts`. `autoRepair` runs when a character opens in CharacterSheet (safe tracking only), not in `storage.ts`. Keep storage.ts, App.tsx and CharacterList free of data-catalog imports: App lazy-loads CharacterSheet (prefetched 300 ms after start) so the list's start-up bundle stays ~200 KB for phones; `FIXES` feed the "Update this character" banner. When you add a new tracked or derived field, add a repair for old saves and bump the version.
- Companions: `companionLogic.ts` (stats, HP, abilities, skills, derived AC/speed/initiative, prerequisites, rests), `companionResources.ts` (class resource boxes), `companionTraits.ts` (what each trait does, keyed "Nature|Trait"; combat-option and roleplay traits are intentionally hover text only), `components/CompanionSection.tsx`. Companion effects apply to the companion only, never the owner.
- UI pieces: `PickerDialog`/`PickerField`/`pickerCatalogs.ts` (searchable add menus), `NumberInput.tsx` (clearable, with touch steppers; use it for every number field), `HoverInfo.tsx` (tap tooltips on touch), `SectionNav.tsx` (phone jump bar), `SimpleCard.tsx`/`simpleSummaries.ts` (Simple mode).
- Archetype stat effects: `archetypeEffects.ts`, keyed by archetype name + feature level via `hasArchetypeFeature` ("(Companion)" variants count as their base archetype). Covers Defense (Way of Endurance's 13 + Con natural armor through `bestNaturalArmor`, Path of Iron's Wis/Cha in light/medium armor through `computeDefense`'s `armorAbility`, Artful Dancer's half Cha, situational notes), initiative (Cha from Rakish Audacity/Master of Dance, advantage notes), Brute Force weapon damage, Praetorian's Wisdom save (fed into `recalcClassForLevel`'s level-granted saves), extra climb/swim speeds, and the resistance/immunity chips in Class Features' Passive Feature Effects. Archetype HP bonuses stay in `classFeatureLogic.ts`'s `HP_BONUS_ARCHETYPES`; capstone ability increases and skill/tool grants stay as `abilityScoreIncrease`/`grantsSkills`/`choices` on the feature data. Limited-use features become class resources automatically: `ARCHETYPE_RESOURCES` parses each feature's "You can use this feature twice... additional use at 5th... short or long rest" / "Once you use this feature..." / PHB "3 uses, more at 9th/13th/17th" text (keys `arch-<archetype>-<feature>`), appended by `applicableClassResources`; lists of options (Modifications, Discoveries) and companion-only uses are skipped. Left as text on purpose: active/toggled effects (stances, 1-minute buffs), per-rest picks (Chimeric Adaptation), and effects on allies or companions.
- Archetype option lists: `data/archetypeOptionLists.ts` (generated by `node scripts/gen-archetype-options.mjs src/data/archetypeOptionLists.ts`; auto-apply fields go in the script's `EXTRAS`). Each Scholar pursuit's discoveries (`PURSUIT_DISCOVERIES`) are merged into the `scholar-discoveries` def by `applicableSubChoiceDefs` (tagged with `group`), so always read defs through it, never `CLASS_SUB_CHOICES_BY_CLASS` directly. `recalcClassSubChoices` drops picks a def no longer offers (old pursuit's discoveries). Enhancement Specialist's ammunition enhancements and Totem Specialist's totems are archetype-gated Fighter defs, plus an Amplified Shots resource. `isVisibleOption` hides "Nth level[, Name]" prerequisites until met. Adapted Hide (AC), Athletic/Icarian/Underground (speeds) are applied by name in `archetypeEffects.ts`; `hpBonusPerLevel` on an option adds to Max HP.
- Offline + updates: `vite.config.ts`'s `offlineServiceWorker` plugin fills `scripts/sw-template.js` with every built file (version = hash of the file list) and emits `dist/sw.js`; `src/serviceWorker.ts` registers it in production only. Install saves the whole app; navigations get this version's saved index; assets are cache-first with `ignoreVary` (crossorigin script tags send Origin). A new deploy waits and App shows an "Update now" banner (posts `skip-waiting`, reloads on controllerchange). Never `skipWaiting` on install: an open sheet would lazy-load chunks the new deploy deleted. Test with `vite preview` (launch config `sw5e-charactersheet-build`, port 3707, path /SW5E_CharacterSheet/); dev mode has no service worker.
- Backups: `storage.ts` `exportAllCharacters` (one JSON array) and `importCharactersFromFile` + `restoreCharacters` (accepts one character or an array; keeps a device copy with a newer `updatedAt`). CharacterList shows a reminder when never backed up or older than `BACKUP_REMIND_DAYS` (14), snoozable for 7 days (`sw5e-last-backup`, `sw5e-backup-snooze` keys). Exporting the only character also counts as a backup.
- Modification change limit: `character.modRestChanges` lists mods installed/removed since the last long rest (`applyRest` clears it). Used = max(added, removed), so a remove+install is one replacement; undoing a change since the rest cancels it (`recordModChange`). `modChangeAllowed` gates Install/Remove in ModificationsSection; its "Free edit" checkbox (component state, not saved) skips counting for character building. Moving a mod between items is free.
- Stances & short buffs: `activeEffects.ts`. `availableActiveEffects` finds toggleable features (lightsaber forms' "The Way of the ..."/"Master of ..." with "for 1 minute", "enter ... stance" text, names in `OVERRIDES`/`NAMED_FEATURES`, class features in `OVERRIDES` like Empty Body, Sentinel "Manifest" options). `character.activeEffects` holds keys switched on; `applyRest` clears it. Switching on spends the matching `arch-<archetype>-<feature>` resource. `OVERRIDES` hold hand-written chips plus numbers (AC via `activeEffectAcBonuses` in DefenseBox, `doublesSpeed` in `activeSpeedBonusSources`, `speeds`, `weaponDice` in WeaponsSection); others get chips read from text. A situational Defense note starting with an active effect's feature name is hidden while it's on. Berserker Rage keeps its own `isRaging` field but renders first in the same Stances box (spends `berserker-rages`, ends concentration). `weaponNotes` show as badges next to weapon damage (melee/ranged/any, `strengthOnly`); `meleeForceAbility` (Way of the Rancor) feeds `toHitAbilityInfo` via `meleeForceAbilitySubstitute`. Concentration: `character.concentratingOn` + `concentrationSelf`; the C button in Powers (catalog `concentration` flag) sets it, `ConcentrationBar` shows it under the health bar and in Powers; `POWER_BUFFS` give numbers (AC, double/flat speed, weapon dice, `naturalArmor`), and `activeEffects()` includes the concentration effect so every consumer picks it up. Non-concentration buff powers in `POWER_BUFFS` (Battle Precognition, Saber Ward) appear as toggles in the Stances box.
- Power info boxes: `findPowerEntry`/`powerInfoLines` in `pickerCatalogs.ts` match names ignoring case and punctuation and try the other Force/Tech list.

## Testing workflow

After any change observable in the browser:
1. `npx tsc --noEmit -p tsconfig.app.json` (must be silent).
2. `preview_start` (name `sw5e-charactersheet`) / `navigate`, clear `localStorage.removeItem('sw5e-characters')` and `'sw5e-layout'`, create a test character, exercise the feature.
3. `read_console_messages({onlyErrors:true})` — **always in a fresh tab** if anything looks wrong; an already-open tab can show stale/buffered console errors from earlier in the dev session that aren't live bugs.
4. Clean up test data from `localStorage` before finishing.

**React state-read gotcha:** dispatching a DOM/pointer event and reading the resulting React state back in the *same* `javascript_exec` call frequently returns stale data (React batches state updates). Split into two separate tool calls: one to dispatch, a following one to read.

**Synthetic input gotcha:** setting an `<input>`'s `.value` directly doesn't notify React. Use the native setter and dispatch a real event:
```js
Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(el, value);
el.dispatchEvent(new Event('input', { bubbles: true }));
```
For `<select>`, use `HTMLSelectElement.prototype`'s setter instead. For fields gated behind `onBlur` (e.g. class/species/archetype commit), prefer the `form_input` tool over synthetic dispatch — it reliably triggers blur-driven handlers where raw `dispatchEvent` sometimes doesn't.

**More testing notes**
- Old-save test: build a character with `createBlankCharacter()`, delete `dataVersion` and `companion`, null out `speciesBaseline`, `speciesSpeeds` and `speciesNaturalArmor`, put odd power names in, write it to `localStorage['sw5e-characters']`, reload in a fresh tab. Expect the Update banner and a `dataVersion` of 1 after load.
- A `NumberInput` set through the native setter stays a draft until blur and can look stale; read `localStorage` for the real value.
- Companion checks that worked: Beast level 1 has 4 HP, level 5 has 16 HP and 3 trait slots; Size: Small + Heavy Hide + Darkvision at level 5 gives max HP 28, AC 14, speed 25 ft; a Class V Droid gets Athletics free.
- Phone testing: `resize_window` preset `mobile` (375px) counts as `pointer: coarse` and `hover: none`, which turns on the touch tooltips and stepper buttons. Reset to `desktop` afterwards.
- Vite can serve a stale module after several quick edits to one file (blank page, "x is not defined"): `touch` the file, then reload in a fresh tab. Long Bash heredocs with mixed quotes can fail to parse: write patch scripts to a file and run them.

**PowerShell here-string gotcha:** commit messages with embedded double quotes (e.g. quoting a formula like `"N + Dex modifier"`) can get mis-split into separate `git commit -m` arguments by PowerShell's native-command argument marshaling, producing `pathspec did not match` errors. If a commit message needs embedded quotes, write it to a scratch file and use `git commit -F <file>` instead of `-m`.

## PersonalAPI (memory across sessions)

This PC runs PersonalAPI (`C:\Users\anaki\Dev\PersonalAPI`). It's a local, private memory of past Claude Code sessions, commits and the user's Obsidian notes, and this repo is opted in as **SW5E_CharacterSheet**. Each session here starts with a briefing for SW5E_CharacterSheet: saved memories, a project brief, recent commits, open For Claude items, and Claude usage.

- Before asking the user to re-explain past work, check the `personalapi` tools:
  - `search_history` / `get_session` for past sessions
  - `search_commits` / `get_commit` for git history
  - `project_brief` for the project summary
  - `search_notes` / `read_note` for the user's plans and lore
- `Projects/SW5E_CharacterSheet/For Claude.md` in the vault is the user's list of requests for this project. They add to it themselves, by dictation, or by talking with Muse, their voice companion. Look at it with `for_claude` when starting work here. When an item is done, tick it off with `resolve_item` and a one-line reply.
- Use `remember` for lasting preferences, decisions (with the reason) and corrections, one short sentence each. Don't save one-off task details.
- Project briefs are written by a small local model and can be outdated or wrong. Verify details in the code before relying on them.
- If the briefing says Claude usage is high or near the limit, be economical and say so before starting a big task.
- The user's activity-tracker data is deliberately walled off from Claude. Don't try to reach it.
