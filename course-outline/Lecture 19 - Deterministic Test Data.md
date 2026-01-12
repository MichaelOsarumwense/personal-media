# Lecture 19 – Deterministic Test Data

Estimated runtime: 8–10 minutes

Objective
- Build deterministic data builders from scratch so tests are readable and stable.

Prerequisites
- Lectures 01–18.

Start State
- You have mocks/fixtures; no shared test data module yet.

Outcome
- A `testData.ts` module with small builders for users and posts.

Why this matters
- Centralized builders keep specs concise and relationships consistent (e.g., posts owned by the same user).

Key Concepts
- Faker for realistic yet controlled values; optional seeding for reproducibility.

Files
- playwright/utils/testData.ts
- playwright/services/apiMocker.ts (types used)

Steps
1) Add a test data module
   - Path: `playwright/utils/testData.ts`
   - Contents (example):
     ```ts
     import { faker } from '@faker-js/faker';

     export type UserProfile = {
       name: string; email: string; address: string; dob: string; hobbies: string; events: string; secret?: string;
     };
     export type PostRecord = { id: string; owner: string; description: string };

     export const buildUserProfile = (overrides: Partial<UserProfile> = {}): UserProfile => ({
       name: overrides.name ?? faker.person.fullName(),
       email: overrides.email ?? faker.internet.email({ provider: 'example.com' }),
       address: overrides.address ?? `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
       dob: overrides.dob ?? faker.date.birthdate({ min: 21, max: 55, mode: 'age' }).toISOString().split('T')[0],
       hobbies: overrides.hobbies ?? faker.word.words(3),
       events: overrides.events ?? `${faker.company.catchPhrase()} Meetup`,
       secret: overrides.secret ?? faker.word.noun(),
     });

     export const buildPostRecord = (overrides: Partial<PostRecord> = {}): PostRecord => ({
       id: overrides.id ?? `post-${faker.string.alphanumeric(6)}`,
       owner: overrides.owner ?? 'User',
       description: overrides.description ?? faker.lorem.sentence(),
     });

     export const buildPostCollection = (count = 2, presets: Partial<PostRecord>[] = []): PostRecord[] => {
       const base = Array.from({ length: count }, () => buildPostRecord());
       return base.map((p, i) => ({ ...p, ...(presets[i] || {}) }));
     };
     ```

Usage
- In tests, pass overrides to ensure relations (e.g., posts owned by the same user).

Seeding (optional)
- You can set `faker.seed(12345)` for reproducibility if needed.

Validation
- Values are realistic yet controlled; test narratives become readable.

Deliverables
- Comfort composing test data without brittle hard-coded literals.
