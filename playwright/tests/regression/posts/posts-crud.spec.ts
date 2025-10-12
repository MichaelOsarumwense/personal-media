import { expect, test } from '../../../fixtures/test-fixtures';
import { LoginModel } from '../../../models/login.model';
import { HomeModel } from '../../../models/home.model';
import { buildPostCollection, buildPostRecord, buildUserProfile } from '../../../utils/testData';

const getPostIdFromUrl = (url: string): string => url.split('/').pop() ?? '';

test.describe('Timeline management', () => {
  test.beforeEach(async ({ apiMock }) => {
    const profile = buildUserProfile();
    const initialPosts = buildPostCollection(2, [
      buildPostRecord({ id: 'post-alpha', owner: profile.name, description: 'Existing adventure' }),
      buildPostRecord({ id: 'post-beta', owner: profile.name, description: 'Another shared moment' }),
    ]);

    await apiMock.primeUserProfile(profile);
    await apiMock.primeAvatar();
    await apiMock.primePosts(initialPosts);
  });

  test('creates, edits, and deletes a post', async ({ page, session, testUser }) => {
    const login = new LoginModel(page);
    const home = new HomeModel(page);

    await session.stubSuccessfulLogin({ token: 'timeline-token' });
    await login.goto();
    await login.login(testUser);

    await page.waitForURL('**/', { waitUntil: 'domcontentloaded' });
    await home.expectHeroBanner();

    const newPostCopy = 'Building a premium UI automation framework';
    await page.fill('#postText', newPostCopy);
    await Promise.all([
      page.waitForResponse(
        (response) => response.url().includes('/posts') && response.request().method() === 'POST',
      ),
      page.click('#submitPost'),
    ]);

    await expect(page.getByText('Post created successfully!')).toBeVisible();
    await expect(page.getByText(newPostCopy)).toBeVisible();

    const editHref = await page.locator('#editButton').first().getAttribute('href');
    const postId = editHref ? getPostIdFromUrl(editHref) : '';

    await Promise.all([
      page.waitForURL(`**/edit-post/${postId}`),
      page.locator('#editButton').first().click(),
    ]);

    const updatedCopy = `${newPostCopy} – updated`;
    await page.fill('textarea', updatedCopy);
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes(`/posts/${postId}`) && response.request().method() === 'PATCH',
      ),
      page.click('button:has-text("Submit")'),
    ]);

    await expect(page.getByText('Post edited successfully!')).toBeVisible();
    await page.waitForURL('**/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText(updatedCopy)).toBeVisible();

    await page.locator('#delete').first().click();
    const postsRefresh = page.waitForResponse(
      (response) => response.url().includes('/posts') && response.request().method() === 'GET',
    );
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes(`/posts/${postId}`) && response.request().method() === 'DELETE',
      ),
      postsRefresh,
      page.locator('#confirmDeleteRef').click(),
    ]);

    await expect(page.getByText('Post deleted successfully!')).toBeVisible();
    await expect(page.getByText(updatedCopy)).toHaveCount(0);
  });
});
