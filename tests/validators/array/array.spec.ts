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

    it('NaN passed - should return false', () => {
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('String passed - should return false', () => {
      const value = '';
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('"[]" String passed - should return false', () => {
      const value = '[]';
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

    it('Function returning Array passed - should return false', () => {
      const value = () => [];
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Array passed - should return true', () => {
      const value = [];
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });
  });


  describe('validatorArrayGroup problems', () => {
    it('validatorArrayGroup is not an Array - should return false', () => {
      const value = [1, 2, 3];
      const validatorArrayGroup = 213;
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray is not an Array - should return false', () => {
      const value = [1, 2, 3];
      const validatorArrayGroup = [['<', 123], 'str'];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray unknown operator - should return false', () => {
      const value = [1, 2, 3];
      const validatorArrayGroup = [[123, '<'], [undefined, {}]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray length is not equal to operator function args length - should return false', () => {
      const value = [1, 2, 3];
      const validatorArrayGroup = [['>', 123, 123], ['<', 123]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray not integer - should return false', () => {
      const value = [1, 2, 3];
      const validatorArrayGroup = [['<', 63.554]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });
  });

  describe('Console.error try..catch test', () => {
    let HandyValidatorResult: boolean;
    let jestSpy: jest.SpyInstance;

    beforeAll(() => {
      jestSpy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const value = [1, 2, 3];
      const validatorArrayGroup = [['THIS_IS_UNKNOWN_VALIDATOR', 10]];
      HandyValidatorResult = HandyVal.validate(validator, value, validatorArrayGroup);
    });

    it('should Handy Validator Result be false', () => {
      expect(HandyValidatorResult).toBeFalsy();
    });

    it('should call console.error once', () => {
      expect(jestSpy.mock.calls.length).toBe(1);
    });

    it('should console.error throw errors.unknownOperator', () => {
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
      const validatorArrayGroup = [['=', 3]];
      HandyValidatorResult = HandyVal.validate(validator, value, validatorArrayGroup);
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
        const validatorArrayGroup = [[operator, 3]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 2, 3, 4];
        const validatorArrayGroup = [[operator, 8]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[>] validator', () => {
      const operator = '>';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validatorArrayGroup = [[operator, 2]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 'string', null, undefined];
        const validatorArrayGroup = [[operator, 12]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[>=] validator', () => {
      const operator = '>=';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validatorArrayGroup = [[operator, 6]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validatorArrayGroup = [[operator, 2]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 'string', null, undefined];
        const validatorArrayGroup = [[operator, 12]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[<] validator', () => {
      const operator = '<';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validatorArrayGroup = [[operator, 12]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validatorArrayGroup = [[operator, 5]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[<=] validator', () => {
      const operator = '<=';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validatorArrayGroup = [[operator, 12]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validatorArrayGroup = [[operator, 6]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validatorArrayGroup = [[operator, 5]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });
  });

  describe('Groups', () => {
    it('should return true', () => {
      const value = [1, 2, 3, undefined, 12, 333];
      const validatorArrayGroup = [['>', 5], ['<', 10], ['=', 6]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
    });

    it('should return true (validateSome)', () => {
      const value = [1, 'string', null, undefined];
      const validatorArrayGroup = [['>', 5], ['<', 10], ['=', 6]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeTruthy();
    });

    it('should return false', () => {
      const value = [1, 'string', null, undefined];
      const validatorArrayGroup = [['>', 5], ['<', 10], ['=', 6]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('should return false (validateSome)', () => {
      const value = [1, 2, 3, 12, 333];
      const validatorArrayGroup = [['>=', 6], ['<=', 4], ['<', 3]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeFalsy();
    });

    it('should return false (validateSome, malformed validatorArrayGroup)', () => {
      const value = [1, 2, 3, 12, 333];
      const validatorArrayGroup = [['=', 5], ['<=', 4], ['<', 'supper']];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeFalsy();
    });
  });
});
