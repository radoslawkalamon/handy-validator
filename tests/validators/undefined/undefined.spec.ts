// @ts-nocheck
import HandyValidator from '../../../src/index';

describe('Undefined validator tests', () => {
  let HandyVal: HandyValidator;

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  it('should return false if passed value is a Boolean', () => {
    const validator = 'undefined';
    const value = true;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Null', () => {
    const validator = 'undefined';
    const value = null;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return true if passed value is an Undefined', () => {
    const validator = 'undefined';
    const value = undefined;
    expect(HandyVal.validate(validator, value)).toEqual(true);
  });

  it('should return false if passed value is a Number', () => {
    const validator = 'undefined';
    const value = 1;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a String', () => {
    const validator = 'undefined';
    const value = '';
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Symbol', () => {
    const validator = 'undefined';
    const value = Symbol('Symbol description');
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Object', () => {
    const validator = 'undefined';
    const value = {};
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Function returning undefined', () => {
    const validator = 'undefined';
    const value = (): undefined => undefined;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Array', () => {
    const validator = 'undefined';
    const value: any[] = [];
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });
});
