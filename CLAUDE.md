# CLAUDE.md

Working notes for Claude Code in this repo. See [README.md](README.md) for the human-facing project description. Global git/commit/response-style conventions live in the user's `~/.claude/CLAUDE.md` and apply here too — this file only covers things specific to this project.

## Stack & dev server

React + TypeScript + Vite (rolldown-vite), no backend. All persistence is browser `localStorage`:
- `sw5e-characters` — character data
- `sw5e-theme` — dark/light choice
- `sw5e-layout` — draggable sheet section layout

Start the dev server with the Browser tool's `preview_start` using name `sw5e-charactersheet` (config in `.claude/launch.json`), not Bash/PowerShell.

**PowerShell gotcha:** `npx`/`npm` aren't on PATH by default in this shell. Prefix any PowerShell call that needs them with:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

**PowerShell gotcha:** `Invoke-RestMethod` silently returns garbage/empty on large JSON responses (>~100KB) in this environment. Use `Invoke-WebRequest -UseBasicParsing` and pipe `.Content` through `ConvertFrom-Json` instead — or better, use the Browser tool's `javascript_tool` with `fetch()`, which has no such issue and is generally faster for large payloads (see below).

## Data catalogs (`src/data/`)

Reference data (species, classes, archetypes, powers, weapons, armor, gear, feats, backgrounds) is sourced from sw5e.com and split by sourcebook: **PHB** (core), **EC** (Echoes of the Force), **WH** (Wretched Hives). Convention, established across the catalog:

- Small/medium catalogs keep all sources in one file, one array (`feats.ts`, `weapons.ts`, `armor.ts`, `gear.ts`, `powers.ts`, `sw5eData.ts`'s `BACKGROUNDS`). Header comment lists which sourcebooks are included.
- Large catalogs split PHB and EC into separate files, merged at the call site with `[...CATALOG_PHB, ...CATALOG_EC]` (see `archetypeDetails.ts` + `archetypeDetailsEC.ts`, `species.ts` + `speciesEC.ts`). Follow this pattern if a catalog grows too large for one file.
- `classFeatureChoices.ts` holds fighting styles, maneuvers, and per-class resource pools (`CLASS_RESOURCES`) — the latter only for resources with their own charge count and refresh (Rages, Superiority Dice, Focus Points, Potent Aptitude). Don't add things like Guardian's Focused Strikes or Sentinel's Kinetic Combat there — those are damage/die-size caps on *spending Force Points*, not independent pools; forcing them into `ClassResourceDef` misrepresents the mechanic. Their per-level values are already shown in `classes.ts`'s level tables.

**Checking a catalog for completeness against sw5e.com:** the site's own REST API is at `https://sw5eapi.azurewebsites.net/api/<endpoint>` (JSON, no auth). Known endpoints and their `contentSource` values (`PHB`/`EC`/`WH`, or `None`/absent if a category has no non-PHB content): `power` (465: 399 PHB + 66 EC), `species` (141: 30 PHB + 111 EC), `equipment` (507: 186 PHB + 123 EC + 198 WH — weapons/armor/gear combined, split by `equipmentCategory`), `archetype` (137: 40 PHB + 97 EC, note some EC entries are `(Companion)`/`(Depreciated)`/`(Old)` duplicates meant to be excluded), `feat` (119: 65 PHB + 44 EC + 10 WH), `background` (61: 20 PHB + 41 EC), `class` (10, PHB only), `fightingstyle` (32, PHB only), `maneuvers` (119: 100 PHB + 19 EC — note the plural endpoint name), `armorproperty`/`weaponproperty` (metadata, no source split). A class's full level table (including resource-pool columns) is in its `levelChangesJson`/`levelChangeHeadersJson` fields from `/api/class`; per-feature rules text is in `/api/feature`, filterable by `sourceName` (class/archetype name) and `name`.

When pulling data from this API for a catalog update: fetch via browser `fetch()`, transform to the target TS literal syntax in JS, and pull the result out via the tool's return value — don't paste it into a PowerShell heredoc or write it from memory. Always cross-check the transformed output against the raw fetched data (e.g. diff line-by-line) before writing it to a file; entries have been hand-typed from memory by mistake before and it produced fabricated data.

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

**PowerShell here-string gotcha:** commit messages with embedded double quotes (e.g. quoting a formula like `"N + Dex modifier"`) can get mis-split into separate `git commit -m` arguments by PowerShell's native-command argument marshaling, producing `pathspec did not match` errors. If a commit message needs embedded quotes, write it to a scratch file and use `git commit -F <file>` instead of `-m`.
