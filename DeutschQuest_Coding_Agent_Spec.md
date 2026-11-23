# DeutschQuest — Complete Coding-Agent Project Specification

> **Project type:** school project / browser-based German-learning game  
> **Product tagline:** *Learn German. Play your way.*  
> **Working product name:** DeutschQuest  
> **Primary target:** a polished, fast, responsive website that works on desktop, tablet, and phones  
> **Hosting target:** Vercel  
> **Architecture:** static frontend; no backend, no database, no authentication, no runtime APIs

## Visual references

The starter pack includes two generated visual concept boards:

- `visuals/DeutschQuest_Desktop_Design_Reference.png` — homepage, roadmap, exercise, and results direction.
- `visuals/DeutschQuest_Responsive_Design_Reference.png` — wider product/asset board with desktop and phone-layout inspiration.

These are **visual references, not finished UI assets or pixel-perfect screenshots**. The written specification below is authoritative if a generated image contains inconsistent text, layout details, mascot concepts, or feature ideas. The selected direction is flat vector artwork without a mandatory mascot.

---

## 0. Instructions to the coding agent — read this first

You are the implementation engineer. Build the complete, working website described in this document. Do not stop after creating a visual prototype or a homepage. The final result must be a fully playable, responsive application with all 3 chapters, all 15 exercises, local progress persistence, a results screen, review of mistakes, automated tests, and a production build that can be deployed to Vercel.

### Non-negotiable rules

1. **Implement the complete product.** Do not leave placeholder screens, dummy buttons, TODO exercise content, disabled navigation, or fake result data.
2. **Follow the supplied visual direction.** Use the flat-vector, clean, slightly playful style described below. It should feel welcoming and modern, but not childish and not like a corporate SaaS dashboard.
3. **Use the specified local media assets.** Download the assets listed in Section 3, put them in the exact project folders, and reference them locally. Do not load images from third-party URLs at runtime.
4. **Keep the application frontend-only.** No Firebase, Supabase, Express, serverless functions, database, authentication, analytics SDK, or external content API.
5. **Make every control work.** Every button, roadmap node, answer, menu item, progress action, restart control, and review action must perform its stated function.
6. **Do not use a drag-only interaction.** Every matching or ordering activity must also work with taps/clicks and keyboard input.
7. **Persist progress safely.** Save progress to `localStorage`, restore it after refresh, and recover gracefully if stored data is missing or invalid.
8. **Test the real user journeys.** Use Playwright for desktop, tablet, and mobile end-to-end tests, including all exercise types, progress persistence, results, restart, and screenshots.
9. **Fix test failures before declaring completion.** Run type checking, linting, production build, and Playwright tests. Resolve errors rather than suppressing them.
10. **Do not over-engineer.** Prefer a small component system, static data, and simple deterministic game logic. Avoid extra libraries unless they solve a clear requirement.
11. **Do not invent educational content.** Use the question content and answer keys in Section 7. Preserve correct German spelling, capitalization, articles, and umlauts.
12. **Do not claim CEFR certification.** The final score is an in-game performance category, not a formal A1/A2 language assessment.

### First action

Inspect the existing workspace. If it is empty, scaffold the project using the stack in Section 4. If a project already exists, inspect its structure and reuse compatible work rather than deleting unrelated files. Then work through the phases in Section 12 in order. Continue until the acceptance criteria in Section 14 are met.

---

# 1. Product definition

## 1.1 The idea

DeutschQuest is a short online German-learning adventure. A visitor lands on an attractive homepage, clicks **Learn by Playing**, enters a roadmap, and completes three progressively harder chapters. Each chapter contains exactly five short mini-games. After all 15 mini-games are completed, the user receives a results screen with a performance category, score, chapter breakdown, and a comment that changes according to the score.

This is a finite school project, not a Duolingo replacement. The user should be able to understand the concept within seconds and complete the experience in one sitting.

## 1.2 Core product rules

- 3 chapters.
- 5 exercises per chapter.
- 15 exercises in total.
- 3 answerable prompts per exercise.
- 45 scored prompts in total.
- Each prompt is worth 1 point.
- Maximum score: 45 points.
- Each exercise is short; no exercise should take more than about 1–2 minutes for a typical player.
- No countdown timer. Do not create stressful time pressure.
- All exercise content is stored locally in TypeScript data files.
- The player does not need an account.
- The site must work offline after its static assets and app bundle have loaded, apart from the first visit's normal hosting request.
- Progress belongs to the current browser/device because it is saved in localStorage.

## 1.3 Audience and language

- Main interface language: English, because the game is explaining German to a beginner.
- Learning content: German, with English translations or short hints where helpful.
- German text must use correct characters: ä, ö, ü, ß.
- Use clear and encouraging language. Avoid babyish expressions or excessive emojis.

## 1.4 Product promise

The player learns basic German vocabulary, articles, sentence structure, common verb forms, everyday expressions, and a few practical A2-style situations through short interactions rather than long lessons.

## 1.5 What is intentionally out of scope

Do not add:

- User accounts or sign-in.
- Cloud synchronisation.
- A database.
- AI tutors or chatbots.
- Live multiplayer or leaderboards.
- Subscription or payment features.
- External APIs.
- Audio recording or speech recognition.
- Long course catalogues.
- A complex avatar editor.
- A large animation or game engine.
- A forced mascot. The selected visual direction is clean flat illustration; a mascot is not required.

---

# 2. User journey and screens

The product has four main screens plus a small informational section. Keep navigation simple and avoid unnecessary page reloads.

## 2.1 Screen A — Homepage (`/`)

### Purpose
Explain the product quickly and make the primary action obvious.

### Required content

- Brand mark and wordmark: **DeutschQuest**.
- Navigation: Home, How it works, About (or a compact equivalent).
- Main heading: **Learn German. Play your way.**
- Supporting copy: **A short German-learning adventure with 3 chapters, 15 mini-games, and a result at the end.**
- Primary CTA: **Learn by Playing**.
- Three small feature points: **Short challenges**, **Track your progress**, **See your result**.
- A flat illustration on the hero's right side on desktop; it stacks below or behind the text on mobile.
- A small preview of the three chapters below the hero.
- Footer containing the project name and a concise note: **Progress is saved locally in this browser.**

### Interactions
- The main CTA navigates to `/play`.
- The How it works link scrolls to a short explanation section.
- About can navigate to a small in-page section or `/about`; do not create a long content page.
- Navigation works using keyboard and touch.

### Desktop layout
- Centered content container, maximum width about 1180–1240px.
- Header with wordmark left and navigation right.
- Hero uses a two-column layout: text left, illustration right.
- Main CTA is visually dominant.

### Mobile layout
- Compact header with wordmark and an accessible menu button, or a very simple inline nav if it fits.
- Text first, illustration second.
- CTA should be full-width or nearly full-width on narrow screens.
- Feature points stack in one column or a compact two-column grid.
- No horizontal overflow.

## 2.2 Screen B — Roadmap (`/play`)

### Purpose
Show the whole adventure and explain progression at a glance.

### Required content

- Header with DeutschQuest brand and a Back to Home link.
- Heading: **Your Learning Journey**.
- Supporting line: **Complete all 15 challenges to unlock your final result.**
- Global progress: `X / 15 completed` and a progress bar.
- Three chapter cards:
  1. **Willkommen!** — Beginner · A1
  2. **Im Alltag** — Everyday German · A1
  3. **Deutschland!** — Practical challenges · A2
- Exactly five checkpoint nodes per chapter.
- A clear legend or styling that communicates completed, current, and locked.

