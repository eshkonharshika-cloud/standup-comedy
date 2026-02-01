import { test, expect } from '@playwright/test';

test('editor add hero and update preview', async ({ page }) => {
  await page.goto('/');

  // Add Hero
  await page.click('text=Add Hero');

  // Click Edit on first component
  await page.click('text=Edit');

  // Update Headline
  await page.fill('label:has-text("Headline Top") + input', 'E2E Headline');

  // Assert the preview updated
  await expect(page.locator('text=E2E Headline')).toBeVisible();
});
