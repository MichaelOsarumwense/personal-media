import { expect, test } from '../../../fixtures/test-fixtures';
import { buildCredentials } from '../../../utils/testData';

const buildResetPayload = () => {
  const creds = buildCredentials();
  return {
    email: creds.email,
    password: creds.password,
    secret: 'reset-secret',
  };
};

test.describe('Password Reset', () => {
  test.beforeEach(async ({ apiMock }) => {
    await apiMock.configurePasswordReset();
  });

  test('resets password and redirects to login', async ({ page }) => {
    const payload = buildResetPayload();

    await page.goto('/reset-password');

    await page.fill('#email', payload.email);
    await page.fill('#password', payload.password);
    await page.fill('#secret', payload.secret);

    await page.click('#submitButton');

    await expect(
      page.getByText('Password reset successful! Please login with your new password.'),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });
});

