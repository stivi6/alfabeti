import { readFile } from 'node:fs/promises';
import {
  BASE, recordScene as captureScene, injectCaption, caption, hideCaption, injectTag,
  move, clickAt, smoothScroll, waitUntil,
} from './lib.mjs';

const only = new Set(process.argv.slice(2));
async function recordScene(options) {
  if (only.size && !only.has(options.name)) return;
  await captureScene(options);
}

const fullSeed = JSON.parse(await readFile('launch/seed-progress.json', 'utf8'));
const partialSeed = {
  version: 1,
  exercises: {},
  lastVisitedExerciseId: 'c2-e2',
  updatedAt: new Date().toISOString(),
};
for (const id of ['c1-e1', 'c1-e2', 'c1-e3', 'c1-e4', 'c1-e5', 'c2-e1']) {
  partialSeed.exercises[id] = fullSeed.exercises[id];
}

async function tapButton(page, name, ms = 420) {
  const location = page.getByRole('button', { name, exact: true });
  const box = await location.boundingBox();
  if (!box) throw new Error(`button not found: ${name}`);
  await move(page, box.x + box.width / 2, box.y + box.height / 2, ms);
  await page.waitForTimeout(110);
  await clickAt(page, box.x + box.width / 2, box.y + box.height / 2);
}

async function tapLink(page, name, ms = 420) {
  const location = page.getByRole('link', { name, exact: true });
  const box = await location.boundingBox();
  if (!box) throw new Error(`link not found: ${name}`);
  await move(page, box.x + box.width / 2, box.y + box.height / 2, ms);
  await page.waitForTimeout(110);
  await clickAt(page, box.x + box.width / 2, box.y + box.height / 2);
}

// 1. Home ------------------------------------------------------------------
await recordScene({
  name: '01-home',
  url: BASE + '/',
  duration: 10.6,
  prepare: injectCaption,
  script: async (page, tl) => {
    await waitUntil(tl, 0.25);
    await caption(page, 'THE IDEA', 'A German course that plays like a game.');
    await waitUntil(tl, 0.95);
    await move(page, 464, 537, 850, 26);
    await waitUntil(tl, 2.15);
    await move(page, 700, 660, 450);
    await waitUntil(tl, 3.0);
    await smoothScroll(page, 720, 1100);
    await waitUntil(tl, 4.5);
    await caption(page, 'THREE CHAPTERS', '45 bite-sized prompts across 15 mini-games.');
    await waitUntil(tl, 5.2);
    await move(page, 552, 330, 600);
    await waitUntil(tl, 5.9);
    await move(page, 960, 330, 600);
    await waitUntil(tl, 6.6);
    await move(page, 1366, 330, 600);
    await waitUntil(tl, 7.2);
    await caption(page, 'BUILT FOR MOMENTUM', 'Short rounds, instant feedback, saved progress.');
    await waitUntil(tl, 7.7);
    await move(page, 760, 780, 750);
    await waitUntil(tl, 9.8);
    await hideCaption(page);
    await waitUntil(tl, 10.6);
  },
});

// 2. Roadmap ---------------------------------------------------------------
await recordScene({
  name: '02-roadmap',
  url: BASE + '/play',
  seed: partialSeed,
  duration: 7.6,
  prepare: injectCaption,
  script: async (page, tl) => {
    await waitUntil(tl, 0.25);
    await caption(page, 'YOUR JOURNEY', 'Six challenges down. Nine to go.');
    await waitUntil(tl, 0.95);
    await move(page, 793, 385, 750);
    await waitUntil(tl, 1.75);
    await move(page, 1453, 385, 1250);
    await waitUntil(tl, 3.0);
    await caption(page, 'REPLAY ANYTIME', 'Finished challenges stay open.');
    await waitUntil(tl, 3.25);
    await move(page, 958, 568, 650);
    await waitUntil(tl, 4.35);
    await move(page, 829, 826, 650);
    await waitUntil(tl, 5.05);
    await caption(page, 'ONE STEP AT A TIME', 'Finish a challenge to unlock the next.');
    await waitUntil(tl, 5.3);
    await move(page, 958, 568, 850);
    await waitUntil(tl, 6.25);
    const nextChallenge = await page.getByRole('link', { name: 'Ndërtuesi i fjalisë', exact: true }).boundingBox();
    if (!nextChallenge) throw new Error('roadmap challenge link not found');
    await move(page, nextChallenge.x + nextChallenge.width / 2, nextChallenge.y + nextChallenge.height / 2, 650);
    await waitUntil(tl, 7.2);
  },
});

