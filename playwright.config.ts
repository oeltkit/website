import { defineConfig, devices } from '@playwright/test';

/**
 * Accessibility test run. Serves the production build via `astro preview`
 * (run `npm run build` first — CI does).
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4399',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // Explicit host + uncommon port: "localhost" can resolve to ::1 vs
    // 127.0.0.1 inconsistently, and 4321 is every Astro project's default.
    command: 'npm run preview -- --port 4399 --host 127.0.0.1',
    url: 'http://127.0.0.1:4399',
    reuseExistingServer: !process.env.CI,
  },
});
