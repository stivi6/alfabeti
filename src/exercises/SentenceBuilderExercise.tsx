import { RotateCcw } from 'lucide-react';
import type { SentencePrompt } from './types';
import { cn } from '../lib/cn';
import { PromptQuestion } from './shared';

interface SentenceBuilderExerciseProps {
  prompt: SentencePrompt;
  orderedChipIndices: number[];
  checked: boolean;
  onAddChip: (chipIndex: number) => void;
  onUndo: () => void;
}

export function SentenceBuilderExercise({
  prompt,
  orderedChipIndices,
  checked,
  onAddChip,
  onUndo,
}: SentenceBuilderExerciseProps) {
  const usedIndices = new Set(orderedChipIndices);
  const allChipsUsed = orderedChipIndices.length === prompt.chips.length;

  return (
    <div>
      <PromptQuestion>{prompt.question}</PromptQuestion>

      {prompt.translation ? (
        <p className="mt-2 text-sm font-medium leading-relaxed text-ink-muted">
          Meaning: {prompt.translation}
        </p>
      ) : null}

      <div className="mt-6 rounded-2xl border border-border bg-surface-muted/45 p-3.5 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-muted">
            Fjalia jote
          </p>
          <button
            type="button"
            onClick={onUndo}
            disabled={checked || orderedChipIndices.length === 0}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-bold text-primary-dark transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <RotateCcw size={14} strokeWidth={2.2} aria-hidden="true" />
            Hiqe
          </button>
        </div>

        <div
          className={cn(
            'mt-2 flex min-h-[54px] flex-wrap content-start items-center gap-1.5 rounded-xl border border-dashed px-2.5 py-2 transition-colors',
            allChipsUsed
              ? 'border-primary/35 bg-surface'
              : 'border-border-strong/60 bg-surface/70',
          )}
          aria-label="Fjalia jote"
        >
          {orderedChipIndices.length === 0 ? (
            <span className="px-1 text-sm text-ink-muted/80">
              Zgjidh pllakat më poshtë në rendin e duhur…
            </span>
          ) : (
            orderedChipIndices.map((chipIndex, position) => {
              const chip = prompt.chips[chipIndex] ?? '';
              return (
                <span
                  key={`${chip}-${position}`}
                  className="inline-flex min-h-9 items-center rounded-lg bg-primary-soft px-2.5 py-1 text-sm font-semibold text-primary-dark"
                >
                  {chip}
                </span>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-muted">
          Pllakat e shkronjave
        </p>
        <div className="mt-2 flex flex-wrap gap-2" aria-label="Pllakat e shkronjave">
          {prompt.chips.map((chip, chipIndex) => {
            const isUsed = usedIndices.has(chipIndex);

            return (
              <button
                key={`${chip}-${chipIndex}`}
                type="button"
                onClick={() => onAddChip(chipIndex)}
                disabled={isUsed || checked}
                aria-pressed={isUsed}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-xl border-[1.5px] px-3.5 py-2 text-[15px] font-semibold transition-colors duration-150',
                  isUsed
                    ? 'cursor-default border-border/70 bg-surface-muted/55 text-ink-muted/45'
                    : 'border-border-strong bg-surface text-ink hover:border-primary/50 hover:bg-lilac disabled:cursor-not-allowed',
                )}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
        Zgjidh një pllakë për ta shtuar në fjalë. Butoni Hiqe e heq të fundit.
      </p>
    </div>
  );
}
