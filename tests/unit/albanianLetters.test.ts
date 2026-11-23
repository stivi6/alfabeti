import { describe, expect, it } from 'vitest';
import {
  ALBANIAN_ALPHABET,
  DIGRAPHS,
  VOWELS,
  albanianLetterCount,
  appendPhysicalLetter,
  backspaceInput,
  canBuildWordFromRack,
  canonicalTokenSequence,
  normalizeAlbanian,
  tokenizeAlbanianWord,
  validateCuratedWord,
} from '../../src/lib/albanianLetters';

describe('Albanian letter engine', () => {
  it('contains all 36 letters, nine digraphs and seven vowels', () => {
    expect(ALBANIAN_ALPHABET).toHaveLength(36);
    expect(DIGRAPHS).toHaveLength(9);
    expect(VOWELS).toHaveLength(7);
    expect(new Set(ALBANIAN_ALPHABET).size).toBe(36);
  });

  it('treats each Albanian digraph as one letter token', () => {
    for (const digraph of DIGRAPHS) {
      expect(tokenizeAlbanianWord(digraph)).toEqual([digraph]);
    }
    expect(tokenizeAlbanianWord('shkollë')).toEqual(['SH', 'K', 'O', 'LL', 'Ë']);
    expect(tokenizeAlbanianWord('një')).toEqual(['NJ', 'Ë']);
    expect(tokenizeAlbanianWord('xhami')).toEqual(['XH', 'A', 'M', 'I']);
  });

  it('preserves Ç and Ë and normalizes decomposed Unicode', () => {
    expect(normalizeAlbanian('e\u0308')).toBe('Ë');
    expect(tokenizeAlbanianWord('çelës')).toEqual(['Ç', 'E', 'L', 'Ë', 'S']);
  });

  it('validates curated spellings against their explicit token arrays', () => {
    expect(validateCuratedWord('shqip', ['SH', 'Q', 'I', 'P'])).toBe(true);
    expect(validateCuratedWord('shqip', ['S', 'H', 'Q', 'I', 'P'])).toBe(false);
    expect(validateCuratedWord('ng', ['N', 'G'])).toBe(true);
    expect(validateCuratedWord('shqip', ['SH', 'Q', 'I'])).toBe(false);
  });

  it('compares token sequences without conflating a digraph and two letters', () => {
    expect(canonicalTokenSequence(['SH'])).not.toBe(canonicalTokenSequence(['S', 'H']));
    expect(albanianLetterCount(['SH', 'Q', 'I', 'P'])).toBe(4);
  });

  it('checks a rack as a multiset and never permits reusing a physical tile', () => {
    expect(canBuildWordFromRack(['A', 'A', 'R', 'Ë', 'T'], ['A', 'R', 'Ë', 'T'])).toBe(true);
    expect(canBuildWordFromRack(['A', 'R', 'Ë', 'T'], ['A', 'A', 'R', 'Ë'])).toBe(false);
    expect(canBuildWordFromRack(['SH', 'I'], ['S', 'H'])).toBe(false);
  });

  it('buffers possible digraphs from the physical keyboard and backspaces whole tokens', () => {
    const first = appendPhysicalLetter([], '', 's');
    expect(first).toEqual({ tokens: [], pending: 'S' });
    const digraph = appendPhysicalLetter(first.tokens, first.pending, 'h');
    expect(digraph).toEqual({ tokens: ['SH'], pending: '' });
    expect(backspaceInput(digraph.tokens, digraph.pending)).toEqual({ tokens: [], pending: '' });

    const starter = appendPhysicalLetter([], '', 'l');
    expect(backspaceInput(starter.tokens, starter.pending)).toEqual({ tokens: [], pending: '' });
    expect(appendPhysicalLetter(starter.tokens, starter.pending, 'a')).toEqual({
      tokens: ['L', 'A'],
      pending: '',
    });
  });
});
