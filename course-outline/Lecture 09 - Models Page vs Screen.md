# Lecture 09 – Models: Page vs Screen

Estimated runtime: 8–10 minutes

Objective
- Choose a modeling style and apply it to this app for clarity and reuse.

Prerequisites
- Lectures 01–08.

Key Concepts
- Screen/Feature Models over classic Page Objects: fewer files, intent-revealing methods.
- Assertions live in models for key “page ready” checks.

Existing Models
- playwright/models/login.model.ts:1 – goto(), login(), assertIsLoaded()
- playwright/models/home.model.ts:1 – expectHeroBanner(), expectFooter()

Pattern
```ts
// Keep methods small and intention-revealing
class ExampleModel {
  constructor(private readonly page: Page) {}
  async goto(): Promise<void> { await this.page.goto('/path'); await this.assertIsLoaded(); }
  async assertIsLoaded(): Promise<void> { await expect(this.page.getByRole('heading', { name: /title/i })).toBeVisible(); }
}
```

Exercise
- Add a new method to `HomeModel`, e.g. `expectAvatarLoaded()` that asserts `#profileImg` has a blob: or default src.

Validation
- Update a smoke spec to call the new assertion; run `npm run test:e2e:smoke`.

Deliverables
- A clear convention: screen models with goto/assertions and small action methods.

