# Lecture 14 – Tagging, Retries, Timeouts, Workers

Estimated runtime: 8–10 minutes

Objective
- Stabilize execution with a clear tagging policy, retries, timeouts, and workers.

Prerequisites
- Lectures 01–13.

Key Concepts
- Tags: `@smoke`, `@regression`, `@auth`, `@posts`, `@profile`, `@avatar`, `@downloads`, `@quarantine`.
- Retries: on in CI only (avoid hiding flakes locally).
- Timeouts: suite/test/expect levels.
- Workers: parallel where safe.

Config (excerpt)
```ts
// playwright.config.ts
fullyParallel: true,
timeout: 45_000,
expect: { timeout: 5_000 },
forbidOnly: isCI,
retries: isCI ? 2 : 0,
workers: isCI ? undefined : 4,
```

Spec Tagging
```ts
test('allows a user to login via the UI flow @smoke', async (...) => { /* ... */ });
```

Filter By Tag
- Smoke only: `npx playwright test --grep @smoke`
- Exclude quarantine: `npx playwright test --grep-invert @quarantine`

Validation
- Smoke runs fast and consistently; failing specs are not retried locally.

Deliverables
- A tagging guide and confidence configuring retries/timeouts/workers.

