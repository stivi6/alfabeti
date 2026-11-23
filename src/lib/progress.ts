import { EXERCISES, getExercise, getExerciseIndex } from '../data/exercises';
import type { ExerciseId } from '../exercises/types';
import type { GameProgress, PromptOutcome } from './types';

export type ExerciseStatus = 'completed' | 'available' | 'locked';

export function getExerciseStatus(exerciseId: ExerciseId, progress: GameProgress): ExerciseStatus {
  const index = getExerciseIndex(exerciseId);
  if (index < 0) {
    return 'locked';
  }

  if (progress.exercises[exerciseId]?.completed) {
    return 'completed';
  }

  if (index === 0) {
    return 'available';
  }

  const previous = EXERCISES[index - 1];
  if (previous && progress.exercises[previous.id]?.completed) {
    return 'available';
  }

  return 'locked';
}

export function getCompletedCount(progress: GameProgress): number {
  return EXERCISES.filter((exercise) => progress.exercises[exercise.id]?.completed).length;
}

export function getCurrentExerciseId(progress: GameProgress): ExerciseId | null {
  const nextIncomplete = EXERCISES.find((exercise) => !progress.exercises[exercise.id]?.completed);
  return nextIncomplete?.id ?? null;
}

export function getNextExerciseId(exerciseId: ExerciseId): ExerciseId | null {
  const index = getExerciseIndex(exerciseId);
  if (index < 0) {
    return null;
  }
  return EXERCISES[index + 1]?.id ?? null;
}

export function isGameComplete(progress: GameProgress): boolean {
  return EXERCISES.every((exercise) => progress.exercises[exercise.id]?.completed === true);
}

/** Records a finished attempt, keeping only the best score and its answer details. */
export function recordExerciseAttempt(
  progress: GameProgress,
  exerciseId: ExerciseId,
  outcomes: PromptOutcome[],
): GameProgress {
  const exercise = getExercise(exerciseId);
  if (!exercise) {
    return progress;
  }

  const validPromptIds = new Set(exercise.prompts.map((prompt) => prompt.id));
  const normalizedOutcomes = outcomes.filter((outcome) => validPromptIds.has(outcome.promptId));
  const currentCorrect = Math.min(
    exercise.prompts.length,
    normalizedOutcomes.filter((outcome) => outcome.correct).length,
  );

  const previous = progress.exercises[exerciseId];
  const isNewBest = !previous || currentCorrect > previous.bestCorrect;

  const bestPromptResults = isNewBest
    ? Object.fromEntries(
        normalizedOutcomes.map((outcome) => [
          outcome.promptId,
          { correct: outcome.correct, answer: outcome.answer.slice(0, 500) },
        ]),
      )
    : previous.bestPromptResults;

  const nextRecord = {
    completed: true,
    bestCorrect: isNewBest ? currentCorrect : previous.bestCorrect,
    attempts: (previous?.attempts ?? 0) + 1,
    bestPromptResults,
  };

  const exercises = {
    ...progress.exercises,
    [exerciseId]: nextRecord,
  };

  const completedExerciseIds = EXERCISES.filter(
    (item) => exercises[item.id]?.completed === true,
  ).map((item) => item.id);

  return {
    ...progress,
    exercises,
    completedExerciseIds,
    lastVisitedExerciseId: exerciseId,
    updatedAt: new Date().toISOString(),
  };
}
