import { createContext } from 'react';
import type { GameProgress, PromptOutcome } from '../lib/types';

export interface GameProgressContextValue {
  progress: GameProgress;
  finishExerciseAttempt: (exerciseId: string, outcomes: PromptOutcome[]) => void;
  resetGameProgress: () => void;
}

export const GameProgressContext = createContext<GameProgressContextValue | null>(null);
