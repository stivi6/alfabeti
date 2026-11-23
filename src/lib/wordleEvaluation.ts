export type WordleMark = 'green' | 'yellow' | 'gray';

export function evaluateWordle(guess: readonly string[], answer: readonly string[]): WordleMark[] {
  const marks: WordleMark[] = Array.from({ length: answer.length }, () => 'gray');
  const remaining = new Map<string, number>();

  answer.forEach((letter, index) => {
    if (guess[index] === letter) marks[index] = 'green';
    else remaining.set(letter, (remaining.get(letter) ?? 0) + 1);
  });

  guess.forEach((letter, index) => {
    if (marks[index] === 'green') return;
    const count = remaining.get(letter) ?? 0;
    if (count > 0) {
      marks[index] = 'yellow';
      remaining.set(letter, count - 1);
    }
  });
  return marks;
}
