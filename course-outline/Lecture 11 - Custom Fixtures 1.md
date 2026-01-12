# Lecture 11 – Custom Fixtures 1

Estimated runtime: 8–10 minutes

Objective
- Create typed fixtures (session, testUser, apiMock) and wire them into tests.

Prerequisites
- Lectures 01–10.

Key Concepts
- Base test extension, typed fixtures, lifecycle cleanup.

Start State
- You have a LoginModel and a simple smoke spec (Lecture 10).

Outcome
- A `test` export with fixtures you can use in any spec: `session`, `testUser`, `apiMock`.

Why this matters
- Fixtures let you share setup/teardown and strongly‑typed helpers across tests.

Steps
1) Create the fixtures file
   - Path: `playwright/fixtures/test-fixtures.ts`
   - Contents (minimal first pass):
     ```ts
     import { test as base } from '@playwright/test';
     import type { IdentityCredentials } from '../config/env';

     type AppFixtures = {
       testUser: IdentityCredentials;
     };

     export const test = base.extend<AppFixtures>({
       testUser: async ({}, use) => {
         // Minimal fake creds; will be replaced once env + API are wired
         await use({ email: 'user@example.com', password: 'Password123!' });
       },
     });

     export { expect } from '@playwright/test';
     ```

2) Use the fixtures in the smoke spec
   - Update `playwright/tests/smoke/authentication/login.spec.ts` to import from fixtures:
     ```ts
     import { test, expect } from '../../../fixtures/test-fixtures';
     import { LoginModel } from '../../../models/login.model';

     test('renders login form @smoke', async ({ page, testUser }) => {
       const login = new LoginModel(page);
       await login.goto();
       await login.assertIsLoaded();
       // `testUser` is available for the next lecture when we perform login
       expect(testUser.email).toBeTruthy();
     });
     ```

3) Instructor notes
   - Keep fixtures minimal now; expand in Lectures 12, 15–17 to add env, session stubs, and API client.
   - Emphasize type safety and per‑test isolation.

Validate
- Run: `npm run test:e2e:smoke` and confirm the spec can access `testUser`.

Deliverables
- A typed fixture base to grow into session stubs and API mocks.
