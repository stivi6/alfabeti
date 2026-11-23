import { describe, expect, it } from 'vitest';
import { CONNECT_PUZZLES } from '../../src/data/connectLetterPuzzles';
import { WORD_CONNECT_ROUNDS } from '../../src/data/wordConnectRounds';
import { WORD_DICTIONARY_SOURCE, WORDLE_ALLOWED, WORDLE_ANSWERS } from '../../src/data/wordleWords';
import {
  canBuildWordFromRack,
  canonicalTokenSequence,
  sameTokenInventory,
  validateCuratedWord,
} from '../../src/lib/albanianLetters';

function containsStraightWord(tiles: readonly string[], size: number, tokens: readonly string[]): boolean {
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      const horizontalFits = column + tokens.length <= size
        && tokens.every((token, offset) => tiles[row * size + column + offset] === token);
      const verticalFits = row + tokens.length <= size
        && tokens.every((token, offset) => tiles[(row + offset) * size + column] === token);
      if (horizontalFits || verticalFits) return true;
    }
  }
  return false;
}

describe('Gjej Fjalët Word Connect rounds', () => {
  it('recognizes the same Albanian tile inventory regardless of order or case', () => {
    expect(sameTokenInventory(['SH', 'Ë', 'A', 'LL'], ['ll', 'a', 'sh', 'ë'])).toBe(true);
    expect(sameTokenInventory(['SH', 'Ë', 'A'], ['S', 'H', 'Ë'])).toBe(false);
    expect(sameTokenInventory(['A', 'A'], ['A', 'B'])).toBe(false);
  });

  it('uses five letter tokens and at least three verified, constructible words per round', () => {
    expect(WORD_CONNECT_ROUNDS.length).toBeGreaterThanOrEqual(8);
    expect(new Set(WORD_CONNECT_ROUNDS.map((round) => round.id)).size).toBe(WORD_CONNECT_ROUNDS.length);

    for (const round of WORD_CONNECT_ROUNDS) {
      expect(round.letters).toHaveLength(5);
      expect(round.words.length).toBeGreaterThanOrEqual(3);
      expect(new Set(round.words.map((word) => canonicalTokenSequence(word.tokens))).size)
        .toBe(round.words.length);
      for (const word of round.words) {
        expect(validateCuratedWord(word.display, word.tokens)).toBe(true);
        expect(word.tokens.length).toBeGreaterThanOrEqual(2);
        expect(canBuildWordFromRack(round.letters, word.tokens)).toBe(true);
      }
    }
  });
});

describe('Lidh Shkronjat puzzle sets', () => {
  it('provides multiple valid puzzles whose tile inventory can form every target', () => {
    expect(CONNECT_PUZZLES.length).toBeGreaterThanOrEqual(8);
    expect(new Set(CONNECT_PUZZLES.map((puzzle) => puzzle.id)).size).toBe(CONNECT_PUZZLES.length);

    for (const puzzle of CONNECT_PUZZLES) {
      expect(puzzle.targets.length).toBeGreaterThanOrEqual(4);
      for (const target of puzzle.targets) {
        expect(validateCuratedWord(target.word, target.tokens)).toBe(true);
        expect(target.clue.trim().length).toBeGreaterThan(0);
        expect(canBuildWordFromRack(puzzle.tiles, target.tokens)).toBe(true);
      }
    }
  });

  it('places every target in a square grid as a horizontal or vertical line', () => {
    for (const puzzle of CONNECT_PUZZLES) {
      expect(puzzle.tiles).toHaveLength(puzzle.gridSize ** 2);
      for (const target of puzzle.targets) {
        expect(containsStraightWord(puzzle.tiles, puzzle.gridSize, target.tokens)).toBe(true);
      }
    }
  });
});

describe('Wordle dictionaries', () => {
  it('has a larger allowed-guess bank than the hidden-answer bank', () => {
    expect(WORDLE_ANSWERS.length).toBeGreaterThanOrEqual(30);
    expect(WORDLE_ALLOWED.length).toBeGreaterThan(WORDLE_ANSWERS.length);
    expect(WORD_DICTIONARY_SOURCE.url).toMatch(/^https:\/\//);
  });

  it('stores unique, verified words with exactly five Albanian letter tokens', () => {
    for (const entries of [WORDLE_ANSWERS, WORDLE_ALLOWED]) {
      const keys = entries.map((entry) => canonicalTokenSequence(entry.tokens));
      expect(new Set(keys).size).toBe(keys.length);
      for (const entry of entries) {
        expect(entry.tokens).toHaveLength(5);
        expect(validateCuratedWord(entry.display, entry.tokens)).toBe(true);
      }
    }
  });

  it('includes every possible answer in the allowed-guess dictionary', () => {
    const allowed = new Set(WORDLE_ALLOWED.map((entry) => canonicalTokenSequence(entry.tokens)));
    for (const answer of WORDLE_ANSWERS) {
      expect(allowed.has(canonicalTokenSequence(answer.tokens))).toBe(true);
    }
  });
});
