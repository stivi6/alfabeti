import { expect, test, type Page } from '@playwright/test';
import { STORAGE_KEY } from '../../src/lib/storage';
import type { GameProgress } from '../../src/lib/types';
import { allExercisesComplete, buildProgress } from './helpers';

interface Screen {
  name: string;
  path: string;
  progress?: GameProgress;
}

const SCREENS: Screen[] = [
  { name: 'home', path: '/' },
  { name: 'roadmap', path: '/play' },
  {
    name: 'exercise-multiple-choice',
    path: '/play/c2-e3',
    progress: buildProgress({ completedCount: 2 }),
  },
  {
    name: 'results',
    path: '/results',
    progress: allExercisesComplete({ wrongPromptIds: ['c2-e2-p2'] }),
  },
];

async function prepare(page: Page, path: string, progress?: GameProgress): Promise<void> {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  if (progress) {
    await page.evaluate(
      ({ key, value }) => window.localStorage.setItem(key, JSON.stringify(value)),
      { key: STORAGE_KEY, value: progress },
    );
  } else {
    await page.evaluate((key) => window.localStorage.removeItem(key), STORAGE_KEY);
  }

  await page.goto(path);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.addEventListener('load', () => resolve(), { once: true });
              image.addEventListener('error', () => resolve(), { once: true });
            }),
      ),
    );
    window.scrollTo(0, 0);
  });
}

for (const screen of SCREENS) {
  test(`visual baseline: ${screen.name}`, async ({ page }) => {
    await prepare(page, screen.path, screen.progress);
    await expect(page).toHaveScreenshot(`${screen.name}.png`, {
      animations: 'disabled',
      caret: 'hide',
    });
  });
}
