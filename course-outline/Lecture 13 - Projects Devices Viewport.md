# Lecture 13 – Projects/Devices/Viewport

Estimated runtime: 8–10 minutes

Objective
- Configure a multi-project matrix (desktop + mobile) and understand viewport settings.

Prerequisites
- Lectures 01–12.

Key Concepts
- Device descriptors, project-level `use` overrides, mobile user agent and viewport.

Files
- playwright/config/projects.ts:1
- playwright.config.ts:1

Projects (excerpt)
```ts
// playwright/config/projects.ts
const projects: Project[] = [
  {
    name: 'chromium-desktop',
    use: { ...baseContext, ...devices['Desktop Chrome'], ignoreHTTPSErrors: true },
  },
  {
    name: 'firefox-desktop',
    use: { ...baseContext, ...devices['Desktop Firefox'], ignoreHTTPSErrors: true },
  },
  {
    name: 'webkit-mobile',
    use: {
      ...baseContext,
      ...devices['iPhone 13'],
      viewport: devices['iPhone 13'].viewport,
      isMobile: true,
      userAgent: devices['iPhone 13'].userAgent,
    },
  },
];
```

Runner Config (excerpt)
```ts
// playwright.config.ts
use: {
  baseURL: environment.baseURL,
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  viewport: devices['Desktop Chrome'].viewport,
},
projects: projects[0].name === 'all' ? projects.slice(1) : projects,
```

Commands
- Run Chromium only: `npm run test:e2e:chrome`
- WebKit mobile only: `npx playwright test --project=webkit-mobile`
- Smoke on matrix in CI: see `.github/workflows/ui-e2e.yml` (chromium+webkit).

Validation
- Specs adapt to mobile/desktop in `HomeModel.expectHeroBanner()`; verify different assertions pass per project.

Deliverables
- Comfort running per-project and understanding how device presets affect tests.

