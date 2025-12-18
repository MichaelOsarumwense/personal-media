# Lecture 19 – Deterministic Test Data

Estimated runtime: 8–10 minutes

Objective
- Use deterministic data builders so your tests are readable and stable.

Prerequisites
- Lectures 01–18.

Key Concepts
- Faker for realistic yet controlled data; stabilizing with seeds when needed.

Files
- playwright/utils/testData.ts:1
- playwright/services/apiMocker.ts (types used):1

Builders (excerpt)
```ts
export const buildUserProfile = (overrides?: Partial<UserProfile>): UserProfile => ({
  name: overrides?.name ?? faker.person.fullName(),
  email: overrides?.email ?? faker.internet.email({ provider: 'example.com' }),
  address: overrides?.address ?? `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
  dob: overrides?.dob ?? faker.date.birthdate({ min: 21, max: 55, mode: 'age' }).toISOString().split('T')[0],
  hobbies: overrides?.hobbies ?? faker.word.words(3),
  events: overrides?.events ?? `${faker.company.catchPhrase()} Meetup`,
  secret: overrides?.secret ?? faker.word.noun(),
});
```

Usage
- In tests, pass overrides to ensure relations (e.g., posts owned by the same user).

Seeding (optional)
- You can set `faker.seed(12345)` for reproducibility if needed.

Validation
- Values are realistic yet controlled; test narratives become readable.

Deliverables
- Comfort composing test data without brittle hard-coded literals.

