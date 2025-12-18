# Lecture 02 – Node/TS/Playwright Setup

Estimated runtime: 8–10 minutes

Objective
- Get comfortable with the existing Playwright + TypeScript setup in this repo.
- Learn how env and projects are configured for multi-device testing.

Prerequisites
- Lecture 01; Node 20+, npm 10+, Git.

Key Concepts
- `playwright.config.ts`, projects, reporters, artifacts.
- Environment resolver in `playwright/config/env.ts`.
- Scripts in `package.json` for E2E workflows.

Files To Open
- playwright.config.ts:1
- playwright/config/env.ts:1
- playwright/config/projects.ts:1
- package.json:1 (scripts section)

Quick Tour
- Config sets testDir, reporters (line, html, json), artifacts dir, and devices.
- `env.ts` loads `.env`, resolves UI and API base URLs, and credentials.
- Projects file defines chromium/firefox/webkit-mobile contexts.

Commands
- Install browsers: `npm run test:e2e:install`
- Smoke run (Chromium desktop): `npm run test:e2e:chrome:smoke`
- Full suite: `npm run test:e2e`

Validation
- HTML report generated in `reports/ui-e2e/html` when tests run.
- JSON report at `reports/ui-e2e/report.json` for CI analytics.

Deliverables
- Your local environment can execute Playwright tests and open reports.

