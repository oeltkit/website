# Open questions

Ambiguities found while building the site, per the CLAUDE.md workflow. Items 2–5 were **resolved** in a later pass that synced content from the main toolkit repo (`../oeltkit`); the remaining open items are flagged for human decision.

## 1. Docs stubs — now filled, Draft badges removed

Earlier the docs pages were stubs marked with a `Draft` sidebar badge. They have since been filled with real content sourced from the main-repo specs (`oeltkit/oeltkit`), so the `Draft` badges were removed from the sidebar — the site-wide `beta` banner still carries the "pre-v1.0, APIs may change" caveat. The blog launch post remains `draft: true`.
**Decide:** fine as-is.

## 2. Component inventory — RESOLVED (now from the committed export)

The `/components` gallery is now generated from the committed toolkit export snapshot (`src/data/toolkit-export/components.json` → `src/data/components.ts`), not hand-transcribed. That export carries the **full real inventory — twelve gallery entries / fourteen elements**, more than the earlier nine: it adds `<oelt-hotspot>`, `<oelt-reflection>`, and an `<oelt-tabs>` entry that bundles `<oelt-tabs>` / `<oelt-accordion>` / `<oelt-flip-cards>`. Each card shows the export's verbatim example markup (static, shown now) and its `a11y` summary, with the `beta` status surfaced. Live on-page demos still wait on `@oeltkit/components` publishing (the `DEMOS_ENABLED` flag). **Note:** the docs *component reference* still has dedicated pages for the original nine only; the three newer components link to the reference overview until their pages are written (they need attribute/keyboard detail not in the export — not invented here).

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

## 6. GitHub org/repo and npm org

The site links to `github.com/oeltkit/oeltkit`, `…/website`, and `npmjs.com/org/oeltkit`. If those names aren't final, update `src/config/site.ts` (single source). The header's star count silently degrades to a plain GitHub link until the repo is public. **Note:** the `@oeltkit/*` packages are at `0.0.0` and not yet published to npm — docs say so where install is mentioned.

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
