// @ts-nocheck
import HandyValidator from '../../../src/index';
import stringErrors from '../../../src/validators/string/string.errors';

describe('String validator tests', () => {
  let HandyVal: HandyValidator;
  const validator = 'string';

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  describe('Type validator', () => {
    it('should return false if passed value is a Boolean', () => {
      const value = true;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Null', () => {
      const value = null;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Undefined', () => {
      const value = undefined;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Number', () => {
      const value = 1;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a NaN', () => {
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return true if passed value is a String', () => {
      const value = '';
      expect(HandyVal.validate(validator, value)).toEqual(true);
    });

    it('should return false if passed value is a Symbol', () => {
      const value = Symbol('Symbol description');
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Object', () => {
      const value = {};
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Function returning string', () => {
      const value = () => 'This is my string';
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Array', () => {
      const value = [];
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });
  });

  describe('Console.error try..catch test', () => {
    let HandyValidatorResult: boolean;
    let jestSpy: jest.SpyInstance;

    beforeAll(() => {
      jestSpy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const value = 'This is my string';
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
      const validationArguments = [['=', 'This is not my string']];
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
    describe('[=] validator', () => {
      const operator = '=';

      it('should return true if value is "This is my string" and is validated against "This is my string"', () => {
        const value = 'This is my string';
        const validationArguments = [[operator, 'This is my string']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if value is "我的中文不好" and is validated against "我的中文不好"', () => {
        const value = '我的中文不好';
        const validationArguments = [[operator, '我的中文不好']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if value is "我的中文不好" and is validated against "\u6211\u7684\u4E2D\u6587\u4E0D\u597D" [Unicode]', () => {
        const value = '我的中文不好';
        const validationArguments = [[operator, '\u6211\u7684\u4E2D\u6587\u4E0D\u597D']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if value is "我的中文不好" and is validated against "我的中文很好"', () => {
        const value = '我的中文不好';
        const validationArguments = [[operator, '我的中文很好']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if value is "That\'s cool" and is validated against "That\'s not cool"', () => {
        const value = 'That\'s cool';
        const validationArguments = [[operator, 'That\'s not cool']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[!=] validator', () => {
      const operator = '!=';

      it('should return false if value is "This is my string" and is validated against "This is my string"', () => {
        const value = 'This is my string';
        const validationArguments = [[operator, 'This is my string']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if value is "我的中文不好" and is validated against "我的中文不好"', () => {
        const value = '我的中文不好';
        const validationArguments = [[operator, '我的中文不好']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if value is "我的中文不好" and is validated against "\u6211\u7684\u4E2D\u6587\u4E0D\u597D" [Unicode]', () => {
        const value = '我的中文不好';
        const validationArguments = [[operator, '\u6211\u7684\u4E2D\u6587\u4E0D\u597D']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if value is "我的中文不好" and is validated against "我的中文很好"', () => {
        const value = '我的中文不好';
        const validationArguments = [[operator, '我的中文很好']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if value is "That\'s cool" and is validated against "That\'s not cool"', () => {
        const value = 'That\'s cool';
        const validationArguments = [[operator, 'That\'s not cool']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });
    });

    describe('[~] validator', () => {
      const operator = '~';

      it('should return true if value is "This is my string" and is validated against "my str"', () => {
        const value = 'This is my string';
        const validationArguments = [[operator, 'my str']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if value is "This is my string" and is validated against "my rts"', () => {
        const value = 'This is my string';
        const validationArguments = [[operator, 'my rts']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[!~] validator', () => {
      const operator = '!~';

      it('should return false if value is "This is my string" and is validated against "my str"', () => {
        const value = 'This is my string';
        const validationArguments = [[operator, 'my str']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if value is "This is my string" and is validated against "my rts"', () => {
        const value = 'This is my string';
        const validationArguments = [[operator, 'my rts']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });
    });

    describe('[^] validator', () => {
      const operator = '^';

      it('should return true if value is "This is my string!" and is validated against "This is"', () => {
        const value = 'This is my string!';
        const validationArguments = [[operator, 'This is']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if value is "This is my string!" and is validated against "This not"', () => {
        const value = 'This is my string!';
        const validationArguments = [[operator, 'This not']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[!^] validator', () => {
      const operator = '!^';

      it('should return false if value is "This is my string!" and is validated against "This is"', () => {
        const value = 'This is my string!';
        const validationArguments = [[operator, 'This is']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if value is "This is my string!" and is validated against "This not"', () => {
        const value = 'This is my string!';
        const validationArguments = [[operator, 'This not']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });
    });

    describe('[$] validator', () => {
      const operator = '$';

      it('should return true if value is "This is my string!" and is validated against "my string!"', () => {
        const value = 'This is my string!';
        const validationArguments = [[operator, 'my string!']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if value is "This is my string!" and is validated against "not string!"', () => {
        const value = 'This is my string!';
        const validationArguments = [[operator, 'not string!']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if value is "hello" and is validated against "helllo" [-1 / length test]', () => {
        const value = 'hello';
        const validationArguments = [[operator, 'helllo']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[!$] validator', () => {
      const operator = '!$';

      it('should return false if value is "This is my string!" and is validated against "my string!"', () => {
        const value = 'This is my string!';
        const validationArguments = [[operator, 'my string!']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if value is "This is my string!" and is validated against "not string!"', () => {
        const value = 'This is my string!';
        const validationArguments = [[operator, 'not string!']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if value is "hello" and is validated against "helllo" [-1 / length test]', () => {
        const value = 'hello';
        const validationArguments = [[operator, 'helllo']];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });
    });
  });

  describe('Groups', () => {

  });
});
