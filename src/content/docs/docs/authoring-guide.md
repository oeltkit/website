---
title: Authoring guide
description: How the free-form content layer, the course manifest, and OELTKit's interaction components fit together when you author with an AI assistant.
sidebar:
  order: 2
---

:::caution[Draft]
This page is a stub. The manifest schema and component attribute details are **TODO** pending the specs in [oeltkit/oeltkit](https://github.com/oeltkit/oeltkit).
:::

The contract: your AI assistant writes free-form HTML — any layout, any style, any narrative structure. OELTKit owns the parts that must be correct: the manifest, the interaction components, tracking, and packaging.

## The content layer

Course pages are plain HTML. No framework, no build step. Where an interaction belongs, the page uses an OELTKit element (for example `<oelt-mcq>` or `<oelt-branching>`) — see the [component reference](../components/).

> TODO: a complete annotated example page — pending the component specs.

## The manifest

`course.json` declares the course: title, page order, completion rules, score weighting. Completion is *declared*, not hand-wired in script.

> TODO: the manifest schema (Option C shape) — pending the manifest spec in the main repo.

## Validation while you author

Run validation early and often; findings are designed for the assistant to read and fix.

> TODO: validation workflow and finding format — pending the validation spec.