// 3. Exercise + summary ----------------------------------------------------
await recordScene({
  name: '03-exercise',
  url: BASE + '/play/c2-e2',
  seed: partialSeed,
  duration: 21.6,
  prepare: injectCaption,
  script: async (page, tl) => {
    await waitUntil(tl, 0.25);
    await caption(page, 'HANDS-ON', 'Tap the words. Build the sentence.');
    await waitUntil(tl, 0.95);
    await tapButton(page, 'Ich', 700);
    await waitUntil(tl, 2.0);
    await tapButton(page, 'lerne', 320);
    await waitUntil(tl, 2.45);
    await tapButton(page, 'Deutsch.', 320);
    await waitUntil(tl, 3.05);
    await tapButton(page, 'Kontrollo përgjigjen', 480);
    await waitUntil(tl, 4.0);
    await caption(page, 'INSTANT FEEDBACK', 'Right away, with a reason that sticks.');
    await waitUntil(tl, 6.05);
    await tapButton(page, 'Vazhdo', 450);
    await waitUntil(tl, 6.9);
    await tapButton(page, 'Heute', 430);
    await waitUntil(tl, 7.35);
    await tapButton(page, 'spiele', 300);
    await waitUntil(tl, 7.8);
    await tapButton(page, 'ich', 300);
    await waitUntil(tl, 8.25);
    await tapButton(page, 'Fußball.', 300);
    await waitUntil(tl, 9.4);
    await tapButton(page, 'Kontrollo përgjigjen', 400);
    await waitUntil(tl, 9.9);
    await caption(page, 'SHORT ROUNDS', 'Three prompts. One quick win.');
    await waitUntil(tl, 11.85);
    await tapButton(page, 'Vazhdo', 400);
    await waitUntil(tl, 12.7);
    await tapButton(page, 'Am Morgen', 430);
    await waitUntil(tl, 13.15);
    await tapButton(page, 'trinke', 280);
    await waitUntil(tl, 13.6);
    await tapButton(page, 'ich', 280);
    await waitUntil(tl, 14.05);
    await tapButton(page, 'Wasser.', 280);
    await waitUntil(tl, 15.15);
    await tapButton(page, 'Kontrollo përgjigjen', 400);
    await waitUntil(tl, 17.1);
    await tapButton(page, 'Përfundo sfidën', 450);
    await waitUntil(tl, 18.2);
    await caption(page, 'CHALLENGE COMPLETE', '<b>3 / 3</b> — a clean sweep.');
    await waitUntil(tl, 18.9);
    const nextRound = await page.getByRole('link', { name: 'Sfida tjetër' }).boundingBox();
    if (nextRound) await move(page, nextRound.x + nextRound.width / 2, nextRound.y + nextRound.height / 2, 850);
    await waitUntil(tl, 21.4);
  },
});

// 4. Montage ---------------------------------------------------------------
const montage = [
  { name: '04-montage-numbers', url: '/play/c1-e3', option: '1', num: '01', title: 'Numbers', hint: 'eins · drei · acht' },
  { name: '05-montage-colors', url: '/play/c1-e4', option: 'E kuqe', num: '02', title: 'Colors', hint: 'rot · blau · grün' },
  { name: '06-montage-articles', url: '/play/c2-e1', option: 'der', num: '03', title: 'Articles', hint: 'der · die · das' },
  { name: '07-montage-cafe', url: '/play/c3-e1', option: 'Einen Tee, bitte.', num: '04', title: 'Café', hint: 'Einen Tee, bitte.' },
];

for (const shot of montage) {
  await recordScene({
    name: shot.name,
    url: BASE + shot.url,
    seed: fullSeed,
    duration: 2.8,
    prepare: injectCaption,
    script: async (page, tl) => {
      await waitUntil(tl, 0.12);
      await injectTag(page, shot.num, shot.title, shot.hint);
      await waitUntil(tl, 0.25);
      const option = page.locator('main button').filter({ hasText: shot.option }).first();
      const box = await option.boundingBox();
      if (!box) throw new Error(`montage option not found: ${shot.option}`);
      await move(page, box.x + box.width / 2, box.y + box.height / 2, 560);
      await page.waitForTimeout(100);
      await clickAt(page, box.x + box.width / 2, box.y + box.height / 2);
      await waitUntil(tl, 1.15);
      await tapButton(page, 'Kontrollo përgjigjen', 360);
      await waitUntil(tl, 2.8);
    },
  });
}

