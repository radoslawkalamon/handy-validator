/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

it('should return true if passed value is an Object', () => {
  const validator = 'Object';
  const value = {};
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false if passed value is a Null', () => {
  const validator = 'Object';
  const value = null;
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false if passed value is an Array', () => {
  const validator = 'Object';
  const value = [];
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false if passed value is not an Object', () => {
  const validator = 'Object';
  const value = 1337;
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false if passed value is an undefined', () => {
  const validator = 'Object';
  const value = undefined;
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false if passed value is an Object, but _falseOnObject is set to true', () => {
  const validator = 'Object';
  const value = {};
  const falseOnObject = true;
  expect(handyValidator(validator, value, falseOnObject)).toEqual(false);
});
