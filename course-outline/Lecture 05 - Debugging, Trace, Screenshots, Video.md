# Lecture 05 – Debugging, Trace, Screenshots, Video

Estimated runtime: 10–12 minutes

Objective
- Practice Playwright’s debugging tools to understand and fix failures fast.

Prerequisites
- Lectures 01–04.

Start State
- You can run the smoke spec; reporters configured.

Outcome
- You can run headed debug, open traces, and capture artifacts on failure.

Why this matters
- Quick feedback loops cut triage time and increase confidence.

Key Concepts
- `--debug`, trace viewer, screenshots/video on failure.

Runner Tips
- Headed debug: `npm run test:e2e:debug`
- Single spec: `npx playwright test path/to/spec.ts --debug`
- Only Chromium: `--project=chromium-desktop`

Trace
- Default policy (repo): `retain-on-failure` (see `playwright.config.ts`).
- Open last run: `npx playwright show-report` or specify a trace zip.

Screenshots & Video
- Configured as “only/retain on failure” for CI logs.

Validation
- Introduce a failing assertion locally; re-run and open the trace to inspect steps, console, and network.

Deliverables
- A repeatable workflow for investigating test failures.
