// @ts-nocheck
import HandyValidator from '../../../src/index';
import errors from '../../../src/validators/array/array.errors';

describe('Array validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'array';

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  describe('Type', () => {
    it('should return false if passed value is a Boolean', () => {
      const value = true;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
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

    it('should return false if passed value is a NaN', () => {
      const value = NaN;
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

    it('should return false if passed value is an Object', () => {
      const value = {};
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return false if passed value is a Function returning Array', () => {
      const value = () => [];
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return true if passed value is an Array', () => {
      const value = [];
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });
  });

  describe('Console.error try..catch test', () => {
    let HandyValidatorResult: boolean;
    let jestSpy: jest.SpyInstance;

    beforeAll(() => {
      jestSpy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const value = [1, 2, 3];
      const validationArguments = [['THIS_IS_UNKNOWN_VALIDATOR', 10]];
      HandyValidatorResult = HandyVal.validate(validator, value, validationArguments);
    });

    it('should Handy Validator Result be false', () => {
      expect(HandyValidatorResult).toBeFalsy();
    });

    it('should call console.error once', () => {
      expect(jestSpy.mock.calls.length).toBe(1);
    });

    it('should console.error message be errors.unknownOperator', () => {
      const mockError = new Error(errors.unknownOperator);
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

      const value = [1, 2, 3, 4];
      const validationArguments = [['=', 3]];
      HandyValidatorResult = HandyVal.validate(validator, value, validationArguments);
    });

    it('should Handy Validator Result be false', () => {
      expect(HandyValidatorResult).toBeFalsy();
    });

    it('should call console.error zero times', () => {
      expect(jestSpy.mock.calls.length).toBe(0);
    });

    afterAll(() => {
      jestSpy.mockRestore();
    });
  });

  describe('Value validators', () => {
    describe('[=] validator', () => {
      const operator = '=';

      it('should return true', () => {
        const value = [1, 2, 3];
        const validationArguments = [[operator, 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 2, 3, 4];
        const validationArguments = [[operator, 8]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeFalsy();
      });
    });

    describe('[>] validator', () => {
      const operator = '>';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationArguments = [[operator, 2]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 'string', null, undefined];
        const validationArguments = [[operator, 12]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeFalsy();
      });
    });

    describe('[>=] validator', () => {
      const operator = '>=';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationArguments = [[operator, 6]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
      });

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationArguments = [[operator, 2]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 'string', null, undefined];
        const validationArguments = [[operator, 12]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeFalsy();
      });
    });

    describe('[<] validator', () => {
      const operator = '<';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationArguments = [[operator, 12]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationArguments = [[operator, 5]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeFalsy();
      });
    });

    describe('[<=] validator', () => {
      const operator = '<=';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationArguments = [[operator, 12]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
      });

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationArguments = [[operator, 6]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationArguments = [[operator, 5]];
        expect(HandyVal.validate(validator, value, validationArguments)).toBeFalsy();
      });
    });
  });

  describe('Groups', () => {
    it('should return true', () => {
      const value = [1, 2, 3, undefined, 12, 333];
      const validationArguments = [['>', 5], ['<', 10], ['=', 6]];
      expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
    });

    it('should return true', () => {
      const value = [1, 'string', null, undefined];
      const validationArguments = [['>', 5], ['<', 10], ['=', 6]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validationArguments, validateSome)).toBeTruthy();
    });

    it('should return false', () => {
      const value = [1, 'string', null, undefined];
      const validationArguments = [['>', 5], ['<', 10], ['=', 6]];
      expect(HandyVal.validate(validator, value, validationArguments)).toBeFalsy();
    });

    it('should return false', () => {
      const value = [1, 2, 3, 12, 333];
      const validationArguments = [['>=', 6], ['<=', 4], ['<', 3]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validationArguments, validateSome)).toBeFalsy();
    });
  });
});
