import { chromium } from '@playwright/test';
import { mkdir, rm, readdir, rename } from 'node:fs/promises';
import path from 'node:path';

export const BASE = 'https://hgquest.vercel.app';
export const VIEW = { width: 1920, height: 1080 };
export const RAW_DIR = 'launch/raw';

const CURSOR_INIT = () => {
  const install = () => {
    if (document.getElementById('__dq_cursor')) return;
    const style = document.createElement('style');
    style.textContent = `
      * { cursor: none !important; }
      html { scrollbar-width: none !important; scroll-behavior: auto !important; }
      ::-webkit-scrollbar { display: none !important; }
      #__dq_cursor { position: fixed; left: 0; top: 0; width: 31px; height: 31px; z-index: 2147483600; pointer-events: none; opacity: 0; transition: opacity .22s ease; filter: drop-shadow(0 3px 5px rgba(20,12,30,.30)); }
      #__dq_cursor.visible { opacity: 1; }
      #__dq_cursor svg { width: 100%; height: 100%; display: block; }
      .__dq_ripple { position: fixed; width: 20px; height: 20px; margin: -10px 0 0 -10px; border-radius: 999px; border: 2px solid rgba(113,78,150,.62); z-index: 2147483590; pointer-events: none; animation: __dq_ripple .72s ease-out forwards; }
      @keyframes __dq_ripple { 0% { transform: scale(.35); opacity: .95; } 100% { transform: scale(3.4); opacity: 0; } }
    `;
    document.head.appendChild(style);
    const cursor = document.createElement('div');
    cursor.id = '__dq_cursor';
    cursor.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.2 3.8 18.6 11l-6.1 1.7-2.7 5.9L5.2 3.8Z" fill="#fffdfa" stroke="#322841" stroke-width="1.65" stroke-linejoin="round"/></svg>`;
    document.body.appendChild(cursor);
    window.addEventListener('mousemove', (event) => {
      cursor.style.transform = `translate(${event.clientX - 3}px, ${event.clientY - 2}px)`;
      cursor.classList.add('visible');
    });
    window.addEventListener('mousedown', (event) => {
      const ripple = document.createElement('div');
      ripple.className = '__dq_ripple';
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 780);
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
};

const CAPTION_HTML = `
  <style id="__dq_cap_style">
    #dq-cap {
      position: fixed; left: 84px; bottom: 60px; z-index: 2147483000; max-width: 940px;
      padding: 20px 28px 22px; border-radius: 18px;
      background: rgba(26,18,36,.92); border: 1px solid rgba(251,247,241,.14);
      box-shadow: 0 22px 60px rgba(18,10,28,.34); color: #fbf7f1;
      font-family: 'DM Sans', sans-serif; opacity: 0; transform: translateY(14px);
      transition: opacity .34s ease, transform .34s cubic-bezier(.2,.8,.2,1);
      pointer-events: none;
    }
    #dq-cap.on { opacity: 1; transform: none; }
    #dq-cap .eb { display: flex; align-items: center; gap: 10px; font-size: 12px; letter-spacing: .24em; text-transform: uppercase; color: #e6b862; font-weight: 700; margin-bottom: 9px; }
    #dq-cap .eb::before { content: ''; width: 26px; height: 2px; border-radius: 99px; background: #e6b862; }
    #dq-cap .tx { font-size: 27px; line-height: 1.34; font-weight: 500; letter-spacing: -.012em; }
    #dq-cap .tx b { color: #d9c7ef; font-weight: 600; }
  </style>
  <div id="dq-cap"><div class="eb"></div><div class="tx"></div></div>
`;

const TAG_HTML = `
  <style id="__dq_tag_style">
    #dq-tag { position: fixed; left: 90px; bottom: 84px; z-index: 2147483000; color: #322841; font-family: 'DM Sans', sans-serif; opacity: 0; transform: translateY(14px); transition: opacity .3s ease, transform .3s cubic-bezier(.2,.8,.2,1); pointer-events: none; }
    #dq-tag.on { opacity: 1; transform: none; }
    #dq-tag .num { font-family: 'Nunito Sans', sans-serif; font-weight: 800; font-size: 46px; line-height: 1; letter-spacing: -.02em; color: #714e96; }
    #dq-tag .name { margin-top: 7px; font-size: 15px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; }
    #dq-tag .hint { margin-top: 5px; font-size: 15px; font-weight: 500; color: #6f6479; }
    #dq-tag .rule { width: 38px; height: 2px; background: #e6b862; border-radius: 99px; margin: 10px 0 11px; }
  </style>
  <div id="dq-tag"><div class="num"></div><div class="rule"></div><div class="name"></div><div class="hint"></div></div>
`;

export class Timeline {
  constructor() { this.t0 = performance.now(); }
  async at(seconds) {
    const now = performance.now();
    const target = this.t0 + seconds * 1000;
    if (target > now) await new Promise((resolve) => setTimeout(resolve, target - now));
  }
}

export async function recordScene({ name, url, seed, duration, prepare, script, cursor = true, loadMarker = false }) {
  const dir = path.join(RAW_DIR, `.tmp-${name}`);
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  await mkdir(RAW_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEW,
    recordVideo: { dir, size: VIEW },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'no-preference',
  });

  if (seed) {
    await context.addInitScript(({ key, value }) => {
      try { localStorage.setItem(key, value); } catch {}
    }, { key: 'deutschquest:progress:v1', value: JSON.stringify(seed) });
  }
  if (cursor) await context.addInitScript(CURSOR_INIT);
  if (loadMarker) {
    await context.addInitScript(() => {
      const add = () => {
        if (!document.body) return;
        const el = document.createElement('div');
        el.style.cssText = 'position:fixed;inset:0;background:#ff0033;z-index:2147483647;pointer-events:none';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 160);
      };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add);
      else add();
    });
  }

  const page = await context.newPage();
  const video = page.video();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
  });
  if (cursor) await page.mouse.move(960, 1010);
  if (prepare) await prepare(page);

  if (!loadMarker) {
    // Visual slate so the raw recording can be aligned precisely.
    await page.evaluate(() => {
      const el = document.createElement('div');
      el.id = '__dq_marker';
      el.style.cssText = 'position:fixed;inset:0;background:#ff0033;z-index:2147483647;pointer-events:none';
      document.body.appendChild(el);
    });
    await page.waitForTimeout(160);
    await page.evaluate(() => document.getElementById('__dq_marker')?.remove());
    await page.waitForTimeout(140);
  } else {
    await page.waitForTimeout(150);
  }

  const timeline = new Timeline();
  const started = Date.now();
  console.log(`  recording ${name}...`);
  if (script) await script(page, timeline, { duration });

  // Trim any overflow beyond the target duration.
  const elapsed = (Date.now() - started) / 1000;
  if (duration && elapsed < duration) {
    await page.waitForTimeout((duration - elapsed) * 1000);
  }

  await context.close();
  await video.saveAs(path.join(RAW_DIR, `${name}.webm`));
  await browser.close();
  await rm(dir, { recursive: true, force: true });
  console.log(`  saved ${name}.webm`);
}

