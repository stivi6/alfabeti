import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { ALBANIAN_ALPHABET, backspaceTokens, canonicalAlbanian } from '../lib/albanianLetters';
import { evaluateWordle, type WordleMark } from '../lib/wordleEvaluation';
import { readGameState, writeGameState } from '../lib/localGameStorage';
import { WORDLE_ALLOWED, WORDLE_ANSWERS } from '../data/wordleWords';

const KEY = 'shkronjat-tona-wordle-v1';
interface SavedWordle { answerIndex: number; guesses: string[][]; revealed: boolean[]; status: 'active'|'won'|'lost'; }

function rowMarks(guess: string[], answer: string[]): WordleMark[] { return evaluateWordle(guess, answer); }

export function WordlePage() {
  const [state, setState] = useState<SavedWordle>(() => readGameState<SavedWordle>(KEY, 1) ?? createRound());
  const [current, setCurrent] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const typedBuffer = useRef('');

  const answer = WORDLE_ANSWERS[state.answerIndex]?.tokens ?? WORDLE_ANSWERS[0]!.tokens;
  const answerDisplay = WORDLE_ANSWERS[state.answerIndex]?.display ?? WORDLE_ANSWERS[0]!.display;

  useEffect(() => writeGameState(KEY, 1, state), [state]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (state.status !== 'active') return;
      if (event.key === 'Enter') { void submitGuess(); return; }
      if (event.key === 'Backspace') { setCurrent((value) => backspaceTokens(value)); return; }
      const typed = event.key.normalize('NFC').toLocaleUpperCase('sq-AL');
      if (!/^[A-Za-zÇËçë]+$/.test(typed)) return;
      typedBuffer.current = (typedBuffer.current + typed).slice(-2);
      const digraph = typedBuffer.current;
      if (['DH','GJ','LL','NJ','RR','SH','TH','XH','ZH'].includes(digraph)) {
        addToken(digraph);
        typedBuffer.current = '';
        return;
      }
      if (typed.length === 1 && ALBANIAN_ALPHABET.includes(typed as never)) addToken(typed);
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  });

  function createRound(): SavedWordle {
    const index = Math.floor(Math.random() * WORDLE_ANSWERS.length);
    return { answerIndex: index, guesses: [], revealed: Array(5).fill(false), status: 'active' };
  }

  function newRound() {
    let next = Math.floor(Math.random() * WORDLE_ANSWERS.length);
    if (WORDLE_ANSWERS.length > 1) while (next === state.answerIndex) next = Math.floor(Math.random() * WORDLE_ANSWERS.length);
    setState({ answerIndex: next, guesses: [], revealed: Array(5).fill(false), status: 'active' });
    setCurrent([]); setMessage('');
  }

  function addToken(token: string) {
    if (state.status !== 'active' || current.length >= 5) return;
    setCurrent((value) => [...value, token]);
  }

  function submitGuess() {
    if (state.status !== 'active') return;
    if (current.length !== 5) { setMessage('Plotëso pesë vendet me shkronja.'); return; }
    const joined = canonicalAlbanian(current.join(''));
    const accepted = WORDLE_ALLOWED.some((entry) => canonicalAlbanian(entry.tokens.join('')) === joined);
    if (!accepted) { setMessage('Kjo fjalë nuk gjendet në listën e pranueshme.'); return; }

    const marks = rowMarks(current, answer);
    const revealed = [...state.revealed];
    marks.forEach((mark, index) => { if (mark === 'green') revealed[index] = true; });
    const guesses = [...state.guesses, [...current]];
    const won = marks.every((mark) => mark === 'green');
    const lost = !won && guesses.length >= 6;
    setState({ ...state, guesses, revealed, status: won ? 'won' : lost ? 'lost' : 'active' });
    setCurrent([]);
    setMessage(won ? 'Urime! E gjetët fjalën.' : lost ? 'Raundi përfundoi.' : '');
  }

  return (
    <PageLayout>
      <section className="pb-16 pt-8">
        <div className="page-container max-w-[720px]">
          <Link to="/lojerat" className="inline-flex items-center gap-2 text-sm font-bold text-primary-dark"><ArrowLeft size={16}/> Kthehu te lojërat</Link>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div><p className="eyebrow">Fjalët me pesë shkronja</p><h1 className="mt-2 text-[clamp(2.2rem,5vw,3.4rem)]">Wordle Shqip</h1></div>
            <button type="button" onClick={newRound} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 font-bold"><RotateCcw size={16}/>Fjalë e re</button>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
            <p className="text-center text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Fjala e fshehur</p>
            <div className="mt-3 flex justify-center gap-2" aria-label="Vendosjet e fjalës së fshehur">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} data-testid={`wordle-reveal-${index}`} className={`grid size-12 place-items-center rounded-xl border-2 text-xl font-extrabold sm:size-14 ${state.status !== 'active' || state.revealed[index] ? 'border-success bg-success-soft text-success' : 'border-border bg-bg text-ink-muted'}`}>
                  {state.status !== 'active' || state.revealed[index] ? answer[index] : '□'}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {Array.from({ length: 6 }).map((_, rowIndex) => {
              const guess = state.guesses[rowIndex] ?? (rowIndex === state.guesses.length ? current : []);
              const marks = rowIndex < state.guesses.length ? rowMarks(state.guesses[rowIndex] ?? [], answer) : [];
              return (
                <div key={rowIndex} className="grid grid-cols-5 gap-2" aria-label={`Rreshti ${rowIndex + 1}`}>
                  {Array.from({ length: 5 }).map((__, colIndex) => {
                    const mark = marks[colIndex];
                    const style = mark === 'green' ? 'border-success bg-success text-white' : mark === 'yellow' ? 'border-accent bg-accent text-ink' : mark === 'gray' ? 'border-charcoal bg-charcoal text-white' : 'border-border bg-surface';
                    return <span key={colIndex} className={`grid aspect-square max-h-[70px] place-items-center rounded-xl border-2 text-xl font-extrabold ${style}`                    }>{guess[colIndex] ?? ''}</span>;
                  })}
                </div>
              );
            })}
          </div>

          {message && <p role="status" className="mt-4 text-center font-bold text-primary-dark">{message}</p>}
          {state.status !== 'active' && <div className="mt-4 rounded-2xl bg-primary-soft p-4 text-center"><p className="font-bold text-primary-dark">{state.status === 'won' ? 'Fjala u gjet!' : `Fjala ishte ${answerDisplay}.`}</p></div>}

          <div className="mt-6 grid grid-cols-9 gap-1.5 sm:grid-cols-12" aria-label="Shkronjat shqipe">
            {ALBANIAN_ALPHABET.map((token) => (
              <button key={token} type="button" onClick={() => addToken(token)} disabled={state.status !== 'active'} className="min-h-11 rounded-lg border border-border bg-surface px-1 text-sm font-extrabold hover:border-primary disabled:opacity-50">{token}</button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => setCurrent((value) => backspaceTokens(value))} disabled={state.status !== 'active'} className="min-h-12 flex-1 rounded-xl border border-border bg-surface font-bold">Fshi</button>
            <button type="button" onClick={submitGuess} disabled={state.status !== 'active'} className="min-h-12 flex-[2] rounded-xl bg-primary px-5 font-bold text-white disabled:opacity-50">Kontrollo</button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
