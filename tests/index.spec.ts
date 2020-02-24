// @ts-nocheck
import HandyValidator from '../src/index';
import numberValidator from '../src/validators/number/number';
import errors from '../src/index.errors';

describe('Core base tests', () => {
  describe('constructor()', () => {
    it('should load built-in validator (default value)', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.checkValidator('string')).toBeTruthy();
    });

    it('should load built-in validator if true passed', () => {
      const HandyVal = new HandyValidator(true);
      expect(HandyVal.checkValidator('string')).toBeTruthy();
    });

    it('should not load built-in validator if false passed', () => {
      const HandyVal = new HandyValidator(false);
      expect(HandyVal.checkValidator('string')).toBeFalsy();
    });
  });

  describe('addValidator()', () => {
    it('should throw addValidator.nameNotString if not string passed', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addValidator(123, numberValidator);
      }).toThrow(errors.addValidator.nameNotString);
    });

    it('should throw addValidator.nameEmpty if empty string passed', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addValidator('', numberValidator);
      }).toThrow(errors.addValidator.nameEmpty);
    });

    it('should throw addValidator.callbackNotFunction if validator have not valid callback', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addValidator('number2', 123);
      }).toThrow(errors.addValidator.callbackNotFunction);
    });

    it('should throw addValidator.callbackNotFunction if validator is already loaded', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addValidator('string', numberValidator);
      }).toThrow(errors.addValidator.alreadyLoaded);
    });

    it('should return true after add number validator', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.addValidator('number2', numberValidator)).toBeTruthy();
    });
  });

  describe('removeValidator()', () => {
    it('should throw removeValidator.nameNotString if not string passed', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.removeValidator(123);
      }).toThrow(errors.removeValidator.nameNotString);
    });

    it('should throw removeValidator.nameEmpty if empty string passed', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.removeValidator('');
      }).toThrow(errors.removeValidator.nameEmpty);
    });

    it('should throw removeValidator.validatorNotDefined if validator is not defined', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.removeValidator('UKN_VALIDSS');
      }).toThrow(errors.removeValidator.validatorNotDefined);
    });

    it('should return true after removing array validator', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.removeValidator('array')).toBeTruthy();
    });
  });

  describe('checkValidator()', () => {
    it('should return false if asked for string validator', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.checkValidator('string')).toBeTruthy();
    });

    it('should return false if asked for unknown validator', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.checkValidator('UNKNOWN_VALIDATOR_2')).toBeFalsy();
    });
  });

  describe('getValidator()', () => {
    it('should return number validator', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.getValidator('number')).toEqual(numberValidator);
    });

    it('should return false if for unknown validator asked', () => {
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
