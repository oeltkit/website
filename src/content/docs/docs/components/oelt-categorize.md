---
title: <oelt-categorize>
description: Sort items into category buckets — keyboard-first, with pointer drag as an enhancement.
---

Sort each item into its correct category bucket. Unlike matching's one-to-one pairing, a bucket can hold **many** items and several items can share a category. Like all of OELTKit's drag-and-drop components, it's **keyboard-first** (pick up, move, drop), with pointer drag as an optional enhancement. Interaction type: `matching`.

:::note[Beta]
`beta` — implemented and tested, pending a manual NVDA/VoiceOver pass.
:::

## Markup

```html
<oelt-categorize id="animals">
  <p slot="prompt">Sort each animal into its group.</p>
  <oelt-bucket value="mammals">Mammals</oelt-bucket>
  <oelt-bucket value="birds">Birds</oelt-bucket>

  <oelt-token bucket="mammals" value="dog">Dog</oelt-token>
  <oelt-token bucket="birds" value="eagle">Eagle</oelt-token>
  <oelt-token bucket="mammals" value="cat">Cat</oelt-token>
</oelt-categorize>
```

`<oelt-bucket>`s are the categories; each `<oelt-token>` names its correct `bucket`. Tokens are shuffled into a bank.

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | Required. Interaction id. |
| `submit-label` | Check button label (default `Check`). |
| `retry` | Allow re-checking after feedback. |

Slot: `prompt` (instructions).

## Keyboard map

| Key | When | Action |
| --- | --- | --- |
| `Tab` / `Shift+Tab` | always | Move between tokens and controls. |
| `Space` / `Enter` | not grabbed | Pick up the focused token. |
| `Space` / `Enter` | grabbed | Drop it in the current bucket. |
| `←` / `→` | grabbed | Move it to the previous / next bucket (or the bank). |
| `Escape` | grabbed | Cancel — return it to where it started. |

A bucket holds any number of tokens (no displacement). Tokens are real `<button>`s; pointer drag does the same thing.

## Screen-reader behavior

A single assertive live region names the position on every change — the bucket label ("Bucket: Mammals.") or "Bank." — with the same grab / move / drop / cancel announcements as the rest of the drag-and-drop family. After Check, focus moves to the feedback region.

## Tracking events

Emits `oelt-interaction` on Check: `type: "matching"`; `score` is the fraction of tokens in the correct bucket (0–1); `result` is `passed` only if all are correct; `response` is the `token=bucket` assignments. Per-token correctness is shown in text and `::part(token correct|incorrect)`, never color alone.
