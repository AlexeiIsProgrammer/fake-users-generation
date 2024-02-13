// eslint-disable-next-line import/no-extraneous-dependencies
import { Faker } from '@faker-js/faker';
import { FakerItem } from '../../types';

const generateList = (faker: Faker, count: number, oldData?: FakerItem[]) => {
  const fakeData = oldData ? [...oldData] : [];
  for (
    let i = oldData ? oldData.length : 0;
    i < (oldData ? oldData.length + count : count);
    i += 1
  ) {
    const fakeItem: FakerItem = {
      id: i + 1,
      uuid: faker.string.uuid(),
      name: `${faker.person.middleName()} ${faker.person.firstName()} ${faker.person.lastName()}`,
      address: `${faker.location.city()}, ${faker.location.street()}, h. ${faker.location.buildingNumber()}`,
      phone: faker.phone.number(),
    };
    fakeData.push(fakeItem);
  }

  return fakeData;
};

export default generateList;
