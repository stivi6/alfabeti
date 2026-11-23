import { describe, expect, it } from 'vitest';
import { calculateGameResults, getPerformanceCategory } from '../../src/lib/scoring';
import { createDefaultProgress } from '../../src/lib/storage';

describe('final quiz scoring',()=>{
 it('returns a zeroed result',()=>{
  const result=calculateGameResults(createDefaultProgress());
  expect(result.totalExercises).toBe(10);
  expect(result.completedExercises).toBe(0);
  expect(result.complete).toBe(false);
 });
 it('uses natural Albanian performance bands',()=>{
  expect(getPerformanceCategory(95).label).toBe('Mjeshtër i gjuhës');
  expect(getPerformanceCategory(75).label).toBe('Eksplorues i shqipes');
  expect(getPerformanceCategory(55).label).toBe('Nxënës i kujdesshëm');
  expect(getPerformanceCategory(20).label).toBe('Fillimi i rrugës');
 });
});
