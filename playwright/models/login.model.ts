import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

type LoginFields = {
  email: string;
  password: string;
};

export class LoginModel {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/login');
    await this.assertIsLoaded();
  }

  async assertIsLoaded(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'Private Media' })).toBeVisible();
    await expect(this.page.locator('#email')).toBeVisible();
    await expect(this.page.locator('#password')).toBeVisible();
  }

  async login({ email, password }: LoginFields): Promise<void> {
    await this.page.locator('#email').fill(email);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectErrorToast(): Promise<void> {
    await expect(this.page.getByText('Login Error').first()).toBeVisible();
  }

  async expectOnboardingCopy(): Promise<void> {
    await expect(
      this.page.getByText(
        'Private media lets you share your thoughts and experiences without having to worry about anyone snooping in your business.',
      ),
    ).toBeVisible();
  }
}