### Roadmap progression rules

- On a new device, only the first exercise in Chapter 1 is available.
- Completing an exercise unlocks the next exercise.
- Completing all five exercises in a chapter unlocks the first exercise in the next chapter.
- A completed exercise remains replayable.
- A locked exercise is visibly locked and cannot be opened.
- A completed exercise displays a check mark.
- The current available exercise is highlighted in the primary purple.
- A chapter can show its own completion state after all five exercises are completed.
- Do not lock a player out of a completed exercise. Completed nodes can be revisited to improve the recorded best score.

### Desktop layout
- Chapter cards can appear as three columns or as three stacked chapter rows, depending on available width.
- Each chapter has a clear illustration and a five-node sequence.
- Use a connected curved or stepped roadmap line, but do not use a huge canvas or a complex SVG map.

### Mobile layout
- Stack chapter cards vertically.
- Put the five nodes in a vertical or compact horizontal sequence within each chapter.
- Keep every node at least 44×44 CSS pixels as a touch target.
- Do not force the user to zoom or scroll sideways.

## 2.3 Screen C — Exercise (`/play/:exerciseId`)

### Purpose
Display one short interactive mini-game at a time.

### Shared exercise shell

- Back to Roadmap control.
- Chapter name and exercise title.
- Exercise progress such as `Question 1 of 3`.
- A small progress bar for the current exercise.
- Prompt/instructions.
- Exercise interaction area.
- Optional hint area.
- Feedback state after checking an answer.
- Continue button after the current prompt is evaluated.
- At exercise completion, show a short result: `2 / 3 correct`, one encouraging comment, and a Continue to Roadmap / Next Challenge action.

### Interaction states

1. **Unanswered:** input is enabled and Check Answer is available only when the player has made a selection or entered a response.
2. **Correct:** show a restrained success state, correct answer, and one short explanation if useful.
3. **Incorrect:** show a gentle correction with the correct answer and a short explanation. Never use shaming language.
4. **Completed prompt:** lock the answer for that prompt and show Continue.
5. **Exercise complete:** save the best score, mark the node complete, and unlock the next node if applicable.

### Exercise rules

- One scored decision per prompt.
- A prompt cannot be scored more than once in the same attempt.
- No points are deducted for wrong answers.
- Do not shuffle the question order at runtime; deterministic content makes tests and classroom demonstrations reliable.
- If answers are multiple choice, keep distractors plausible but clearly distinct.
- Use accessible buttons for answer options; do not use clickable `<div>` elements.

## 2.4 Screen D — Results (`/results`)

### Purpose
Celebrate completion and clearly explain the player's result.

### Required content

- Heading: **Your German Adventure is Complete!**
- Large percentage.
- Score in points: `X / 45 correct`.
- A performance category and matching comment (Section 8).
- Total completed exercises: `15 / 15`.
- Chapter breakdown: score for Chapter 1, Chapter 2, and Chapter 3.
- Strongest chapter (highest percentage; break ties by the earliest chapter).
- **Review Mistakes** button.
- **Play Again** button.
- **Back to Roadmap** link.
- Brief clarification: **This is your game score, not an official language certificate.**

### Results logic

- Results are only shown when all 15 exercises have been completed at least once.
- Total score uses the best attempt recorded for each exercise (see Section 6).
- If the player tries to visit `/results` before completion, redirect to `/play` and show a small explanation.
- If all answers were correct, show a special top-score message but keep the design restrained.

## 2.5 Screen E — Review Mistakes (`/review` or results subview)

- List every prompt for which the player's best recorded attempt was not correct.
- Show the player's submitted answer, the correct answer, and a concise explanation.
- Group entries by chapter and exercise.
- If there are no mistakes, display: **Perfect score — you answered every challenge correctly.**
- Provide a Back to Results action.

---

# 3. Exact media and asset download checklist

The visual direction is **Style B: clean flat illustrations**. It should feel a little grown-up while remaining welcoming and suitable for a school project. Use a restrained, coherent visual system. Do not mix 3D clay icons, photorealistic images, random stock photos, and flat vector illustrations.

## 3.1 Summary: what must exist before visual QA

| Asset group | Exact amount | Required format | Source / method |
|---|---:|---|---|
| Original logo mark | 1 | SVG | Create a simple original SVG in the project; do not download a brand logo |
| Favicon | 1 | SVG | Create from the same original mark |
| Hero illustration | 1 | SVG | unDraw |
| Chapter illustrations | 3 | SVG | unDraw |
| Vocabulary illustrations | 18 | SVG | OpenMoji Color |
| UI icons | Use only the icons needed | React components / SVG at build time | Lucide React |
| Heading font | 1 family | WOFF2 via npm package | Nunito Sans |
| Body font | 1 family | WOFF2 via npm package | DM Sans |
| Achievement badges | 0 external files | CSS + Lucide icons | Build in code |
| Decorative backgrounds | 0 external files | CSS gradients / pseudo-elements | Build in code |
| German flag | 0 external files | CSS three-stripe element | Build in code |

**Expected external art count: 22 SVG illustrations (4 unDraw + 18 OpenMoji).** Fonts and Lucide are installed as local project dependencies. The wordmark, favicon, badges, background shapes, and flag are created in code so the design remains consistent and avoids unnecessary files.

## 3.2 Source A — unDraw (hero and chapter illustrations)

- Website: <https://undraw.co/illustrations>
- Official license: <https://undraw.co/license>
- License status: free for personal and commercial projects, with no attribution required under unDraw's current license. Follow the license restrictions: do not redistribute the art as an asset pack, use it to replicate unDraw, or use it for AI/ML training.

### Download exactly four SVGs

Download the four exact illustrations linked in the table. Use the unDraw color customizer to recolor their main accent to the project's purple (`#70509B`) before downloading where possible. The linked pages are direct asset pages, so do not replace them with unrelated artwork unless an asset has become unavailable.

| Local filename | Search terms to use on unDraw | Placement |
|---|---|---|
| `home-learning.svg` | **Learning** — <https://undraw.co/illustration/learning_qt7d> | Homepage hero |
| `chapter-willkommen.svg` | **Reading book** — <https://undraw.co/illustration/reading-book_qe4h> | Chapter 1 card |
| `chapter-alltag.svg` | **City life** — <https://undraw.co/illustration/city-life_l74x> | Chapter 2 card |
| `chapter-deutschland.svg` | **Destination** — <https://undraw.co/illustration/destination_fkst> | Chapter 3 card |

### unDraw selection rules

- Prefer simple compositions with one clear focal point.
- Avoid illustrations with huge empty canvases or tiny details that disappear on phones.
- Prefer illustrations with transparent backgrounds.
- Keep the four illustrations visually similar in scale and density.
- Download SVG, not a huge PNG.
- Do not hotlink from unDraw. Save each SVG into `public/assets/illustrations/`.
- If a search term returns no exact match, select the closest appropriate unDraw illustration; do not substitute an image from an unrelated stock site.
- Do not treat the SVG as a full-screen background. Use it inside a bounded illustration container.

## 3.3 Source B — OpenMoji Color (18 exercise illustrations)

- Website: <https://openmoji.org/library/>
- Official repository and download information: <https://github.com/hfg-gmuend/openmoji>
- Releases: <https://github.com/hfg-gmuend/openmoji/releases>
- License: CC BY-SA 4.0. These assets are free to use, but attribution and share-alike terms matter. Do not remove attribution. If an icon is adapted, comply with the share-alike terms for the adapted artwork.
- Download the **Color SVG** files from a tagged/released version, not a random in-progress file from the development branch. Record the version/release used in `ASSET_CREDITS.md`.

