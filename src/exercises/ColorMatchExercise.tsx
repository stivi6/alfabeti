import type { ColorPrompt } from './types';
import { cn } from '../lib/cn';
import {
  AnswerOptionButton,
  OptionStatusIcon,
  PromptQuestion,
} from './shared';
import { getOptionVisualState } from './optionState';

interface ColorMatchExerciseProps {
  prompt: ColorPrompt;
  selectedOptionId: string | null;
  checked: boolean;
  onSelect: (optionId: string) => void;
}

export function ColorMatchExercise({
  prompt,
  selectedOptionId,
  checked,
  onSelect,
}: ColorMatchExerciseProps) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
        Choose the matching color
      </p>

      <PromptQuestion className="mt-2.5 text-[clamp(1.9rem,5vw,2.45rem)]">
        {prompt.question}
      </PromptQuestion>

      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3" aria-label="Color options">
        {prompt.options.map((option) => {
          const state = getOptionVisualState(
            option.id,
            prompt.correctOptionId,
            selectedOptionId,
            checked,
          );

          return (
            <AnswerOptionButton
              key={option.id}
              state={state}
              onClick={() => onSelect(option.id)}
              disabled={checked}
              className="flex min-h-[112px] flex-col items-center justify-center gap-2.5 px-3 py-4"
            >
              <span
                aria-hidden="true"
                style={{ backgroundColor: option.color }}
                className={cn(
                  'size-12 rounded-full border border-black/10 shadow-inner transition-transform duration-150 sm:size-14',
                  state.selected && 'scale-105 ring-2 ring-primary ring-offset-2 ring-offset-surface',
                )}
              />
              <span className="text-sm font-semibold text-ink">{option.label}</span>
              <OptionStatusIcon state={state} className="absolute right-2 top-2" />
            </AnswerOptionButton>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
        Every swatch has a text label, so the task never depends on color alone.
      </p>
    </div>
  );
}
