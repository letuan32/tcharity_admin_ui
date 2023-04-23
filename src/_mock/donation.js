import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const donation = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  expectedAmount: faker.lorem.paragraph(),
  expectedDate: faker.lorem.paragraph(),
  currency: faker.random.arrayElement(['VND', 'USD']),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  posts: faker.datatype.number({ min: 0, max: 20 }),
}));

export default donation;
