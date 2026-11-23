import { expect, test } from '@playwright/test';
import { allExercisesComplete, seedProgress } from './helpers';

const WIDTHS = [320, 360, 375, 390, 430, 768, 1024, 1440] as const;
const ROUTES = ['/', '/play', '/play/c1-e3', '/results'] as const;

test('every key route fits all eight target widths', async ({ page }) => {
  test.setTimeout(120_000);
  await seedProgress(page, allExercisesComplete());

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: width < 768 ? 720 : 900 });

    for (const route of ROUTES) {
      await page.goto(route);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
      }));

      expect(
        Math.max(dimensions.documentWidth, dimensions.bodyWidth),
        `${route} should fit at ${width}px`,
      ).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
    }
  }
});
