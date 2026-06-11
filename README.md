# oeltkit/website

Marketing + docs site for [OELTKit](https://github.com/oeltkit/oeltkit) — the open source LLM-first e-learning toolkit. Astro 5 + Starlight, static output, no CSS framework: the site's `--oelt-*` design tokens **are** the product's default theme demo.

Structure and all copy come from `SITE-STRUCTURE.md`; the build brief is `TASK.md`. Unresolved items live in `OPEN-QUESTIONS.md`.

## Develop

```sh
npm install
npm run dev          # dev server (drafts visible)
npm run build        # generates the OG image, then builds to dist/
npm run preview      # serve the production build
```

## Quality gates (merge requirements)

```sh
npm run build        # must be clean
npm run test:a11y    # axe-core (WCAG 2.2 AA + best-practice) on every page, light & dark
npm run test:lighthouse  # Lighthouse vs ./dist, all categories asserted ≥95
```

CI (`.github/workflows/ci.yml`) runs all three on every push/PR. The a11y suite also verifies sitemap coverage (you can't add a page without adding it to the axe matrix), the skip link, and the theme toggle.

Two gates stay human: copy review on staging before any public deploy, and a manual "unplug your mouse" keyboard pass on the built site.

## Deploying

Deploy-target switching is two env vars read by `astro.config.mjs`:

| Var | Purpose | GitHub Pages | Cloudflare Pages |
| --- | --- | --- | --- |
| `SITE_URL` | Canonical origin | set by workflow | your `*.pages.dev` or custom domain |
| `BASE_PATH` | Path prefix | set by workflow (`/website`) | `/` |

**GitHub Pages (default):** enable Pages → "GitHub Actions" in the repo settings; `.github/workflows/deploy.yml` derives `SITE_URL`/`BASE_PATH` from `actions/configure-pages`, so forks and custom domains work without edits. Domain/DNS hookup is manual.

**Cloudflare Pages:** create a Pages project on this repo with build command `npm run build`, output directory `dist`, and the env vars above. The GitHub Pages workflow can be disabled or left (it deploys independently).

## Feature flags

- `DEMOS_ENABLED` (default `false`): component demos render as honest "coming with v0.1" placeholders until `@oeltkit/components` is on npm. Enabling = set the env var to `true` at build time + add the dependency; the demo slots (`src/components/DemoSlot.astro`) are already structured for it. See `.env.example`.

## Where things live

| What | Where |
| --- | --- |
| Design tokens (the product theme) | `src/styles/tokens.css` — every style consumes these; no raw values elsewhere |
| Marketing pages | `src/pages/*.astro` |
| Docs (Starlight) | `src/content/docs/docs/` — stubs carry `Draft` badges + TODO callouts; never invent API details, the specs live in the main repo |
| Blog | `src/content/blog/` (launch post is `draft: true`; drafts render in dev only) |
| `llms.txt` / `llms-full.txt` | maintained as content in `src/content/llms/`, served at the site root by `src/pages/llms*.txt.ts` |
| Component gallery data | `src/data/components.ts` |
| Examples gallery data | `src/data/examples.ts` (launches empty — real generated output only) |
| OG image | generated at build by `scripts/generate-og.mjs` from token colors |
| GitHub star count | fetched at build in `src/components/Header.astro`, degrades to a plain link |

## House rules

1. Astro + Starlight, static output only. No SSR, no client frameworks — interactive bits are vanilla JS, progressively enhanced (the site works with JS disabled; demos show a static fallback + notice).
2. Token discipline: all styling via `--oelt-*` tokens. Dark/light is a token swap (`prefers-color-scheme` + manual toggle, shared with Starlight via the `starlight-theme` storage key).
3. Honesty constraints (pre-v1.0): site-wide beta banner; no invented testimonials, logos, metrics, or "verified on" claims; the examples page only ever shows real generated output.
4. Copy changes (anything user-visible-textual) get flagged `COPY CHANGE` in the PR for human review.
