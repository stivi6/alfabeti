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
