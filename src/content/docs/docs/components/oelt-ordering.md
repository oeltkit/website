---
title: <oelt-ordering>
description: Reorder items into the correct sequence — keyboard-first, with pointer drag as an enhancement.
---

Reorder a set of items into the correct sequence — process steps, a timeline, a ranking. Like all of OELTKit's drag-and-drop components, it's **keyboard-first**: a documented pick-up / move / drop model is the primary mechanism, and pointer drag is an optional enhancement that produces the same result. Interaction type: `sequencing`.

:::note[Beta]
`beta` — implemented and tested, pending a manual NVDA/VoiceOver pass.
:::

## Markup

```html
<oelt-ordering id="lifecycle">
  <p slot="prompt">Put the steps in order, first to last.</p>
  <oelt-item value="plan">Plan</oelt-item>
  <oelt-item value="build">Build</oelt-item>
  <oelt-item value="test">Test</oelt-item>
  <oelt-item value="ship">Ship</oelt-item>
</oelt-ordering>
```

The authored order of `<oelt-item>`s is the correct order; the component shuffles them on load.

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | Required. Interaction id. |
| `submit-label` | Check button label (default `Check order`). |
| `retry` | Allow re-checking after feedback; re-emits each Check. |

Slot: `prompt` (instructions; labels the list).

## Keyboard map

| Key | When | Action |
| --- | --- | --- |
| `Tab` / `Shift+Tab` | always | Move between items and controls. |
| `Space` / `Enter` | not grabbed | Pick up the focused item. |
| `Space` / `Enter` | grabbed | Drop it at the current position. |
| `↑` / `↓` | grabbed | Move it one step earlier / later. |
| `Escape` | grabbed | Cancel — return it to where it started. |

Items are real focusable `<button>`s; pointer drag does exactly the same thing.

## Screen-reader behavior

A single assertive live region announces every change: "Grabbed {item}. Position {i} of {n}. Use arrow keys to move, Space to drop, Escape to cancel," then the new position on each move, and the drop or cancel. There are no deprecated `aria-grabbed`/`aria-dropeffect` attributes, and reordering is instant under `prefers-reduced-motion`. After Check, focus moves to the feedback region.

## Tracking events

Emits `oelt-interaction` on Check: `type: "sequencing"`; `score` is the fraction of items in the correct position (0–1); `result` is `passed` only if every item is correct; `response` is the chosen order. Per-item correctness is shown in text and `::part(item correct|incorrect)`, never color alone.
