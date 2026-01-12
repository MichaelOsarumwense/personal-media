# Lecture 21 – File Upload + Download

Estimated runtime: 10–12 minutes

Objective
- Handle avatar upload and static PDF download with deterministic assertions.

Prerequisites
- Lectures 01–20.

Key Concepts
- `setInputFiles` for uploads; `page.waitForEvent('download')` for downloads.
- Assert `suggestedFilename()` and post-action UI state.

Files
- playwright/tests/regression/profile/profile-management.spec.ts:1
- playwright/tests/regression/media/download.spec.ts:1

Avatar Upload (excerpt)
```ts
const fileInput = page.getByRole('dialog').locator('input[type="file"]');
await fileInput.setInputFiles(avatarUploadPath);
await expect(page.locator('#fileName')).toContainText('Filename: 01.png');

const avatarRefresh = page.waitForResponse(
  (r) => r.url().includes('/users/me/avatar') && r.request().method() === 'GET',
);
await Promise.all([
  page.waitForResponse((r) => r.url().includes('/users/me/avatar') && r.request().method() === 'POST'),
  page.getByRole('button', { name: 'Update' }).click(),
]);
await avatarRefresh;
await expect(page.locator('#profileImg')).toHaveAttribute('src', /blob:/);
```

PDF Download (excerpt)
```ts
await page.goto('/downloads');
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.getByRole('button', { name: /download pdf/i }).click(),
]);
expect((await download.suggestedFilename()).toLowerCase()).toBe('lorem-ipsum.pdf');
```

Validation
- Upload: modal closes, avatar `src` changes to a blob URL.
- Download: button re-enables, filename is as expected.

Deliverables
- Confidence implementing file upload/download checks with stable waits.

