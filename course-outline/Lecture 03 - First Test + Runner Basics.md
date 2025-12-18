# Lecture 03 – First Test + Runner Basics

Estimated runtime: 8–10 minutes

Objective
- Write/understand a basic Playwright test and core runner concepts.
- Readable locators using roles; see auto-waiting in action.

Prerequisites
- Lectures 01–02; Node 20+, npm 10+.

Key Concepts
- `test`, `expect`, role-based locators, auto-waiting, `test.step`.

Files
- playwright/tests/smoke/authentication/login.spec.ts:1
- playwright/models/login.model.ts:1

What The Test Does
- Stubs successful login via `SessionManager` so we can focus on UI.
- Enters credentials and asserts redirect + basic page content.

Snippet (login.spec extract)
```ts
await session.stubSuccessfulLogin();
await login.goto();
await login.login(testUser);
await test.step('wait for redirect to home', async () => {
  await page.waitForURL('**/', { waitUntil: 'domcontentloaded' });
});
```

Run It
- `npm run test:e2e:smoke -- --project=chromium-desktop --grep @smoke`

Validation
- Test passes; HTML report shows one passing spec.
- Opening the trace highlights the locators and network stub.

Deliverables
- Comfort with the test runner and first green spec.

