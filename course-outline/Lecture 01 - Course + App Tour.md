# Lecture 01 – Course + App Tour

Estimated runtime: 6–8 minutes

Objective
- Understand the app under test (routes, flows) and course goals.
- Know where Playwright lives and how tests are organized.

Prerequisites
- Node 20+, npm 10+, Git installed.

Key Journeys (SUT)
- Auth: register → login → protected home.
- Timeline: fetch posts; create/edit/delete a post.
- Profile: update details; delete account.
- Avatar: upload, download, remove (falls back to default).
- Downloads: static PDF.

Protected Route Concept
- The app uses a token in `localStorage` to gate protected routes.

Snippet (for reference): src/components/protectedRoute/protectedRoute.js:5
```js
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem('access_token');
  return (
    <Route
      {...restOfProps}
      render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
}
```

Repo Layout (high level)
- App code: `src/` (pages, components, utils)
- E2E framework: `playwright/` (config, fixtures, models, services, tests)
- Course materials: `course-outline/`
- CI: `.github/workflows/ui-e2e.yml`

Playwright Layout
- `playwright/config/` – env + projects
- `playwright/fixtures/` – custom fixtures (session, apiMock)
- `playwright/models/` – screen models (Login, Home)
- `playwright/services/` – `ApiClient`, `SessionManager`, `ApiMocker`
- `playwright/tests/` – smoke + regression suites
- Root: `playwright.config.ts`

Run The App (local)
1) Install deps: `npm ci`
2) Install browsers: `npm run test:e2e:install`
3) Start app: `npm start` (opens `http://localhost:3000`)

Run A Quick E2E Smoke
- With the app running: `npm run test:e2e:smoke -- --project=chromium-desktop`

Validation
- Visiting `http://localhost:3000/login` shows the login page.
- Running the smoke suite executes at least the login happy path.

Deliverables
- Notes on key journeys and where they map in the repo.

