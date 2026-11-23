import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GameProgressProvider } from './GameProgressProvider';
import { ScrollToTop } from './ScrollToTop';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <GameProgressProvider>
        <ScrollToTop />
        {children}
      </GameProgressProvider>
    </BrowserRouter>
  );
}
