# Lecture 33 – Assertions Deep Dive

Estimated runtime: 12–15 minutes

Objective
- Cover core Playwright assertions: visibility, state, value, text content, attribute, URL, count, soft vs hard, and timing.

Practice Spec (runnable)
```ts
// playwright/tests/lessons/assertions/assertions-basics.spec.ts
import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Assertions – Login & Home', () => {
  test.beforeEach(async ({ session, apiMock }) => {
    await session.stubSuccessfulLogin();
    await apiMock.primeUserProfile();
    await apiMock.primeAvatar();
    await apiMock.primePosts();
  });

  test('visibility and URL assertions', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByTestId('login-page')).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);

    // Perform a login
    await page.getByPlaceholder('email').fill('user@example.com');
    await page.getByLabel('password').fill('SuperSecret!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText('Private Media').first()).toBeVisible();
  });

  test('text, value, attribute, and count assertions', async ({ page }) => {
    await page.goto('/login');

    const email = page.getByPlaceholder('email');
    const password = page.getByLabel('password');
    const submit = page.getByRole('button', { name: 'Login' });

    // value assertions
    await email.fill('user@example.com');
    await expect(email).toHaveValue('user@example.com');

    // attribute assertions (id/placeholder)
    await expect(email).toHaveAttribute('id', 'email');
    await expect(email).toHaveAttribute('placeholder', 'email');

    // text assertions
    await expect(submit).toHaveText('Login');
    await expect(page.getByRole('link', { name: 'Register' })).toContainText('Register');

    // count assertions (links present) – assert non‑zero count
    await expect(page.getByRole('link')).not.toHaveCount(0);
  });

  test('soft assertions and within steps', async ({ page }) => {
    await page.goto('/login');

    await test.step('form fields present', async () => {
      await expect.soft(page.getByPlaceholder('email')).toBeVisible();
      await expect.soft(page.getByLabel('password')).toBeVisible();
      await expect.soft(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    });

    // Aggregate soft assertion failures are reported at the end of the test
  });

  test('error toast assertion on failed login', async ({ page, session }) => {
    await session.stubFailedLogin();
    await page.goto('/login');

    await page.getByPlaceholder('email').fill('wrong@example.com');
    await page.getByLabel('password').fill('wrong');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Username or Password Incorrect').first()).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });
});
```

Notes
- `expect.soft` continues the test after failures; use selectively.
- Use specific matchers: `toHaveURL`, `toHaveTitle`, `toHaveJSProperty`, `toHaveClass`, `toHaveCSS` where appropriate.
- Avoid `waitForTimeout`; rely on Playwright’s auto-waiting and assertion timeouts.
