import { CHAPTERS } from '../data/chapters';
import { EXERCISES } from '../data/exercises';
import { getCompletedCount, isGameComplete } from './progress';
import type { GameProgress, GameResults } from './types';

export const PROMPTS_PER_EXERCISE = 5;
export const MAX_TOTAL_CORRECT = EXERCISES.reduce(
  (total, exercise) => total + exercise.prompts.length,
  0,
);
export const MAX_CHAPTER_CORRECT = CHAPTERS.reduce(
  (total, chapter) =>
    total +
    chapter.exerciseIds.reduce((chapterTotal, exerciseId) => {
      const exercise = EXERCISES.find((item) => item.id === exerciseId);
      return chapterTotal + (exercise?.prompts.length ?? 0);
    }, 0),
  0,
) / CHAPTERS.length;

export interface PerformanceCategory {
  label: string;
  comment: string;
}

export const SCORE_BANDS: Array<{ min: number; category: PerformanceCategory }> = [
  {
    min: 90,
    category: {
      label: 'Mjeshtër i gjuhës',
      comment: 'Shkëlqyeshëm! E njeh shumë mirë alfabetin dhe gjuhën shqipe.',
    },
  },
  {
    min: 70,
    category: {
      label: 'Eksplorues i shqipes',
      comment: 'Punë shumë e mirë! Ke njohuri të forta; edhe pak ushtrim dhe i kap të gjitha.',
    },
  },
  {
    min: 50,
    category: {
      label: 'Nxënës i kujdesshëm',
      comment: 'Mirë! Ke disa njohuri të mira. Rishiko pyetjet dhe provo përsëri.',
    },
  },
  {
    min: 0,
    category: {
      label: 'Fillimi i rrugës',
      comment: 'Ky ishte një fillim i mirë. Kalo edhe një herë nëpër sfida dhe shiko sa do të përmirësohesh.',
    },
  },
];

export function getPerformanceCategory(percentage: number): PerformanceCategory {
  const safePercentage = Math.max(0, Math.min(100, percentage));
  const band = SCORE_BANDS.find((item) => safePercentage >= item.min) ?? SCORE_BANDS[SCORE_BANDS.length - 1];
  return band?.category ?? SCORE_BANDS[0]?.category ?? { label: 'Mjeshtër i gjuhës', comment: '' };
}

export function getExerciseEncouragement(correct: number): string {
  if (correct >= 4) {
    return 'Shkëlqyeshëm! I paske pothuajse të gjitha saktë.';
  }
  if (correct === 3) {
    return 'Punë shumë e mirë — përgjigje të forta në këtë sfidë.';
  }
  if (correct > 0) {
    return 'Fillim i mirë. Lexo feedback-un dhe vazhdo.';
  }
  return 'Çdo sfidë mëson diçka. Rishiko përgjigjet dhe provo përsëri.';
}

export function calculateGameResults(progress: GameProgress): GameResults {
  const chapters = CHAPTERS.map((chapter) => {
    const chapterMaximum = chapter.exerciseIds.reduce((total, exerciseId) => {
      const exercise = EXERCISES.find((item) => item.id === exerciseId);
      return total + (exercise?.prompts.length ?? 0);
    }, 0);
    const chapterCorrect = chapter.exerciseIds.reduce(
      (total, exerciseId) => total + (progress.exercises[exerciseId]?.bestCorrect ?? 0),
      0,
    );
    const completed = chapter.exerciseIds.every(
      (exerciseId) => progress.exercises[exerciseId]?.completed === true,
    );
    return {
      chapterId: chapter.id,
      title: chapter.title,
      correct: chapterCorrect,
      maximum: chapterMaximum,
      percentage: chapterMaximum ? Math.round((chapterCorrect / chapterMaximum) * 100) : 0,
      completed,
    };
  });

  const totalCorrect = chapters.reduce((total, chapter) => total + chapter.correct, 0);
  const percentage = Math.round((totalCorrect / MAX_TOTAL_CORRECT) * 100);
  const category = getPerformanceCategory(percentage);
  const strongestChapter =
    chapters.reduce((best, chapter) =>
      chapter.percentage > best.percentage ? chapter : best,
    ) ?? {
      chapterId: CHAPTERS[0]?.id ?? '',
      title: CHAPTERS[0]?.title ?? '',
      correct: 0,
      maximum: MAX_CHAPTER_CORRECT,
      percentage: 0,
      completed: false,
    };

  const complete = isGameComplete(progress);
  const perfect = totalCorrect === MAX_TOTAL_CORRECT;

  return {
    totalCorrect,
    maximum: MAX_TOTAL_CORRECT,
    percentage,
    completedExercises: getCompletedCount(progress),
    totalExercises: EXERCISES.length,
    chapters,
    strongestChapter,
    category: category.label,
    comment: perfect
      ? 'Rezultat i plotë! Përgjigje të sakta në të gjitha sfidat.'
      : category.comment,
    perfect,
    complete,
  };
}
