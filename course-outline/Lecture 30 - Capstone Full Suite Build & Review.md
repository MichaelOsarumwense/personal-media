# Lecture 30 – Capstone: Full Suite Build & Review

Estimated runtime: 12 minutes

Objective
- Review the full framework, run the complete suite, and outline next steps for real‑world adoption.

Prerequisites
- Lectures 01–29.

Key Concepts
- Journeys covered: login, register, reset, posts CRUD, profile update/delete, avatar lifecycle, downloads, a11y smoke.
- Stability levers: retries in CI, event‑driven waits, deterministic data, route mocks.

Run The Suite
- Local, single project: `npx playwright test --project=chromium-desktop`
- Full regression (matrix): `npm run test:e2e`

Artifacts
- HTML: `reports/ui-e2e/html` (open with `npx playwright show-report`)
- JSON: `reports/ui-e2e/report.json`
- Traces/screenshots/videos retained on failure per config.

Checklist
- Tags applied consistently (`@smoke`, domain tags, optional `@quarantine`).
- Models/fixtures/services enforce clear boundaries and cleanup.
- Env config documented; secrets handled via environment.
- CI uploads artifacts; regression runs on schedule or demand.

Next Steps
- Optional visual snapshots; shard large suites; add dashboards from JSON.
- Expand mocks as new features roll out; keep tests intention‑revealing.

Deliverables
- A production‑style UI E2E framework and a complete educational pathway.

