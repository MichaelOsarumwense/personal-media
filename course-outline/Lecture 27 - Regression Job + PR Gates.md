# Lecture 27 – Regression Job + PR Gates

Estimated runtime: 10–12 minutes

Objective
- Extend CI with a regression job, quarantine tag handling, and PR gates.

Prerequisites
- Lectures 01–26.

Start State
- Smoke workflow exists (Lecture 26).

Outcome
- A regression job (manual/nightly) and PR gates requiring smoke. Quarantine tags are excluded from blocking checks.

Key Concepts
- Two tiers: smoke on PR, full regression on demand or schedule.
- Quarantine tag excluded from required checks.
- Optional sharding or matrix expansion.

Steps
1) Add regression job to the workflow
   - Example job:
     ```yaml
     regression:
       if: github.event_name != 'pull_request'
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20.11.1, cache: npm }
         - run: npm ci
         - run: npm run test:e2e:install
         - run: npm run test:e2e -- --grep-invert @quarantine
         - uses: actions/upload-artifact@v4
           if: always()
           with:
             name: ui-e2e-regression
             path: |
               reports/ui-e2e
               playwright-report
     ```
2) Add triggers
   - Add `workflow_dispatch` and a nightly `schedule` to kick off regression.

PR Gates
- Require `smoke` job to pass on `main` PRs.
- Allow `regression` to run post-merge or on demand to avoid long PR cycle time.

Validation
- A PR with a failing smoke test is blocked; regression artifacts are available for deeper triage when run.

Deliverables
- A pragmatic CI structure: fast PR feedback + deeper coverage on schedule.
