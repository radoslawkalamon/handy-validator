// @ts-nocheck
import { HandyValidator } from '../../../src/HandyValidator';
import { ArrayValidator } from '../../../src/validators/array';

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

  describe('validationRules problems', () => {
    it('validationRules is not an Array - should throw error', () => {
      expect(() => {
        const value = [1, 2, 3];
        const validationRules = [['<', 123], 'str'];
        HandyVal.validate(validator, value, ...validationRules);
      }).toThrow(ArrayValidator.errors.validationRuleNotArray);
    });

    it('validationRules unknown operator - should throw error', () => {
      expect(() => {
        const value = [1, 2, 3];
        const validationRules = [[123, '<'], [undefined, {}]];
        HandyVal.validate(validator, value, ...validationRules);
      }).toThrow(ArrayValidator.errors.validationRuleUnknownOperator);
    });

    it('validationRules length is not equal to operator function args length - should throw error', () => {
      expect(() => {
        const value = [1, 2, 3];
        const validationRules = [['>', 123, 123], ['<', 123]];
        HandyVal.validate(validator, value, ...validationRules);
      }).toThrow(ArrayValidator.errors.validationRuleLengthInvalid);
    });

    it('validationRules not integer - should throw error', () => {
      expect(() => {
        const value = [1, 2, 3];
        const validationRules = [['<', 63.554]];
        HandyVal.validate(validator, value, ...validationRules);
      }).toThrow(ArrayValidator.errors.validationRuleTypesError);
    });
  });

  describe('Value validators', () => {
    describe('[=] validator', () => {
      const operator = '=';

      it('should return true', () => {
        const value = [1, 2, 3];
        const validationRules = [[operator, 3]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 2, 3, 4];
        const validationRules = [[operator, 8]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeFalsy();
      });
    });

    describe('[>] validator', () => {
      const operator = '>';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationRules = [[operator, 2]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 'string', null, undefined];
        const validationRules = [[operator, 12]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeFalsy();
      });
    });

    describe('[>=] validator', () => {
      const operator = '>=';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationRules = [[operator, 6]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeTruthy();
      });

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationRules = [[operator, 2]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 'string', null, undefined];
        const validationRules = [[operator, 12]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeFalsy();
      });
    });

    describe('[<] validator', () => {
      const operator = '<';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationRules = [[operator, 12]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationRules = [[operator, 5]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeFalsy();
      });
    });

    describe('[<=] validator', () => {
      const operator = '<=';

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationRules = [[operator, 12]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeTruthy();
      });

      it('should return true', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationRules = [[operator, 6]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeTruthy();
      });

      it('should return false', () => {
        const value = [1, 2, 3, undefined, 12, 333];
        const validationRules = [[operator, 5]];
        expect(HandyVal.validate(validator, value, ...validationRules)).toBeFalsy();
      });
    });
  });

  describe('Groups', () => {
    it('should return true', () => {
      const value = [1, 2, 3, undefined, 12, 333];
      const validationRules = [['>', 5], ['<', 10], ['=', 6]];
      expect(HandyVal.validate(validator, value, ...validationRules)).toBeTruthy();
    });

    it('should return false', () => {
      const value = [1, 'string', null, undefined];
      const validationRules = [['>', 5], ['<', 10], ['=', 6]];
      expect(HandyVal.validate(validator, value, ...validationRules)).toBeFalsy();
    });
  });
});
