/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

it('should return true if passed value is an Array', () => {
  const validator = 'Array';
  const value = [];
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false if passed value is not an Array', () => {
  const validator = 'Array';
  const value = {};
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return true if passed value is an 6 elements Array [VAL: Array|<10]', () => {
  const validator = 'Array|<10';
  const value = [1, 2, 3, 4, 5, 6];
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false if passed value is an 14 elements Array [VAL: Array|<10]', () => {
  const validator = 'Array|<10';
  const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return true if passed value is an 17 elements Array [VAL: Array|>10]', () => {
  const validator = 'Array|>10';
  const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false if passed value is an 4 elements Array [VAL: Array|>10]', () => {
  const validator = 'Array|>10';
  const value = [1, 2, 3, 4];
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return true if passed value is an 8 elements Array [VAL: Array|=8]', () => {
  const validator = 'Array|=8';
  const value = [1, 2, 3, 4, 5, 6, 7, 8];
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false if passed value is an 13 elements Array [VAL: Array|=8]', () => {
  const validator = 'Array|=8';
  const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return true if passed value is an 15 elements Array [VAL: Array|>10|<20]', () => {
  const validator = 'Array|>10|<20';
  const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false if passed value is an 18 elements Array [VAL: Array|>10|<15]', () => {
  const validator = 'Array|>10|<15';
  const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return true if passed value is an 8 elements Array with abnormal validator [VAL: Array|=8|<20]', () => {
  const validator = 'Array|=8|<20';
  const value = [1, 2, 3, 4, 5, 6, 7, 8];
  expect(handyValidator(validator, value)).toEqual(true);
});

it('should return false if passed value is an 8 elements Array with abnormal validator [VAL: Array|=8|>20]', () => {
  const validator = 'Array|=8|>20';
  const value = [1, 2, 3, 4, 5, 6, 7, 8];
  expect(handyValidator(validator, value)).toEqual(false);
});

it('should return false if passed an unknown validator [VAL:Array|THIS_IS_BAD_VALIDATOR|<5]', () => {
  const validator = 'Array|THIS_IS_BAD_VALIDATOR|<5';
  const value = [1, 2, 3, 4];
  expect(handyValidator(validator, value)).toEqual(false);
});