### Exact icon manifest

Download the file named by the Unicode code in the `Color SVG` release and rename it to the local filename below. OpenMoji's released color SVG folder uses the Unicode code as the SVG filename.

| Local filename | OpenMoji code | Meaning / use |
|---|---|---|
| `apple.svg` | `1F34E` | apple — der Apfel |
| `book.svg` | `1F4D6` | open book — das Buch |
| `books.svg` | `1F4DA` | books — die Bücher |
| `house.svg` | `1F3E0` | house — das Haus |
| `cat.svg` | `1F431` | cat — die Katze |
| `dog.svg` | `1F436` | dog — der Hund |
| `bread.svg` | `1F35E` | bread — das Brot |
| `coffee.svg` | `2615` | hot beverage — der Kaffee / der Tee visual context |
| `water.svg` | `1F4A7` | water drop — das Wasser |
| `car.svg` | `1F697` | car — das Auto |
| `school.svg` | `1F3EB` | school — die Schule |
| `train.svg` | `1F686` | train — der Zug |
| `bus.svg` | `1F68C` | bus — der Bus |
| `bicycle.svg` | `1F6B2` | bicycle — das Fahrrad |
| `clock.svg` | `1F550` | clock — die Uhr |
| `sun.svg` | `2600` | sun — die Sonne |
| `tree.svg` | `1F333` | tree — der Baum |
| `phone.svg` | `1F4F1` | mobile phone — das Handy |

### OpenMoji download rules

- Download the 18 named SVGs only; do not add the whole 10,000-icon collection to the app.
- Store them locally in `public/assets/vocabulary/`.
- Do not use the OpenMoji website or GitHub raw URLs as runtime image sources.
- Preserve the original SVG artwork. Do not manually strip author/license metadata if present.
- Use the same rendered size and image container for vocabulary pictures, typically 56–80px depending on screen width.
- Add the required attribution to the footer and `ASSET_CREDITS.md`:

  `All emojis designed by OpenMoji – the open-source emoji and icon project. License: CC BY-SA 4.0.`

- Link the credit text to <https://openmoji.org/> and the license to <https://creativecommons.org/licenses/by-sa/4.0/>.

## 3.4 Source C — Lucide React (interface icons)

- Official site: <https://lucide.dev/>
- License: ISC. Include the package's license notice as provided by the dependency.
- Install `lucide-react` and use tree-shakeable React icon components.

Use only what is needed from the following icon names (Lucide React component names):

- `Home`
- `BookOpen`
- `Trophy`
- `Star`
- `LockKeyhole`
- `Check`
- `ArrowLeft`
- `ArrowRight`
- `ChevronRight`
- `Menu`
- `X`
- `Lightbulb`
- `RotateCcw`
- `Volume2` (only if a non-audio visual affordance is required; do not add sound playback as a feature)
- `Clock3`
- `CheckCircle2`
- `CircleHelp`
- `Flag`
- `GraduationCap`

Rules:

- Do not download Lucide PNGs or load icons from a CDN.
- Keep icon size and stroke width consistent (usually 18–22px, stroke width 1.8–2).
- Icons are supporting elements, not decoration on every line.
- Do not use emojis as replacements for interface icons.

## 3.5 Fonts — self-host, do not call Google Fonts at runtime

Use two font families:

1. **Nunito Sans** for headings and prominent short labels.
2. **DM Sans** for body text, instructions, buttons, and longer UI copy.

Sources:

- Nunito Sans: <https://fontsource.org/fonts/nunito-sans/about>
- DM Sans: <https://fontsource.org/fonts/dm-sans/about>
- Both are available under the SIL Open Font License 1.1 through the Fontsource packages cited above.

Install only the necessary weights through Fontsource packages so Vite bundles them locally. Recommended weights:

- Nunito Sans: 700 and 800.
- DM Sans: 400, 500, 600, and 700.

Prefer Latin Extended subsets so German characters render correctly. Use `font-display: swap` where applicable. Do not add a Google Fonts `<link>` tag in `index.html`; the production website must not fetch fonts from Google at runtime.

## 3.6 Create these in code instead of downloading them

The following are intentionally code-created assets:

- DeutschQuest wordmark: text plus one original small SVG brand mark (for example, a simple open-book/path motif). Do not use a German government, university, or third-party brand logo.
- Favicon: derive from the original mark.
- German flag: three CSS stripes, black/red/gold; do not download a flag image.
- Achievement badges: circles or soft-edged shapes with Lucide icons.
- Progress nodes: CSS circles with completed/current/locked styles.
- Background decoration: a few CSS radial gradients, abstract blobs, or simple line patterns.
- Confetti: lightweight CSS shapes only on results; no confetti library.

No mascot is required. Do not add an owl, cartoon child, or other character unless the owner changes the chosen design direction.

## 3.7 Required asset folder structure

```text
public/
└── assets/
    ├── brand/
    │   ├── deutschquest-mark.svg
    │   └── favicon.svg
    ├── illustrations/
    │   ├── home-learning.svg
    │   ├── chapter-willkommen.svg
    │   ├── chapter-alltag.svg
    │   └── chapter-deutschland.svg
    └── vocabulary/
        ├── apple.svg
        ├── book.svg
        ├── books.svg
        ├── house.svg
        ├── cat.svg
        ├── dog.svg
        ├── bread.svg
        ├── coffee.svg
        ├── water.svg
        ├── car.svg
        ├── school.svg
        ├── train.svg
        ├── bus.svg
        ├── bicycle.svg
        ├── clock.svg
        ├── sun.svg
        ├── tree.svg
        └── phone.svg
```

## 3.8 Asset verification gate

Before implementing page layouts:

- Confirm all 22 external SVG files exist at the exact paths.
- Open each SVG in a browser or image preview and verify it renders.
- Ensure no downloaded SVG contains a remote `<image>` reference, a script, or an external stylesheet.
- Verify the file sizes are reasonable. Optimize unDraw SVGs with SVGO if needed; do not damage their paths or colors.
- Confirm no external image URLs remain in the application source.
- Create `ASSET_CREDITS.md` with source links, local filenames, license, and OpenMoji attribution.
- If an asset cannot be downloaded, do not silently leave a broken image. Use the nearest acceptable asset from the same listed source and record the substitution in `ASSET_CREDITS.md`.

---

# 4. Technology stack and architecture

## 4.1 Required stack

| Area | Use |
|---|---|
| UI | React |
| Language | TypeScript, strict mode |
| Build tool | Vite |
| Styling | Tailwind CSS plus a small `tokens.css` for design variables; do not add a component library |
| Routing | React Router DOM (simple client-side routes) |
| Icons | Lucide React |
| Local persistence | Browser localStorage |
| Unit tests | Vitest (for scoring, storage, and evaluation logic) |
| End-to-end and responsive testing | Playwright Test |
| Hosting | Vercel static deployment |

Use current stable compatible versions at project setup and commit the lockfile. Do not use experimental packages or beta releases.

## 4.2 Dependencies

Runtime dependencies should remain limited to:

- `react`
- `react-dom`
- `react-router-dom`
- `lucide-react`
- Fontsource packages for the two selected fonts

Development dependencies should include:

- `vite`
- `typescript`
- `@vitejs/plugin-react`
- `tailwindcss`
- `@tailwindcss/vite` (if using Tailwind v4)
- `vitest`
- `@playwright/test`
- the standard React/TypeScript lint tooling selected by the scaffold

