---
title: <oelt-quiz>
description: Question container that aggregates child questions into a single weighted score with pooling and randomization.
---

A container for question components that aggregates their results into a single weighted score and reports **one** interaction. It's the only component that aggregates — child questions still report their own interactions too. Interaction type: `performance`.

:::note[Beta]
`beta` — implemented and tested, pending a manual NVDA/VoiceOver pass.
:::

## Markup

```html
<oelt-quiz id="final" mastery="0.7">
  <p>Answer all questions, then your score is reported.</p>

  <oelt-mcq id="q1" mode="single" key="b" weight="1">
    <p slot="prompt">Which standard is recommended for new content?</p>
    <oelt-option value="a">SCORM 1.2</oelt-option>
    <oelt-option value="b">cmi5</oelt-option>
  </oelt-mcq>

  <oelt-text-entry id="q2" answer="cmi5" weight="2">
    <p slot="prompt">Name that standard (one word).</p>
  </oelt-text-entry>
</oelt-quiz>
```

Children are known question types (today `<oelt-mcq>` and `<oelt-text-entry>`), each with an `id` and an optional `weight` (default `1`).

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | Required. Interaction id. |
| `mastery` | 0–1 pass threshold. Set ⇒ result is `passed`/`failed` by score ≥ mastery; absent ⇒ `completed`. |
| `pool` | Show a random N of the available questions (absent ⇒ all). |
| `shuffle` | Randomize question order on load. |

## Scoring

- Each question contributes its most recent `score` (0–1).
- The aggregate is `Σ(weightᵢ × scoreᵢ) / Σ(weightᵢ)` over the active (pooled-in) questions.
- With `mastery`, the result is `passed`/`failed`; without it, `completed`.

A `single-interaction` (source: the quiz id) or `weighted-interactions` score rule in the manifest consumes this aggregate. See the [tracking guide](../../tracking-guide/).

## Keyboard map

No custom key handling — each child question keeps its native keyboard model, and `Tab` order follows the DOM (reordered by `shuffle`/`pool`).

## Screen-reader behavior

- A `role="status"` region announces progress ("Answered 1 of 2 questions") and the final outcome ("Quiz complete. Score 75%.").
- Pooled-out questions get the native `hidden` attribute, so assistive tech never reaches them.
- The quiz adds no roles to its questions; native semantics are untouched.

## Tracking events

Emits `oelt-interaction` once every active question has reported: `type: "performance"`, with the aggregated `result` and `score`. If a question allows `retry` and re-answers, the quiz updates and re-emits (latest answer wins).
