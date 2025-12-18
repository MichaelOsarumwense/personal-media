# Lecture 18 – Home Model + Common Asserts

Estimated runtime: 8–10 minutes

Objective
- Add robust assertions to the Home model that adapt to desktop/mobile projects.

Prerequisites
- Lectures 01–17.

Key Concepts
- Conditional assertions by viewport; reusing model checks across specs.

Files
- playwright/models/home.model.ts:1

Existing Model (excerpt)
```ts
async expectHeroBanner(): Promise<void> {
  await expect(this.page.getByText('Private Media').first()).toBeVisible();
  const isMobile = await this.page.evaluate(() => {
    if (typeof window.matchMedia === 'function') return window.matchMedia('(max-width: 768px)').matches;
    return window.innerWidth <= 768;
  });
  if (isMobile) {
    await expect(this.page.locator('#pageContainer')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Logout' }).first()).toBeVisible();
  } else {
    await expect(this.page.getByText('Stories').first()).toBeVisible();
    await expect(this.page.getByText('Live Now').first()).toBeVisible();
  }
}
```

Add Assertion
- Implement `expectFooter()` to assert footer contains “Private Media” (already present in repo).

Spec Usage
```ts
await home.expectHeroBanner();
await home.expectFooter();
```

Validation
- Run specs on both `chromium-desktop` and `webkit-mobile`; assertions adapt.

Deliverables
- A Home model that centralizes common UI expectations.