Do not add Framer Motion, GSAP, a charting library, a large UI kit, a state-management library, or a game engine. Use CSS transitions for modest movement.

## 4.3 Static-only architecture

All app logic executes in the browser. Vercel serves the built static files. There must be:

- No `/api` routes.
- No serverless functions.
- No database connections.
- No authentication provider.
- No runtime HTTP requests for questions, images, or fonts.
- No secrets or environment variables needed to play.

The only browser persistence is localStorage under a namespaced key.

## 4.4 Recommended source structure

Use a clear structure similar to this. Small adjustments are acceptable if they improve the implementation, but do not collapse the whole game into one large component.

```text
src/
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── AppProviders.tsx
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   └── PageContainer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── IconButton.tsx
│   │   └── ConfirmDialog.tsx
│   └── game/
│       ├── ChapterCard.tsx
│       ├── RoadmapNode.tsx
│       ├── ExerciseHeader.tsx
│       ├── AnswerFeedback.tsx
│       └── ResultsSummary.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── RoadmapPage.tsx
│   ├── ExercisePage.tsx
│   ├── ResultsPage.tsx
│   └── ReviewPage.tsx
├── exercises/
│   ├── ExerciseRenderer.tsx
│   ├── MatchingExercise.tsx
│   ├── MultipleChoiceExercise.tsx
│   ├── FillBlankExercise.tsx
│   ├── SentenceBuilderExercise.tsx
│   ├── ColorMatchExercise.tsx
│   └── types.ts
├── data/
│   ├── chapters.ts
│   ├── exercises.ts
│   └── questions.ts
├── hooks/
│   └── useGameProgress.ts
├── lib/
│   ├── storage.ts
│   ├── scoring.ts
│   ├── evaluation.ts
│   └── textNormalization.ts
├── styles/
│   ├── index.css
│   └── tokens.css
└── main.tsx

public/
└── assets/                 # exact structure from Section 3.7

tests/
├── unit/
│   ├── scoring.test.ts
│   ├── evaluation.test.ts
│   └── storage.test.ts
└── e2e/
    ├── home.spec.ts
    ├── roadmap.spec.ts
    ├── exercise-types.spec.ts
    ├── full-game.spec.ts
    ├── results-review.spec.ts
    ├── persistence.spec.ts
    └── responsive.spec.ts
```

## 4.5 Routing

Use these routes:

- `/` — homepage
- `/play` — roadmap
- `/play/:exerciseId` — active exercise
- `/results` — final results; redirect to `/play` if the game is incomplete
- `/review` — review mistakes; redirect to `/results` if no complete result exists

Unknown routes should show a designed not-found state with a link to the homepage.

Because this is a Vite SPA with browser routes, add the Vercel rewrite described in Section 13 so direct links and refreshes work after deployment.

---

# 5. Visual design system

## 5.1 Overall visual character

Use a friendly, modern, flat-illustration direction:

- Slightly playful, but not childish.
- More mature than a cartoon learning app.
- Friendly and inviting, not a corporate dashboard.
- Clear hierarchy, generous whitespace, crisp typography.
- Flat vector illustrations with restrained detail.
- Rounded cards, moderate corner radii, subtle borders, very soft shadows.
- No glassmorphism, heavy gradients, neon colors, 3D clay art, or stock-photo backgrounds.

## 5.2 Color tokens

Use these as the initial palette. Store them as CSS variables and use them consistently.

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#FAF7F1` | Main warm background |
| `--color-surface` | `#FFFEFC` | Cards and panels |
| `--color-surface-muted` | `#F2EDE6` | Secondary surfaces |
| `--color-ink` | `#302640` | Main text |
| `--color-ink-muted` | `#746C7C` | Secondary text |
| `--color-primary` | `#70509B` | Primary purple actions |
| `--color-primary-dark` | `#51366F` | Hover/strong purple |
| `--color-primary-soft` | `#EAE1F4` | Soft purple backgrounds |
| `--color-accent` | `#E8B95F` | Mustard/yellow accent |
| `--color-accent-soft` | `#F8EBCB` | Warm highlight |
| `--color-success` | `#5F9277` | Completed/correct |
| `--color-success-soft` | `#E4F0E8` | Success background |
| `--color-danger` | `#B95B5B` | Error state only |
| `--color-danger-soft` | `#F8E8E6` | Error background |
| `--color-border` | `#E7DED4` | Card borders and dividers |

Keep colors accessible. Do not use pale accent text on a white background. Check contrast for all text/button combinations.

## 5.3 Typography

- Headings: Nunito Sans 700/800.
- Body: DM Sans 400/500/600.
- Body default: 16px desktop, 15–16px mobile.
- Main hero heading: `clamp(2.5rem, 5vw, 4.6rem)` but keep it to 2–3 lines max.
- Exercise prompt: 24–32px depending on viewport.
- Buttons: 15–16px, weight 600/700.
- Avoid tiny labels below 12px.

## 5.4 Shape, spacing, and shadows

- Main page max width: 1200px.
- Main card radius: 22–26px.
- Small card radius: 14–18px.
- Button radius: 12–16px or pill for the main CTA only.
- Standard spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px.
- Use subtle border first; add a very light shadow only where separation needs it.
- Avoid excessive card nesting.

## 5.5 Motion

- Use short CSS transitions for hover, node activation, and feedback (roughly 140–220ms).
- Respect `prefers-reduced-motion: reduce`.
- Do not animate every card on page load.
- Do not use scroll-jacking or parallax.
- Do not add a large animation dependency.

## 5.6 Responsive breakpoints

Use a mobile-first CSS approach. Suggested breakpoints:

- Small phone: 320–374px.
- Standard phone: 375–430px.
- Tablet: 768–1023px.
- Desktop: 1024px and wider.

The interface must still work at 320px width. At 768px, use a layout that feels intentional, not a stretched phone layout.

---

# 6. Progress model, scoring, and persistence

## 6.1 Scoring rules

- Each exercise contains exactly 3 scored prompts.
- Each correct prompt earns 1 point.
- Incorrect prompts earn 0 points.
- No negative scoring.
- Maximum per exercise: 3 points.
- Maximum total: 45 points.
- Percentage: `Math.round((totalBestCorrect / 45) * 100)`.
- The game is complete when all 15 unique exercise IDs have a completed record.

## 6.2 Retakes and best score

When a player replays an exercise:

- Track the current attempt score separately from saved progress.
- When the attempt ends, save `bestCorrect = max(previousBestCorrect, currentAttemptCorrect)`.
- Keep the exercise marked completed once it has been completed once.
- Do not count multiple attempts as extra points.
- The results page uses the best recorded score for each of the 15 exercises.
- Keep the best attempt only; no detailed account-like attempt history is needed.

## 6.3 Suggested TypeScript data model

Implement a strongly typed model similar to:

```ts
export type ExerciseId = string;

export type ExerciseProgress = {
  completed: boolean;
  bestCorrect: number; // 0..3
  attempts: number;
};

export type GameProgress = {
  version: 1;
  completedExerciseIds: ExerciseId[];
  exercises: Record<ExerciseId, ExerciseProgress>;
  lastVisitedExerciseId: ExerciseId | null;
  updatedAt: string;
};
```

The exact shape may be improved, but preserve the version field and the concepts above.

## 6.4 localStorage

