import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const startDate = new Date();
startDate.setDate(startDate.getDate() - 15);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 15);

const post = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  expectedAmount: faker.datatype.number({ min: 100, max: 10000 }),
  expectedDate: faker.date.between(startDate, endDate),
  currency: sample(['USD', 'VND']),
  donatedAmount: faker.datatype.number({ min: 100, max: 10000 }),
  isVerified: faker.datatype.boolean(),
  status: sample(['approve', 'pending', 'reject']),
  posts: faker.datatype.number({ min: 0, max: 20 }),
}));

export default post;
