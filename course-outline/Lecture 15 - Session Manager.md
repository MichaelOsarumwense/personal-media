# Lecture 15 – Session Manager

Estimated runtime: 10–12 minutes

Objective
- Build a SessionManager from scratch to stub UI login via route interception and manage per‑test session state.

Prerequisites
- Lectures 01–14.

Start State
- You have env + basic fixtures (Lecture 12/11) with a `testUser` fixture.

Outcome
- A SessionManager class with success/failure stubs and a `session` fixture that auto‑cleans after each test.

Why this matters
- Stubbing login makes tests fast and deterministic. We verify UI behavior without relying on a real auth backend.

Key Concepts
- `page.route('**/users/login', handler)` to fulfill success/failure.
- SessionManager: register/unregister routes; `reset()` clears cookies/permissions.

Files
- playwright/services/sessionManager.ts
- playwright/fixtures/test-fixtures.ts (add session fixture)

Steps
1) Create SessionManager
   - Path: `playwright/services/sessionManager.ts`
   - Contents:
     ```ts
     import type { Page, Route } from '@playwright/test';

     type LoginResponse = { token: string };

     export class SessionManager {
       private interceptors: Array<() => Promise<void>> = [];
       // Allow turning off UI stubs in real runs via env later
       constructor(private readonly page: Page, private readonly enableLoginStubs: boolean = true) {}

       async stubSuccessfulLogin(overrides?: Partial<LoginResponse>): Promise<void> {
         if (!this.enableLoginStubs) return;
         const token = overrides?.token ?? `fake-token-${Date.now().toString(36)}`;
         const handler = async (route: Route) => {
           await route.fulfill({
             status: 200,
             contentType: 'application/json',
             body: JSON.stringify({ token }),
           });
         };
         await this.page.route('**/users/login', handler);
         this.interceptors.push(async () => this.page.unroute('**/users/login', handler));
       }

       async stubFailedLogin(message = 'Username or Password Incorrect'): Promise<void> {
         if (!this.enableLoginStubs) return;
         const handler = async (route: Route) => {
           await route.fulfill({
             status: 401,
             contentType: 'application/json',
             body: JSON.stringify({ error: message }),
           });
         };
         await this.page.route('**/users/login', handler);
         this.interceptors.push(async () => this.page.unroute('**/users/login', handler));
       }

       async reset(): Promise<void> {
         await Promise.all(this.interceptors.map((fn) => fn()));
         this.interceptors = [];
         await this.page.context().clearCookies();
         await this.page.context().clearPermissions();
       }
     }
     ```

2) Add a `session` fixture
   - Path: `playwright/fixtures/test-fixtures.ts` (extend from Lecture 11)
   - Add:
     ```ts
     import { SessionManager } from '../services/sessionManager';

     export const test = base.extend({
       session: async ({ page }, use) => {
         const sessionManager = new SessionManager(page, process.env.UI_E2E_STUB_LOGIN !== 'false');
         await use(sessionManager);
         await sessionManager.reset();
       },
     });
     ```

3) Use it in a spec
   - In your login smoke: call `await session.stubSuccessfulLogin()` before entering credentials.

Validate
- Run: `npm run test:e2e:smoke` and verify the app redirects to home with a fake token.

Instructor notes
- Keep failure copy identical to backend/UI: "Username or Password Incorrect".
- In real/hybrid runs, set `UI_E2E_STUB_LOGIN=false` to disable the UI stub.

Deliverables
- A working SessionManager and `session` fixture for fast, reliable auth flows.