- Storage key: `deutschquest:progress:v1`.
- Read on app startup.
- Validate the parsed object before using it.
- Catch JSON parsing and localStorage access errors.
- If stored data is malformed, reset to safe default progress and show no blocking error.
- Save after every completed exercise.
- Save when the player leaves an exercise if there is relevant progress to preserve; do not save a half-scored answer as a completed question.
- Do not save raw personal information. The app collects none.
- Add a Reset Progress action on the roadmap or results page with a confirmation step.
- Reset must clear only the DeutschQuest storage key, not the user's entire localStorage.

## 6.5 Unlocking algorithm

The exercise list is ordered by chapter and position. An exercise is:

- `completed` if its saved record says completed.
- `available` if it is the first exercise in the whole game, or the immediately previous exercise is completed.
- `locked` otherwise.

A previously completed exercise remains available for replay. The next exercise becomes available after the previous one is completed. Chapter 2's first exercise is available only after all 5 Chapter 1 exercises are completed, and the same applies from Chapter 2 to Chapter 3.

## 6.6 Results calculations

For each chapter:

- Sum `bestCorrect` across its five exercises.
- Maximum chapter score = 15.
- Chapter percentage = `Math.round((chapterCorrect / 15) * 100)`.

Overall:

- Sum all 15 best exercise scores.
- Maximum = 45.
- Overall percentage = `Math.round((totalCorrect / 45) * 100)`.
- Strongest chapter = the chapter with the highest percentage. If tied, choose the earliest chapter.

---

# 7. Complete chapter and exercise content

Use exactly these chapter titles, exercise titles, mechanics, prompts, and expected answers as the initial question bank. The agent can polish the surrounding explanatory wording but must not change the grammatical target or answer key without checking it carefully.

Each exercise has exactly three prompts. The complete product therefore has 45 scored prompts.

## Chapter 1 — Willkommen!

**Difficulty label:** Beginner · A1  
**Chapter description:** Start with greetings, words, numbers, and simple expressions.

### 1.1 Greeting Match

- **Mechanic:** matching pairs. Player matches the German greeting to its English meaning.
- **Prompt A:** `Hallo!` → `Hello!`
- **Prompt B:** `Guten Morgen!` → `Good morning!`
- **Prompt C:** `Auf Wiedersehen!` → `Goodbye!`
- **Scoring:** 1 point per correctly matched pair.
- **Accessibility:** select a German phrase, then select its meaning; do not require dragging.

### 1.2 Picture Words

- **Mechanic:** show a German word and 4 picture buttons; select the correct picture.
- **Prompt A:** `der Apfel` → apple image (`apple.svg`)
- **Prompt B:** `das Buch` → book image (`book.svg`)
- **Prompt C:** `das Haus` → house image (`house.svg`)
- **Feedback example:** `Correct — der Apfel means “the apple”.`

### 1.3 Number Sprint

- **Mechanic:** multiple choice. Show the German number word and ask for the matching numeral.
- **Prompt A:** `eins` → `1`
- **Prompt B:** `drei` → `3`
- **Prompt C:** `acht` → `8`
- Use numeric text buttons; no downloaded image is needed.

### 1.4 Color Finder

- **Mechanic:** show a German color name and ask the player to choose the matching color swatch.
- **Prompt A:** `rot` → red (`#D95D55`)
- **Prompt B:** `blau` → blue (`#5E82C4`)
- **Prompt C:** `grün` → green (`#5F9277`)
- Add a text label to every swatch. Do not rely on color alone; the player sees the color and a visible option label.

### 1.5 Complete the Phrase

- **Mechanic:** fill-in-the-blank with multiple-choice answers.
- **Prompt A:** `Guten ____!` → `Morgen`
- **Prompt B:** `Wie heißt ____?` → `du`
- **Prompt C:** `Ich komme ____ Albanien.` → `aus`
- **Learning notes:** `Guten Morgen` is a common morning greeting; `Wie heißt du?` asks someone's name; `aus` is used for origin in `Ich komme aus Albanien.`

## Chapter 2 — Im Alltag

**Difficulty label:** Everyday German · A1  
**Chapter description:** Use simple German in school, routines, and conversations.

### 2.1 Der, Die oder Das?

- **Mechanic:** select the correct definite article for each noun.
- **Prompt A:** `____ Tisch` → `der`
- **Prompt B:** `____ Schule` → `die`
- **Prompt C:** `____ Buch` → `das`
- Keep the noun visible and make each article a large button.

### 2.2 Sentence Builder

- **Mechanic:** reorder word chips to form a correct sentence. The player taps chips in order; provide an undo action.
- **Prompt A chips:** `Ich` / `lerne` / `Deutsch.` → `Ich lerne Deutsch.`
- **Prompt B chips:** `Heute` / `spiele` / `ich` / `Fußball.` → `Heute spiele ich Fußball.`
- **Prompt C chips:** `Am Morgen` / `trinke` / `ich` / `Wasser.` → `Am Morgen trinke ich Wasser.`
- **Scoring:** 1 point for the correct complete order. Ignore repeated spaces and an optional final full stop; preserve required word order and capitalization.
- **Accessibility:** each chip is a real button with an accessible name; selected chips appear in a sentence row; Undo removes the last selected chip.

### 2.3 Verb Challenge

- **Mechanic:** multiple choice for simple present-tense verb forms.
- **Prompt A:** `Ich ____ Deutsch.` → `lerne`
- **Prompt B:** `Du ____ in Tirana.` → `wohnst`
- **Prompt C:** `Er ____ einen Apfel.` → `isst`
- Distractors must not accidentally create another grammatically valid sentence.

### 2.4 Daily Routine

- **Mechanic:** match the German sentence to its English meaning.
- **Prompt A:** `Ich stehe um sieben Uhr auf.` → `I get up at seven o’clock.`
- **Prompt B:** `Ich gehe zur Schule.` → `I go to school.`
- **Prompt C:** `Am Abend mache ich meine Hausaufgaben.` → `In the evening I do my homework.`

### 2.5 Daily Conversation

- **Mechanic:** complete a short dialogue by choosing the appropriate response.
- **Prompt A:** `Wie heißt du?` → `Ich heiße Mia.`
- **Prompt B:** `Woher kommst du?` → `Ich komme aus Albanien.`
- **Prompt C:** `Wie geht es dir?` → `Gut, danke. Und dir?`
- Show the short dialogue context so the player understands who is speaking.

## Chapter 3 — Deutschland!

**Difficulty label:** Practical challenge · A2  
**Chapter description:** Use German in travel, food, directions, and slightly more complex sentences.

### 3.1 At the Café

- **Mechanic:** choose the most natural response in a café scenario.
- **Prompt A:** Waiter: `Was möchten Sie trinken?` → Customer: `Einen Tee, bitte.`
- **Prompt B:** Waiter: `Möchten Sie noch etwas?` → Customer: `Nein, danke.`
- **Prompt C:** Customer: `Könnte ich bitte bezahlen?` → Waiter: `Natürlich. Das macht 8 Euro.`
- Use a simple café card illustration or the coffee vocabulary icon. No photograph is needed.

### 3.2 Find the Way

- **Mechanic:** match a German direction/location phrase with its English meaning.
- **Prompt A:** `Gehen Sie geradeaus.` → `Go straight ahead.`
- **Prompt B:** `Biegen Sie links ab.` → `Turn left.`
- **Prompt C:** `Der Bahnhof ist neben dem Hotel.` → `The train station is next to the hotel.`
- A simple CSS arrow or Lucide direction icon is enough; no map API.

### 3.3 Perfekt Challenge

