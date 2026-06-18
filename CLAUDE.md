# CLAUDE.md — oeltkit/website

Marketing + docs site for OELTKit (open source LLM-first e-learning toolkit). The build brief is `TASK.md`; structure and ALL copy live in `SITE-STRUCTURE.md` — follow it, don't invent positioning, features, or API details. The toolkit's APIs are defined in the main repo (`github.com/oeltkit/oeltkit`); if docs content needs an API detail not present in `SITE-STRUCTURE.md`, stub it with a TODO rather than guessing.

## Hard rules

1. Astro 5.x + Starlight, static output only. No SSR, no client framework (React/Vue/etc.). Interactive bits = vanilla JS, progressively enhanced.
2. No CSS framework. All styling via `--oelt-*` design tokens in `src/styles/tokens.css`. The site demonstrates the product's default theme — token discipline is the point.
3. Accessibility and performance are merge gates: axe-core clean on every page, Lighthouse ≥95 all categories, full keyboard operability, visible focus, `prefers-reduced-motion` respected.
4. Honesty constraints: beta banner site-wide; no invented testimonials, logos, metrics, or "verified on" claims.
5. Component demos live behind the `DEMOS_ENABLED` flag until `@oeltkit/components` is published.

## Workflow

Solo project, no PR review. Automated gates stand in for a reviewer — they're non-negotiable; the ceremony around them is gone.

- **Automated gates (blocking):** `npm run build`, `npm run test:a11y` (axe clean), and Lighthouse ≥95 all categories. A red gate blocks — never declare done on a failing gate, never weaken a check to pass it.
- **Commit straight to `main`** with short conventional-commit subjects; no PRs. Batch related work freely.
- **Copy changes** (anything user-visible-textual): put `COPY CHANGE` in the commit body so it's greppable for an async human read — the build does not wait on it.
- **Ambiguity:** for small, reversible wording/layout calls, decide and keep moving. **Stop only on positioning** — never invent or reframe positioning, features, or API details; park those in `OPEN-QUESTIONS.md`. Positioning is the one expensive-to-unwind class here.
