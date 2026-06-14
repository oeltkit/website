---
title: <oelt-media>
description: Accessible media wrapper — video or audio with enforced captions or transcript and a watched-threshold completion event.
---

An accessible wrapper around a native `<video>` or `<audio>` element. It enforces captions or a transcript, provides a transcript panel, and reports completion once the learner has watched a configurable fraction of the running time. Interaction type: `media`.

## Markup

```html
<oelt-media id="intro-video" threshold="0.9">
  <video controls preload="metadata" slot="media">
    <source src="media/intro.mp4" type="video/mp4" />
    <track kind="captions" src="media/intro.en.vtt" srclang="en" label="English" default />
  </video>
  <div slot="transcript">
    <p>Welcome to the course…</p>
  </div>
</oelt-media>
```

The media element goes in `slot="media"`; transcript markup goes in `slot="transcript"`.

## Attributes

| Attribute | Description |
| --- | --- |
| `id` | Required. Interaction id. |
| `threshold` | 0–1 (default `0.9`). Fraction of duration watched that counts as completed. |
| `transcript-open` | Start with the transcript panel expanded. |
| `autoplay` | Opt-in autoplay — ignored under `prefers-reduced-motion`, and always starts muted with controls. |

## The captions/transcript gate

On load the component checks for an alternative: a `<video>` needs a `<track kind="captions">` **or** a transcript slot; an `<audio>` needs a transcript slot. If neither is present it renders a visible `role="alert"` error and emits nothing — and `oelt validate` fails the build, so this never ships silently.

## Keyboard map

| Key | Action |
| --- | --- |
| `Tab` | Reach the player controls and the transcript toggle. |
| `Enter` / `Space` | Operate the focused control / toggle the transcript. |

Native media keys are provided by the browser's `controls`.

## Screen-reader behavior

- Captions are available via the native track menu; the transcript toggle has an accessible name and `aria-expanded`, and the panel is a labelled region.
- A failed gate is announced via `role="alert"`.
- No autoplay under reduced motion; no information conveyed by motion alone.

## Tracking events

Emits `oelt-interaction` once, when cumulative playback reaches `threshold`: `type: "media"`, `result: "completed"`, `response: "watched"`. There is no score. Progress is measured by furthest contiguous position, so seeking can't fake completion.
