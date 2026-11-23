import { expect, test } from '@playwright/test';
import { allExercisesComplete, seedProgress } from './helpers';

test.describe('results and review', () => {
  test('guards results until all challenges are complete', async ({ page }) => {
    await page.goto('/results');
    await expect(page).toHaveURL(/\/play$/);
  });
  test('shows complete Albanian results and review', async ({ page }) => {
    await seedProgress(page, allExercisesComplete({ wrongPromptIds: ['c2-e2-p2'] }));
    await page.goto('/results');
    await expect(page.getByRole('heading', { level: 1, name: /Rrugëtimi yt në gjuhën shqipe/ })).toBeVisible();
    await expect(page.locator('section[aria-labelledby="chapter-breakdown-heading"] article')).toHaveCount(3);
    await page.getByRole('link', { name: /Rishiko gabimet/ }).click();
    await expect(page).toHaveURL(/\/review$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Rishiko gabimet' })).toBeVisible();
  });
  test('play again asks for confirmation and resets progress', async ({ page }) => {
    await seedProgress(page, allExercisesComplete());
    await page.goto('/results');
    await page.getByRole('button', { name: 'Luaj përsëri' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Nis një lojë të re' }).click();
    await expect(page).toHaveURL(/\/play$/);
  });
});
