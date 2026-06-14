/**
 * Component gallery entries (launch set = the Phase 0/1 inventory).
 *
 * Synced from the frozen component specs in oeltkit/oeltkit
 * (specs/components/*.md). Markup, a11y notes, and tracking events are quoted
 * from those specs — not guessed. Components are implemented in the toolkit and
 * publish as `@oeltkit/components` with the v0.1 release; the live demos on this
 * page light up then (see DEMOS_ENABLED in src/config/site.ts).
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
      'A scored question with one correct answer (radio) or several (checkbox). Progressively enhances your markup into a native fieldset and reports its result through the runtime with one declared rule — no hand-wired score plumbing.',
    docsPath: '/docs/components/oelt-mcq/',
    sourceExample: `<oelt-mcq id="q1" mode="single" key="b">
  <p slot="prompt">Which standard is recommended for new content?</p>
  <oelt-option value="a">SCORM 1.2 only</oelt-option>
  <oelt-option value="b">cmi5</oelt-option>
  <oelt-option value="c">AICC</oelt-option>
  <p slot="correct">Correct — cmi5 is the modern target.</p>
  <p slot="incorrect">Not quite — cmi5 is recommended for new content.</p>
</oelt-mcq>`,
    a11yNotes: [
      'Renders as a native <fieldset>/<legend>; the prompt labels the group.',
      'Single mode: arrow keys move and select. Multiple mode: Space toggles each checkbox. Enter submits.',
      'On submit, focus moves to an aria-live="polite" feedback region so the result is announced.',
      'Correct/incorrect is conveyed in text, never by color alone.',
    ],
    trackingEvents: [
      'oelt-interaction — type: "choice"',
      'result: "passed" | "failed" (or "completed" with manual-grade)',
      'score: 1 or 0 (single); partial 0–1 (multiple)',
      'response: the selected value(s)',
    ],
  },
  {
    tag: 'oelt-branching',
    name: 'Branching scenario',
    blurb:
      'A decision scenario built from a JSON node graph. Each branch the learner takes is recorded, and because the structure is declarative, validation can prove every path is reachable and completable.',
    docsPath: '/docs/components/oelt-branching/',
    sourceExample: `<oelt-branching id="scenario1" start="n1">
  <script type="application/json">
    {
      "nodes": {
        "n1": {
          "text": "<p>A colleague asks for your password. You…</p>",
          "choices": [
            { "label": "Share it", "to": "bad", "value": "share" },
            { "label": "Refuse and report it", "to": "good", "value": "refuse" }
          ]
        },
        "good": { "text": "<p>Correct call.</p>", "end": "passed" },
        "bad": { "text": "<p>That exposes credentials.</p>", "choices": [{ "label": "Back", "to": "n1", "value": "back" }] }
      }
    }
  </script>
</oelt-branching>`,
    a11yNotes: [
      'Choices are native <button>s; Tab moves between them, Enter/Space takes one.',
      'On each transition, focus moves to the new node so screen readers read it from the top.',
      'Only the current node is in the accessibility tree; terminal state is conveyed in text.',
      'Transitions are instant when prefers-reduced-motion is set.',
    ],
    trackingEvents: [
      'oelt-interaction — type: "sequencing"',
      'per choice: result "completed", response "fromNode:value"',
      'terminal node: result from node.end (passed|failed|completed)',
      'response: the visited node path',
    ],
  },
  {
    tag: 'oelt-media',
    name: 'Accessible media',
    blurb:
      'An accessible wrapper around a native <video> or <audio> element. It enforces captions or a transcript, offers a transcript panel, and reports completion once the learner reaches a watched threshold.',
    docsPath: '/docs/components/oelt-media/',
    sourceExample: `<oelt-media id="intro-video" threshold="0.9">
  <video controls preload="metadata" slot="media">
    <source src="media/intro.mp4" type="video/mp4" />
    <track kind="captions" src="media/intro.en.vtt" srclang="en" label="English" default />
  </video>
  <div slot="transcript"><p>Full transcript…</p></div>
</oelt-media>`,
    a11yNotes: [
      'Video requires a captions <track> or a transcript slot; audio requires a transcript. Without one it refuses to render and validation fails.',
      'The transcript toggle is a native control with aria-expanded; the panel is a labelled region.',
      'No autoplay under prefers-reduced-motion; meaning is never conveyed by motion alone.',
    ],
    trackingEvents: [
      'oelt-interaction — type: "media"',
      'result: "completed" once watched ≥ threshold (default 0.9)',
      'response: "watched" (no score)',
    ],
  },
  {
    tag: 'oelt-text-entry',
    name: 'Text / numeric entry',
    blurb:
      'A short free-response question, text or numeric. It grades against author-supplied answers — case-insensitive text with |-separated alternatives, or a number with absolute tolerance — and reports one result.',
    docsPath: '/docs/components/oelt-text-entry/',
    sourceExample: `<oelt-text-entry id="capital" answer="Paris">
  <p slot="prompt">What is the capital of France?</p>
  <p slot="correct">Correct — Paris.</p>
  <p slot="incorrect">Not quite — it's Paris.</p>
</oelt-text-entry>

<!-- numeric with tolerance -->
<oelt-text-entry id="pi" mode="numeric" answer="3.14" tolerance="0.01">
  <p slot="prompt">Estimate π to two decimal places.</p>
</oelt-text-entry>`,
    a11yNotes: [
      'The prompt is a native <label> bound to the input.',
      'Numeric mode uses inputmode="decimal" for a numeric soft keyboard without locale pitfalls.',
      'Enter submits; focus moves to an aria-live feedback region; pass/fail is text, not color.',
    ],
    trackingEvents: [
      'oelt-interaction — type: "fill-in" (text) or "numeric"',
      'result: "passed" | "failed" (or "completed" with manual-grade)',
      'score: 1 or 0; response: the raw input',
    ],
  },
  {
    tag: 'oelt-quiz',
    name: 'Quiz container',
    blurb:
      'A container that aggregates its child questions (<oelt-mcq>, <oelt-text-entry>) into a single weighted score and reports one result. Supports per-question weights, a random pool, and shuffling.',
    docsPath: '/docs/components/oelt-quiz/',
    sourceExample: `<oelt-quiz id="final" mastery="0.7">
  <oelt-mcq id="q1" mode="single" key="b" weight="1">
    <p slot="prompt">Which standard is recommended for new content?</p>
    <oelt-option value="a">SCORM 1.2</oelt-option>
    <oelt-option value="b">cmi5</oelt-option>
  </oelt-mcq>
  <oelt-text-entry id="q2" answer="cmi5" weight="2">
    <p slot="prompt">Name that standard (one word).</p>
  </oelt-text-entry>
</oelt-quiz>`,
    a11yNotes: [
      'Adds no roles to child questions — each keeps its native keyboard model and Tab order.',
      'A role="status" region announces progress ("Answered 1 of 2") and the final score.',
      'Pooled-out questions get the hidden attribute, so assistive tech never reaches them.',
    ],
    trackingEvents: [
      'oelt-interaction — type: "performance" (emitted once all active questions answer)',
      'score: weighted mean of child scores (0–1)',
      'result: passed/failed when mastery is set, else completed',
      'child questions also report their own interactions',
    ],
  },
  {
    tag: 'oelt-likert',
    name: 'Likert / rating scale',
    blurb:
      'A single-select rating scale for surveys and self-assessment. There is no correct answer — it always reports "completed" with the chosen value and is never quiz-scored.',
    docsPath: '/docs/components/oelt-likert/',
    sourceExample: `<!-- explicit labels (recommended) -->
<oelt-likert id="confidence">
  <p slot="prompt">I feel confident applying what I learned.</p>
  <oelt-option value="1">Strongly disagree</oelt-option>
  <oelt-option value="2">Disagree</oelt-option>
  <oelt-option value="3">Neutral</oelt-option>
  <oelt-option value="4">Agree</oelt-option>
  <oelt-option value="5">Strongly agree</oelt-option>
</oelt-likert>

<!-- generated: N points with end anchors -->
<oelt-likert id="ease" scale="5" low-label="Very hard" high-label="Very easy">
  <p slot="prompt">How easy was this lesson?</p>
</oelt-likert>`,
    a11yNotes: [
      'Renders as a native radio group in a <fieldset>; the statement is the <legend>.',
      'Arrow keys move and select across the scale; Enter submits.',
      "Generated mode folds the low/high anchors into the first and last labels' accessible names.",
    ],
    trackingEvents: [
      'oelt-interaction — type: "likert"',
      'result: "completed" (surveys are never scored)',
      'response: the chosen value',
    ],
  },
  {
    tag: 'oelt-ordering',
    name: 'Ordering / ranking',
    blurb:
      'Reorder a set of items into the correct sequence — process steps, a timeline, a ranking. Keyboard-first (pick up, move, drop) with pointer drag as an enhancement; scored by how many items land in the right place.',
    docsPath: '/docs/components/oelt-ordering/',
    sourceExample: `<oelt-ordering id="lifecycle">
  <p slot="prompt">Put the steps in order, first to last.</p>
  <oelt-item value="plan">Plan</oelt-item>
  <oelt-item value="build">Build</oelt-item>
  <oelt-item value="test">Test</oelt-item>
  <oelt-item value="ship">Ship</oelt-item>
</oelt-ordering>`,
    a11yNotes: [
      'Items are native <button>s. Space picks up, Arrow keys move, Space drops, Escape cancels.',
      'An assertive live region announces every pick-up, move, drop, and cancel with the item and position.',
      'Reordering is instant under prefers-reduced-motion; no deprecated aria-grabbed/dropeffect.',
    ],
    trackingEvents: [
      'oelt-interaction — type: "sequencing" (on Check)',
      'score: fraction of items in the correct position (0–1)',
      'result: "passed" only if every item is correct',
      'response: the chosen order',
    ],
  },
  {
    tag: 'oelt-matching',
    name: 'Matching',
    blurb:
      'Match each value to its correct prompt — country to capital, term to definition. One value per target. Keyboard-first with pointer-drag enhancement; scored by correct placements.',
    docsPath: '/docs/components/oelt-matching/',
    sourceExample: `<oelt-matching id="capitals">
  <p slot="prompt">Match each country to its capital.</p>
  <oelt-pair prompt="France" value="paris">Paris</oelt-pair>
  <oelt-pair prompt="Japan" value="tokyo">Tokyo</oelt-pair>
  <oelt-pair prompt="Egypt" value="cairo">Cairo</oelt-pair>
</oelt-matching>`,
    a11yNotes: [
      'Values are native <button>s. Space picks up, Arrow keys move across targets and the bank, Space drops, Escape cancels.',
      'An assertive live region names the target (its prompt) or "Bank" on every move.',
      'Dropping on an occupied target returns the previous value to the bank.',
    ],
    trackingEvents: [
      'oelt-interaction — type: "matching" (on Check)',
      'score: fraction of targets holding the correct value (0–1)',
      'result: "passed" only if all correct',
      'response: the prompt=value assignments',
    ],
  },
  {
    tag: 'oelt-categorize',
    name: 'Categorize',
    blurb:
      'Sort items into category buckets, where a bucket can hold many items. Keyboard-first with pointer-drag enhancement; scored by how many items land in the right bucket.',
    docsPath: '/docs/components/oelt-categorize/',
    sourceExample: `<oelt-categorize id="animals">
  <p slot="prompt">Sort each animal into its group.</p>
  <oelt-bucket value="mammals">Mammals</oelt-bucket>
  <oelt-bucket value="birds">Birds</oelt-bucket>

  <oelt-token bucket="mammals" value="dog">Dog</oelt-token>
  <oelt-token bucket="birds" value="eagle">Eagle</oelt-token>
  <oelt-token bucket="mammals" value="cat">Cat</oelt-token>
</oelt-categorize>`,
    a11yNotes: [
      'Tokens are native <button>s. Space picks up, Arrow keys move across buckets and the bank, Space drops, Escape cancels.',
      'An assertive live region names the bucket or "Bank" on every move.',
      "Each token's correct bucket is set with its bucket attribute; buckets hold any number of tokens.",
    ],
    trackingEvents: [
      'oelt-interaction — type: "matching" (on Check)',
      'score: fraction of tokens in the correct bucket (0–1)',
      'result: "passed" only if all correct',
      'response: the token=bucket assignments',
    ],
  },
];
