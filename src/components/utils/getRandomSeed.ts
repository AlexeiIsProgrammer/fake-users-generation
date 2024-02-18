import { Faker } from '@faker-js/faker';
import { MAX_SEED_VALUE, MIN_SEED_VALUE } from '../../constants';

const getRandomSeed = (currentFaker: Faker) => {
  return currentFaker.number.int({ min: MIN_SEED_VALUE, max: MAX_SEED_VALUE });
};

export default getRandomSeed;
