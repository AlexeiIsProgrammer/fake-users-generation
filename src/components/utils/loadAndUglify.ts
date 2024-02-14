import { Faker } from '@faker-js/faker';
import { FakerItem } from '../../types';
import { addSymbol, removeSymbol, swapSymbols } from './uglifyActions';
import selectCountry, { Countries } from './selectCountry';

const getUUID = (faker: Faker): string => {
  return faker.string.uuid();
};
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
  (errorsCount: number, currentFaker: Faker, country: Countries) =>
  (value: string): string => {
    let updatedValue = value;

    const intCount = Math.floor(errorsCount);
    const afterDotePart = errorsCount % 1;

    const chooseVariant = () => {
      const actionValue = currentFaker.number.int({ min: 1, max: 3 });
      // console.log(actionValue);
      switch (actionValue) {
        case 1:
          updatedValue = removeSymbol(updatedValue, currentFaker);
          break;
        case 2:
          updatedValue = addSymbol(updatedValue, currentFaker, country);
          break;
        case 3:
          updatedValue = swapSymbols(updatedValue, currentFaker);
          break;
        default:
          break;
      }
    };

    for (let i = 0; i < intCount; i += 1) {
      chooseVariant();
    }

    if (afterDotePart !== 0.0 && afterDotePart < currentFaker.number.float()) {
      chooseVariant();
    }

    return updatedValue;
  };

const uglifyFakers = (
  fakers: FakerItem[],
  country: Countries,
  errorsCount: number,
  seed: number
): FakerItem[] => {
  const currentFaker = selectCountry(country);
  const fakerInitialFn = uglifyFn(errorsCount, currentFaker, country);

  currentFaker.seed(seed);

  return fakers.map((faker) => ({
    ...faker,
    uuid: getUUID(currentFaker),
    name: fakerInitialFn(getName(currentFaker)),
    address: fakerInitialFn(getAddress(currentFaker)),
    phone: fakerInitialFn(getPhone(currentFaker)),
  }));
};

const loadMore = (
  country: Countries,
  count: number,
  oldData: FakerItem[],
  errorCount: number
): FakerItem[] => {
  const currentFaker = selectCountry(country);
  const fakeData = [...oldData];

  for (let i = oldData.length; i < oldData.length + count; i += 1) {
    const fakeItem: FakerItem = {
      id: i + 1,
      uuid: getUUID(currentFaker),
      name: uglifyFn(errorCount, currentFaker, country)(getName(currentFaker)),
      address: uglifyFn(
        errorCount,
        currentFaker,
        country
      )(getAddress(currentFaker)),
      phone: uglifyFn(
        errorCount,
        currentFaker,
        country
      )(getPhone(currentFaker)),
    };

    fakeData.push(fakeItem);
  }

  return fakeData;
};

export { uglifyFakers, loadMore };
