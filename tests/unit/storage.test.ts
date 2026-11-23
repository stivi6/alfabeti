import { describe, expect, it } from 'vitest';
import { createDefaultProgress, sanitizeProgress } from '../../src/lib/storage';

describe('final progress storage',()=>{
 it('creates a clean versioned progress object',()=>{
  const progress=createDefaultProgress();
  expect(progress.version).toBe(1);
  expect(progress.completedExerciseIds).toEqual([]);
 });
 it('drops unknown records and incompatible versions',()=>{
  expect(sanitizeProgress({version:999,exercises:{fake:{completed:true}}}).completedExerciseIds).toEqual([]);
 });
 it('accepts one valid retained exercise',()=>{
  const sanitized=sanitizeProgress({version:1,exercises:{'c2-e1':{completed:true,bestCorrect:4,attempts:1,bestPromptResults:{}}},completedExerciseIds:['c2-e1'],lastVisitedExerciseId:'c2-e1',updatedAt:'2026-11-23T12:00:00Z'});
  expect(sanitized.exercises['c2-e1']?.completed).toBe(true);
  expect(sanitized.completedExerciseIds).toEqual(['c2-e1']);
 });
});
