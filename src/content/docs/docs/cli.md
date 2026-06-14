---
title: CLI reference
description: Every oelt command — scaffold, validate, preview, package, and the .oeltcourse exchange format.
sidebar:
  order: 5
---

The `oelt` CLI scaffolds, validates, previews, and packages courses. All commands accept a course **directory** or a single-file `.oeltcourse` archive.

:::note[Beta]
OELTKit is pre-v1.0. The CLI ships as `@oeltkit/cli`; until it's published to npm, install it from the [main repository](https://github.com/oeltkit/oeltkit). Once published you'll be able to `npm install -g @oeltkit/cli`.
:::

## The workflow at a glance

```bash
oelt new my-course                       # scaffold course.json + pages/p1.html
# …edit course.json and pages/*.html…
oelt validate my-course                  # schema + a11y + tracking checks
oelt preview my-course                   # local fake-LMS harness with a live tracking panel
oelt package my-course --target scorm12  # → my-course-id-scorm12.zip
```

`oelt package` **refuses to build if `oelt validate` finds errors** — fix them first.

## `oelt new`

```bash
oelt new <dir> [--title "Course title"]
```

Scaffolds a new course: a `course.json` manifest plus `pages/p1.html`. Edit the manifest to add modules, pages, and tracking rules.

## `oelt validate`

```bash
oelt validate <dir|file.oeltcourse> [--json]
```

Checks the course against the manifest schema and the behavior contracts:

- **Schema** — `course.json` validates against the manifest schema; unknown keys are rejected (no typos).
- **Id uniqueness** — every module/page/interaction id is unique and a valid HTML id token.
- **Interaction sync** — every declared interaction id exists in the page's HTML, and the type matches the component.
- **Media** — every `<oelt-media>` has captions or a transcript.
- **Tracking reachability** — completion is reachable (a `required-interactions-*` rule has a required interaction; a `single-interaction` score names a real one).
- **Suspend budget** — declared component state plus runtime overhead stays within 3 KB.

With `--json`, each finding includes a machine-stable `code`, a terse `message`, and a plain-language **`message_human`** sentence that names pages by title — suitable for showing to an author or feeding back to an LLM so it can repair its own output.

## `oelt preview`

```bash
oelt preview <dir|file.oeltcourse> [--port N]
```

Launches the local fake-LMS harness and opens the course with a live tracking inspector that shows every SCORM/cmi5 call as it happens. Use it to eyeball the course before packaging.

## `oelt package`

```bash
oelt package <dir|file.oeltcourse> --target scorm12|scorm2004|cmi5|web [--out file.zip]
```

Generates the target manifest (`imsmanifest.xml` / `cmi5.xml`), injects the runtime adapter, and produces a self-contained importable zip (default name `<course-id>-<target>.zip`). Never hand-edit the generated manifests — they come from `course.json`.

Not sure which target your LMS wants? Start with `scorm12` — see [Standards](../../standards/).

## `oelt export` / `oelt import`

```bash
oelt export <dir> [--out file.oeltcourse]
oelt import <file.oeltcourse> <dir>
```

A `.oeltcourse` file is a ZIP containing the whole course tree (`course.json` at the root plus pages and assets). It's the exchange format between authoring tools, LLM clients, and CI pipelines, and it round-trips: `export → import → identical tree`. `validate`, `preview`, and `package` accept one directly — they extract it to a temp directory, run, and clean up. Extraction is zip-slip safe.
