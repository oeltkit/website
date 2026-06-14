---
title: <oelt-likert>
description: Rating-scale survey item — a single-select scale that always reports completed, never scored.
---

A single-select rating scale (a Likert item): a statement plus an ordered scale the learner rates. It's a **survey** interaction — there's no correct answer, so it always reports `result: "completed"` with no score and is never quiz-scored. Interaction type: `likert`.

:::note[Beta]
`beta` — implemented and tested, pending a manual NVDA/VoiceOver pass.
:::

## Markup

Explicit labels (recommended):

```html
<oelt-likert id="confidence">
  <p slot="prompt">I feel confident applying what I learned.</p>
  <oelt-option value="1">Strongly disagree</oelt-option>
  <oelt-option value="2">Disagree</oelt-option>
  <oelt-option value="3">Neutral</oelt-option>
  <oelt-option value="4">Agree</oelt-option>
  <oelt-option value="5">Strongly agree</oelt-option>
</oelt-likert>
```

Generated N-point scale with end anchors:

```html
<oelt-likert id="ease" scale="5" low-label="Very hard" high-label="Very easy">
  <p slot="prompt">How easy was this lesson?</p>
</oelt-likert>
```

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | Required. Interaction id. |
| `scale` | (generated mode) Number of points, ≥ 2 (default `5`). Ignored if `<oelt-option>`s are given. |
| `low-label` | (generated mode) Anchor for point 1. |
| `high-label` | (generated mode) Anchor for point N. |
| `submit-label` | Submit button label (default `Submit`). |
| `retry` | Allow changing the response after submit; re-emits. |

Slot: `prompt` (the statement; becomes the `<legend>`).

## Keyboard map

| Key | Action |
| --- | --- |
| `Tab` / `Shift+Tab` | Move between the scale and the submit button. |
| `↑` `↓` `←` `→` | Move and select within the scale. |
| `Enter` | Submit. |

## Screen-reader behavior

- A native radio group in a `<fieldset>`; the statement is the `<legend>`, and radios announce their position ("3 of 5") and label.
- In generated mode, the low/high anchors are folded into the first and last labels' accessible names.
- On submit, focus moves to an `aria-live="polite"` region confirming "Response recorded." There's no correct/incorrect state.

## Tracking events

Emits `oelt-interaction` on submit: `type: "likert"`, `result: "completed"`, `response` the chosen value. No score. Submitting with nothing selected shows "Select a rating first." and does not emit.
