// @ts-nocheck
import HandyValidator from '../../../src/index';

describe('Boolean validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'boolean';

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  it('should return true if passed value is a Boolean', () => {
    const value = false;
    expect(HandyVal.validate(validator, value)).toBeTruthy();
  });

  it('should return false if passed value is a Null', () => {
    const value = null;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('should return false if passed value is an Undefined', () => {
    const value = undefined;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('should return false if passed value is a Number', () => {
    const value = 1;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('should return false if passed value is a String', () => {
    const value = '';
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('should return false if passed value is a Symbol', () => {
    const value = Symbol('Symbol description');
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('should return false if passed value is a Object', () => {
    const value = {};
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('should return false if passed value is a Function returning boolean', () => {
    const value = (): boolean => true;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('should return false if passed value is an Array', () => {
    const value: any[] = [];
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });
});
