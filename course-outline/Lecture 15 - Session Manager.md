# Lecture 15 – Session Manager

Estimated runtime: 10–12 minutes

Objective
- Stub UI login via route interception and provide a helper to manage test session state.

Prerequisites
- Lectures 01–14.

Key Concepts
- `page.route('**/users/login', handler)` to fulfill success/failure.
- SessionManager: install/uninstall routes; reset cleans cookies/permissions.

Files
- playwright/services/sessionManager.ts:1

Success Stub (excerpt)
```ts
await this.page.route('**/users/login', async (route) => {
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ token }) });
});
```

Failure Stub (excerpt)
```ts
await this.page.route('**/users/login', async (route) => {
  await route.fulfill({
    status: 401,
    contentType: 'application/json',
    body: JSON.stringify({ error: 'Username or Password Incorrect' }),
  });
});
```

Reset
```ts
await this.page.context().clearCookies();
await this.page.context().clearPermissions();
```

Spec Usage
```ts
await session.stubSuccessfulLogin();
await login.goto();
await login.login(testUser);
```

Validation
- UI login completes with a fake token; app redirects to home.

Notes
- Parity policy: mocked failure copy must match the real backend/UI exactly ("Username or Password Incorrect").
- Toggle UI login stubs via `UI_E2E_STUB_LOGIN=true|false` (default true). In real runs set to false.

Deliverables
- Confidence using route stubs for targeted flows.
