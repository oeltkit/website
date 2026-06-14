---
title: Component reference
description: One page per OELTKit interaction component — markup, attributes, keyboard map, screen-reader behavior, and tracking events.
---

OELTKit's interaction components are plain custom elements (`<oelt-*>`) — no framework, no build step. Drop one into a page's HTML and it auto-wires to the tracking runtime; you write no tracking code in the markup.

Every component page documents the same five things:

1. **Markup** — the exact element an LLM writes.
2. **Attributes** — the configuration surface.
3. **Keyboard map** — how it's driven without a mouse.
4. **Screen-reader behavior** — what's announced, and when.
5. **Tracking events** — what it reports through the runtime.

## The shared contract

Every component emits a single `oelt-interaction` event that the runtime forwards to `oelt.track.interaction(...)`; you never call the LMS API yourself. The payload is:

```js
{ id, type, result, score?, response? }
```

`id` equals the element id (and the manifest interaction id); `result` ∈ `passed` | `failed` | `completed`; `score` is 0–1 where applicable. Components emit their own result and never aggregate — except `<oelt-quiz>`, which rolls its children into one weighted score.

All components are themed through `--oelt-*` design tokens and named `::part()`s, persist state through `oelt.state` (within the shared 3 KB suspend budget), prefer native elements over ARIA, are fully keyboard-operable, and respect `prefers-reduced-motion`.

## The launch set

| Component | Type | What it does |
| --- | --- | --- |
| [`<oelt-mcq>`](oelt-mcq/) | `choice` | Single- or multiple-answer question |
| [`<oelt-branching>`](oelt-branching/) | `sequencing` | Decision scenario from a JSON node graph |
| [`<oelt-media>`](oelt-media/) | `media` | Accessible video/audio with enforced captions or transcript |
| [`<oelt-text-entry>`](oelt-text-entry/) | `fill-in` / `numeric` | Short text or numeric free response |
| [`<oelt-quiz>`](oelt-quiz/) | `performance` | Container that aggregates child questions into one weighted score |
| [`<oelt-likert>`](oelt-likert/) | `likert` | Rating scale for surveys (never scored) |
| [`<oelt-ordering>`](oelt-ordering/) | `sequencing` | Reorder items into the correct sequence |
| [`<oelt-matching>`](oelt-matching/) | `matching` | Match values to prompts (one per target) |
| [`<oelt-categorize>`](oelt-categorize/) | `matching` | Sort items into category buckets (many per bucket) |

:::note[Beta]
These pages are synced from the frozen component specs in [oeltkit/oeltkit](https://github.com/oeltkit/oeltkit). The components are implemented and tested in the toolkit; `@oeltkit/components` publishes with v0.1. Components in `beta` are pending a manual NVDA/VoiceOver pass before they're marked `stable`.
:::