- **Mechanic:** fill in the missing auxiliary verb in a simple Perfekt sentence.
- **Prompt A:** `Gestern ____ ich Fußball gespielt.` → `habe`
- **Prompt B:** `Wir ____ nach Berlin gefahren.` → `sind`
- **Prompt C:** `Meine Schwester ____ einen Film gesehen.` → `hat`
- Keep the subject and participle visible. Add a one-line explanation after checking.

### 3.4 Mistake Detective

- **Mechanic:** choose the grammatically correct sentence from two choices.
- **Prompt A:** `Ich bin 15 Jahre alt.` (correct) vs `Ich habe 15 Jahre alt.` (incorrect)
- **Prompt B:** `Er geht jeden Tag zur Schule.` (correct) vs `Er gehen jeden Tag zur Schule.` (incorrect)
- **Prompt C:** `Wir haben Pizza gegessen.` (correct) vs `Wir sind Pizza gegessen.` (incorrect)
- When the player checks, explain the relevant correction briefly.

### 3.5 Final Mission

- **Mechanic:** a mixed final challenge with three different interactions.
- **Prompt A — sentence order:** chips `Am Wochenende` / `besuche` / `ich` / `meine Freunde.` → `Am Wochenende besuche ich meine Freunde.`
- **Prompt B — choose the correct Perfekt sentence:** `Wir sind am Samstag nach Berlin gefahren.` is correct; distractor: `Wir haben am Samstag nach Berlin gefahren.`
- **Prompt C — practical response:** `Entschuldigung, wie komme ich zum Bahnhof?` → `Gehen Sie geradeaus und dann rechts.`
- Show a final-mission header but do not make this exercise longer than the other exercises.

## 7.1 Content quality checks

Before finishing:

- Check each German noun's article and capitalization.
- Check verbs match the subject.
- Check the Perfekt helper verbs (`haben` / `sein`) are correct.
- Check every multiple-choice distractor is actually wrong for the intended prompt.
- Ensure there is exactly one correct answer for single-choice prompts.
- Ensure answer labels are not accidentally duplicated.
- Ensure the English translation does not reveal the answer before the player responds.
- Make feedback useful, short, and encouraging.

---

# 8. Final evaluation categories and feedback

Use these exact score bands, calculated from the overall percentage:

| Percentage | Category | Comment |
|---:|---|---|
| 90–100% | **Sprachprofi** | `Excellent work! You handled the challenges with confidence and accuracy.` |
| 75–89% | **German Explorer** | `Great job! You're building a strong foundation in German.` |
| 50–74% | **Language Learner** | `Good progress! Keep practising and the words will become more familiar.` |
| 0–49% | **Beginner Adventurer** | `Every adventure starts somewhere. Review your mistakes and give it another try!` |

Rules:

- These are playful game categories, not official CEFR ratings.
- Show the exact percentage and point count.
- Show chapter performance using `X / 15` points per chapter.
- Strongest chapter is the highest chapter percentage; break ties in chapter order.
- If the player has 45/45, optionally replace the standard comment with: `Perfect score! You answered every challenge correctly.`
- The results page must work after refresh because it reads the saved local progress.

---

# 9. Component behavior and reusable exercise engine

## 9.1 Reusable exercise definitions

Define an exercise data type that describes:

- `id`
- `chapterId`
- `title`
- `type`
- `instructions`
- `prompts` (exactly 3)
- each prompt's `id`, `question`, `options` or `items`, `correctAnswer`, `hint`, and `explanation`

Do not hardcode score increments inside every individual UI component. Use one central evaluation/scoring utility so all exercise types produce a consistent result.

## 9.2 Required exercise renderers

At minimum implement these reusable mechanics:

1. Matching pairs.
2. Multiple choice.
3. Numeric choice.
4. Color-swatch choice.
5. Fill in the blank.
6. Sentence builder.
7. Dialogue response selection.
8. Correct-sentence selection.
9. Mixed final mission composition.

It is acceptable for multiple exercises to reuse the same renderer with different data. The 15 exercise IDs and their content must remain separate and traceable.

## 9.3 Feedback

- Use both text and a visual state, not color alone.
- Correct feedback: muted green panel, check icon, short explanation.
- Incorrect feedback: muted red/pink panel, correction, short explanation.
- Never flash full-screen colors.
- Screen-reader feedback should be announced with `aria-live="polite"`.

## 9.4 Keyboard and touch

- Answer options are `<button>` elements.
- Matching must work with click/tap pair selection.
- Sentence builder must work with keyboard focus and Enter/Space.
- Provide visible focus outlines.
- `Tab`, `Shift+Tab`, `Enter`, and `Space` must allow normal interaction.
- Do not use hover as the only way to reveal information.

---

# 10. Responsive and accessibility requirements

## 10.1 Mobile-first requirements

- No horizontal scroll at 320px, 360px, 375px, 390px, 430px, 768px, 1024px, or 1440px viewport widths.
- Buttons and option cards should have minimum touch height of 44px (prefer 48px).
- Exercise options stack to one column on narrow screens.
- Illustrations scale with `max-width: 100%` and preserve aspect ratio.
- Roadmap cards stack vertically on phones.
- Desktop exercise layout may use two columns (illustration on one side, question/options on the other); mobile stacks vertically.
- The main CTA and next/continue actions remain easy to reach.
- Do not position critical controls near the edge where they can be covered by device safe areas.
- Use safe-area insets where necessary.

## 10.2 Accessibility

- Use semantic landmarks: header, nav, main, footer.
- Exactly one main `<h1>` per page.
- Maintain logical heading order.
- All images need appropriate alt text; decorative images use empty alt text.
- Every form control has a label.
- Color is never the only indicator of correctness, selected state, or lock state.
- Focus visibility is strong and consistent.
- Contrast should meet WCAG AA for normal text where practical.
- Respect reduced-motion preference.
- Use accessible names for icon-only buttons.
- Modals/dialogs must trap focus appropriately, close with Escape, and return focus to the opener.

---

# 11. Performance and reliability requirements

The project should feel fast because it has almost no runtime work.

## 11.1 Runtime loading

- Keep all exercise data local.
- Keep all illustrations local.
- Self-host fonts through Fontsource packages.
- Use Lucide React components for icons.
- Do not include large animation packages.
- Lazy-load chapter illustrations below the fold where sensible; do not lazy-load the visible hero image if it is part of the first viewport.
- Give images explicit width/height or aspect ratio to prevent layout shifts.
- Use SVG for flat illustrations and icons.
- Use CSS for simple shapes rather than raster images.

## 11.2 Bundle and rendering

- Avoid rendering all 45 prompts at once. Render only the active prompt and small progress metadata.
- Avoid deeply nested state updates.
- Avoid unnecessary global state libraries.
- Memoization should be used only where it actually prevents work; do not add it everywhere.
- Build static production assets with Vite.
- Check the production build output and keep dependencies lean.

## 11.3 Stability

- Guard localStorage access.
- Guard invalid route IDs.
- Handle missing asset files gracefully with a non-breaking fallback or placeholder.
- Never allow a user to become trapped in a locked exercise.
- Ensure the game can recover after refresh.
- No uncaught console errors or React key warnings.

---

# 12. Implementation phases — follow in order

## Phase 1 — Inspect and scaffold

1. Inspect the workspace and existing files.
2. Create or prepare a Vite React TypeScript project.
3. Enable TypeScript strictness.
4. Install required runtime and development dependencies.
5. Configure linting, typecheck, Vitest, and Playwright scripts.
6. Create the folder structure in Section 4.4.
7. Add the routes and a basic app shell.
8. Verify `npm run dev` works before building the UI.

