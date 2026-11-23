import type { PicturePrompt } from './types';
import { cn } from '../lib/cn';
import {
  AnswerOptionButton,
  OptionStatusIcon,
  PromptQuestion,
} from './shared';
import { getOptionVisualState } from './optionState';

interface PictureChoiceExerciseProps {
  prompt: PicturePrompt;
  selectedOptionId: string | null;
  checked: boolean;
  onSelect: (optionId: string) => void;
}

export function PictureChoiceExercise({
  prompt,
  selectedOptionId,
  checked,
  onSelect,
}: PictureChoiceExerciseProps) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
        Choose the matching picture
      </p>

      <PromptQuestion className="mt-2.5 text-[clamp(1.9rem,5vw,2.45rem)]">
        {prompt.question}
      </PromptQuestion>

      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3" aria-label="Picture options">
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
              ariaLabel={option.label}
              className="flex min-h-[144px] flex-col items-center justify-center gap-1.5 p-3 sm:min-h-[164px]"
            >
              <span
                aria-hidden="true"
                className="flex size-[76px] items-center justify-center rounded-2xl bg-surface-muted/80 sm:size-[88px]"
              >
                {option.image ? (
                  <img
                    src={option.image}
                    alt=""
                    width={72}
                    height={72}
                    loading="eager"
                    className="size-16 object-contain sm:size-[72px]"
                  />
                ) : (
                  <span className="text-3xl">?</span>
                )}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  'min-h-4 text-center text-[11px] font-semibold leading-tight text-ink-muted transition-opacity duration-150',
                  checked ? 'opacity-100' : 'opacity-0',
                )}
              >
                {option.label}
              </span>
              <OptionStatusIcon state={state} className="absolute right-2.5 top-2.5" />
            </AnswerOptionButton>
          );
        })}
      </div>
    </div>
  );
}
