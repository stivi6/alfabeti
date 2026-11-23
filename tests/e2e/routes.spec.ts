import { expect, test } from '@playwright/test';
import {
  allExercisesComplete,
  assertCleanAudit,
  auditRequests,
  seedProgress,
} from './helpers';

test('key routes render without console errors, failed requests, or external calls', async ({
  page,
  baseURL,
}) => {
  const audit = auditRequests(page, baseURL!);
  await seedProgress(page, allExercisesComplete({ wrongPromptIds: ['c2-e2-p2'] }));

  for (const route of [
    '/',
    '/play',
    '/play/c2-e3',
    '/play/c3-e3',
    '/results',
    '/review',
    '/lojerat',
    '/lojerat/shkronjat',
    '/lojerat/wordle',
    '/lojerat/lidh-shkronjat',
    '/lojerat/gjej-fjalët',
    '/timeline',
    '/this-route-does-not-exist',
  ]) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 }), route).toBeVisible();
  }

  assertCleanAudit(audit);
});
