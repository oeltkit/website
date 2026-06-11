/**
 * Component gallery entries (launch set = the Phase 0/1 inventory).
 *
 * TODO: only the components referenced in SITE-STRUCTURE.md are listed.
 * Extend from the Phase 0/1 inventory in oeltkit/oeltkit once published —
 * see OPEN-QUESTIONS.md. Markup, a11y notes, and tracking events are
 * intentionally stubbed rather than guessed.
 */

export interface ComponentEntry {
  /** Element tag, e.g. "oelt-mcq". */
  tag: string;
  name: string;
  blurb: string;
  docsPath: string;
  /** Exact markup an LLM writes — null until the component spec freezes. */
  sourceExample: string | null;
  /** Keyboard map + screen-reader behavior — null until spec freezes. */
  a11yNotes: string[] | null;
  /** Tracking events the component emits — null until spec freezes. */
  trackingEvents: string[] | null;
}

export const components: ComponentEntry[] = [
  {
    tag: 'oelt-mcq',
    name: 'Multiple-choice question',
    blurb:
      'A scored question with single or multiple correct answers. Reports its result through the tracking runtime with one declared rule — no hand-wired score plumbing.',
    docsPath: '/docs/components/oelt-mcq/',
    sourceExample: null,
    a11yNotes: null,
    trackingEvents: null,
  },
  {
    tag: 'oelt-branching',
    name: 'Branching scenario',
    blurb:
      'A decision point that routes learners down different paths. The branch structure is declarative, so validation can prove every path is reachable and completable.',
    docsPath: '/docs/components/oelt-branching/',
    sourceExample: null,
    a11yNotes: null,
    trackingEvents: null,
  },
];
