// @ts-nocheck
import HandyValidator from '../../../src/index';

describe('Object validator tests', () => {
  let HandyVal: HandyValidator;

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  it('should return false if passed value is a Boolean', () => {
    const validator = 'object';
    const value = true;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Null', () => {
    const validator = 'object';
    const value = null;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Undefined', () => {
    const validator = 'object';
    const value = undefined;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Number', () => {
    const validator = 'object';
    const value = 1;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a String', () => {
    const validator = 'object';
    const value = '';
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Symbol', () => {
    const validator = 'object';
    const value = Symbol('Symbol description');
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return true if passed value is a Object', () => {
    const validator = 'object';
    const value = {};
    expect(HandyVal.validate(validator, value)).toEqual(true);
  });

  it('should return false if passed value is a Function returning object', () => {
    const validator = 'object';
    const value = (): object => ({});
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Array', () => {
    const validator = 'object';
    const value: any[] = [];
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });
});
