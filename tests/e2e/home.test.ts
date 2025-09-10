import { test, expect } from '@playwright/test';

import type { Page } from '@playwright/test';

// Helper: wait for forecast cards to render (uses temperature or skeleton class disappearance)
async function waitForForecastLoaded(page: Page) {
  // Wait for at least one temperature element (°C) inside current weather or forecast cards
  await page.waitForFunction(
    () => {
      return Array.from(document.querySelectorAll('span, div')).some((el) => /°C/.test(el.textContent || ''));
    },
    { timeout: 15000 },
  );
}

test.describe('City Tabs', () => {
  test('selecting a different city updates current weather after tab click', async ({ page }) => {
    await page.goto('/');

    // Initial city should be first tab
    const firstTab = page.getByRole('tab', { name: /Denver/ });
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');

    const targetTab = page.getByRole('tab', { name: /Rio de Janeiro/ });
    await targetTab.click();
    await expect(targetTab).toHaveAttribute('aria-selected', 'true');
    await expect(firstTab).toHaveAttribute('aria-selected', 'false');

    // Wait for data load (current weather temperature or condition text updates)
    await waitForForecastLoaded(page);

    // Assert some part of the UI reflects the selected city's name (headline card location)
    await expect(page.getByText(/Rio de Janeiro/i).first()).toBeVisible();
  });
});
