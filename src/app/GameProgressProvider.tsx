import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { recordExerciseAttempt } from '../lib/progress';
import { clearProgress, createDefaultProgress, loadProgress, saveProgress } from '../lib/storage';
import type { GameProgress, PromptOutcome } from '../lib/types';
import { GameProgressContext, type GameProgressContextValue } from './GameProgressContext';

export function GameProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<GameProgress>(() => loadProgress());

  const finishExerciseAttempt = useCallback(
    (exerciseId: string, outcomes: PromptOutcome[]) => {
      setProgress((current) => {
        const next = recordExerciseAttempt(current, exerciseId, outcomes);
        saveProgress(next);
        return next;
      });
    },
    [],
  );

  const resetGameProgress = useCallback(() => {
    clearProgress();
    setProgress(createDefaultProgress());
  }, []);

  const value = useMemo<GameProgressContextValue>(
    () => ({ progress, finishExerciseAttempt, resetGameProgress }),
    [progress, finishExerciseAttempt, resetGameProgress],
  );

  return <GameProgressContext.Provider value={value}>{children}</GameProgressContext.Provider>;
}
