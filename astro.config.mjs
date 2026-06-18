// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

/**
 * Live-demos flag, resolved in Node so it honors BOTH a local `.env` file and a
 * CI/deploy step env (the workflows set DEMOS_ENABLED=true). Unprefixed env vars
 * aren't exposed to import.meta.env by default, so we bake the value in via
 * vite.define below — keeping `import.meta.env.DEMOS_ENABLED` as the read API in
 * src/config/site.ts. Default off, so the placeholder path always still builds.
 */
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const DEMOS_ENABLED = (env.DEMOS_ENABLED ?? process.env.DEMOS_ENABLED) === 'true';

/**
 * Deploy-target switching (default: GitHub Pages project site).
 *
 * - GitHub Pages: the deploy workflow injects SITE_URL + BASE_PATH from
 *   actions/configure-pages, so forks and custom domains both work untouched.
 * - Cloudflare Pages: set SITE_URL to the pages.dev (or custom) domain and
 *   BASE_PATH to "/" in the Pages project settings. No code change needed.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://oeltkit.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/';

/**
 * Expressive Code plugin: make every code block's <pre> keyboard-focusable.
 * Code blocks that overflow horizontally become scrollable regions, and axe's
 * `scrollable-region-focusable` rule requires those to be reachable by keyboard
 * (tabindex), so keyboard users can scroll them. Harmless on non-scrolling
 * blocks. Keeps the docs axe-clean as code samples grow.
 */
function preFocusablePlugin() {
  const setTabindex = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'element' && node.tagName === 'pre') {
      node.properties = node.properties || {};
      node.properties.tabIndex = 0;
    }
    if (Array.isArray(node.children)) node.children.forEach(setTabindex);
  };
  return {
    name: 'pre-focusable',
    hooks: {
      postprocessRenderedBlock: ({ renderData }) => setTabindex(renderData.blockAst),
    },
  };
}

/**
 * Rehype plugin: same idea as preFocusablePlugin, but for markdown <table>s.
 * Wide tables (e.g. the per-target mapping tables) overflow horizontally and
 * become scrollable regions, so they need a tabindex for keyboard scroll access
 * to stay axe-clean. Harmless on tables that don't overflow.
 */
function rehypeFocusableTables() {
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'element' && node.tagName === 'table') {
      node.properties = node.properties || {};
      node.properties.tabIndex = 0;
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'ignore',
  markdown: { rehypePlugins: [rehypeFocusableTables] },

  integrations: [
    starlight({
      title: 'OELTKit',
      description:
        'Open source toolkit that turns AI-built learning content into accessible, SCORM- and cmi5-compliant courses.',
      expressiveCode: { plugins: [preFocusablePlugin()] },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/oeltkit/oeltkit' },
      ],
      customCss: [
        './src/styles/fonts.css',
        './src/styles/tokens.css',
        './src/styles/starlight.css',
      ],
      components: {
        Banner: './src/components/starlight/Banner.astro',
      },
      sidebar: [
        { label: 'Docs home', slug: 'docs' },
        { label: 'Quickstart', slug: 'docs/quickstart' },
        { label: 'Authoring guide', slug: 'docs/authoring-guide' },
        { label: 'Tracking guide', slug: 'docs/tracking-guide' },
        {
          label: 'Component reference',
          items: [
            { label: 'Overview', slug: 'docs/components' },
            { label: '<oelt-mcq>', slug: 'docs/components/oelt-mcq' },
            { label: '<oelt-branching>', slug: 'docs/components/oelt-branching' },
            { label: '<oelt-media>', slug: 'docs/components/oelt-media' },
            { label: '<oelt-text-entry>', slug: 'docs/components/oelt-text-entry' },
            { label: '<oelt-quiz>', slug: 'docs/components/oelt-quiz' },
            { label: '<oelt-likert>', slug: 'docs/components/oelt-likert' },
            { label: '<oelt-ordering>', slug: 'docs/components/oelt-ordering' },
            { label: '<oelt-matching>', slug: 'docs/components/oelt-matching' },
            { label: '<oelt-categorize>', slug: 'docs/components/oelt-categorize' },
          ],
        },
        { label: 'MCP setup per client', slug: 'docs/mcp-setup' },
        { label: 'CLI reference', slug: 'docs/cli' },
        {
          label: 'Recipes',
          badge: { text: 'Draft', variant: 'caution' },
          items: [
            { label: 'Overview', slug: 'docs/recipes' },
            { label: 'Course from a PowerPoint', slug: 'docs/recipes/course-from-powerpoint' },
            { label: 'Storyboard to SCORM', slug: 'docs/recipes/storyboard-to-scorm' },
            { label: 'Design prototype to course', slug: 'docs/recipes/design-prototype-to-course' },
            { label: 'Update an existing course', slug: 'docs/recipes/update-existing-course' },
            { label: 'Translate my course', slug: 'docs/recipes/translate-my-course' },
            { label: 'Quiz from a policy document', slug: 'docs/recipes/quiz-from-policy-document' },
          ],
        },
        {
          label: 'For machines',
          items: [
            { label: 'llms.txt', link: '/llms.txt' },
            { label: 'llms-full.txt', link: '/llms-full.txt' },
          ],
        },
      ],
    }),
    sitemap(),
  ],

  vite: {
    // A plain global define (not import.meta.env, which Astro's own env plugin
    // re-resolves and would clobber). src/config/site.ts reads this constant.
    define: {
      __OELT_DEMOS_ENABLED__: JSON.stringify(DEMOS_ENABLED),
    },
  },

  adapter: cloudflare()
});