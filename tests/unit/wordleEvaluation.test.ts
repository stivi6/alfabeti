import { describe, expect, it } from 'vitest';
import { evaluateWordle, getKeyboardMarks } from '../../src/lib/wordleEvaluation';

describe('Wordle feedback', () => {
  it('marks correct-position, present, and absent tokens', () => {
    expect(
      evaluateWordle(['F', 'A', 'J', 'Ë', 'R'], ['F', 'J', 'A', 'L', 'Ë']),
    ).toEqual(['green', 'yellow', 'yellow', 'yellow', 'gray']);
  });

  it('does not award repeated letters more times than they occur in the answer', () => {
    expect(
      evaluateWordle(['A', 'A', 'A', 'A', 'A'], ['A', 'R', 'A', 'R', 'A']),
    ).toEqual(['green', 'gray', 'green', 'gray', 'green']);
    expect(
      evaluateWordle(['R', 'R', 'R', 'R', 'R'], ['A', 'R', 'A', 'R', 'A']),
    ).toEqual(['gray', 'green', 'gray', 'green', 'gray']);
  });

  it('keeps the best keyboard mark and never downgrades green', () => {
    const marks = getKeyboardMarks(
      [
        ['J', 'J', 'J', 'J', 'J'],
        ['F', 'J', 'A', 'L', 'Ë'],
        ['D', 'R', 'E', 'J', 'T'],
      ],
      ['F', 'J', 'A', 'L', 'Ë'],
    );
    expect(marks.get('J')).toBe('green');
    expect(marks.get('F')).toBe('green');
    expect(marks.get('R')).toBe('gray');
  });

  it('evaluates a digraph as one Albanian letter token', () => {
    expect(
      evaluateWordle(['SH', 'K', 'O', 'LL', 'Ë'], ['SH', 'K', 'O', 'LL', 'Ë']),
    ).toEqual(['green', 'green', 'green', 'green', 'green']);
  });
});
