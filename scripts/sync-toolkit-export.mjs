#!/usr/bin/env node
/**
 * Re-sync the committed toolkit export snapshot.
 *
 * The website builds from a *committed* copy of the toolkit's
 * `docs/website-export/` so CI (and forks) can build without the sibling
 * `oeltkit/oeltkit` repo checked out next to this one. This script refreshes
 * that snapshot from the sibling repo when the toolkit regenerates its export.
 *
 *   npm run sync:toolkit-export                 # default sibling path ../oeltkit
 *   OELTKIT_REPO=/path/to/oeltkit npm run sync:toolkit-export
 *
 * The toolkit side is the source of truth: regenerate there first
 * (`npm run website-export` in the toolkit repo), then run this to copy the
 * result in and commit the diff. Do NOT hand-edit files under
 * src/data/toolkit-export/ — they are a snapshot, not authored here.
 */
import { cp, mkdir, rm, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');

const toolkitRepo = process.env.OELTKIT_REPO
  ? resolve(process.env.OELTKIT_REPO)
  : resolve(repoRoot, '..', 'oeltkit');
const src = join(toolkitRepo, 'docs', 'website-export');
const dest = join(repoRoot, 'src', 'data', 'toolkit-export');

try {
  await access(src);
} catch {
  console.error(
    `Toolkit export not found at:\n  ${src}\n\n` +
      `Check out oeltkit/oeltkit next to this repo (or set OELTKIT_REPO), ` +
      `run \`npm run website-export\` there, then re-run this.`
  );
  process.exit(1);
}

// The two SOURCE-README.md files are renamed copies of the export's own
// READMEs; preserve them across the wipe-and-copy.
await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });

// Generated/derived JSON + the authored walkthrough source.
for (const rel of [
  'components.json',
  'cli.json',
  'walkthrough/course.json',
  'walkthrough/validate-ok.json',
  'walkthrough/validate-error.json',
  'walkthrough/pages/intro.html',
  'walkthrough/pages/check.html',
  'walkthrough/screenshots/harness.png',
]) {
  const from = join(src, rel);
  const to = join(dest, rel);
  await mkdir(dirname(to), { recursive: true });
  await cp(from, to);
}

// Keep the upstream READMEs as SOURCE-README.md so the provenance travels with
// the snapshot without colliding with this repo's own README conventions.
await cp(join(src, 'README.md'), join(dest, 'SOURCE-README.md'));
await cp(
  join(src, 'walkthrough', 'screenshots', 'README.md'),
  join(dest, 'walkthrough', 'screenshots', 'SOURCE-README.md')
);

console.log(`Synced toolkit export:\n  from ${src}\n  to   ${dest}`);
console.log('Review the diff and commit it.');
