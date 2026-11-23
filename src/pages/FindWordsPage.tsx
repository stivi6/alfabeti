import { useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LetterConnectBoard } from '../components/game/LetterConnectBoard';
import { PageLayout } from '../components/layout/PageLayout';
import { WORD_CONNECT_ROUNDS } from '../data/wordConnectRounds';
import {
  canBuildWordFromRack,
  canonicalTokenSequence,
  sameTokenInventory,
} from '../lib/albanianLetters';
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

function isSavedRound(value: WordConnectState | null): value is WordConnectState {
  if (!value) return false;
  const round = WORD_CONNECT_ROUNDS.find((item) => item.id === value.roundId);
  return Boolean(
    round
      && Array.isArray(value.letters)
      && value.letters.length === 5
      && value.letters.every((letter) => typeof letter === 'string')
      && sameTokenInventory(value.letters, round.letters)
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
