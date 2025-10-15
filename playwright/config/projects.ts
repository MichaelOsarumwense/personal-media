import { devices, type Project } from '@playwright/test';
import { environment } from './env';

const baseContext = {
  baseURL: environment.baseURL,
  trace: 'retain-on-failure' as const,
  screenshot: 'only-on-failure' as const,
  video: 'retain-on-failure' as const,
  viewport: { width: 1280, height: 720 },
};

const projects: Project[] = [
  {
    name: 'chromium-desktop',
    use: {
      ...baseContext,
      ...devices['Desktop Chrome'],
      ignoreHTTPSErrors: true,
    },
  },
  {
    name: 'firefox-desktop',
    use: {
      ...baseContext,
      ...devices['Desktop Firefox'],
      ignoreHTTPSErrors: true,
    },
  },
  {
    name: 'webkit-mobile',
    use: {
      ...baseContext,
      ...devices['iPhone 13'],
      viewport: devices['iPhone 13'].viewport,
      isMobile: true,
      userAgent: devices['iPhone 13'].userAgent,
    },
  },
];

export default projects;
