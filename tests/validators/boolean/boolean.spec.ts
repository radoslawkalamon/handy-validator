// @ts-nocheck
import { HandyValidator } from '../../../src/HandyValidator';

describe('Boolean validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'boolean';

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  it('Boolean [false] passed - should return true', () => {
    const value = false;
    expect(HandyVal.validate(validator, value)).toBeTruthy();
  });

  it('Boolean [true] passed - should return true', () => {
    const value = true;
    expect(HandyVal.validate(validator, value)).toBeTruthy();
  });

  it('Null passed - should return false', () => {
    const value = null;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('Undefined passed - should return false', () => {
    const value = undefined;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('Number passed - should return false', () => {
    const value = 156;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('"0" Number passed - should return false', () => {
    const value = 0;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('"1" Number passed - should return false', () => {
    const value = 1;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('String passed - should return false', () => {
    const value = '';
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('"0" String passed - should return false', () => {
    const value = '0';
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('"1" String passed - should return false', () => {
    const value = '1';
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('"false" String passed - should return false', () => {
    const value = 'false';
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('"true" String passed - should return false', () => {
    const value = 'true';
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('Symbol passed - should return false', () => {
    const value = Symbol('Symbol description');
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('Object passed - should return false', () => {
    const value = {};
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('Function returning Boolean passed - should return false', () => {
    const value = (): boolean => true;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('Array passed - should return false', () => {
    const value: any[] = [];
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });
});
