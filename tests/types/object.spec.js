/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

describe('TYPE: Object', () => {
  it('should return false if passed value is a Boolean', () => {
    const validator = 'Object';
    const value = true;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Null', () => {
    const validator = 'Object';
    const value = null;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Undefined', () => {
    const validator = 'Object';
    const value = undefined;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Number', () => {
    const validator = 'Object';
    const value = 1;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a String', () => {
    const validator = 'Object';
    const value = '';
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Symbol', () => {
    const validator = 'Object';
    const value = Symbol('Symbol description');
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return true if passed value is a Object', () => {
    const validator = 'Object';
    const value = {};
    expect(handyValidator(validator, value)).toEqual(true);
  });

  it('should return false if passed value is a Function returning object', () => {
    const validator = 'Object';
    const value = () => {};
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Array', () => {
    const validator = 'Object';
    const value = [];
    expect(handyValidator(validator, value)).toEqual(false);
  });
});
