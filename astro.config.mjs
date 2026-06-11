// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

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

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'OELTKit',
      description:
        'Open source toolkit that turns LLM-generated learning content into accessible, SCORM- and cmi5-compliant courses.',
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
        { label: 'Quickstart', slug: 'docs/quickstart', badge: { text: 'Draft', variant: 'caution' } },
        { label: 'Authoring guide', slug: 'docs/authoring-guide', badge: { text: 'Draft', variant: 'caution' } },
        { label: 'Tracking guide', slug: 'docs/tracking-guide', badge: { text: 'Draft', variant: 'caution' } },
        {
          label: 'Component reference',
          items: [
            { label: 'Overview', slug: 'docs/components' },
            { label: '<oelt-mcq>', slug: 'docs/components/oelt-mcq', badge: { text: 'Draft', variant: 'caution' } },
            { label: '<oelt-branching>', slug: 'docs/components/oelt-branching', badge: { text: 'Draft', variant: 'caution' } },
          ],
        },
        { label: 'MCP setup per client', slug: 'docs/mcp-setup', badge: { text: 'Draft', variant: 'caution' } },
        { label: 'CLI reference', slug: 'docs/cli', badge: { text: 'Draft', variant: 'caution' } },
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
});