**Exit gate:** the app starts locally and the initial route loads without console errors.

## Phase 2 — Collect and verify media

1. Download four unDraw SVGs.
2. Download the 18 exact OpenMoji Color SVGs listed in Section 3.3 from a tagged release.
3. Create the original brand SVG and favicon.
4. Install and locally bundle Nunito Sans and DM Sans.
5. Create `ASSET_CREDITS.md`.
6. Verify every SVG renders and all paths match Section 3.7.
7. Confirm no runtime external image or font URLs remain.

**Exit gate:** all media is present locally, credits are recorded, and no missing-image icon appears.

## Phase 3 — Build design tokens and shared UI

1. Create the palette CSS variables.
2. Set typography and global reset styles.
3. Implement Button, Card, Badge, ProgressBar, IconButton, and PageContainer.
4. Implement the responsive SiteHeader and SiteFooter.
5. Establish hover, active, disabled, focus, selected, success, and error states.
6. Verify buttons and cards work with keyboard focus.

**Exit gate:** shared components look consistent at phone, tablet, and desktop widths.

## Phase 4 — Implement static content and game logic

1. Create the three chapter records.
2. Create all 15 exercise records with the exact 45 prompts from Section 7.
3. Add TypeScript types for exercises and progress.
4. Implement text normalization and answer evaluation.
5. Implement score aggregation and score bands.
6. Implement unlock/lock logic.
7. Implement localStorage read, validation, write, versioning, and reset.
8. Add Vitest tests for scoring, category boundaries, unlock logic, and storage recovery.

**Exit gate:** game logic passes unit tests before UI is wired to it.

## Phase 5 — Implement all screens

1. Build Homepage.
2. Build Roadmap with all 15 nodes.
3. Build shared ExercisePage shell.
4. Build the reusable exercise renderers.
5. Wire each exercise to the correct data and renderer.
6. Build Results page with score category and chapter breakdown.
7. Build Review Mistakes page.
8. Add restart and reset confirmations.
9. Add empty, loading, locked, unavailable, and not-found states where appropriate.

**Exit gate:** a human can complete all 15 exercises and reach results with no manual dev-tool intervention.

## Phase 6 — Responsive and accessibility pass

1. Test the design at 320, 360, 375, 390, 430, 768, 1024, and 1440px widths.
2. Fix horizontal overflow.
3. Verify all exercise mechanics on touch-size controls.
4. Verify all mechanics using keyboard only.
5. Verify focus order and feedback announcements.
6. Test `prefers-reduced-motion`.
7. Verify German special characters and font loading.

**Exit gate:** all screens remain usable on the smallest target width and no control is clipped.

## Phase 7 — Playwright end-to-end and visual tests

1. Configure Playwright projects for desktop Chromium, tablet viewport, and a mobile device profile.
2. Add tests for homepage, roadmap gating, each exercise type, full completion, results, mistake review, progress persistence, and reset.
3. Add responsive overflow assertions.
4. Add keyboard interaction tests.
5. Capture screenshot baselines for homepage, roadmap, exercise, and results at desktop and mobile sizes.
6. Inspect screenshots manually and fix visual issues.
7. Re-run tests after any fix.

**Exit gate:** all Playwright tests pass and the screenshot snapshots show no unintended layout changes.

## Phase 8 — Production readiness and Vercel deployment

1. Run lint, typecheck, unit tests, Playwright tests, and production build.
2. Inspect the built output for missing assets and unexpected external requests.
3. Add Vercel SPA rewrite configuration.
4. Deploy a preview to Vercel.
5. Test the deployed site on desktop and a real phone if available.
6. Test direct navigation and refresh on `/play` and `/results`.
7. Fix any deployment-specific issues.
8. Deliver the deployment URL and a brief test summary to the owner.

**Exit gate:** production deployment loads, deep links work, assets load, progress persists, and the complete game is playable.

---

# 13. Vercel configuration and commands

## 13.1 Vercel SPA rewrite

Because this is a Vite single-page application using browser routes, add this file at the repository root:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Do not add any Vercel Functions. The site is static.

## 13.2 Suggested npm scripts

Keep equivalent scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc -b --pretty",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
  }
}
```

If the scaffold's TypeScript config uses a different typecheck command, adapt it but preserve a standalone `typecheck` script.

## 13.3 Local development

```bash
npm install
npm run dev
```

## 13.4 Validation before deployment

```bash
npm run lint
npm run typecheck
npm run test
npx playwright install chromium
npm run test:e2e
npm run build
```

For visual snapshot creation/review:

```bash
npx playwright test --update-snapshots
npm run test:e2e
```

Only update expected screenshots after visually inspecting the new output. Do not blindly update snapshots to hide a regression.

---

# 14. Playwright testing plan

Use Playwright Test. Official documentation:

- Device emulation: <https://playwright.dev/docs/emulation>
- Screenshot visual comparisons: <https://playwright.dev/docs/test-snapshots>
- General Playwright Test documentation: <https://playwright.dev/docs/test-intro>

## 14.1 Required Playwright projects

Configure at least:

1. **Desktop Chromium:** viewport `1440 × 900`.
2. **Tablet Chromium:** viewport `768 × 1024`.
3. **Mobile Chromium:** use a Playwright device profile such as `iPhone 13` or a custom `390 × 844` viewport with touch enabled.
4. Add a narrow-phone check at `320 × 720` as a separate viewport test.

Do not claim that browser emulation is identical to testing on every physical device. Use it as automated coverage, then manually smoke-test at least one real phone if one is available.

## 14.2 Required functional test cases

### Homepage

- Homepage loads with no console errors.
- Main heading is visible.
- Learn by Playing button is visible and enabled.
- Clicking it opens the roadmap.
- Navigation links work.

### Roadmap and unlocking

- A fresh context starts at `0 / 15 completed`.
- First exercise is available.
- Second exercise is locked.
- Clicking a locked node does not open it.
- Completing exercise 1 unlocks exercise 2.
- Completing all five Chapter 1 exercises unlocks Chapter 2.
- Completing all five Chapter 2 exercises unlocks Chapter 3.
- Completed exercises remain replayable.

### Exercise mechanics

Test every unique exercise interaction at least once:

- Matching pairs: select both sides by click/tap and match correctly.
- Multiple choice: select an option and submit.
- Number selection: correct numeral is accepted.
- Color selection: color is visible and a label is accessible.
- Fill blank: correct answer accepted and incorrect answer receives feedback.
- Sentence builder: word chips form the exact expected sentence; Undo works.
- Dialogue: the appropriate response is accepted.
- Correct-sentence detection: correct form is accepted.
- Final mixed mission: all three different prompts work.

Also test at least one wrong answer in each broad response pattern and verify feedback is useful and non-blocking.

### Persistence

- Complete one exercise.
- Refresh the page.
- Verify completion remains saved.
- Verify the next exercise remains unlocked.
- Corrupt the localStorage value and confirm the app recovers to a safe state without crashing.

### Results

- Complete all 15 exercises using the test helper.
- Confirm the results page shows `15 / 15` completed.
- Confirm the score is based on best exercise results.
- Confirm chapter scores add up correctly.
- Confirm category boundaries at 49%, 50%, 74%, 75%, 89%, and 90% using unit tests for evaluation logic.
- Verify results remain after refresh.

### Review mistakes

- Deliberately submit at least one incorrect response.
- Complete the full game.
- Open Review Mistakes.
- Verify the wrong response and correct answer are shown.
- Verify an all-correct game shows the no-mistakes state.

### Restart and reset

- Play Again resets the game progress after confirmation.
- Reset Progress clears only `deutschquest:progress:v1`.
- After reset, roadmap returns to `0 / 15 completed` and only the first exercise is available.

## 14.3 Required responsive tests

For all key routes, verify at:

- 320px
- 360px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1440px

Add this overflow assertion to the relevant responsive tests:

```ts
const dimensions = await page.evaluate(() => ({
  viewportWidth: document.documentElement.clientWidth,
  documentWidth: document.documentElement.scrollWidth,
}));
expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
```

Also verify:

- Main CTA is visible and tappable.
- No page content is cut off.
- Roadmap nodes are tappable.
- Exercise answers remain readable and do not overlap.
- Results actions stack sensibly.
- Mobile menu opens and closes if a menu is used.

## 14.4 Visual screenshot tests

Capture and inspect screenshots for:

| Screen | Desktop | Mobile |
|---|---:|---:|
| Homepage | Yes | Yes |
| Roadmap | Yes | Yes |
| Exercise — multiple choice | Yes | Yes |
| Results | Yes | Yes |

Use stable test data and disable CSS animations for screenshot tests. Use `expect(page).toHaveScreenshot()` and store baselines in the Playwright snapshot folders. Inspect the screenshots after the first baseline is generated; the existence of a snapshot does not mean the design is correct.

## 14.5 Example Playwright configuration

Use a configuration similar to this and adjust names/ports as needed:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
```

