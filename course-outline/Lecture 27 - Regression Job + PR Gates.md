# Lecture 27 – Regression Job + PR Gates

Estimated runtime: 10–12 minutes

Objective
- Add a regression job, quarantine tag handling, and PR gates for quality.

Prerequisites
- Lectures 01–26.

Key Concepts
- Two tiers: smoke on PR, full regression on demand or schedule.
- Quarantine tag excluded from required checks.
- Optional sharding or matrix expansion.

Suggested Additions (workflow)
- Job `regression`: `npm run test:e2e -- --grep-invert @quarantine`
- Trigger: manual (`workflow_dispatch`) and nightly (`schedule` cron).
- Upload artifacts; optionally parse JSON reporter into summary.

PR Gates
- Require `smoke` job to pass on `main` PRs.
- Allow `regression` to run post-merge or on demand to avoid long PR cycle time.

Validation
- A PR with a failing smoke test is blocked; regression artifacts are available for deeper triage when run.

Deliverables
- A pragmatic CI structure: fast PR feedback + deeper coverage on schedule.

