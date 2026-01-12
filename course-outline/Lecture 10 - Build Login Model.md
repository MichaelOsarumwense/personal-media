# Lecture 10 – Build Login Model

Estimated runtime: 10–12 minutes

Objective
- Build a robust Login model from scratch that encapsulates navigation, input, and basic assertions.

Prerequisites
- Lectures 01–09.

Key Concepts
- Role-based locators, minimal public methods, clear assertions.

Start State
- You have a basic smoke spec that directly navigates to `/login` (Lecture 03).

Outcome
- A `LoginModel` class used by the smoke spec for readability and reuse.

Why this matters
- Encapsulating navigation and inputs keeps tests small and intention‑revealing.

Steps
1) Create the model
   - Path: `playwright/models/login.model.ts`
   - Contents:
     ```ts
     import type { Page } from '@playwright/test';
     import { expect } from '@playwright/test';

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

       async login({ email, password }: { email: string; password: string }): Promise<void> {
         await this.page.locator('#email').fill(email);
         await this.page.locator('#password').fill(password);
         await this.page.getByRole('button', { name: 'Login' }).click();
       }
     }
     ```

2) Refactor the smoke spec to use the model
   - Path: `playwright/tests/smoke/authentication/login.spec.ts`
   - Replace body with:
     ```ts
     import { test, expect } from '@playwright/test';
     import { LoginModel } from '../../../models/login.model';

     test('renders login form @smoke', async ({ page }) => {
       const login = new LoginModel(page);
       await login.goto();
       await login.assertIsLoaded();
     });
     ```

3) Explain SPA‑friendly URL checks (note for instructor)
   - Prefer `expect(page).toHaveURL(...)` after actions that cause router navigation.
   - Avoid `waitForURL(..., { waitUntil: 'load' })` for SPA transitions.

Validate
- Run: `npm run test:e2e:smoke -- --project=chromium-desktop`.
- The smoke spec passes and remains readable.

Deliverables
- A reusable Login model integrated into the smoke test.
