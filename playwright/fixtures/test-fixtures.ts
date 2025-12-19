import { test as base, expect } from '@playwright/test';
import type { IdentityCredentials } from '../config/env';
import { environment, isCI, testRunId } from '../config/env';
import { SessionManager } from '../services/sessionManager';
import { ApiMocker } from '../services/apiMocker';
import { ApiClient } from '../services/apiClient';
import { buildCredentials, buildUserProfile } from '../utils/testData';

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
  testUser: async ({ request }, use) => {
    const useMocks = process.env.UI_E2E_USE_MOCKS !== 'false';
    if (useMocks) {
      await use({
        ...buildCredentials(environment.credentials.primary),
      });
      return;
    }
    // Real/hybrid mode: create a fresh user via API for isolation
    const creds = buildCredentials();
    const profile = buildUserProfile({ email: creds.email });
    const payload = {
      name: profile.name,
      email: creds.email,
      password: creds.password,
      // Ensure reset-password test remains possible by using a known secret
      secret: 'reset-secret',
      address: profile.address,
      dob: profile.dob,
      hobbies: profile.hobbies,
      events: profile.events,
    };
    const client = new ApiClient(request, environment.apiBaseURL);
    await client.post('users', payload);
    // Yield credentials to the test
    await use(creds);
    // Cleanup: delete the created user account (ignore errors if already deleted)
    try {
      const { token } = await client.post<{ token: string }>('users/login', creds);
      await client.delete('users/me', { Authorization: token });
    } catch (_) {
      // noop – user may already be deleted during the test
    }
  },
  runId: async ({}, use) => {
    await use(testRunId);
  },
  isCI: async ({}, use) => {
    await use(isCI);
  },
  apiMock: async ({ page }, use) => {
    const enabled = process.env.UI_E2E_USE_MOCKS !== 'false';
    const mocker = new ApiMocker(page, { enabled });
    await use(mocker);
    await mocker.dispose();
  },
});

export { expect };
