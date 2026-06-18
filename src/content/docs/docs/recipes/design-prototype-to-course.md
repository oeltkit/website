---
title: Design prototype to course
description: Take an HTML or Claude-designed prototype and make it an accessible, trackable course.
sidebar:
  badge:
    text: Draft
    variant: caution
---

You (or your AI assistant) built a beautiful interactive prototype — a one-off HTML experience. It looks great and doesn't track, isn't packaged, and may not be accessible. This recipe keeps the creative layer and adds the plumbing underneath.

:::caution[Draft prompt — not yet verified]
This prompt is a draft and isn't CI-tested end-to-end yet. Use it as a starting point and expect to iterate.
:::

**You attach:** your prototype (an HTML file, or a `.oeltcourse` / folder if you have one).

**You paste:**

```text
Here's a course prototype. Keep its look and feel, but make it real:

- Preserve the layout and content — this is the bespoke part, don't flatten it.
- Replace hand-built quiz/scenario widgets with OELTKit interaction components so they're
  accessible and report through tracking.
- Set up completion and scoring so my LMS gets a result.
- Run accessibility and tracking validation and fix what it finds.

My LMS is [your LMS, or leave out for a safe default].
Give me the course file and the LMS package.
```

**You get back:** a `.oeltcourse` file that looks like your prototype but tracks and packages, plus the LMS `.zip`.
