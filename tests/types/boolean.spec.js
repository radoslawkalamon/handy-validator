/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

it('should return true if passed value is a Boolean (true)', () => {
  const validator = 'Boolean';
  const value = true;
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return true if passed value is a Boolean (false)', () => {
  const validator = 'Boolean';
  const value = false;
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false if passed value is 0', () => {
  const validator = 'Boolean';
  const value = 0;
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false if passed value is an undefined', () => {
  const validator = 'Boolean';
  const value = undefined;
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false if passed value is an undefined', () => {
  const validator = 'Boolean';
  const value = undefined;
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false if passed value is an empty string', () => {
  const validator = 'Boolean';
  const value = '';
  expect(handyValidator(validator, value)).toEqual(false);
});
