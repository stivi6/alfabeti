# Shkronjat Tona

Një faqe interaktive për Ditën e Alfabetit të Gjuhës Shqipe, e ndërtuar me React, TypeScript, Vite dhe Tailwind CSS. Përfshin tri lojëra, 15 sfida, mini-lojëra dhe rrugëtim historik — të gjitha në shfletues pa backend.

## Features

- 3 chapters, 15 exercises, and 45 scored prompts using the fixed content in the project specification.
- Exercise types include matching pairs, picture/number/color choice, multiple choice, fill in the blank, sentence building, dialogue, error spotting, and a mixed final mission.
- Sequential chapter and exercise unlocking, replayable completed exercises, and best-score persistence.
- Results screen with overall score, performance category, and chapter breakdown.
- Review Mistakes view built from the best recorded attempt.
- "Play Again" and "Reset Progress" confirmations.
- Keyboard-accessible controls, visible focus states, live feedback regions, and reduced-motion support.
- Responsive from 320px to 1440px with no horizontal overflow.
- Self-hosted fonts, local SVG illustrations, and no third-party runtime requests.

Progresi ruhet nën `shkronjat-tona-progress-v1` në LocalStorage. Të dhënat e pavlefshme hihen në mënyrë të sigurt.

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npx playwright install chromium
npm run test:e2e
npm run build
```

Playwright projects:

- `desktop-chromium` — 1440 × 900
- `tablet-chromium` — 768 × 1024
- `mobile-chromium` — Pixel 7 profile
- `narrow-phone` — 320 × 720
- `visual-desktop` / `visual-mobile` — screenshot baselines for homepage, roadmap, multiple-choice exercise, and results

Screenshot baselines live in `tests/e2e/visual.spec.ts-snapshots/` and were generated on macOS Chromium. Regenerate them on a different platform after inspecting the output:

```bash
npx playwright test tests/e2e/visual.spec.ts --update-snapshots
```

## Production preview

```bash
npm run build
npm run preview
```

The Vite preview server provides SPA fallback for direct navigation to routes such as `/play` and `/results`. `vercel.json` configures the same rewrite for Vercel.

## Deploy to Vercel

The project is configured for a static Vite deployment. No functions or environment variables are required.

```bash
npx vercel login
npx vercel          # preview deployment
npx vercel --prod   # production deployment
```

Vercel detects Vite automatically (build command `npm run build`, output directory `dist`). The rewrite in `vercel.json` keeps deep links working after refresh.

## Project structure

```text
src/
  app/          Providers, router, scroll restoration
  components/   Layout, brand, game shell, and shared UI
  data/         Chapter and exercise content
  exercises/    Exercise renderers and feedback
  hooks/        Progress context hook
  lib/          Scoring, evaluation, progress, and storage logic
  pages/        Home, roadmap, exercise, results, review, 404
  styles/       Design tokens and global styles
public/assets/  Local illustrations and vocabulary icons
tests/unit/     Vitest logic and content tests
tests/e2e/      Playwright functional, responsive, and visual tests
```

## Credits

Asset sources and licenses are documented in [`ASSET_CREDITS.md`](./ASSET_CREDITS.md). OpenMoji attribution also appears in the site footer.

## Known limitations

- Progress is local to one browser and device. Clearing site data resets the game.
- There is no account, backend, leaderboard, or cloud sync.
- The final category is an in-game performance label, not a CEFR certificate.
- Visual baselines are Chromium/macOS-specific; regenerate them on another platform before treating screenshot diffs as regressions.