// 5. Results ---------------------------------------------------------------
await recordScene({
  name: '08-results',
  url: BASE + '/results',
  seed: fullSeed,
  duration: 7.4,
  prepare: injectCaption,
  script: async (page, tl) => {
    await waitUntil(tl, 0.25);
    await caption(page, 'THE PAYOFF', '15 challenges. One finish line.');
    await waitUntil(tl, 0.95);
    await move(page, 960, 470, 900);
    await waitUntil(tl, 2.2);
    await caption(page, 'THE SCORE', '42 of 45 correct — a 93% finish.');
    await waitUntil(tl, 2.45);
    await move(page, 730, 835, 800);
    await waitUntil(tl, 3.6);
    await caption(page, 'EVERY CHAPTER', 'Best scores tracked, challenge by challenge.');
    await waitUntil(tl, 3.85);
    await move(page, 1350, 835, 900);
    await waitUntil(tl, 5.0);
    await smoothScroll(page, 130, 700);
    await waitUntil(tl, 5.7);
    await hideCaption(page);
    await waitUntil(tl, 5.9);
    const reviewLink = await page.getByRole('link', { name: 'Rishiko gabimet', exact: true }).boundingBox();
    if (!reviewLink) throw new Error('review link not found');
    await move(page, reviewLink.x + reviewLink.width / 2, reviewLink.y + reviewLink.height / 2, 650);
    await waitUntil(tl, 7.1);
  },
});

// 6. Review ----------------------------------------------------------------
await recordScene({
  name: '09-review',
  url: BASE + '/review',
  seed: fullSeed,
  duration: 6.8,
  prepare: injectCaption,
  script: async (page, tl) => {
    await waitUntil(tl, 0.25);
    await caption(page, 'REVIEW', 'Mistakes become lessons.');
    await waitUntil(tl, 0.95);
    await move(page, 700, 420, 750);
    await waitUntil(tl, 1.8);
    await smoothScroll(page, 260, 900);
    await waitUntil(tl, 2.85);
    await caption(page, 'THE WHY', 'The correct answer, plus the rule behind it.');
    await waitUntil(tl, 3.15);
    await move(page, 647, 527, 800);
    await waitUntil(tl, 4.2);
    await smoothScroll(page, 500, 900);
    await waitUntil(tl, 5.2);
    await move(page, 647, 576, 750);
    await waitUntil(tl, 6.2);
    await hideCaption(page);
    await waitUntil(tl, 6.8);
  },
});

// 7. Reset -----------------------------------------------------------------
await recordScene({
  name: '10-reset',
  url: BASE + '/play',
  seed: fullSeed,
  duration: 7.0,
  prepare: injectCaption,
  script: async (page, tl) => {
    await waitUntil(tl, 0.25);
    await caption(page, 'YOUR DATA', 'No account. No server. Progress stays in this browser.');
    await waitUntil(tl, 1.0);
    await move(page, 1470, 914, 850);
    await waitUntil(tl, 1.85);
    await clickAt(page, 1470, 914);
    await waitUntil(tl, 2.5);
    await caption(page, 'STAY IN CONTROL', 'Reset only when you choose to.');
    await waitUntil(tl, 2.8);
    const confirmReset = await page.getByRole('button', { name: 'Rivendos dhe fillo përsëri' }).boundingBox();
    if (!confirmReset) throw new Error('confirm reset button not found');
    await move(page, confirmReset.x + confirmReset.width / 2, confirmReset.y + confirmReset.height / 2, 650);
    await waitUntil(tl, 3.65);
    const keepProgress = await page.getByRole('button', { name: 'Mbaj përparimin tim' }).boundingBox();
    if (!keepProgress) throw new Error('keep progress button not found');
    await move(page, keepProgress.x + keepProgress.width / 2, keepProgress.y + keepProgress.height / 2, 450);
    await waitUntil(tl, 4.15);
    await clickAt(page, keepProgress.x + keepProgress.width / 2, keepProgress.y + keepProgress.height / 2);
    await waitUntil(tl, 4.95);
    await caption(page, 'STILL YOURS', 'Keep your progress with one tap.');
    await waitUntil(tl, 6.9);
  },
});

// 8. Mobile ----------------------------------------------------------------
await recordScene({
  name: '11-mobile',
  url: 'http://127.0.0.1:4173/mobile.html',
  duration: 7.8,
  cursor: false,
  loadMarker: true,
  script: async (page, tl) => {
    await waitUntil(tl, 7.8);
  },
});

// 9. Intro / outro ---------------------------------------------------------
await recordScene({
  name: '00-intro',
  url: 'http://127.0.0.1:4173/intro.html',
  duration: 6.0,
  cursor: false,
  loadMarker: true,
  script: async (page, tl) => {
    await waitUntil(tl, 6.0);
  },
});

await recordScene({
  name: '12-outro',
  url: 'http://127.0.0.1:4173/outro.html',
  duration: 7.0,
  cursor: false,
  loadMarker: true,
  script: async (page, tl) => {
    await waitUntil(tl, 7.0);
  },
});
