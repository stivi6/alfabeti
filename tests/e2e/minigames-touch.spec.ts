import { expect, test } from '@playwright/test';
import { CONNECT_PUZZLES } from '../../src/data/connectLetterPuzzles';
import { WORD_CONNECT_ROUNDS } from '../../src/data/wordConnectRounds';
import { WORDLE_ANSWERS } from '../../src/data/wordleWords';

test.use({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});

async function seedState(page: import('@playwright/test').Page, key: string, version: number, data: unknown) {
  await page.addInitScript(
    ({ storageKey, storageVersion, storageData }) => {
      localStorage.setItem(storageKey, JSON.stringify({ version: storageVersion, data: storageData }));
    },
    { storageKey: key, storageVersion: version, storageData: data },
  );
}

function findTileIndices(tiles: readonly string[], tokens: readonly string[]): number[] {
  const used = new Set<number>();
  return tokens.map((token) => {
    const index = tiles.findIndex((tile, tileIndex) => tile === token && !used.has(tileIndex));
    if (index < 0) throw new Error(`Missing tile ${token}`);
    used.add(index);
    return index;
  });
}

function findLineIndices(tiles: readonly string[], columns: number, tokens: readonly string[]): number[] {
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]] as const;
  for (let start = 0; start < tiles.length; start += 1) {
    for (const [rowStep, columnStep] of directions) {
      const startRow = Math.floor(start / columns);
      const startColumn = start % columns;
      const indices = tokens.map((_, offset) => {
        const row = startRow + rowStep * offset;
        const column = startColumn + columnStep * offset;
        return row < 0 || column < 0 || row >= columns || column >= columns
          ? -1
          : row * columns + column;
      });
      if (indices.every((index, offset) => index >= 0 && tiles[index] === tokens[offset])) {
        return indices;
      }
    }
  }
  throw new Error(`Missing straight path for ${tokens.join('')}`);
}

