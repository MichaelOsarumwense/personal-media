# Lecture 07 – Organizing Tests + test.step

Estimated runtime: 8–10 minutes

Objective
- Structure specs for readability and trace clarity using `test.step` and small helpers.

Prerequisites
- Lectures 01–06.

Key Concepts
- Arrange‑Act‑Assert structure; `test.describe`; `test.step` for trace grouping.

Example (login smoke)
```ts
test('allows a user to login via the UI flow @smoke', async ({ page, session, testUser }) => {
  const login = new LoginModel(page);
  const home = new HomeModel(page);

  await test.step('stub login and navigate', async () => {
    await session.stubSuccessfulLogin();
    await login.goto();
  });

  await test.step('perform login', async () => {
    await login.login(testUser);
  });

  await test.step('assert home landed', async () => {
    // SPA-friendly: assert URL instead of waiting for load
    await expect(page).toHaveURL(/\/$/);
    await home.expectHeroBanner();
  });
});
```

Validation
- Open the trace; steps appear as clear sections for faster debugging.

Deliverables
- Style guide: small tests, clear steps, reusable model methods.
