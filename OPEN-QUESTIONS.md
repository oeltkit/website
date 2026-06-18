# Open questions

Ambiguities found while building the site, per the CLAUDE.md workflow. Items 2–5 were **resolved** in a later pass that synced content from the main toolkit repo (`../oeltkit`); the remaining open items are flagged for human decision.

## 1. Docs stubs — now filled, Draft badges removed

Earlier the docs pages were stubs marked with a `Draft` sidebar badge. They have since been filled with real content sourced from the main-repo specs (`oeltkit/oeltkit`), so the `Draft` badges were removed from the sidebar — the site-wide `beta` banner still carries the "pre-v1.0, APIs may change" caveat. The blog launch post remains `draft: true`.
**Decide:** fine as-is.

## 2. Component inventory — RESOLVED (now from the committed export)

The `/components` gallery is now generated from the committed toolkit export snapshot (`src/data/toolkit-export/components.json` → `src/data/components.ts`), not hand-transcribed. That export carries the **full real inventory — twelve gallery entries / fourteen elements**, more than the earlier nine: it adds `<oelt-hotspot>`, `<oelt-reflection>`, and an `<oelt-tabs>` entry that bundles `<oelt-tabs>` / `<oelt-accordion>` / `<oelt-flip-cards>`. Each card shows the export's verbatim example markup (still in each card's "View source") and its `a11y` summary, with the `beta` status surfaced. **Live on-page demos are now on** (see §9): ten of the twelve render the real component; `<oelt-media>` and `<oelt-hotspot>` stay static (they need a sample video/image we don't ship). **Note:** the docs *component reference* still has dedicated pages for the original nine only; the three newer components link to the reference overview until their pages are written (they need attribute/keyboard detail not in the export — not invented here).

## 3. Walkthrough artifacts (how-it-works) — RESOLVED (one item still pending, by design)

The how-it-works walkthrough now renders the **real** toolkit walkthrough from the committed snapshot: the actual `course.json` ("Spotting Phishing Emails", targets `scorm12`/`cmi5`/`web`), the real `pages/check.html` content page with its `<oelt-mcq>`, the real `oelt validate` output including the genuine caught error (`code: "interaction-missing"`, with `message_human`), and the real `harness.png` screenshot of the course completing in the local fake-LMS harness (`completed`/`passed`/score 100). **Still pending:** `lms-import.png` — a screenshot of the package completing in a *real* LMS (SCORM Cloud), which can't be produced locally. Left as the documented placeholder; **not mocked up** (honesty constraint).

## 4. The SCORM 1.2 collapse rule — RESOLVED (now verbatim)

The tracking guide quotes the collapse rule **verbatim** from `specs/tracking-semantics.md §4.2` (a `danger` callout): the normative "score rule + `mastery` ⇒ `passed`/`failed`; otherwise `completed`/`incomplete`" wording plus its three consequences. The page also now carries the **OQ-004 SCORM 2004 known limitation** (completion/success don't reliably roll up on a real LMS; 1.2/cmi5/web are the verified targets), the per-target mapping table, and the 3 KB suspend budget.

## 5. CLI surface — RESOLVED (synced to `cli.json`)

The CLI reference is kept in sync with the committed `cli.json` snapshot: all six verbs (`new`, `validate`, `preview`, `package`, `export`, `import`), their flags, the `--target` values, the `.oeltcourse` exchange format, and the "package refuses on validation errors" rule. It now also carries the **SCORM 2004 export-only caveat** (OQ-004) from `cli.json`. Install is flagged beta: `@oeltkit/cli` is not yet on npm.

## 5a. Committed toolkit export snapshot — RESOLVED (new)

`src/data/toolkit-export/` is a **committed snapshot** of the toolkit's `docs/website-export/`, so CI (and a bare clone of this repo) builds without the sibling `oeltkit/oeltkit` checked out. Re-sync with `npm run sync:toolkit-export` (defaults to `../oeltkit`, override with `OELTKIT_REPO=`); the toolkit repo stays the source of truth. See `src/data/toolkit-export/README.md`. **Do not hand-edit** the snapshot.

## 5b. Recipes section — RESOLVED (prompts are visible drafts)

Added a **Recipes** docs section (`docs/recipes/` — overview + the six SIMPLICITY §4 recipes: PowerPoint, storyboard, design prototype, update, translate, quiz-from-policy). Each prompt is a **draft, not yet CI-verified**, marked with a sidebar `Draft` badge and an in-page caution callout. **Mechanism note:** these pages do *not* use Starlight's `draft: true` frontmatter — that flag *excludes* a page from the production build, which would hide the section and break the sidebar/sitemap. We use visible draft markers instead. SIMPLICITY's "recipes as executable CI-tested docs" and the per-LMS upload guides (Moodle/Cornerstone/Docebo/TalentLMS/SCORM Cloud, with screenshots) are noted as **coming** — not written, no screenshots invented.

## 5c. Standards page — SCORM 2004 caveat — RESOLVED (new)

The Standards page SCORM 2004 target now reads "export available; completion reporting not yet verified — 1.2 and cmi5 are the verified targets" (OQ-004). The per-component conformance blurb was also de-hardcoded from "all nine" to "every launch component" (links to the gallery), since the gallery now lists the fuller export inventory.

## 6. GitHub org/repo and npm org — RESOLVED (names final, packages published)

The site links to `github.com/oeltkit/oeltkit`, `…/website`, and `npmjs.com/org/oeltkit`; **these org/npm names are now final.** Single source: `src/config/site.ts`. The header's star count silently degrades to a plain GitHub link until the repo is public. **The `@oeltkit/*` packages are published to npm at `0.1.0`** (runtime, components, cli, mcp). `@oeltkit/components@^0.1.0` is now a real dependency of this site (it ships to the built client JS) — see §9. **Follow-up (not done here):** docs install copy still flags `@oeltkit/cli` / runtime / mcp as pre-publish in a few places (the install-beta caveats from §5); now that 0.1.0 is out, sweep those when convenient — left untouched this pass since only `@oeltkit/components` was needed and verified for the demos.

## 7. Domain

Defaults assume `https://oeltkit.github.io/website` until the registrar purchase happens (TASK.md says DNS hookup is manual). When a domain exists: set it as the Pages custom domain — the deploy workflow picks it up automatically.

## 8. Copy written for this build (needs human review — `COPY CHANGE`)

SITE-STRUCTURE.md provides verbatim copy for home and partial copy elsewhere. Copy drafted to fill the rest (flagged for the staging copy review):

- **NEW — positioning (leadership-requested):** the home hero now carries the "An AI-first e-learning authoring toolkit" framing, and the tagline/sub adopt leadership's line — *"lets an AI actually build real, ready-to-ship online courses."* Per leadership's note, the word "mock-ups" is avoided when describing course output. `SITE_TAGLINE`/`SITE_DESCRIPTION` in `src/config/site.ts`, the hero in `src/pages/index.astro`. **Confirm the framing before public deploy.**
- Docs body copy (quickstart, authoring guide, tracking guide, CLI reference, MCP setup, all nine component pages) — drafted from the main-repo specs; confirm tone/positioning.
- Beta banner wording; page intros/ledes on how-it-works, standards, examples, community.
- Standards page body copy (LMS target explanations, per-component conformance summary, data section).
- Community page body copy; empty-state copy on examples and blog.
- `llms.txt` / `llms-full.txt` content; 404 page, footer credit line, demo placeholder cards.

## 9. Live component demos — RESOLVED (now on)

`@oeltkit/components@^0.1.0` is a real dependency and `DEMOS_ENABLED` is on for published builds. The CI `build` job and the deploy build set `DEMOS_ENABLED=true` (so the a11y + Lighthouse jobs test the artifact *with* live components); the flag stays env-driven and defaults off, so the placeholder path still builds for anyone who wants it. Mechanism: the flag is resolved in Node in `astro.config.mjs` (from a `.env` file or the CI step env) and baked in via `vite.define` as `__OELT_DEMOS_ENABLED__`, which `src/config/site.ts` reads — an unprefixed env var isn't exposed to `import.meta.env`, and Astro's env plugin clobbers a `define` aimed at `import.meta.env.*`, so a plain global define is used.

- **Registration:** a single deferred module script (`src/components/ComponentRuntime.astro`, gated on the flag) imports `@oeltkit/components`; the import side-effect registers the `<oelt-*>` elements. Included only on the home + components pages. Components are light-DOM and content-bearing, so the authored markup reads sensibly with JS off and upgrades in place.
- **Theming:** `@oeltkit/components` injects its own structural CSS keyed to *its* token contract (`--oelt-color-fg/primary/correct/incorrect`, `--oelt-space-1..4`, `--oelt-radius`, …). `DemoSlot.astro` maps that contract onto the site's design tokens on `.demo-slot--live`, so the live components inherit the exact site theme (dark/light included) and stay token-only.
- **Markup:** demo markup is the canonical example for each component (from the export / package README), in `src/data/component-demos.ts`. The only change from verbatim is that interaction ids are namespaced (`demo-mcq`, etc.) so every live demo on one page has a unique id — the same uniqueness the toolkit's own validator enforces. The verbatim example (original ids) still shows in each card's "View source". The home proof section runs a real `<oelt-mcq>` + `<oelt-branching>` with a small read-only tracking inspector that echoes the `oelt-interaction` events (no LMS connected, so events stop at the panel).
- **Two static holdouts:** `<oelt-media>` (needs a captioned sample video — it refuses to render without captions/transcript by design) and `<oelt-hotspot>` (needs a sample diagram image). Neither asset ships in the export and we don't invent media for a demo (honesty + "no AI-slop illustration"). Their slots show an honest "static example" note and keep the verbatim "View source" markup. **Decide:** acceptable as-is, or author real sample assets later to demo these two live.
- **Gates:** `npm run build` clean; axe clean across the full route × theme matrix with demos live (65 checks); Lighthouse ≥95 all categories on home with the demo JS present (deferred, so performance holds).
