import { useCallback, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CircleHelp, RotateCcw, Star, Trophy } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { useGameProgress } from '../hooks/useGameProgress';
import { calculateGameResults, MAX_TOTAL_CORRECT } from '../lib/scoring';
import { CHAPTER_THEME } from '../components/game/chapterTheme';
import { PageLayout } from '../components/layout/PageLayout';
import { Badge } from '../components/ui/Badge';
import { buttonClasses } from '../components/ui/buttonStyles';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { ProgressBar } from '../components/ui/ProgressBar';
import { cn } from '../lib/cn';

const TONES = ['primary', 'accent', 'success'] as const;

export function ResultsPage() {
  const { progress, resetGameProgress } = useGameProgress();
  const navigate = useNavigate();
  const [playAgainOpen, setPlayAgainOpen] = useState(false);
  const [startingNewGame, setStartingNewGame] = useState(false);
  const results = calculateGameResults(progress);

  const confirmPlayAgain = useCallback(() => {
    setStartingNewGame(true);
    setPlayAgainOpen(false);
    resetGameProgress();
    navigate('/play', { replace: true, state: { notice: 'Fillim i ri! Progresi u rivendos dhe loja e parë është gati.' } });
  }, [navigate, resetGameProgress]);

  if (startingNewGame) return null;
  if (!results.complete) {
    return <Navigate to="/play" replace state={{ notice: 'Rezultati përfundimtar hapet pasi përfundohen të 10 sfidat.' }} />;
  }

  const ringRadius = 52;
  const circumference = 2 * Math.PI * ringRadius;
  const ringOffset = circumference * (1 - results.percentage / 100);

  return (
    <PageLayout headerActions={
      <Link to="/play" className={buttonClasses('secondary', 'sm', 'gap-1.5')} aria-label="Kthehu te lojërat">
        <ArrowLeft size={16} aria-hidden="true" /><span className="hidden sm:inline">Lojërat</span>
      </Link>
    }>
      <section className="pb-12 pt-9 sm:pt-12">
        <div className="page-container">
          <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
            <article className="rounded-[28px] border border-border bg-surface p-6 shadow-soft sm:p-8 lg:p-10">
              <Badge tone="amber" className="gap-1.5"><Trophy size={14} aria-hidden="true" />Sfidat u përfunduan</Badge>
              <h1 className="mt-5 text-[clamp(2.15rem,5vw,3.35rem)] leading-[1.02]">Rrugëtimi yt në gjuhën shqipe u përfundua!</h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
                Përfundove të dy kuizet. Ja si shkoi.
              </p>
              <div className="mt-7 rounded-2xl border border-primary/20 bg-primary-soft/55 p-4 sm:p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary-dark/75">Kategoria</p>
                <Badge tone="purple" className="mt-2 bg-surface/80">{results.category}</Badge>
                <p className="mt-3 font-display text-xl font-extrabold leading-snug text-primary-dark sm:text-2xl">{results.comment}</p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/review" className={buttonClasses('secondary', 'lg', 'w-full sm:w-auto')}>
                  <CircleHelp size={18} aria-hidden="true" /> Rishiko gabimet
                </Link>
                <button type="button" onClick={() => setPlayAgainOpen(true)} className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
                  <RotateCcw size={18} aria-hidden="true" /> Luaj përsëri
                </button>
              </div>
            </article>

            <aside className="surface-card flex flex-col p-6 sm:p-8">
              <p className="eyebrow">Pikët e tua</p>
              <div className="mt-6 flex flex-1 flex-col items-center justify-center">
                <div className="relative" role="img" aria-label={`Rezultati i përgjithshëm: ${results.percentage} për qind`}>
                  <svg viewBox="0 0 120 120" className="size-40 -rotate-90 sm:size-44" aria-hidden="true">
                    <circle cx="60" cy="60" r={ringRadius} fill="none" stroke="var(--color-primary-soft)" strokeWidth="11" />
                    <circle cx="60" cy="60" r={ringRadius} fill="none" stroke="var(--color-primary)" strokeWidth="11" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={ringOffset} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-[2.6rem] font-extrabold leading-none">{results.percentage}%</span>
                    <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">përgjithësisht</span>
                  </div>
                </div>
                <p className="mt-2 text-lg font-semibold">
                  <span className="font-display text-2xl font-extrabold text-primary">{results.totalCorrect}</span> / {MAX_TOTAL_CORRECT} të sakta
                </p>
              </div>
              <div className="mt-7 space-y-3 border-t border-border pt-5 text-sm">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-ink-muted"><CheckCircle2 size={17} className="text-success" />Sfidat e përfunduara</span><span className="font-semibold">{results.completedExercises} / {results.totalExercises}</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-ink-muted"><Star size={17} className="text-accent" />Loja më e fortë</span><span className="max-w-[55%] text-right font-semibold">{results.strongestChapter.title}</span></div>
              </div>
            </aside>
          </div>

          <section aria-labelledby="chapter-breakdown-heading" className="mt-8">
            <p className="eyebrow">Rezultati sipas lojës</p>
            <h2 id="chapter-breakdown-heading" className="mt-2 text-[clamp(1.7rem,3.5vw,2.25rem)]">Si shkoi në secilën lojë</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {CHAPTERS.map((chapter, index) => {
                const chapterResult = results.chapters.find((item) => item.chapterId === chapter.id);
                if (!chapterResult) return null;
                const theme = CHAPTER_THEME[chapter.accent];
                return (
                  <article key={chapter.id} className="rounded-[22px] border border-border bg-surface p-5 shadow-soft sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className={cn('flex size-9 items-center justify-center rounded-xl font-display text-sm font-extrabold', theme.number)}>{chapter.number}</span>
                      <div><h3 className="text-lg leading-tight">{chapter.title}</h3><p className="mt-0.5 text-xs text-ink-muted">{chapter.difficulty}</p></div>
                    </div>
                    <div className="mt-5 flex items-baseline justify-between"><p className="font-display text-2xl font-extrabold">{chapterResult.correct} <span className="text-sm text-ink-muted">/ {chapterResult.maximum}</span></p><p className="text-sm font-semibold text-ink-muted">{chapterResult.percentage}%</p></div>
                    <ProgressBar value={chapterResult.correct} max={chapterResult.maximum} label={`${chapter.title}: rezultat`} valueText={`${chapterResult.correct} nga ${chapterResult.maximum}`} tone={TONES[index] ?? 'primary'} size="sm" className="mt-2.5" />
                  </article>
                );
              })}
            </div>
          </section>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
            <p className="flex max-w-xl items-start gap-2 text-xs text-ink-muted"><CircleHelp size={15} className="mt-0.5" />Ky është rezultati i lojës, jo një certifikatë zyrtare gjuhësore.</p>
            <Link to="/play" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-primary-dark">Kthehu te lojërat <ArrowLeft size={15} /></Link>
          </div>
        </div>
      </section>
      <ConfirmDialog open={playAgainOpen} title="Të luhet përsëri nga fillimi?" confirmLabel="Nis një lojë të re" tone="danger" onCancel={() => setPlayAgainOpen(false)} onConfirm={confirmPlayAgain}>
        Kjo fshin sfidat e përfunduara, rezultatet më të mira dhe rishikimin e gabimeve të ruajtura në këtë pajisje. Veprimi nuk mund të zhbëhet.
      </ConfirmDialog>
    </PageLayout>
  );
}
