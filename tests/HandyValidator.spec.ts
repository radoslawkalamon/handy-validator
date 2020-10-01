// @ts-nocheck
import { HandyValidator } from '@src/HandyValidator';
import { UndefinedValidator } from '@validators/undefined';

describe.only('Core base tests', () => {
  describe('constructor()', () => {
    it('Default value - should load built-in validator', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.isPluginLoaded('undefined')).toBeTruthy();
    });

    it('True passed - should load built-in validator', () => {
      const HandyVal = new HandyValidator(true);
      expect(HandyVal.isPluginLoaded('undefined')).toBeTruthy();
    });

    it('False passed - should not load built-in validator', () => {
      const HandyVal = new HandyValidator(false);
      expect(HandyVal.isPluginLoaded('undefined')).toBeFalsy();
    });
  });

  describe('addPlugin()', () => {
    let HandyVal: HandyValidator;
    beforeEach(() => {
      HandyVal = new HandyValidator();
    });

    it('String not passed - should throw addPlugin.nameInvalid', () => {
      expect(() => {
        HandyVal.addPlugin(123, new UndefinedValidator());
      }).toThrow(HandyValidator.errors.addPlugin.nameInvalid);
    });

    it('Empty string passed - should throw addPlugin.nameInvalid', () => {
      expect(() => {
        HandyVal.addPlugin('', new UndefinedValidator());
      }).toThrow(HandyValidator.errors.addPlugin.nameInvalid);
    });

    it('Invalid callback passed - should throw addPlugin.pluginInvalid', () => {
      expect(() => {
        HandyVal.addPlugin('number2', 123);
      }).toThrow(HandyValidator.errors.addPlugin.pluginInvalid);
    });

    it('Validator is already loaded - should throw addPlugin.pluginAlreadyLoaded', () => {
      expect(() => {
        HandyVal.addPlugin('undefined', new UndefinedValidator());
      }).toThrow(HandyValidator.errors.addPlugin.pluginAlreadyLoaded);
    });

    it('Validator added - should return void', () => {
      expect(HandyVal.addPlugin('undefined_2', new UndefinedValidator())).toBeUndefined();
    });
  });

  describe('removePlugin()', () => {
    let HandyVal: HandyValidator;
    beforeEach(() => {
      HandyVal = new HandyValidator();
    });

    it('String not passed - should throw removePlugin.nameInvalid', () => {
      expect(() => {
        HandyVal.removePlugin(123);
      }).toThrow(HandyValidator.errors.removePlugin.nameInvalid);
    });

    it('Empty string passed - should throw removePlugin.nameInvalid', () => {
      expect(() => {
        HandyVal.removePlugin('');
      }).toThrow(HandyValidator.errors.removePlugin.nameInvalid);
    });

    it('Validator undefined - should throw removePlugin.pluginUndefined', () => {
      expect(() => {
        HandyVal.removePlugin('UKN_VALIDSS');
      }).toThrow(HandyValidator.errors.removePlugin.pluginUndefined);
    });

    it('Validator removed - should return void', () => {
      expect(HandyVal.removePlugin('undefined')).toBeUndefined();
    });
  });

  describe('validate()', () => {
    let HandyVal: HandyValidator;
    beforeEach(() => {
      HandyVal = new HandyValidator();
    });

    it('Should throw error if undefined validator used', () => {
      expect(() => {
        HandyVal.validate('UNDEFINED_VALIDATOR', 123);
      }).toThrow(HandyValidator.errors.validate.pluginUndefined);
    });

    it('Should validate undefined', () => {
      expect(HandyVal.validate('undefined', undefined)).toBeTruthy();
      expect(HandyVal.validate('undefined', 123)).toBeFalsy();
    });
  });
});
