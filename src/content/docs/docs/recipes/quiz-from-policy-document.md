---
title: Quiz from a policy document
description: Turn a policy or procedure doc into a scored, trackable knowledge check.
sidebar:
  badge:
    text: Draft
    variant: caution
---

Compliance and policy training often just needs a reliable check that people read and understood the document. This recipe turns a policy doc into a short scored quiz with a pass mark your LMS records.

:::caution[Draft prompt — not yet verified]
This prompt is a draft and isn't CI-tested end-to-end yet. Use it as a starting point and expect to iterate.
:::

**You attach:** the policy or procedure document (`.pdf`, `.docx`, or text).

**You paste:**

```text
Build a short knowledge check from this policy document.

- Write a brief intro page summarizing what the learner needs to know.
- Add 5–8 multiple-choice questions covering the key points, with feedback that points back
  to the relevant part of the policy.
- Set it to score, with a pass mark of 80%, and report pass/fail to my LMS.
- Keep it accessible and fix anything validation flags.

My LMS is [your LMS, or leave out for a safe default].
Give me the course file and the LMS package.
```

**You get back:** a `.oeltcourse` and a package that reports a pass/fail result against the 80% mark. On SCORM 1.2 that pass mark drives `lesson_status` via the [collapse rule](../tracking-guide/#the-scorm-12-collapse-rule).
