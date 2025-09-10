import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.TESTS_BASE_URL || 'http://localhost:5173';

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: '**/*.test.ts',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: 0,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
