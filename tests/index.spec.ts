// @ts-nocheck
import HandyValidator from '../src/index';
import numberValidator from '../src/validators/number/number';
import errors from '../src/index.errors';

describe('Core base tests', () => {
  describe('constructor()', () => {
    it('Default value - should load built-in validator', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.checkValidator('string')).toBeTruthy();
    });

    it('True passed - should load built-in validator', () => {
      const HandyVal = new HandyValidator(true);
      expect(HandyVal.checkValidator('string')).toBeTruthy();
    });

    it('False passed - should not load built-in validator', () => {
      const HandyVal = new HandyValidator(false);
      expect(HandyVal.checkValidator('string')).toBeFalsy();
    });
  });

  describe('addValidator()', () => {
    it('String not passed - should throw addValidator.nameNotString', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addValidator(123, numberValidator);
      }).toThrow(errors.addValidator.nameNotString);
    });

    it('Empty string passed - should throw addValidator.nameEmpty', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addValidator('', numberValidator);
      }).toThrow(errors.addValidator.nameEmpty);
    });

    it('Invalid callback passed - should throw addValidator.callbackNotFunction', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addValidator('number2', 123);
      }).toThrow(errors.addValidator.callbackNotFunction);
    });

    it('Validator is already loaded - should throw addValidator.alreadyLoaded', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addValidator('string', numberValidator);
      }).toThrow(errors.addValidator.alreadyLoaded);
    });

    it('Validator added - should return true', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.addValidator('number2', numberValidator)).toBeTruthy();
    });
  });

  describe('removeValidator()', () => {
    it('String not passed - should throw removeValidator.nameNotString', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.removeValidator(123);
      }).toThrow(errors.removeValidator.nameNotString);
    });

    it('Empty string passed - should throw removeValidator.nameEmpty', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.removeValidator('');
      }).toThrow(errors.removeValidator.nameEmpty);
    });

    it('Validator undefined - should throw removeValidator.validatorNotDefined', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.removeValidator('UKN_VALIDSS');
      }).toThrow(errors.removeValidator.validatorNotDefined);
    });

    it('Validator removed - should return true', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.removeValidator('array')).toBeTruthy();
    });
  });

  describe('checkValidator()', () => {
    it('Defined validator - should return true', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.checkValidator('string')).toBeTruthy();
    });

    it('Undefined validator - should return false', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.checkValidator('UNKNOWN_VALIDATOR_2')).toBeFalsy();
    });
  });

  describe('getValidator()', () => {
    it('Defined validator - should return function', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.getValidator('number')).toEqual(numberValidator);
    });

    it('Undefined validator - should return false', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.getValidator('UNKNOWN_VALIDATOR')).toBeFalsy();
    });
  });

  describe('validate()', () => {
    it('Should validate null', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.validate('null', null)).toBeTruthy();
      expect(HandyVal.validate('null', 123)).toBeFalsy();
    });
  });
});
