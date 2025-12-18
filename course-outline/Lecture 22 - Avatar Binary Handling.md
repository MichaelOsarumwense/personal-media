# Lecture 22 – Avatar Binary Handling

Estimated runtime: 10–12 minutes

Objective
- Validate avatar lifecycle: initial fetch, upload toggling, and remove to default fallback.

Prerequisites
- Lectures 01–21.

Key Concepts
- Binary content handling, object URLs (`blob:`), 404 as “no avatar” signal.

Files
- playwright/tests/regression/profile/profile-management.spec.ts:1
- playwright/services/apiMocker.ts (avatar route):1

Initial Load Assertion
```ts
await expect(page.locator('#profileImg')).toHaveAttribute('src', /blob:/);
```

Remove → Default Fallback (excerpt)
```ts
await page.getByRole('link', { name: 'Update Image' }).click();
const reload = page.waitForNavigation({ waitUntil: 'load' });
const avatarRemovalFetch = page.waitForResponse(
  (r) => r.url().includes('/users/me/avatar') && r.request().method() === 'GET' && r.status() === 404,
);
await Promise.all([
  page.waitForResponse((r) => r.url().includes('/users/me/avatar') && r.request().method() === 'DELETE'),
  page.getByRole('button', { name: 'Remove Profile Photo' }).click(),
]);
await reload; await avatarRemovalFetch;
await expect(page.locator('#profileImg')).not.toHaveAttribute('src', /blob:/);
await expect(page.locator('#profileImg')).toHaveAttribute('src', /default-avatar/);
```

Mock Behavior
- ApiMocker toggles PNG bytes on POST, returns 404 on DELETE, enabling deterministic UI checks.

Validation
- Upload flips the blob URL; delete falls back to default asset.

Deliverables
- A reliable approach to binary media in UI tests.

