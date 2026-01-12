# Lecture 25 – Isolation & Teardown

Estimated runtime: 8–10 minutes

Objective
- Ensure tests are independent via context isolation and deterministic teardown.

Prerequisites
- Lectures 01–24.

Key Concepts
- New browser context per test (default Playwright behavior).
- Route cleanup and shared resource disposal in fixtures.

Files
- playwright/fixtures/test-fixtures.ts:1
- playwright/services/apiMocker.ts (dispose):1
- playwright/services/sessionManager.ts (reset):1

Fixture Disposal (excerpt)
```ts
apiMock: async ({ page }, use) => {
  const mocker = new ApiMocker(page);
  await use(mocker);
  await mocker.dispose(); // unregister routes, reset state
},
```

Session Reset (excerpt)
```ts
await sessionManager.reset(); // clear cookies/permissions
```

Validation
- No test leaks its routes or cookies into another test.
- Running tests in a different order produces the same results.

Deliverables
- Confidence that the suite is order‑independent and stable.

