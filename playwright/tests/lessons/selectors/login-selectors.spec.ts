import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Selectors – Login & Home', () => {
  test('login page selectors overview', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByTestId('login-page')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Private Media' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByPlaceholder('email')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByText('Reset Password?')).toBeVisible();
    await expect(page.getByText('Sign Up')).toBeVisible();

    const form = page.getByTestId('login-page');
    await expect(form.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('home page selectors overview', async ({ page, session, apiMock }) => {
    await session.stubSuccessfulLogin();
    await apiMock.primeUserProfile();
    await apiMock.primeAvatar();
    await apiMock.primePosts();

    await page.goto('/login');
    await page.getByPlaceholder('email').fill('user@example.com');
    await page.getByLabel('password').fill('secret');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText('Private Media').first()).toBeVisible();
  });
});

