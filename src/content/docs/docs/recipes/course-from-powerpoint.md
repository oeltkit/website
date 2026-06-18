---
title: Course from a PowerPoint
description: Attach a .pptx and turn it into an accessible, trackable course in one conversation.
sidebar:
  badge:
    text: Draft
    variant: caution
---

The most common starting point: you have slides, you need a course your LMS can track. This recipe turns a `.pptx` into OELTKit pages — keeping your structure, adding a knowledge check, and making the result accessible.

:::caution[Draft prompt — not yet verified]
This prompt is a draft and isn't CI-tested end-to-end yet. Use it as a starting point and expect to iterate.
:::

**You attach:** your slide deck (`.pptx`).

**You paste:**

```text
Here's a PowerPoint deck. Build it into an online course I can upload to my LMS.

- Keep the deck's section structure as the course outline.
- Turn the content into readable pages — don't just paste slide text; write it as prose a learner reads.
- Pull any images across with meaningful alt text. Flag anything you can't describe.
- Add one multiple-choice knowledge check at the end of each section.
- Make it accessible (keyboard + screen reader) and fix anything validation flags.

My LMS is [your LMS, e.g. "Moodle" — or leave this out and use a safe default].
When it's ready, give me the course file to keep, and the package for my LMS.
```

**You get back:** a `.oeltcourse` file (your editable copy) and, on request, a packaged `.zip` for your LMS, plus a note on where to upload it.
