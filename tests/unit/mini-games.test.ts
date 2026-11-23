import { describe, expect, it } from 'vitest';
import { ALBANIAN_ALPHABET, DIGRAPHS, VOWELS } from '../../src/data/exercises';

describe('shared Albanian alphabet module', () => {
  it('exposes all 36 letters and nine digraph units', () => {
    expect(ALBANIAN_ALPHABET).toHaveLength(36);
    expect(DIGRAPHS).toHaveLength(9);
    expect(VOWELS).toHaveLength(7);
    expect(ALBANIAN_ALPHABET).toEqual(expect.arrayContaining(['Ç', 'Ë', 'SH', 'NJ', 'RR']));
  });
});
