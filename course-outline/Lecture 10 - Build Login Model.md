# Lecture 10 – Build Login Model

Estimated runtime: 10–12 minutes

Objective
- Build a robust Login model that encapsulates navigation, input, and basic assertions.

Prerequisites
- Lectures 01–09.

Key Concepts
- Role-based locators, minimal public methods, clear assertions.

Files
- playwright/models/login.model.ts:1
- playwright/tests/smoke/authentication/login.spec.ts:1

Model Methods (already present in repo)
```ts
async goto(): Promise<void> {
  await this.page.goto('/login');
  await this.assertIsLoaded();
}
async assertIsLoaded(): Promise<void> {
  await expect(this.page.getByRole('link', { name: 'Private Media' })).toBeVisible();
  await expect(this.page.locator('#email')).toBeVisible();
  await expect(this.page.locator('#password')).toBeVisible();
}
async login({ email, password }: { email: string; password: string }): Promise<void> {
  await this.page.locator('#email').fill(email);
  await this.page.locator('#password').fill(password);
  await this.page.getByRole('button', { name: 'Login' }).click();
}
```

Spec Usage (excerpt)
```ts
await session.stubSuccessfulLogin();
await login.goto();
await login.login(testUser);
await page.waitForURL('**/', { waitUntil: 'domcontentloaded' });
```

Validation
- Run smoke across two projects: `npm run test:e2e:smoke -- --project=chromium-desktop`
- Optionally add `--project=webkit-mobile` and confirm stability.

Deliverables
- A reusable Login model with clear semantics and stable locators.

