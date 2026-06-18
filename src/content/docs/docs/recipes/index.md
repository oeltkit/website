---
title: Recipes
description: Copy-paste prompts that take a real source file — a PowerPoint, a storyboard, a policy doc — to a ready-to-ship course, in one conversation with your AI assistant.
sidebar:
  order: 6
  badge:
    text: Draft
    variant: caution
---

A **recipe** is the shortest path from something you already have to a course your LMS can import. Each one is a single copy-paste prompt plus a single attachment — no terminal, no JSON, no file paths. You paste the prompt into your AI assistant (with OELTKit connected), attach the file, and let the conversation do the rest: it scaffolds the course, fixes its own validation findings, and hands you a `.oeltcourse` file (and, when you ask, the LMS package).

:::caution[Draft — these prompts aren't verified yet]
These recipe prompts are **drafts**. They aren't yet tested end-to-end in CI, so treat them as starting points, not guarantees. The plan is for each recipe to become an executable doc — run as part of CI so a broken recipe fails the build — and to ship as an installable skill. Until then: try them, expect to iterate, and don't rely on them for production work.
:::

## How a recipe runs

The conversation is the interface. You don't pick "SCORM 1.2 or 2004?" — you say which LMS you use (or nothing, and get a safe default). Validation findings come back as plain-language fix offers, not error codes. Mastery thresholds, cmi5, and theming exist when you ask for them, never in the default flow.

Under the hood every recipe walks the same path:

1. **Start** — scaffold a course with sensible defaults (targets SCORM 1.2 + web, default theme, sensible tracking).
2. **Build** — turn your source material into pages and interactions.
3. **Check** — validate; the assistant repairs anything the validator flags.
4. **Ship** — export a `.oeltcourse` file you keep, and package a `.zip` for your LMS when you're ready.

## The launch set

- [Course from a PowerPoint](course-from-powerpoint/) — the #1 real-world entry point.
- [Storyboard to SCORM](storyboard-to-scorm/) — a Word or PDF storyboard becomes a course.
- [Design prototype to course](design-prototype-to-course/) — a Claude/HTML prototype, made trackable.
- [Update an existing course](update-existing-course/) — attach a `.oeltcourse` and revise it.
- [Translate my course](translate-my-course/) — attach a `.oeltcourse` and localize it.
- [Quiz from a policy document](quiz-from-policy-document/) — turn a policy into a scored check.

:::note[Per-LMS upload guides are coming]
"Where does the zip go?" is a real wall. Step-by-step upload guides (with screenshots) for Moodle, Cornerstone, Docebo, TalentLMS, and SCORM Cloud land alongside these recipes — they're not written yet.
:::
