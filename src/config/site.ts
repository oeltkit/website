/** Central site constants + feature flags. */

export const SITE_TITLE = 'OELTKit';
export const SITE_TAGLINE =
  'An AI-first e-learning authoring toolkit that lets an AI actually build real, ready-to-ship online courses.';
export const SITE_DESCRIPTION =
  'An open source, AI-first toolkit that turns AI-built learning content into accessible, SCORM- and cmi5-compliant courses your LMS understands.';

export const GITHUB_ORG_URL = 'https://github.com/oeltkit';
export const GITHUB_REPO = 'oeltkit/oeltkit';
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;
export const NPM_URL = 'https://www.npmjs.com/org/oeltkit';

/**
 * Live component demos, gated so the off path stays intact (a11y/Lighthouse can
 * still build the placeholder). Set DEMOS_ENABLED=true at build time to render
 * the real <oelt-*> components in the demo slots.
 *
 * The boolean is baked in by astro.config.mjs' vite.define as the global
 * __OELT_DEMOS_ENABLED__ (resolved in Node from a `.env` file or the CI/deploy
 * step env — unprefixed env vars aren't otherwise exposed to the build). The
 * typeof guard keeps this safe if the define is ever absent (defaults off).
 */
declare const __OELT_DEMOS_ENABLED__: boolean;
export const DEMOS_ENABLED =
  typeof __OELT_DEMOS_ENABLED__ !== 'undefined' && __OELT_DEMOS_ENABLED__ === true;

export interface NavItem {
  label: string;
  href: string;
}

/** Global header nav, per SITE-STRUCTURE.md. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'Components', href: '/components/' },
  { label: 'Standards', href: '/standards/' },
  { label: 'Docs', href: '/docs/' },
];
