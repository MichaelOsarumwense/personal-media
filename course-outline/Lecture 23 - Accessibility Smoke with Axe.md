# Lecture 23 – Accessibility Smoke with Axe

Estimated runtime: 8–10 minutes

Objective
- Add a lightweight accessibility smoke check from scratch to catch obvious issues without destabilizing the suite.

Prerequisites
- Lectures 01–22.

Start State
- You have a smoke login spec.

Outcome
- A short a11y step that runs Axe against the login page and fails only on critical violations.

Why this matters
- Early a11y checks surface regressions with minimal noise and without slowing the suite.

Key Concepts
- Use `@axe-core/playwright`; fail only on critical to keep smoke stable.
- Log a summary of any violations for visibility.

Files
- playwright/tests/smoke/authentication/login.spec.ts

Steps
1) Install Axe helper
   - `npm i -D @axe-core/playwright`
2) Add to login smoke after rendering the page
```ts
const a11y = await new AxeBuilder({ page }).analyze();
const critical = a11y.violations.filter((v) => v.impact === 'critical');
if (a11y.violations.length) {
  console.warn('A11y violations (summary):', a11y.violations.map((v) => ({ id: v.id, impact: v.impact })));
}
expect(critical).toEqual([]);
```

Validation
- Smoke run prints a11y summary; test remains green unless critical issues exist.

Deliverables
- An a11y smoke pattern that scales without overwhelming CI.
