# Lecture 24 – Reliability: Waits & Flake Triage

Estimated runtime: 10–12 minutes

Objective
- Engineer robust waits and a repeatable flake‑triage workflow.

Prerequisites
- Lectures 01–23.

Key Concepts
- Never use fixed sleeps; prefer event‑driven waits.
- Use Promise.all(click, waitForResponse) for network actions.
- Prefer expect‑based URL/UI waits over polling the DOM.
- Add clear test.step boundaries for faster trace reading.

Files
- playwright/tests/regression/posts/posts-crud.spec.ts:1
- playwright/tests/smoke/authentication/login.spec.ts:1

Network Wait Pattern
```ts
await Promise.all([
  page.waitForResponse((r) => r.url().includes('/posts') && r.request().method() === 'POST'),
  page.click('#submitPost'),
]);
```

URL Wait Pattern
```ts
await test.step('wait for redirect to home', async () => {
  await page.waitForURL('**/', { waitUntil: 'domcontentloaded' });
});
```

Anti‑Patterns (avoid)
- `await page.waitForTimeout(2000)` – replace with event/URL/locator waits.
- Chaining DOM queries hoping for stability; use a single locator with expect.

Useful Diagnostics
- Add step boundaries around critical phases.
- Capture console logs only when needed (trace often suffices).

Minimal Console Tap (optional)
```ts
page.on('console', (msg) => {
  if (['error'].includes(msg.type())) console.warn('[console]', msg.text());
});
```

Validation
- Flaky actions (create/edit/delete) become stable with response waits.
- Traces show clear phase boundaries and minimal noise.

Deliverables
- A reliability checklist implemented across your specs.

