# Asset Credits — DeutschQuest

DeutschQuest is a static, frontend-only school project. All illustrations, fonts, and icons used at runtime are bundled locally with the app. No image or font is loaded from a third-party domain while the game is running.

## unDraw illustrations

The four flat illustrations in `public/assets/illustrations/` come from [unDraw](https://undraw.co/). They were downloaded as SVG files and their main accent color was adjusted to the DeutschQuest purple (`#70509B`); one small accent in the chapter artwork was adjusted to the project mustard (`#E8B95F`). The compositions and attribution-free license terms of the originals are otherwise unchanged.

unDraw's current license permits free use in personal and commercial projects without attribution. It does not permit redistributing the artwork as an asset pack or using it for AI/ML training. See <https://undraw.co/license>.

| Local file | Source illustration | Original page | Use |
|---|---|---|---|
| `home-learning.svg` | Learning | <https://undraw.co/illustration/learning_qt7d> | Homepage hero |
| `chapter-willkommen.svg` | Reading a book | <https://undraw.co/illustration/reading-a-book_4cap> | Chapter 1 — Willkommen! |
| `chapter-alltag.svg` | Walk in the city | <https://undraw.co/illustration/walk-in-the-city_tk65> | Chapter 2 — Im Alltag |
| `chapter-deutschland.svg` | Destination | <https://undraw.co/illustration/destination_fkst> | Chapter 3 — Deutschland! |

### Documented substitutions

The two source illustrations named in the project specification were no longer available from the unDraw CDN at build time, so the closest matching illustrations from the same unDraw collection were used:

- `chapter-willkommen.svg` — requested `reading-book_qe4h` (unavailable); used **Reading a book** (`reading-a-book_4cap`).
- `chapter-alltag.svg` — requested `city-life_l74x` (unavailable); used **Walk in the city** (`walk-in-the-city_tk65`).

Both replacement illustrations keep the same subject, flat-vector style, transparent background, and visual density as the requested artwork.

## OpenMoji vocabulary illustrations

The 18 vocabulary SVGs in `public/assets/vocabulary/` are from **OpenMoji — the open-source emoji and icon project**, Color SVG set, release **17.0.0**.

- Project: <https://openmoji.org/>
- Repository and release notes: <https://github.com/hfg-gmuend/openmoji>
- Tagged release used: <https://github.com/hfg-gmuend/openmoji/releases/tag/17.0.0>
- Color SVG source pattern: `https://raw.githubusercontent.com/hfg-gmuend/openmoji/17.0.0/color/svg/<UNICODE>.svg`
- License: [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)

The artwork was downloaded unchanged and only renamed locally. Attribution is shown in the site footer.

**Required attribution:** All emojis designed by OpenMoji – the open-source emoji and icon project. License: CC BY-SA 4.0.

| Local file | OpenMoji code | Meaning |
|---|---|---|
| `apple.svg` | `1F34E` | apple — der Apfel |
| `book.svg` | `1F4D6` | open book — das Buch |
| `books.svg` | `1F4DA` | books — die Bücher |
| `house.svg` | `1F3E0` | house — das Haus |
| `cat.svg` | `1F431` | cat — die Katze |
| `dog.svg` | `1F436` | dog — der Hund |
| `bread.svg` | `1F35E` | bread — das Brot |
| `coffee.svg` | `2615` | hot beverage — coffee/tea context |
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

## Interface icons

Interface icons are React components from [Lucide](https://lucide.dev/), installed through the `lucide-react` package.

- License: ISC — <https://lucide.dev/license>
- Copyright and license text are distributed with the installed package in `node_modules/lucide-react/`.

## Fonts

Both font families are self-hosted through npm/Fontsource packages and bundled by Vite. No Google Fonts request is made at runtime.

| Family | Package | Weights used | License |
|---|---|---|---|
| Nunito Sans | `@fontsource/nunito-sans` | 700, 800 | SIL Open Font License 1.1 |
| DM Sans | `@fontsource/dm-sans` | 400, 500, 600, 700 | SIL Open Font License 1.1 |

- Nunito Sans: <https://fontsource.org/fonts/nunito-sans/about>
- DM Sans: <https://fontsource.org/fonts/dm-sans/about>
- SIL Open Font License 1.1: <https://openfontlicense.org/>

## Original assets created for this project

The following are original project artwork and are not downloaded from any third party:

- `public/assets/brand/deutschquest-mark.svg` — the DeutschQuest brand mark.
- `public/assets/brand/favicon.svg` — favicon derived from the same mark.
- The German flag (black/red/gold) is a three-stripe CSS element, not an image.
- Achievement badges, progress nodes, background shapes, and confetti are built with CSS and Lucide icons.

## Runtime availability

All 22 external SVG illustrations are stored in `public/assets/` and copied into the production build by Vite. The app references them with root-relative local paths (`/assets/...`). No runtime image or font URL points to unDraw, OpenMoji, Google Fonts, or any other third-party host.
