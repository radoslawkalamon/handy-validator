/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

describe('TYPE: Null', () => {
  it('should return false if passed value is a Boolean', () => {
    const validator = 'Null';
    const value = true;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return true if passed value is a Null', () => {
    const validator = 'Null';
    const value = null;
    expect(handyValidator(validator, value)).toEqual(true);
  });

  it('should return false if passed value is an Undefined', () => {
    const validator = 'Null';
    const value = undefined;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Number', () => {
    const validator = 'Null';
    const value = 1;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a String', () => {
    const validator = 'Null';
    const value = '';
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Symbol', () => {
    const validator = 'Null';
    const value = Symbol('Symbol description');
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Object', () => {
    const validator = 'Null';
    const value = {};
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Function returning null', () => {
    const validator = 'Null';
    const value = () => null;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Array', () => {
    const validator = 'Null';
    const value = [];
    expect(handyValidator(validator, value)).toEqual(false);
  });
});
