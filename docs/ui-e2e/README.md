# UI E2E Automation Blueprint

This repository now ships with a Playwright-based UI end-to-end framework designed for large scale product companies. The stack is opinionated to keep reliability and developer experience high while remaining extensible for future growth.

## Directory Layout

```
playwright/
├── config/         # Environment resolution, project metadata
├── fixtures/       # Custom Playwright fixtures that model platform state
├── models/         # Screen/feature models encapsulating UI interactions
├── services/       # Gateways to APIs and backdoor helpers
├── tests/          # Specs organised by domain and execution tier
├── utils/          # Deterministic data builders and shared helpers
└── snapshots/      # (optional) Visual baseline assets
reports/ui-e2e/     # Test artifacts (trace, screenshots, reports)
playwright.config.ts
tsconfig.playwright.json
```

Key concepts:

- **Layered design** so UI specs read like user journeys while fixtures/services handle state orchestration.
- **Deterministic environments** by default: tests load `.env` (override with `UI_E2E_DOTENV`) and resolve URLs + credentials per target environment.
- **Trace-first failure analysis** with HTML + JSON reporters and saved artifacts per run. Hook these into Datadog/Grafana later by consuming the JSON payload.

## Scenario Suite

- `tests/smoke/authentication/login.spec.ts` – login happy path plus invalid credential guardrail.
- `tests/regression/authentication/registration.spec.ts` – full sign-up flow.
- `tests/regression/authentication/reset-password.spec.ts` – password recovery confirmation.
- `tests/regression/posts/posts-crud.spec.ts` – create, edit, delete timeline entries.
- `tests/regression/profile/profile-management.spec.ts` – profile update, avatar upload/download lifecycle, and account removal.
- `tests/regression/media/download.spec.ts` – PDF download handshake and navigation fallback.

## Commands

Run the most common workflows at the repository root:

- `npm run test:e2e` – full regression across all configured projects.
- `npm run test:e2e:smoke` – targeted execution for specs tagged with `@smoke`; ideal for PR gating.
- `npm run test:e2e:debug` – headed mode with live inspector.
- `npm run test:e2e:trace` – view a saved trace (`--trace on` or `retain-on-failure`).
- `npm run test:e2e:codegen` – open the Playwright codegen recorder.
- `npm run test:e2e:install` – install/update browsers (pin in CI bootstrap).

Tag tests by appending `@smoke`, `@canary`, etc. to their title—CI matrix jobs can use `--grep` to focus on tags.

Local commits automatically execute `npx playwright test --project=chromium-desktop`; set `HUSKY=0` when you need to bypass temporarily (e.g., WIP spikes).

## Environment Management

| Variable | Purpose | Default |
| --- | --- | --- |
| `UI_E2E_ENV` | Target environment (`local`, `staging`, `production`) | `local` |
| `UI_E2E_BASE_URL` | UI origin for local runs | `http://localhost:3000` |
| `UI_E2E_API_BASE_URL` | API origin for bootstrap calls | Follows `UI_E2E_BASE_URL` |
| `UI_E2E_USER_EMAIL` / `UI_E2E_USER_PASSWORD` | Default credentials | `qa.user@example.com` / `super-secret-password` |
| `UI_E2E_DOTENV` | Alternate dotenv file path | `.env` |
| `UI_E2E_RUN_ID` | Inject custom run identifier | ISO timestamp |

Additional per-environment overrides exist (e.g. `UI_E2E_STAGING_BASE_URL`). Populate these securely through your secrets manager rather than committing credentials.

## Adding A New Journey

1. **Model** – add interaction logic under `playwright/models/`. Keep methods short and intention revealing.
2. **Service/fixture** – create helpers under `playwright/services/` or `playwright/fixtures/` for state prep (API seeding, feature flags, etc.). The shared `ApiMocker` centralises `/users` and `/posts` mocks—extend it when new endpoints appear so specs stay declarative.
3. **Spec** – place the spec inside `playwright/tests/<tier>/<domain>/`. Default tiering: `smoke`, `regression`, `canary`.
4. **Telemetry** – ensure new specs produce clear `test.step` boundaries so traces remain readable. Add dashboards/alerts as needed.

Before opening a PR ensure:

- `npm run test:e2e:smoke` passes locally.
- You link traces or videos when reporting flaky behaviour.
- Documentation is updated if fixtures or environment contracts change.

## CI Suggestions

CI engines should:

1. Run `npm ci` → `npm run test:e2e:install` to guarantee browser parity.
2. Matrix across Playwright projects (desktop/mobile) and tags.
3. Persist `reports/ui-e2e` as artifacts and surface the HTML report + trace viewer links to pull requests.
4. Quarantine flakes by moving them to a nightly job and filing tickets automatically.

This skeleton is intentionally modular—extend services for stateful data setup, bolt on visual regression (e.g. Playwright snapshots) by wiring `snapshotDir`, or integrate analytics by consuming the JSON reporter output.
