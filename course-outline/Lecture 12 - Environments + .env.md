# Lecture 12 – Environments + .env

Estimated runtime: 8–10 minutes

Objective
- Add a minimal environment resolver with dotenv and wire it into fixtures.

Prerequisites
- Lectures 01–11.

Key Concepts
- `.env` loading, base URL/API URL resolution, credentials per env.

Start State
- Basic fixtures from Lecture 11; no env resolver yet.

Outcome
- A small `environment` export you can import in fixtures/services.

Files
- playwright/config/env.ts
- .env

Important Variables
- `UI_E2E_ENV` – target env (defaults to `local`).
- `UI_E2E_BASE_URL` – UI origin override.
- `UI_E2E_API_BASE_URL` – API origin override.
- `UI_E2E_USER_EMAIL` / `UI_E2E_USER_PASSWORD` – default credentials.

Steps
1) Create env resolver
   - Path: `playwright/config/env.ts`
   - Contents (minimal):
     ```ts
     import * as dotenv from 'dotenv';
     dotenv.config({ path: process.env.UI_E2E_DOTENV || '.env' });

     export type IdentityCredentials = { email: string; password: string };

     const UI_E2E_BASE_URL = process.env.UI_E2E_BASE_URL || 'http://localhost:3000';
     const UI_E2E_API_BASE_URL = process.env.UI_E2E_API_BASE_URL || process.env.REACT_APP_URL || 'http://localhost:3001';

     const credentials = {
       primary: {
         email: process.env.UI_E2E_USER_EMAIL || 'user@example.com',
         password: process.env.UI_E2E_USER_PASSWORD || 'Password123!',
       } satisfies IdentityCredentials,
     };

     export const environment = { baseURL: UI_E2E_BASE_URL, apiBaseURL: UI_E2E_API_BASE_URL, credentials };
     ```

2) Use env in fixtures
   - Update `playwright/fixtures/test-fixtures.ts` to pull from env:
     ```ts
     import { environment, type IdentityCredentials } from '../config/env';
     // ... then use: await use({ ...environment.credentials.primary });
     ```

3) .env sample
   - Add (or confirm) `.env` with:
     ```env
     UI_E2E_BASE_URL=http://localhost:3000
     UI_E2E_API_BASE_URL=http://localhost:3001
     UI_E2E_USER_EMAIL=user@example.com
     UI_E2E_USER_PASSWORD=Password123!
     ```

Validate
- Temporarily log `environment` from a spec to verify values resolve.

Instructor notes
- Keep this minimal now; later lectures introduce ApiClient/SessionManager and mocks.

Validation
- `console.log(environment)` in a spec (temporarily) to verify resolved config.

Deliverables
- Confidence in directing tests at different targets with minimal changes.
