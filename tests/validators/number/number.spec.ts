// @ts-nocheck
import HandyValidator from '../../../src/index';
import numberErrors from '../../../src/validators/number/number.errors';

describe('Number validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'number';

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  describe('Type validator', () => {
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

    it('Number passed - should return true', () => {
      const value = 1;
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('NaN passed - should return true', () => {
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('String passed - should return false', () => {
      const value = '';
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('"123" String passed - should return false', () => {
      const value = '123';
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

    it('Function returning Number passed - should return false', () => {
      const value = () => 3;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Array passed - should return false', () => {
      const value = [];
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });
  });

  describe('validatorArrayGroup problems', () => {
    it('validatorArrayGroup is not an Array - should return false', () => {
      const value = 122;
      const validatorArrayGroup = 213;
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray is not an Array - should return false', () => {
      const value = 122;
      const validatorArrayGroup = [['<', 123], 'str'];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray length is not equail to validatorTypesArray - should return false', () => {
      const value = 122;
      const validatorArrayGroup = [['>', 123, 123], ['<', 123]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray have unknown operator - should return false', () => {
      const value = 122;
      const validatorArrayGroup = [[123, '<'], [undefined, {}]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray second argument not a number - should return false', () => {
      const value = 122;
      const validatorArrayGroup = [['<', 123], ['<=', 'Hemlo!']];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });
  });

  describe('Console.error try..catch test', () => {
    let HandyValidatorResult: boolean;
    let jestSpy: jest.SpyInstance;

    beforeAll(() => {
      jestSpy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const value = 34.20;
      const validatorArrayGroup = [['THIS_IS_UNKNOWN_VALIDATOR', 10.22]];
      HandyValidatorResult = HandyVal.validate(validator, value, validatorArrayGroup);
    });

    it('should Handy Validator Result be false', () => {
      expect(HandyValidatorResult).toBeFalsy();
    });

    it('should call console.error once', () => {
      expect(jestSpy.mock.calls.length).toBe(1);
    });

    it('should console.error message be errors.unknownOperator', () => {
      const mockError = new Error(numberErrors.unknownOperator);
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

      const value = 34.20;
      const validatorArrayGroup = [['<', 10.22]];
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
    describe('[>=] validator', () => {
      const operator = '>=';

      it('should return true', () => {
        const value = 34.20;
        const validatorArrayGroup = [[operator, 10.22]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return true', () => {
        const value = 367;
        const validatorArrayGroup = [[operator, 367]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = 112.22;
        const validatorArrayGroup = [[operator, 654.22]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[<=] validator', () => {
      const operator = '<=';

      it('should return true', () => {
        const value = 31.20;
        const validatorArrayGroup = [[operator, 4443.22]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return true', () => {
        const value = 111;
        const validatorArrayGroup = [[operator, 111]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = 979653.11323213;
        const validatorArrayGroup = [[operator, 5123]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[<] validator', () => {
      const operator = '<';

      it('should return true', () => {
        const value = 11.22;
        const validatorArrayGroup = [[operator, 22.333]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = 6533;
        const validatorArrayGroup = [[operator, 6533]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return false', () => {
        const value = 300;
        const validatorArrayGroup = [[operator, 200]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[>] validator', () => {
      const operator = '>';

      it('should return true', () => {
        const value = 10e5;
        const validatorArrayGroup = [[operator, 256]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = 34.12;
        const validatorArrayGroup = [[operator, 34.12]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return false', () => {
        const value = -Infinity;
        const validatorArrayGroup = [[operator, Infinity]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[=] validator', () => {
      const operator = '=';

      it('should return true', () => {
        const value = 612;
        const validatorArrayGroup = [[operator, 612]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = 1312;
        const validatorArrayGroup = [[operator, 24134]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return false', () => {
        const value = 10e2;
        const validatorArrayGroup = [[operator, 10e7]];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });
  });

  describe('Groups', () => {
    it('should return true', () => {
      const value = 340;
      const validatorArrayGroup = [['<', 10e7], ['>', 100], ['=', 340]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
    });

    it('should return false', () => {
      const value = 44.3012;
      const validatorArrayGroup = [['>', 70], ['<', 30], ['=', 111], ['=', 222]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('should return false', () => {
      const value = 100;
      const validatorArrayGroup = [['>', 70], ['=', 50]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('should return true (validateSome)', () => {
      const value = 5423;
      const validatorArrayGroup = [['<', 95], ['>', 1420], ['<=', 123]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeTruthy();
    });

    it('should return false (validateSome)', () => {
      const value = 132;
      const validatorArrayGroup = [['=>', 1000], ['<=', 100]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeFalsy();
    });

    it('should return false (validateSome)', () => {
      const value = 132;
      const validatorArrayGroup = [['=>', 1000], ['<=', 100]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeFalsy();
    });

    it('should return false (validateSome, malformed validatorArrayGroup)', () => {
      const value = 132;
      const validatorArrayGroup = [['<', 1000], ['string', 'string']];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeFalsy();
    });
  });
});
