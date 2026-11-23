import { expect, test } from '@playwright/test';
import {
  completeWholeGame,
  expectAllImagesLoaded,
  expectNoHorizontalOverflow,
} from './helpers';

test.describe('complete game journey', () => {
  test('plays all 15 challenges, reaches 100%, and persists after reload', async ({ page }) => {
    test.setTimeout(180_000);
    await page.goto('/play');

    await completeWholeGame(page);
    await page.goto('/results');

    await expect(page).toHaveURL(/\/results$/);
    await expect(
      page.getByRole('heading', { level: 1, name: /Rrugëtimi yt në gjuhën shqipe/ }),
    ).toBeVisible();
    await expect(page.getByRole('img', { name: 'Overall score: 100 percent' })).toBeVisible();
    await expect(page.getByText('45', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('45 correct')).toBeVisible();
    await expect(page.getByText('Perfect score! You answered every challenge correctly.')).toBeVisible();
    await expect(page.getByText('Sprachprofi', { exact: true })).toBeVisible();
    await expect(page.getByText('15 / 15', { exact: true }).first()).toBeVisible();

    const chapterCards = page.locator('section[aria-labelledby="chapter-breakdown-heading"] article');
    await expect(chapterCards).toHaveCount(3);
    for (let index = 0; index < 3; index += 1) {
      await expect(chapterCards.nth(index)).toContainText('15 / 15');
      await expect(chapterCards.nth(index)).toContainText('100%');
    }

    await page.getByRole('link', { name: 'Review Mistakes' }).click();
    await expect(page).toHaveURL(/\/review$/);
    await expect(
      page.getByRole('heading', { name: 'Perfect score — you answered every challenge correctly.' }),
    ).toBeVisible();

    const stored = await page.evaluate(() =>
      JSON.parse(window.localStorage.getItem('shkronjat-tona-progress-v1') ?? 'null'),
    );
    expect(stored.completedExerciseIds).toHaveLength(15);
    expect(
      Object.values(stored.exercises).every(
        (record) => (record as { completed: boolean }).completed === true,
      ),
    ).toBe(true);

    await page.reload();
    await expect(
      page.getByRole('heading', { name: 'Perfect score — you answered every challenge correctly.' }),
    ).toBeVisible();

    await page.goto('/play');
    await expect(page.getByText('15 / 15', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Every challenge is complete.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'View your result' })).toBeVisible();
    await expect(page.getByTestId('roadmap-node-c3-e5')).toHaveAttribute(
      'data-status',
      'completed',
    );

    await expectNoHorizontalOverflow(page);
    await expectAllImagesLoaded(page);
  });
});
