/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

it('should return true if falseOnObject is undefined when passing an Object', () => {
  const validator = 'Object';
  const value = {};
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return true if falseOnObject is false when passing an Object', () => {
  const validator = 'Object';
  const value = {};
  const falseOnObject = false;
  expect(handyValidator(validator, value, falseOnObject)).toEqual(true);
});

it('should return true if falseOnObject is true when passing an Object', () => {
  const validator = 'Object';
  const value = {};
  const falseOnObject = true;
  expect(handyValidator(validator, value, falseOnObject)).toEqual(false);
});
