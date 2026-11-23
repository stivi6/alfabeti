import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { Exercise } from './types';
import type { PromptOutcome } from '../lib/types';
import {
  evaluateOptionPrompt,
  evaluateSentencePrompt,
  type PromptEvaluation,
} from '../lib/evaluation';
import { getChapter } from '../data/chapters';
import { Button } from '../components/ui/Button';
import { AnswerFeedback } from './AnswerFeedback';
import { ColorMatchExercise } from './ColorMatchExercise';
import { DialogueExercise } from './DialogueExercise';
import { FillBlankExercise } from './FillBlankExercise';
import { MatchingExercise } from './MatchingExercise';
import { MultipleChoiceExercise } from './MultipleChoiceExercise';
import { PictureChoiceExercise } from './PictureChoiceExercise';
import { SentenceBuilderExercise } from './SentenceBuilderExercise';
import { ExerciseProgress } from './shared';

interface ExerciseRendererProps {
  exercise: Exercise;
  onComplete: (outcomes: PromptOutcome[]) => void;
}

const PROGRESS_TONES = {
  purple: 'primary',
  amber: 'accent',
  mint: 'success',
} as const;

export function ExerciseRenderer({ exercise, onComplete }: ExerciseRendererProps) {
  const allMatching = exercise.prompts.every((prompt) => prompt.kind === 'matching');

  if (allMatching) {
    return <MatchingExercise exercise={exercise} onComplete={onComplete} />;
  }

  return <SequentialExercise exercise={exercise} onComplete={onComplete} />;
}

function SequentialExercise({ exercise, onComplete }: ExerciseRendererProps) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [orderedChipIndices, setOrderedChipIndices] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [evaluation, setEvaluation] = useState<PromptEvaluation | null>(null);
  const [outcomes, setOutcomes] = useState<PromptOutcome[]>([]);

  const prompt = exercise.prompts[promptIndex];
  const chapter = getChapter(exercise.chapterId);
  const tone = chapter ? PROGRESS_TONES[chapter.accent] : 'primary';
  const isLastPrompt = promptIndex === exercise.prompts.length - 1;
  const canCheck =
    prompt?.kind === 'sentence'
      ? orderedChipIndices.length === prompt.chips.length
      : selectedOptionId !== null;

  if (!prompt) {
    return null;
  }

  const handleCheck = () => {
    if (!canCheck || !prompt) {
      return;
    }

    let result: PromptEvaluation | null = null;

    if (prompt.kind === 'sentence') {
      result = evaluateSentencePrompt(prompt, orderedChipIndices);
    } else if (
      prompt.kind === 'choice' ||
      prompt.kind === 'number' ||
      prompt.kind === 'article' ||
      prompt.kind === 'fill-blank' ||
      prompt.kind === 'dialogue' ||
      prompt.kind === 'cafe' ||
      prompt.kind === 'correct-sentence' ||
      prompt.kind === 'picture' ||
      prompt.kind === 'color'
    ) {
      if (!selectedOptionId) {
        return;
      }
      result = evaluateOptionPrompt(prompt, selectedOptionId);
    }

    if (!result) {
      return;
    }

    setEvaluation(result);
    setChecked(true);
    setOutcomes((current) => [
      ...current,
      {
        promptId: prompt.id,
        correct: result.correct,
        answer: result.answer,
      },
    ]);
  };

  const handleContinue = () => {
    if (isLastPrompt) {
      onComplete(outcomes);
      return;
    }

    setPromptIndex((current) => current + 1);
    setSelectedOptionId(null);
    setOrderedChipIndices([]);
    setEvaluation(null);
    setChecked(false);
  };

  const handleAddChip = (chipIndex: number) => {
    if (checked) {
      return;
    }
    setOrderedChipIndices((current) => [...current, chipIndex]);
  };

  const handleUndo = () => {
    if (checked) {
      return;
    }
    setOrderedChipIndices((current) => current.slice(0, -1));
  };

  const interaction = (() => {
    switch (prompt.kind) {
      case 'picture':
        return (
          <PictureChoiceExercise
            prompt={prompt}
            selectedOptionId={selectedOptionId}
            checked={checked}
            onSelect={setSelectedOptionId}
          />
        );
      case 'color':
        return (
          <ColorMatchExercise
            prompt={prompt}
            selectedOptionId={selectedOptionId}
            checked={checked}
            onSelect={setSelectedOptionId}
          />
        );
      case 'sentence':
        return (
          <SentenceBuilderExercise
            prompt={prompt}
            orderedChipIndices={orderedChipIndices}
            checked={checked}
            onAddChip={handleAddChip}
            onUndo={handleUndo}
          />
        );
      case 'dialogue':
      case 'cafe':
        return (
          <DialogueExercise
            prompt={prompt}
            selectedOptionId={selectedOptionId}
            checked={checked}
            onSelect={setSelectedOptionId}
          />
        );
      case 'fill-blank':
        return (
          <FillBlankExercise
            prompt={prompt}
            selectedOptionId={selectedOptionId}
            checked={checked}
            onSelect={setSelectedOptionId}
          />
        );
      case 'choice':
      case 'number':
      case 'article':
      case 'correct-sentence':
        return (
          <MultipleChoiceExercise
            prompt={prompt}
            selectedOptionId={selectedOptionId}
            checked={checked}
            onSelect={setSelectedOptionId}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <div>
      <ExerciseProgress
        value={promptIndex + 1}
        max={exercise.prompts.length}
        label="Progresi i sfidës"
        valueText={`Pyetja ${promptIndex + 1} nga ${exercise.prompts.length}`}
        tone={tone}
      />

      <div className="mt-6 sm:mt-7">{interaction}</div>

      {!checked ? (
        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-ink-muted">
            {prompt.kind === 'sentence'
              ? canCheck
                ? 'Gati për të kontrolluar fjalinë?'
                : 'Përdor të gjitha pllakat për të plotësuar fjalinë.'
              : canCheck
                ? 'Përgjigja u zgjodh. Kontrolloje kur të jesh gati.'
                : 'Zgjidh një përgjigje për të vazhduar.'}
          </p>
          <Button
            onClick={handleCheck}
            disabled={!canCheck}
            leadingIcon={<Check size={17} strokeWidth={2.5} aria-hidden="true" />}
            className="w-full sm:w-auto"
          >
            Kontrollo përgjigjen
          </Button>
        </div>
      ) : (
        <div className="mt-6" aria-live="polite" aria-atomic="true">
          <AnswerFeedback
            evaluation={evaluation}
            action={
              <Button
                onClick={handleContinue}
                trailingIcon={<ArrowRight size={17} strokeWidth={2} aria-hidden="true" />}
                className="w-full sm:w-auto"
              >
                {isLastPrompt ? 'Shiko rezultatin' : 'Vazhdo'}
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
