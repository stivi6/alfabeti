import { chromium } from '@playwright/test';
import { rm, mkdir } from 'node:fs/promises';

const out = 'launch/raw/test.webm';
await rm(out, { force: true });
await mkdir('launch/raw', { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: 'launch/raw/tmp', size: { width: 1920, height: 1080 } },
  deviceScaleFactor: 1,
  colorScheme: 'light',
  reducedMotion: 'no-preference',
});

await context.addInitScript(() => {
  const install = () => {
    if (document.getElementById('__dq_cursor')) return;
    const style = document.createElement('style');
    style.textContent = `
      * { cursor: none !important; }
      html { scrollbar-width: none; }
      ::-webkit-scrollbar { display: none; }
      #__dq_cursor { position: fixed; left: 0; top: 0; width: 30px; height: 30px; z-index: 2147483647; pointer-events: none; opacity: 0; transition: opacity .2s ease; filter: drop-shadow(0 2px 4px rgba(20,12,30,.28)); }
      #__dq_cursor.visible { opacity: 1; }
      #__dq_cursor svg { width: 100%; height: 100%; display: block; }
      .__dq_ripple { position: fixed; width: 18px; height: 18px; margin: -9px 0 0 -9px; border-radius: 999px; border: 2px solid rgba(113,78,150,.55); z-index: 2147483646; pointer-events: none; animation: __dq_ripple .7s ease-out forwards; }
      @keyframes __dq_ripple { 0% { transform: scale(.4); opacity: .9; } 100% { transform: scale(3.2); opacity: 0; } }
    `;
    document.head.appendChild(style);
    const cursor = document.createElement('div');
    cursor.id = '__dq_cursor';
    cursor.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.2 3.8 18.6 11l-6.1 1.7-2.7 5.9L5.2 3.8Z" fill="#fffdfa" stroke="#322841" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
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
      window.setTimeout(() => ripple.remove(), 750);
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
});

const page = await context.newPage();
await page.goto('https://hgquest.vercel.app/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.mouse.move(960, 620);
await page.mouse.move(1180, 760, { steps: 40 });
await page.waitForTimeout(300);
await page.evaluate(async () => {
  const duration = 1600;
  const start = performance.now();
  const from = window.scrollY;
  const to = 760;
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  await new Promise((resolve) => {
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      window.scrollTo(0, from + (to - from) * ease(p));
      if (p < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
});
await page.waitForTimeout(1200);
const video = page.video();
await context.close();
await video.saveAs(out);
await browser.close();
console.log('saved', out);
