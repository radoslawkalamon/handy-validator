/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

describe('TYPE: Boolean', () => {
  it('should return true if passed value is a Boolean', () => {
    const validator = 'Boolean';
    const value = false;
    expect(handyValidator(validator, value)).toEqual(true);
  });

  it('should return false if passed value is a Null', () => {
    const validator = 'Boolean';
    const value = null;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Undefined', () => {
    const validator = 'Boolean';
    const value = undefined;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Number', () => {
    const validator = 'Boolean';
    const value = 1;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a String', () => {
    const validator = 'Boolean';
    const value = '';
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Symbol', () => {
    const validator = 'Boolean';
    const value = Symbol('Symbol description');
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Object', () => {
    const validator = 'Boolean';
    const value = {};
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Function returning boolean', () => {
    const validator = 'Boolean';
    const value = () => true;
    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Array', () => {
    const validator = 'Boolean';
    const value = [];
    expect(handyValidator(validator, value)).toEqual(false);
  });
});
