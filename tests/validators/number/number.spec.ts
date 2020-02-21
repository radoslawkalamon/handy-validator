// @ts-nocheck
import HandyValidator from '../../../src/index';
import numberErrors from '../../../src/validators/number/number.errors';

describe('Number validator tests', () => {
  let HandyVal: HandyValidator;

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  describe('Type validator', () => {
    it('should return false if passed value is a Boolean', () => {
      const validator = 'number';
      const value = true;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Null', () => {
      const validator = 'number';
      const value = null;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Undefined', () => {
      const validator = 'number';
      const value = undefined;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return true if passed value is a Number', () => {
      const validator = 'number';
      const value = 1;
      expect(HandyVal.validate(validator, value)).toEqual(true);
    });

    it('should return true if passed value is a NaN', () => {
      const validator = 'number';
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toEqual(true);
    });

    it('should return false if passed value is a String', () => {
      const validator = 'number';
      const value = '';
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Symbol', () => {
      const validator = 'number';
      const value = Symbol('Symbol description');
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Object', () => {
      const validator = 'number';
      const value = {};
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Function returning number', () => {
      const validator = 'number';
      const value = () => 3;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Array', () => {
      const validator = 'number';
      const value = [];
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });
  });

  describe('validatorArrayGroup problems', () => {
    it('Malformed validatorArrayGroup - not an array', () => {
      const validator = 'number';
      const value = 34.20;
      const validationArguments = 'Hemlo!';
      // @ts-ignore
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
    });

    it('Malformed validatorArrayItem - not an array', () => {
      const validator = 'number';
      const value = 122;
      const validationArguments = [null];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
    });

    it('Malformed validatorArrayItem - bad length', () => {
      const validator = 'number';
      const value = 122;
      const validationArguments = [[1, 2, 3]];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
    });

    it('Malformed validatorArrayItem - bad types', () => {
      const validator = 'number';
      const value = 122;
      const validationArguments = [[323, '<=']];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
    });

    it('Malformed validatorArrayItem - bad types one of from group', () => {
      const validator = 'number';
      const value = 122;
      const validationArguments = [[323, '<='], [12, 12]];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
    });
  });

  describe('Console.error try..catch test', () => {
    let HandyValidatorResult: boolean;
    let jestSpy: jest.SpyInstance;

    beforeAll(() => {
      jestSpy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const validator = 'number';
      const value = 34.20;
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

      const validator = 'number';
      const value = 34.20;
      const validationArguments = [['<', 10.22]];
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
    describe('[>=] validator', () => {
      it('should return true if value is 34.20 and is validated against 10.22', () => {
        const validator = 'number';
        const value = 34.20;
        const validationArguments = [['>=', 10.22]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if value is 367 and is validated against 367', () => {
        const validator = 'number';
        const value = 367;
        const validationArguments = [['>=', 367]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if value is 112.22 and is validated against 654.22', () => {
        const validator = 'number';
        const value = 112.22;
        const validationArguments = [['>=', 654.22]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[<=] validator', () => {
      it('should return true if value is 31.20 and is validated against 4443.22', () => {
        const validator = 'number';
        const value = 31.20;
        const validationArguments = [['<=', 4443.22]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if value is 111 and is validated against 111', () => {
        const validator = 'number';
        const value = 111;
        const validationArguments = [['<=', 111]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if value is 979653.11323213 and is validated against 979653', () => {
        const validator = 'number';
        const value = 979653.11323213;
        const validationArguments = [['<=', 5123]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[<] validator', () => {
      it('should return true if value is 11.22 and is validated against 22.333', () => {
        const validator = 'number';
        const value = 11.22;
        const validationArguments = [['<', 22.333]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if value is 6533 and is validated against 6533', () => {
        const validator = 'number';
        const value = 6533;
        const validationArguments = [['<', 6533]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if value is 300 and is validated against 200', () => {
        const validator = 'number';
        const value = 300;
        const validationArguments = [['<', 200]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[>] validator', () => {
      it('should return true if value is 10e5 and is validated against 256', () => {
        const validator = 'number';
        const value = 10e5;
        const validationArguments = [['>', 256]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if value is 34.12 and is validated against 34.12', () => {
        const validator = 'number';
        const value = 34.12;
        const validationArguments = [['>', 34.12]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if value is -Infinity and is validated against -Infinity', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['>', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[=] validator', () => {
      it('should return true if value is 612 and is validated against 612', () => {
        const validator = 'number';
        const value = 612;
        const validationArguments = [['=', 612]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if value is 1312 and is validated against 24134', () => {
        const validator = 'number';
        const value = 1312;
        const validationArguments = [['=', 24134]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if value is 10e2 and is validated against 10e7', () => {
        const validator = 'number';
        const value = 10e2;
        const validationArguments = [['=', 10e7]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });
  });

  describe('Groups', () => {
    it('should return true if value is 340 and is validated against <10e7, >100, =340', () => {
      const validator = 'number';
      const value = 340;
      const validationArguments = [['<', 10e7], ['>', 100], ['=', 340]];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
    });

    it('should return false if value is 44.3012 and is validated against >70, <30, =111, =222', () => {
      const validator = 'number';
      const value = 44.3012;
      const validationArguments = [['>', 70], ['<', 30], ['=', 111], ['=', 222]];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
    });

    it('should return false if value is 100 and is validated against >70, =50', () => {
      const validator = 'number';
      const value = 100;
      const validationArguments = [['>', 70], ['=', 50]];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
    });

    it('should return true if value is 5423 and is validated against <95, >1420, <=123', () => {
      const validator = 'number';
      const value = 5423;
      const validationArguments = [['<', 95], ['>', 1420], ['<=', 123]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validationArguments, validateSome)).toEqual(true);
    });

    it('should return false if value is 132 and is validated against =>1000, <=100', () => {
      const validator = 'number';
      const value = 132;
      const validationArguments = [['=>', 1000], ['<=', 100]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validationArguments, validateSome)).toEqual(false);
    });

    it('should return false if value is 132 and is validated against =>1000, <=100', () => {
      const validator = 'number';
      const value = 132;
      const validationArguments = [['=>', 1000], ['<=', 100]];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validationArguments, validateSome)).toEqual(false);
    });

    it('should return false if value is 132 and is validated against <1000 and malformed validator', () => {
      const validator = 'number';
      const value = 132;
      const validationArguments = [['<', 1000], ['string', 'string']];
      const validateSome = true;
      expect(HandyVal.validate(validator, value, validationArguments, validateSome)).toEqual(false);
    });
  });
});
