import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const startDate = new Date();
startDate.setDate(startDate.getDate() - 15);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 15);

const donation = [...Array(24)].map((_, index) => {
  const currencyValue = sample(['VND', 'USD']);
  let amountValue;

  if (currencyValue === 'VND') {
    amountValue = faker.datatype.number({ min: 10000, max: 10000000 });
  } else if (currencyValue === 'USD') {
    amountValue = faker.datatype.number({ min: 1, max: 1000 });
  }

  return {
    id: faker.datatype.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    name: faker.name.fullName(),
    postId: faker.datatype.number({ min: 1, max: 20 }),
    amount: amountValue,
    currency: currencyValue,
    paymentDate: faker.date.between(startDate, endDate),
    paymentService: sample(['PayPal', 'ZaloPay']),
  };
});
export default donation;
