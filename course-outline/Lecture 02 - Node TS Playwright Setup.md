# Lecture 02 – Node/TS/Playwright Setup

Estimated runtime: 8–10 minutes

Objective
- Initialize Playwright + TypeScript from scratch and run a first smoke.

Prerequisites
- Lecture 01; Node 20+, npm 10+, Git.

Start State
- Empty `playwright/` folder; no Playwright config or tests yet.

Outcome
- A working Playwright TS setup with config, env, and scripts.

Steps
- Install tooling
  - `npm init`
  - `npm install -D @playwright/test typescript ts-node dotenv cross-env`
  - `npm init playwright@latest`
- Create folders
  - `mkdir -p ./{fixtures,models,services,utils,assets,config}`
- Add TS config for tests (tsconfig.playwright.json)
  - Minimal:
    ```json
    { "compilerOptions": { "target": "ES2020", "module": "commonjs", "strict": true, "types": ["@playwright/test"] }, "include": ["playwright/**/*.ts"] }
    ```
- Add Playwright config (playwright.config.ts)
  - Minimal:
    ```ts
    import { defineConfig, devices } from '@playwright/test';
    export default defineConfig({ testDir: 'playwright', projects: [{ name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } }], reporter: [['list'], ['html', { outputFolder: 'reports/ui-e2e/html', open: 'never' }], ['json', { outputFile: 'reports/ui-e2e/report.json' }]], });
    ```
- Add env resolver (playwright/config/env.ts)
  - Minimal reads `process.env` and exports `UI_E2E_BASE_URL` and sample credentials.
- Add npm scripts (package.json)
  - `"test:e2e": "playwright test --project=chromium-desktop"`

Validate
- Run: `npm run test:e2e` (should show 2 tests passing).
- HTML report opens via: `npx playwright show-report` once tests exist.

Deliverables
- Playwright TS configured; ready to add first test in Lecture 03.
