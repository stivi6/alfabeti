import { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Home,
  LockKeyhole,
  RotateCcw,
  Star,
  Trophy,
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { getExercise } from '../data/exercises';
import { useGameProgress } from '../hooks/useGameProgress';
import { cn } from '../lib/cn';
import { getCompletedCount, getCurrentExerciseId, isGameComplete } from '../lib/progress';
import { calculateGameResults } from '../lib/scoring';
import { RoadmapChapter } from '../components/game/RoadmapChapter';
import { PageLayout } from '../components/layout/PageLayout';
import { buttonClasses } from '../components/ui/buttonStyles';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { ProgressBar } from '../components/ui/ProgressBar';

export function RoadmapPage() {
  const { progress, resetGameProgress } = useGameProgress();
  const location = useLocation();
  const [resetOpen, setResetOpen] = useState(false);
  const completedCount = getCompletedCount(progress);
  const complete = isGameComplete(progress);
  const currentId = getCurrentExerciseId(progress);
  const currentExercise = currentId ? getExercise(currentId) : undefined;
  const results = calculateGameResults(progress);
  const notice = (location.state as { notice?: string } | null)?.notice;

  const closeReset = useCallback(() => setResetOpen(false), []);
  const confirmReset = useCallback(() => {
    resetGameProgress();
    setResetOpen(false);
  }, [resetGameProgress]);

  const homeAction = (
    <Link
      to="/"
      className={buttonClasses('secondary', 'sm', 'gap-1.5')}
      aria-label="Kthehu te Ballina"
    >
      <Home size={16} strokeWidth={2} aria-hidden="true" />
      <span className="hidden sm:inline">Ballina</span>
    </Link>
  );

  return (
    <PageLayout headerActions={homeAction}>
      <section className="relative overflow-hidden pb-8 pt-9 sm:pb-10 sm:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-16 size-72 rounded-full bg-accent-soft/65 blur-2xl"
        />
        <div className="page-container relative">
          {notice && (
            <div
              role="status"
              className="mb-6 rounded-2xl border border-accent/50 bg-accent-soft px-4 py-3 text-sm font-medium text-gold-ink"
            >
              {notice}
            </div>
          )}

          <div className="grid items-end gap-7 lg:grid-cols-[1fr_360px] lg:gap-12">
            <div>
              <p className="eyebrow">Rrugëtimi yt</p>
              <h1 className="mt-3 text-[clamp(2.3rem,5vw,3.6rem)] text-ink">
                Rrugëtimi yt nëpër shqip
              </h1>
              <p className="mt-4 max-w-[600px] text-[15px] leading-relaxed text-ink-muted sm:text-lg">
                Dy kuize dhe lojërat me fjalë. Zgjidh një sfidë dhe provo çfarë di.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="flex size-5 items-center justify-center rounded-full bg-success text-[#FFFEFC]">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  E përfunduar
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-5 rounded-full border-[3px] border-primary bg-primary-soft" />
                  Aktive
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="flex size-5 items-center justify-center rounded-full bg-surface-muted text-ink-muted">
                    <LockKeyhole size={11} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  E kyçur
                </span>
              </div>
            </div>

            <div className="rounded-[24px] border border-border bg-surface p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-gold-ink">
                    <Star size={18} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-extrabold leading-none text-ink">
                      {completedCount} / 10 sfida
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-ink-muted">të përfunduara</p>
                  </div>
                </div>
                {completedCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setResetOpen(true)}
                    className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-ink-muted transition-colors hover:bg-danger-soft hover:text-danger"
                  >
                    <RotateCcw size={13} strokeWidth={2.2} aria-hidden="true" />
                    Rivendos progresin
                  </button>
                )}
              </div>

              <ProgressBar
                value={completedCount}
                max={10}
                label="Progresi i përgjithshëm"
                size="md"
                className="mt-4"
                valueText={`${completedCount} nga 10 sfidat të përfunduara`}
              />

              {complete ? (
                <Link
                  to="/results"
                  className={buttonClasses('primary', 'md', 'mt-5 w-full gap-2')}
                >
                  <Trophy size={17} strokeWidth={2} aria-hidden="true" />
                  Shiko rezultatin
                </Link>
              ) : currentExercise ? (
                <Link
                  to={`/play/${currentExercise.id}`}
                  className={buttonClasses('primary', 'md', 'mt-5 w-full')}
                >
                  Vazhdoni: {currentExercise.title}
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
              ) : null}

              <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-muted">
                Progresi ruhet automatikisht në këtë pajisje.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Lojërat" className="pb-8">
        <div className="page-container space-y-4 sm:space-y-5">
          {CHAPTERS.map((chapter, index) => (
            <RoadmapChapter
              key={chapter.id}
              chapter={chapter}
              progress={progress}
              previousChapterTitle={CHAPTERS[index - 1]?.title}
            />
          ))}
        </div>
      </section>

      <section className="pb-16 pt-3 sm:pb-20">
        <div className="page-container">
          <div
            className={cn(
              'relative overflow-hidden rounded-[26px] border p-6 sm:p-8',
              complete
                ? 'border-primary-dark bg-primary-dark text-[#FFFEFC]'
                : 'border-border bg-accent-soft/75',
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                'absolute -right-12 -top-16 size-48 rounded-full border-[24px]',
                complete ? 'border-white/10' : 'border-accent/30',
              )}
            />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span
                  className={cn(
                    'flex size-12 flex-none items-center justify-center rounded-2xl',
                    complete ? 'bg-white/12 text-accent' : 'bg-surface text-primary',
                  )}
                >
                  <Trophy size={24} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div>
                  <h2
                    className={cn(
                      'text-xl sm:text-2xl',
                      complete ? 'text-[#FFFEFC]' : 'text-ink',
                    )}
                  >
                    {complete ? 'Të gjitha sfidat u përfunduan.' : 'Rezultati përfundimtar po të pret.'}
                  </h2>
                  <p
                    className={cn(
                      'mt-1.5 max-w-xl text-sm leading-relaxed',
                      complete ? 'text-primary-soft' : 'text-ink-muted',
                    )}
                  >
                    {complete
                      ? `Përfundove të 10 sfidat me ${results.totalCorrect} përgjigje të sakta. Shiko rezultatin dhe përmbledhjen.`
                      : `Përfundo të 10 sfidat për të parë pikët dhe përmbledhjen. Të mbeten ${10 - completedCount} sfida.`}
                  </p>
                </div>
              </div>

              {complete ? (
                <Link
                  to="/results"
                  className={buttonClasses('accent', 'md', 'w-full shrink-0 gap-2 sm:w-auto')}
                >
                  Shiko rezultatin
                  <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-surface/85 px-4 py-2 text-xs font-bold text-ink">
                  <Star size={14} className="text-accent" aria-hidden="true" />
                  {completedCount} / 10 të përfunduara
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <ConfirmDialog
        open={resetOpen}
        title="Të rivendoset progresi?"
        confirmLabel="Rivendos progresin"
        tone="danger"
        onCancel={closeReset}
        onConfirm={confirmReset}
      >
        Kjo fshin të gjitha sfidat e përfunduara dhe pikët e ruajtura në këtë pajisje. Nuk mund të zhbëhet.
      </ConfirmDialog>
    </PageLayout>
  );
}
