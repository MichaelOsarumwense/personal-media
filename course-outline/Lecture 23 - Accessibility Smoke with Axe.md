# Lecture 23 – Accessibility Smoke with Axe

Estimated runtime: 8–10 minutes

Objective
- Add a lightweight accessibility smoke check to catch obvious issues without destabilizing the suite.

Prerequisites
- Lectures 01–22.

Key Concepts
- Use `@axe-core/playwright`; fail only on critical to keep smoke stable.
- Log a summary of any violations for visibility.

Files
- playwright/tests/smoke/authentication/login.spec.ts:1

Snippet (login smoke excerpt)
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

