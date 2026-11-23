import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../../src/data/chapters';
import { ALBANIAN_ALPHABET, DIGRAPHS, VOWELS, EXERCISES, EXERCISE_IDS, getExercise, getExerciseIndex } from '../../src/data/exercises';
import { normalizeSentence } from '../../src/lib/textNormalization';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const publicDir = path.join(projectRoot, 'public');

describe('chapter structure', () => {
  it('has exactly two quiz chapters in order', () => {
    expect(CHAPTERS.map((chapter) => chapter.number)).toEqual([1, 2]);
    expect(CHAPTERS.map((chapter) => chapter.title)).toEqual([
      'Shqipja në përdorim',
      'Historia e alfabetit',
    ]);
  });

  it('gives each chapter five ordered exercise ids', () => {
    for (const chapter of CHAPTERS) {
      expect(chapter.exerciseIds).toHaveLength(5);
      expect(chapter.exerciseIds[0]?.startsWith('c')).toBe(true);
      expect(chapter.illustration).toMatch(/^\/assets\/illustrations\/.+\.svg$/);
      expect(chapter.illustrationAlt.length).toBeGreaterThan(0);
      expect(chapter.description.length).toBeGreaterThan(0);
      expect(chapter.difficulty.length).toBeGreaterThan(0);
    }
  });
});

