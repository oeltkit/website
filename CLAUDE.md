# CLAUDE.md — oeltkit/website

Marketing + docs site for OELTKit (open source LLM-first e-learning toolkit). The build brief is `TASK.md`; structure and ALL copy live in `SITE-STRUCTURE.md` — follow it, don't invent positioning, features, or API details. The toolkit's APIs are defined in the main repo (`github.com/oeltkit/oeltkit`); if docs content needs an API detail not present in `SITE-STRUCTURE.md`, stub it with a TODO rather than guessing.

## Hard rules

1. Astro 5.x + Starlight, static output only. No SSR, no client framework (React/Vue/etc.). Interactive bits = vanilla JS, progressively enhanced.
2. No CSS framework. All styling via `--oelt-*` design tokens in `src/styles/tokens.css`. The site demonstrates the product's default theme — token discipline is the point.
3. Accessibility and performance are merge gates: axe-core clean on every page, Lighthouse ≥95 all categories, full keyboard operability, visible focus, `prefers-reduced-motion` respected.
4. Honesty constraints: beta banner site-wide; no invented testimonials, logos, metrics, or "verified on" claims.
5. Component demos live behind the `DEMOS_ENABLED` flag until `@oeltkit/components` is published.

## Workflow

- Self-check before done: `npm run build`, `npm run test:a11y`, Lighthouse CI locally.
- Copy changes (anything user-visible-textual) get flagged `COPY CHANGE` in the PR for human review.
- Ambiguities → `OPEN-QUESTIONS.md`, then stop. Don't guess on positioning.
