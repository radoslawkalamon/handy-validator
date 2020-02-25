// @ts-nocheck
import HandyValidator from '../../../src/index';

describe('Object validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'object';

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  it('Boolean passed - should return false', () => {
    const value = true;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
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
    const value = 1;
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('String passed - should return false', () => {
    const value = '';
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('Symbol passed - should return false', () => {
    const value = Symbol('Symbol description');
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('Object passed - should return true', () => {
    const value = {};
    expect(HandyVal.validate(validator, value)).toBeTruthy();
  });

  it('Function returning Object passed - should return false', () => {
    const value = (): object => ({});
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });

  it('Array passed - should return false', () => {
    const value: any[] = [];
    expect(HandyVal.validate(validator, value)).toBeFalsy();
  });
});
