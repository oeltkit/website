/**
 * Live-demo markup for the component gallery and the home proof section.
 *
 * Each `html` is the canonical primary example for that component, taken from
 * the toolkit export (src/data/toolkit-export/components.json, the `example`
 * field — also the @oeltkit/components README). The only change from the
 * verbatim example is that interaction ids are namespaced (e.g. `demo-mcq`) so
 * every live demo on one page has a unique id — the same id-uniqueness the
 * toolkit's own validator enforces within a course. The verbatim example, with
 * its original ids, is still shown in each card's "View source" panel.
 *
 * Two components can't be demoed live from the export alone:
 *   - <oelt-media> needs a captioned sample video (it refuses to render without
 *     captions or a transcript — by design).
 *   - <oelt-hotspot> needs a sample diagram image.
 * Neither binary asset ships in the export, and we don't invent media for a
 * demo (honesty constraint). They render an honest "needs a sample asset" note
 * and keep their verbatim "View source" markup.
 */

export interface ComponentDemo {
  /** Self-contained live markup, or undefined when the demo needs an asset. */
  html?: string;
  /** When set, the demo can't run live here; explain why (no live markup). */
  pending?: string;
}

export const componentDemos: Record<string, ComponentDemo> = {
  'oelt-mcq': {
    html: `<oelt-mcq id="demo-mcq" mode="single" key="b">
  <p slot="prompt">Which standard does cmi5 build on?</p>
  <oelt-option value="a">SCORM 1.2</oelt-option>
  <oelt-option value="b">xAPI</oelt-option>
  <oelt-option value="c">AICC</oelt-option>
  <p slot="correct">Right — cmi5 is an xAPI profile.</p>
  <p slot="incorrect">Not quite — cmi5 is built on xAPI.</p>
</oelt-mcq>`,
  },

  'oelt-branching': {
    html: `<oelt-branching id="demo-branching" start="n1">
  <script type="application/json">
    {
      "nodes": {
        "n1": {
          "text": "<p>A learner shares a password with you. You…</p>",
          "choices": [
            { "label": "Use it", "to": "bad", "value": "use" },
            { "label": "Report it", "to": "good", "value": "report" }
          ]
        },
        "good": { "text": "<p>Correct — report and rotate it.</p>", "end": "passed" },
        "bad": {
          "text": "<p>That's a breach.</p>",
          "choices": [{ "label": "Back", "to": "n1", "value": "back" }]
        }
      }
    }
  </script>
</oelt-branching>`,
  },

  'oelt-media': {
    pending:
      'The live demo needs a captioned sample video, which isn’t part of the toolkit export — so it stays a static example here, not a mocked-up player. (<oelt-media> refuses to render without captions or a transcript — that’s the feature.) The canonical markup is below.',
  },

  'oelt-text-entry': {
    html: `<oelt-text-entry id="demo-text-entry" answer="Paris">
  <p slot="prompt">What is the capital of France?</p>
  <p slot="correct">Correct — Paris.</p>
  <p slot="incorrect">Not quite — it's Paris.</p>
</oelt-text-entry>`,
  },

  'oelt-quiz': {
    html: `<oelt-quiz id="demo-quiz" mastery="0.7">
  <oelt-mcq id="demo-quiz-q1" mode="single" key="b" weight="1">
    <p slot="prompt">Which standard is recommended for new content?</p>
    <oelt-option value="a">SCORM 1.2</oelt-option>
    <oelt-option value="b">cmi5</oelt-option>
  </oelt-mcq>
  <oelt-text-entry id="demo-quiz-q2" answer="cmi5" weight="2">
    <p slot="prompt">Name that standard (one word).</p>
  </oelt-text-entry>
</oelt-quiz>`,
  },

  'oelt-likert': {
    html: `<oelt-likert id="demo-likert">
  <p slot="prompt">I feel confident applying what I learned.</p>
  <oelt-option value="1">Strongly disagree</oelt-option>
  <oelt-option value="3">Neutral</oelt-option>
  <oelt-option value="5">Strongly agree</oelt-option>
</oelt-likert>`,
  },

  'oelt-ordering': {
    html: `<oelt-ordering id="demo-ordering">
  <p slot="prompt">Put the steps in order, first to last.</p>
  <oelt-item value="plan">Plan</oelt-item>
  <oelt-item value="build">Build</oelt-item>
  <oelt-item value="test">Test</oelt-item>
  <oelt-item value="ship">Ship</oelt-item>
</oelt-ordering>`,
  },

  'oelt-matching': {
    html: `<oelt-matching id="demo-matching">
  <p slot="prompt">Match each country to its capital.</p>
  <oelt-pair prompt="France" value="paris">Paris</oelt-pair>
  <oelt-pair prompt="Japan" value="tokyo">Tokyo</oelt-pair>
  <oelt-pair prompt="Egypt" value="cairo">Cairo</oelt-pair>
</oelt-matching>`,
  },

  'oelt-categorize': {
    html: `<oelt-categorize id="demo-categorize">
  <p slot="prompt">Sort each animal into its group.</p>
  <oelt-bucket value="mammals">Mammals</oelt-bucket>
  <oelt-bucket value="birds">Birds</oelt-bucket>
  <oelt-token bucket="mammals" value="dog">Dog</oelt-token>
  <oelt-token bucket="birds" value="eagle">Eagle</oelt-token>
  <oelt-token bucket="mammals" value="cat">Cat</oelt-token>
</oelt-categorize>`,
  },

  // The gallery entry that bundles the presentation family.
  'oelt-tabs': {
    html: `<oelt-tabs id="demo-tabs">
  <oelt-tab label="Overview"><p>OELTKit ships accessible interaction components your AI assistant authors as plain HTML.</p></oelt-tab>
  <oelt-tab label="Details"><p>Each is a vanilla custom element, styled entirely by your theme tokens — no framework, no build step.</p></oelt-tab>
</oelt-tabs>

<oelt-accordion single>
  <!-- \`single\` = one section open at a time -->
  <oelt-panel label="What is SCORM?"><p>A long-standing standard for packaging and tracking e-learning in an LMS.</p></oelt-panel>
  <oelt-panel label="What is cmi5?"><p>A modern xAPI profile for launching and tracking content, without SCORM's single-status limit.</p></oelt-panel>
</oelt-accordion>

<oelt-flip-cards>
  <oelt-card front="Mercury"><p>Closest planet to the Sun.</p></oelt-card>
  <oelt-card front="Venus"><p>Hottest planet.</p></oelt-card>
</oelt-flip-cards>`,
  },

  'oelt-hotspot': {
    pending:
      'The live demo needs a sample diagram image, which isn’t part of the toolkit export — so it stays a static example here rather than an invented illustration. The canonical markup is below.',
  },

  'oelt-reflection': {
    html: `<oelt-reflection id="demo-reflection" maxlength="500">
  <p slot="prompt">What is one thing you will apply from this lesson?</p>
</oelt-reflection>`,
  },
};
