import { describe, expect, it } from 'vitest';
import {
  evaluateMatchingPrompt,
  evaluateOptionPrompt,
  evaluateSentencePrompt,
  getCorrectAnswerText,
  getPromptQuestion,
  isOptionBasedPrompt,
} from '../../src/lib/evaluation';
import type {
  MatchingPrompt,
  OptionPrompt,
  SentencePrompt,
} from '../../src/exercises/types';

const optionPrompt: OptionPrompt = {
  id: 'p1',
  kind: 'choice',
  question: 'Which word means “hello”?',
  explanation: 'Hallo means hello.',
  options: [
    { id: 'a', label: 'Tschüss' },
    { id: 'b', label: 'Hallo' },
  ],
  correctOptionId: 'b',
};

const sentencePrompt: SentencePrompt = {
  id: 'p2',
  kind: 'sentence',
  question: 'Build the sentence.',
  explanation: 'Verb second.',
  chips: ['Ich', 'bin', 'müde'],
  correctSentence: 'Ich bin müde.',
};

const matchingPrompts: MatchingPrompt[] = [
  {
    id: 'm1',
    kind: 'matching',
    question: 'Hallo',
    left: 'Hallo',
    right: 'Hello',
    explanation: 'Hallo means hello.',
  },
  {
    id: 'm2',
    kind: 'matching',
    question: 'Tschüss',
    left: 'Tschüss',
    right: 'Bye',
    explanation: 'Tschüss means bye.',
  },
];

describe('evaluateOptionPrompt', () => {
  it('accepts the correct option', () => {
    expect(evaluateOptionPrompt(optionPrompt, 'b')).toMatchObject({
      correct: true,
      answer: 'Hallo',
      correctAnswer: 'Hallo',
      explanation: 'Hallo means hello.',
    });
  });

  it('rejects a wrong option', () => {
    expect(evaluateOptionPrompt(optionPrompt, 'a')).toMatchObject({
      correct: false,
      answer: 'Tschüss',
      correctAnswer: 'Hallo',
    });
  });

  it('does not crash for an unknown option id', () => {
    expect(evaluateOptionPrompt(optionPrompt, 'missing')).toMatchObject({
      correct: false,
      answer: '',
      correctAnswer: 'Hallo',
    });
  });
});

describe('evaluateSentencePrompt', () => {
  it('accepts the exact sentence', () => {
    expect(evaluateSentencePrompt(sentencePrompt, [0, 1, 2])).toMatchObject({
      correct: true,
      answer: 'Ich bin müde',
      correctAnswer: 'Ich bin müde.',
    });
  });

  it('ignores an optional trailing full stop and extra spacing', () => {
    expect(
      evaluateSentencePrompt(
        { ...sentencePrompt, correctSentence: 'Ich bin  müde.' },
        [0, 1, 2],
      ).correct,
    ).toBe(true);
  });

  it('preserves capitalization requirements', () => {
    const lowered: SentencePrompt = {
      ...sentencePrompt,
      chips: ['ich', 'bin', 'müde'],
    };
    expect(evaluateSentencePrompt(lowered, [0, 1, 2]).correct).toBe(false);
  });

  it('rejects the wrong word order', () => {
    expect(evaluateSentencePrompt(sentencePrompt, [1, 0, 2])).toMatchObject({
      correct: false,
      answer: 'bin Ich müde',
    });
  });

  it('ignores out-of-range chip indices', () => {
    expect(evaluateSentencePrompt(sentencePrompt, [0, 9, 1, 2]).correct).toBe(true);
  });
});

describe('evaluateMatchingPrompt', () => {
  it('accepts a correct right-hand match', () => {
    expect(evaluateMatchingPrompt(matchingPrompts[0]!, 'm1', matchingPrompts)).toMatchObject({
      correct: true,
      answer: 'Hello',
      correctAnswer: 'Hello',
    });
  });

  it('rejects another pair’s right-hand match', () => {
    expect(evaluateMatchingPrompt(matchingPrompts[0]!, 'm2', matchingPrompts)).toMatchObject({
      correct: false,
      answer: 'Bye',
      correctAnswer: 'Hello',
    });
  });

  it('handles an unknown match id', () => {
    expect(evaluateMatchingPrompt(matchingPrompts[0]!, 'missing', matchingPrompts)).toMatchObject({
      correct: false,
      answer: '',
      correctAnswer: 'Hello',
    });
  });
});

describe('prompt helpers', () => {
  it('detects option-based prompt kinds', () => {
    expect(isOptionBasedPrompt(optionPrompt)).toBe(true);
    expect(isOptionBasedPrompt(sentencePrompt)).toBe(false);
    expect(isOptionBasedPrompt(matchingPrompts[0]!)).toBe(false);
  });

  it('returns the correct answer text for each prompt kind', () => {
    expect(getCorrectAnswerText(optionPrompt)).toBe('Hallo');
    expect(getCorrectAnswerText(sentencePrompt)).toBe('Ich bin müde.');
    expect(getCorrectAnswerText(matchingPrompts[1]!)).toBe('Bye');
  });

  it('uses the left-hand phrase as a matching question', () => {
    expect(getPromptQuestion(matchingPrompts[0]!)).toBe('Hallo');
    expect(getPromptQuestion(optionPrompt)).toBe('Which word means “hello”?');
  });
});
