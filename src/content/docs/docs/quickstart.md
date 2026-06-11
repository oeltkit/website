---
title: Quickstart
description: From install to an importable SCORM package in five minutes — install, oelt new, chat with your AI assistant, oelt package.
sidebar:
  order: 1
---

:::caution[Draft]
This page is a stub. Exact commands, flags, and output are **TODO** pending the CLI and MCP specs in [oeltkit/oeltkit](https://github.com/oeltkit/oeltkit). The four-step shape below is stable; the details are not yet.
:::

The five-minute promise: install the toolkit, scaffold a course, describe what you want to your AI assistant, and package the result for your LMS.

## 1. Install

```sh
# TODO: exact install command pending the CLI package name/spec
# (oeltkit/oeltkit — CLI specification)
```

## 2. Scaffold

```sh
oelt new
```

> TODO: arguments, prompts, and the generated project layout — pending the CLI spec.

## 3. Chat

Connect OELTKit to your assistant ([MCP setup](../mcp-setup/)) and describe the course:

> Build me a 15-minute course on GDPR basics with a scored quiz…

The assistant writes the content layer; components, tracking, and validation come from the toolkit. Validation findings are machine-readable, so the assistant fixes its own mistakes.

## 4. Package

```sh
oelt package
```

> TODO: target selection flags (SCORM 1.2 / SCORM 2004 / cmi5) and output paths — pending the CLI spec.

Import the resulting zip into your LMS. If you're unsure which target your LMS supports, start with SCORM 1.2 — see [Standards](../../standards/) for how to choose.
