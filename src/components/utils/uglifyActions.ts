import { Faker } from '@faker-js/faker';
import { Countries } from './selectCountry';
import { ENalphabet } from '../../constants/alphabet';

export const removeSymbol = (value: string, currentFaker: Faker) => {
  const removeIndex = currentFaker.number.int({
    min: 0,
    max: (value?.length || 1) - 1,
  });

  return value.substring(0, removeIndex) + value.substring(removeIndex + 1);
};

export const addSymbol = (
  value: string,
  currentFaker: Faker,
  country: Countries
): string => {
  let alpha = '';
  let valueIndex = 0;

  if (!value) return '';

  switch (country) {
    case 'us':
      alpha = ENalphabet[currentFaker.number.int(ENalphabet.length - 1)];
      valueIndex = currentFaker.number.int(value.length - 1);

      return `${value.slice(0, valueIndex)}${alpha}${value.slice(valueIndex + 1)}`;
    case 'pl':
      alpha = ENalphabet[currentFaker.number.int(ENalphabet.length - 1)];
      valueIndex = currentFaker.number.int(value.length - 1);

      return `${value.slice(0, valueIndex)}${alpha}${value.slice(valueIndex + 1)}`;
    case 'de':
      alpha = ENalphabet[currentFaker.number.int(ENalphabet.length - 1)];
      valueIndex = currentFaker.number.int(value.length - 1);

      return `${value.slice(0, valueIndex)}${alpha}${value.slice(valueIndex + 1)}`;

    default:
      break;
  }

  return value;
};

export const swapSymbols = (value: string, currentFaker: Faker) => {
  const swapIndex = currentFaker.number.int({
    min: 0,
    max: (value?.length || 1) - 1,
  });

  const [firstLetter, secondLetter] = [
    value[swapIndex],
    swapIndex === value.length - 1
      ? value[swapIndex - 1]
      : value[swapIndex + 1],
  ];

  if (swapIndex === value.length - 1) {
    return `${value.slice(0, swapIndex - 1)}${firstLetter}${secondLetter}`;
  }

  return `${value.slice(0, swapIndex)}${secondLetter}${firstLetter}${value.slice(swapIndex + 1)}`;
};
