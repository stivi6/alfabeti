import { expect, test } from '@playwright/test';
import { assertCleanAudit, auditRequests, expectAllImagesLoaded, expectNoHorizontalOverflow } from './helpers';

test.describe('home page', () => {
  test('presents the hero, features, chapters, and credits', async ({ page, baseURL }) => {
    const audit = auditRequests(page, baseURL!);
    await page.goto('/');

    await expect(page).toHaveTitle(/Shkronjat Tona/);
    await expect(
      page.getByRole('heading', { level: 1, name: /36 shkronja\./ }),
    ).toBeVisible();
    await expect(
      page.getByRole('main').getByText(/Zbulo alfabetin/),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Fillo lojën/ }).first()).toBeVisible();
    await expect(page.getByText('3', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('15', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('36', { exact: true }).first()).toBeVisible();

    await expect(page.getByRole('heading', { name: /Tri rrugë/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Bota e shkronjave/ }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Shqipja në përdorim/ }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Historia e alfabetit/ }).first()).toBeVisible();

    await expect(page.getByRole('heading', { name: /Zgjidh\. Kalo sfidat/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Gati t’i provosh shkronjat/ })).toBeVisible();
    await expect(page.getByRole('contentinfo')).toContainText('Shkronjat Tona');

    await expectAllImagesLoaded(page);
    await expectNoHorizontalOverflow(page);
    assertCleanAudit(audit);
  });

  test('primary calls to action open the roadmap', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Fillo lojën/ }).first().click();
    await expect(page).toHaveURL(/\/play$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Rrugëtimi yt nëpër shqip' })).toBeVisible();
  });

  test('“How it works” scrolls to the explanation section', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Si funksionon', exact: true }).first().click();
    await expect(page).toHaveURL(/#si-funksionon$/);
    await expect(page.getByRole('heading', { name: /Zgjidh\. Kalo sfidat/ })).toBeVisible();
  });

  test('unknown routes show a helpful 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(200);
    await expect(page.getByText('404 · Faqja nuk u gjet')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Kjo faqe humbi nga rrugëtimi.' }),
    ).toBeVisible();
    await page.getByRole('main').getByRole('link', { name: 'Kthehu te Ballina' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('skip link moves focus to the main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeFocused();
    await skipLink.press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
  });
});
