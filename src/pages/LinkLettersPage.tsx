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
