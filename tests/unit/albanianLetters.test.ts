import { describe, expect, it } from 'vitest';
import { ALBANIAN_ALPHABET, DIGRAPHS, VOWELS, normalizeAlbanian, resolveWordTokens, albanianLetterCount } from '../../src/lib/albanianLetters';
import { evaluateWordle } from '../../src/lib/wordleEvaluation';
import { WORDLE_ANSWERS } from '../../src/data/wordleWords';

describe('Albanian letter engine',()=>{
 it('contains 36 letters, 9 digraphs and 7 vowels',()=>{
  expect(ALBANIAN_ALPHABET).toHaveLength(36);expect(DIGRAPHS).toHaveLength(9);expect(VOWELS).toHaveLength(7);
 });
 it('tokenizes curated words correctly',()=>{
  expect(resolveWordTokens('SHQIP',[canonical('SHQIP')],['SH','Q','I','P'])).toEqual(['SH','Q','I','P']);
  expect(resolveWordTokens('shkollë',[],['SH','K','O','LL','Ë'])).toEqual(['SH','K','O','LL','Ë']);
  expect(resolveWordTokens('një',[],['NJ','Ë'])).toEqual(['NJ','Ë']);
  expect(resolveWordTokens('xhami',[],['XH','A','M','I'])).toEqual(['XH','A','M','I']);
  expect(resolveWordTokens('çelës',[],['Ç','E','L','Ë','S'])).toEqual(['Ç','E','L','Ë','S']);
  expect(albanianLetterCount(['SH','Q','I','P'])).toBe(4);
 });
 it('uses NFC and Albanian casing',()=>expect(normalizeAlbanian('e\u0308')).toBe('Ë'));
 it('keeps ng as two letters',()=>expect(resolveWordTokens('ng',[],['N','G'])).toEqual(['N','G']));
});

function canonical(value:string){return normalizeAlbanian(value)}

describe('Wordle evaluation',()=>{
 it('marks exact, misplaced and repeated letters correctly',()=>{
  expect(evaluateWordle(['K','U','K','A','N'],['K','A','K','A','N'])).toEqual(['green','gray','green','green','green']);
 });
 it('all answer entries have five Albanian letter tokens',()=>{
  for(const entry of WORDLE_ANSWERS){
   expect(entry.tokens).toHaveLength(5);
   expect(entry.display.trim().length).toBeGreaterThan(0);
  }
 });
});
