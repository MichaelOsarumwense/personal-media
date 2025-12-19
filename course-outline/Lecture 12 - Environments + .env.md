# Lecture 12 – Environments + .env

Estimated runtime: 8–10 minutes

Objective
- Manage environments (local/staging/production) via a TypeScript resolver and dotenv.

Prerequisites
- Lectures 01–11.

Key Concepts
- `.env` loading, `UI_E2E_ENV`, baseURL/apiBaseURL resolution, credentials per env.

Files
- playwright/config/env.ts:1
- .env:1

Important Variables
- `UI_E2E_ENV` – target env (defaults to `local`).
- `UI_E2E_BASE_URL` – UI origin override.
- `UI_E2E_API_BASE_URL` – API origin override.
- `UI_E2E_USER_EMAIL` / `UI_E2E_USER_PASSWORD` – default credentials.

Defaults (from repo)
- Fallback UI: `https://personal-media.vercel.app`
- Fallback API: `.env REACT_APP_URL` or `http://localhost:3001`

Usage
- Run smoke against local UI: `UI_E2E_BASE_URL=http://localhost:3000 npm run test:e2e:smoke`
- Switch env via file: `UI_E2E_DOTENV=.env.staging npm run test:e2e`
- Toggle modes via scripts:
  - Mocked: `npm run test:e2e:mocked[:smoke|:all]`
  - Hybrid (real API, login stubbed): `npm run test:e2e:hybrid[:smoke]`
  - Real (full integration): `npm run test:e2e:real[:smoke]` with `UI_E2E_BASE_URL` (+ `UI_E2E_API_BASE_URL`)

Validation
- `console.log(environment)` in a spec (temporarily) to verify resolved config.

Deliverables
- Confidence in directing tests at different targets with minimal changes.
