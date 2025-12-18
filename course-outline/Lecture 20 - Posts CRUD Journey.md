# Lecture 20 – Posts CRUD Journey

Estimated runtime: 10–12 minutes

Objective
- Implement a full timeline scenario: create a post, edit it, and delete it, validating UI updates and network events.

Prerequisites
- Lectures 01–19.

Key Concepts
- `waitForResponse` targeting method + URL; extracting route params (postId); toast verification.

Files
- playwright/tests/regression/posts/posts-crud.spec.ts:1

Flow (excerpt already in repo)
```ts
// Create
await page.fill('#postText', 'My first post');
await Promise.all([
  page.waitForResponse((r) => r.url().includes('/posts') && r.request().method() === 'POST'),
  page.click('#submitPost'),
]);
await expect(page.getByText('Post created successfully!')).toBeVisible();

// Edit
const editHref = await page.locator('#editButton').first().getAttribute('href');
const postId = editHref?.split('/').pop() ?? '';
await Promise.all([
  page.waitForURL(`**/edit-post/${postId}`),
  page.locator('#editButton').first().click(),
]);
await Promise.all([
  page.waitForResponse((r) => r.url().includes(`/posts/${postId}`) && r.request().method() === 'PATCH'),
  page.click('button:has-text("Submit")'),
]);
await expect(page.getByText('Post edited successfully!')).toBeVisible();

// Delete
await page.locator('#delete').first().click();
await Promise.all([
  page.waitForResponse((r) => r.url().includes(`/posts/${postId}`) && r.request().method() === 'DELETE'),
  page.locator('#confirmDeleteRef').click(),
]);
await expect(page.getByText('Post deleted successfully!')).toBeVisible();
```

Validation
- The edited text appears on home; after deletion it disappears.
- Network waits ensure we assert only after server confirms actions.

Deliverables
- A robust CRUD journey pattern applicable to similar timelines.