export async function injectCaption(page) {
  await page.evaluate((html) => {
    if (!document.getElementById('dq-cap')) {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }, CAPTION_HTML);
}

export async function caption(page, eyebrow, text) {
  await page.evaluate(({ eyebrow, text }) => {
    const cap = document.getElementById('dq-cap');
    if (!cap) return;
    cap.classList.remove('on');
    window.clearTimeout(window.__dqCapTimer);
    window.__dqCapTimer = window.setTimeout(() => {
      cap.querySelector('.eb').textContent = eyebrow;
      cap.querySelector('.tx').innerHTML = text;
      cap.classList.add('on');
    }, 250);
  }, { eyebrow, text });
}

export async function hideCaption(page) {
  await page.evaluate(() => document.getElementById('dq-cap')?.classList.remove('on'));
}

export async function injectTag(page, num, name, hint) {
  await page.evaluate(({ html, num, name, hint }) => {
    if (!document.getElementById('dq-tag')) document.body.insertAdjacentHTML('beforeend', html);
    const tag = document.getElementById('dq-tag');
    tag.querySelector('.num').textContent = num;
    tag.querySelector('.name').textContent = name;
    tag.querySelector('.hint').textContent = hint;
    requestAnimationFrame(() => tag.classList.add('on'));
  }, { html: TAG_HTML, num, name, hint });
}

export async function move(page, x, y, ms = 700, curve = 0) {
  const start = await page.evaluate(() => {
    const c = document.getElementById('__dq_cursor');
    if (!c) return { x: 960, y: 1010 };
    const m = new DOMMatrixReadOnly(getComputedStyle(c).transform);
    return { x: m.m41 + 3, y: m.m42 + 2 };
  });
  const steps = Math.max(6, Math.round(ms / 16));
  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps;
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const dx = x - start.x;
    const dy = y - start.y;
    const bow = Math.sin(Math.PI * ease) * curve;
    const px = start.x + dx * ease + (dy / Math.max(1, Math.hypot(dx, dy))) * bow;
    const py = start.y + dy * ease - (dx / Math.max(1, Math.hypot(dx, dy))) * bow;
    await page.mouse.move(px, py);
    await page.waitForTimeout(ms / steps);
  }
}

export async function clickAt(page, x, y) {
  await page.mouse.move(x, y);
  await page.waitForTimeout(70);
  await page.mouse.down();
  await page.waitForTimeout(80);
  await page.mouse.up();
}

export async function clickButton(page, name, { exact = true } = {}) {
  const loc = page.getByRole('button', { name, exact });
  const box = await loc.boundingBox();
  if (!box) throw new Error(`button not found: ${name}`);
  await clickAt(page, box.x + box.width / 2, box.y + box.height / 2);
}

export async function clickLink(page, name, { exact = true } = {}) {
  const loc = page.getByRole('link', { name, exact });
  const box = await loc.boundingBox();
  if (!box) throw new Error(`link not found: ${name}`);
  await clickAt(page, box.x + box.width / 2, box.y + box.height / 2);
}

export async function centerOf(page, locator) {
  const box = await locator.boundingBox();
  if (!box) throw new Error('element has no box');
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

export async function smoothScroll(page, to, ms = 1000) {
  await page.evaluate(async ({ to, ms }) => {
    const from = window.scrollY;
    const start = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    await new Promise((resolve) => {
      const step = (now) => {
        const p = Math.min(1, (now - start) / ms);
        window.scrollTo(0, from + (to - from) * ease(p));
        if (p < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  }, { to, ms });
}

export async function waitUntil(timeline, seconds) {
  await timeline.at(seconds);
}
