import HandyValidator from '../../src/index';

let HandyVal: HandyValidator;

beforeAll(() => {
  HandyVal = new HandyValidator();
});

describe('Null validator tests', () => {
  it('should return false if passed value is a Boolean', () => {
    const validator = 'null';
    const value = true;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return true if passed value is a Null', () => {
    const validator = 'null';
    const value = null;
    expect(HandyVal.validate(validator, value)).toEqual(true);
  });

  it('should return false if passed value is an Undefined', () => {
    const validator = 'null';
    const value = undefined;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Number', () => {
    const validator = 'null';
    const value = 1;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a String', () => {
    const validator = 'null';
    const value = '';
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Symbol', () => {
    const validator = 'null';
    const value = Symbol('Symbol description');
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Object', () => {
    const validator = 'null';
    const value = {};
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is a Function returning null', () => {
    const validator = 'null';
    const value = (): null => null;
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });

  it('should return false if passed value is an Array', () => {
    const validator = 'null';
    const value: any[] = [];
    expect(HandyVal.validate(validator, value)).toEqual(false);
  });
});
