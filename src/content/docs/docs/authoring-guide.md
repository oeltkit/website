---
title: Authoring guide
description: How the free-form content layer, the course manifest, and OELTKit's interaction components fit together when you author with an AI assistant.
sidebar:
  order: 2
---

The contract: your AI assistant writes **free-form HTML** — any layout, any style, any narrative structure. OELTKit owns the parts that must be correct: the manifest, the interaction components, tracking, and packaging. Write bespoke HTML freely; only the chrome is standardized.

## The content layer

Each page (`src`) is a free HTML fragment — just the content, no `<html>`/`<body>` wrapper. Use any HTML, CSS, SVG, or JS. Keep one `<h1>` per page and a logical heading order. Where an interaction belongs, use an OELTKit element — see the [component reference](../components/) for the full set.

## The manifest

`course.json` is the single source of truth: a structured shell wrapping the free-HTML body. Pages are HTML files referenced by `src`; a page MAY declare its tracked `interactions` so tracking is machine-checkable without parsing HTML.

```json
{
  "oelt": "0.1",
  "id": "com.example.data-privacy",
  "title": "Data Privacy Essentials",
  "lang": "en",
  "targets": ["scorm12", "scorm2004", "cmi5", "web"],
  "theme": "./theme/tokens.css",
  "tracking": {
    "completion": { "rule": "required-interactions-passed" },
    "score": { "rule": "weighted-interactions", "mastery": 0.8 },
    "progress": { "rule": "pages-viewed" }
  },
  "structure": [
    {
      "id": "m1",
      "title": "Foundations",
      "pages": [
        { "id": "intro", "title": "Why privacy matters", "src": "pages/intro.html" },
        {
          "id": "quiz",
          "title": "Final quiz",
          "src": "pages/quiz.html",
          "interactions": [{ "id": "final-quiz", "type": "quiz", "weight": 1, "required": true }]
        }
      ]
    }
  ]
}
```

Rules that matter:

- **`id`** is reverse-DNS and lowercase (e.g. `com.example.course-name`). Every module, page, and interaction id must be unique across the course and a valid HTML id token (`^[A-Za-z][A-Za-z0-9_-]*$`).
- **`lang`** is BCP-47 and required — it drives the document language for accessibility.
- **`targets`** is any non-empty subset of `scorm12`, `scorm2004`, `cmi5`, `web`.
- **`tracking`** is optional. Omit it for the zero-config default (complete when all pages are viewed, no score). See the [tracking guide](../tracking-guide/) for the rule vocabulary.
- Each declared interaction's `id` MUST match the `id` of an element on that page.
- **Unknown keys are rejected** — no silent typos.

## Components and bespoke interactions

Drop an OELTKit component where you need a tracked, accessible interaction — it auto-wires to the runtime, so you write no tracking code in the markup:

```html
<section>
  <h1>Check your understanding</h1>
  <oelt-mcq id="final-quiz" mode="single" key="b">
    <p slot="prompt">Which standard is recommended for new content?</p>
    <oelt-option value="a">SCORM 1.2 only</oelt-option>
    <oelt-option value="b">cmi5</oelt-option>
  </oelt-mcq>
</section>
```

For a one-off interaction that no component covers, emit the same event the components do and the runtime forwards it:

```html
<button onclick="oelt.track.interaction({ id: 'final-quiz', type: 'quiz', result: 'passed', score: 1 })">
  Submit
</button>
```

## Validate while you author

Run validation early and often — the findings are designed for an assistant to read and fix:

```sh
oelt validate my-course --json
```

Each finding carries a machine-stable `code` and a plain-language `message_human` sentence naming the page by title. Fix, re-validate, repeat until clean; then `oelt package`. See the [CLI reference](../cli/) for everything the validator checks.

## Accessibility is enforced

- Prefer native elements (`<button>`, `<input>`, `<fieldset>`/`<legend>`); avoid hand-rolled ARIA.
- Every page needs a logical heading order starting at `<h1>`.
- Media needs captions or a transcript (validator-enforced).
- Don't convey meaning by color alone; ensure keyboard operability and visible focus.

Components are accessible by construction. Your bespoke content is your responsibility — `oelt validate` and the components help, but follow these rules.
