# Toolkit export snapshot (committed)

This directory is a **committed snapshot** of the OELTKit toolkit's
`docs/website-export/` (from `oeltkit/oeltkit`). The website builds from this
copy so CI — and anyone cloning just this repo — can build **without the
sibling toolkit repo present**. Nothing here is authored in this repo.

| File | Consumed by |
| --- | --- |
| `components.json` | `src/data/components.ts` → the `/components` gallery |
| `cli.json` | the CLI reference doc (`src/content/docs/docs/cli.md`) is kept in sync with this |
| `walkthrough/course.json` | `/how-it-works` step 1 (the real manifest) |
| `walkthrough/pages/*.html` | `/how-it-works` step 2 (a real content page) |
| `walkthrough/validate-ok.json`, `validate-error.json` | `/how-it-works` step 3 (real validator output) |
| `walkthrough/screenshots/harness.png` | `/how-it-works` step 4 (the fake-LMS harness) |

`SOURCE-README.md` and `walkthrough/screenshots/SOURCE-README.md` are the
upstream export's own READMEs, preserved here for provenance (renamed so they
don't collide with this file).

## Re-syncing

The **toolkit repo is the source of truth.** When it regenerates its export
(new component, CLI change, refreshed walkthrough), refresh this snapshot:

```bash
# in the toolkit repo (oeltkit/oeltkit):
npm run build && npm run website-export

# in this repo:
npm run sync:toolkit-export        # copies ../oeltkit/docs/website-export → here
# or, if the toolkit lives elsewhere:
OELTKIT_REPO=/path/to/oeltkit npm run sync:toolkit-export
```

Then review and commit the diff. **Do not hand-edit these files** — edit the
source in the toolkit repo and re-sync.

## Pending placeholder (by design)

`walkthrough/screenshots/lms-import.png` is intentionally **absent**. It must be
a screenshot of the packaged course completing in a *real* LMS (SCORM Cloud),
which can't be produced in a local toolkit run — see
`walkthrough/screenshots/SOURCE-README.md`. Until it's captured, `/how-it-works`
shows the harness screenshot and marks the real-LMS shot as coming. Per the
honesty constraint, **we do not mock one up.**
