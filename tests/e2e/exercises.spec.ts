import { expect, test } from '@playwright/test';
import { buildProgress, completeExercise, openExercise, seedProgress } from './helpers';

test.describe('exercise interactions', () => {
  test('language quiz answers provide Albanian feedback', async ({ page }) => {
    await openExercise(page, 'c2-e1');
    await expect(page.getByRole('heading', { level: 1, name: 'Shkruaje saktë' })).toBeVisible();
    await page.getByRole('button', { name: 'shtëpi', exact: true }).click();
    await page.getByRole('button', { name: 'Kontrollo përgjigjen', exact: true }).click();
    await expect(page.getByText('Saktë! E gjete.', { exact: true })).toBeVisible();
  });
  test('completes a language exercise and unlocks the next one', async ({ page }) => {
    await openExercise(page, 'c2-e1');
    await completeExercise(page, 'c2-e1');
    await expect(page.getByText('Sfida u përfundua', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sfida tjetër' })).toHaveAttribute('href', '/play/c2-e2');
  });
  test('completes the history quiz matching challenge after the language quiz', async ({ page }) => {
    await seedProgress(page, buildProgress({ completedCount: 5 }));
    await openExercise(page, 'c3-e1');
    await completeExercise(page, 'c3-e1');
    await expect(page.getByText('Sfida u përfundua', { exact: true })).toBeVisible();
  });
  test('allows completed language and history challenges to be replayed', async ({ page }) => {
    await seedProgress(page, buildProgress({ completedCount: 10 }));
    await openExercise(page, 'c2-e1');
    await completeExercise(page, 'c2-e1');
    await openExercise(page, 'c3-e1');
    await completeExercise(page, 'c3-e1');
    await expect(page.getByText('Sfida u përfundua', { exact: true })).toBeVisible();
  });
});
