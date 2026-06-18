---
title: Storyboard to SCORM
description: Hand your AI assistant a Word or PDF storyboard and get a SCORM package back.
sidebar:
  badge:
    text: Draft
    variant: caution
---

You wrote a storyboard — screen-by-screen content, interactions, and feedback already planned. This recipe builds it out as designed and packages it for SCORM, rather than re-typing it into an authoring tool.

:::caution[Draft prompt — not yet verified]
This prompt is a draft and isn't CI-tested end-to-end yet. Use it as a starting point and expect to iterate.
:::

**You attach:** your storyboard (`.docx` or `.pdf`).

**You paste:**

```text
This is a course storyboard. Build the course exactly as it's specified.

- Follow the screen order and the on-screen text as written.
- Where the storyboard calls for an interaction (quiz question, scenario, drag-and-drop,
  matching), use the matching OELTKit component and wire up the feedback it specifies.
- Where it specifies scoring or a pass mark, set the tracking up to match.
- Keep it accessible and fix anything validation flags.

Package it as SCORM 1.2 (the safe default) unless I tell you my LMS needs something else.
Give me the course file to keep and the SCORM zip.
```

**You get back:** a `.oeltcourse` file and a SCORM 1.2 `.zip` ready to import.
