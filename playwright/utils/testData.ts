import { faker } from '@faker-js/faker';
import type { PostRecord, UserProfile } from '../services/apiMocker';

export const buildCredentials = (overrides?: Partial<{ email: string; password: string }>) => ({
  email: overrides?.email ?? faker.internet.email({ provider: 'example.com' }),
  password: overrides?.password ?? faker.internet.password({ length: 12 }),
});

export const buildUserProfile = (overrides?: Partial<UserProfile>): UserProfile => ({
  name: overrides?.name ?? faker.person.fullName(),
  email: overrides?.email ?? faker.internet.email({ provider: 'example.com' }),
  address:
    overrides?.address ?? `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
  dob: overrides?.dob ?? faker.date.birthdate({ min: 21, max: 55, mode: 'age' }).toISOString().split('T')[0],
  hobbies: overrides?.hobbies ?? faker.word.words(3),
  events: overrides?.events ?? `${faker.company.catchPhrase()} Meetup`,
  secret: overrides?.secret ?? faker.word.noun(),
});

export const buildPostRecord = (overrides?: Partial<PostRecord>): PostRecord => {
  const id = overrides?.id ?? `post-${faker.string.alphanumeric(8).toLowerCase()}`;
  return {
    id,
    _id: overrides?._id ?? id,
    owner: overrides?.owner ?? faker.person.firstName(),
    description: overrides?.description ?? faker.lorem.sentence(),
    updatedAt: overrides?.updatedAt ?? new Date().toISOString(),
  };
};

export const buildPostCollection = (count = 2, overrides?: Partial<PostRecord>[]): PostRecord[] => {
  if (overrides && overrides.length) {
    return overrides.map((override) => buildPostRecord(override));
  }

  return Array.from({ length: count }, () => buildPostRecord());
};
