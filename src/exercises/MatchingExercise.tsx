import { useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import type { Exercise, MatchingPrompt } from './types';
import type { PromptOutcome } from '../lib/types';
import { evaluateMatchingPrompt, type PromptEvaluation } from '../lib/evaluation';
import { cn } from '../lib/cn';
import { Button } from '../components/ui/Button';
import { AnswerFeedback } from './AnswerFeedback';
import { ExerciseProgress } from './shared';

interface MatchingExerciseProps {
  exercise: Exercise;
  onComplete: (outcomes: PromptOutcome[]) => void;
}

/**
 * A tap/click matching board. Each Albanian phrase can be attempted once,
 * so scoring stays one decision per prompt. A wrong pairing resolves that
 * phrase but leaves its correct meaning available for another phrase.
 */
export function MatchingExercise({ exercise, onComplete }: MatchingExerciseProps) {
  const prompts = exercise.prompts.filter(
    (prompt): prompt is MatchingPrompt => prompt.kind === 'matching',
  );
  const rightOrder = [...prompts.slice(1), ...prompts.slice(0, 1)];

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [resolved, setResolved] = useState<Record<string, boolean>>({});
  const [matchedRightIds, setMatchedRightIds] = useState<string[]>([]);
  const [lastChosenRightId, setLastChosenRightId] = useState<string | null>(null);
  const [lastEvaluation, setLastEvaluation] = useState<PromptEvaluation | null>(null);
  const [outcomes, setOutcomes] = useState<PromptOutcome[]>([]);

  const resolvedCount = Object.keys(resolved).length;
  const allResolved = prompts.length > 0 && resolvedCount === prompts.length;
  const selectedPrompt = prompts.find((prompt) => prompt.id === selectedLeftId);

  const handleLeftSelect = (promptId: string) => {
    if (resolved[promptId] !== undefined) {
      return;
    }
    setSelectedLeftId(promptId);
    setLastEvaluation(null);
    setLastChosenRightId(null);
  };

  const handleRightSelect = (rightPromptId: string) => {
    if (!selectedLeftId) {
      return;
    }

    const leftPrompt = prompts.find((prompt) => prompt.id === selectedLeftId);
    if (!leftPrompt) {
      return;
    }

    const evaluation = evaluateMatchingPrompt(leftPrompt, rightPromptId, prompts);
    setLastEvaluation(evaluation);
    setLastChosenRightId(rightPromptId);
    setOutcomes((current) => [
      ...current,
      {
        promptId: leftPrompt.id,
        correct: evaluation.correct,
        answer: evaluation.answer,
      },
    ]);
    setResolved((current) => ({ ...current, [leftPrompt.id]: evaluation.correct }));
    if (evaluation.correct) {
      setMatchedRightIds((current) =>
        current.includes(rightPromptId) ? current : [...current, rightPromptId],
      );
    }
    setSelectedLeftId(null);
  };

  if (prompts.length === 0) {
    return null;
  }

  return (
    <div>
      <ExerciseProgress
        value={resolvedCount}
        max={prompts.length}
        label="Matching board"
        valueText={`${resolvedCount} nga ${prompts.length} çiftet të kontrolluara`}
      />

      <div className="mt-6">
        <p className="text-sm leading-relaxed text-ink-muted">
          {allResolved
            ? 'Të gjitha çiftet u kontrolluan. Shiko rezultatin më poshtë.'
            : selectedPrompt
              ? `Zgjidh ngjarjen që i përket datës “${selectedPrompt.left}”.`
              : 'Zgjidh një datë në të majtë, pastaj zgjidh ngjarjen që i përket.'}
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <section aria-labelledby="matching-date-heading">
            <h2
              id="matching-date-heading"
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted"
            >
              Data
            </h2>
            <div className="mt-2 space-y-2.5">
              {prompts.map((prompt, index) => {
                const isResolved = resolved[prompt.id] !== undefined;
                const isCorrect = resolved[prompt.id] === true;
                const isSelected = selectedLeftId === prompt.id;

                return (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => handleLeftSelect(prompt.id)}
                    disabled={isResolved || allResolved}
                    aria-pressed={isSelected}
                    className="option-button flex min-h-[56px] w-full items-center gap-2.5 px-3.5 py-3 text-left disabled:cursor-default"
                    data-selected={isSelected}
                    data-correct={isResolved && isCorrect}
                    data-incorrect={isResolved && !isCorrect}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-7 flex-none items-center justify-center rounded-full text-xs font-bold',
                        isSelected
                          ? 'bg-primary text-[#FFFEFC]'
                          : 'bg-surface-muted text-ink-muted',
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 font-semibold leading-snug">{prompt.left}</span>
                    {isResolved ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex size-6 flex-none items-center justify-center rounded-full text-[#FFFEFC]',
                          isCorrect ? 'bg-success' : 'bg-danger',
                        )}
                      >
                        {isCorrect ? (
                          <CheckCircle2 size={15} strokeWidth={2.4} />
                        ) : (
                          <X size={15} strokeWidth={2.8} />
                        )}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="matching-event-heading">
            <h2
              id="matching-event-heading"
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted"
            >
              Ngjarja
            </h2>
            <div className="mt-2 space-y-2.5">
              {rightOrder.map((option) => {
                const isMatched = matchedRightIds.includes(option.id);
                const isChosenWrong =
                  lastChosenRightId === option.id && lastEvaluation !== null && !lastEvaluation.correct;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleRightSelect(option.id)}
                    disabled={!selectedLeftId || isMatched}
                    className={cn(
                      'option-button flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left disabled:cursor-default',
                      !selectedLeftId && !isMatched && 'opacity-55',
                    )}
                    data-correct={isMatched}
                    data-incorrect={isChosenWrong}
                  >
                    <span className="min-w-0 flex-1 leading-snug">{option.right}</span>
                    {isMatched ? (
                      <span
                        aria-hidden="true"
                        className="flex size-6 flex-none items-center justify-center rounded-full bg-success text-[#FFFEFC]"
                      >
                        <CheckCircle2 size={15} strokeWidth={2.4} />
                      </span>
                    ) : isChosenWrong ? (
                      <span
                        aria-hidden="true"
                        className="flex size-6 flex-none items-center justify-center rounded-full bg-danger text-[#FFFEFC]"
                      >
                        <X size={15} strokeWidth={2.8} />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <div className="mt-5" aria-live="polite" aria-atomic="true">
        <AnswerFeedback
          evaluation={lastEvaluation}
          action={
            allResolved ? (
              <Button
                onClick={() => onComplete(outcomes)}
                trailingIcon={<ArrowRight size={17} strokeWidth={2} aria-hidden="true" />}
                className="w-full sm:w-auto"
              >
                Shiko rezultatin
              </Button>
            ) : null
          }
        />
      </div>
    </div>
  );
}
