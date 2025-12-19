# Lecture 26 – CI with GitHub Actions

Estimated runtime: 10–12 minutes

Objective
- Run Playwright smoke tests in GitHub Actions across a small matrix and upload artifacts.

Prerequisites
- Lectures 01–25.

Key Concepts
- Node setup, Playwright browsers install, app boot, wait-on, artifact upload.

Files
- .github/workflows/ui-e2e.yml:1

Workflow (high level)
```yaml
strategy:
  matrix: { project: [chromium-desktop, webkit-mobile] }
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with: { node-version: 20.11.1, cache: npm }
  - run: npm ci
  - run: npm run test:e2e:install
  - name: Run mocked smoke (no app needed)
    run: npm run test:e2e:mocked:smoke -- --project=${{ matrix.project }}
  - uses: actions/upload-artifact@v4
    if: always()
    with:
      name: ui-e2e-${{ matrix.project }}
      path: |
        reports/ui-e2e
        playwright-report
```

Validation
- PRs show smoke results and attached HTML reports and traces.

Variants
- Real smoke against staging:
  - Set `UI_E2E_BASE_URL` (and optionally `UI_E2E_API_BASE_URL`) in job env.
  - Run `npm run test:e2e:real:smoke -- --project=${{ matrix.project }}`

Deliverables
- A CI job you can extend with more projects or tags later.
