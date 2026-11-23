import { expect, test } from '@playwright/test';

test('the historical timeline is available on the homepage', async ({ page }) => {
  await page.goto('/');

  const timeline = page.locator('#historia');
  await expect(timeline.getByRole('heading', { name: 'Nga dëshmitë e hershme te drejtshkrimi i njësuar' })).toBeVisible();
  for (const title of [
    'Formula e Pagëzimit',
    'Meshari i Gjon Buzukut',
    'Evetari i Naum Veqilharxhit',
    'Nisma e alfabetit të Stambollit',
    'Mësonjëtorja e Korçës',
    'Kongresi i Manastirit',
    'Kongresi i Elbasanit dhe Normalja',
    'Konsulta Gjuhësore e Prishtinës',
    'Kongresi i Drejtshkrimit',
    'Zbatimi i drejtshkrimit të njësuar',
  ]) {
    await expect(timeline.getByRole('heading', { name: title })).toBeVisible();
  }
});

test('the old timeline route takes visitors to the homepage timeline', async ({ page }) => {
  await page.goto('/timeline');

  await expect(page).toHaveURL(/\/#historia$/);
  await expect(page.locator('#historia')).toBeVisible();
});

test('the homepage timeline fits a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.locator('#historia').getByRole('heading', { name: 'Kongresi i Manastirit' })).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
});
