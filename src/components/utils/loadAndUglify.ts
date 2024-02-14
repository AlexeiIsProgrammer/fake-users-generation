// eslint-disable-next-line import/no-extraneous-dependencies
import { Faker } from '@faker-js/faker';
import { FakerItem } from '../../types';

const getName = (faker: Faker): string => {
  return `${faker.person.middleName()} ${faker.person.firstName()} ${faker.person.lastName()}`;
};
const getAddress = (faker: Faker): string => {
  return `${faker.location.city()}, ${faker.location.street()}, h. ${faker.location.buildingNumber()}`;
};
const getPhone = (faker: Faker): string => {
  return faker.phone.number();
};

const uglifyFn =
  (errorsCount: number) =>
  (value: string): string => {
    return value;
  };

const uglifyFakers = (
  fakers: FakerItem[],
  currentFaker: Faker,
  errorsCount: number,
  seed: number
): FakerItem[] => {
  const fakerInitialFn = uglifyFn(errorsCount);
  currentFaker.seed(seed);
  return fakers.map((faker) => ({
    ...faker,
    name: fakerInitialFn(getName(currentFaker)),
    address: fakerInitialFn(getName(currentFaker)),
    phone: fakerInitialFn(getName(currentFaker)),
  }));
};

const loadMore = (
  currentFaker: Faker,
  count: number,
  oldData: FakerItem[],
  errorCount: number
): FakerItem[] => {
  const fakeData = [...oldData];
  for (let i = oldData.length; i < oldData.length + count; i += 1) {
    const fakeItem: FakerItem = {
      id: i + 1,
      uuid: currentFaker.string.uuid(),
      name: uglifyFn(errorCount)(getName(currentFaker)),
      address: uglifyFn(errorCount)(getAddress(currentFaker)),
      phone: uglifyFn(errorCount)(getPhone(currentFaker)),
    };

    fakeData.push(fakeItem);
  }

  return fakeData;
};

export { uglifyFakers, loadMore };
