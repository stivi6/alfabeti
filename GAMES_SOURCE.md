# Shkronjat Tona — Complete Game Frontend and Logic

**Every file listed below is reproduced in full in its own copy/paste-ready code block. No code sections are abbreviated.** The blocks are verbatim snapshots of the corresponding project files; the files in the project remain authoritative if they are edited later.

This bundle includes all three mini-games, the game hub and route bindings, curated word and puzzle data, shared Albanian-letter tokenization, evaluation and persistence logic, and the directly used layout, style and brand files.

## Included files

- `src/app/App.tsx` — Application route bindings
- `src/pages/MiniGamesHubPage.tsx` — Mini-games hub
- `src/pages/WordlePage.tsx` — Wordle Shqip frontend
- `src/pages/LinkLettersPage.tsx` — Lidh Shkronjat frontend
- `src/pages/FindWordsPage.tsx` — Gjej Fjalët frontend
- `src/components/game/LetterConnectBoard.tsx` — Shared pointer, tap, and keyboard-accessible letter board
- `src/data/wordleWords.ts` — Wordle answer and allowed-guess dictionaries
- `src/data/connectLetterPuzzles.ts` — Lidh Shkronjat curated puzzles
- `src/data/wordConnectRounds.ts` — Gjej Fjalët curated rounds
- `src/lib/albanianLetters.ts` — Albanian letter tokens and input helpers
- `src/lib/wordleEvaluation.ts` — Wordle answer and keyboard-state evaluation
- `src/lib/localGameStorage.ts` — Game local-storage persistence
- `src/components/layout/PageLayout.tsx` — Shared page layout
- `src/components/layout/SiteHeader.tsx` — Shared site header
- `src/components/layout/SiteFooter.tsx` — Shared site footer
- `src/components/brand/BrandLogo.tsx` — Shared brand logo component
- `src/components/ui/buttonStyles.ts` — Shared button styles
- `src/lib/cn.ts` — Shared class-name helper
- `src/styles/index.css` — Application styles
- `src/styles/tokens.css` — Design tokens
- `public/assets/shkronjat-tona-logo.svg` — Brand logo asset used in the shared layout
- `package.json` — Project package manifest

## `src/app/App.tsx`

````tsx
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
````

## `src/pages/MiniGamesHubPage.tsx`

