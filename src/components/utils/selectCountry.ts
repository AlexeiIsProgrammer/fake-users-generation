// eslint-disable-next-line import/no-extraneous-dependencies
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
      console.log('germany');

      return fakerDE;
    case Countries.PL:
      console.log('polan');
      return fakerPL;
    case Countries.US:
      console.log('usa');
      return fakerUS;
    default:
      return fakerPL;
  }
}
