import { expect, type Page, type Request } from '@playwright/test';
import { CHAPTERS } from '../../src/data/chapters';
import { EXERCISES } from '../../src/data/exercises';
import type {
  Exercise,
  MatchingPrompt,
  Prompt,
  SentencePrompt,
} from '../../src/exercises/types';
import type { GameProgress, StoredPromptResult } from '../../src/lib/types';
import { STORAGE_KEY } from '../../src/lib/storage';

export const PROMPTS_PER_EXERCISE = 5;

export function buildProgress(
  options: {
    completedCount?: number;
    wrongPromptIds?: string[];
    incompleteScoreExerciseId?: string;
  } = {},
): GameProgress {
  const { completedCount = 0, wrongPromptIds = [], incompleteScoreExerciseId } = options;
  const exercises: GameProgress['exercises'] = {};
  const completedExerciseIds: string[] = [];

  for (const exercise of EXERCISES.slice(0, completedCount)) {
    const bestPromptResults: Record<string, StoredPromptResult> = {};
    let correctCount = 0;

    for (const prompt of exercise.prompts) {
      const shouldBeWrong = wrongPromptIds.includes(prompt.id);
      const correct = !shouldBeWrong;
      if (correct) correctCount += 1;
      bestPromptResults[prompt.id] = {
        correct,
        answer: shouldBeWrong ? getWrongAnswerText(prompt) : getCorrectAnswerText(prompt),
      };
    }

    exercises[exercise.id] = {
      completed: true,
      bestCorrect: correctCount,
      attempts: 1,
      bestPromptResults,
    };
    completedExerciseIds.push(exercise.id);
  }

  if (incompleteScoreExerciseId && exercises[incompleteScoreExerciseId]) {
    exercises[incompleteScoreExerciseId] = {
      ...exercises[incompleteScoreExerciseId],
      bestCorrect: 1,
    };
  }

  return {
    version: 1,
    completedExerciseIds: completedExerciseIds as GameProgress['completedExerciseIds'],
    exercises,
    lastVisitedExerciseId: completedExerciseIds.at(-1) ?? null,
    updatedAt: new Date().toISOString(),
  };
}

export function allExercisesComplete(options: { wrongPromptIds?: string[] } = {}): GameProgress {
  return buildProgress({
    completedCount: EXERCISES.length,
    wrongPromptIds: options.wrongPromptIds,
  });
}

export async function seedProgress(page: Page, progress: GameProgress): Promise<void> {
  await page.goto('/');
  await page.evaluate(
    ({ key, value }) => {
      window.localStorage.setItem(key, value);
    },
    { key: STORAGE_KEY, value: JSON.stringify(progress) },
  );
  await page.reload();
}

export async function openRoadmap(page: Page): Promise<void> {
  await page.goto('/play');
  await expect(page.getByRole('heading', { name: 'Rrugëtimi yt nëpër shqip', level: 1 })).toBeVisible();
}

export async function openExercise(page: Page, exerciseId: string): Promise<void> {
  await page.goto(`/play/${exerciseId}`);
}

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => {
    const documentElement = document.documentElement;
    const body = document.body;
    return Math.max(
      documentElement.scrollWidth - documentElement.clientWidth,
      body.scrollWidth - body.clientWidth,
    );
  });
  expect(overflow, 'page should not scroll horizontally').toBeLessThanOrEqual(1);
}

export async function expectAllImagesLoaded(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight - 100, 200);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(250);

  const brokenImages = await page.evaluate(() =>
    Array.from(document.images)
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.getAttribute('src') ?? 'unknown'),
  );
  expect(brokenImages, 'all images should load').toEqual([]);
}

export interface RequestAudit {
  pageErrors: string[];
  failedRequests: string[];
  externalRequests: string[];
}

export function auditRequests(page: Page, baseURL: string): RequestAudit {
  const audit: RequestAudit = {
    pageErrors: [],
    failedRequests: [],
    externalRequests: [],
  };

  page.on('pageerror', (error) => {
    audit.pageErrors.push(error.message);
  });

  page.on('requestfailed', (request: Request) => {
    const failure = request.failure()?.errorText ?? 'unknown';
    if (!request.url().includes('favicon')) {
      audit.failedRequests.push(`${request.method()} ${request.url()} — ${failure}`);
    }
  });

  const baseOrigin = new URL(baseURL).origin;
  page.on('request', (request: Request) => {
    const url = request.url();
    if (!url.startsWith('http')) return;
    try {
      if (new URL(url).origin !== baseOrigin) {
        audit.externalRequests.push(url);
      }
    } catch {
      // Ignore malformed URLs from browser internals.
    }
  });

  return audit;
}

export function assertCleanAudit(audit: RequestAudit): void {
  expect(audit.pageErrors, 'no uncaught page errors').toEqual([]);
  expect(audit.failedRequests, 'no failed network requests').toEqual([]);
  expect(audit.externalRequests, 'no third-party runtime requests').toEqual([]);
}

function normalizedSentence(value: string): string {
  const collapsed = value.normalize('NFC').replace(/\s+/g, ' ').trim();
  return collapsed.endsWith('.') ? collapsed.slice(0, -1).trimEnd() : collapsed;
}

