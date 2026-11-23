import type {
  ColorPrompt,
  MatchingPrompt,
  OptionPrompt,
  PicturePrompt,
  Prompt,
  SentencePrompt,
} from '../exercises/types';
import { normalizeSentence } from './textNormalization';

export type OptionBasedPrompt = OptionPrompt | PicturePrompt | ColorPrompt;

export interface PromptEvaluation {
  correct: boolean;
  answer: string;
  correctAnswer: string;
  explanation: string;
}

export function isOptionBasedPrompt(prompt: Prompt): prompt is OptionBasedPrompt {
  return (
    prompt.kind === 'choice' ||
    prompt.kind === 'number' ||
    prompt.kind === 'article' ||
    prompt.kind === 'fill-blank' ||
    prompt.kind === 'dialogue' ||
    prompt.kind === 'cafe' ||
    prompt.kind === 'correct-sentence' ||
    prompt.kind === 'picture' ||
    prompt.kind === 'color'
  );
}

export function evaluateOptionPrompt(
  prompt: OptionBasedPrompt,
  selectedOptionId: string,
): PromptEvaluation {
  const selected = prompt.options.find((option) => option.id === selectedOptionId);
  const correctOption = prompt.options.find((option) => option.id === prompt.correctOptionId);

  return {
    correct: Boolean(selected) && selectedOptionId === prompt.correctOptionId,
    answer: selected?.label ?? '',
    correctAnswer: correctOption?.label ?? '',
    explanation: prompt.explanation,
  };
}

export function evaluateSentencePrompt(
  prompt: SentencePrompt,
  orderedChipIndices: number[],
): PromptEvaluation {
  const builtSentence = orderedChipIndices
    .map((index) => prompt.chips[index] ?? '')
    .filter(Boolean)
    .join(' ');

  return {
    correct: normalizeSentence(builtSentence) === normalizeSentence(prompt.correctSentence),
    answer: builtSentence,
    correctAnswer: prompt.correctSentence,
    explanation: prompt.explanation,
  };
}

export function evaluateMatchingPrompt(
  prompt: MatchingPrompt,
  selectedRightPromptId: string,
  allPrompts: MatchingPrompt[],
): PromptEvaluation {
  const selected = allPrompts.find((item) => item.id === selectedRightPromptId);

  return {
    correct: selectedRightPromptId === prompt.id,
    answer: selected?.right ?? '',
    correctAnswer: prompt.right,
    explanation: prompt.explanation,
  };
}

export function getCorrectAnswerText(prompt: Prompt): string {
  if (prompt.kind === 'sentence') {
    return prompt.correctSentence;
  }
  if (prompt.kind === 'matching') {
    return prompt.right;
  }
  const correctOption = prompt.options.find((option) => option.id === prompt.correctOptionId);
  return correctOption?.label ?? '';
}

export function getPromptQuestion(prompt: Prompt): string {
  if (prompt.kind === 'matching') {
    return prompt.left;
  }
  return prompt.question;
}
