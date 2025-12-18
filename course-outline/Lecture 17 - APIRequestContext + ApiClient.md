# Lecture 17 – APIRequestContext + ApiClient

Estimated runtime: 10–12 minutes

Objective
- Use Playwright's `APIRequestContext` via a typed ApiClient to seed state or validate APIs in hybrid tests.

Prerequisites
- Lectures 01–16.

Key Concepts
- Stateless HTTP calls with `request` fixture; strong typing for responses.
- Centralized error handling; JSON vs text fallback parsing.

Files
- playwright/services/apiClient.ts:1
- playwright/config/env.ts:1
- playwright/fixtures/test-fixtures.ts:1

ApiClient (excerpt)
```ts
export class ApiClient {
  constructor(private readonly request: APIRequestContext, private readonly baseUrl: string) {}

  async post<T>(path: string, payload: unknown, headers: Record<string, string> = {}): Promise<T> {
    const response = await this.request.post(this.resolve(path), {
      data: payload,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers },
    });
    return this.parseResponse<T>(response);
  }

  async delete<T>(path: string, headers: Record<string, string> = {}): Promise<T> {
    const response = await this.request.delete(this.resolve(path), { headers: { Accept: 'application/json', ...headers } });
    return this.parseResponse<T>(response);
  }
}
```

Environment (excerpt)
```ts
export type EnvironmentConfig = {
  name: TargetEnv;
  baseURL: string;
  apiBaseURL: string;
  credentials: { primary: IdentityCredentials };
};
```

Fixture Usage (SessionManager excerpt)
```ts
export class SessionManager {
  private readonly apiClient: ApiClient;
  constructor(private readonly page: Page, private readonly request: APIRequestContext) {
    this.apiClient = new ApiClient(request, environment.apiBaseURL);
  }
  async loginViaApi(credentials: { email: string; password: string }) {
    return this.apiClient.post<{ token: string }>('users/login', credentials);
  }
}
```

Practical Patterns
- Hybrid setup: create/seed entities with ApiClient, then navigate UI to validate behavior.
- Auth: hit `users/login` to obtain a token for downstream API calls (or to pre-prime storage if needed).

Validation
- Add a temporary spec step that calls `session.loginViaApi(testUser)` and asserts a token is returned.
- Run: `npx playwright test --project=chromium-desktop --grep @smoke`

Deliverables
- Comfort seeding and validating scenarios through API while keeping UI tests focused on user flows.

