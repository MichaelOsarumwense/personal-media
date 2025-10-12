import { test as base, expect } from '@playwright/test';
import type { IdentityCredentials } from '../config/env';
import { environment, isCI, testRunId } from '../config/env';
import { SessionManager } from '../services/sessionManager';
import { ApiMocker } from '../services/apiMocker';
import { buildCredentials } from '../utils/testData';

type AppFixtures = {
  session: SessionManager;
  testUser: IdentityCredentials;
  runId: string;
  isCI: boolean;
  apiMock: ApiMocker;
};

export const test = base.extend<AppFixtures>({
  session: async ({ page, request }, use) => {
    const sessionManager = new SessionManager(page, request);
    await use(sessionManager);
    await sessionManager.reset();
  },
  testUser: async ({}, use) => {
    await use({
      ...buildCredentials(environment.credentials.primary),
    });
  },
  runId: async ({}, use) => {
    await use(testRunId);
  },
  isCI: async ({}, use) => {
    await use(isCI);
  },
  apiMock: async ({ page }, use) => {
    const mocker = new ApiMocker(page);
    await use(mocker);
    await mocker.dispose();
  },
});

export { expect };
