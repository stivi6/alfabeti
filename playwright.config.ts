import { defineConfig, devices } from '@playwright/test';

const lightProjectTests = ['**/home.spec.ts', '**/roadmap.spec.ts', '**/responsive.spec.ts'];

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    timeout: 7_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      testIgnore: ['**/visual.spec.ts'],
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet-chromium',
      testMatch: lightProjectTests,
      testIgnore: ['**/visual.spec.ts'],
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'mobile-chromium',
      testMatch: lightProjectTests,
      testIgnore: ['**/visual.spec.ts'],
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'narrow-phone',
      testMatch: ['**/responsive.spec.ts', '**/viewport-matrix.spec.ts'],
      testIgnore: ['**/visual.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 720 },
        hasTouch: true,
      },
    },
    {
      name: 'visual-desktop',
      testMatch: ['**/visual.spec.ts'],
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'visual-mobile',
      testMatch: ['**/visual.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
