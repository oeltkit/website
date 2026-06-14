# Open questions

Ambiguities found while building the site, per the CLAUDE.md workflow. Items 2–5 were **resolved** in a later pass that synced content from the main toolkit repo (`../oeltkit`); the remaining open items are flagged for human decision.

## 1. Docs stubs — now filled, Draft badges removed

Earlier the docs pages were stubs marked with a `Draft` sidebar badge. They have since been filled with real content sourced from the main-repo specs (`oeltkit/oeltkit`), so the `Draft` badges were removed from the sidebar — the site-wide `beta` banner still carries the "pre-v1.0, APIs may change" caveat. The blog launch post remains `draft: true`.
**Decide:** fine as-is.

## 2. Component inventory — RESOLVED

The full launch inventory (nine components) is now in `src/data/components.ts` and the component reference docs, synced from the frozen specs in `oeltkit/oeltkit/specs/components/`: `<oelt-mcq>`, `<oelt-branching>`, `<oelt-media>`, `<oelt-text-entry>`, `<oelt-quiz>`, `<oelt-likert>`, `<oelt-ordering>`, `<oelt-matching>`, `<oelt-categorize>`. Markup, attributes, keyboard maps, and tracking events are quoted from those specs, not guessed. Live on-page demos still wait on `@oeltkit/components` publishing (the `DEMOS_ENABLED` flag).

## 3. Walkthrough artifacts (how-it-works) — RESOLVED (one item pending)

The `course.json` manifest and the `<oelt-branching>` page markup are now real (from the manifest/component specs), and the validator step shows the actual `oelt validate --json` finding format (`{ ok, findings[] }` with `message_human`). **Still pending:** a screenshot of a packaged course imported into an LMS — left as the one placeholder, to be captured from a real SCORM Cloud import rather than mocked up.

## 4. The SCORM 1.2 collapse rule — RESOLVED

The tracking guide now documents the rule prominently (a `danger` callout) with the exact normative wording from the main-repo tracking spec: score rule + `mastery` ⇒ `passed`/`failed` in `lesson_status`; otherwise `completed`/`incomplete`. The per-target mapping table and the 3 KB suspend budget are included.

## 5. CLI surface — RESOLVED

The CLI reference now documents all six verbs (`new`, `validate`, `preview`, `package`, `export`, `import`), their flags, the `--target` values, the `.oeltcourse` exchange format, and the "package refuses on validation errors" rule — from the main-repo CLI behavior. Install is flagged beta: `@oeltkit/cli` is not yet on npm.

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
