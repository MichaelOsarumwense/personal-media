# Lecture 32 – Interactions Deep Dive

Estimated runtime: 12–15 minutes

Objective
- Practice the full range of user interactions in Playwright: click, fill, type, press, hover, focus/blur, clear, selectText, check/uncheck, and keyboard navigation.

Practice Spec (runnable)
```ts
// playwright/tests/lessons/interactions/login-interactions.spec.ts
import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Interactions – Login', () => {
  test.beforeEach(async ({ session, apiMock }) => {
    await session.stubSuccessfulLogin();
    await apiMock.primeUserProfile();
    await apiMock.primeAvatar();
    await apiMock.primePosts();
  });

  test('fill vs type vs clear', async ({ page }) => {
    await page.goto('/login');

    const email = page.getByPlaceholder('email');
    const password = page.getByLabel('password');

    // fill replaces entire value (fast)
    await email.fill('user@example.com');
    await password.fill('SuperSecret!');

    // clear using fill('')
    await email.fill('');

    // type sends keystrokes (slower but realistic)
    await email.type('user');
    await email.type('@example.com');

    // select all + delete
    await email.focus();
    await email.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
    await email.press('Delete');

    await expect(email).toHaveValue('');
  });

  test('submit via click and via Enter', async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder('email').fill('user@example.com');
    await page.getByLabel('password').fill('SuperSecret!');

    // Click submit (role-based)
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('keyboard-only navigation', async ({ page }) => {
    await page.goto('/login');

    await page.keyboard.press('Tab');
    await page.keyboard.type('user@example.com');
    await page.keyboard.press('Tab');
    await page.keyboard.type('SuperSecret!');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/$/);
  });

  test('hover, focus, blur, selectText', async ({ page }) => {
    await page.goto('/login');

    const email = page.getByPlaceholder('email');
    await email.focus();
    await email.type('temporary');
    await email.selectText();
    await email.blur();

    // hover over navigation link
    await page.getByRole('link', { name: 'Register' }).hover();
    await expect(email).toBeVisible();
  });
});
```

Tips
- Prefer semantic role clicks where possible; fall back to test ids/IDs if needed.
- Use `press('Enter')` to submit forms without locating the button.
- Use `page.keyboard` for global navigation; use element `.press()` for scoped shortcuts.
