---
title: <oelt-branching>
description: Branching scenario component — declarative decision points whose paths validation can prove reachable and completable.
---

A decision scenario built from a JSON node graph: each node has narrative text and a set of choices that route to other nodes. Every branch taken is recorded, and because the structure is declarative, validation can prove every path is reachable and completable. Interaction type: `sequencing`.

## Markup

Inline graph:

```html
<oelt-branching id="scenario1" start="n1">
  <script type="application/json">
    {
      "nodes": {
        "n1": {
          "text": "<p>A colleague asks for your password. You…</p>",
          "choices": [
            { "label": "Share it", "to": "bad", "value": "share" },
            { "label": "Refuse and report it", "to": "good", "value": "refuse" }
          ]
        },
        "good": { "text": "<p>Correct call.</p>", "end": "passed" },
        "bad": { "text": "<p>That exposes credentials.</p>", "choices": [{ "label": "Back", "to": "n1", "value": "back" }] }
      }
    }
  </script>
</oelt-branching>
```

A node with `end` (`passed` / `failed` / `completed`) is terminal. You can also load the graph externally: `<oelt-branching id="scenario1" src="scenarios/x.json" start="n1">`.

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | Required. Interaction id. |
| `start` | Node id to start from (default: the first node). |
| `src` | Path to an external scenario JSON (instead of the inline `<script>`). |
| `emit` | `each-choice` (default) or `end-only` — whether every branch emits or only the terminal node. |

## Keyboard map

| Key | Action |
| --- | --- |
| `Tab` / `Shift+Tab` | Move among the current node's choice buttons. |
| `Enter` / `Space` | Take the focused choice. |

Choices are native `<button>`s; no arrow-key hijacking.

## Screen-reader behavior

- On each transition, focus moves to the new node container so it's read from the top; an `aria-live="polite"` status announces the step.
- Only the current node is in the accessibility tree; previous nodes are removed, not hidden.
- Terminal state is conveyed in text, and transitions are instant under `prefers-reduced-motion`.

## Tracking events

Emits `oelt-interaction` with type `sequencing`:

- **Per choice** (when `emit="each-choice"`): `result: "completed"`, `response: "fromNode:value"`.
- **At a terminal node:** `result` is the node's `end` value (`passed` / `failed` / `completed`); `score` is 1 for `passed`, 0 for `failed`; `response` is the visited node path.
