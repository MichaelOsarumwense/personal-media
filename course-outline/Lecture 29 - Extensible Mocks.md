# Lecture 29 – Extensible Mocks

Estimated runtime: 10–12 minutes

Objective
- Safely extend route mocks when new endpoints are introduced, without destabilizing existing tests.

Prerequisites
- Lectures 01–28.

Key Concepts
- Centralized registration; dispose on teardown; typed payload/response shapes.

Files
- playwright/services/apiMocker.ts:1

Pattern
```ts
type ResponseConfig = { status: number; body?: Record<string, unknown> };
// 1) Add defaults
const defaultSomething: ResponseConfig = { status: 200, body: { ok: true } };
// 2) Add state to ApiMocker
private somethingResponse: ResponseConfig = defaultSomething;
// 3) Add a config method
async configureSomething(response: Partial<ResponseConfig> = {}): Promise<void> { this.somethingResponse = { ...this.somethingResponse, ...response }; /* register route if needed */ }
// 4) Register route once and fulfill based on method
await this.registerRoute('**/new-endpoint', async (route, request) => {
  if (request.method() === 'GET') {
    await route.fulfill({ status: this.somethingResponse.status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.somethingResponse.body ?? {}) });
  } else { await route.continue(); }
});
```

Spec Usage
```ts
await apiMock.configureSomething({ status: 500, body: { error: 'Boom' } });
// exercise UI and assert error toast
```

Validation
- Existing routes continue to work; new mocks can be tuned per test.

Deliverables
- A repeatable pattern for evolving test doubles with minimal churn.

