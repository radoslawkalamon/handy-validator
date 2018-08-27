/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

it('should return true is passed value is an Undefined', () => {
  const validator = 'Undefined';
  const value = undefined;
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false is passed value is a Null', () => {
  const validator = 'Undefined';
  const value = null;
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false is passed value is not Undefined', () => {
  const validator = 'Undefined';
  const value = 'VALUE';
  expect(handyValidator(validator, value)).toEqual(false);
});
