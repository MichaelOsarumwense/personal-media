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

    await email.fill('user@example.com');
    await password.fill('SuperSecret!');

    await email.fill('');
    await email.type('user');
    await email.type('@example.com');

    await email.focus();
    await email.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
    await email.press('Delete');

    await expect(email).toHaveValue('');
  });

  test('submit via click and via Enter', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('email').fill('user@example.com');
    await page.getByLabel('password').fill('SuperSecret!');
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
    await page.getByRole('link', { name: 'Register' }).hover();
    await expect(email).toBeVisible();
  });
});

