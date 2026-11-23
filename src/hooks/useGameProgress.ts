import { useContext } from 'react';
import { GameProgressContext, type GameProgressContextValue } from '../app/GameProgressContext';

export function useGameProgress(): GameProgressContextValue {
  const context = useContext(GameProgressContext);
  if (!context) {
    throw new Error('useGameProgress must be used inside GameProgressProvider');
  }
  return context;
}