describe('exercise content integrity', () => {
  it('has 10 unique quiz exercises and unique prompts', () => {
    expect(EXERCISES).toHaveLength(10);
    expect(new Set(EXERCISES.map((exercise) => exercise.id)).size).toBe(10);
    expect(EXERCISE_IDS).toEqual(EXERCISES.map((exercise) => exercise.id));

    const promptIds = EXERCISES.flatMap((exercise) => exercise.prompts.map((prompt) => prompt.id));
    expect(promptIds.length).toBeGreaterThanOrEqual(40);
    expect(new Set(promptIds).size).toBe(promptIds.length);
  });

  it('has several scored prompts per exercise', () => {
    for (const exercise of EXERCISES) {
      expect(exercise.prompts.length, exercise.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('maps every exercise to its chapter and sequence number', () => {
    CHAPTERS.forEach((chapter, chapterIndex) => {
      chapter.exerciseIds.forEach((exerciseId, exerciseIndex) => {
        const exercise = getExercise(exerciseId);
        expect(exercise, exerciseId).toBeDefined();
        expect(exercise?.chapterId).toBe(chapter.id);
        expect(exercise?.number).toBe(exerciseIndex + 1);
        expect(exercise?.chapterId).toBe(CHAPTERS[chapterIndex]?.id);
      });
    });
  });

  it('keeps metadata complete and unique in each exercise', () => {
    for (const exercise of EXERCISES) {
      expect(exercise.title.trim().length, exercise.id).toBeGreaterThan(0);
      expect(exercise.instructions.trim().length, exercise.id).toBeGreaterThan(0);
      expect(exercise.type.trim().length, exercise.id).toBeGreaterThan(0);
      const promptIds = exercise.prompts.map((prompt) => prompt.id);
      expect(new Set(promptIds).size, exercise.id).toBe(promptIds.length);
      for (const prompt of exercise.prompts) {
        expect(prompt.question.trim().length, prompt.id).toBeGreaterThan(0);
        expect(prompt.explanation.trim().length, prompt.id).toBeGreaterThan(0);
      }
    }
  });

  it('validates option-based prompts and their answer keys', () => {
    for (const exercise of EXERCISES) {
      for (const prompt of exercise.prompts) {
        if (
          prompt.kind === 'choice' ||
          prompt.kind === 'number' ||
          prompt.kind === 'article' ||
          prompt.kind === 'fill-blank' ||
          prompt.kind === 'dialogue' ||
          prompt.kind === 'cafe' ||
          prompt.kind === 'correct-sentence' ||
          prompt.kind === 'picture' ||
          prompt.kind === 'color'
        ) {
          expect(prompt.options.length, prompt.id).toBeGreaterThanOrEqual(2);
          expect(prompt.options.length, prompt.id).toBeLessThanOrEqual(4);
          expect(
            prompt.options.some((option) => option.id === prompt.correctOptionId),
            prompt.id,
          ).toBe(true);
          expect(
            new Set(prompt.options.map((option) => option.id)).size,
            prompt.id,
          ).toBe(prompt.options.length);
          for (const option of prompt.options) {
            expect(option.label.trim().length, `${prompt.id}:${option.id}`).toBeGreaterThan(0);
          }
        }

        if (prompt.kind === 'picture') {
          for (const option of prompt.options) {
            expect(option.image, `${prompt.id}:${option.id}`).toMatch(
              /^\/assets\/vocabulary\/.+\.svg$/,
            );
          }
        }

        if (prompt.kind === 'color') {
          for (const option of prompt.options) {
            expect(option.color, `${prompt.id}:${option.id}`).toMatch(/^#[0-9A-F]{6}$/i);
          }
        }
      }
    }
  });

  it('builds every sentence from its available chips', () => {
    const permutations = <T,>(items: T[]): T[][] =>
      items.length <= 1
        ? [items]
        : items.flatMap((item, index) =>
            permutations(items.filter((_, itemIndex) => itemIndex !== index)).map((rest) => [
              item,
              ...rest,
            ]),
          );

    for (const exercise of EXERCISES) {
      for (const prompt of exercise.prompts) {
        if (prompt.kind !== 'sentence') continue;
        expect(prompt.chips.length, prompt.id).toBeGreaterThanOrEqual(3);
        const target = normalizeSentence(prompt.correctSentence);
        expect(
          permutations(prompt.chips).some(
            (chips) => normalizeSentence(chips.join(' ')) === target,
          ),
          `${prompt.id}: sentence cannot be built from its chips`,
        ).toBe(true);
      }
    }
  });

  it('has unique right-hand answers inside each matching exercise', () => {
    for (const exercise of EXERCISES) {
      const matching = exercise.prompts.filter((prompt) => prompt.kind === 'matching');
      if (matching.length === 0) continue;
      expect(matching, exercise.id).toHaveLength(3);
      expect(new Set(matching.map((prompt) => prompt.right)).size, exercise.id).toBe(3);
      expect(new Set(matching.map((prompt) => prompt.left)).size, exercise.id).toBe(3);
    }
  });

  it('resolves exercise indexes consistently', () => {
    EXERCISES.forEach((exercise, index) => {
      expect(getExerciseIndex(exercise.id)).toBe(index);
    });
    expect(getExerciseIndex('unknown')).toBe(-1);
    expect(getExercise('c2-e1')?.title).toBe('Shkruaje saktë');
    expect(getExercise('unknown')).toBeUndefined();
  });
});

describe('asset bundle', () => {
  it('contains the code-created illustrations', () => {
    const artAssets = [
      'home-shkronjat.svg',
      'chapter-shkronjat.svg',
      'chapter-gjuha.svg',
      'chapter-historia.svg',
    ];
    for (const asset of artAssets) {
      expect(existsSync(path.join(publicDir, 'assets/illustrations', asset)), asset).toBe(true);
    }
  });

  it('contains the code-created brand mark and favicon', () => {
    expect(existsSync(path.join(publicDir, 'assets/brand/shkronjat-tona-mark.svg'))).toBe(true);
    expect(existsSync(path.join(publicDir, 'assets/brand/favicon.svg'))).toBe(true);
  });

  it('resolves every runtime asset reference to a real file', () => {
    const references = new Set<string>();
    for (const exercise of EXERCISES) {
      for (const prompt of exercise.prompts) {
        if (prompt.kind === 'picture') {
          for (const option of prompt.options) {
            if (option.image) references.add(option.image);
          }
        }
      }
    }
    for (const chapter of CHAPTERS) {
      references.add(chapter.illustration);
    }
    references.add('/assets/illustrations/home-shkronjat.svg');
    references.add('/assets/brand/shkronjat-tona-mark.svg');
    references.add('/assets/brand/favicon.svg');

    expect(references.size).toBeGreaterThan(0);
    for (const reference of references) {
      expect(existsSync(path.join(publicDir, reference)), reference).toBe(true);
    }
  });

  it('exposes exactly 36 alphabet letters, 9 digraphs and 7 vowels', () => {
    expect(ALBANIAN_ALPHABET).toHaveLength(36);
    expect(DIGRAPHS).toHaveLength(9);
    expect(VOWELS).toHaveLength(7);
  });
});
