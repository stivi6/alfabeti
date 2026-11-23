export const ALBANIAN_ALPHABET = [
  'A', 'B', 'C', 'Ç', 'D', 'DH', 'E', 'Ë', 'F', 'G', 'GJ', 'H',
  'I', 'J', 'K', 'L', 'LL', 'M', 'N', 'NJ', 'O', 'P', 'Q', 'R',
  'RR', 'S', 'SH', 'T', 'TH', 'U', 'V', 'X', 'XH', 'Y', 'Z', 'ZH',
] as const;

export const DIGRAPHS = ['DH', 'GJ', 'LL', 'NJ', 'RR', 'SH', 'TH', 'XH', 'ZH'] as const;
export const VOWELS = ['A', 'E', 'Ë', 'I', 'O', 'U', 'Y'] as const;

const ALPHABET_SET = new Set<string>(ALBANIAN_ALPHABET);
const DIGRAPH_SET = new Set<string>(DIGRAPHS);
const DIGRAPH_PREFIXES = new Set(DIGRAPHS.map((digraph) => digraph[0]));

export function normalizeAlbanian(value: string): string {
  return value.normalize('NFC').trim().toLocaleUpperCase('sq-AL').replace(/\s+/g, '');
}

export function canonicalAlbanian(value: string): string {
  return normalizeAlbanian(value);
}

export function canonicalTokenSequence(tokens: readonly string[]): string {
  return tokens.map(normalizeAlbanian).join('\u001f');
}

export function tokenizeAlbanianWord(display: string): string[] {
  const letters = Array.from(normalizeAlbanian(display));
  const tokens: string[] = [];

  for (let index = 0; index < letters.length; index += 1) {
    const pair = `${letters[index] ?? ''}${letters[index + 1] ?? ''}`;
    if (DIGRAPH_SET.has(pair)) {
      tokens.push(pair);
      index += 1;
      continue;
    }

    const letter = letters[index] ?? '';
    if (!ALPHABET_SET.has(letter)) return [];
    tokens.push(letter);
  }

  return tokens;
}

export function validateCuratedWord(display: string, tokens: readonly string[]): boolean {
  if (tokens.length === 0 || tokens.some((token) => !ALPHABET_SET.has(normalizeAlbanian(token)))) {
    return false;
  }

  return canonicalTokenSequence(tokenizeAlbanianWord(display)) === canonicalTokenSequence(tokens)
    && normalizeAlbanian(tokens.join('')) === normalizeAlbanian(display);
}

export function canBuildWordFromRack(
  rack: readonly string[],
  word: readonly string[],
): boolean {
  if (word.length === 0 || word.length > rack.length) return false;

  const available = new Map<string, number>();
  for (const token of rack) {
    const normalized = normalizeAlbanian(token);
    if (!ALPHABET_SET.has(normalized)) return false;
    available.set(normalized, (available.get(normalized) ?? 0) + 1);
  }

  for (const token of word) {
    const normalized = normalizeAlbanian(token);
    const count = available.get(normalized) ?? 0;
    if (!ALPHABET_SET.has(normalized) || count === 0) return false;
    available.set(normalized, count - 1);
  }

  return true;
}

export interface TokenInputState {
  tokens: string[];
  pending: string;
}

export function appendPhysicalLetter(
  tokens: readonly string[],
  pending: string,
  key: string,
): TokenInputState {
  const characters = Array.from(normalizeAlbanian(key));
  if (characters.length !== 1 || !ALPHABET_SET.has(characters[0] ?? '')) {
    return { tokens: [...tokens], pending };
  }

  const letter = characters[0] ?? '';
  const digraph = `${pending}${letter}`;
  if (pending && DIGRAPH_SET.has(digraph)) {
    return { tokens: [...tokens, digraph], pending: '' };
  }

  const committed = pending ? [...tokens, pending] : [...tokens];
  if (DIGRAPH_PREFIXES.has(letter)) {
    return { tokens: committed, pending: letter };
  }

  return { tokens: [...committed, letter], pending: '' };
}

export function commitPendingToken(tokens: readonly string[], pending: string): string[] {
  return pending ? [...tokens, pending] : [...tokens];
}

export function backspaceInput(tokens: readonly string[], pending: string): TokenInputState {
  if (pending) return { tokens: [...tokens], pending: '' };
  return { tokens: tokens.slice(0, -1), pending: '' };
}

export function backspaceTokens(tokens: readonly string[]): string[] {
  return tokens.slice(0, -1);
}

export function albanianLetterCount(tokens: readonly string[]): number {
  return tokens.filter(Boolean).length;
}
