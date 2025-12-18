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
  testUser: async ({}, use) => { /* returns credentials */ },
  apiMock: async ({ page }, use) => {
    const mocker = new ApiMocker(page);
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

Deliverables
- Confidence using custom fixtures to model app behaviors.

