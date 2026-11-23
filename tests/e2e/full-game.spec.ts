import { expect, test } from '@playwright/test';
import {
  completeWholeGame,
  expectAllImagesLoaded,
  expectNoHorizontalOverflow,
} from './helpers';
import { CHAPTERS } from '../../src/data/chapters';
import { EXERCISES } from '../../src/data/exercises';
import { MAX_TOTAL_CORRECT } from '../../src/lib/scoring';

test.describe('complete game journey', () => {
  test('plays all 10 quiz challenges, reaches 100%, and persists after reload', async ({ page }) => {
    test.setTimeout(180_000);
    await page.goto('/play');

    await completeWholeGame(page);
    await page.goto('/results');

    await expect(page).toHaveURL(/\/results$/);
    await expect(
      page.getByRole('heading', { level: 1, name: /Rrugëtimi yt në gjuhën shqipe/ }),
    ).toBeVisible();
    await expect(page.getByRole('img', { name: 'Rezultati i përgjithshëm: 100 për qind' })).toBeVisible();
    await expect(page.getByText(String(MAX_TOTAL_CORRECT), { exact: true }).first()).toBeVisible();
    await expect(page.getByText(`${MAX_TOTAL_CORRECT} / ${MAX_TOTAL_CORRECT} të sakta`)).toBeVisible();
    await expect(page.getByText('Rezultat i plotë! Përgjigje të sakta në të gjitha sfidat.')).toBeVisible();
    await expect(page.getByText('Mjeshtër i gjuhës', { exact: true })).toBeVisible();
    await expect(page.getByText('10 / 10', { exact: true }).first()).toBeVisible();

    const chapterCards = page.locator('section[aria-labelledby="chapter-breakdown-heading"] article');
    await expect(chapterCards).toHaveCount(CHAPTERS.length);
    for (let index = 0; index < CHAPTERS.length; index += 1) {
      const chapter = CHAPTERS[index]!;
      const maximum = chapter.exerciseIds.reduce(
        (total, exerciseId) =>
          total + (EXERCISES.find((exercise) => exercise.id === exerciseId)?.prompts.length ?? 0),
        0,
      );
      await expect(chapterCards.nth(index)).toContainText(`${maximum} / ${maximum}`);
      await expect(chapterCards.nth(index)).toContainText('100%');
    }

    await page.getByRole('link', { name: 'Rishiko gabimet' }).click();
    await expect(page).toHaveURL(/\/review$/);
    await expect(page.getByRole('heading', { name: 'Rezultat i plotë — përgjigje të sakta në të gjitha sfidat.' })).toBeVisible();

    const stored = await page.evaluate(() =>
      JSON.parse(window.localStorage.getItem('shkronjat-tona-progress-v1') ?? 'null'),
    );
    expect(stored.completedExerciseIds).toHaveLength(EXERCISES.length);
    expect(
      Object.values(stored.exercises).every(
        (record) => (record as { completed: boolean }).completed === true,
      ),
    ).toBe(true);

    await page.reload();
    await expect(page.getByRole('heading', { name: 'Rezultat i plotë — përgjigje të sakta në të gjitha sfidat.' })).toBeVisible();

    await page.goto('/play');
    await expect(page.getByText('10 / 10 sfida', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Të gjitha sfidat u përfunduan.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Shiko rezultatin' }).first()).toBeVisible();
    await expect(page.getByTestId('roadmap-node-c3-e5')).toHaveAttribute('data-status', 'completed');

    await expectNoHorizontalOverflow(page);
    await expectAllImagesLoaded(page);
  });
});
