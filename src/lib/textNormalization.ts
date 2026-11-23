/**
 * Normalizes a built sentence for comparison.
 * - collapses repeated spaces
 * - trims leading/trailing whitespace
 * - removes one optional final full stop
 * - preserves capitalization and Albanian characters
 */
export function normalizeSentence(value: string): string {
  const collapsed = value.normalize('NFC').replace(/\s+/g, ' ').trim();
  return collapsed.endsWith('.') ? collapsed.slice(0, -1).trimEnd() : collapsed;
}

export function normalizeAnswer(value: string): string {
  return normalizeSentence(value).toLocaleLowerCase('de-DE');
}
