import { expect, test } from '@playwright/test';
import { assertCleanAudit, auditRequests, expectAllImagesLoaded, expectNoHorizontalOverflow } from './helpers';

test.describe('home page', () => {
  test('presents the hero, two quizzes, history timeline, and footer', async ({ page, baseURL }) => {
    const audit = auditRequests(page, baseURL!);
    await page.goto('/');

    await expect(page).toHaveTitle(/Shkronjat Tona/);
    await expect(page.getByRole('heading', { level: 1, name: /36 shkronja\./ })).toBeVisible();
    await expect(page.getByText(/Eksploro kuizet dhe provo tri lojërat/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Luaj me fjalët' })).toBeVisible();
    await expect(page.getByText('2', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('3', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('36', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dy kuize. Tri lojëra. Një festë e gjuhës.' })).toBeVisible();
    await expect(page.getByRole('link', { name: '1: Shqipja në përdorim' })).toBeVisible();
    await expect(page.getByRole('link', { name: '2: Historia e alfabetit' })).toBeVisible();

    await expect(page.getByRole('heading', { name: /Zgjidh\. Kalo sfidat/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Gati t’i provosh shkronjat/ })).toBeVisible();
    await expect(page.getByRole('region', { name: /Nga dëshmitë e hershme/ })).toContainText('Kongresi i Manastirit');
    await expect(page.getByRole('contentinfo')).toContainText('Shkronjat Tona');

    await expectAllImagesLoaded(page);
    await expectNoHorizontalOverflow(page);
    assertCleanAudit(audit);
  });

  test('the mini-game call to action opens the game hub', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Luaj me fjalët' }).click();
    await expect(page).toHaveURL(/\/lojerat$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Zgjidh një lojë' })).toBeVisible();
  });

  test('the final call to action opens the quiz roadmap', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Nis sfidën' }).click();
    await expect(page).toHaveURL(/\/play$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Rrugëtimi yt nëpër shqip' })).toBeVisible();
  });

  test('“How it works” scrolls to the explanation section', async ({ page }) => {
    await page.goto('/');
    const mobileMenu = page.getByRole('button', { name: 'Hap menynë' });
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click();
      await page.getByRole('navigation', { name: 'Navigimi në celular' }).getByRole('link', { name: 'Si funksionon' }).click();
    } else {
      await page.getByRole('navigation', { name: 'Navigimi kryesor' }).getByRole('link', { name: 'Si funksionon' }).click();
    }
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
    const skipLink = page.getByRole('link', { name: 'Kalo te përmbajtja' });
    await expect(skipLink).toBeFocused();
    await skipLink.press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
  });
});
