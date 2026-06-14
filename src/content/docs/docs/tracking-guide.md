---
title: Tracking guide
description: One tracking API across SCORM 1.2, SCORM 2004, cmi5/xAPI, and standalone web — including the SCORM 1.2 collapse rule.
sidebar:
  order: 3
---

You author tracking **once**, declaratively, and the runtime projects it onto whichever target you package for. You don't write per-target code.

```js
oelt.track.score(0.85);
```

That one call becomes `cmi.core.score.raw` on SCORM 1.2, `score.scaled` on SCORM 2004, `result.score.scaled` in a cmi5 statement, or a stored number with no LMS at all.

## The runtime API

The global `oelt` is available after the page loads. Most courses never call it directly — components and the declared rules drive it — but it's there for the `manual` completion rule and bespoke interactions.

| Call | What it does |
| --- | --- |
| `oelt.track.complete()` | Mark the course complete (used by the `manual` rule). |
| `oelt.track.score(0.85)` | Report a 0–1 score. |
| `oelt.track.progress(0.4)` | Report 0–1 progress. |
| `oelt.track.interaction({ id, type, result, score?, response? })` | Report a question-level interaction. `result` ∈ `passed` \| `failed` \| `completed`; `score` is 0–1. |
| `oelt.state.get(key)` / `oelt.state.set(key, value)` | Suspend/resume key-value store (see the budget below). |
| `oelt.nav.pages`, `oelt.nav.current()`, `oelt.nav.go(i)`, `oelt.nav.next()`, `oelt.nav.prev()` | Navigation derived from the manifest. |

## Declaring tracking

Tracking is configured in the `tracking` block of `course.json`. Omit it for the zero-config default — **complete when all pages are viewed, no score** — which is impossible to misconfigure.

```json
{
  "tracking": {
    "completion": { "rule": "required-interactions-passed" },
    "score": { "rule": "weighted-interactions", "mastery": 0.8 },
    "progress": { "rule": "pages-viewed" }
  }
}
```

**Completion rules:**

- `all-pages-viewed` — complete when every page has been viewed (default).
- `pages-viewed` — requires `threshold` (0–1), e.g. view 80% of pages.
- `required-interactions-completed` — every `required: true` interaction answered.
- `required-interactions-passed` — every `required: true` interaction passed.
- `manual` — your code calls `oelt.track.complete()`.

**Score rules:**

- `none` — no score (default).
- `single-interaction` — requires `source` (an interaction id).
- `weighted-interactions` — weighted mean using each interaction's `weight`.
- `mastery` (0–1) may be set on a scoring rule to decide pass/fail.

**Progress rules:** `pages-viewed` (default) or `none`.

## The SCORM 1.2 collapse rule

:::danger[Read this before you ship to SCORM 1.2]
SCORM 1.2 has **one** status field (`cmi.core.lesson_status`) for both completion *and* success. OELTKit collapses your richer model into it with a fixed, normative rule — you don't implement it, but you should know what survives:

- **If a score rule and a `mastery` value are both defined**, the course reports **`passed` / `failed`** in `lesson_status`, decided by score ≥ mastery. A learner who finishes but scores below mastery is **`failed`**, not merely incomplete.
- **Otherwise**, the course reports **`completed` / `incomplete`**, decided by the completion rule. Any score is still written to `score.raw` but does not change the status.

SCORM 2004 and cmi5 do **not** collapse — they report completion and success on separate channels.
:::

## What each target speaks

| Concept | SCORM 1.2 | SCORM 2004 | cmi5 / xAPI | Standalone web |
| --- | --- | --- | --- | --- |
| Completion | `cmi.core.lesson_status` (collapsed — see above) | `completion_status` + `success_status` (separate) | `completed` / `passed` / `failed` statements | localStorage record |
| Score | `score.raw` = round(scaled × 100) | `score.scaled` (also `raw`/`min`/`max`) | `result.score.scaled` | number 0–1 |
| Progress | none (omitted) | `progress_measure` 0–1 | progress extension | stored number |
| Interactions | `cmi.interactions.n.*` (tight limits) | `cmi.interactions.n.*` (richer) | one statement per interaction | local event log |

Interaction reporting is independent of your completion and score rules: a declared interaction that fires is recorded wherever the target supports it — free analytics that costs you nothing.

For cmi5/xAPI, OELTKit uses the cmi5-defined verbs plus ADL verbs (`answered`, `interacted`, …); it does not mint its own. A dedicated OELT xAPI Profile is deferred to a later phase.

## State and the suspend-data budget

All persisted state goes through `oelt.state` — never call the LMS API directly, or you bypass size-guarding and break resume.

:::caution[3 KB budget, enforced]
SCORM 1.2 only guarantees 4 KB of `suspend_data`. OELTKit enforces a stricter **3 KB** ceiling (after compression) for headroom. Every component declares its maximum state size, and `oelt validate` **fails the build** if the total would exceed the budget — catching over-subscription before an LMS silently truncates state in the field.
:::

## Reporting an interaction by hand

For a one-off interaction, emit the same payload the components use; the runtime forwards it:

```html
<button onclick="oelt.track.interaction({ id: 'final-quiz', type: 'quiz', result: 'passed', score: 1 })">
  Submit
</button>
```