export function getSentenceChipOrder(prompt: SentencePrompt): number[] {
  const target = normalizedSentence(prompt.correctSentence);

  const visit = (remaining: number[], accumulated: string[]): number[] | null => {
    if (remaining.length === 0) {
      return normalizedSentence(accumulated.join(' ')) === target ? [] : null;
    }

    for (const index of remaining) {
      const chip = prompt.chips[index];
      if (!chip) continue;
      const result = visit(
        remaining.filter((candidate) => candidate !== index),
        [...accumulated, chip],
      );
      if (result) return [index, ...result];
    }
    return null;
  };

  const order = visit(
    prompt.chips.map((_, index) => index),
    [],
  );
  if (!order) {
    throw new Error(`No valid chip order for ${prompt.id}`);
  }
  return order;
}

function getCorrectOptionLabel(prompt: Extract<Prompt, { correctOptionId: string }>): string {
  return (
    prompt.options.find((option) => option.id === prompt.correctOptionId)?.label ?? ''
  );
}

export function getCorrectAnswerText(prompt: Prompt): string {
  if (prompt.kind === 'sentence') return prompt.correctSentence;
  if (prompt.kind === 'matching') return prompt.right;
  return getCorrectOptionLabel(prompt);
}

export function getWrongAnswerText(prompt: Prompt): string {
  if (prompt.kind === 'sentence') {
    return [...prompt.chips].reverse().join(' ');
  }
  if (prompt.kind === 'matching') {
    const other = EXERCISES.flatMap((exercise) =>
      exercise.prompts.filter(
        (candidate): candidate is MatchingPrompt =>
          candidate.kind === 'matching' && candidate.id !== prompt.id,
      ),
    ).find((candidate) => candidate.right !== prompt.right);
    return other?.right ?? 'Something else';
  }
  return (
    prompt.options.find((option) => option.id !== prompt.correctOptionId)?.label ?? 'Something else'
  );
}

async function answerCurrentPrompt(
  page: Page,
  prompt: Prompt,
  options: { wrongFirst?: boolean; promptIndex: number },
): Promise<void> {
  if (prompt.kind === 'matching') {
    throw new Error('Matching prompts are answered by answerMatchingBoard');
  }

  if (prompt.kind === 'sentence') {
    const order = getSentenceChipOrder(prompt);
    // A deliberately wrong sentence is created by swapping the first two chips.
    const chosenOrder = options.wrongFirst && options.promptIndex === 0 ? [...order].reverse() : order;
    for (const chipIndex of chosenOrder) {
      const chip = prompt.chips[chipIndex];
      if (!chip) continue;
      const button = page.getByRole('button', { name: chip, exact: true }).first();
      await button.click();
    }
  } else {
    const label =
      options.wrongFirst && options.promptIndex === 0
        ? getWrongAnswerText(prompt)
        : getCorrectAnswerText(prompt);
    await page.getByRole('button', { name: label, exact: true }).first().click();
  }

  await page.getByRole('button', { name: 'Kontrollo përgjigjen', exact: true }).click();
}

async function answerMatchingBoard(
  page: Page,
  exercise: Exercise,
  options: { wrongFirst?: boolean },
): Promise<void> {
  const prompts = exercise.prompts.filter(
    (prompt): prompt is MatchingPrompt => prompt.kind === 'matching',
  );

  for (const [index, prompt] of prompts.entries()) {
    await page.getByRole('button', { name: prompt.left, exact: true }).click();
    const right =
      options.wrongFirst && index === 0
        ? (prompts.find((candidate) => candidate.right !== prompt.right)?.right ?? prompt.right)
        : prompt.right;
    await page.getByRole('button', { name: right, exact: true }).click();
  }
}

export async function completeExercise(
  page: Page,
  exerciseId: string,
  options: { wrongFirst?: boolean } = {},
): Promise<void> {
  const exercise = EXERCISES.find((candidate) => candidate.id === exerciseId);
  if (!exercise) throw new Error(`Unknown exercise: ${exerciseId}`);

  if (exercise.prompts.every((prompt) => prompt.kind === 'matching')) {
    await answerMatchingBoard(page, exercise, options);
    await expect(page.getByRole('button', { name: 'Shiko rezultatin', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Shiko rezultatin', exact: true }).click();
  } else {
    for (const [promptIndex, prompt] of exercise.prompts.entries()) {
      await answerCurrentPrompt(page, prompt, { ...options, promptIndex });
      const isLast = promptIndex === exercise.prompts.length - 1;
      await expect(page.getByText(/^(Saktë!|Jo tamam)/).first()).toBeVisible();
      await page
        .getByRole('button', { name: isLast ? 'Shiko rezultatin' : 'Vazhdo', exact: true })
        .click();
    }
  }

  await expect(page.getByText('Sfida u përfundua', { exact: true })).toBeVisible();
}

export async function completeWholeGame(page: Page, options: { startAt?: number } = {}): Promise<void> {
  for (const exercise of EXERCISES.slice(options.startAt ?? 0)) {
    await openExercise(page, exercise.id);
    await completeExercise(page, exercise.id);
  }
}

export function chapterExerciseIds(): string[] {
  return CHAPTERS.flatMap((chapter) => chapter.exerciseIds);
}
