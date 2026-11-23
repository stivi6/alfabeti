import type { ExerciseId } from '../exercises/types';

export interface StoredPromptResult {
  correct: boolean;
  /** A readable version of the answer the player submitted. */
  answer: string;
}

export interface ExerciseProgress {
  completed: boolean;
  /** Number of correct prompts in the saved best attempt. */
  bestCorrect: number;
  attempts: number;
  /** Results from the attempt that achieved bestCorrect. */
  bestPromptResults: Record<string, StoredPromptResult>;
}

export interface GameProgress {
  version: 1;
  completedExerciseIds: ExerciseId[];
  exercises: Record<ExerciseId, ExerciseProgress>;
  lastVisitedExerciseId: ExerciseId | null;
  updatedAt: string;
}

export interface PromptOutcome {
  promptId: string;
  correct: boolean;
  answer: string;
}

export interface ChapterResult {
  chapterId: string;
  title: string;
  correct: number;
  maximum: number;
  percentage: number;
  completed: boolean;
}

export interface GameResults {
  totalCorrect: number;
  maximum: number;
  percentage: number;
  completedExercises: number;
  totalExercises: number;
  chapters: ChapterResult[];
  strongestChapter: ChapterResult;
  category: string;
  comment: string;
  perfect: boolean;
  complete: boolean;
}
