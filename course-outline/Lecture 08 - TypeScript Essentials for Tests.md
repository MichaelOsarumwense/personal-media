# Lecture 08 – TypeScript Essentials for Tests

Estimated runtime: 10–12 minutes

Objective
- Adopt TypeScript patterns that make your Playwright tests safe and maintainable.
- Reuse types across fixtures, services, and models.

Prerequisites
- Lectures 01–07.

Key Concepts
- Strong typing for environment config, credentials, fixtures, and data builders.
- Strict TypeScript config for early feedback.

Files To Open
- tsconfig.playwright.json:1
- playwright/config/env.ts:1
- playwright/fixtures/test-fixtures.ts:1
- playwright/services/apiMocker.ts:1
- playwright/utils/testData.ts:1

Strict TS Setup
- In this repo, `tsconfig.playwright.json` already uses `"strict": true` and `"types": ["@playwright/test"]` so Playwright types are in scope.

Typed Environment Config (excerpt)
```ts
// playwright/config/env.ts
export type TargetEnv = 'local' | 'staging' | 'production';
export type IdentityCredentials = { email: string; password: string };
export type EnvironmentConfig = {
  name: TargetEnv;
  baseURL: string;
  apiBaseURL: string;
  credentials: { primary: IdentityCredentials };
};
```

Typed Fixtures (excerpt)
```ts
// playwright/fixtures/test-fixtures.ts
type AppFixtures = {
  session: SessionManager;
  testUser: IdentityCredentials;
  runId: string;
  isCI: boolean;
  apiMock: ApiMocker;
};
export const test = base.extend<AppFixtures>({ /* ... */ });
```

Typed Data Builders (excerpt)
```ts
// playwright/utils/testData.ts
export const buildCredentials = (overrides?: Partial<{ email: string; password: string }>) => ({
  email: overrides?.email ?? faker.internet.email({ provider: 'example.com' }),
  password: overrides?.password ?? faker.internet.password({ length: 12 }),
});
```

Exercise (no code changes needed)
- Add a lightweight type to a model method signature locally and observe editor help/autocomplete.
- Example: make a `login(credentials: LoginFields)` method accept a typed object.

Validation
- `npm run test:e2e:smoke` runs cleanly; your editor surfaces type errors inline if you break shapes.

Deliverables
- Comfort reading and extending types in env, fixtures, services, and models.

