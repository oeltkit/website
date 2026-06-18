---
title: Translate my course
description: Attach a .oeltcourse and produce a localized version, keeping structure and tracking intact.
sidebar:
  badge:
    text: Draft
    variant: caution
---

You have a finished course and need it in another language. This recipe localizes the content — pages, prompts, feedback — while keeping the structure, interactions, and tracking exactly as they were.

:::caution[Draft prompt — not yet verified]
This prompt is a draft and isn't CI-tested end-to-end yet. Use it as a starting point and expect to iterate.
:::

**You attach:** the course file (`.oeltcourse`).

**You paste:**

```text
Translate this course into [target language, e.g. "French (France)"].

- Translate all learner-facing text: page content, question prompts, answer options, and
  correct/incorrect feedback.
- Keep the structure, ids, interactions, and tracking rules unchanged.
- Set the course language correctly so the LMS and screen readers announce it right.
- Leave anything you're unsure how to translate flagged for me to review, rather than guessing.

Give me back the translated course file. Keep the original untouched.
```

**You get back:** a localized `.oeltcourse` with the same structure and tracking, plus a list of anything it flagged for human review.

:::note[Hosted vs. bring-your-own]
Hosted OELTKit can run the localization for you; locally, the translation is done by your own AI assistant. Either way the result is the same file format — review the flagged items before you ship.
:::
