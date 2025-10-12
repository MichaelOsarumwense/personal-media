import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class HomeModel {
  constructor(private readonly page: Page) {}

  async expectHeroBanner(): Promise<void> {
    await expect(this.page.getByText('Private Media').first()).toBeVisible();

    const isMobile = await this.page.evaluate(() => {
      if (typeof window.matchMedia === 'function') {
        return window.matchMedia('(max-width: 768px)').matches;
      }
      return window.innerWidth <= 768;
    });

    if (isMobile) {
      await expect(this.page.locator('#pageContainer')).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Logout' }).first()).toBeVisible();
    } else {
      await expect(this.page.getByText('Stories').first()).toBeVisible();
      await expect(this.page.getByText('Live Now').first()).toBeVisible();
    }
  }

  async expectFooter(): Promise<void> {
    await expect(this.page.locator('footer')).toContainText('Private Media');
  }
}
