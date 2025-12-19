# Lecture 11 – Custom Fixtures 1

Estimated runtime: 8–10 minutes

Objective
- Extend the base test with typed fixtures for session, user, and api mocks.

Prerequisites
- Lectures 01–10.

Key Concepts
- Base test extension, typed fixtures, lifecycle cleanup.

Files
- playwright/fixtures/test-fixtures.ts:1
- playwright/services/sessionManager.ts:1
- playwright/services/apiMocker.ts:1

Fixture Overview (excerpt)
```ts
export const test = base.extend<AppFixtures>({
  session: async ({ page, request }, use) => {
    const sessionManager = new SessionManager(page, request);
    await use(sessionManager);
    await sessionManager.reset();
  },
  // In mocked mode, provide generated credentials;
  // In real/hybrid, create a fresh user via API and clean up after tests
  testUser: async ({ request }, use) => {
    const useMocks = process.env.UI_E2E_USE_MOCKS !== 'false';
    if (useMocks) {
      await use(buildCredentials(environment.credentials.primary));
      return;
    }
    const creds = buildCredentials();
    const profile = buildUserProfile({ email: creds.email });
    const client = new ApiClient(request, environment.apiBaseURL);
    await client.post('users', {
      name: profile.name,
      email: creds.email,
      password: creds.password,
      secret: 'reset-secret',
      address: profile.address,
      dob: profile.dob,
      hobbies: profile.hobbies,
      events: profile.events,
    });
    await use(creds);
    try {
      const { token } = await client.post<{ token: string }>('users/login', creds);
      await client.delete('users/me', { Authorization: token });
    } catch (_) { /* already deleted in test */ }
  },
  apiMock: async ({ page }, use) => {
    const mocker = new ApiMocker(page, { enabled: process.env.UI_E2E_USE_MOCKS !== 'false' });
    await use(mocker);
    await mocker.dispose();
  },
});
```

Spec Usage
```ts
test('login smoke', async ({ page, session, testUser }) => {
  await session.stubSuccessfulLogin();
  // ...
});
```

Validation
- A spec can access `session`, `testUser`, and `apiMock` directly from the test context.

Notes
- Toggle mocks and login stubs with env:
  - `UI_E2E_USE_MOCKS=true|false` (default true)
  - `UI_E2E_STUB_LOGIN=true|false` (default true)
- In real/hybrid, a new user is created and deleted per run to keep data isolated.

Deliverables
- Confidence using custom fixtures to model app behaviors.
