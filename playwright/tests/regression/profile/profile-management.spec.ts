import path from 'path';
import { expect, test } from '../../../fixtures/test-fixtures';
import { LoginModel } from '../../../models/login.model';
import { buildPostCollection, buildUserProfile } from '../../../utils/testData';
import type { Page } from '@playwright/test';
import type { IdentityCredentials } from '../../../config/env';
import type { SessionManager } from '../../../services/sessionManager';

test.describe('Profile management', () => {
  test.beforeEach(async ({ apiMock }) => {
    const profile = buildUserProfile();
    const posts = buildPostCollection(1, [{ owner: profile.name, description: 'Daily highlight' }]);

    await apiMock.primeUserProfile(profile);
    await apiMock.primeAvatar();
    await apiMock.primePosts(posts);
  });

  const avatarUploadPath = path.resolve(
    __dirname,
    '../../../../src/components/layout/images/01.png',
  );

  const loginAndLandOnHome = async (
    page: Page,
    session: SessionManager,
    credentials: IdentityCredentials,
  ): Promise<void> => {
    await session.stubSuccessfulLogin({ token: 'profile-token' });
    const login = new LoginModel(page);
    await login.goto();
    await login.login(credentials);
    await page.waitForURL('**/', { waitUntil: 'domcontentloaded' });
  };

  test('updates profile details', async ({ page, session, testUser }) => {
    await loginAndLandOnHome(page, session, testUser);

    await page.locator('#userProfile').click();
    await page.waitForURL('**/update-user');

    await expect(page.locator('#name')).not.toBeDisabled();
    const updatedAddress = '88 Market Street, San Francisco';
    const updatedEvent = 'Meta Media Lab';

    await page.fill('#address', updatedAddress);
    await page.fill('#events', updatedEvent);

    await Promise.all([
      page.waitForResponse(
        (response) => response.url().includes('/users/me') && response.request().method() === 'PATCH',
      ),
      page.click('#submitButton'),
    ]);

    await expect(page.getByText('User update success.')).toBeVisible();
    await page.waitForURL('**/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('#profileAddress')).toContainText(updatedAddress);
    await expect(page.locator('#profileEvents')).toContainText(updatedEvent);
  });

  test('deletes the account and redirects to login', async ({ page, session, testUser }) => {
    await loginAndLandOnHome(page, session, testUser);

    await page.locator('#userProfile').click();
    await page.waitForURL('**/update-user');

    await page.click('#deleteButton');

    await Promise.all([
      page.waitForResponse(
        (response) => response.url().includes('/users/me') && response.request().method() === 'DELETE',
      ),
      page.locator('#confirmDeleteRef').click(),
    ]);

    await expect(page.getByText('Success, user deleted')).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);

    const token = await page.evaluate(() => window.localStorage.getItem('access_token'));
    expect(token).toBeNull();
  });

  test('downloads the current profile image', async ({ page, session, testUser }) => {
    await loginAndLandOnHome(page, session, testUser);

    await expect(page.locator('#profileImg')).toHaveAttribute('src', /blob:/);

    const updateImageLink = page.getByRole('link', { name: 'Update Image' });
    await expect(updateImageLink).toBeVisible();
    await updateImageLink.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Update Profile Picture');

    const downloadButton = modal.getByRole('button', { name: 'Download Profile Image' });
    await expect(downloadButton).toBeEnabled();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      downloadButton.click(),
    ]);

    expect(await download.suggestedFilename()).toBe('profile-Image.png');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('uploads a new profile image', async ({ page, session, testUser }) => {
    await loginAndLandOnHome(page, session, testUser);

    const initialSrc = await page.locator('#profileImg').getAttribute('src');
    await page.getByRole('link', { name: 'Update Image' }).click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    const fileInput = modal.locator('input[type="file"]');
    await fileInput.setInputFiles(avatarUploadPath);

    await expect(modal.locator('#fileName')).toContainText('01.png');

    const avatarRefresh = page.waitForResponse(
      (response) =>
        response.url().includes('/users/me/avatar') && response.request().method() === 'GET',
    );

    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes('/users/me/avatar') && response.request().method() === 'POST',
      ),
      modal.getByRole('button', { name: 'Update' }).click(),
    ]);

    await avatarRefresh;

    await expect(page.getByRole('dialog')).toHaveCount(0);
    const updatedSrc = await page.locator('#profileImg').getAttribute('src');

    expect(updatedSrc).not.toBeNull();
    expect(updatedSrc).not.toEqual(initialSrc);
    await expect(page.locator('#profileImg')).toHaveAttribute('src', /blob:/);
  });

  test('removes the profile image and falls back to default', async ({
    page,
    session,
    testUser,
  }) => {
    await loginAndLandOnHome(page, session, testUser);

    await expect(page.locator('#profileImg')).toHaveAttribute('src', /blob:/);
    const initialSrc = await page.locator('#profileImg').getAttribute('src');
    expect(initialSrc).not.toBeNull();

    await page.getByRole('link', { name: 'Update Image' }).click();
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    const reload = page.waitForNavigation({ waitUntil: 'load' });
    const avatarRemovalFetch = page.waitForResponse(
      (response) =>
        response.url().includes('/users/me/avatar') &&
        response.request().method() === 'GET' &&
        response.status() === 404,
    );

    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes('/users/me/avatar') && response.request().method() === 'DELETE',
      ),
      modal.getByRole('button', { name: 'Remove Profile Photo' }).click(),
    ]);

    await reload;
    await avatarRemovalFetch;

    const finalSrc = await page.locator('#profileImg').getAttribute('src');
    expect(finalSrc).not.toBeNull();
    expect(finalSrc).not.toEqual(initialSrc);
    await expect(page.locator('#profileImg')).not.toHaveAttribute('src', /blob:/);
    await expect(page.locator('#profileImg')).toHaveAttribute('src', /default-avatar/);
  });
});
