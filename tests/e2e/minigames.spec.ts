import { expect, test, type Page } from '@playwright/test';
import { CONNECT_PUZZLES } from '../../src/data/connectLetterPuzzles';
import { WORD_CONNECT_ROUNDS } from '../../src/data/wordConnectRounds';
import { WORDLE_ALLOWED, WORDLE_ANSWERS } from '../../src/data/wordleWords';

async function seedState(page: Page, key: string, version: number, data: unknown) {
  await page.addInitScript(
    ({ storageKey, storageVersion, storageData }) => {
      localStorage.setItem(storageKey, JSON.stringify({ version: storageVersion, data: storageData }));
    },
    { storageKey: key, storageVersion: version, storageData: data },
  );
}

function findTileIndices(tiles: readonly string[], wordTokens: readonly string[]): number[] {
  const used = new Set<number>();
  return wordTokens.map((token) => {
    const index = tiles.findIndex((tile, tileIndex) => tile === token && !used.has(tileIndex));
    if (index < 0) throw new Error(`Missing tile ${token} for ${wordTokens.join('')}`);
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

async function tapTiles(page: Page, prefix: string, tiles: readonly string[], tokens: readonly string[]) {
  for (const index of findTileIndices(tiles, tokens)) {
    await page.getByTestId(`${prefix}-${index}`).click();
  }
}

async function tapLine(page: Page, prefix: string, tiles: readonly string[], columns: number, tokens: readonly string[]) {
  for (const index of findLineIndices(tiles, columns, tokens)) {
    await page.getByTestId(`${prefix}-${index}`).click();
  }
}

async function dragIndices(page: Page, prefix: string, indices: readonly number[]) {
  for (const index of indices) {
    await page.getByTestId(`${prefix}-${index}`).scrollIntoViewIfNeeded();
  }
  const boxes = await Promise.all(indices.map((index) => page.getByTestId(`${prefix}-${index}`).boundingBox()));
  if (boxes.some((box) => box === null)) throw new Error('A letter tile is not visible.');
  const points = boxes.map((box) => ({
    x: box!.x + box!.width / 2,
    y: box!.y + box!.height / 2,
  }));
  await page.mouse.move(points[0]!.x, points[0]!.y);
  await page.mouse.down();
  for (const point of points.slice(1)) {
    await page.mouse.move(point.x, point.y, { steps: 6 });
  }
  await page.mouse.up();
}

async function dragTiles(page: Page, prefix: string, tiles: readonly string[], tokens: readonly string[]) {
  await dragIndices(page, prefix, findTileIndices(tiles, tokens));
}

async function dragLine(page: Page, prefix: string, tiles: readonly string[], columns: number, tokens: readonly string[]) {
  await dragIndices(page, prefix, findLineIndices(tiles, columns, tokens));
}

test.describe('mini-games hub', () => {
  test('links to all three games', async ({ page }) => {
    await page.goto('/lojerat');
    await expect(page.getByRole('heading', { level: 1, name: 'Zgjidh një lojë' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Wordle Shqip/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Lidh Shkronjat/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Gjej Fjalët/ })).toBeVisible();
    await expect(page.getByText(/Lidh pesë shkronja/)).toBeVisible();
  });
});

test.describe('Wordle Shqip', () => {
  test('gives Wordle feedback, reveals green positions, and preserves keyboard best marks', async ({ page }) => {
    await seedState(page, 'shkronjat-tona-wordle-v2', 2, {
      answerIndex: 0,
      guesses: [],
      inputTokens: [],
      pendingToken: '',
      status: 'active',
    });
    await page.goto('/lojerat/wordle');

    for (const token of WORDLE_ALLOWED.find((word) => word.display === 'drejt')!.tokens) {
      await page.getByTestId(`wordle-key-${token}`).click();
    }
    await page.getByRole('button', { name: 'Kontrollo' }).click();
    await expect(page.getByTestId('wordle-tile-0-3')).toHaveClass(/bg-\[#B59F3B\]/);
    await expect(page.getByTestId('wordle-key-J')).toHaveClass(/bg-\[#B59F3B\]/);
    await expect(page.getByTestId('wordle-reveal-1')).toHaveText('□');

    for (const token of WORDLE_ALLOWED.find((word) => word.display === 'djalë')!.tokens) {
      await page.getByTestId(`wordle-key-${token}`).click();
    }
    await page.getByRole('button', { name: 'Kontrollo' }).click();
    await expect(page.getByTestId('wordle-tile-1-1')).toHaveClass(/bg-\[#538D4E\]/);
    await expect(page.getByTestId('wordle-reveal-1')).toHaveText('J');

    for (const token of WORDLE_ALLOWED.find((word) => word.display === 'qepje')!.tokens) {
      await page.getByTestId(`wordle-key-${token}`).click();
    }
    await page.getByRole('button', { name: 'Kontrollo' }).click();
    await expect(page.getByTestId('wordle-key-J')).toHaveClass(/bg-\[#538D4E\]/);

    for (const token of WORDLE_ANSWERS[0]!.tokens) {
      await page.getByTestId(`wordle-key-${token}`).click();
    }
    await page.getByRole('button', { name: 'Kontrollo' }).click();
    await expect(page.getByText('Urime, e gjete fjalën!')).toBeVisible();
    await expect(page.getByTestId('wordle-reveal-0')).toHaveText('F');
    await expect(page.getByTestId('wordle-reveal-4')).toHaveText('Ë');
  });

  test('buffers physical digraph input and deletes a whole token', async ({ page }) => {
    const answerIndex = WORDLE_ANSWERS.findIndex((word) => word.display === 'shkollë');
    await seedState(page, 'shkronjat-tona-wordle-v2', 2, {
      answerIndex,
      guesses: [],
      inputTokens: [],
      pendingToken: '',
      status: 'active',
    });
    await page.goto('/lojerat/wordle');

    for (const key of ['s', 'h', 'k', 'o', 'l', 'l']) {
      await page.keyboard.press(key);
    }
    await page.getByTestId('wordle-key-Ë').click();

    await expect(page.getByTestId('wordle-tile-0-0')).toHaveText('SH');
    await expect(page.getByTestId('wordle-tile-0-3')).toHaveText('LL');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await expect(page.getByTestId('wordle-tile-0-3')).toHaveText('');
    await expect(page.getByTestId('wordle-tile-0-4')).toHaveText('');

    await page.keyboard.press('l');
    await page.keyboard.press('l');
    await page.getByTestId('wordle-key-Ë').click();
    await page.keyboard.press('Enter');
    await expect(page.getByText('Urime, e gjete fjalën!')).toBeVisible();
  });

  test('accepts any five-letter guess, keeps short input in the row, persists guesses, and ends after six guesses', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('shkronjat-tona-wordle-v2', JSON.stringify({
      version: 2,
      data: {
        answerIndex: 0,
        guesses: [],
        inputTokens: [],
        pendingToken: '',
        status: 'active',
      },
    })));
    await page.goto('/lojerat/wordle');

    for (const token of ['A', 'B', 'C', 'D']) {
      await page.getByTestId(`wordle-key-${token}`).click();
    }
    await page.getByRole('button', { name: 'Kontrollo' }).click();
    await expect(page.getByRole('status')).toContainText('Plotëso pesë shkronja');
    await expect(page.getByTestId('wordle-tile-0-0')).toHaveText('A');
    await page.getByTestId('wordle-key-E').click();
    await page.getByRole('button', { name: 'Kontrollo' }).click();
    await expect(page.getByTestId('wordle-tile-0-0')).toHaveText('A');
    await expect(page.getByTestId('wordle-tile-0-4')).toHaveText('E');
    await expect(page.getByTestId('wordle-tile-1-0')).toHaveText('');
    await page.reload();
    await expect(page.getByTestId('wordle-tile-0-0')).toHaveText('A');
    await expect(page.getByTestId('wordle-tile-0-4')).toHaveText('E');

    for (let attempt = 0; attempt < 5; attempt += 1) {
      for (let letter = 0; letter < 5; letter += 1) {
        await page.getByTestId('wordle-key-B').click();
      }
      await page.getByRole('button', { name: 'Kontrollo' }).click();
    }
    await expect(page.getByText('Fjala ishte fjalë.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Fillo një raund të ri' })).toBeVisible();
    for (let index = 0; index < 5; index += 1) {
      await expect(page.getByTestId(`wordle-reveal-${index}`)).not.toHaveText('□');
    }
  });
});

test.describe('Lidh Shkronjat', () => {
  test('shows a live drag path, validates words, prevents duplicates, persists progress, and loads another puzzle', async ({ page }) => {
    const puzzle = CONNECT_PUZZLES[0]!;
    await page.goto('/');
    await page.evaluate(({ puzzleId, tiles }) => localStorage.setItem('shkronjat-tona-connect-v2', JSON.stringify({
      version: 2,
      data: { puzzleId, found: [], tiles, score: 0 },
    })), { puzzleId: puzzle.id, tiles: puzzle.tiles });
    await page.goto('/lojerat/lidh-shkronjat');
    await expect(page.getByRole('heading', { level: 1, name: puzzle.title })).toBeVisible();

    await page.getByTestId('connect-tile-0').click();
    await page.getByTestId(`connect-tile-${puzzle.gridSize + 1}`).click();
    await expect(page.getByTestId('connect-word')).toHaveText(puzzle.tiles[0]!);
    await expect(page.locator('p[role="status"]')).toContainText('pllakat fqinje');
    await page.getByRole('button', { name: 'Pastro zgjedhjen' }).click();

    await dragLine(page, 'connect-tile', puzzle.tiles, puzzle.gridSize, ['F', 'J', 'A', 'L']);
    await page.getByRole('button', { name: 'Kontrollo fjalën' }).click();
    await expect(page.getByRole('status')).toContainText('nuk është një nga fjalët');
    await expect(page.getByTestId('connect-progress')).toHaveText('0 / 4');

    const answer = puzzle.targets[0]!;
    await dragLine(page, 'connect-tile', puzzle.tiles, puzzle.gridSize, answer.tokens);
    await expect(page.getByTestId('connect-tile-path')).toHaveAttribute('points', /\d+(?:\.\d+)?,\d+(?:\.\d+)? \d+(?:\.\d+)?,\d+(?:\.\d+)?/);
    await expect(page.getByTestId('connect-word')).toHaveText('FJALË');
    await page.getByRole('button', { name: 'Kontrollo fjalën' }).click();
    await expect(page.getByTestId('connect-progress')).toHaveText('1 / 4');
    await expect(page.getByTestId('connect-score')).toHaveText('50');
    await expect(page.getByTestId('connect-target-0')).toContainText('fjalë');

    const verticalAnswer = puzzle.targets[3]!;
    await dragLine(page, 'connect-tile', puzzle.tiles, puzzle.gridSize, verticalAnswer.tokens);
    await expect(page.getByTestId('connect-word')).toHaveText('SHKOLLË');
    await page.getByRole('button', { name: 'Kontrollo fjalën' }).click();
    await expect(page.getByTestId('connect-progress')).toHaveText('2 / 4');

    await page.reload();
    await expect(page.getByTestId('connect-progress')).toHaveText('2 / 4');
    await tapLine(page, 'connect-tile', puzzle.tiles, puzzle.gridSize, answer.tokens);
    await page.getByRole('button', { name: 'Kontrollo fjalën' }).click();
    await expect(page.getByRole('status')).toContainText('tashmë');

    await page.getByRole('button', { name: 'Puzzle i ri' }).click();
    await expect(page.getByRole('heading', { level: 1 })).not.toHaveText(puzzle.title);
    await expect(page.getByTestId('connect-progress')).toHaveText('0 / 4');
  });

  test('lets the player build every target word across every puzzle', async ({ page }) => {
    const firstPuzzle = CONNECT_PUZZLES[0]!;
    const stalePuzzle = CONNECT_PUZZLES[1]!;
    await page.goto('/');
    await page.evaluate(({ puzzleId, tiles }) => localStorage.setItem('shkronjat-tona-connect-v2', JSON.stringify({
      version: 2,
      data: { puzzleId, found: [], tiles, score: 0 },
    })), { puzzleId: stalePuzzle.id, tiles: Array(stalePuzzle.tiles.length).fill('A') });
    await page.goto('/lojerat/lidh-shkronjat');
    await expect(page.getByRole('heading', { level: 1, name: firstPuzzle.title })).toBeVisible();

    for (const [puzzleIndex, puzzle] of CONNECT_PUZZLES.entries()) {
      await expect(page.getByRole('heading', { level: 1, name: puzzle.title })).toBeVisible();
      const tiles = await page.locator('[data-testid^="connect-tile-"][data-letter-index]').allTextContents();
      for (const [targetIndex, target] of puzzle.targets.entries()) {
        await tapLine(page, 'connect-tile', tiles, puzzle.gridSize, target.tokens);
        await expect(page.getByTestId('connect-word')).toHaveText(target.tokens.join(''));
        await page.getByRole('button', { name: 'Kontrollo fjalën' }).click();
        await expect(page.getByTestId('connect-progress')).toHaveText(`${targetIndex + 1} / ${puzzle.targets.length}`);
        await expect(page.locator('p[role="status"]')).toContainText(`gjete fjalën «${target.word}»`);
      }

      if (puzzleIndex < CONNECT_PUZZLES.length - 1) {
        await page.getByRole('button', { name: 'Puzzle i ri' }).click();
      }
    }
  });
});

test.describe('Gjej Fjalët — Word Connect', () => {
  test('uses five tiles, shows connecting lines, rejects invalid and repeated words, completes, and shuffles to new letters', async ({ page }) => {
    const round = WORD_CONNECT_ROUNDS[0]!;
    await page.goto('/');
    await page.evaluate(({ roundId, letters }) => localStorage.setItem('shkronjat-tona-word-connect-v1', JSON.stringify({
      version: 1,
      data: { roundId, letters, found: [], score: 0 },
    })), { roundId: round.id, letters: round.letters });
    await page.goto('/lojerat/gjej-fjalët');
    const tiles = page.locator('[data-testid^="word-connect-tile-"][data-letter-index]');
    await expect(tiles).toHaveCount(5);

    await tapTiles(page, 'word-connect-tile', round.letters, ['F', 'A', 'J', 'L']);
    await page.getByRole('button', { name: 'Gjej fjalën' }).click();
    await expect(page.getByRole('status')).toContainText('nuk është në fjalorin');
    await expect(page.getByTestId('word-connect-progress')).toHaveText('0 / 5');

    const firstWord = round.words.find((word) => word.display === 'fjalë')!;
    await dragTiles(page, 'word-connect-tile', round.letters, firstWord.tokens);
    await expect(page.getByTestId('word-connect-tile-path')).toHaveAttribute('points', /\d+(?:\.\d+)?,\d+(?:\.\d+)? \d+(?:\.\d+)?,\d+(?:\.\d+)?/);
    await expect(page.getByTestId('word-connect-current')).toHaveText('FJALË');
    await page.getByRole('button', { name: 'Gjej fjalën' }).click();
    await expect(page.getByTestId('word-connect-progress')).toHaveText('1 / 5');
    await expect(page.getByTestId('word-connect-score')).toHaveText('50');
    await expect(page.getByRole('list')).toContainText('fjalë');

    await tapTiles(page, 'word-connect-tile', round.letters, firstWord.tokens);
    await page.getByRole('button', { name: 'Gjej fjalën' }).click();
    await expect(page.getByRole('status')).toContainText('tashmë');

    for (const word of round.words.filter((item) => item.display !== firstWord.display)) {
      await tapTiles(page, 'word-connect-tile', round.letters, word.tokens);
      await page.getByRole('button', { name: 'Gjej fjalën' }).click();
    }
    await expect(page.getByText('I gjete të gjitha 5 fjalët!')).toBeVisible();
    await expect(page.getByText('Rezultati yt: 170 pikë.')).toBeVisible();

    await page.reload();
    await expect(page.getByText('I gjete të gjitha 5 fjalët!')).toBeVisible();
    await page.getByRole('button', { name: 'Raund i ri' }).click();
    const nextRound = WORD_CONNECT_ROUNDS[1]!;
    await expect(page.getByText(nextRound.title)).toBeVisible();
    await expect(page.getByTestId('word-connect-progress')).toHaveText('0 / 5');
    const newTiles = await page.locator('[data-testid^="word-connect-tile-"][data-letter-index]').allTextContents();
    expect([...newTiles].sort()).not.toEqual([...round.letters].sort());
  });

  test('lets the player build every target word across every round', async ({ page }) => {
    const firstRound = WORD_CONNECT_ROUNDS[0]!;
    const staleRound = WORD_CONNECT_ROUNDS[1]!;
    await page.goto('/');
    await page.evaluate(({ roundId, letters }) => localStorage.setItem('shkronjat-tona-word-connect-v1', JSON.stringify({
      version: 1,
      data: { roundId, letters, found: [], score: 0 },
    })), { roundId: staleRound.id, letters: Array(5).fill('A') });
    await page.goto('/lojerat/gjej-fjalët');
    await expect(page.getByText(firstRound.title, { exact: true })).toBeVisible();

    for (const [roundIndex, round] of WORD_CONNECT_ROUNDS.entries()) {
      await expect(page.getByText(round.title, { exact: true })).toBeVisible();
      const letters = await page.locator('[data-testid^="word-connect-tile-"][data-letter-index]').allTextContents();
      for (const [wordIndex, word] of round.words.entries()) {
        await tapTiles(page, 'word-connect-tile', letters, word.tokens);
        await expect(page.getByTestId('word-connect-current')).toHaveText(word.tokens.join(''));
        await page.getByRole('button', { name: 'Gjej fjalën' }).click();
        await expect(page.getByTestId('word-connect-progress')).toHaveText(`${wordIndex + 1} / ${round.words.length}`);
        await expect(page.locator('p[role="status"]')).toContainText(`Fjalë e re: «${word.display}»!`);
      }

      if (roundIndex < WORD_CONNECT_ROUNDS.length - 1) {
        await page.getByRole('button', { name: 'Raund i ri' }).click();
      }
    }
  });
});
