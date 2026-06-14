import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * axe-core must be clean on every page — this is a merge gate, not a smoke
 * test. Add new routes here when adding pages (the sitemap check below
 * catches forgetting to).
 */
const ROUTES = [
  '/',
  '/how-it-works/',
  '/components/',
  '/standards/',
  '/examples/',
  '/community/',
  '/blog/',
  '/404.html',
  '/docs/',
  '/docs/quickstart/',
  '/docs/authoring-guide/',
  '/docs/tracking-guide/',
  '/docs/components/',
  '/docs/components/oelt-mcq/',
  '/docs/components/oelt-branching/',
  '/docs/components/oelt-media/',
  '/docs/components/oelt-text-entry/',
  '/docs/components/oelt-quiz/',
  '/docs/components/oelt-likert/',
  '/docs/components/oelt-ordering/',
  '/docs/components/oelt-matching/',
  '/docs/components/oelt-categorize/',
  '/docs/mcp-setup/',
  '/docs/cli/',
];

for (const route of ROUTES) {
  for (const theme of ['light', 'dark'] as const) {
    test(`axe clean: ${route} (${theme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.goto(route);
      // Let entrance animations settle so axe scans the resting state.
      await page.evaluate(() =>
        Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {})))
      );
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      expect(
        results.violations,
        results.violations
          .map((v) => `${v.id}: ${v.help} → ${v.nodes.map((n) => n.target).join(', ')}`)
          .join('\n')
      ).toEqual([]);
    });
  }
}

test('every page in the sitemap is covered by the axe matrix', async ({ request }) => {
  const res = await request.get('/sitemap-0.xml');
  expect(res.ok()).toBeTruthy();
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, u]) => new URL(u).pathname);
  const covered = new Set(ROUTES);
  const missing = urls.filter((p) => !covered.has(p));
  expect(missing, `Add these routes to tests/a11y.spec.ts: ${missing.join(', ')}`).toEqual([]);
});

test('skip link is the first focusable element and works', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('manual theme toggle switches and persists the theme', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('[data-theme-toggle]');
  await expect(toggle).toBeVisible();
  const before = await page.evaluate(() => document.documentElement.dataset.theme);
  await toggle.click();
  const after = await page.evaluate(() => document.documentElement.dataset.theme);
  expect(after).not.toBe(before);
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe(after);
});
