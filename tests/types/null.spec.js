/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

it('should return true is passed value is a Null', () => {
  const validator = 'Null';
  const value = null;
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false is passed value is an Object', () => {
  const validator = 'Null';
  const value = {};
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false is passed value is not a Null', () => {
  const validator = 'Null';
  const value = ['1337', 1337];
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false is passed value is an undefined', () => {
  const validator = 'Null';
  const value = undefined;
  expect(handyValidator(validator, value)).toEqual(false);
});
