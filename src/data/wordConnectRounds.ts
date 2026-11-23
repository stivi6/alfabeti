import { validateCuratedWord } from '../lib/albanianLetters';

export interface WordConnectWord {
  display: string;
  tokens: string[];
}

export interface WordConnectRound {
  id: string;
  title: string;
  letters: string[];
  words: WordConnectWord[];
}

function word(display: string, ...tokens: string[]): WordConnectWord {
  const entry = { display, tokens };
  if (!validateCuratedWord(display, tokens)) {
    throw new Error(`Tokenët nuk përputhen me fjalën e fjalorit: ${display}`);
  }
  return entry;
}

// Each listed headword was checked against Fjalori i Gjuhës së Sotme Shqipe:
// https://fjalori.shkenca.org/ (offline game data, checked 2026-11-23).
export const WORD_CONNECT_ROUNDS: WordConnectRound[] = [
  {
    id: 'fjale',
    title: 'Fjalë të vogla, kuptime të mëdha',
    letters: ['F', 'J', 'A', 'L', 'Ë'],
    words: [
      word('fjalë', 'F', 'J', 'A', 'L', 'Ë'),
      word('falë', 'F', 'A', 'L', 'Ë'),
      word('fal', 'F', 'A', 'L'),
      word('faj', 'F', 'A', 'J'),
      word('lë', 'L', 'Ë'),
    ],
  },
  {
    id: 'shtepi',
    title: 'Në shtëpi',
    letters: ['SH', 'T', 'Ë', 'P', 'I'],
    words: [
      word('shtëpi', 'SH', 'T', 'Ë', 'P', 'I'),
      word('shi', 'SH', 'I'),
      word('pi', 'P', 'I'),
      word('të', 'T', 'Ë'),
      word('ti', 'T', 'I'),
    ],
  },
  {
    id: 'shqip',
    title: 'Shqip',
    letters: ['SH', 'Q', 'I', 'P', 'E'],
    words: [
      word('shqip', 'SH', 'Q', 'I', 'P'),
      word('shi', 'SH', 'I'),
      word('pi', 'P', 'I'),
    ],
  },
  {
    id: 'liber',
    title: 'Lexim dhe mësim',
    letters: ['L', 'I', 'B', 'Ë', 'R'],
    words: [
      word('libër', 'L', 'I', 'B', 'Ë', 'R'),
      word('bëri', 'B', 'Ë', 'R', 'I'),
      word('birë', 'B', 'I', 'R', 'Ë'),
      word('lirë', 'L', 'I', 'R', 'Ë'),
      word('bir', 'B', 'I', 'R'),
      word('ri', 'R', 'I'),
      word('lë', 'L', 'Ë'),
    ],
  },
  {
    id: 'drite',
    title: 'Dritë dhe dituri',
    letters: ['D', 'R', 'I', 'T', 'Ë'],
    words: [
      word('dritë', 'D', 'R', 'I', 'T', 'Ë'),
      word('ditë', 'D', 'I', 'T', 'Ë'),
      word('tri', 'T', 'R', 'I'),
      word('ri', 'R', 'I'),
      word('di', 'D', 'I'),
      word('të', 'T', 'Ë'),
    ],
  },
  {
    id: 'are',
    title: 'Fjalë të shkurtra',
    letters: ['A', 'R', 'E', 'Ë', 'T'],
    words: [
      word('arë', 'A', 'R', 'Ë'),
      word('art', 'A', 'R', 'T'),
      word('atë', 'A', 'T', 'Ë'),
      word('erë', 'E', 'R', 'Ë'),
      word('ter', 'T', 'E', 'R'),
      word('të', 'T', 'Ë'),
    ],
  },
  {
    id: 'qershi',
    title: 'Qershi',
    letters: ['Q', 'E', 'R', 'SH', 'I'],
    words: [
      word('qershi', 'Q', 'E', 'R', 'SH', 'I'),
      word('shi', 'SH', 'I'),
      word('ri', 'R', 'I'),
    ],
  },
  {
    id: 'shpirt',
    title: 'Shpirt dhe fjalë',
    letters: ['SH', 'P', 'I', 'R', 'T'],
    words: [
      word('shpirt', 'SH', 'P', 'I', 'R', 'T'),
      word('shi', 'SH', 'I'),
      word('pi', 'P', 'I'),
      word('ri', 'R', 'I'),
    ],
  },
];
