import { Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Lightbulb,
  X,
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { getExercise } from '../data/exercises';
import type { Exercise, Prompt } from '../exercises/types';
import { useGameProgress } from '../hooks/useGameProgress';
import { getCorrectAnswerText, getPromptQuestion } from '../lib/evaluation';
import { calculateGameResults } from '../lib/scoring';
import { PageLayout } from '../components/layout/PageLayout';
import { Badge } from '../components/ui/Badge';
import { buttonClasses } from '../components/ui/buttonStyles';

interface Mistake {
  prompt: Prompt;
  answer: string;
  correctAnswer: string;
  question: string;
}

interface ExerciseMistakes {
  exercise: Exercise;
  mistakes: Mistake[];
}

interface ChapterMistakes {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  exercises: ExerciseMistakes[];
}

function getReviewQuestion(prompt: Prompt): string {
  if (prompt.kind === 'sentence') {
    return prompt.translation ? `Formo fjalinë: ${prompt.translation}` : prompt.question;
  }
  return getPromptQuestion(prompt);
}

export function ReviewPage() {
  const { progress } = useGameProgress();
  const results = calculateGameResults(progress);

  if (!results.complete) {
    return <Navigate to="/results" replace />;
  }

  const groups: ChapterMistakes[] = [];

  for (const chapter of CHAPTERS) {
    const exerciseGroups: ExerciseMistakes[] = [];

    for (const exerciseId of chapter.exerciseIds) {
      const exercise = getExercise(exerciseId);
      const record = progress.exercises[exerciseId];
      if (!exercise || !record?.completed) {
        continue;
      }

      const mistakes: Mistake[] = [];
      for (const prompt of exercise.prompts) {
        const stored = record.bestPromptResults[prompt.id];
        if (stored?.correct !== false) {
          continue;
        }

        mistakes.push({
          prompt,
          answer: stored.answer,
          correctAnswer: getCorrectAnswerText(prompt),
          question: getReviewQuestion(prompt),
        });
      }

      if (mistakes.length > 0) {
        exerciseGroups.push({ exercise, mistakes });
      }
    }

    if (exerciseGroups.length > 0) {
      groups.push({
        chapterId: chapter.id,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
        exercises: exerciseGroups,
      });
    }
  }

  const totalMistakes = groups.reduce(
    (total, group) =>
      total + group.exercises.reduce((subtotal, item) => subtotal + item.mistakes.length, 0),
    0,
  );
  const perfect = results.totalCorrect === results.maximum;
  const detailsIncomplete = !perfect && totalMistakes === 0;

  const headerAction = (
    <Link
      to="/results"
      className={buttonClasses('secondary', 'sm', 'gap-1.5')}
      aria-label="Kthehu te rezultatet"
    >
      <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
      <span className="hidden sm:inline">Rezultatet</span>
    </Link>
  );

  return (
    <PageLayout headerActions={headerAction}>
      <section className="pb-14 pt-9 sm:pt-12">
        <div className="page-container max-w-[980px]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">Rishikim i detajuar</p>
            {totalMistakes > 0 ? (
              <Badge tone="danger">
                {totalMistakes} pyetje për t’u rishikuar
              </Badge>
            ) : null}
          </div>

          <h1 className="mt-3 text-[clamp(2.3rem,5vw,3.4rem)] text-ink">Rishiko gabimet</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
            Këtu përdoret rezultati yt më i mirë i ruajtur. Shiko çfarë zgjidhe, krahasoje me
            përgjigjen e saktë dhe lexoji shpjegimin.
          </p>

          {totalMistakes === 0 ? (
            <div className="surface-card mt-8 p-7 text-center sm:p-10">
              <span
                aria-hidden="true"
                className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-success-soft text-success"
              >
                <CheckCircle2 size={34} strokeWidth={2} />
              </span>
              <h2 className="mt-5 text-[clamp(1.6rem,4vw,2.1rem)] text-ink">
                {perfect
                  ? 'Rezultat i plotë — përgjigje të sakta në të gjitha sfidat.'
                  : 'Nuk ka gabime të regjistruara për rishikim.'}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">
                {perfect
                  ? 'Nuk ka gabime për korrigjim. Përgjigje të sakta në të 10 sfidat.'
                  : 'Disa të dhëna të ruajtura nuk janë të plota. Luaj përsëri një sfidë për të freskuar rishikimin.'}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/results" className={buttonClasses('primary', 'md', 'w-full sm:w-auto')}>
                  Kthehu te rezultatet
                </Link>
                <Link
                  to="/play"
                  className={buttonClasses('secondary', 'md', 'w-full sm:w-auto')}
                >
                  Kthehu te lojërat
                </Link>
              </div>
              {detailsIncomplete ? (
                <p className="mt-4 text-xs text-ink-muted">
                  Këshillë: luaje përsëri sfidën për të freskuar detajet e rishikimit.
                </p>
              ) : null}
            </div>
          ) : (
            <div className="mt-8 space-y-9">
              {groups.map((group) => (
                <section key={group.chapterId} aria-labelledby={`review-${group.chapterId}`}>
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 flex-none items-center justify-center rounded-full bg-primary-soft font-display text-sm font-extrabold text-primary-dark">
                      {group.chapterNumber}
                    </span>
                    <h2 id={`review-${group.chapterId}`} className="text-2xl text-ink">
                      Loja {group.chapterNumber} — {group.chapterTitle}
                    </h2>
                  </div>

                  <div className="mt-4 space-y-4">
                    {group.exercises.map(({ exercise, mistakes }) => (
                      <article
                        key={exercise.id}
                        className="rounded-[22px] border border-border bg-surface p-4 shadow-soft sm:p-6"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/80 pb-3">
                          <h3 className="text-lg text-ink">{exercise.title}</h3>
                          <p className="text-xs font-semibold text-ink-muted">
                            {mistakes.length} pyetje për t’u rishikuar
                          </p>
                        </div>

                        <ul className="mt-4 space-y-4">
                          {mistakes.map((mistake) => (
                            <li key={mistake.prompt.id} className="rounded-2xl bg-bg/70 p-4 sm:p-5">
                              <p className="font-display text-[17px] font-bold leading-snug text-ink">
                                {mistake.question}
                              </p>

                              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                                <div className="rounded-xl border border-danger/25 bg-danger-soft px-3.5 py-2.5">
                                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8B3F3F]">
                                    <X size={12} strokeWidth={3} aria-hidden="true" />
                                    Përgjigjja jote
                                  </p>
                                  <p className="mt-1 text-sm font-medium leading-relaxed text-[#7A3838]">
                                    {mistake.answer || 'Nuk u regjistrua përgjigje.'}
                                  </p>
                                </div>
                                <div className="rounded-xl border border-success/25 bg-success-soft px-3.5 py-2.5">
                                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#3E6B54]">
                                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                                    Përgjigjja e saktë
                                  </p>
                                  <p className="mt-1 text-sm font-medium leading-relaxed text-[#335B45]">
                                    {mistake.correctAnswer}
                                  </p>
                                </div>
                              </div>

                              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
                                <Lightbulb
                                  size={15}
                                  strokeWidth={2}
                                  className="mt-0.5 shrink-0 text-accent"
                                  aria-hidden="true"
                                />
                                {mistake.prompt.explanation}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          <div className="mt-9 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
            <Link
              to="/results"
              className={buttonClasses('primary', 'md', 'w-full sm:w-auto')}
            >
              <ArrowLeft size={17} strokeWidth={2} aria-hidden="true" />
              Kthehu te rezultatet
            </Link>
            <Link
              to="/play"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg text-sm font-bold text-primary-dark hover:text-primary"
            >
              Kthehu te lojërat
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
