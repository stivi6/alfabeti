import type { OptionPrompt } from './types';
import {
  AnswerOptionButton,
  BlankText,
  OptionLetter,
  OptionStatusIcon,
  PromptQuestion,
} from './shared';
import { getOptionVisualState } from './optionState';

interface FillBlankExerciseProps {
  prompt: OptionPrompt;
  selectedOptionId: string | null;
  checked: boolean;
  onSelect: (optionId: string) => void;
}

export function FillBlankExercise({
  prompt,
  selectedOptionId,
  checked,
  onSelect,
}: FillBlankExerciseProps) {
  const selectedLabel = prompt.options.find((option) => option.id === selectedOptionId)?.label;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
        Complete the phrase
      </p>

      <PromptQuestion className="mt-2.5 text-[clamp(1.8rem,5vw,2.4rem)]">
        <BlankText text={prompt.question} fill={selectedLabel} />
      </PromptQuestion>

      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3" aria-label="Answer options">
        {prompt.options.map((option, index) => {
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
              className="flex min-h-[58px] items-center gap-2.5 px-3.5 py-3 text-left sm:px-4"
            >
              <OptionLetter index={index} state={state} />
              <span className="min-w-0 flex-1 font-semibold leading-snug">{option.label}</span>
              <OptionStatusIcon state={state} />
            </AnswerOptionButton>
          );
        })}
      </div>
    </div>
  );
}
