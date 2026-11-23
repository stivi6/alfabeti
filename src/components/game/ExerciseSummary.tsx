import { Link } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2, Trophy, X } from 'lucide-react';
import type { Exercise } from '../../exercises/types';
import type { PromptOutcome } from '../../lib/types';
import { getExercise } from '../../data/exercises';
import { getNextExerciseId } from '../../lib/progress';
import { getExerciseEncouragement } from '../../lib/scoring';
import { useGameProgress } from '../../hooks/useGameProgress';
import { getPromptQuestion } from '../../lib/evaluation';
import { buttonClasses } from '../ui/buttonStyles';
import { cn } from '../../lib/cn';

interface ExerciseSummaryProps {
  exercise: Exercise;
  outcomes: PromptOutcome[];
}

function getSummaryPromptLabel(exercise: Exercise, index: number): string {
  const prompt = exercise.prompts[index];
  if (!prompt) {
    return '';
  }
  if (prompt.kind === 'sentence') {
    return prompt.translation ? `Formo fjalinë: ${prompt.translation}` : prompt.question;
  }
  return getPromptQuestion(prompt);
}

export function ExerciseSummary({ exercise, outcomes }: ExerciseSummaryProps) {
  const { progress } = useGameProgress();
  const nextId = getNextExerciseId(exercise.id);
  const nextExercise = nextId ? getExercise(nextId) : undefined;
  const record = progress.exercises[exercise.id];
  const attemptCorrect = outcomes.filter((outcome) => outcome.correct).length;
  const bestCorrect = record?.bestCorrect ?? attemptCorrect;

  return (
    <div>
      <div className="text-center" role="status">
        <span
          aria-hidden="true"
          className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-success-soft text-success"
        >
          <CheckCircle2 size={30} strokeWidth={2} />
        </span>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
          Sfida u përfundua
        </p>
        <p className="mt-2 font-display text-[clamp(2.4rem,7vw,3.4rem)] font-extrabold leading-none text-ink">
          {attemptCorrect} <span className="text-ink-muted/60">/</span> {exercise.prompts.length}
          <span className="ml-2 align-middle text-base font-bold text-ink-muted">të sakta</span>
        </p>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
          {getExerciseEncouragement(attemptCorrect)}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-primary-dark">
            Rezultati më i mirë: {bestCorrect} / {exercise.prompts.length}
          </span>
          {bestCorrect > attemptCorrect ? (
            <span className="rounded-full bg-surface-muted px-3 py-1 text-ink-muted">
              Rezultati yt më i mirë më parë ruhet ende
            </span>
          ) : null}
        </div>
      </div>

      <ul className="mt-7 divide-y divide-border/80 overflow-hidden rounded-2xl border border-border bg-surface">
        {exercise.prompts.map((prompt, index) => {
          const outcome = outcomes.find((item) => item.promptId === prompt.id);
          const correct = outcome?.correct === true;

          return (
            <li key={prompt.id} className="flex items-start gap-3 px-4 py-3 sm:px-5">
              <span
                aria-hidden="true"
                className={cn(
                  'mt-0.5 flex size-6 flex-none items-center justify-center rounded-full text-[#FFFEFC]',
                  correct ? 'bg-success' : 'bg-danger',
                )}
              >
                {correct ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <X size={14} strokeWidth={3} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug text-ink">
                  {getSummaryPromptLabel(exercise, index)}
                </p>
                <p
                  className={cn(
                    'mt-0.5 text-xs font-medium',
                    correct ? 'text-[#3E6B54]' : 'text-[#8B3F3F]',
                  )}
                >
                  {                  correct ? 'Saktë' : 'Për rishikim'}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {nextExercise ? (
          <Link
            to={`/play/${nextExercise.id}`}
            className={buttonClasses('primary', 'lg', 'group w-full sm:w-auto')}
          >
            Sfida tjetër
            <ArrowRight
              size={18}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        ) : (
          <Link to="/results" className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
            <Trophy size={18} strokeWidth={2} aria-hidden="true" />
            Shiko rezultatin
          </Link>
        )}
        <Link
          to="/play"
          className={buttonClasses('secondary', 'lg', 'w-full sm:w-auto')}
        >
          Kthehu te lojërat
        </Link>
      </div>

      {nextExercise ? (
        <p className="mt-4 text-center text-xs leading-relaxed text-ink-muted">
          Tjetra: {nextExercise.title} · progresi ruhet automatikisht
        </p>
      ) : (
        <p className="mt-4 text-center text-xs leading-relaxed text-ink-muted">
          Të gjitha 10 sfidat u përfunduan. Rezultati yt është gati.
        </p>
      )}
    </div>
  );
}
