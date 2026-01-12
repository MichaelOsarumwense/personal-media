# Lecture 03 – First Test + Runner Basics

Estimated runtime: 8–10 minutes

Objective
- Write your first Playwright test from scratch and learn core runner concepts.

Prerequisites
- Lectures 01–02; Node 20+, npm 10+.

Start State
- Playwright configured (Lecture 02); no tests yet.

Outcome
- A passing smoke test that loads the login page and asserts key elements.

Key Concepts
- `test`, `expect`, role-based locators, auto-waiting, `test.step`.

Steps
1) Create the smoke spec file
   - Path: `playwright/tests/smoke/authentication/login.spec.ts`
   - Contents:
     ```ts
     import { test, expect } from '@playwright/test';

     test.describe('Authentication', () => {
       test('renders login form @smoke', async ({ page }) => {
         await test.step('navigate to login', async () => {
           await page.goto('/login');
         });

         await test.step('assert UI elements', async () => {
           await expect(page.getByRole('link', { name: 'Private Media' })).toBeVisible();
           await expect(page.locator('#email')).toBeVisible();
           await expect(page.locator('#password')).toBeVisible();
           await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
         });
       });
     });
     ```

2) Run it
   - `npm run test:e2e:smoke -- --project=chromium-desktop`

Validate
- Spec passes and an HTML report is available at `reports/ui-e2e/html`.

Next
- In Lecture 06 we’ll refine selectors; by Lecture 10 we’ll refactor this spec to use a Login model.
