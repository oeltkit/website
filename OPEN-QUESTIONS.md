# Open questions

Ambiguities found while building the site, per the CLAUDE.md workflow. None block the build; each is resolved with the most honest available option and flagged here for human decision.

## 1. `draft: true` on docs stubs vs. "every page renders"

`TASK.md` asks for quickstart/tracking-guide stubs "marked `draft: true`", but Starlight excludes draft pages from **production builds entirely** — the home hero CTA (`/docs/quickstart`) would 404 on the deployed site, the Starlight sidebar entries would vanish, and the axe-on-every-page CI matrix couldn't reach them.

**Resolution taken:** all stub docs ship non-draft with a visible `Draft` sidebar badge and a `:::caution[Draft]` callout up top, plus TODO callouts referencing the main-repo specs. The blog launch post *does* use `draft: true` (nothing links to it, so Starlight semantics cost nothing there).
**Decide:** fine as-is, or do you want the stubs truly excluded from production (accepting the 404 CTA until the docs are written)?

## 2. Phase 0/1 component inventory

SITE-STRUCTURE.md says the components gallery launch set is "the Phase 0/1 inventory", which lives in the main repo and isn't available here. Only `<oelt-mcq>` and `<oelt-branching>` are named in the doc.

**Resolution taken:** gallery (`src/data/components.ts`) and component reference docs cover those two, with markup samples / keyboard maps / tracking events stubbed as TODO (not guessed). **Needed from main repo:** the full inventory + per-component markup, a11y notes, and tracking events.

## 3. Walkthrough artifacts (how-it-works)

The walkthrough calls for a real `course.json` (Option C shape), real `<oelt-branching>` page markup, real `oelt validate` output including a caught error, and an LMS import screenshot. None exist yet.

**Resolution taken:** structural placeholders marked TODO with references to the main-repo specs. **Needed:** the four artifacts, generated with the toolkit once Phase 1 produces them.

## 4. The SCORM 1.2 collapse rule

The tracking guide must document the collapse rule "prominently" — the rule's substance is in the main-repo tracking spec, not in SITE-STRUCTURE.md.

**Resolution taken:** a prominent `danger` callout at the top of `/docs/tracking-guide/` holding the TODO, so the placement survives the content landing. **Needed:** the actual rule.

## 5. CLI surface beyond `oelt new` / `oelt package`

Validation clearly exists as a workflow step, but its CLI invocation (and the install command / package name) isn't in the brief.

**Resolution taken:** CLI reference documents the two known verbs and stubs the rest. **Needed:** CLI spec.

## 6. GitHub org/repo and npm org

The site links to `github.com/oeltkit/oeltkit`, `…/website`, and `npmjs.com/org/oeltkit`. If those names aren't final, update `src/config/site.ts` (single source). The header's star count silently degrades to a plain GitHub link until the repo is public.

## 7. Domain

Defaults assume `https://oeltkit.github.io/website` until the registrar purchase happens (TASK.md says DNS hookup is manual). When a domain exists: set it as the Pages custom domain — the deploy workflow picks it up automatically.

## 8. Copy written for this build (needs human review — `COPY CHANGE`)

SITE-STRUCTURE.md provides verbatim copy for home and partial copy elsewhere. Copy I drafted to fill the remaining structure (flagging the whole set for the staging copy review):

- Beta banner wording
- Page intros/lede paragraphs on how-it-works, standards, examples, community
- Standards page body copy (LMS target explanations, data section)
- Community page body copy (contribution funnel, governance, vendor neutrality)
- Empty-state copy on examples and blog
- Docs stub copy, `llms.txt` / `llms-full.txt` content
- 404 page, footer credit line, demo placeholder cards
