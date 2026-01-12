# Lecture 06 – Codegen + Selector Strategy

Estimated runtime: 8–10 minutes

Objective
- Craft resilient, readable selectors and use codegen as a helper (not a crutch).

Prerequisites
- Lectures 01–05.

Start State
- You have a basic smoke test from Lecture 03.

Outcome
- A simple selector policy, a few `data-testid` hooks in the app, and a cleaned‑up smoke spec using roles/test ids.

Why this matters
- Stable selectors reduce flake and make tests self‑documenting. Roles are most future‑proof; `data-testid` is a safe fallback for non‑semantic elements.

Steps
1) Add minimal test ids in the app (optional but recommended)
   - Prefer roles first. For elements without good roles/labels, add `data-testid`.
   - Example (conceptual):
     ```jsx
     // Login button
     <button data-testid="login-submit">Login</button>

     // Delete account action
     <button data-testid="delete-account">Delete Account</button>
     ```
   - Note: In React, `data-testid` is the Playwright default. If your app uses a different attribute (e.g., `data-qa`), configure it via `testIdAttribute` in `playwright.config.ts`.

2) Use codegen to explore selectors (don’t copy blindly)
   - Run: `npm run test:e2e:codegen`
   - Click through the app and observe suggested selectors.
   - Replace generated CSS/XPath with roles or test ids in your spec.

3) Update the smoke spec to use roles and test ids
   - Example:
     ```ts
     await expect(page.getByRole('link', { name: 'Private Media' })).toBeVisible();
     await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
     // If you added a test id
     await page.getByTestId('login-submit').click();
     ```

Selector policy (keep it simple)
- Prefer roles (`getByRole`, `getByText`) for accessible UI.
- Use `data-testid` for non‑semantic elements; keep names stable (kebab‑case).
- Avoid brittle CSS/XPath tied to layout.

Tip
- Prefer `data-testid` for stability when roles/IDs aren’t viable; example: `<button data-testid="delete-account">` then `page.getByTestId('delete-account')`.
- After router navigation, assert a page‑unique element before interacting (e.g., `await expect(page.getByTestId('delete-account')).toBeVisible()`).

Validation
- Run `npm run test:e2e:smoke` in chromium; optionally add webkit.
- Selectors should remain stable across engines.

Deliverables
- A clear, lightweight selector strategy applied to your first spec.
