import { useCallback, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Chapter, Exercise } from '../exercises/types';
import type { PromptOutcome } from '../lib/types';
import { getChapter } from '../data/chapters';
import { getExercise } from '../data/exercises';
import { getExerciseStatus } from '../lib/progress';
import { useGameProgress } from '../hooks/useGameProgress';
import { ExerciseHeader } from '../components/game/ExerciseHeader';
import { ExerciseSummary } from '../components/game/ExerciseSummary';
import { PageLayout } from '../components/layout/PageLayout';
import { buttonClasses } from '../components/ui/buttonStyles';
import { ExerciseRenderer } from '../exercises/ExerciseRenderer';
import { NotFoundPage } from './NotFoundPage';

export function ExercisePage() {
  const { exerciseId } = useParams();
  const { progress } = useGameProgress();
  const exercise = exerciseId ? getExercise(exerciseId) : undefined;
  const chapter = exercise ? getChapter(exercise.chapterId) : undefined;

  if (!exercise || !chapter) {
    return <NotFoundPage />;
  }

  const status = getExerciseStatus(exercise.id, progress);

  if (status === 'locked') {
    return (
      <Navigate
        to="/play"
        replace
        state={{
          notice: `“${exercise.title}” është ende e kyçur. Përfundo fillimisht sfidën e mëparshme.`,
        }}
      />
    );
  }

  return <ExerciseSession key={exercise.id} exercise={exercise} chapter={chapter} />;
}

function ExerciseSession({ exercise, chapter }: { exercise: Exercise; chapter: Chapter }) {
  const { progress, finishExerciseAttempt } = useGameProgress();
  const [attemptOutcomes, setAttemptOutcomes] = useState<PromptOutcome[] | null>(null);
  const recordedRef = useRef(false);
  const record = progress.exercises[exercise.id];

  const handleComplete = useCallback(
    (outcomes: PromptOutcome[]) => {
      if (recordedRef.current) {
        return;
      }
      recordedRef.current = true;
      finishExerciseAttempt(exercise.id, outcomes);
      setAttemptOutcomes(outcomes);
      window.scrollTo(0, 0);
    },
    [exercise.id, finishExerciseAttempt],
  );

  const headerAction = (
    <Link
      to="/play"
      className={buttonClasses('secondary', 'sm', 'gap-1.5')}
      aria-label="Kthehu te lojërat"
    >
      <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
      <span className="hidden sm:inline">Roadmap</span>
    </Link>
  );

  return (
    <PageLayout headerActions={headerAction}>
      <section className="relative overflow-hidden pb-14 pt-8 sm:pt-11">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-6 hidden size-72 rounded-full bg-accent-soft/55 blur-2xl lg:block"
        />

        <div className="page-container relative max-w-[1020px]">
          <ExerciseHeader
            exercise={exercise}
            chapter={chapter}
            bestCorrect={record?.completed ? record.bestCorrect : undefined}
          />

          <div className="surface-card mt-6 p-5 sm:mt-7 sm:p-7 lg:p-9">
            {attemptOutcomes ? (
              <ExerciseSummary exercise={exercise} outcomes={attemptOutcomes} />
            ) : (
              <ExerciseRenderer exercise={exercise} onComplete={handleComplete} />
            )}
          </div>

          <p className="mt-4 text-center text-xs leading-relaxed text-ink-muted">
            Pa kohëmatës. Rezultati yt më i mirë ruhet automatikisht në këtë pajisje.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
