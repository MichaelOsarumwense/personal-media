import { expect, test } from '../../../fixtures/test-fixtures';

test.describe('Media downloads', () => {
  test('initiates a PDF download and offers navigation back home', async ({ page }) => {
    await page.goto('/downloads');

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('.download-page-btn'),
    ]);

    await expect(page.getByText('Loading...')).toBeVisible();
    expect(await download.suggestedFilename()).toBe('lorem-ipsum.pdf');

    await page.waitForTimeout(2100);
    await expect(page.locator('.download-page-btn')).toHaveText('Download PDF');

    await page.click('.home-btn');
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});
