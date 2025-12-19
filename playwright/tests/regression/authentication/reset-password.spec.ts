import { expect, test } from '../../../fixtures/test-fixtures';
import { buildCredentials } from '../../../utils/testData';

const buildResetPayload = () => {
  const creds = buildCredentials();
  return {
    email: creds.email,
    password: creds.password,
    // Must match the secret used when creating users via fixture in real/hybrid mode
    secret: 'reset-secret',
  };
};

test.describe('Password Reset', () => {
  test.beforeEach(async ({ apiMock }) => {
    await apiMock.configurePasswordReset();
  });

test('resets password and redirects to login', async ({ page, testUser }) => {
  // In real/hybrid runs, reset the password for the freshly-created test user
  const nextPassword = buildCredentials().password;
  const payload = {
    email: testUser.email,
    password: nextPassword,
    secret: 'reset-secret',
  };

    await page.goto('/reset-password');

    await page.fill('#email', payload.email);
    await page.fill('#password', payload.password);
    await page.fill('#secret', payload.secret);

  // Ensure we wait for the actual PATCH request before asserting UI redirect & toast
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes('/users/reset-password') &&
        response.request().method() === 'PATCH' &&
        response.ok(),
    ),
    page.click('#submitButton'),
  ]);

  // Exact copy parity with the UI
  await expect(
    page.getByText('Password reset successful! Please login with your new password.'),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);
  });
});
