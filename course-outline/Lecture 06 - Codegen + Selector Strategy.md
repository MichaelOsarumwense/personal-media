# Lecture 06 – Codegen + Selector Strategy

Estimated runtime: 8–10 minutes

Objective
- Learn to craft resilient, readable selectors; use codegen as a helper, not a crutch.

Prerequisites
- Lectures 01–05.

Key Concepts
- Prefer roles (`getByRole`, `getByText`) and stable IDs.
- Use `data-testid` sparingly when roles aren’t reliable.
- Avoid brittle CSS/XPath tied to layout.

Codegen
- Start recorder: `npm run test:e2e:codegen`
- Clean up generated selectors: convert to roles or IDs.

Examples
```ts
// Good: role with accessible name
page.getByRole('button', { name: 'Login' })

// Acceptable: explicit ID where semantic role isn’t present
page.locator('#submitPost')

// Consider adding a test id when necessary
page.getByTestId('profile-update')
```

Validation
- Run specs in chromium + webkit; selectors should hold across engines.

Deliverables
- A short locator policy for the repo and examples applied in models.

