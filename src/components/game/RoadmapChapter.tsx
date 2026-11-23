import { Link } from 'react-router-dom';
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  LockKeyhole,
} from 'lucide-react';
import { getExercise } from '../../data/exercises';
import type { Chapter } from '../../exercises/types';
import { cn } from '../../lib/cn';
import { getExerciseStatus, type ExerciseStatus } from '../../lib/progress';
import type { GameProgress } from '../../lib/types';
import { Badge } from '../ui/Badge';
import { CHAPTER_THEME } from './chapterTheme';

interface RoadmapChapterProps {
  chapter: Chapter;
  progress: GameProgress;
  previousChapterTitle?: string;
}

export function RoadmapChapter({ chapter, progress, previousChapterTitle }: RoadmapChapterProps) {
  const theme = CHAPTER_THEME[chapter.accent];
  const statuses = chapter.exerciseIds.map((id) => ({
    id,
    status: getExerciseStatus(id, progress) as ExerciseStatus,
  }));
  const completedCount = statuses.filter((item) => item.status === 'completed').length;
  const chapterComplete = completedCount === chapter.exerciseIds.length;
  const chapterLocked = statuses.every((item) => item.status === 'locked');
  const currentId = statuses.find((item) => item.status === 'available')?.id;
  const currentExercise = currentId ? getExercise(currentId) : undefined;

  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-[26px] border bg-surface p-4 shadow-soft sm:p-6',
        chapterComplete ? 'border-success/35' : 'border-border',
      )}
      data-testid={`chapter-${chapter.number}`}
    >
      <div
        aria-hidden="true"
        className={cn('absolute -right-20 -top-20 size-48 rounded-full opacity-60', theme.thumbnail)}
      />

      <div className="relative grid gap-5 lg:grid-cols-[250px_1fr] lg:items-center lg:gap-7">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'relative flex size-[76px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] sm:size-[88px]',
              theme.thumbnail,
            )}
          >
            <img
              src={chapter.illustration}
              alt={chapter.illustrationAlt}
              width={300}
              height={260}
              loading="lazy"
              className="h-[68px] w-auto max-w-[88%] object-contain sm:h-[80px]"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
              Loja {chapter.number}
            </p>
            <h2 className="mt-1 text-[26px] leading-tight text-ink">{chapter.title}</h2>
            <Badge tone="neutral" className={cn('mt-2 whitespace-nowrap', theme.soft)}>
              {chapter.difficulty}
            </Badge>
          </div>
        </div>

        <div className="min-w-0">
          <div className="relative px-0.5 sm:px-2">
            <div
              aria-hidden="true"
              className={cn(
                'path-line top-[22px] sm:top-6',
                chapterComplete && 'path-line-complete',
              )}
            />
            <ol className="relative grid grid-cols-5 gap-1 sm:gap-3">
              {statuses.map(({ id, status }, index) => {
                const exercise = getExercise(id);
                if (!exercise) {
                  return null;
                }

                const isCompleted = status === 'completed';
                const isCurrent = status === 'available';
                const label = `${index + 1}. ${exercise.title}${isCompleted ? ' — e përfunduar' : isCurrent ? ' — aktive' : ' — e kyçur'}`;

                return (
                  <li key={id} className="flex min-w-0 flex-col items-center text-center">
                    {status === 'locked' ? (
                      <button
                        type="button"
                        disabled
                        className="roadmap-node"
                        data-status="locked"
                        aria-label={`${exercise.title} — e kyçur`}
                        data-testid={`roadmap-node-${id}`}
                      >
                        <LockKeyhole size={17} strokeWidth={2} aria-hidden="true" />
                      </button>
                    ) : (
                      <Link
                        to={`/play/${id}`}
                        className="roadmap-node"
                        data-status={isCompleted ? 'completed' : 'current'}
                        aria-label={label}
                        data-testid={`roadmap-node-${id}`}
                        title={exercise.title}
                      >
                        {isCompleted ? (
                          <Check size={21} strokeWidth={2.6} aria-hidden="true" />
                        ) : (
                          <span aria-hidden="true">{index + 1}</span>
                        )}
                      </Link>
                    )}
                    <span
                      className={cn(
                        'mt-2 hidden min-h-[2.4rem] w-full break-words text-[11px] font-semibold leading-[1.25] sm:block',
                        isCompleted
                          ? 'text-ink-muted'
                          : isCurrent
                            ? 'text-primary-dark'
                            : 'text-ink-muted/65',
                      )}
                    >
                      {exercise.title}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-border/80 pt-3 sm:mt-1">
            <p className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
              {chapterComplete ? (
                <>
                  <CheckCircle2 size={15} strokeWidth={2.2} className="text-success" aria-hidden="true" />
                  Të 5 sfidat u përfunduan
                </>
              ) : chapterLocked ? (
                <>
                  <LockKeyhole size={14} strokeWidth={2.2} aria-hidden="true" />
                  Përfundo {previousChapterTitle ?? 'lojnë e mëparshme'} për ta hapur
                </>
              ) : (
                <>
                  <Clock3 size={14} strokeWidth={2.2} aria-hidden="true" />
                  {completedCount} / 5 të përfunduara
                  {currentExercise ? ` · Tjetra: ${currentExercise.title}` : ''}
                </>
              )}
            </p>

            {chapterComplete ? (
              <span className="text-xs font-bold text-success">Loja u përfundua</span>
            ) : currentExercise ? (
              <Link
                to={`/play/${currentExercise.id}`}
                className="inline-flex min-h-8 items-center gap-0.5 text-xs font-bold text-primary-dark hover:text-primary"
              >
                Vazhdoni
                <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
