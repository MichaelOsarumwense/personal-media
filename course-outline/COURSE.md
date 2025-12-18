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

