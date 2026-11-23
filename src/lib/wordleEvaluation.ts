export type WordleMark = 'green' | 'yellow' | 'gray';
export type KeyboardMark = WordleMark;

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

const MARK_PRIORITY: Record<WordleMark, number> = {
  gray: 0,
  yellow: 1,
  green: 2,
};

export function getKeyboardMarks(
  guesses: readonly (readonly string[])[],
  answer: readonly string[],
): Map<string, KeyboardMark> {
  const keyboard = new Map<string, KeyboardMark>();

  for (const guess of guesses) {
    evaluateWordle(guess, answer).forEach((mark, index) => {
      const token = guess[index];
      if (!token) return;
      const previous = keyboard.get(token);
      if (!previous || MARK_PRIORITY[mark] > MARK_PRIORITY[previous]) {
        keyboard.set(token, mark);
      }
    });
  }

  return keyboard;
}
