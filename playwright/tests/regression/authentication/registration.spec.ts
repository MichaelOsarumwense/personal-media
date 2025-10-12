import { expect, test } from '../../../fixtures/test-fixtures';
import { buildCredentials, buildUserProfile } from '../../../utils/testData';

test.describe('User Registration', () => {
  test.beforeEach(async ({ apiMock }) => {
    await apiMock.configureRegistration();
  });

  test('registers a new account and routes back to login', async ({ page }) => {
    const profile = buildUserProfile();
    const credentials = buildCredentials({ email: profile.email });

    await page.goto('/register');

    await page.fill('#name', profile.name);
    await page.fill('#email', credentials.email);
    await page.fill('#password', credentials.password);
    await page.fill('#secret', profile.secret);
    await page.fill('#address', profile.address);
    await page.fill('#dob', profile.dob);
    await page.fill('#hobbies', profile.hobbies);
    await page.fill('#events', profile.events);

    await page.click('#submitButton');

    await expect(page.getByText('Successful Registration')).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });
});