````tsx
import { ArrowRight, Grid3X3, Link2, Puzzle, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { buttonClasses } from '../components/ui/buttonStyles';

const games = [
  { to: '/lojerat/wordle', title: 'Wordle Shqip', text: 'Gjeje fjalën me pesë shkronja në gjashtë tentativa.', icon: Grid3X3 },
  { to: '/lojerat/lidh-shkronjat', title: 'Lidh Shkronjat', text: 'Lidh pllakat dhe krijo fjalët që përputhen me të dhënat.', icon: Link2 },
  { to: '/lojerat/gjej-fjalët', title: 'Gjej Fjalët', text: 'Lidh pesë shkronja në radhë të ndryshme për të zbuluar fjalë shqipe.', icon: Search },
  { to: '/lojerat/kuizi-i-gjuhes', title: 'Kuizi i Gjuhës', text: 'Drejtshkrim, rasat, foljet dhe pikësimi.', icon: Puzzle },
  { to: '/lojerat/kuizi-i-historise', title: 'Kuizi i Historisë', text: 'Rrugëtimi i alfabetit dhe Kongresi i Manastirit.', icon: Sparkles },
];

export function MiniGamesHubPage() {
  return (
    <PageLayout>
      <section className="pb-16 pt-9 sm:pt-12">
        <div className="page-container">
          <p className="eyebrow">Mini-lojëra</p>
          <h1 className="mt-3 text-[clamp(2.4rem,5vw,3.8rem)]">Zgjidh një lojë</h1>
          <p className="mt-4 max-w-xl text-ink-muted">Sfida të shkurtra për të njohur alfabetin, gjuhën dhe historinë.</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map(({ to, title, text, icon: Icon }) => (
              <Link key={to} to={to} className="group rounded-[24px] border border-border bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/30">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary"><Icon size={24} /></span>
                <h2 className="mt-5 text-xl">{title}</h2>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-ink-muted">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-dark">Luaj <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
          <Link to="/play" className={buttonClasses('primary', 'lg', 'mt-8')}>Hyr te kuizet</Link>
        </div>
      </section>
    </PageLayout>
  );
}
````

## `src/pages/WordlePage.tsx`

````tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, Delete, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import {
  ALBANIAN_ALPHABET,
  appendPhysicalLetter,
  backspaceInput,
  canonicalTokenSequence,
  commitPendingToken,
} from '../lib/albanianLetters';
import { evaluateWordle, getKeyboardMarks, type WordleMark } from '../lib/wordleEvaluation';
import { readGameState, writeGameState } from '../lib/localGameStorage';
import { WORDLE_ALLOWED, WORDLE_ANSWERS } from '../data/wordleWords';

const KEY = 'shkronjat-tona-wordle-v2';
const ROUND_VERSION = 2;
const MAX_GUESSES = 6;

interface SavedWordle {
  answerIndex: number;
  guesses: string[][];
  inputTokens: string[];
  pendingToken: string;
  status: 'active' | 'won' | 'lost';
}

const WORDLE_ALLOWED_KEYS = new Set(
  WORDLE_ALLOWED.map((entry) => canonicalTokenSequence(entry.tokens)),
);

function createRound(previousAnswerIndex?: number): SavedWordle {
  let answerIndex = Math.floor(Math.random() * WORDLE_ANSWERS.length);
  if (WORDLE_ANSWERS.length > 1 && answerIndex === previousAnswerIndex) {
    answerIndex = (answerIndex + 1) % WORDLE_ANSWERS.length;
  }
  return {
    answerIndex,
    guesses: [],
    inputTokens: [],
    pendingToken: '',
    status: 'active',
  };
}

function isSavedRound(value: SavedWordle | null): value is SavedWordle {
  return Boolean(
    value
      && Number.isInteger(value.answerIndex)
      && value.answerIndex >= 0
      && value.answerIndex < WORDLE_ANSWERS.length
      && Array.isArray(value.guesses)
      && Array.isArray(value.inputTokens)
      && typeof value.pendingToken === 'string'
      && ['active', 'won', 'lost'].includes(value.status),
  );
}

function markClasses(mark?: WordleMark): string {
  if (mark === 'green') return 'border-[#538D4E] bg-[#538D4E] text-white';
  if (mark === 'yellow') return 'border-[#B59F3B] bg-[#B59F3B] text-white';
  if (mark === 'gray') return 'border-[#787C7E] bg-[#787C7E] text-white';
  return 'border-border bg-surface text-ink';
}

export function WordlePage() {
  const [state, setState] = useState<SavedWordle>(() => {
    const saved = readGameState<SavedWordle>(KEY, ROUND_VERSION);
    return isSavedRound(saved) ? saved : createRound();
  });
  const stateRef = useRef(state);
  const [message, setMessage] = useState('');

  useLayoutEffect(() => {
    stateRef.current = state;
  }, [state]);

  const answerEntry = WORDLE_ANSWERS[state.answerIndex] ?? WORDLE_ANSWERS[0]!;
  const keyboardMarks = getKeyboardMarks(state.guesses, answerEntry.tokens);

  useEffect(() => {
    writeGameState(KEY, ROUND_VERSION, state);
  }, [state]);

  function updateInput(tokens: string[], pendingToken = '') {
    setState((current) => ({ ...current, inputTokens: tokens, pendingToken }));
    setMessage('');
  }

  function submitGuess(submission?: readonly string[]) {
    const currentRound = stateRef.current;
    if (currentRound.status !== 'active') return;
    const guess = submission
      ? [...submission]
      : commitPendingToken(currentRound.inputTokens, currentRound.pendingToken);

    if (guess.length !== 5) {
      setMessage('Plotëso pesë shkronja shqipe përpara se ta kontrollosh fjalën.');
      return;
    }

    const guessKey = canonicalTokenSequence(guess);
    if (!WORDLE_ALLOWED_KEYS.has(guessKey)) {
      setMessage('Kjo fjalë nuk është në fjalorin e pranuar. Provo një fjalë tjetër.');
      return;
    }

    const answer = WORDLE_ANSWERS[currentRound.answerIndex]!.tokens;
    const guesses = [...currentRound.guesses, guess];
    const won = guessKey === canonicalTokenSequence(answer);
    const lost = !won && guesses.length >= MAX_GUESSES;
    setState({
      ...currentRound,
      guesses,
      inputTokens: [],
      pendingToken: '',
      status: won ? 'won' : lost ? 'lost' : 'active',
    });
    setMessage(won ? 'Saktë! E gjete fjalën.' : lost ? 'Raundi përfundoi.' : '');
  }

  function addToken(token: string) {
    const currentRound = stateRef.current;
    if (currentRound.status !== 'active') return;
    const committed = commitPendingToken(currentRound.inputTokens, currentRound.pendingToken);
    if (committed.length >= 5) return;
    updateInput([...committed, token]);
  }

  function handlePhysicalKey(event: KeyboardEvent) {
    const currentRound = stateRef.current;
    if (currentRound.status !== 'active' || event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      submitGuess(commitPendingToken(currentRound.inputTokens, currentRound.pendingToken));
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      const next = backspaceInput(currentRound.inputTokens, currentRound.pendingToken);
      updateInput(next.tokens, next.pending);
      return;
    }

    if (Array.from(event.key).length !== 1) return;
    const next = appendPhysicalLetter(
      currentRound.inputTokens,
      currentRound.pendingToken,
      event.key,
    );
    if (next.tokens.length + Number(Boolean(next.pending)) > 5) return;
    updateInput(next.tokens, next.pending);
  }

  useEffect(() => {
    window.addEventListener('keydown', handlePhysicalKey);
    return () => window.removeEventListener('keydown', handlePhysicalKey);
  });

  function newRound() {
    setState(createRound(stateRef.current.answerIndex));
    setMessage('');
  }

  const visibleInput = [...state.inputTokens, ...(state.pendingToken ? [state.pendingToken] : [])];
  const marksByGuess = state.guesses.map((guess) => evaluateWordle(guess, answerEntry.tokens));
  const greenPositions = answerEntry.tokens.map((_, index) =>
    marksByGuess.some((marks) => marks[index] === 'green'),
  );
  const greenLetters = new Set(
    state.guesses.flatMap((guess, guessIndex) =>
      guess.filter((token, index) => marksByGuess[guessIndex]?.[index] === 'green' ? [token] : []),
    ),
  );
  const yellowLetters = [...new Set(
    state.guesses.flatMap((guess, guessIndex) =>
      guess.filter((token, index) => marksByGuess[guessIndex]?.[index] === 'yellow' ? [token] : []),
    ),
  )].filter((token) => !greenLetters.has(token));

  return (
    <PageLayout>
      <section className="pb-16 pt-8">
        <div className="page-container max-w-[720px]">
          <Link to="/lojerat" className="inline-flex items-center gap-2 text-sm font-bold text-primary-dark">
            <ArrowLeft size={16} aria-hidden="true" /> Kthehu te lojërat
          </Link>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Pesë shkronja shqipe</p>
              <h1 className="mt-2 text-[clamp(2.2rem,5vw,3.4rem)]">Wordle Shqip</h1>
              <p className="mt-2 text-sm text-ink-muted">Gjeje fjalën në gjashtë përpjekje.</p>
            </div>
            <button
              type="button"
              onClick={newRound}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 font-bold"
            >
              <RotateCcw size={16} aria-hidden="true" /> Fjalë e re
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
            <p className="text-center text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
              Fjala e fshehur
            </p>
            <div className="mt-3 flex justify-center gap-2" aria-label="Shkronjat e zbuluara">
              {answerEntry.tokens.map((token, index) => {
                const revealed = state.status !== 'active' || greenPositions[index];
                return (
                  <span
                    key={index}
                    data-testid={`wordle-reveal-${index}`}
                    className={`grid size-12 place-items-center rounded-xl border-2 text-xl font-extrabold sm:size-14 ${revealed ? 'border-[#538D4E] bg-[#538D4E] text-white' : 'border-border bg-bg text-ink-muted'}`}
                  >
                    {revealed ? token : '□'}
                  </span>
                );
              })}
            </div>
            {yellowLetters.length > 0 && state.status === 'active' && (
              <p className="mt-3 text-center text-sm text-ink-muted">
                Shkronjat që gjenden diku në fjalë: <strong>{yellowLetters.join(' · ')}</strong>
              </p>
            )}
          </div>

          <div className="mt-6 space-y-2" aria-label="Tabela e përpjekjeve">
            {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
              const guess = state.guesses[rowIndex]
                ?? (rowIndex === state.guesses.length && state.status === 'active' ? visibleInput : []);
              const marks = marksByGuess[rowIndex] ?? [];
              return (
                <div
                  key={rowIndex}
                  role="group"
                  aria-label={`Përpjekja ${rowIndex + 1}`}
                  className="grid grid-cols-5 gap-2"
                >
                  {Array.from({ length: 5 }).map((__, colIndex) => {
                    const mark = marks[colIndex];
                    return (
                      <span
                        key={colIndex}
                        data-testid={`wordle-tile-${rowIndex}-${colIndex}`}
                        className={`grid aspect-square max-h-[70px] place-items-center rounded-xl border-2 text-xl font-extrabold ${markClasses(mark)}`}
                      >
                        {guess[colIndex] ?? ''}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {message && <p role="status" className="mt-4 text-center font-bold text-primary-dark">{message}</p>}
          {state.status !== 'active' && (
            <div className="mt-4 rounded-2xl bg-primary-soft p-4 text-center" role="status">
              <p className="font-bold text-primary-dark">
                {state.status === 'won' ? 'Urime, e gjete fjalën!' : `Fjala ishte ${answerEntry.display}.`}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {state.status === 'won'
                  ? `E gjete me ${state.guesses.length} ${state.guesses.length === 1 ? 'përpjekje' : 'përpjekje'}.`
                  : `U përdorën të gjashtë përpjekjet.`}
              </p>
              <button
                type="button"
                onClick={newRound}
                className="mt-3 rounded-xl bg-primary px-4 py-2 font-bold text-white"
              >
                Fillo një raund të ri
              </button>
            </div>
          )}

          <div className="mt-6 grid grid-cols-9 gap-1.5 sm:grid-cols-12" aria-label="Tastiera e alfabetit shqip">
            {ALBANIAN_ALPHABET.map((token) => (
              <button
                key={token}
                type="button"
                data-testid={`wordle-key-${token}`}
                onClick={() => addToken(token)}
                disabled={state.status !== 'active'}
                aria-label={`Shkronja ${token}`}
                className={`min-h-11 rounded-lg border px-1 text-sm font-extrabold disabled:cursor-not-allowed disabled:opacity-50 ${markClasses(keyboardMarks.get(token))}`}
              >
                {token}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                const next = backspaceInput(stateRef.current.inputTokens, stateRef.current.pendingToken);
                updateInput(next.tokens, next.pending);
              }}
              disabled={state.status !== 'active'}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface font-bold disabled:opacity-50"
            >
              <Delete size={17} aria-hidden="true" /> Fshi
            </button>
            <button
              type="button"
              onClick={() => submitGuess()}
              disabled={state.status !== 'active'}
              className="min-h-12 flex-[2] rounded-xl bg-primary px-5 font-bold text-white disabled:opacity-50"
            >
              Kontrollo
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-ink-muted">
            Çdo digraf, si SH ose NJ, llogaritet si një shkronjë shqipe.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
````

## `src/pages/LinkLettersPage.tsx`

````tsx
import { useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LetterConnectBoard } from '../components/game/LetterConnectBoard';
import { PageLayout } from '../components/layout/PageLayout';
import { CONNECT_PUZZLES } from '../data/connectLetterPuzzles';
import { canonicalTokenSequence } from '../lib/albanianLetters';
import { readGameState, writeGameState } from '../lib/localGameStorage';

const KEY = 'shkronjat-tona-connect-v2';
const ROUND_VERSION = 2;

interface ConnectState {
  puzzleId: string;
  found: string[];
  tiles: string[];
  score: number;
}

function shuffleTiles(tiles: readonly string[]): string[] {
  const shuffled = [...tiles];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex]!, shuffled[index]!];
  }
  return shuffled;
}

function createState(puzzleIndex = 0): ConnectState {
  const puzzle = CONNECT_PUZZLES[puzzleIndex]!;
  return { puzzleId: puzzle.id, found: [], tiles: shuffleTiles(puzzle.tiles), score: 0 };
}

function isSavedState(value: ConnectState | null): value is ConnectState {
  if (!value) return false;
  const puzzle = CONNECT_PUZZLES.find((item) => item.id === value.puzzleId);
  return Boolean(
    puzzle
      && Array.isArray(value.found)
      && Array.isArray(value.tiles)
      && value.tiles.length === puzzle.tiles.length
      && Number.isFinite(value.score),
  );
}

export function LinkLettersPage() {
  const [state, setState] = useState<ConnectState>(() => {
    const saved = readGameState<ConnectState>(KEY, ROUND_VERSION);
    return isSavedState(saved) ? saved : createState();
  });
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const puzzle = CONNECT_PUZZLES.find((item) => item.id === state.puzzleId) ?? CONNECT_PUZZLES[0]!;
  const currentTokens = selectedIndices.map((index) => state.tiles[index]!).filter(Boolean);
  const currentWord = currentTokens.join('');
  const foundKeys = new Set(state.found);
  const completed = state.found.length === puzzle.targets.length;

  useEffect(() => {
    writeGameState(KEY, ROUND_VERSION, state);
  }, [state]);

  function clearSelection() {
    setSelectedIndices([]);
    setMessage('');
  }

  function submitWord() {
    if (currentTokens.length === 0) {
      setMessage('Zgjidh disa pllaka për të formuar një fjalë.');
      return;
    }

    const wordKey = canonicalTokenSequence(currentTokens);
    const target = puzzle.targets.find(
      (item) => canonicalTokenSequence(item.tokens) === wordKey,
    );

    if (!target) {
      setMessage('Kjo nuk është një nga fjalët e synuara. Provo përsëri.');
      setSelectedIndices([]);
      return;
    }
    if (foundKeys.has(wordKey)) {
      setMessage('Këtë fjalë e ke gjetur tashmë.');
      setSelectedIndices([]);
      return;
    }

    setState((current) => ({
      ...current,
      found: [...current.found, wordKey],
      score: current.score + target.tokens.length * 10,
    }));
    setSelectedIndices([]);
    setMessage(`Saktë — gjete fjalën «${target.word}».`);
  }

  function newPuzzle() {
    const currentIndex = CONNECT_PUZZLES.findIndex((item) => item.id === puzzle.id);
    const nextIndex = (currentIndex + 1) % CONNECT_PUZZLES.length;
    setState(createState(nextIndex));
    setSelectedIndices([]);
    setMessage('');
  }

  return (
    <PageLayout>
      <section className="pb-16 pt-8">
        <div className="page-container max-w-[920px]">
          <Link to="/lojerat" className="inline-flex items-center gap-2 text-sm font-bold text-primary-dark">
            <ArrowLeft size={16} aria-hidden="true" /> Kthehu te lojërat
          </Link>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Lidh pllakat për të gjetur fjalët</p>
              <h1 className="mt-2 text-[clamp(2.2rem,5vw,3.4rem)]">{puzzle.title}</h1>
              <p className="mt-2 text-ink-muted">{puzzle.clue}</p>
            </div>
            <button
              type="button"
              onClick={newPuzzle}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 font-bold"
            >
              <RotateCcw size={16} aria-hidden="true" /> Puzzle i ri
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Fjala e formuar</p>
              <p data-testid="connect-word" aria-live="polite" className="mt-2 min-h-10 font-display text-3xl font-extrabold text-primary">
                {currentWord || '—'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Fjalë të gjetura</p>
                <p data-testid="connect-progress" className="mt-2 font-display text-2xl font-extrabold text-ink">
                  {state.found.length} / {puzzle.targets.length}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Pikët</p>
                <p data-testid="connect-score" className="mt-2 font-display text-2xl font-extrabold text-primary">{state.score}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <LetterConnectBoard
              tiles={state.tiles}
              selectedIndices={selectedIndices}
              onSelectedIndicesChange={setSelectedIndices}
              layout="grid"
              ariaLabel="Pllakat e shkronjave për lidhje"
              testIdPrefix="connect-tile"
              disabled={completed}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearSelection}
              disabled={selectedIndices.length === 0}
              className="min-h-11 flex-1 rounded-xl border border-border bg-surface font-bold disabled:opacity-50"
            >
              Pastro zgjedhjen
            </button>
            <button
              type="button"
              onClick={submitWord}
              disabled={selectedIndices.length === 0 || completed}
              className="min-h-11 flex-[2] rounded-xl bg-primary px-5 font-bold text-white disabled:opacity-50"
            >
              Kontrollo fjalën
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-ink-muted">
            Zvarrit mbi pllakat ose zgjidhi me radhë. Mund të përdorësh edhe Tab dhe Enter.
          </p>

          {message && <p role="status" className="mt-4 text-center font-bold text-primary-dark">{message}</p>}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {puzzle.targets.map((target, index) => {
              const found = foundKeys.has(canonicalTokenSequence(target.tokens));
              return (
                <div
                  key={target.word}
                  data-testid={`connect-target-${index}`}
                  className={`rounded-2xl border p-4 ${found ? 'border-success bg-success-soft' : 'border-border bg-surface'}`}
                >
                  <p className={`font-bold ${found ? 'text-success' : 'text-ink-muted'}`}>
                    {found ? target.word : '· '.repeat(target.tokens.length).trim()}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{target.clue}</p>
                </div>
              );
            })}
          </div>

          {completed && (
            <div className="mt-6 rounded-2xl bg-success-soft p-5 text-center" role="status">
              <p className="font-bold text-success">I gjete të gjitha {puzzle.targets.length} fjalët!</p>
              <p className="mt-1 text-sm text-success">Rezultati: {state.score} pikë.</p>
              <button type="button" onClick={newPuzzle} className="mt-3 rounded-xl bg-primary px-4 py-2 font-bold text-white">
                Luaj puzzle-n tjetër
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
````

## `src/pages/FindWordsPage.tsx`

````tsx
import { useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LetterConnectBoard } from '../components/game/LetterConnectBoard';
import { PageLayout } from '../components/layout/PageLayout';
import { WORD_CONNECT_ROUNDS } from '../data/wordConnectRounds';
import { canBuildWordFromRack, canonicalTokenSequence } from '../lib/albanianLetters';
import { readGameState, writeGameState } from '../lib/localGameStorage';

const KEY = 'shkronjat-tona-word-connect-v1';
const ROUND_VERSION = 1;

interface WordConnectState {
  roundId: string;
  letters: string[];
  found: string[];
  score: number;
}

function shuffleTiles(tiles: readonly string[]): string[] {
  const shuffled = [...tiles];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex]!, shuffled[index]!];
  }
  return shuffled;
}

function createRound(index = 0): WordConnectState {
  const round = WORD_CONNECT_ROUNDS[index]!;
  return {
    roundId: round.id,
    letters: shuffleTiles(round.letters),
    found: [],
    score: 0,
  };
}

function sameLetterInventory(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  const counts = new Map<string, number>();
  left.forEach((token) => counts.set(token, (counts.get(token) ?? 0) + 1));
  for (const token of right) {
    const count = counts.get(token) ?? 0;
    if (count === 0) return false;
    counts.set(token, count - 1);
  }
  return true;
}

function isSavedRound(value: WordConnectState | null): value is WordConnectState {
  if (!value) return false;
  const round = WORD_CONNECT_ROUNDS.find((item) => item.id === value.roundId);
  return Boolean(
    round
      && Array.isArray(value.letters)
      && value.letters.length === 5
      && sameLetterInventory(value.letters, round.letters)
      && Array.isArray(value.found)
      && value.found.every((key) => round.words.some((word) => canonicalTokenSequence(word.tokens) === key))
      && Number.isFinite(value.score),
  );
}

export function FindWordsPage() {
  const [state, setState] = useState<WordConnectState>(() => {
    const saved = readGameState<WordConnectState>(KEY, ROUND_VERSION);
    return isSavedRound(saved) ? saved : createRound();
  });
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const round = WORD_CONNECT_ROUNDS.find((item) => item.id === state.roundId) ?? WORD_CONNECT_ROUNDS[0]!;
  const selectedTokens = selectedIndices.map((index) => state.letters[index]!).filter(Boolean);
  const currentWord = selectedTokens.join('');
  const foundKeys = new Set(state.found);
  const completed = state.found.length === round.words.length;

  useEffect(() => {
    writeGameState(KEY, ROUND_VERSION, state);
  }, [state]);

  function clearSelection() {
    setSelectedIndices([]);
    setMessage('');
  }

  function submitWord() {
    if (selectedTokens.length < 2) {
      setMessage('Lidh të paktën dy shkronja për të formuar një fjalë.');
      return;
    }

    const wordKey = canonicalTokenSequence(selectedTokens);
    const target = round.words.find((item) => canonicalTokenSequence(item.tokens) === wordKey);
    if (!target || !canBuildWordFromRack(state.letters, target.tokens)) {
      setMessage('Kjo fjalë nuk është në fjalorin e këtij raundi. Provo një tjetër.');
      setSelectedIndices([]);
      return;
    }
    if (foundKeys.has(wordKey)) {
      setMessage('Këtë fjalë e ke gjetur tashmë.');
      setSelectedIndices([]);
      return;
    }

    setState((current) => ({
      ...current,
      found: [...current.found, wordKey],
      score: current.score + target.tokens.length * 10,
    }));
    setSelectedIndices([]);
    setMessage(`Fjalë e re: «${target.display}»!`);
  }

  function newRound() {
    const currentIndex = WORD_CONNECT_ROUNDS.findIndex((item) => item.id === round.id);
    setState(createRound((currentIndex + 1) % WORD_CONNECT_ROUNDS.length));
    setSelectedIndices([]);
    setMessage('');
  }

  return (
    <PageLayout>
      <section className="pb-16 pt-8">
        <div className="page-container max-w-[760px]">
          <Link to="/lojerat" className="inline-flex items-center gap-2 text-sm font-bold text-primary-dark">
            <ArrowLeft size={16} aria-hidden="true" /> Kthehu te lojërat
          </Link>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Lidh shkronjat për të krijuar fjalë</p>
              <h1 className="mt-2 text-[clamp(2.2rem,5vw,3.4rem)]">Gjej Fjalët</h1>
              <p className="mt-2 text-ink-muted">{round.title}</p>
            </div>
            <button
              type="button"
              onClick={newRound}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 font-bold"
            >
              <RotateCcw size={16} aria-hidden="true" /> Raund i ri
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Fjalë të gjetura</p>
              <p data-testid="word-connect-progress" className="mt-1 font-display text-2xl font-extrabold text-ink">
                {state.found.length} / {round.words.length}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Pikët</p>
              <p data-testid="word-connect-score" className="mt-1 font-display text-2xl font-extrabold text-primary">{state.score}</p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
            Lidh pllakat për të formuar një fjalë
          </p>
          <div className="mt-3">
            <LetterConnectBoard
              tiles={state.letters}
              selectedIndices={selectedIndices}
              onSelectedIndicesChange={setSelectedIndices}
              layout="circle"
              ariaLabel="Pesë pllakat e shkronjave"
              testIdPrefix="word-connect-tile"
              disabled={completed}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-surface p-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Fjala jote</p>
            <p data-testid="word-connect-current" aria-live="polite" className="mt-1 min-h-10 font-display text-3xl font-extrabold tracking-wide text-primary">
              {currentWord || '—'}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearSelection}
              disabled={selectedIndices.length === 0}
              className="min-h-11 flex-1 rounded-xl border border-border bg-surface font-bold disabled:opacity-50"
            >
              Pastro
            </button>
            <button
              type="button"
              onClick={submitWord}
              disabled={selectedIndices.length < 2 || completed}
              className="min-h-11 flex-[2] rounded-xl bg-primary px-5 font-bold text-white disabled:opacity-50"
            >
              Gjej fjalën
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-ink-muted">
            Mund të përdorësh një pjesë ose të gjitha shkronjat, pa përdorur të njëjtën pllakë dy herë.
          </p>

          {message && <p role="status" className="mt-4 text-center font-bold text-primary-dark">{message}</p>}

          <section aria-labelledby="found-words-title" className="mt-7 rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 id="found-words-title" className="text-lg">Fjalët e gjetura</h2>
              <span className="text-sm font-bold text-primary">{state.found.length} / {round.words.length}</span>
            </div>
            {state.found.length === 0 ? (
              <p className="mt-3 text-sm text-ink-muted">Fjalët që zbulon do të shfaqen këtu.</p>
            ) : (
              <ul className="mt-3 flex flex-wrap gap-2">
                {round.words.filter((word) => foundKeys.has(canonicalTokenSequence(word.tokens))).map((word) => (
                  <li key={word.display} className="rounded-full bg-success-soft px-3 py-1.5 text-sm font-bold text-success">
                    {word.display}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {completed && (
            <div className="mt-5 rounded-2xl bg-success-soft p-5 text-center" role="status">
              <p className="font-bold text-success">I gjete të gjitha {round.words.length} fjalët!</p>
              <p className="mt-1 text-sm text-success">Rezultati yt: {state.score} pikë.</p>
              <button type="button" onClick={newRound} className="mt-3 rounded-xl bg-primary px-4 py-2 font-bold text-white">
                Fillo raundin tjetër
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
````

## `src/components/game/LetterConnectBoard.tsx`

````tsx
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

type BoardLayout = 'circle' | 'grid';

interface LetterConnectBoardProps {
  tiles: readonly string[];
  selectedIndices: readonly number[];
  onSelectedIndicesChange: (indices: number[]) => void;
  layout: BoardLayout;
  ariaLabel: string;
  testIdPrefix: string;
  disabled?: boolean;
}

interface Point {
  x: number;
  y: number;
}

const CIRCLE_POSITIONS: Point[] = [
  { x: 50, y: 12 },
  { x: 86, y: 38 },
  { x: 72, y: 82 },
  { x: 28, y: 82 },
  { x: 14, y: 38 },
];

export function LetterConnectBoard({
  tiles,
  selectedIndices,
  onSelectedIndicesChange,
  layout,
  ariaLabel,
  testIdPrefix,
  disabled = false,
}: LetterConnectBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const selectedRef = useRef<readonly number[]>(selectedIndices);
  const [isDragging, setIsDragging] = useState(false);
  const [pointerPoint, setPointerPoint] = useState<Point | null>(null);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [tileCenters, setTileCenters] = useState<Point[]>([]);

  const measure = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    setSize({ width: Math.max(rect.width, 1), height: Math.max(rect.height, 1) });
    setTileCenters(
      Array.from(board.querySelectorAll<HTMLElement>('[data-letter-index]')).map((tile) => {
        const tileRect = tile.getBoundingClientRect();
        return {
          x: tileRect.left - rect.left + tileRect.width / 2,
          y: tileRect.top - rect.top + tileRect.height / 2,
        };
      }),
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const board = boardRef.current;
    if (!board) return;
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    return () => observer.disconnect();
  }, [measure, tiles.length]);

  useLayoutEffect(() => {
    selectedRef.current = selectedIndices;
  }, [selectedIndices]);

  const selectIndex = useCallback((index: number) => {
    if (disabled) return;
    if (!Number.isInteger(index) || index < 0 || index >= tiles.length) return;
    if (selectedRef.current.includes(index)) return;
    const next = [...selectedRef.current, index];
    selectedRef.current = next;
    onSelectedIndicesChange(next);
  }, [disabled, onSelectedIndicesChange, tiles.length]);

  const tileAtPoint = useCallback((clientX: number, clientY: number) => {
    const board = boardRef.current;
    const tile = document.elementFromPoint(clientX, clientY)
      ?.closest<HTMLElement>('[data-letter-index]');
    if (!board || !tile || !board.contains(tile)) return null;
    const index = Number(tile.dataset.letterIndex);
    return Number.isInteger(index) ? index : null;
  }, []);

  const tileIndexFromTarget = (target: EventTarget | null): number | null => {
    if (!(target instanceof Element)) return null;
    const tile = target.closest<HTMLElement>('[data-letter-index]');
    if (!tile || !boardRef.current?.contains(tile)) return null;
    const index = Number(tile.dataset.letterIndex);
    return Number.isInteger(index) ? index : null;
  };

  const localPoint = useCallback((clientX: number, clientY: number): Point => {
    const rect = boardRef.current?.getBoundingClientRect();
    return {
      x: clientX - (rect?.left ?? 0),
      y: clientY - (rect?.top ?? 0),
    };
  }, []);

  const pointForTile = (index: number): Point | null => tileCenters[index] ?? null;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    const index = tileIndexFromTarget(event.target) ?? tileAtPoint(event.clientX, event.clientY);
    if (index === null) return;
    event.preventDefault();
    pointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    selectIndex(index);
    setIsDragging(true);
    setPointerPoint(pointForTile(index));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;
    const index = tileAtPoint(event.clientX, event.clientY);
    if (index !== null) {
      selectIndex(index);
      setPointerPoint(pointForTile(index));
    } else {
      setPointerPoint(localPoint(event.clientX, event.clientY));
    }
  };

  const finishPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;
    const index = tileAtPoint(event.clientX, event.clientY);
    if (index !== null) {
      selectIndex(index);
      setPointerPoint(pointForTile(index));
    }
    pointerIdRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const centers = selectedIndices
    .map((index) => tileCenters[index])
    .filter((point): point is Point => point !== null);
  const linePoints = isDragging && pointerPoint
    ? [...centers, pointerPoint]
    : centers;
  const polylinePoints = linePoints.map(({ x, y }) => `${x},${y}`).join(' ');

  return (
    <div
      ref={boardRef}
      role="group"
      aria-label={ariaLabel}
      className={`relative mx-auto touch-none select-none overflow-hidden rounded-[28px] border border-border bg-primary-soft/35 ${layout === 'circle' ? 'aspect-square w-full max-w-[430px]' : 'w-full p-5'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={finishPointer}
    >
      {layout === 'grid' && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {tiles.map((tile, index) => (
            <LetterTile
              key={`${tile}-${index}`}
              tile={tile}
              index={index}
              selected={selectedIndices.includes(index)}
              testId={`${testIdPrefix}-${index}`}
              onSelect={selectIndex}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      {layout === 'circle' && tiles.map((tile, index) => {
        const position = CIRCLE_POSITIONS[index] ?? { x: 50, y: 50 };
        return (
          <LetterTile
            key={`${tile}-${index}`}
            tile={tile}
            index={index}
            selected={selectedIndices.includes(index)}
            testId={`${testIdPrefix}-${index}`}
            onSelect={selectIndex}
            disabled={disabled}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="none"
        data-testid={`${testIdPrefix}-svg`}
      >
        {linePoints.length > 1 && (
          <polyline
            data-testid={`${testIdPrefix}-path`}
            points={polylinePoints}
            fill="none"
            stroke="#C8102E"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}

interface LetterTileProps {
  tile: string;
  index: number;
  selected: boolean;
  testId: string;
  onSelect: (index: number) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

function LetterTile({ tile, index, selected, testId, onSelect, disabled = false, style }: LetterTileProps) {
  return (
    <button
      type="button"
      data-letter-index={index}
      data-testid={testId}
      aria-label={`Shkronja ${tile}, pllaka ${index + 1}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelect(index)}
      style={style}
      className={`grid size-14 place-items-center rounded-2xl border-2 text-lg font-extrabold shadow-sm transition sm:size-[68px] ${style ? 'absolute' : ''} ${selected ? 'z-10 border-primary bg-primary text-white shadow-lifted' : 'border-border bg-surface text-ink hover:border-primary/60'}`}
    >
      {tile}
    </button>
  );
}
````

## `src/data/wordleWords.ts`

````ts
import { validateCuratedWord } from '../lib/albanianLetters';

export interface WordEntry {
  display: string;
  tokens: string[];
}

export const WORD_DICTIONARY_SOURCE = {
  title: 'Fjalori i Gjuhës së Sotme Shqipe',
  url: 'https://fjalori.shkenca.org/',
  verifiedOn: '2026-11-23',
} as const;

function entry(display: string, ...tokens: string[]): WordEntry {
  const word = { display, tokens };
  if (!validateCuratedWord(display, tokens)) {
    throw new Error(`Tokenët nuk përputhen me fjalën e fjalorit: ${display}`);
  }
  return word;
}

// Headwords were checked against WORD_DICTIONARY_SOURCE. This offline list is
// intentionally curated; it is not a generated or permissive spelling filter.
export const WORDLE_ANSWERS: WordEntry[] = [
  entry('fjalë', 'F', 'J', 'A', 'L', 'Ë'),
  entry('çelës', 'Ç', 'E', 'L', 'Ë', 'S'),
  entry('libër', 'L', 'I', 'B', 'Ë', 'R'),
  entry('drejt', 'D', 'R', 'E', 'J', 'T'),
  entry('dashur', 'D', 'A', 'SH', 'U', 'R'),
  entry('shkollë', 'SH', 'K', 'O', 'LL', 'Ë'),
  entry('thesar', 'TH', 'E', 'S', 'A', 'R'),
  entry('motër', 'M', 'O', 'T', 'Ë', 'R'),
  entry('bukur', 'B', 'U', 'K', 'U', 'R'),
  entry('çantë', 'Ç', 'A', 'N', 'T', 'Ë'),
  entry('zemër', 'Z', 'E', 'M', 'Ë', 'R'),
  entry('shtëpi', 'SH', 'T', 'Ë', 'P', 'I'),
  entry('lëndë', 'L', 'Ë', 'N', 'D', 'Ë'),
  entry('mësim', 'M', 'Ë', 'S', 'I', 'M'),
  entry('ditur', 'D', 'I', 'T', 'U', 'R'),
  entry('gatim', 'G', 'A', 'T', 'I', 'M'),
  entry('qytet', 'Q', 'Y', 'T', 'E', 'T'),
  entry('pranë', 'P', 'R', 'A', 'N', 'Ë'),
  entry('djalë', 'D', 'J', 'A', 'L', 'Ë'),
  entry('detar', 'D', 'E', 'T', 'A', 'R'),
  entry('shpejt', 'SH', 'P', 'E', 'J', 'T'),
  entry('ëmbël', 'Ë', 'M', 'B', 'Ë', 'L'),
  entry('sjellë', 'S', 'J', 'E', 'LL', 'Ë'),
  entry('sotme', 'S', 'O', 'T', 'M', 'E'),
  entry('punim', 'P', 'U', 'N', 'I', 'M'),
  entry('qershi', 'Q', 'E', 'R', 'SH', 'I'),
  entry('lartë', 'L', 'A', 'R', 'T', 'Ë'),
  entry('lexoj', 'L', 'E', 'X', 'O', 'J'),
  entry('pjesë', 'P', 'J', 'E', 'S', 'Ë'),
  entry('qepje', 'Q', 'E', 'P', 'J', 'E'),
  entry('këngë', 'K', 'Ë', 'N', 'G', 'Ë'),
  entry('prind', 'P', 'R', 'I', 'N', 'D'),
  entry('banor', 'B', 'A', 'N', 'O', 'R'),
  entry('fener', 'F', 'E', 'N', 'E', 'R'),
  entry('pazar', 'P', 'A', 'Z', 'A', 'R'),
  entry('qenie', 'Q', 'E', 'N', 'I', 'E'),
];

export const WORDLE_ALLOWED: WordEntry[] = [
  ...WORDLE_ANSWERS,
  entry('qepur', 'Q', 'E', 'P', 'U', 'R'),
  entry('mbret', 'M', 'B', 'R', 'E', 'T'),
  entry('ndjek', 'N', 'D', 'J', 'E', 'K'),
  entry('mbarë', 'M', 'B', 'A', 'R', 'Ë'),
  entry('dritë', 'D', 'R', 'I', 'T', 'Ë'),
  entry('këmbë', 'K', 'Ë', 'M', 'B', 'Ë'),
  entry('shpirt', 'SH', 'P', 'I', 'R', 'T'),
  entry('shëtit', 'SH', 'Ë', 'T', 'I', 'T'),
  entry('çudit', 'Ç', 'U', 'D', 'I', 'T'),
  entry('gëzim', 'G', 'Ë', 'Z', 'I', 'M'),
  entry('gëzoj', 'G', 'Ë', 'Z', 'O', 'J'),
  entry('gjurmë', 'GJ', 'U', 'R', 'M', 'Ë'),
  entry('qeshur', 'Q', 'E', 'SH', 'U', 'R'),
  entry('shtesë', 'SH', 'T', 'E', 'S', 'Ë'),
  entry('rregull', 'RR', 'E', 'G', 'U', 'LL'),
  entry('shkurt', 'SH', 'K', 'U', 'R', 'T'),
  entry('thjesht', 'TH', 'J', 'E', 'SH', 'T'),
  entry('kthyer', 'K', 'TH', 'Y', 'E', 'R'),
  entry('kartë', 'K', 'A', 'R', 'T', 'Ë'),
  entry('kapak', 'K', 'A', 'P', 'A', 'K'),
  entry('kopsht', 'K', 'O', 'P', 'SH', 'T'),
  entry('shkëmb', 'SH', 'K', 'Ë', 'M', 'B'),
  entry('numër', 'N', 'U', 'M', 'Ë', 'R'),
  entry('besim', 'B', 'E', 'S', 'I', 'M'),
  entry('besoj', 'B', 'E', 'S', 'O', 'J'),
  entry('shkrep', 'SH', 'K', 'R', 'E', 'P'),
];
````

## `src/data/connectLetterPuzzles.ts`

````ts
import { canBuildWordFromRack, validateCuratedWord } from '../lib/albanianLetters';

export interface ConnectTarget {
  word: string;
  tokens: string[];
  clue: string;
}

export interface ConnectPuzzle {
  id: string;
  title: string;
  clue: string;
  tiles: string[];
  targets: ConnectTarget[];
}

function target(word: string, clue: string, ...tokens: string[]): ConnectTarget {
  if (!validateCuratedWord(word, tokens)) {
    throw new Error(`Tokenët nuk përputhen me fjalën e fjalorit: ${word}`);
  }
  return { word, tokens, clue };
}

function createPuzzle(
  id: string,
  title: string,
  clue: string,
  targets: ConnectTarget[],
  distractors: string[],
): ConnectPuzzle {
  const maxCounts = new Map<string, number>();
  for (const item of targets) {
    const wordCounts = new Map<string, number>();
    for (const token of item.tokens) {
      wordCounts.set(token, (wordCounts.get(token) ?? 0) + 1);
    }
    for (const [token, count] of wordCounts) {
      maxCounts.set(token, Math.max(maxCounts.get(token) ?? 0, count));
    }
  }

  const tiles = [...maxCounts].flatMap(([token, count]) => Array<string>(count).fill(token));
  tiles.push(...distractors);
  for (const item of targets) {
    if (!canBuildWordFromRack(tiles, item.tokens)) {
      throw new Error(`Pllakat nuk e përmbajnë fjalën e synuar: ${item.word}`);
    }
  }

  return { id, title, clue, tiles, targets };
}

// Headwords were checked against Fjalori i Gjuhës së Sotme Shqipe:
// https://fjalori.shkenca.org/ (checked 2026-11-23).
export const CONNECT_PUZZLES: ConnectPuzzle[] = [
  createPuzzle('fjala-shqipe', 'Fjala shqipe', 'Fjalë nga gjuha, leximi dhe shkolla.', [
    target('fjalë', 'Njësi e gjuhës që shpreh një kuptim.', 'F', 'J', 'A', 'L', 'Ë'),
    target('libër', 'Vepër me fletë të shtypura e të lidhura në një vëllim.', 'L', 'I', 'B', 'Ë', 'R'),
    target('shqip', 'Në gjuhën e shqiptarëve.', 'SH', 'Q', 'I', 'P'),
    target('shkollë', 'Vend ku zhvillohet mësimi.', 'SH', 'K', 'O', 'LL', 'Ë'),
  ], ['M', 'T', 'U', 'E', 'S']),
  createPuzzle('ne-shtepi', 'Në shtëpi', 'Gjëra dhe fjalë që lidhen me jetën e përditshme.', [
    target('shtëpi', 'Vendbanimi ku jeton një familje.', 'SH', 'T', 'Ë', 'P', 'I'),
    target('çelës', 'Mjet që përdoret për të hapur një bravë.', 'Ç', 'E', 'L', 'Ë', 'S'),
    target('dritë', 'Ajo që na lejon të shohim.', 'D', 'R', 'I', 'T', 'Ë'),
    target('lëndë', 'Material ose fushë e caktuar e dijes.', 'L', 'Ë', 'N', 'D', 'Ë'),
  ], ['A', 'K', 'M', 'O', 'U']),
  createPuzzle('njerez', 'Njerëzit', 'Fjalë për njerëzit dhe lidhjet mes tyre.', [
    target('motër', 'Vajza në lidhje me vëllanë ose motrën e saj.', 'M', 'O', 'T', 'Ë', 'R'),
    target('djalë', 'Fëmijë ose i ri i gjinisë mashkullore.', 'D', 'J', 'A', 'L', 'Ë'),
    target('prind', 'Nëna ose babai i një fëmije.', 'P', 'R', 'I', 'N', 'D'),
    target('banor', 'Njeri që jeton në një vend.', 'B', 'A', 'N', 'O', 'R'),
  ], ['E', 'G', 'K', 'S', 'U']),
  createPuzzle('gjurme-dhe-tinguj', 'Gjurmë dhe tinguj', 'Fjalë që lidhen me shenjat, tingujt dhe ndjenjat.', [
    target('qershi', 'Frut i vogël, i rrumbullakët, zakonisht i kuq.', 'Q', 'E', 'R', 'SH', 'I'),
    target('këngë', 'Krijim muzikor me zë ose fjalë.', 'K', 'Ë', 'N', 'G', 'Ë'),
    target('gjurmë', 'Shenjë që lë një këmbë ose send pas kalimit.', 'GJ', 'U', 'R', 'M', 'Ë'),
    target('shpirt', 'Ana e brendshme dhe ndjenjat e njeriut.', 'SH', 'P', 'I', 'R', 'T'),
  ], ['A', 'D', 'L', 'O', 'T']),
  createPuzzle('mesim-dhe-pune', 'Mësim dhe punë', 'Fjalë për të lexuarin, të shkruarit dhe veprimtarinë.', [
    target('mësim', 'Veprimtaria e të mësuarit; një orë mësimore.', 'M', 'Ë', 'S', 'I', 'M'),
    target('punim', 'Punë e bërë ose vepër e përgatitur.', 'P', 'U', 'N', 'I', 'M'),
    target('shkrim', 'Veprimi ose mënyra e të shkruarit.', 'SH', 'K', 'R', 'I', 'M'),
    target('lexoj', 'Marr dhe kuptoj përmbajtjen e një teksti të shkruar.', 'L', 'E', 'X', 'O', 'J'),
  ], ['A', 'D', 'Ë', 'T', 'U']),
  createPuzzle('rruges', 'Në rrugë', 'Fjalë për vendet, lëvizjen dhe afërsinë.', [
    target('qytet', 'Vendbanim i madh me rrugë, ndërtesa dhe shërbime.', 'Q', 'Y', 'T', 'E', 'T'),
    target('detar', 'Që lidhet me detin ose lundrimin.', 'D', 'E', 'T', 'A', 'R'),
    target('pranë', 'Në një largësi të vogël nga dikush a diçka.', 'P', 'R', 'A', 'N', 'Ë'),
    target('shpejt', 'Me shpejtësi të madhe; pa vonesë.', 'SH', 'P', 'E', 'J', 'T'),
  ], ['B', 'I', 'K', 'L', 'U']),
  createPuzzle('gjuha-dhe-ndjenjat', 'Gjuha dhe ndjenjat', 'Fjalë që shprehin mendime, ndjenja dhe gjendje.', [
    target('gëzim', 'Ndjenjë kënaqësie dhe hareje.', 'G', 'Ë', 'Z', 'I', 'M'),
    target('besim', 'Bindje se dikush ose diçka është e mirë dhe e vërtetë.', 'B', 'E', 'S', 'I', 'M'),
    target('mbarë', 'Që ecën mirë ose sjell përfundim të mirë.', 'M', 'B', 'A', 'R', 'Ë'),
    target('zemër', 'Organ që pompon gjakun; edhe qendër e ndjenjave.', 'Z', 'E', 'M', 'Ë', 'R'),
  ], ['D', 'H', 'L', 'N', 'T']),
  createPuzzle('fjalet-e-dites', 'Fjalët e ditës', 'Një përmbledhje e fjalëve të njohura në shqip.', [
    target('dritë', 'Ajo që na lejon të shohim.', 'D', 'R', 'I', 'T', 'Ë'),
    target('këmbë', 'Pjesë e trupit që përdoret për të ecur.', 'K', 'Ë', 'M', 'B', 'Ë'),
    target('qepje', 'Veprimi i bashkimit të copave me pe e gjilpërë.', 'Q', 'E', 'P', 'J', 'E'),
    target('thesar', 'Pasuri e çmuar ose një koleksion me vlerë.', 'TH', 'E', 'S', 'A', 'R'),
  ], ['A', 'G', 'I', 'L', 'U']),
];
````

## `src/data/wordConnectRounds.ts`

````ts
import { validateCuratedWord } from '../lib/albanianLetters';

export interface WordConnectWord {
  display: string;
  tokens: string[];
}

export interface WordConnectRound {
  id: string;
  title: string;
  letters: string[];
  words: WordConnectWord[];
}

function word(display: string, ...tokens: string[]): WordConnectWord {
  const entry = { display, tokens };
  if (!validateCuratedWord(display, tokens)) {
    throw new Error(`Tokenët nuk përputhen me fjalën e fjalorit: ${display}`);
  }
  return entry;
}

// Each listed headword was checked against Fjalori i Gjuhës së Sotme Shqipe:
// https://fjalori.shkenca.org/ (offline game data, checked 2026-11-23).
export const WORD_CONNECT_ROUNDS: WordConnectRound[] = [
  {
    id: 'fjale',
    title: 'Fjalë të vogla, kuptime të mëdha',
    letters: ['F', 'J', 'A', 'L', 'Ë'],
    words: [
      word('fjalë', 'F', 'J', 'A', 'L', 'Ë'),
      word('falë', 'F', 'A', 'L', 'Ë'),
      word('fal', 'F', 'A', 'L'),
      word('faj', 'F', 'A', 'J'),
      word('lë', 'L', 'Ë'),
    ],
  },
  {
    id: 'shtepi',
    title: 'Në shtëpi',
    letters: ['SH', 'T', 'Ë', 'P', 'I'],
    words: [
      word('shtëpi', 'SH', 'T', 'Ë', 'P', 'I'),
      word('shi', 'SH', 'I'),
      word('pi', 'P', 'I'),
      word('të', 'T', 'Ë'),
      word('ti', 'T', 'I'),
    ],
  },
  {
    id: 'shqip',
    title: 'Shqip',
    letters: ['SH', 'Q', 'I', 'P', 'E'],
    words: [
      word('shqip', 'SH', 'Q', 'I', 'P'),
      word('shi', 'SH', 'I'),
      word('pi', 'P', 'I'),
    ],
  },
  {
    id: 'liber',
    title: 'Lexim dhe mësim',
    letters: ['L', 'I', 'B', 'Ë', 'R'],
    words: [
      word('libër', 'L', 'I', 'B', 'Ë', 'R'),
      word('bëri', 'B', 'Ë', 'R', 'I'),
      word('birë', 'B', 'I', 'R', 'Ë'),
      word('lirë', 'L', 'I', 'R', 'Ë'),
      word('bir', 'B', 'I', 'R'),
      word('ri', 'R', 'I'),
      word('lë', 'L', 'Ë'),
    ],
  },
  {
    id: 'drite',
    title: 'Dritë dhe dituri',
    letters: ['D', 'R', 'I', 'T', 'Ë'],
    words: [
      word('dritë', 'D', 'R', 'I', 'T', 'Ë'),
      word('ditë', 'D', 'I', 'T', 'Ë'),
      word('tri', 'T', 'R', 'I'),
      word('ri', 'R', 'I'),
      word('di', 'D', 'I'),
      word('të', 'T', 'Ë'),
    ],
  },
  {
    id: 'are',
    title: 'Fjalë të shkurtra',
    letters: ['A', 'R', 'E', 'Ë', 'T'],
    words: [
      word('arë', 'A', 'R', 'Ë'),
      word('art', 'A', 'R', 'T'),
      word('atë', 'A', 'T', 'Ë'),
      word('erë', 'E', 'R', 'Ë'),
      word('ter', 'T', 'E', 'R'),
      word('të', 'T', 'Ë'),
    ],
  },
  {
    id: 'qershi',
    title: 'Qershi',
    letters: ['Q', 'E', 'R', 'SH', 'I'],
    words: [
      word('qershi', 'Q', 'E', 'R', 'SH', 'I'),
      word('shi', 'SH', 'I'),
      word('ri', 'R', 'I'),
    ],
  },
  {
    id: 'shpirt',
    title: 'Shpirt dhe fjalë',
    letters: ['SH', 'P', 'I', 'R', 'T'],
    words: [
      word('shpirt', 'SH', 'P', 'I', 'R', 'T'),
      word('shi', 'SH', 'I'),
      word('pi', 'P', 'I'),
      word('ri', 'R', 'I'),
    ],
  },
];
````

## `src/lib/albanianLetters.ts`

````ts
export const ALBANIAN_ALPHABET = [
  'A', 'B', 'C', 'Ç', 'D', 'DH', 'E', 'Ë', 'F', 'G', 'GJ', 'H',
  'I', 'J', 'K', 'L', 'LL', 'M', 'N', 'NJ', 'O', 'P', 'Q', 'R',
  'RR', 'S', 'SH', 'T', 'TH', 'U', 'V', 'X', 'XH', 'Y', 'Z', 'ZH',
] as const;

export const DIGRAPHS = ['DH', 'GJ', 'LL', 'NJ', 'RR', 'SH', 'TH', 'XH', 'ZH'] as const;
export const VOWELS = ['A', 'E', 'Ë', 'I', 'O', 'U', 'Y'] as const;

const ALPHABET_SET = new Set<string>(ALBANIAN_ALPHABET);
const DIGRAPH_SET = new Set<string>(DIGRAPHS);
const DIGRAPH_PREFIXES = new Set(DIGRAPHS.map((digraph) => digraph[0]));

export function normalizeAlbanian(value: string): string {
  return value.normalize('NFC').trim().toLocaleUpperCase('sq-AL').replace(/\s+/g, '');
}

export function canonicalAlbanian(value: string): string {
  return normalizeAlbanian(value);
}

export function canonicalTokenSequence(tokens: readonly string[]): string {
  return tokens.map(normalizeAlbanian).join('\u001f');
}

export function tokenizeAlbanianWord(display: string): string[] {
  const letters = Array.from(normalizeAlbanian(display));
  const tokens: string[] = [];

  for (let index = 0; index < letters.length; index += 1) {
    const pair = `${letters[index] ?? ''}${letters[index + 1] ?? ''}`;
    if (DIGRAPH_SET.has(pair)) {
      tokens.push(pair);
      index += 1;
      continue;
    }

    const letter = letters[index] ?? '';
    if (!ALPHABET_SET.has(letter)) return [];
    tokens.push(letter);
  }

  return tokens;
}

export function validateCuratedWord(display: string, tokens: readonly string[]): boolean {
  if (tokens.length === 0 || tokens.some((token) => !ALPHABET_SET.has(normalizeAlbanian(token)))) {
    return false;
  }

  return canonicalTokenSequence(tokenizeAlbanianWord(display)) === canonicalTokenSequence(tokens)
    && normalizeAlbanian(tokens.join('')) === normalizeAlbanian(display);
}

export function canBuildWordFromRack(
  rack: readonly string[],
  word: readonly string[],
): boolean {
  if (word.length === 0 || word.length > rack.length) return false;

  const available = new Map<string, number>();
  for (const token of rack) {
    const normalized = normalizeAlbanian(token);
    if (!ALPHABET_SET.has(normalized)) return false;
    available.set(normalized, (available.get(normalized) ?? 0) + 1);
  }

  for (const token of word) {
    const normalized = normalizeAlbanian(token);
    const count = available.get(normalized) ?? 0;
    if (!ALPHABET_SET.has(normalized) || count === 0) return false;
    available.set(normalized, count - 1);
  }

  return true;
}

export interface TokenInputState {
  tokens: string[];
  pending: string;
}

export function appendPhysicalLetter(
  tokens: readonly string[],
  pending: string,
  key: string,
): TokenInputState {
  const characters = Array.from(normalizeAlbanian(key));
  if (characters.length !== 1 || !ALPHABET_SET.has(characters[0] ?? '')) {
    return { tokens: [...tokens], pending };
  }

  const letter = characters[0] ?? '';
  const digraph = `${pending}${letter}`;
  if (pending && DIGRAPH_SET.has(digraph)) {
    return { tokens: [...tokens, digraph], pending: '' };
  }

  const committed = pending ? [...tokens, pending] : [...tokens];
  if (DIGRAPH_PREFIXES.has(letter)) {
    return { tokens: committed, pending: letter };
  }

  return { tokens: [...committed, letter], pending: '' };
}

export function commitPendingToken(tokens: readonly string[], pending: string): string[] {
  return pending ? [...tokens, pending] : [...tokens];
}

export function backspaceInput(tokens: readonly string[], pending: string): TokenInputState {
  if (pending) return { tokens: [...tokens], pending: '' };
  return { tokens: tokens.slice(0, -1), pending: '' };
}

export function backspaceTokens(tokens: readonly string[]): string[] {
  return tokens.slice(0, -1);
}

export function albanianLetterCount(tokens: readonly string[]): number {
  return tokens.filter(Boolean).length;
}
````

## `src/lib/wordleEvaluation.ts`

````ts
export type WordleMark = 'green' | 'yellow' | 'gray';
export type KeyboardMark = WordleMark;

export function evaluateWordle(guess: readonly string[], answer: readonly string[]): WordleMark[] {
  const marks: WordleMark[] = Array.from({ length: answer.length }, () => 'gray');
  const remaining = new Map<string, number>();

  answer.forEach((letter, index) => {
    if (guess[index] === letter) marks[index] = 'green';
    else remaining.set(letter, (remaining.get(letter) ?? 0) + 1);
  });

  guess.forEach((letter, index) => {
    if (marks[index] === 'green') return;
    const count = remaining.get(letter) ?? 0;
    if (count > 0) {
      marks[index] = 'yellow';
      remaining.set(letter, count - 1);
    }
  });
  return marks;
}

const MARK_PRIORITY: Record<WordleMark, number> = {
  gray: 0,
  yellow: 1,
  green: 2,
};

export function getKeyboardMarks(
  guesses: readonly (readonly string[])[],
  answer: readonly string[],
): Map<string, KeyboardMark> {
  const keyboard = new Map<string, KeyboardMark>();

  for (const guess of guesses) {
    evaluateWordle(guess, answer).forEach((mark, index) => {
      const token = guess[index];
      if (!token) return;
      const previous = keyboard.get(token);
      if (!previous || MARK_PRIORITY[mark] > MARK_PRIORITY[previous]) {
        keyboard.set(token, mark);
      }
    });
  }

  return keyboard;
}
````

## `src/lib/localGameStorage.ts`

````ts
export function readGameState<T>(key: string, version: number): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const value = JSON.parse(raw) as { version?: number; data?: T };
    if (value.version !== version) return null;
    return value.data ?? null;
  } catch {
    return null;
  }
}

export function writeGameState<T>(key: string, version: number, data: T): void {
  localStorage.setItem(key, JSON.stringify({ version, data }));
}
````

## `src/components/layout/PageLayout.tsx`

````tsx
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface PageLayoutProps {
  children: ReactNode;
  variant?: 'home' | 'compact';
  headerActions?: ReactNode;
  mainClassName?: string;
}

export function PageLayout({
  children,
  variant = 'compact',
  headerActions,
  mainClassName,
}: PageLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <a className="skip-link" href="#main-content">
        Kalo te përmbajtja
      </a>
      <SiteHeader variant={variant}>{headerActions}</SiteHeader>
      <main id="main-content" className={cn('flex-1', mainClassName)}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
````

## `src/components/layout/SiteHeader.tsx`

````tsx
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';
import { buttonClasses } from '../ui/buttonStyles';

interface SiteHeaderProps {
  variant?: 'home' | 'compact';
  children?: ReactNode;
}

export function SiteHeader({ variant = 'home', children }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg">
      <div className="page-container flex min-h-[68px] items-center justify-between gap-4 py-2.5">
        <Link
          to="/"
          className="rounded-lg focus-visible:outline-offset-4"
          aria-label="Shkronjat Tona — Ballina"
        >
          <BrandLogo compact={variant === 'compact'} />
        </Link>

        {variant === 'home' ? (
          <>
            <nav className="hidden items-center gap-7 md:flex" aria-label="Navigimi kryesor">
              <Link
                to="/"
                aria-current={location.pathname === '/' ? 'page' : undefined}
                className="border-b-2 border-primary pb-1 text-sm font-semibold text-ink"
              >
                Ballina
              </Link>
              <Link
                to="/lojerat"
                className="text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                Lojërat
              </Link>
              <a
                href="#si-funksionon"
                className="text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                Si funksionon
              </a>
              <a
                href="#historia"
                className="text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                Historia
              </a>
            </nav>
            <div className="hidden md:block">
              <Link to="/play" className={buttonClasses('primary', 'sm', 'gap-1.5')}>
                Fillo lojën
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-ink transition-colors hover:bg-lilac md:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Mbyll menynë' : 'Hap menynë'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </>
        ) : (
          <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">{children}</div>
        )}
      </div>

      {variant === 'home' && menuOpen && (
        <div id={menuId} className="border-t border-border bg-surface px-4 pb-5 pt-3 md:hidden">
          <nav aria-label="Navigimi në celular" className="flex flex-col gap-1">
            <Link
              to="/"
              className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink hover:bg-lilac"
              onClick={() => setMenuOpen(false)}
            >
              Ballina
            </Link>
            <Link
              to="/lojerat"
              className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink-muted hover:bg-lilac hover:text-ink"
              onClick={() => setMenuOpen(false)}
            >
              Lojërat
            </Link>
            <a
              href="#si-funksionon"
              className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink-muted hover:bg-lilac hover:text-ink"
              onClick={() => setMenuOpen(false)}
            >
              Si funksionon
            </a>
            <a
              href="#historia"
              className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink-muted hover:bg-lilac hover:text-ink"
              onClick={() => setMenuOpen(false)}
            >
              Historia
            </a>
          </nav>
          <Link
            to="/play"
            className={buttonClasses('primary', 'md', 'mt-3 w-full')}
            onClick={() => setMenuOpen(false)}
          >
            Fillo lojën
            <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      )}
    </header>
  );
}
````

## `src/components/layout/SiteFooter.tsx`

````tsx
import { Link } from 'react-router-dom';
import { BrandLogo } from '../brand/BrandLogo';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface/70">
      <div className="page-container py-9 sm:py-11">
        <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-16">
          <div>
            <Link to="/" className="inline-flex rounded-lg" aria-label="Shkronjat Tona — Ballina">
              <BrandLogo compact />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              Një lojë për Ditën e Alfabetit të Gjuhës Shqipe.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ink">
              <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
              Progresi ruhet në këtë pajisje.
            </p>
          </div>
          <div className="text-sm leading-relaxed text-ink-muted">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink">Navigimi</h2>
            <div className="mt-3 flex flex-col gap-2">
              <Link className="hover:text-primary" to="/">Ballina</Link>
              <Link className="hover:text-primary" to="/lojerat">Lojërat</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Shkronjat Tona · Festojmë gjuhën dhe alfabetin.</p>
          <p>36 shkronja. Një gjuhë. Një histori.</p>
        </div>
      </div>
    </footer>
  );
}
````

## `src/components/brand/BrandLogo.tsx`

````tsx
import { cn } from '../../lib/cn';

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/assets/shkronjat-tona-logo.svg"
      alt=""
      width={40}
      height={40}
      className={cn('size-9 flex-none sm:size-10', className)}
    />
  );
}

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <BrandMark />
      <span
        className={cn(
          'font-display font-extrabold leading-none tracking-[-0.035em] text-ink',
          compact ? 'text-[19px] sm:text-xl' : 'text-[21px] sm:text-[23px]',
        )}
      >
        Shkronjat <span className="text-primary">Tona</span>
      </span>
    </span>
  );
}
````

## `src/components/ui/buttonStyles.ts`

````ts
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'soft' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE_CLASSES =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-[14px] font-body font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-45';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-[#FFFEFC] shadow-[0_10px_24px_-16px_rgba(81,54,111,0.9)] hover:bg-primary-dark active:bg-primary-dark',
  secondary:
    'border border-border-strong bg-surface text-ink hover:border-primary/45 hover:bg-lilac',
  accent:
    'bg-accent text-[#43300D] shadow-[0_10px_24px_-16px_rgba(232,185,95,0.9)] hover:bg-[#DEAB4D]',
  soft: 'bg-primary-soft text-primary-dark hover:bg-[#E1D5EF]',
  ghost: 'bg-transparent text-ink hover:bg-surface-muted',
  danger: 'bg-danger text-[#FFFEFC] hover:bg-[#A64C4C]',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-9 rounded-xl px-3 py-2 text-sm',
  md: 'min-h-11 px-4 py-2.5 text-[15px]',
  lg: 'min-h-[52px] rounded-2xl px-6 py-3 text-base',
};

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
}
````

## `src/lib/cn.ts`

````ts
export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
````

## `src/styles/index.css`

````css
@import 'tailwindcss';
@import './tokens.css';

@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 96px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100svh;
    overflow-x: clip;
    background-color: var(--color-bg);
    background-image:
      radial-gradient(circle at 8% 2%, rgba(185, 151, 91, 0.11), transparent 26rem),
      radial-gradient(circle at 94% 10%, rgba(200, 16, 46, 0.055), transparent 30rem);
    color: var(--color-ink);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.028em;
    line-height: 1.08;
    text-wrap: balance;
  }

  p {
    margin: 0;
    text-wrap: pretty;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: var(--color-primary-soft);
    color: var(--color-primary-dark);
  }

  :focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 3px;
    border-radius: 8px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer components {
  .page-container {
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2rem);
  }

  .skip-link {
    position: fixed;
    z-index: 100;
    top: 0.75rem;
    left: 0.75rem;
    transform: translateY(-160%);
    border-radius: 10px;
    background: var(--color-primary-dark);
    padding: 0.7rem 1rem;
    color: #fffefc;
    font-weight: 700;
    text-decoration: none;
    transition: transform 160ms ease;
  }

  .skip-link:focus {
    transform: translateY(0);
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    color: var(--color-primary-dark);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    line-height: 1.2;
    text-transform: uppercase;
  }


  .surface-card {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    background: var(--color-surface);
    box-shadow: var(--shadow-soft);
  }

  .subtle-grid {
    background-image: radial-gradient(rgba(112, 80, 155, 0.16) 1px, transparent 1px);
    background-size: 18px 18px;
  }

  .confetti-piece {
    position: absolute;
    border-radius: 2px;
    opacity: 0.85;
  }

  .path-line {
    position: absolute;
    top: 50%;
    left: 8%;
    right: 8%;
    height: 2px;
    transform: translateY(-50%);
    background-image: repeating-linear-gradient(
      to right,
      var(--color-border-strong) 0,
      var(--color-border-strong) 6px,
      transparent 6px,
      transparent 12px
    );
  }

  .path-line-complete {
    background-image: none;
    background-color: var(--color-success);
    opacity: 0.55;
  }

  .chat-bubble {
    position: relative;
    border: 1px solid var(--color-border);
    border-radius: 18px;
    background: var(--color-surface);
    padding: 1rem 1.1rem;
    box-shadow: 0 10px 24px -22px rgba(48, 38, 64, 0.35);
  }

  .chat-bubble::before {
    content: '';
    position: absolute;
    left: 1.35rem;
    bottom: -7px;
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  .option-button {
    border: 1.5px solid var(--color-border);
    border-radius: 16px;
    background: var(--color-surface);
    color: var(--color-ink);
    transition:
      border-color 160ms ease,
      background-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .option-button:hover:not(:disabled) {
    border-color: rgba(112, 80, 155, 0.5);
    background: var(--color-lilac);
  }

  .option-button[data-selected='true'] {
    border-color: var(--color-primary);
    background: var(--color-primary-soft);
    box-shadow: 0 0 0 3px rgba(112, 80, 155, 0.14);
  }

  .option-button[data-correct='true'] {
    border-color: var(--color-success);
    background: var(--color-success-soft);
    box-shadow: 0 0 0 3px rgba(95, 146, 119, 0.14);
  }

  .option-button[data-incorrect='true'] {
    border-color: var(--color-danger);
    background: var(--color-danger-soft);
    box-shadow: 0 0 0 3px rgba(185, 91, 91, 0.12);
  }

  .option-button[data-dimmed='true'] {
    opacity: 0.55;
  }

  .roadmap-node {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    flex: none;
    border: 2px solid var(--color-border-strong);
    border-radius: 999px;
    background: var(--color-surface);
    color: var(--color-ink-muted);
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 800;
    line-height: 1;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background-color 160ms ease,
      color 160ms ease;
  }

  .roadmap-node:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  .roadmap-node[data-status='current'] {
    border-color: var(--color-primary-dark);
    background: var(--color-primary);
    color: #fffefc;
    box-shadow:
      0 0 0 5px var(--color-primary-soft),
      0 10px 24px -16px rgba(81, 54, 111, 0.8);
  }

  .roadmap-node[data-status='completed'] {
    border-color: var(--color-success);
    background: var(--color-success);
    color: #fffefc;
  }

  .roadmap-node[data-status='locked'] {
    border-color: var(--color-border);
    background: var(--color-surface-muted);
    color: #a59cae;
  }

  .dialogue-option {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    width: 100%;
    border: 1.5px solid var(--color-border);
    border-radius: 16px;
    background: var(--color-surface);
    padding: 0.95rem 1rem;
    text-align: left;
    transition:
      border-color 160ms ease,
      background-color 160ms ease;
  }

  .dialogue-option:hover:not(:disabled) {
    border-color: rgba(112, 80, 155, 0.5);
    background: var(--color-lilac);
  }

  .dialogue-option[data-selected='true'] {
    border-color: var(--color-primary);
    background: var(--color-primary-soft);
  }

  .dialogue-option[data-correct='true'] {
    border-color: var(--color-success);
    background: var(--color-success-soft);
  }

  .dialogue-option[data-incorrect='true'] {
    border-color: var(--color-danger);
    background: var(--color-danger-soft);
  }
}

@media (max-width: 767px) {
  .roadmap-node {
    width: 44px;
    height: 44px;
    font-size: 0.9rem;
  }
}
````

## `src/styles/tokens.css`

````css
@theme {
  --font-display: "Nunito Sans", "Avenir Next", "Segoe UI", sans-serif;
  --font-body: "DM Sans", "Avenir Next", "Segoe UI", sans-serif;

  --color-bg: #f7f3ec;
  --color-surface: #ffffff;
  --color-surface-muted: #f1ede5;
  --color-ink: #171717;
  --color-ink-muted: #77736d;
  --color-primary: #c8102e;
  --color-primary-dark: #9f0d25;
  --color-primary-soft: #f7e6ea;
  --color-accent: #b9975b;
  --color-accent-soft: #f3ead7;
  --color-success: #4f8065;
  --color-success-soft: #e4f0e8;
  --color-danger: #a52b38;
  --color-danger-soft: #f8e8e6;
  --color-border: #e6ded2;
  --color-border-strong: #d2c7b6;
  --color-lilac: #f8ecef;
  --color-cream: #fbf3e4;
  --color-mint: #edf3ef;
  --color-gold-ink: #74591f;

  --radius-card: 26px;
  --radius-panel: 20px;
  --radius-control: 14px;

  --shadow-soft: 0 18px 45px -32px rgba(48, 38, 64, 0.42);
  --shadow-lifted: 0 26px 60px -40px rgba(48, 38, 64, 0.55);
}

:root {
  --focus-ring: #3c2b56;
  --shadow-button: 0 10px 24px -14px rgba(81, 54, 111, 0.7);
  color-scheme: light;
}
````

## `public/assets/shkronjat-tona-logo.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 64" role="img" aria-labelledby="title desc">
  <title id="title">Shkronjat Tona</title>
  <desc id="desc">Simbol i hapur libri në kuq dhe të zezë me emrin e faqes</desc>
  <g fill="none" stroke-linejoin="round">
    <path d="M8 18c11-7 22-7 31 0v34c-10-7-21-7-31 0V18Z" fill="#B5122A" stroke="#B5122A" stroke-width="3"/>
    <path d="M39 18c9-7 20-7 31 0v34c-11-7-22-7-31 0V18Z" fill="#181818" stroke="#181818" stroke-width="3"/>
    <path d="M39 18v34" stroke="#F7F4EF" stroke-width="2"/>
  </g>
  <text x="82" y="42" font-family="Nunito Sans,Arial,sans-serif" font-size="24" font-weight="800" fill="#181818">Shkronjat</text>
  <text x="190" y="42" font-family="Nunito Sans,Arial,sans-serif" font-size="24" font-weight="800" fill="#B5122A">Tona</text>
</svg>
````

## `package.json`

````json
{
  "name": "shkronjat-tona",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "Shkronjat Tona — një lojë interaktive për Ditën e Alfabetit.",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit --pretty",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
  },
  "dependencies": {
    "@fontsource/dm-sans": "^5.3.0",
    "@fontsource/nunito-sans": "^5.3.0",
    "lucide-react": "^1.72.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-router-dom": "^7.18.5"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@playwright/test": "^1.65.0",
    "@tailwindcss/vite": "^4.3.5",
    "@types/node": "^26.6.6",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.3.0",
    "eslint": "^10.14.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.7",
    "globals": "^17.14.0",
    "jsdom": "^31.0.0",
    "tailwindcss": "^4.3.5",
    "typescript": "^6.0.3",
    "typescript-eslint": "^8.72.2",
    "vite": "^8.3.8",
    "vitest": "^5.1.0"
  }
}
````
