# Lecture 16 – Route Mocking Patterns

Estimated runtime: 10–12 minutes

Objective
- Create robust, typed route mocks for all core endpoints and manage their lifecycle.

Prerequisites
- Lectures 01–15.

Key Concepts
- fulfill vs continue; register/unregister routes; typed payloads.

Files
- playwright/services/apiMocker.ts:1

User/Profile Route (excerpt)
```ts
await this.page.route('**/users/me', async (route, request) => {
  if (request.method() === 'GET') {
    await route.fulfill({ status: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.user) });
    return;
  }
  if (request.method() === 'PATCH') { /* merge and return */ }
  if (request.method() === 'DELETE') { /* success true */ }
  await route.continue();
});
```

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

