# Lecture 04 – Assertions Deep Dive

Estimated runtime: 8–10 minutes

Objective
- Master Playwright’s core assertions for stable, readable checks.

Prerequisites
- Lectures 01–03.

Key Concepts
- toBeVisible, toHaveText, toHaveURL, toHaveAttribute, soft assertions.

Files
- playwright/models/login.model.ts:1
- playwright/models/home.model.ts:1

Examples
```ts
// login.model.ts – asserting the page is ready
await expect(this.page.getByRole('link', { name: 'Private Media' })).toBeVisible();
await expect(this.page.locator('#email')).toBeVisible();
await expect(this.page.locator('#password')).toBeVisible();

// After login, assert URL and key UI landmarks
await expect(this.page).toHaveURL(/\/$/);
```

```ts
// home.model.ts – responsive assertions and attributes
await expect(this.page.getByText('Private Media').first()).toBeVisible();

// Avatar should either be a blob: URL (custom) or default asset
const avatar = this.page.locator('#profileImg');
await expect(avatar).toHaveAttribute('src', /^(blob:|.*default-avatar.*)$/);
```

Soft Assertions (advanced):
```ts
// Useful when continuing after non-critical checks
await expect.soft(this.page.getByText('Stories').first()).toBeVisible();
```

Validation
- Run a smoke test and open the trace; assertions highlight target nodes.

Deliverables
- A short list of preferred assertions and when to use them.

