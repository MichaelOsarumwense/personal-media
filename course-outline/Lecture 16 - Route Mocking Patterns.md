# Lecture 16 – Route Mocking Patterns

Estimated runtime: 10–12 minutes

Objective
- Build an ApiMocker from scratch to fulfill core endpoints (profile, posts, avatar) deterministically.

Prerequisites
- Lectures 01–15.

Start State
- You have env + fixtures + SessionManager (Lectures 12, 11, 15).

Outcome
- A reusable ApiMocker with register/unregister lifecycle, typed payloads, and deterministic responses.

Why this matters
- Mocks make UI tests fast and stable while preserving contract parity with the backend.

Key Concepts
- fulfill vs continue; register/unregister routes; typed payloads; binary responses for avatar.

Files
- playwright/services/apiMocker.ts
- playwright/fixtures/test-fixtures.ts (add apiMock fixture)

Steps
1) Create ApiMocker
   - Path: `playwright/services/apiMocker.ts`
   - Contents (simplified):
     ```ts
     import type { Page, Route, Request } from '@playwright/test';

     type User = { name: string; address: string; dob: string; hobbies: string; events: string };
     type Post = { id: string; owner: string; description: string };

     export class ApiMocker {
       private disposers: Array<() => Promise<void>> = [];
       constructor(private readonly page: Page, private readonly enabled = true) {}

       async primeUserProfile(user: User): Promise<void> {
         if (!this.enabled) return;
         const handler = async (route: Route, request: Request) => {
           const m = request.method();
           if (m === 'GET') return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(user) });
           if (m === 'PATCH') return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(user) });
           if (m === 'DELETE') return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
           return route.continue();
         };
         await this.page.route('**/users/me', handler);
         this.disposers.push(async () => this.page.unroute('**/users/me', handler));
       }

       async primePosts(posts: Post[]): Promise<void> {
         if (!this.enabled) return;
         const byId = Object.fromEntries(posts.map((p) => [p.id, p]));
         const postsHandler = async (route: Route, request: Request) => {
           const m = request.method();
           if (m === 'GET') return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(byId) });
           if (m === 'POST') {
             const id = `post-${Date.now().toString(36)}`;
             const created = { id, owner: posts[0]?.owner || 'User', description: 'New post' };
             return route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(created) });
           }
           return route.continue();
         };
         await this.page.route('**/posts', postsHandler);
         this.disposers.push(async () => this.page.unroute('**/posts', postsHandler));
       }

       async primeAvatar(): Promise<void> {
         if (!this.enabled) return;
         let hasAvatar = true;
         const handler = async (route: Route, request: Request) => {
           const m = request.method();
           if (m === 'GET') {
             if (!hasAvatar) return route.fulfill({ status: 404 });
             const png = Buffer.from([137,80,78,71]); // placeholder PNG signature
             return route.fulfill({ status: 200, body: png, headers: { 'Content-Type': 'image/png' } });
           }
           if (m === 'POST') { hasAvatar = true; return route.fulfill({ status: 200 }); }
           if (m === 'DELETE') { hasAvatar = false; return route.fulfill({ status: 200 }); }
           return route.continue();
         };
         await this.page.route('**/users/me/avatar', handler);
         this.disposers.push(async () => this.page.unroute('**/users/me/avatar', handler));
       }

       async dispose(): Promise<void> {
         await Promise.all(this.disposers.map((fn) => fn()));
         this.disposers = [];
       }
     }
     ```

2) Add `apiMock` fixture
   - In `playwright/fixtures/test-fixtures.ts`:
     ```ts
     import { ApiMocker } from '../services/apiMocker';
     export const test = base.extend({
       apiMock: async ({ page }, use) => {
         const mocker = new ApiMocker(page, process.env.UI_E2E_USE_MOCKS !== 'false');
         await use(mocker);
         await mocker.dispose();
       },
     });
     ```

3) Instructor notes
   - Keep mocked copy and shapes identical to real API; this allows reusing assertions in real mode.
   - Always unregister routes in `dispose()` to avoid cross‑test leakage.

Posts Routes (excerpt)
```ts
// GET /posts returns an object keyed by id
await route.fulfill({ status: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.postsAsObject()) });
// POST /posts creates a deterministic id and returns the record
```

Avatar Route (binary)
```ts
await this.page.route('**/users/me/avatar', async (route, request) => {
  if (request.method() === 'GET') { /* 200 with PNG body or 404 */ }
  if (request.method() === 'POST') { /* toggle content to simulate update */ }
  if (request.method() === 'DELETE') { /* set to null */ }
});
```

Cleanup
- Store unroute disposers and run them in `dispose()` after each test.

Validation
- Run smoke/regression with mocks only; flows are fast and deterministic.

Deliverables
- ApiMocker patterns you can extend as endpoints grow.
