import type { ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../lib/cn';
import { ProgressBar } from '../components/ui/ProgressBar';
import type { OptionVisualState } from './optionState';

interface AnswerOptionButtonProps {
  state: OptionVisualState;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * A real button with consistent selected/correct/incorrect styling.
 * Styling comes from the shared `.option-button` class so all answer types
 * communicate state in the same way.
 */
export function AnswerOptionButton({
  state,
  onClick,
  children,
  className,
  disabled = false,
  ariaLabel,
}: AnswerOptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={state.checked ? undefined : state.selected}
      className={cn(
        'option-button relative w-full font-medium disabled:cursor-default',
        className,
      )}
      data-selected={state.selected}
      data-correct={state.checked && state.isCorrectOption}
      data-incorrect={state.checked && state.isChosen && !state.isCorrectOption}
      data-dimmed={state.checked && !state.isCorrectOption && !state.isChosen}
    >
      {children}
    </button>
  );
}

export function OptionStatusIcon({
  state,
  className,
}: {
  state: OptionVisualState;
  className?: string;
}) {
  if (!state.checked) {
    return null;
  }

  if (state.isCorrectOption) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          'flex size-6 flex-none items-center justify-center rounded-full bg-success text-[#FFFEFC]',
          className,
        )}
      >
        <Check size={14} strokeWidth={3} />
      </span>
    );
  }

  if (state.isChosen) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          'flex size-6 flex-none items-center justify-center rounded-full bg-danger text-[#FFFEFC]',
          className,
        )}
      >
        <X size={14} strokeWidth={3} />
      </span>
    );
  }

  return <span aria-hidden="true" className={cn('size-6 flex-none', className)} />;
}

export function OptionLetter({
  index,
  state,
}: {
  index: number;
  state: OptionVisualState;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-7 flex-none items-center justify-center rounded-lg text-xs font-bold',
        state.checked && state.isCorrectOption
          ? 'bg-success/15 text-[#3E6B54]'
          : state.checked && state.isChosen
            ? 'bg-danger/15 text-[#8B3F3F]'
            : state.selected
              ? 'bg-primary text-[#FFFEFC]'
              : 'bg-surface-muted text-ink-muted',
      )}
    >
      {String.fromCharCode(65 + index)}
    </span>
  );
}

export function PromptQuestion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'text-[clamp(1.65rem,4.2vw,2.15rem)] leading-[1.15] tracking-[-0.02em] text-ink',
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Renders a sentence with its blank as a real, visually distinct gap. */
export function BlankText({
  text,
  fill,
  tone = 'primary',
}: {
  text: string;
  fill?: string;
  tone?: 'primary' | 'success';
}) {
  const [before, after] = text.split('____');

  if (before === undefined || after === undefined) {
    return <>{text}</>;
  }

  return (
    <>
      {before}
      <span
        className={cn(
          'mx-1 inline-block min-w-[3.25rem] border-b-[3px] px-1 text-center align-baseline',
          tone === 'success'
            ? 'border-success/60 text-success'
            : 'border-primary/45 text-primary-dark',
        )}
      >
        {fill || '\u00A0'}
      </span>
      {after}
    </>
  );
}

export function ExerciseProgress({
  value,
  max,
  label,
  valueText,
  tone = 'primary',
}: {
  value: number;
  max: number;
  label: string;
  valueText: string;
  tone?: 'primary' | 'success' | 'accent';
}) {
  return (
    <div className="rounded-2xl border border-border/80 bg-surface-muted/55 px-4 py-3.5 sm:px-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">{label}</p>
        <p className="text-xs font-semibold text-ink">{valueText}</p>
      </div>
      <ProgressBar
        value={value}
        max={max}
        label={label}
        valueText={valueText}
        tone={tone}
        size="sm"
        className="mt-2.5"
      />
    </div>
  );
}
