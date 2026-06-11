---
title: Tracking guide
description: One tracking API across SCORM 1.2, SCORM 2004, cmi5/xAPI, and standalone web — including the SCORM 1.2 collapse rule.
sidebar:
  order: 3
---

:::caution[Draft]
This page is a stub. The full `oelt.track` API surface and the per-standard mapping tables are **TODO** pending the tracking spec in [oeltkit/oeltkit](https://github.com/oeltkit/oeltkit).
:::

One call, every dialect:

```js
oelt.track.score(0.85);
```

works in SCORM 1.2, SCORM 2004, cmi5, or with no LMS at all. You declare completion rules in the manifest; the runtime translates to whatever the packaging target speaks.

## The SCORM 1.2 collapse rule

:::danger[Read this before you ship to SCORM 1.2]
SCORM 1.2 has a far smaller data model than what your course can express — richer status and score detail must **collapse** into it, and you should know what survives the collapse before promising reports to stakeholders.

**TODO:** the exact collapse rule (what maps to `cmi.core.lesson_status` / `cmi.core.score.*`, and what is dropped) is pending the tracking spec in the main repo. This callout stays at the top of this page — prominently — once written.
:::

## Targets

| Target | Status model | Notes |
| --- | --- | --- |
| SCORM 1.2 | Single lesson status | Subject to the collapse rule above. TODO: mapping table. |
| SCORM 2004 | Completion + success, separately | TODO: mapping table. |
| cmi5 / xAPI | Statements to an LRS | TODO: statement catalogue. |
| Standalone web | Local / no-op | Safe without an LMS. TODO: local logging details. |

## API reference

> TODO: full `oelt.track` API (methods, arguments, timing guarantees) — pending the runtime spec.
