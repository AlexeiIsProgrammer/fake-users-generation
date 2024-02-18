import { Faker } from '@faker-js/faker';

import { faker as fakerDE } from '@faker-js/faker/locale/de';
import { faker as fakerPL } from '@faker-js/faker/locale/pl';
import { faker as fakerUS } from '@faker-js/faker/locale/en_US';

export enum Countries {
  US = 'us',
  PL = 'pl',
  DE = 'de',
}

export default function selectCountry(val: Countries): Faker {
  switch (val) {
    case Countries.DE:
      return fakerDE;
    case Countries.PL:
      return fakerPL;
    case Countries.US:
      return fakerUS;
    default:
      return fakerPL;
  }
}
