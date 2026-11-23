import { describe, expect, it } from 'vitest';
import { createDefaultProgress } from '../../src/lib/storage';
import { getCompletedCount, getCurrentExerciseId, getNextExerciseId, isGameComplete, recordExerciseAttempt } from '../../src/lib/progress';
import type { PromptOutcome } from '../../src/lib/types';

describe('final quiz progress',()=>{
 it('starts at the language quiz',()=>{
  const progress=createDefaultProgress();
  expect(getCurrentExerciseId(progress)).toBe('c2-e1');
  expect(getCompletedCount(progress)).toBe(0);
  expect(isGameComplete(progress)).toBe(false);
 });
 it('records and advances a completed exercise',()=>{
  const outcomes:PromptOutcome[]=[
   {promptId:'c2-e1-p1',correct:true,answer:'shtëpi'},
   {promptId:'c2-e1-p2',correct:true,answer:'çelës'},
   {promptId:'c2-e1-p3',correct:false,answer:'gjuhe'},
  ];
  const progress=recordExerciseAttempt(createDefaultProgress(),'c2-e1',outcomes);
  expect(progress.exercises['c2-e1']?.completed).toBe(true);
  expect(progress.exercises['c2-e1']?.bestCorrect).toBe(2);
  expect(getNextExerciseId('c2-e1')).toBe('c2-e2');
  expect(getCompletedCount(progress)).toBe(1);
 });
 it('completes only after the two quizzes have all ten exercises',()=>{
  let progress=createDefaultProgress();
  for(let index=1;index<=5;index++) progress=recordExerciseAttempt(progress,`c2-e${index}`,[]);
  for(let index=1;index<=5;index++) progress=recordExerciseAttempt(progress,`c3-e${index}`,[]);
  expect(getCompletedCount(progress)).toBe(10);
  expect(isGameComplete(progress)).toBe(true);
 });
});
