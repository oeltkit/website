# Task 06 — Marketing + docs website (independent of tasks 01–05)

**Prerequisites:** none on the toolkit code (can run in parallel with everything). Needs `website/SITE-STRUCTURE.md` copied into the repo or workspace. **Run in a separate repo:** `oeltkit/website`.

**Session prompt for Claude Code:**

---

Build the OELTKit website per `SITE-STRUCTURE.md` (structure, copy, and design notes are all in that doc — follow it; don't invent new positioning).

Stack & constraints:

1. **Astro 5.x + Starlight** for `/docs`, marketing pages as plain Astro pages. Static output (no SSR). Deploy target: Cloudflare Pages or GitHub Pages — make it config-switchable, default GitHub Pages.
2. **No CSS framework.** Plain CSS with `--oelt-*` design tokens in a single `tokens.css` (the site IS the product's default theme demo). Dark/light via token swap + `prefers-color-scheme`, with manual toggle.
3. **The site must itself pass:** Lighthouse 100/100/100/100 on home (CI check with thresholds ≥95 to avoid flakiness), axe-core clean on every page (Playwright CI job), works with JS disabled except live component demos (which show a static fallback screenshot + notice).
4. **Live component demos:** the toolkit packages don't exist yet — build demo sections behind a `DEMOS_ENABLED=false` flag rendering placeholder cards ("coming with v0.1") until `@oeltkit/components` publishes. Structure the demo slots so enabling later is a config change + dependency add, not a rebuild.
5. **Docs content:** scaffold the Starlight nav exactly as SITE-STRUCTURE.md "Docs" section; write the quickstart and tracking guide as stubs marked `draft: true` with TODO callouts referencing the main-repo specs — do NOT invent API details that aren't in the specs.
6. **llms.txt / llms-full.txt** served at site root; generate from a source file in `src/content/llms/` so it's maintained as content, not a build artifact.
7. SEO/social: per-page titles+descriptions from the copy doc, OG image (generated, text-based, token colors), sitemap, RSS for blog collection. Blog launches empty except a `draft: true` launch-post skeleton.
8. Beta banner site-wide per the doc's "Honesty constraints".

Definition of done: `npm run build` clean; CI green (Lighthouse + axe jobs); README with deploy instructions; every page from the site map renders with the copy from SITE-STRUCTURE.md.

---

**Human gates:** copy review on staging before any public deploy; you personally do the "unplug your mouse" keyboard pass on the built site. Domain/DNS hookup is manual (after registrar purchase).
