# Lecture 17 – APIRequestContext + ApiClient

Estimated runtime: 10–12 minutes

Objective
- Build a minimal typed ApiClient using Playwright's `APIRequestContext` and integrate it with fixtures/services.

Prerequisites
- Lectures 01–16.

Start State
- Env resolver exists (Lecture 12); fixtures exist (Lecture 11); SessionManager in place (Lecture 15).

Outcome
- A small ApiClient class with typed helpers for POST/GET/DELETE and simple error handling, wired to tests via fixtures/services.

Why this matters
- When running hybrid/real tests, you can seed state or validate APIs without leaving Playwright.

Key Concepts
- Stateless HTTP calls with `request` fixture; strong typing for responses.
- Centralized error handling; JSON vs text fallback parsing.

Files
- playwright/services/apiClient.ts
- playwright/config/env.ts
- playwright/fixtures/test-fixtures.ts

Steps
1) Create ApiClient
   - Path: `playwright/services/apiClient.ts`
   - Contents (minimal):
     ```ts
     import type { APIRequestContext, APIResponse } from '@playwright/test';

     export class ApiClient {
       constructor(private readonly request: APIRequestContext, private readonly baseUrl: string) {}

       private resolve(path: string): string {
         return `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
       }

       private async parse<T>(response: APIResponse): Promise<T> {
         const ok = response.ok();
         const contentType = response.headers()['content-type'] || '';
         const isJson = contentType.includes('application/json');
         const body = isJson ? await response.json() : await response.text();
         if (!ok) throw new Error(typeof body === 'string' ? body : JSON.stringify(body));
         return body as T;
       }

       async get<T>(path: string, headers: Record<string, string> = {}): Promise<T> {
         const res = await this.request.get(this.resolve(path), { headers: { Accept: 'application/json', ...headers } });
         return this.parse<T>(res);
       }

       async post<T>(path: string, payload: unknown, headers: Record<string, string> = {}): Promise<T> {
         const res = await this.request.post(this.resolve(path), { data: payload, headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers } });
         return this.parse<T>(res);
       }

       async delete<T>(path: string, headers: Record<string, string> = {}): Promise<T> {
         const res = await this.request.delete(this.resolve(path), { headers: { Accept: 'application/json', ...headers } });
         return this.parse<T>(res);
       }
     }
     ```

2) Wire into fixtures/services (example: SessionManager)
   - Inject ApiClient with `environment.apiBaseURL` and expose helpers like `loginViaApi`.

3) Instructor notes
   - Keep ApiClient small and stateless; tests should not depend on client state.
   - Use it to seed data in real/hybrid modes while UI validates user flows.

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
- Add a temporary step calling `session.loginViaApi(testUser)` and assert a token is returned.
- Run: `npx playwright test --project=chromium-desktop --grep @smoke`

Deliverables
- Comfort seeding and validating scenarios through API while keeping UI tests focused on user flows.
