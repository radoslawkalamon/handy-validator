// @ts-nocheck
import HandyValidator from '../../../src/index';
import arrayErrors from '../../../src/validators/array/array.errors';

describe('Array validator tests', () => {
  let HandyVal: HandyValidator;

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  describe('Type validator', () => {
    it('should return false if passed value is a Boolean', () => {
      const validator = 'array';
      const value = true;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Null', () => {
      const validator = 'array';
      const value = null;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Undefined', () => {
      const validator = 'array';
      const value = undefined;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Number', () => {
      const validator = 'array';
      const value = 1;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a NaN', () => {
      const validator = 'array';
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a String', () => {
      const validator = 'array';
      const value = '';
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Symbol', () => {
      const validator = 'array';
      const value = Symbol('Symbol description');
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Object', () => {
      const validator = 'array';
      const value = {};
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Function returning Array', () => {
      const validator = 'array';
      const value = () => [];
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return true if passed value is an Array', () => {
      const validator = 'array';
      const value = [];
      expect(HandyVal.validate(validator, value)).toEqual(true);
    });
  });

  describe('Console.error try..catch test', () => {
    let HandyValidatorResult: boolean;
    let jestSpy: jest.SpyInstance;

    beforeAll(() => {
      jestSpy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const validator = 'array';
      const value = [1, 2, 3];
      const validationArguments = [['THIS_IS_UNKNOWN_VALIDATOR', 10.22]];
      HandyValidatorResult = HandyVal.validate(validator, value, validationArguments);
    });

    it('should Handy Validator Result be false', () => {
      expect(HandyValidatorResult).toEqual(false);
    });

    it('should call console.error once', () => {
      expect(jestSpy.mock.calls.length).toBe(1);
    });

    it('should console.error message be errors.unknownOperator', () => {
      const mockError = new Error(arrayErrors.unknownOperator);
      expect(jestSpy.mock.calls[0][0]).toEqual(mockError);
    });

    afterAll(() => {
      jestSpy.mockRestore();
    });
  });

  describe('Validator failed / no console.error on normal fail', () => {
    let HandyValidatorResult: boolean;
    let jestSpy: jest.SpyInstance;

    beforeAll(() => {
      jestSpy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const validator = 'array';
      const value = [1, 2, 3, 4];
      const validationArguments = [['=', 3]];
      HandyValidatorResult = HandyVal.validate(validator, value, validationArguments);
    });

    it('should Handy Validator Result be false', () => {
      expect(HandyValidatorResult).toEqual(false);
    });

    it('should call console.error zero times', () => {
      expect(jestSpy.mock.calls.length).toBe(0);
    });

    afterAll(() => {
      jestSpy.mockRestore();
    });
  });

  describe('Value validators', () => {
    describe('[=] validator', () => { });
    describe('[>] validator', () => { });
    describe('[>=] validator', () => { });
    describe('[<] validator', () => { });
    describe('[<=] validator', () => { });
  });
});
