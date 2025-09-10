import { test, expect } from '@playwright/test';

import type { Page } from '@playwright/test';

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

    const targetCity = 'Rio de Janeiro';
    const targetTab = page.getByRole('tab', { name: new RegExp(targetCity, 'i') });

    const cityRequestPromise = page.waitForRequest(
      (req) => {
        if (req.method() !== 'GET') {
          return false;
        }
        const url = req.url();
        return (
          url.includes('Rio%20de%20Janeiro') ||
          url.includes('Rio+de+Janeiro') ||
          /Rio.*de.*Janeiro/i.test(decodeURIComponent(url))
        );
      },
      { timeout: 15000 },
    );

    await targetTab.click();
    await expect(targetTab).toHaveAttribute('aria-selected', 'true');
    await expect(firstTab).toHaveAttribute('aria-selected', 'false');

    const cityRequest = await cityRequestPromise;
    expect(cityRequest.url()).toBeTruthy();

    await waitForForecastLoaded(page);

    await expect(page.getByText(new RegExp(targetCity, 'i')).first()).toBeVisible();
  });
});

test.describe('City Search', () => {
  test('typing a city term triggers API search and displays results', async ({ page }) => {
    await page.goto('/');

    const root = page.locator('[data-test="city-search"]');
    const input = root.getByLabel('Add city');
    await input.click();

    const query = 'Lon';

    const requestPromise = page.waitForRequest(
      (req) => {
        if (req.method() !== 'GET') {
          return false;
        }
        const url = req.url();
        return /\/search\.json/.test(url) && /q=Lon/i.test(url);
      },
      { timeout: 15000 },
    );

    await input.fill(query);

    const searchRequest = await requestPromise;
    expect(searchRequest.url()).toContain('q=Lon');

    const resultButtons = root.locator('ul li button');
    await expect(resultButtons.first()).toBeVisible();
  });

  test('adding a searched US city adds a new tab and triggers API calls', async ({ page }) => {
    await page.goto('/');
    const searchRoot = page.locator('[data-test="city-search"]');
    const tabsRoot = page.locator('[data-test="city-tabs"]');
    const input = searchRoot.getByLabel('Add city');

    const query = 'Boston';

    const searchRequestPromise = page.waitForRequest(
      (req) => {
        if (req.method() !== 'GET') {
          return false;
        }
        const url = req.url();
        return /\/search\.json/.test(url) && /q=Boston/i.test(url);
      },
      { timeout: 15000 },
    );

    await input.fill(query);
    const searchReq = await searchRequestPromise;
    expect(searchReq.url()).toContain('q=Boston');

    const firstResultButton = searchRoot.locator('ul li button').first();

    const weatherRequestPromise = page.waitForRequest(
      (req) => {
        if (req.method() !== 'GET') {
          return false;
        }
        const url = decodeURIComponent(req.url());
        return /q=Boston/i.test(url) && /\.json/.test(url) && /(current|forecast)/.test(url);
      },
      { timeout: 20000 },
    );

    await firstResultButton.click();

    const newTab = tabsRoot.getByRole('tab', { name: /Boston/i });
    await expect(newTab).toBeVisible();

    const weatherReq = await weatherRequestPromise;
    expect(decodeURIComponent(weatherReq.url())).toMatch(/q=Boston/i);
  });
});
