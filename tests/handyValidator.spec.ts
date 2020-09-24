// @ts-nocheck
import HandyValidator from '../src/handyValidator';
import UndefinedValidator from '../src/validators/undefined';
import errors from '../src/handyValidator.errors';

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
    it('String not passed - should throw addPlugin.nameInvalid', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addPlugin(123, new UndefinedValidator());
      }).toThrow(errors.addPlugin.nameInvalid);
    });

    it('Empty string passed - should throw addPlugin.nameInvalid', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addPlugin('', new UndefinedValidator());
      }).toThrow(errors.addPlugin.nameInvalid);
    });

    it('Invalid callback passed - should throw addPlugin.pluginInvalid', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addPlugin('number2', 123);
      }).toThrow(errors.addPlugin.pluginInvalid);
    });

    it('Validator is already loaded - should throw addPlugin.pluginAlreadyLoaded', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.addPlugin('undefined', new UndefinedValidator());
      }).toThrow(errors.addPlugin.pluginAlreadyLoaded);
    });

    it('Validator added - should return void', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.addPlugin('undefined_2', new UndefinedValidator())).toBeUndefined();
    });
  });

  describe('removePlugin()', () => {
    it('String not passed - should throw removePlugin.nameInvalid', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.removePlugin(123);
      }).toThrow(errors.removePlugin.nameInvalid);
    });

    it('Empty string passed - should throw removePlugin.nameInvalid', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.removePlugin('');
      }).toThrow(errors.removePlugin.nameInvalid);
    });

    it('Validator undefined - should throw removePlugin.pluginUndefined', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.removePlugin('UKN_VALIDSS');
      }).toThrow(errors.removePlugin.pluginUndefined);
    });

    it('Validator removed - should return void', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.removePlugin('undefined')).toBeUndefined();
    });
  });

  describe('validate()', () => {
    it('Should throw error if undefined validator used', () => {
      expect(() => {
        const HandyVal = new HandyValidator();
        HandyVal.validate('null', 123);
      }).toThrow(errors.validate.pluginUndefined);
    });

    it('Should validate undefined', () => {
      const HandyVal = new HandyValidator();
      expect(HandyVal.validate('undefined', undefined)).toBeTruthy();
      expect(HandyVal.validate('undefined', 123)).toBeFalsy();
    });
  });
});
