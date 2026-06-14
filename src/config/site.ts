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
 * Component demos stay behind this flag until @oeltkit/components is
 * published. Flipping it on is a config change (set DEMOS_ENABLED=true at
 * build time) plus the dependency add — demo slots are already structured
 * to render the real components. See src/components/DemoSlot.astro.
 */
export const DEMOS_ENABLED = import.meta.env.DEMOS_ENABLED === 'true';

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
