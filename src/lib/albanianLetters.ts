export const ALBANIAN_ALPHABET = [
  'A','B','C','Ç','D','DH','E','Ë','F','G','GJ','H','I','J','K','L','LL','M','N','NJ',
  'O','P','Q','R','RR','S','SH','T','TH','U','V','X','XH','Y','Z','ZH',
] as const;

export const DIGRAPHS = ['DH','GJ','LL','NJ','RR','SH','TH','XH','ZH'] as const;
export const VOWELS = ['A','E','Ë','I','O','U','Y'] as const;

export function normalizeAlbanian(value: string): string {
  return value.normalize('NFC').trim().toLocaleUpperCase('sq-AL').replace(/\s+/g, '');
}

export function canonicalAlbanian(value: string): string {
  return normalizeAlbanian(value);
}

export function possibleTokenizations(normalized: string): string[][] {
  const value = normalizeAlbanian(normalized);
  const out: string[][] = [];
  const digraphSet = new Set<string>(DIGRAPHS);
  const alphabetSet = new Set<string>(ALBANIAN_ALPHABET);

  const visit = (index: number, tokens: string[]) => {
    if (index === value.length) {
      out.push(tokens);
      return;
    }
    const pairs = [...digraphSet].filter((token) => value.startsWith(token, index));
    for (const token of pairs) visit(index + token.length, [...tokens, token]);
    const one = value[index] ?? '';
    if (alphabetSet.has(one)) visit(index + 1, [...tokens, one]);
  };
  visit(0, []);

  const unique = new Map<string, string[]>();
  for (const tokens of out) unique.set(tokens.join('|'), tokens);
  return [...unique.values()];
}

export function resolveWordTokens(
  displayWord: string,
  lexicon: readonly string[],
  savedTokens?: readonly string[],
): string[] {
  if (savedTokens?.length) return [...savedTokens].map((token) => normalizeAlbanian(token));
  const normalized = normalizeAlbanian(displayWord);
  const lexiconSet = new Set(lexicon.map(canonicalAlbanian));
  const matches = possibleTokenizations(normalized).filter(
    (tokens) => lexiconSet.has(tokens.join('')),
  );
  if (matches.length === 1) return matches[0] ?? [];
  if (matches.length === 0) return possibleTokenizations(normalized)[0] ?? [];
  return matches[0] ?? [];
}

export function tokenizeCuratedWord(word: string, tokens: readonly string[]): string[] {
  if (tokens.length) return [...tokens].map((token) => normalizeAlbanian(token));
  return resolveWordTokens(word, [word]);
}

export function albanianLetterCount(tokens: readonly string[]): number {
  return tokens.filter(Boolean).length;
}

export function backspaceTokens(tokens: readonly string[]): string[] {
  return tokens.slice(0, -1);
}
