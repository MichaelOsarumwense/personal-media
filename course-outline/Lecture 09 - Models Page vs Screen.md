# Lecture 09 – Models: Page vs Screen

Estimated runtime: 8–10 minutes

Objective
- Choose a modeling style and prepare to apply it to this app for clarity and reuse.

Prerequisites
- Lectures 01–08.

Key Concepts
- Screen/Feature Models over classic Page Objects: fewer files, intent-revealing methods.
- Assertions live in models for key “page ready” checks.

Start State
- No models yet (we create them starting in Lecture 10).

Outcome
- A simple, intention‑revealing model pattern you’ll follow in upcoming lectures.

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
- Create a placeholder model (optional) to practice the pattern:
  - Path: `playwright/models/example.model.ts`
  - Minimal methods: `goto()` and `assertIsLoaded()` with a single visible heading assertion.
  - You’ll formalize `LoginModel` in Lecture 10 and `HomeModel` in Lecture 18.

Validation
- Update a smoke spec to call the new assertion; run `npm run test:e2e:smoke`.

Deliverables
- A clear convention: screen models with goto/assertions and small action methods.
