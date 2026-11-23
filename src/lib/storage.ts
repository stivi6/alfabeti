import { EXERCISES, EXERCISE_IDS, getExercise } from '../data/exercises';
import type { ExerciseProgress, GameProgress, StoredPromptResult } from './types';

export const STORAGE_KEY = 'shkronjat-tona-progress-v1';

export interface ProgressStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function createDefaultProgress(): GameProgress {
  return {
    version: 1,
    completedExerciseIds: [],
    exercises: {},
    lastVisitedExerciseId: null,
    updatedAt: new Date().toISOString(),
  };
}

function getBrowserStorage(): ProgressStorage | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    return window.localStorage;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizePromptResults(
  raw: unknown,
  exerciseId: string,
): Record<string, StoredPromptResult> {
  const exercise = getExercise(exerciseId);
  if (!exercise || !isRecord(raw)) {
    return {};
  }

  const allowedPromptIds = new Set(exercise.prompts.map((prompt) => prompt.id));
  const results: Record<string, StoredPromptResult> = {};

  for (const [promptId, value] of Object.entries(raw)) {
    if (!allowedPromptIds.has(promptId) || !isRecord(value)) {
      continue;
    }
    if (typeof value.correct !== 'boolean') {
      continue;
    }
    results[promptId] = {
      correct: value.correct,
      answer: typeof value.answer === 'string' ? value.answer.slice(0, 500) : '',
    };
  }

  return results;
}

function sanitizeExerciseProgress(raw: unknown, exerciseId: string): ExerciseProgress | null {
  if (!isRecord(raw) || raw.completed !== true) {
    return null;
  }

  const rawBest = typeof raw.bestCorrect === 'number' ? Math.trunc(raw.bestCorrect) : 0;
  const exercise = getExercise(exerciseId);
  const promptLimit = exercise?.prompts.length ?? 5;
  const bestCorrect = Math.min(promptLimit, Math.max(0, Number.isFinite(rawBest) ? rawBest : 0));
  const rawAttempts = typeof raw.attempts === 'number' ? Math.trunc(raw.attempts) : 1;

  return {
    completed: true,
    bestCorrect,
    attempts: Number.isFinite(rawAttempts) && rawAttempts > 0 ? rawAttempts : 1,
    bestPromptResults: sanitizePromptResults(raw.bestPromptResults, exerciseId),
  };
}

/**
 * Converts untrusted local data into a safe, internally consistent progress object.
 * Invalid records are ignored and invalid data never breaks the app.
 */
export function sanitizeProgress(raw: unknown): GameProgress {
  if (!isRecord(raw) || raw.version !== 1) {
    return createDefaultProgress();
  }

  const rawExercises = isRecord(raw.exercises) ? raw.exercises : {};
  const exercises: Record<string, ExerciseProgress> = {};

  for (const exercise of EXERCISES) {
    const record = sanitizeExerciseProgress(rawExercises[exercise.id], exercise.id);
    if (record) {
      exercises[exercise.id] = record;
    }
  }

  const completedExerciseIds = EXERCISES.filter((exercise) => exercises[exercise.id]?.completed).map(
    (exercise) => exercise.id,
  );

  const lastVisitedRaw = raw.lastVisitedExerciseId;
  const lastVisitedExerciseId =
    typeof lastVisitedRaw === 'string' && EXERCISE_IDS.includes(lastVisitedRaw) ? lastVisitedRaw : null;

  const updatedAt =
    typeof raw.updatedAt === 'string' && Number.isFinite(Date.parse(raw.updatedAt))
      ? raw.updatedAt
      : new Date().toISOString();

  return {
    version: 1,
    completedExerciseIds,
    exercises,
    lastVisitedExerciseId,
    updatedAt,
  };
}

export function loadProgress(storage: ProgressStorage | null = getBrowserStorage()): GameProgress {
  if (!storage) {
    return createDefaultProgress();
  }

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultProgress();
    }
    return sanitizeProgress(JSON.parse(raw) as unknown);
  } catch {
    return createDefaultProgress();
  }
}

export function saveProgress(
  progress: GameProgress,
  storage: ProgressStorage | null = getBrowserStorage(),
): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

/** Removes only Shkronjat Tona’s namespaced key. */
export function clearProgress(storage: ProgressStorage | null = getBrowserStorage()): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
