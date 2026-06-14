---
title: <oelt-matching>
description: Match each value to its correct prompt — keyboard-first, with pointer drag as an enhancement.
---

Match each value to its correct prompt — country to capital, term to definition. One value per target. Like all of OELTKit's drag-and-drop components, it's **keyboard-first** (pick up, move, drop), with pointer drag as an optional enhancement. Interaction type: `matching`.

:::note[Beta]
`beta` — implemented and tested, pending a manual NVDA/VoiceOver pass.
:::

## Markup

```html
<oelt-matching id="capitals">
  <p slot="prompt">Match each country to its capital.</p>
  <oelt-pair prompt="France" value="paris">Paris</oelt-pair>
  <oelt-pair prompt="Japan" value="tokyo">Tokyo</oelt-pair>
  <oelt-pair prompt="Egypt" value="cairo">Cairo</oelt-pair>
</oelt-matching>
```

Each `<oelt-pair>` declares its fixed `prompt` (the left side) and the `value` that belongs to it; values are shuffled into a bank.

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | Required. Interaction id. |
| `submit-label` | Check button label (default `Check matches`). |
| `retry` | Allow re-checking after feedback. |

Slot: `prompt` (instructions).

## Keyboard map

| Key | When | Action |
| --- | --- | --- |
| `Tab` / `Shift+Tab` | always | Move between values and controls. |
| `Space` / `Enter` | not grabbed | Pick up the focused value. |
| `Space` / `Enter` | grabbed | Drop it on the current target. |
| `←` / `→` | grabbed | Move it to the previous / next target (or the bank). |
| `Escape` | grabbed | Cancel — return it to where it started. |

Dropping onto an occupied target returns the previous value to the bank (one value per target). Values are real `<button>`s; pointer drag does the same thing.

## Screen-reader behavior

A single assertive live region names the position on every change — the target's prompt ("Target: Japan.") or "Bank." — with the same grab / move / drop / cancel announcements as the rest of the drag-and-drop family. After Check, focus moves to the feedback region.

## Tracking events

Emits `oelt-interaction` on Check: `type: "matching"`; `score` is the fraction of targets holding the correct value (0–1); `result` is `passed` only if all are correct; `response` is the `prompt=value` assignments. Per-target correctness is shown in text and `::part(target correct|incorrect)`, never color alone.
