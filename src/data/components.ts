/**
 * Component gallery entries for /components.
 *
 * Populated from the committed toolkit export snapshot
 * (src/data/toolkit-export/components.json), which is generated in the toolkit
 * repo from packages/components/README.md. Do not hand-edit the inventory here —
 * re-sync the snapshot instead (`npm run sync:toolkit-export`). The example
 * markup and a11y notes shown on the gallery are quoted verbatim from that
 * export; live on-page demos still wait on @oeltkit/components publishing (the
 * DEMOS_ENABLED flag in src/config/site.ts).
 */
import exportData from './toolkit-export/components.json';

export interface ComponentEntry {
  /** Primary element tag, e.g. "oelt-mcq". */
  tag: string;
  /** Every custom element this entry ships (some bundle a small family). */
  elements: string[];
  /** Short human label, from the export's description. */
  label: string;
  /** Release status, e.g. "beta", verbatim from the export. */
  status: string;
  /** The caveat behind the status (e.g. "pending manual NVDA/VoiceOver passes"). */
  statusNote: string;
  /** Exact markup an LLM writes — shown statically (demos stay gated). */
  example: string;
  /** Accessibility summary, verbatim from the export. */
  a11y: string;
  /** On-site reference page, or null when one isn't published yet. */
  docsPath: string | null;
}

/** Tags that have a dedicated component-reference page in the docs. */
const DOCS_SLUGS = new Set([
  'oelt-mcq',
  'oelt-branching',
  'oelt-media',
  'oelt-text-entry',
  'oelt-quiz',
  'oelt-likert',
  'oelt-ordering',
  'oelt-matching',
  'oelt-categorize',
]);

interface RawComponent {
  name: string;
  elements: string[];
  status: string;
  statusNote: string;
  description: string;
  a11y: string;
  example: string;
  spec: string;
  readmeSlug: string;
}

export const componentsStatus: string = exportData.status;
export const componentsStatusNote: string = exportData.statusNote;

export const components: ComponentEntry[] = (exportData.components as RawComponent[]).map((c) => ({
  tag: c.name,
  elements: c.elements,
  label: c.description,
  status: c.status,
  statusNote: c.statusNote,
  example: c.example,
  a11y: c.a11y,
  docsPath: DOCS_SLUGS.has(c.name) ? `/docs/components/${c.name}/` : null,
}));
