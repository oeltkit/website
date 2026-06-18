---
title: Update an existing course
description: Attach a .oeltcourse file and revise it in conversation — no re-authoring from scratch.
sidebar:
  badge:
    text: Draft
    variant: caution
---

A course is a file. When last year's course needs a refresh, you don't rebuild it — you attach it and describe the change. This recipe edits an existing `.oeltcourse` in place and re-validates.

:::caution[Draft prompt — not yet verified]
This prompt is a draft and isn't CI-tested end-to-end yet. Use it as a starting point and expect to iterate.
:::

**You attach:** the course file (`.oeltcourse`).

**You paste:**

```text
Here's an existing course. Make these changes and keep everything else as-is:

- [describe the change, e.g. "Update the data-retention section to the 2026 policy."]
- [e.g. "Replace the final quiz's question 3 with a new one about reporting incidents."]
- [e.g. "Add a short scenario before the quiz."]

Re-validate after the edits and fix anything that breaks.
Give me back the updated course file, and the LMS package if it's ready to re-upload.
```

**You get back:** the updated `.oeltcourse` file (same id, so it can replace the old one), revalidated, plus a fresh package on request.
