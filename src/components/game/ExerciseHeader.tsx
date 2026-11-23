import { CheckCircle2, Lightbulb } from 'lucide-react';
import type { Chapter, Exercise } from '../../exercises/types';
import { CHAPTER_THEME } from './chapterTheme';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/cn';

interface ExerciseHeaderProps {
  exercise: Exercise;
  chapter: Chapter;
  bestCorrect?: number;
}

export function ExerciseHeader({ exercise, chapter, bestCorrect }: ExerciseHeaderProps) {
  const theme = CHAPTER_THEME[chapter.accent];

  return (
    <div className="flex items-start justify-between gap-5">
      <div className="min-w-0 max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge tone="neutral" className={cn(theme.soft)}>
            {chapter.title}
          </Badge>
          <span className="text-xs font-semibold text-ink-muted">
            Sfida {exercise.number} nga 5
          </span>
          {bestCorrect !== undefined ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-[#3E6B54]">
              <CheckCircle2 size={13} strokeWidth={2.4} aria-hidden="true" />
              Përfunduar · Më mirë {bestCorrect} / {exercise.prompts.length}
            </span>
          ) : null}
        </div>

        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] leading-[1.04] text-ink">
          {exercise.title}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
          {exercise.instructions}
        </p>

        {exercise.hint ? (
          <details className="group mt-4">
            <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-1.5 rounded-lg px-2 text-xs font-bold text-primary-dark transition-colors hover:bg-primary-soft [&::-webkit-details-marker]:hidden">
              <Lightbulb size={15} strokeWidth={2} aria-hidden="true" />
              Të duhet një ndihmë?
            </summary>
            <p className="mt-2 max-w-xl rounded-xl border border-accent/35 bg-accent-soft/55 px-3.5 py-2.5 text-sm leading-relaxed text-gold-ink">
              {exercise.hint}
            </p>
          </details>
        ) : null}
      </div>

      <div
        className={cn(
          'hidden size-[88px] flex-none items-center justify-center overflow-hidden rounded-[22px] sm:flex',
          theme.thumbnail,
        )}
        aria-hidden="true"
      >
        <img
          src={chapter.illustration}
          alt=""
          width={300}
          height={260}
          className="h-[78px] w-auto max-w-[90%] object-contain"
        />
      </div>
    </div>
  );
}
