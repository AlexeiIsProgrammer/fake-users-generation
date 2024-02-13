import { MAX_SEED_VALUE, MIN_SEED_VALUE } from '../../constants';

const getRandomSeed = () => {
  return Math.floor(
    Math.random() * (MAX_SEED_VALUE - MIN_SEED_VALUE) + MIN_SEED_VALUE
  );
};

export default getRandomSeed;
