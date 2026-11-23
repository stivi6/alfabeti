import { validateCuratedWord } from '../lib/albanianLetters';

export interface WordEntry {
  display: string;
  tokens: string[];
}

export const WORD_DICTIONARY_SOURCE = {
  title: 'Fjalori i Gjuhës së Sotme Shqipe',
  url: 'https://fjalori.shkenca.org/',
  verifiedOn: '2026-11-23',
} as const;

function entry(display: string, ...tokens: string[]): WordEntry {
  const word = { display, tokens };
  if (!validateCuratedWord(display, tokens)) {
    throw new Error(`Tokenët nuk përputhen me fjalën e fjalorit: ${display}`);
  }
  return word;
}

// Headwords were checked against WORD_DICTIONARY_SOURCE. This offline list is
// intentionally curated; it is not a generated or permissive spelling filter.
export const WORDLE_ANSWERS: WordEntry[] = [
  entry('fjalë', 'F', 'J', 'A', 'L', 'Ë'),
  entry('çelës', 'Ç', 'E', 'L', 'Ë', 'S'),
  entry('libër', 'L', 'I', 'B', 'Ë', 'R'),
  entry('drejt', 'D', 'R', 'E', 'J', 'T'),
  entry('dashur', 'D', 'A', 'SH', 'U', 'R'),
  entry('shkollë', 'SH', 'K', 'O', 'LL', 'Ë'),
  entry('thesar', 'TH', 'E', 'S', 'A', 'R'),
  entry('motër', 'M', 'O', 'T', 'Ë', 'R'),
  entry('bukur', 'B', 'U', 'K', 'U', 'R'),
  entry('çantë', 'Ç', 'A', 'N', 'T', 'Ë'),
  entry('zemër', 'Z', 'E', 'M', 'Ë', 'R'),
  entry('shtëpi', 'SH', 'T', 'Ë', 'P', 'I'),
  entry('lëndë', 'L', 'Ë', 'N', 'D', 'Ë'),
  entry('mësim', 'M', 'Ë', 'S', 'I', 'M'),
  entry('ditur', 'D', 'I', 'T', 'U', 'R'),
  entry('gatim', 'G', 'A', 'T', 'I', 'M'),
  entry('qytet', 'Q', 'Y', 'T', 'E', 'T'),
  entry('pranë', 'P', 'R', 'A', 'N', 'Ë'),
  entry('djalë', 'D', 'J', 'A', 'L', 'Ë'),
  entry('detar', 'D', 'E', 'T', 'A', 'R'),
  entry('shpejt', 'SH', 'P', 'E', 'J', 'T'),
  entry('ëmbël', 'Ë', 'M', 'B', 'Ë', 'L'),
  entry('sjellë', 'S', 'J', 'E', 'LL', 'Ë'),
  entry('sotme', 'S', 'O', 'T', 'M', 'E'),
  entry('punim', 'P', 'U', 'N', 'I', 'M'),
  entry('qershi', 'Q', 'E', 'R', 'SH', 'I'),
  entry('lartë', 'L', 'A', 'R', 'T', 'Ë'),
  entry('lexoj', 'L', 'E', 'X', 'O', 'J'),
  entry('pjesë', 'P', 'J', 'E', 'S', 'Ë'),
  entry('qepje', 'Q', 'E', 'P', 'J', 'E'),
  entry('këngë', 'K', 'Ë', 'N', 'G', 'Ë'),
  entry('prind', 'P', 'R', 'I', 'N', 'D'),
  entry('banor', 'B', 'A', 'N', 'O', 'R'),
  entry('fener', 'F', 'E', 'N', 'E', 'R'),
  entry('pazar', 'P', 'A', 'Z', 'A', 'R'),
  entry('qenie', 'Q', 'E', 'N', 'I', 'E'),
];

export const WORDLE_ALLOWED: WordEntry[] = [
  ...WORDLE_ANSWERS,
  entry('qepur', 'Q', 'E', 'P', 'U', 'R'),
  entry('mbret', 'M', 'B', 'R', 'E', 'T'),
  entry('ndjek', 'N', 'D', 'J', 'E', 'K'),
  entry('mbarë', 'M', 'B', 'A', 'R', 'Ë'),
  entry('dritë', 'D', 'R', 'I', 'T', 'Ë'),
  entry('këmbë', 'K', 'Ë', 'M', 'B', 'Ë'),
  entry('shpirt', 'SH', 'P', 'I', 'R', 'T'),
  entry('shëtit', 'SH', 'Ë', 'T', 'I', 'T'),
  entry('çudit', 'Ç', 'U', 'D', 'I', 'T'),
  entry('gëzim', 'G', 'Ë', 'Z', 'I', 'M'),
  entry('gëzoj', 'G', 'Ë', 'Z', 'O', 'J'),
  entry('gjurmë', 'GJ', 'U', 'R', 'M', 'Ë'),
  entry('qeshur', 'Q', 'E', 'SH', 'U', 'R'),
  entry('shtesë', 'SH', 'T', 'E', 'S', 'Ë'),
  entry('rregull', 'RR', 'E', 'G', 'U', 'LL'),
  entry('shkurt', 'SH', 'K', 'U', 'R', 'T'),
  entry('thjesht', 'TH', 'J', 'E', 'SH', 'T'),
  entry('kthyer', 'K', 'TH', 'Y', 'E', 'R'),
  entry('kartë', 'K', 'A', 'R', 'T', 'Ë'),
  entry('kapak', 'K', 'A', 'P', 'A', 'K'),
  entry('kopsht', 'K', 'O', 'P', 'SH', 'T'),
  entry('shkëmb', 'SH', 'K', 'Ë', 'M', 'B'),
  entry('numër', 'N', 'U', 'M', 'Ë', 'R'),
  entry('besim', 'B', 'E', 'S', 'I', 'M'),
  entry('besoj', 'B', 'E', 'S', 'O', 'J'),
  entry('shkrep', 'SH', 'K', 'R', 'E', 'P'),
];
