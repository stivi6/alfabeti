import { expect, test } from '@playwright/test';

test.describe('mini-games routes', () => {
  test('opens the dedicated hub', async ({ page }) => {
    await page.goto('/lojerat');
    await expect(page.getByRole('heading', { level: 1, name: 'Zgjidh një lojë' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Wordle Shqip/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Lidh Shkronjat/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Gjej Fjalët/ })).toBeVisible();
  });

  test('opens Wordle and accepts one Albanian token keyboard input', async ({ page }) => {
    await page.goto('/lojerat/wordle');
    await expect(page.getByRole('heading', { level: 1, name: 'Wordle Shqip' })).toBeVisible();
    await page.getByRole('button', { name: 'SH', exact: true }).click();
    await expect(page.getByRole('button', { name: 'SH', exact: true })).toBeVisible();
  });

  test('opens connect letters and supports tap selection', async ({ page }) => {
    await page.goto('/lojerat/lidh-shkronjat');
    await expect(page.getByRole('heading', { level: 1, name: 'Në qytet' })).toBeVisible();
    await page.getByRole('button', { name: 'Pastro', exact: true }).click();
  });

  test('opens word search and shuffles a round', async ({ page }) => {
    await page.goto('/lojerat/gjej-fjalët');
    await expect(page.getByRole('heading', { level: 1, name: 'Gjej Fjalët' })).toBeVisible();
    await page.getByRole('button', { name: 'Përziej tabelën', exact: true }).click();
  });
});
