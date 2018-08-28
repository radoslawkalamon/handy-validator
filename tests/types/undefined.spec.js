/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

describe('TYPE: Undefined', () => {
  it('should return false if passed value is a Boolean', () => {
    const validator = 'Undefined';
    const value = true;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Null', () => {
    const validator = 'Undefined';
    const value = null;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return true if passed value is an Undefined', () => {
    const validator = 'Undefined';
    const value = undefined;
    expect(handyValidator(validator, value)).toEqual(true);
  });

  it('should return false if passed value is a Number', () => {
    const validator = 'Undefined';
    const value = 1;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a String', () => {
    const validator = 'Undefined';
    const value = '';
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Symbol', () => {
    const validator = 'Undefined';
    const value = Symbol('Symbol description');
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Object', () => {
    const validator = 'Undefined';
    const value = {};
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Function returning undefined', () => {
    const validator = 'Undefined';
    const value = () => undefined;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Array', () => {
    const validator = 'Undefined';
    const value = [];
    expect(handyValidator(validator, value)).toEqual(false);
  });
});
