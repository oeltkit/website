---
title: MCP setup per client
description: Connect the OELTKit MCP server to Claude Desktop, Claude Code, or any stdio host so your assistant can scaffold, validate, and package courses.
sidebar:
  order: 4
---

The OELTKit MCP server (`@oeltkit/mcp`) exposes the toolkit as tools, so you author conversationally — no shell, no copy-pasting CLI output into chat. Tools operate on **course names** in a managed directory (default `~/Documents/OELTKit Courses/`), never raw file paths.

:::note[Beta]
OELTKit is pre-v1.0. Build the MCP server from the [main repository](https://github.com/oeltkit/oeltkit) for now; the per-client steps below reflect the current packaging.
:::

## The tools

`scaffold_course`, `get_course`, `update_structure`, `add_page`, `update_page`, `list_components`, `get_component_doc`, `validate`, `preview`, `package_course`, `export_course` / `import_course`, `set_theme`.

A good authoring loop:

1. `scaffold_course` (name + title + targets).
2. `list_components` → `get_component_doc` for any component **before** writing it into a page — the doc has the canonical markup, so don't guess attributes.
3. `add_page` / `update_page` to build the content.
4. `validate` — read each finding's `message_human`; it tells you exactly what to fix.
5. Fix and re-`validate` until clean.
6. `preview` to eyeball it, then `package_course` for the LMS (or `export_course` for a `.oeltcourse`).

## Claude Desktop

Build the desktop bundle and install it:

```sh
npm run build:mcpb -w @oeltkit/mcp
```

This produces `packages/mcp/dist/oelt-mcp.mcpb`. Open it in **Settings → Extensions → Install**. The bundle is self-contained (specs, schema, runtime, and harness are all included) and works with no repo checkout. You can set a custom courses folder during install.

## Claude Code

```sh
npm run build -w @oeltkit/mcp
claude mcp add oelt -- node /abs/path/packages/mcp/dist/esm/index.js
```

## Any stdio host

Run the server with:

```sh
node <path>/dist/esm/index.js
```

Set the `OELT_COURSES_DIR` environment variable to relocate the managed courses folder.
