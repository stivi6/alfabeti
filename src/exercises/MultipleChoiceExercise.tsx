import type { OptionPrompt } from './types';
import { cn } from '../lib/cn';
import {
  AnswerOptionButton,
  BlankText,
  OptionLetter,
  OptionStatusIcon,
  PromptQuestion,
} from './shared';
import { getOptionVisualState } from './optionState';

interface MultipleChoiceExerciseProps {
  prompt: OptionPrompt;
  selectedOptionId: string | null;
  checked: boolean;
  onSelect: (optionId: string) => void;
}

export function MultipleChoiceExercise({
  prompt,
  selectedOptionId,
  checked,
  onSelect,
}: MultipleChoiceExerciseProps) {
  const isNumber = prompt.kind === 'number';
  const isArticle = prompt.kind === 'article';
  const isSentenceChoice = prompt.kind === 'correct-sentence';

  return (
    <div>
      {isNumber ? (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
          Which numeral matches?
        </p>
      ) : isSentenceChoice ? (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
          Mistake detective
        </p>
      ) : isArticle ? (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
          Choose the definite article
        </p>
      ) : null}

      <PromptQuestion className="mt-2.5">
        {isArticle ? <BlankText text={prompt.question} /> : prompt.question}
      </PromptQuestion>

      <div
        className={cn(
          'mt-6 grid gap-2.5 sm:gap-3',
          isNumber
            ? 'grid-cols-2 sm:grid-cols-4'
            : isArticle
              ? 'grid-cols-3'
              : isSentenceChoice
                ? 'grid-cols-1'
                : 'grid-cols-1 sm:grid-cols-2',
        )}
        aria-label="Answer options"
      >
        {prompt.options.map((option, index) => {
          const state = getOptionVisualState(
            option.id,
            prompt.correctOptionId,
            selectedOptionId,
            checked,
          );

          if (isNumber) {
            return (
              <AnswerOptionButton
                key={option.id}
                state={state}
                onClick={() => onSelect(option.id)}
                disabled={checked}
                className="flex min-h-[92px] flex-col items-center justify-center px-3 py-4"
              >
                <span className="font-display text-3xl font-extrabold leading-none text-ink">
                  {option.label}
                </span>
                <OptionStatusIcon
                  state={state}
                  className="absolute right-2.5 top-2.5 size-5 [&>svg]:size-3"
                />
              </AnswerOptionButton>
            );
          }

          if (isArticle) {
            return (
              <AnswerOptionButton
                key={option.id}
                state={state}
                onClick={() => onSelect(option.id)}
                disabled={checked}
                className="flex min-h-[70px] items-center justify-center px-3 py-4"
              >
                <span className="font-display text-xl font-extrabold text-ink">{option.label}</span>
                <OptionStatusIcon
                  state={state}
                  className="absolute right-2 top-2 size-5 [&>svg]:size-3"
                />
              </AnswerOptionButton>
            );
          }

          return (
            <AnswerOptionButton
              key={option.id}
              state={state}
              onClick={() => onSelect(option.id)}
              disabled={checked}
              className={cn(
                'flex min-h-[58px] items-center gap-3 px-4 py-3.5 text-left',
                isSentenceChoice && 'min-h-[64px] sm:text-[15px]',
              )}
            >
              <OptionLetter index={index} state={state} />
              <span className="min-w-0 flex-1 leading-snug">{option.label}</span>
              <OptionStatusIcon state={state} />
            </AnswerOptionButton>
          );
        })}
      </div>
    </div>
  );
}
