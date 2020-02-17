import HandyValidator from '../../../src/index';

let HandyVal: HandyValidator;

beforeAll(() => {
  HandyVal = new HandyValidator();
});

describe('Boolean validator tests', () => {
  it('should return true if passed value is a Boolean', () => {
    const validator = 'boolean';
    const value = false;
    expect(HandyVal.validate(validator, value)).toEqual(true);
  });

  it('should return false if passed value is a Null', () => {
    const validator = 'boolean';
    const value = null;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Undefined', () => {
    const validator = 'boolean';
    const value = undefined;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Number', () => {
    const validator = 'boolean';
    const value = 1;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a String', () => {
    const validator = 'boolean';
    const value = '';
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Symbol', () => {
    const validator = 'boolean';
    const value = Symbol('Symbol description');
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Object', () => {
    const validator = 'boolean';
    const value = {};
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Function returning boolean', () => {
    const validator = 'boolean';
    const value = (): boolean => true;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Array', () => {
    const validator = 'boolean';
    const value: any[] = [];
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });
});
