/**
 * Generates the default Open Graph image (1200×630 PNG) from an SVG built
 * with the site's design tokens. Text-based by design — no stock art.
 * Runs as `prebuild`; output (public/og-default.png) is gitignored.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, '..', 'public', 'og-default.png');

// Token values mirrored from src/styles/tokens.css (dark/"ink" theme).
const tokens = {
  bg: '#15130e',
  surface: '#1d1a13',
  ink: '#ece5d3',
  inkSoft: '#b4aa90',
  accent: '#5bd08f',
  line: '#3a3425',
};

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${tokens.bg}"/>
  <rect x="64" y="64" width="1072" height="502" rx="24" fill="${tokens.surface}" stroke="${tokens.line}" stroke-width="2"/>

  <!-- check mark brand glyph -->
  <rect x="128" y="128" width="96" height="96" rx="22" fill="none" stroke="${tokens.ink}" stroke-width="10"/>
  <path d="M152 178 l26 26 l46 -52" fill="none" stroke="${tokens.accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>

  <text x="252" y="196" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="bold" fill="${tokens.ink}">OELTKit</text>

  <text x="128" y="330" font-family="Helvetica, Arial, sans-serif" font-size="56" font-weight="bold" fill="${tokens.ink}">Your AI builds the course.</text>
  <text x="128" y="400" font-family="Helvetica, Arial, sans-serif" font-size="56" font-weight="bold" fill="${tokens.accent}">OELTKit makes it count.</text>

  <text x="128" y="486" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${tokens.inkSoft}">Open source · SCORM &amp; cmi5 · WCAG 2.2 AA · built for AI authoring</text>
</svg>
`;

await mkdir(path.dirname(out), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`OG image written to ${out}`);
