import { expect, test } from '@playwright/test';
import { buildProgress, completeExercise, openExercise, seedProgress } from './helpers';

test.describe('exercise interactions', () => {
  test('choice answers provide Albanian feedback', async ({ page }) => {
    await openExercise(page, 'c1-e1');
    await expect(page.getByRole('heading', { level: 1, name: 'Rendi i alfabetit' })).toBeVisible();
    await page.getByRole('button', { name: 'Ç', exact: true }).click();
    await page.getByRole('button', { name: 'Kontrollo përgjigjen', exact: true }).click();
    await expect(page.getByText(/Saktë! E gjete/)).toBeVisible();
  });
  test('completes an alphabet exercise and unlocks the next one', async ({ page }) => {
    await openExercise(page, 'c1-e1');
    await completeExercise(page, 'c1-e1');
    await expect(page.getByText('Sfida u përfundua', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: /Sfida tjetër/ })).toBeVisible();
  });
  test('completes a sentence-building exercise', async ({ page }) => {
    await seedProgress(page, buildProgress({ completedCount: 4 }));
    await openExercise(page, 'c1-e5');
    await completeExercise(page, 'c1-e5');
    await expect(page.getByText('Sfida u përfundua', { exact: true })).toBeVisible();
  });
  test('completes a language and history exercise', async ({ page }) => {
    await seedProgress(page, buildProgress({ completedCount: 10 }));
    await openExercise(page, 'c2-e1');
    await completeExercise(page, 'c2-e1');
    await openExercise(page, 'c3-e1');
    await completeExercise(page, 'c3-e1');
    await expect(page.getByText('Sfida u përfundua', { exact: true })).toBeVisible();
  });
});