## 14.6 Test data strategy

- Use deterministic question order.
- Give answer controls stable accessible names or `data-testid` values only when necessary.
- Prefer `getByRole`, `getByLabel`, and visible text over brittle CSS selectors.
- Add `data-testid` for roadmap nodes using the exercise ID, for example `roadmap-node-c1-e1`.
- Provide a test helper that completes one exercise correctly based on its accessible prompt; avoid hardcoding the same fragile DOM selectors in every test.
- Use a fresh browser context for first-run tests.
- Use the browser's localStorage only inside the Playwright test setup to create known states; do not add special production bypasses.

---

# 15. Manual visual QA checklist

The coding agent must inspect the actual running website, not only the source code.

## Homepage

- Does the page look balanced at 1440px?
- Is the hero headline easy to read?
- Does the main illustration feel like part of the composition rather than a random floating image?
- Is the primary action obvious?
- Does the first mobile viewport communicate the product without excessive scrolling?

## Roadmap

- Can a new user understand completed/current/locked states in two seconds?
- Are all 15 exercises visible or clearly discoverable?
- Does the roadmap feel like a game progression path, not a plain spreadsheet?
- Does the mobile roadmap stack naturally?

## Exercise screen

- Is the question the visual focus?
- Are answer controls large enough?
- Is the hint secondary and unobtrusive?
- Does feedback appear in a predictable location?
- Can the user continue without hunting for the button?

## Results

- Does the score stand out without filling the whole page with decoration?
- Is the performance category clear?
- Are chapter scores easy to compare?
- Are Play Again and Review Mistakes obvious and functional?

## Consistency

- All page headers have the same height and alignment.
- Buttons have consistent height, radius, and typography.
- Card borders and radii are consistent.
- Illustration style is consistent.
- There are no emoji characters used as random decoration.
- No text is clipped, overlapping, or too small.
- Mobile layout is intentional, not merely desktop scaled down.

---

# 16. Definition of done / acceptance criteria

The project is complete only when all items below are true.

## Functionality

- [ ] Homepage renders and main CTA works.
- [ ] Exactly 3 chapters are shown.
- [ ] Exactly 5 exercises exist in each chapter.
- [ ] All 15 exercises are playable.
- [ ] All exercises have exactly 3 scored prompts.
- [ ] All answer types validate correctly.
- [ ] Incorrect answers display helpful feedback.
- [ ] Roadmap locking/unlocking is correct.
- [ ] Completed exercises can be replayed.
- [ ] Best scores are saved per exercise.
- [ ] Progress survives refresh.
- [ ] Results only unlock after all 15 exercises are complete.
- [ ] Results show correct total and chapter scores.
- [ ] Performance category and comment match the score band.
- [ ] Review Mistakes works.
- [ ] Play Again and Reset Progress work.

## Media and licensing

- [ ] Four unDraw SVGs downloaded and present.
- [ ] Eighteen OpenMoji SVGs downloaded and present.
- [ ] Logo mark and favicon created.
- [ ] Local fonts load and include German characters.
- [ ] Lucide icons render.
- [ ] Asset credits file exists.
- [ ] OpenMoji attribution appears in the site footer or a visible credits area.
- [ ] No broken assets.
- [ ] No runtime image/font dependency on a third-party domain.

## Design and responsive

- [ ] Desktop layout looks complete.
- [ ] Tablet layout looks complete.
- [ ] Mobile layout looks complete.
- [ ] No horizontal overflow at 320px.
- [ ] Touch targets are sufficiently large.
- [ ] Focus indicators are visible.
- [ ] Reduced motion is respected.
- [ ] Error/success states are distinguishable without color alone.

## Code quality and deployment

- [ ] TypeScript strict check passes.
- [ ] Lint passes.
- [ ] Unit tests pass.
- [ ] Playwright E2E tests pass.
- [ ] Visual screenshots were inspected.
- [ ] Production build passes.
- [ ] Vercel SPA rewrite is configured.
- [ ] Vercel deployment loads on a public URL.
- [ ] Deep links and refreshes work after deployment.
- [ ] No uncaught browser console errors.

Do not mark an item complete based only on reading the code. Verify it in the running app or in an automated test.

---

# 17. Final delivery expected from the coding agent

At completion, provide the project owner with:

1. A short summary of the implemented features.
2. The local commands to run the project.
3. The production build result.
4. The Playwright test summary, including desktop/tablet/mobile coverage.
5. The Vercel deployment URL, if deployment access is available.
6. The location of `ASSET_CREDITS.md`.
7. Any remaining known limitations, stated honestly.

Never say “everything is error-free” unless the stated checks have actually been run and passed. If deployment credentials are not available, finish and verify the production build locally, then give the exact deployment steps rather than pretending it was deployed.

---

# 18. Official references

Use official sources for implementation details and verify current instructions at build time:

- unDraw illustrations: <https://undraw.co/illustrations>
- unDraw license: <https://undraw.co/license>
- OpenMoji library: <https://openmoji.org/library/>
- OpenMoji repository, download methods, attribution, and license: <https://github.com/hfg-gmuend/openmoji>
- OpenMoji releases: <https://github.com/hfg-gmuend/openmoji/releases>
- Lucide: <https://lucide.dev/>
- Lucide license: <https://lucide.dev/license>
- Nunito Sans license/details: <https://fontsource.org/fonts/nunito-sans/about>
- DM Sans license/details: <https://fontsource.org/fonts/dm-sans/about>
- Vite on Vercel: <https://vercel.com/docs/frameworks/frontend/vite>
- Playwright device emulation: <https://playwright.dev/docs/emulation>
- Playwright screenshot comparisons: <https://playwright.dev/docs/test-snapshots>

---

# 19. Final instruction

Build DeutschQuest as a complete, well-finished small product—not as a large platform. Keep the architecture static and lightweight, keep all media local, keep the three-chapter/15-exercise progression exact, and verify the final experience with Playwright on desktop and mobile. The quality bar is a fast, attractive, accessible, fully working school-project website that can be confidently demonstrated and deployed on Vercel.
