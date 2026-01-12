# Lecture 31 – Selectors Deep Dive

Estimated runtime: 12–15 minutes

Objective
- Master reliable selector strategies in Playwright using the Login and Home pages.

Key Takeaways
- Prefer: roles > accessible labels/placeholders > data-testid > IDs > CSS/XPath.
- Use locator APIs (`getBy*`, `locator`) for auto-waiting and stability.
- Scope within containers for clarity.

Practice Spec (runnable)
```ts
// playwright/tests/lessons/selectors/login-selectors.spec.ts
import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Selectors – Login & Home', () => {
  test('login page selectors overview', async ({ page }) => {
    await page.goto('/login');

    // 1) data-testid (explicit hook)
    await expect(page.getByTestId('login-page')).toBeVisible();

    // 2) Role + accessible name
    await expect(page.getByRole('link', { name: 'Private Media' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 3) Labels & placeholders
    await expect(page.getByPlaceholder('email')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();

    // 4) IDs
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();

    // 5) Text (exact/partial) – prefer when copy is unique & stable
    await expect(page.getByText('Reset Password?')).toBeVisible();
    await expect(page.getByText('Sign Up')).toBeVisible();

    // 6) Scoped selection within a container
    const form = page.getByTestId('login-page');
    await expect(form.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('home page selectors overview', async ({ page, session, apiMock }) => {
    // Prime minimal data and stub login so home loads
    await session.stubSuccessfulLogin();
    await apiMock.primeUserProfile();
    await apiMock.primeAvatar();
    await apiMock.primePosts();

    await page.goto('/login');
    await page.getByPlaceholder('email').fill('user@example.com');
    await page.getByLabel('password').fill('secret');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/$/);

    // Brand text
    await expect(page.getByText('Private Media').first()).toBeVisible();

    // Responsive assertions: presence of either menu or hero copy
    // (See HomeModel for viewport-sensitive checks.)
  });
});
```

Notes
- Configure a different test-id attribute via `testIdAttribute` if your app uses `data-qa`.
- Avoid XPath in UI tests unless there is no better option.
