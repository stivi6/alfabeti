import { expect, test } from '@playwright/test';
import { allExercisesComplete, expectNoHorizontalOverflow, openRoadmap, seedProgress } from './helpers';

test.describe('responsive behaviour', () => {
  test('home has no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
  test('roadmap fits the viewport', async ({ page }) => {
    await openRoadmap(page);
    await expect(page.getByTestId('chapter-1')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
  test('exercise fits the viewport', async ({ page }) => {
    await page.goto('/play/c1-e1');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
  test('results fit the viewport', async ({ page }) => {
    await seedProgress(page, allExercisesComplete());
    await page.goto('/results');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
