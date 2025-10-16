import { defineConfig, devices } from '@playwright/test';
import projects from './playwright/config/projects';
import { environment, isCI, testRunId } from './playwright/config/env';

export default defineConfig({
  testDir: './playwright/tests',
  fullyParallel: true,
  timeout: 45_000,
  expect: {
    timeout: 5_000,
  },
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? undefined : 4,
  reporter: [
    ['line'],
    ['html', { outputFolder: 'reports/ui-e2e/html', open: 'never' }],
    ['json', { outputFile: 'reports/ui-e2e/report.json' }],
  ],
  use: {
    baseURL: environment.baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: devices['Desktop Chrome'].viewport,
  },
  projects,
  metadata: {
    environment: environment.name,
    runId: testRunId,
  },
  outputDir: 'reports/ui-e2e/artifacts',
});
