import type { OptionPrompt } from './types';
import { cn } from '../lib/cn';
import {
  AnswerOptionButton,
  OptionLetter,
  OptionStatusIcon,
  PromptQuestion,
} from './shared';
import { getOptionVisualState } from './optionState';

interface DialogueExerciseProps {
  prompt: OptionPrompt;
  selectedOptionId: string | null;
  checked: boolean;
  onSelect: (optionId: string) => void;
}

export function DialogueExercise({
  prompt,
  selectedOptionId,
  checked,
  onSelect,
}: DialogueExerciseProps) {
  const speaker = prompt.speaker ?? 'Sprecher';
  const initial = speaker.charAt(0).toUpperCase();

  return (
    <div>
      {prompt.context ? (
        <p className="text-sm font-medium leading-relaxed text-ink-muted">{prompt.context}</p>
      ) : null}

      <div className="mt-4 flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex size-10 flex-none items-center justify-center rounded-full bg-primary-soft font-display text-base font-extrabold text-primary-dark"
        >
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
            {speaker}
          </p>
          <div className="chat-bubble mt-1.5">
            <PromptQuestion className="text-[clamp(1.25rem,3.4vw,1.65rem)] leading-snug">
              {prompt.question}
            </PromptQuestion>
          </div>
        </div>
      </div>

      <p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
        Choose the best reply
      </p>

      <div className="mt-2.5 space-y-2.5" aria-label="Reply options">
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
              className={cn(
                'flex min-h-[56px] items-start gap-3 px-4 py-3.5 text-left',
                state.selected && 'border-primary',
              )}
            >
              <OptionLetter index={index} state={state} />
              <span className="min-w-0 flex-1 leading-snug">{option.label}</span>
              <OptionStatusIcon state={state} className="mt-0.5" />
            </AnswerOptionButton>
          );
        })}
      </div>
    </div>
  );
}
