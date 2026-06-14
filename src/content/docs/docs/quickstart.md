---
title: Quickstart
description: From install to an importable SCORM package — install, oelt new, chat with your AI assistant, oelt package.
sidebar:
  order: 1
---

The promise: install the toolkit, scaffold a course, describe what you want to your AI assistant, and package the result for your LMS.

:::note[Beta]
OELTKit is pre-v1.0 and the packages aren't on npm yet. Install from the [main repository](https://github.com/oeltkit/oeltkit) for now; the install command below is what you'll use once `@oeltkit/cli` publishes with v0.1.
:::

## 1. Install

```sh
npm install -g @oeltkit/cli
```

This gives you the `oelt` command. See the [CLI reference](../cli/) for the full command surface.

## 2. Scaffold

```sh
oelt new my-course --title "Data Privacy Essentials"
```

This creates a `course.json` manifest and a first page at `pages/p1.html`. The manifest is the source of truth — it declares your modules, pages, completion rules, and score weighting. See the [authoring guide](../authoring-guide/) for its shape.

## 3. Chat

Connect OELTKit to your assistant ([MCP setup](../mcp-setup/)) and describe the course:

> Build me a 15-minute course on GDPR basics with a scored quiz…

Your assistant writes the content layer as plain HTML and drops in [interaction components](../components/) (`<oelt-mcq>`, `<oelt-quiz>`, `<oelt-branching>`, …) where they belong. Tracking and accessibility come from the toolkit, not hand-wiring.

Validate as you go — findings are machine-readable, so the assistant fixes its own mistakes:

```sh
oelt validate my-course
```

## 4. Preview

```sh
oelt preview my-course
```

Opens the course in a local fake-LMS harness with a live tracking inspector, so you can see completion and score reporting before you ship.

## 5. Package

```sh
oelt package my-course --target scorm12
```

Import the resulting zip into your LMS. Other targets: `scorm2004`, `cmi5`, `web`. If you're unsure which your LMS supports, start with SCORM 1.2 — see [Standards](../../standards/) for how to choose.
