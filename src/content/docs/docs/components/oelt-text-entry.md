---
title: <oelt-text-entry>
description: Short text or numeric free-response question with author-supplied grading.
---

A single-line free-response question. The learner types into a native `<input>`; on submit the component grades against an author-supplied answer — normalized text (with `|`-separated alternatives) or a number with absolute tolerance — and reports one result. Interaction type: `fill-in` (text) or `numeric`.

:::note[Beta]
`beta` — implemented and tested, pending a manual NVDA/VoiceOver pass.
:::

## Markup

```html
<oelt-text-entry id="capital" answer="Paris">
  <p slot="prompt">What is the capital of France?</p>
  <p slot="correct">Correct — Paris.</p>
  <p slot="incorrect">Not quite — it's Paris.</p>
</oelt-text-entry>

<!-- numeric with tolerance -->
<oelt-text-entry id="pi" mode="numeric" answer="3.14" tolerance="0.01">
  <p slot="prompt">Estimate π to two decimal places.</p>
</oelt-text-entry>

<!-- multiple accepted spellings -->
<oelt-text-entry id="color" answer="grey|gray">
  <p slot="prompt">Spell the colour (either spelling).</p>
</oelt-text-entry>
```

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | Required. Interaction id. |
| `mode` | `text` (default) or `numeric`. |
| `answer` | Accepted answer(s). Text: `|`-separated alternatives. Numeric: the target number. Required unless `manual-grade`. |
| `tolerance` | (numeric) Absolute tolerance — passed if `|input − answer| ≤ tolerance` (default `0`). |
| `case-sensitive` | (text) Match case exactly; default is case-insensitive. |
| `placeholder` | Input placeholder text. |
| `submit-label` | Submit button label (default `Check answer`). |
| `retry` | Allow re-answering; re-emits on each submit. |
| `manual-grade` | No answer — emits `result: "completed"` for open responses. |

Slots: `prompt` (becomes the input's `<label>`), `correct` / `incorrect` (feedback).

## Grading

- **Text** is normalized — trimmed, internal whitespace collapsed, lowercased unless `case-sensitive` — and compared against each alternative.
- **Numeric** is parsed float-safe; non-numbers fail. Boundary values pass symmetrically (with `answer="3.14" tolerance="0.01"`, both `3.13` and `3.15` pass).
- **Empty input** shows "Enter an answer first." and does not emit.

## Keyboard map

| Key | Action |
| --- | --- |
| `Tab` / `Shift+Tab` | Move between the input and submit button. |
| `Enter` | Submit (from the input or the button). |

## Screen-reader behavior

- The prompt is a native `<label for>` bound to the input.
- Numeric mode uses `inputmode="decimal"` for a numeric soft keyboard without the locale pitfalls of `type="number"`.
- On submit, focus moves to an `aria-live="polite"` feedback region; pass/fail is text, not color.

## Tracking events

Emits `oelt-interaction` on submit: type `fill-in` (text) or `numeric`; `result` `passed`/`failed` (or `completed` with `manual-grade`); `score` 1 or 0; `response` the raw input.
