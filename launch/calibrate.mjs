import { recordScene, injectCaption, caption, move, smoothScroll, BASE, waitUntil } from './lib.mjs';

const url = BASE + '/';
await recordScene({
  name: 'calibrate',
  url,
  duration: 5,
  prepare: async (page) => {
    await injectCaption(page);
  },
  script: async (page, tl) => {
    await waitUntil(tl, 0.3);
    await caption(page, 'THE IDEA', 'A German course that plays like a game.');
    await waitUntil(tl, 0.9);
    await move(page, 464, 537, 800);
    await waitUntil(tl, 2.0);
    await smoothScroll(page, 720, 1100);
    await waitUntil(tl, 3.4);
    await caption(page, 'THREE CHAPTERS', '45 bite-sized prompts. One adventure.');
    await waitUntil(tl, 4.4);
  },
});
