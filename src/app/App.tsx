import { Navigate, Route, Routes } from 'react-router-dom';
import { ExercisePage } from '../pages/ExercisePage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ResultsPage } from '../pages/ResultsPage';
import { ReviewPage } from '../pages/ReviewPage';
import { RoadmapPage } from '../pages/RoadmapPage';
import { MiniGamesHubPage } from '../pages/MiniGamesHubPage';
import { AlphabetModulePage } from '../pages/AlphabetModulePage';
import { WordlePage } from '../pages/WordlePage';
import { LinkLettersPage } from '../pages/LinkLettersPage';
import { FindWordsPage } from '../pages/FindWordsPage';
import { TimelinePage } from '../pages/TimelinePage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/play" element={<RoadmapPage />} />
      <Route path="/play/:exerciseId" element={<ExercisePage />} />
      <Route path="/lojerat" element={<MiniGamesHubPage />} />
      <Route path="/minigames" element={<MiniGamesHubPage />} />
      <Route path="/minigames/wordle" element={<WordlePage />} />
      <Route path="/minigames/lidh-shkronjat" element={<LinkLettersPage />} />
      <Route path="/minigames/gjej-fjalet" element={<FindWordsPage />} />
      <Route path="/lojerat/shkronjat" element={<AlphabetModulePage />} />
      <Route path="/lojerat/wordle" element={<WordlePage />} />
      <Route path="/lojerat/lidh-shkronjat" element={<LinkLettersPage />} />
      <Route path="/lojerat/gjej-fjalët" element={<FindWordsPage />} />
      <Route path="/lojerat/kuizi-i-gjuhes" element={<Navigate to="/play/c2-e1" replace />} />
      <Route path="/lojerat/kuizi-i-historise" element={<Navigate to="/play/c3-e1" replace />} />
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
