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

test('Wordle virtual keyboard fits and accepts an answer on a phone', async ({ page }) => {
  const answer = WORDLE_ANSWERS[0]!;
  await seedState(page, 'shkronjat-tona-wordle-v2', 2, {
    answerIndex: 0,
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

test('touch tap selection works in Lidh Shkronjat on a narrow phone', async ({ page }) => {
  const puzzle = CONNECT_PUZZLES[0]!;
  await seedState(page, 'shkronjat-tona-connect-v2', 2, {
    puzzleId: puzzle.id,
    found: [],
    tiles: puzzle.tiles,
    score: 0,
  });
  await page.goto('/lojerat/lidh-shkronjat');

  const target = puzzle.targets[0]!;
  for (const index of findTileIndices(puzzle.tiles, target.tokens)) {
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
