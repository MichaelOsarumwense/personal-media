# Playwright UI E2E Course (Personal Media)

This course builds a production‑style Playwright + TypeScript UI end‑to‑end framework against the Personal Media app, while teaching concepts progressively from beginner to near‑advanced.

Repo approach:

- SUT: personal-media (this repository)
- 30 short lectures (5–12 minutes each)
- Framework quality: models, fixtures, API client, route mocking, envs, CI, artifacts
- Delivery: incremental commits and tags per lecture on a dedicated course branch

Incremental delivery plan (to execute manually or via your preferred tooling):

1) Create a long‑lived branch for the course
   - `git checkout -b course`
2) After each lecture’s implementation, commit and tag
   - `git add -A && git commit -m "Lecture 01 – Course + App Tour"`
   - `git tag -a lecture-01 -m "Lecture 01 end state"`
3) Repeat for lectures 02 … 30 (`lecture-02`, …, `lecture-30`)

Lecture index:

- Lecture 01 – Course + App Tour
- Lecture 02 – Node/TS/Playwright Setup
- Lecture 03 – First Test + Runner Basics
- Lecture 04 – Assertions Deep Dive
- Lecture 05 – Debugging, Trace, Screenshots, Video
- Lecture 06 – Codegen + Selector Strategy
- Lecture 07 – Organizing Tests + test.step
- Lecture 08 – TypeScript Essentials for Tests
- Lecture 09 – Models: Page vs Screen
- Lecture 10 – Build Login Model
- Lecture 11 – Custom Fixtures 1
- Lecture 12 – Environments + .env
- Lecture 13 – Projects/Devices/Viewport
- Lecture 14 – Tagging, Retries, Timeouts, Workers
- Lecture 15 – Session Manager
- Lecture 16 – Route Mocking Patterns
- Lecture 17 – APIRequestContext + ApiClient
- Lecture 18 – Home Model + Common Asserts
- Lecture 19 – Deterministic Test Data
- Lecture 20 – Posts CRUD Journey
- Lecture 21 – File Upload + Download
- Lecture 22 – Avatar Binary Handling
- Lecture 23 – Accessibility Smoke with Axe
- Lecture 24 – Reliability: Waits & Flake Triage
- Lecture 25 – Isolation & Teardown
- Lecture 26 – CI with GitHub Actions
- Lecture 27 – Regression Job + PR Gates
- Lecture 28 – Reports (HTML/JSON) + Trace Triage
- Lecture 29 – Extensible Mocks
- Lecture 30 – Capstone: Full Suite Build & Review

Each lecture file in this folder contains:

- Objective & prerequisites
- Key concepts
- Step‑by‑step tasks (with file paths and commands)
- Validation (what to observe in UI and trace)
- Deliverables & optional homework

Execution Modes & Scripts

- Mocked (UI-only, fast, deterministic)
  - `npm run test:e2e` (Chromium)
  - `npm run test:e2e:smoke` (Chromium, @smoke only)
  - `npm run test:e2e:mocked` / `:mocked:smoke` (explicit)
  - `npm run test:e2e:mocked:all` (all configured browsers)
- Real (full integration against your API)
  - `npm run test:e2e:real` or `:real:smoke`
  - Requires `UI_E2E_BASE_URL` (and `UI_E2E_API_BASE_URL` for fixture API calls)
  - Auto-creates a user per run and deletes it on teardown
- Hybrid (real API, UI login stubbed)
  - `npm run test:e2e:hybrid` or `:hybrid:smoke`

Toggles (env)

- `UI_E2E_USE_MOCKS=true|false` (default true) — enable/disable ApiMocker
- `UI_E2E_STUB_LOGIN=true|false` (default true) — enable/disable UI login route stubs

Parity policy
- Mocked responses mirror real API contract and UI copy exactly. Example: invalid login → `Username or Password Incorrect` (not a generic message). This keeps assertions identical across mocked and real runs.

Prerequisites (quick)
- Install deps and browsers: `npm ci` then `npm run test:e2e:install`.
- For real/hybrid runs, set `UI_E2E_BASE_URL` (and `UI_E2E_API_BASE_URL` if fixtures call the API).
- Ensure `playwright/assets/01.png` exists for avatar tests. On macOS, if Chromium won’t launch due to OS security, allow the Playwright browser binary in System Settings or run outside restricted sandboxes.
