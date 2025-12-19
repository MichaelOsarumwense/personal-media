import { expect, test } from '../../../fixtures/test-fixtures';
import { LoginModel } from '../../../models/login.model';
import { HomeModel } from '../../../models/home.model';
import { buildCredentials, buildPostCollection, buildUserProfile } from '../../../utils/testData';

test.describe('Authentication', () => {
  test.beforeEach(async ({ apiMock }) => {
    const profile = buildUserProfile();
    const posts = buildPostCollection(2, [{ owner: profile.name }, { owner: profile.name }]);

    await apiMock.primeUserProfile(profile);
    await apiMock.primeAvatar();
    await apiMock.primePosts(posts);
  });

  test('allows a user to login via the UI flow @smoke', async ({ page, session, testUser }) => {
    const login = new LoginModel(page);
    const home = new HomeModel(page);

    await session.stubSuccessfulLogin();
    await login.goto();
    await login.login(testUser);

    await test.step('wait for redirect to home', async () => {
      await page.waitForURL('**/', { waitUntil: 'domcontentloaded' });
    });

    await home.expectHeroBanner();
    await home.expectFooter();
  });

  test('surfaces an error toast when credentials are invalid', async ({ page, session }) => {
    const login = new LoginModel(page);
    const invalidUser = buildCredentials();

    // Parity with real backend copy: return the exact message
    await session.stubFailedLogin();
    await login.goto();
    await login.login(invalidUser);

    // Exact copy parity with real backend/UI
    await expect(page.getByText('Username or Password Incorrect').first()).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });
});
