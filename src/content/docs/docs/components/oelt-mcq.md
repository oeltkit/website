---
title: <oelt-mcq>
description: Multiple-choice question component — scored single- or multi-answer questions that report through the tracking runtime.
---

A scored question with one correct answer (`mode="single"`, radios) or several (`mode="multiple"`, checkboxes). It progressively enhances your markup into a native `<fieldset>` and reports one result on submit — the score reaches the LMS through your declared completion/score rules, with no hand-wired plumbing. Interaction type: `choice`.

## Markup

```html
<oelt-mcq id="q1" mode="single" key="b">
  <p slot="prompt">Which statement is true?</p>
  <oelt-option value="a">OELT wires each LMS by hand.</oelt-option>
  <oelt-option value="b">OELT maps one model to four targets.</oelt-option>
  <oelt-option value="c">OELT requires a build step.</oelt-option>

  <p slot="correct">Correct — one model, four targets.</p>
  <p slot="incorrect">Not quite — review the Key idea page.</p>
</oelt-mcq>
```

The element `id` must equal the manifest interaction id. Each answer is an `<oelt-option value="…">`.

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | Required. Interaction id; matches the manifest. |
| `mode` | `single` (default, radios) or `multiple` (checkboxes). |
| `key` | The correct value(s), space-separated. Required unless `manual-grade`. |
| `shuffle` | Randomize option order on load. |
| `submit-label` | Submit button label (default `Check answer`). |
| `retry` | Allow re-answering after feedback; re-emits on each submit. |
| `manual-grade` | No key — emits `result: "completed"` for ungraded polls/surveys. |

Slots: `prompt` (becomes the `<legend>`), `correct` / `incorrect` (feedback).

## Keyboard map

| Key | Action |
| --- | --- |
| `Tab` / `Shift+Tab` | Move between the group and the submit button. |
| `↑` `↓` `←` `→` | (single) Move and select within the radio group. |
| `Space` | (multiple) Toggle the focused checkbox. |
| `Enter` | Submit. |

## Screen-reader behavior

- The `<fieldset>`/`<legend>` associates the prompt with the group; radios announce "n of m", checkboxes announce checked state.
- On submit, focus moves to an `aria-live="polite"` feedback region so the result is announced.
- Correctness is carried in text (a visually-hidden "Correct"/"Incorrect" prefix), never by color alone.

## Tracking events

Emits `oelt-interaction` on submit:

- **single:** `result` is `passed` if the chosen value equals `key`, else `failed`; `score` is 1 or 0; `response` is the chosen value.
- **multiple:** `passed` only if the selected set equals the key set exactly; `score` is the proportion correct (0–1); `response` is the selected values.
- **manual-grade:** `result: "completed"`, no score.
