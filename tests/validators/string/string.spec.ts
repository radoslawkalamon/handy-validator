// @ts-nocheck
import HandyValidator from '../../../src/index';
import stringErrors from '../../../src/validators/string/string.errors';

describe('String validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'string';

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

    it('Number passed - should return false', () => {
      const value = 1;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('NaN passed - should return false', () => {
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('String passed - should return true', () => {
      const value = '';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('Symbol passed - should return false', () => {
      const value = Symbol('Symbol description');
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Object passed - should return false', () => {
      const value = {};
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Function returning String passed - should return false', () => {
      const value = () => 'This is my string';
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Array passed - should return false', () => {
      const value = [];
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });
  });

  describe('validatorArrayGroup problems', () => {
    it('validatorArrayGroup is not an Array - should return false', () => {
      const value = 'My string!';
      const validatorArrayGroup = 213;
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray is not an Array - should throw itemNotAnArray', () => {
      const value = 'My string!';
      const validatorArrayGroup = [['=', 'string'], 'str'];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray length is not equal to operator function args length - should throw itemLengthError', () => {
      const value = 'My string!';
      const validatorArrayGroup = [['!=', 123, 123], ['$', 123]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray types is not equal to string - should throw itemTypesError', () => {
      const value = 'My string!';
      const validatorArrayGroup = [['=', '<'], ['$', {}]];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('validatorArray have unknown operator - should throw unknownOperator', () => {
      const value = 'My string!';
      const validatorArrayGroup = [[null, 'Hello']];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });
  });

  describe('Console.error try..catch test', () => {
    let HandyValidatorResult: boolean;
    let jestSpy: jest.SpyInstance;

    beforeAll(() => {
      jestSpy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const value = 'This is my string';
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
      const mockError = new Error(stringErrors.unknownOperator);
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

      const value = 'This is my string';
      const validatorArrayGroup = [['=', 'This is not my string']];
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
        const value = 'This is my string';
        const validatorArrayGroup = [[operator, 'This is my string']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return true', () => {
        const value = '我的中文不好';
        const validatorArrayGroup = [[operator, '我的中文不好']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return true [Unicode]', () => {
        const value = '我的中文不好';
        const validatorArrayGroup = [[operator, '\u6211\u7684\u4E2D\u6587\u4E0D\u597D']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = '我的中文不好';
        const validatorArrayGroup = [[operator, '我的中文很好']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return false', () => {
        const value = 'That\'s cool';
        const validatorArrayGroup = [[operator, 'That\'s not cool']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[!=] validator', () => {
      const operator = '!=';

      it('should return false', () => {
        const value = 'This is my string';
        const validatorArrayGroup = [[operator, 'This is my string']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return false', () => {
        const value = '我的中文不好';
        const validatorArrayGroup = [[operator, '我的中文不好']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return false [Unicode]', () => {
        const value = '我的中文不好';
        const validatorArrayGroup = [[operator, '\u6211\u7684\u4E2D\u6587\u4E0D\u597D']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return true', () => {
        const value = '我的中文不好';
        const validatorArrayGroup = [[operator, '我的中文很好']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return true', () => {
        const value = 'That\'s cool';
        const validatorArrayGroup = [[operator, 'That\'s not cool']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });
    });

    describe('[~] validator', () => {
      const operator = '~';

      it('should return true', () => {
        const value = 'This is my string';
        const validatorArrayGroup = [[operator, 'my str']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = 'This is my string';
        const validatorArrayGroup = [[operator, 'my rts']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[!~] validator', () => {
      const operator = '!~';

      it('should return false', () => {
        const value = 'This is my string';
        const validatorArrayGroup = [[operator, 'my str']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return true', () => {
        const value = 'This is my string';
        const validatorArrayGroup = [[operator, 'my rts']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });
    });

    describe('[^] validator', () => {
      const operator = '^';

      it('should return true', () => {
        const value = 'This is my string!';
        const validatorArrayGroup = [[operator, 'This is']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = 'This is my string!';
        const validatorArrayGroup = [[operator, 'This not']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });

    describe('[!^] validator', () => {
      const operator = '!^';

      it('should return false', () => {
        const value = 'This is my string!';
        const validatorArrayGroup = [[operator, 'This is']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return true', () => {
        const value = 'This is my string!';
        const validatorArrayGroup = [[operator, 'This not']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });
    });

    describe('[$] validator', () => {
      const operator = '$';

      it('should return true', () => {
        const value = 'This is my string!';
        const validatorArrayGroup = [[operator, 'my string!']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false', () => {
        const value = 'This is my string!';
        const validatorArrayGroup = [[operator, 'not string!']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return false [-1 / length test]', () => {
        const value = 'hello';
        const validatorArrayGroup = [[operator, 'helllo']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return true [2 planets tests]', () => {
        const value = 'Hello planet earth, you are a great planet';
        const validatorArrayGroup = [[operator, 'planet']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });
    });

    describe('[!$] validator', () => {
      const operator = '!$';

      it('should return false', () => {
        const value = 'This is my string!';
        const validatorArrayGroup = [[operator, 'my string!']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });

      it('should return true', () => {
        const value = 'This is my string!';
        const validatorArrayGroup = [[operator, 'not string!']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return true [-1 / length test]', () => {
        const value = 'hello';
        const validatorArrayGroup = [[operator, 'helllo']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
      });

      it('should return false [2 planets tests]', () => {
        const value = 'Hello planet earth, you are a great planet';
        const validatorArrayGroup = [[operator, 'planet']];
        expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
      });
    });
  });

  describe('Groups', () => {
    it('should return true', () => {
      const value = 'Hello';
      const validatorArrayGroup = [['=', 'Hello'], ['!=', 'Bye'], ['~', 'ell']];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
    });

    it('should return true', () => {
      const value = 'This is very tasty string!';
      const validatorArrayGroup = [['^', 'This is'], ['$', 'string!'], ['!~', 'big tasty']];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeTruthy();
    });

    it('should return false', () => {
      const value = 'This is very tasty string!';
      const validatorArrayGroup = [['$', 'This is'], ['^', 'string!'], ['~', 'big tasty']];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('should return false (malformed validatorArrayGroup)', () => {
      const value = 'This is very tasty string!';
      const validatorArrayGroup = [['$', 'This is'], ['^', null], ['~', 'tasty']];
      expect(HandyVal.validate(validator, value, validatorArrayGroup)).toBeFalsy();
    });

    it('should return true (validateSome)', () => {
      const value = 'This is very tasty string!';
      const validatorArrayGroup = [['$', 'This is'], ['~', 'tasty']];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeTruthy();
    });

    it('should return false (validateSome)', () => {
      const value = 'This is very tasty string!';
      const validatorArrayGroup = [['$', 'This not'], ['!~', 'tasty']];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeFalsy();
    });

    it('should return false (validateSome, malformed validatorArrayGroup)', () => {
      const value = 'This is very tasty string!';
      const validatorArrayGroup = [['$', 'This is'], ['~', 123]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validatorArrayGroup, validateSome)).toBeFalsy();
    });
  });
});