test('Wordle virtual keyboard fits and accepts an answer on a phone', async ({ page }) => {
  const answer = WORDLE_ANSWERS.find((word) => word.display === 'shkollë')!;
  const answerIndex = WORDLE_ANSWERS.indexOf(answer);
  await seedState(page, 'shkronjat-tona-wordle-v2', 2, {
    answerIndex,
    guesses: [],
    inputTokens: [],
    pendingToken: '',
    status: 'active',
  });
  await page.goto('/lojerat/wordle');

  for (const token of answer.tokens) {
    await page.getByTestId(`wordle-key-${token}`).tap();
  }
  await page.getByRole('button', { name: 'Kontrollo' }).tap();
  await expect(page.getByText('Urime, e gjete fjalën!')).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test('touch tap selection forms Gjej Fjalët words and draws the connecting path', async ({ page }) => {
  const round = WORD_CONNECT_ROUNDS[0]!;
  await seedState(page, 'shkronjat-tona-word-connect-v1', 1, {
    roundId: round.id,
    letters: round.letters,
    found: [],
    score: 0,
  });
  await page.goto('/lojerat/gjej-fjalët');

  for (const index of findTileIndices(round.letters, round.words[0]!.tokens)) {
    await page.getByTestId(`word-connect-tile-${index}`).tap();
  }
  await expect(page.getByTestId('word-connect-current')).toHaveText('FJALË');
  await expect(page.getByTestId('word-connect-tile-path')).toHaveAttribute('points', /\d+(?:\.\d+)?,\d+(?:\.\d+)? \d+(?:\.\d+)?,\d+(?:\.\d+)?/);
  await page.getByRole('button', { name: 'Gjej fjalën' }).tap();
  await expect(page.getByTestId('word-connect-progress')).toHaveText('1 / 5');

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test('phone taps can solve every Gjej Fjalët target across every round', async ({ page }) => {
  const firstRound = WORD_CONNECT_ROUNDS[0]!;
  await seedState(page, 'shkronjat-tona-word-connect-v1', 1, {
    roundId: firstRound.id,
    letters: firstRound.letters,
    found: [],
    score: 0,
  });
  await page.goto('/lojerat/gjej-fjalët');

  for (const [roundIndex, round] of WORD_CONNECT_ROUNDS.entries()) {
    const letters = await page.locator('[data-testid^="word-connect-tile-"][data-letter-index]').allTextContents();
    for (const [wordIndex, word] of round.words.entries()) {
      for (const index of findTileIndices(letters, word.tokens)) {
        await page.getByTestId(`word-connect-tile-${index}`).tap();
      }
      await expect(page.getByTestId('word-connect-current')).toHaveText(word.tokens.join(''));
      await page.getByRole('button', { name: 'Gjej fjalën' }).tap();
      await expect(page.getByTestId('word-connect-progress')).toHaveText(`${wordIndex + 1} / ${round.words.length}`);
    }

    if (roundIndex < WORD_CONNECT_ROUNDS.length - 1) {
      await page.getByRole('button', { name: 'Raund i ri' }).tap();
    }
  }
});

test('touch tap selection works in Lidh Shkronjat on a narrow phone', async ({ page }) => {
  const puzzle = CONNECT_PUZZLES[0]!;
  await seedState(page, 'shkronjat-tona-connect-v2', 2, {
    puzzleId: puzzle.id,
    found: [],
    tiles: puzzle.tiles,
    score: 0,
  });
  await page.goto('/lojerat/lidh-shkronjat');

  const board = page.getByRole('group', { name: 'Pllakat e shkronjave për lidhje' });
  await expect(board.locator('[data-letter-index]')).toHaveCount(puzzle.gridSize ** 2);
  const boardDimensions = await board.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
  expect(Math.abs(boardDimensions.width - boardDimensions.height)).toBeLessThanOrEqual(1);

  const target = puzzle.targets[0]!;
  for (const index of findLineIndices(puzzle.tiles, puzzle.gridSize, target.tokens)) {
    await page.getByTestId(`connect-tile-${index}`).tap();
  }
  await expect(page.getByTestId('connect-word')).toHaveText('FJALË');
  await expect(page.getByTestId('connect-tile-path')).toHaveAttribute('points', /\d+(?:\.\d+)?,\d+(?:\.\d+)? \d+(?:\.\d+)?,\d+(?:\.\d+)?/);
  await page.getByRole('button', { name: 'Kontrollo fjalën' }).tap();
  await expect(page.getByTestId('connect-progress')).toHaveText('1 / 4');

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test('phone taps can solve every straight-line target across all Lidh Shkronjat puzzles', async ({ page }) => {
  const firstPuzzle = CONNECT_PUZZLES[0]!;
  await seedState(page, 'shkronjat-tona-connect-v2', 2, {
    puzzleId: firstPuzzle.id,
    found: [],
    tiles: firstPuzzle.tiles,
    score: 0,
  });
  await page.goto('/lojerat/lidh-shkronjat');

  for (const [puzzleIndex, puzzle] of CONNECT_PUZZLES.entries()) {
    await expect(page.getByRole('heading', { level: 1, name: puzzle.title })).toBeVisible();
    const tiles = await page.locator('[data-testid^="connect-tile-"][data-letter-index]').allTextContents();
    for (const [targetIndex, target] of puzzle.targets.entries()) {
      for (const index of findLineIndices(tiles, puzzle.gridSize, target.tokens)) {
        await page.getByTestId(`connect-tile-${index}`).tap();
      }
      await expect(page.getByTestId('connect-word')).toHaveText(target.tokens.join(''));
      await page.getByRole('button', { name: 'Kontrollo fjalën' }).tap();
      await expect(page.getByTestId('connect-progress')).toHaveText(`${targetIndex + 1} / ${puzzle.targets.length}`);
    }

    if (puzzleIndex < CONNECT_PUZZLES.length - 1) {
      await page.getByRole('button', { name: 'Puzzle i ri' }).tap();
    }
  }
});

test.describe('narrow phone', () => {
  test.use({
    viewport: { width: 320, height: 720 },
    hasTouch: true,
    isMobile: true,
  });

  test('keeps the square letter grid easy to tap and lets a word be found', async ({ page }) => {
    const puzzle = CONNECT_PUZZLES[0]!;
    await seedState(page, 'shkronjat-tona-connect-v2', 2, {
      puzzleId: puzzle.id,
      found: [],
      tiles: puzzle.tiles,
      score: 0,
    });
    await page.goto('/lojerat/lidh-shkronjat');

    const board = page.getByRole('group', { name: 'Pllakat e shkronjave për lidhje' });
    const tile = await page.getByTestId('connect-tile-0').boundingBox();
    expect(tile?.width).toBeGreaterThanOrEqual(44);
    await expect(board.locator('[data-letter-index]')).toHaveCount(puzzle.gridSize ** 2);

    const tiles = await board.locator('[data-letter-index]').allTextContents();
    for (const index of findLineIndices(tiles, puzzle.gridSize, puzzle.targets[0]!.tokens)) {
      await page.getByTestId(`connect-tile-${index}`).tap();
    }
    await page.getByRole('button', { name: 'Kontrollo fjalën' }).tap();
    await expect(page.getByTestId('connect-progress')).toHaveText('1 / 4');

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });

  test('keeps Wordle letter keys tappable and accepts digraphs at 320px', async ({ page }) => {
    const answerIndex = WORDLE_ANSWERS.findIndex((word) => word.display === 'shkollë');
    const answer = WORDLE_ANSWERS[answerIndex]!;
    await seedState(page, 'shkronjat-tona-wordle-v2', 2, {
      answerIndex,
      guesses: [],
      inputTokens: [],
      pendingToken: '',
      status: 'active',
    });
    await page.goto('/lojerat/wordle');

    const key = await page.getByTestId('wordle-key-SH').boundingBox();
    expect(key?.width).toBeGreaterThanOrEqual(44);
    expect(key?.height).toBeGreaterThanOrEqual(44);
    for (const token of answer.tokens) {
      await page.getByTestId(`wordle-key-${token}`).tap();
    }
    await page.getByRole('button', { name: 'Kontrollo' }).tap();
    await expect(page.getByText('Urime, e gjete fjalën!')).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });
});
