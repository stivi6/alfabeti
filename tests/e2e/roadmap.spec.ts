import { expect, test } from '@playwright/test';
import { buildProgress, openRoadmap, seedProgress } from './helpers';

test.describe('roadmap and unlocking', () => {
  test('starts with only the first challenge available', async ({ page }) => {
    await openRoadmap(page);
    await expect(page.getByText('0 / 15 sfida', { exact: true }).first()).toBeVisible();
    await expect(page.getByTestId('roadmap-node-c1-e1')).toHaveAttribute('data-status', 'current');
    await expect(page.getByTestId('roadmap-node-c1-e2')).toHaveAttribute('data-status', 'locked');
    await expect(page.getByTestId('roadmap-node-c3-e5')).toHaveAttribute('data-status', 'locked');
  });
  test('reflects completed progress and unlocks the next chapter', async ({ page }) => {
    await seedProgress(page, buildProgress({ completedCount: 5 }));
    await openRoadmap(page);
    await expect(page.getByText('5 / 15 sfida', { exact: true }).first()).toBeVisible();
    await expect(page.getByTestId('roadmap-node-c1-e5')).toHaveAttribute('data-status', 'completed');
    await expect(page.getByTestId('roadmap-node-c2-e1')).toHaveAttribute('data-status', 'current');
  });
  test('resets progress only after confirmation', async ({ page }) => {
    await seedProgress(page, buildProgress({ completedCount: 3 }));
    await openRoadmap(page);
    await page.getByRole('button', { name: 'Rivendos progresin' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Rivendos progresin' }).click();
    await expect(page.getByText('0 / 15 sfida', { exact: true }).first()).toBeVisible();
  });
});
