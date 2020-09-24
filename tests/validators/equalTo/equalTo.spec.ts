// @ts-nocheck
import { HandyValidator } from '../../../src/HandyValidator';
import { EqualToValidator } from '../../../src/validators/equalTo';

describe('equalTo validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'equalTo';

  beforeEach(() => {
    HandyVal = new HandyValidator();
  });

  describe('elementsNotAnArray Error', () => {
    it('should throw error', () => {
      expect(() => {
        const value = 'Good_value';
        const validationArguments = 123;
        HandyVal.validate(validator, value, validationArguments);
      }).toThrow(EqualToValidator.errors.elementsNotAnArray);
    });
  });

  describe('Validator tests', () => {
    it('should return true', () => {
      const value = 'Good_value';
      const validationArguments = ['Good_value', 'Bad_Value'];
      expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
    });

    it('should return true', () => {
      const value = NaN;
      const validationArguments = ['Good_value', NaN, 'Bad_Value'];
      expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
    });

    it('should return false', () => {
      const value = 'Good_value';
      const validationArguments = ['Bad_value_1', 'Bad_value_2', NaN];
      expect(HandyVal.validate(validator, value, validationArguments)).toBeFalsy();
    });

    it('should return false', () => {
      const value = 'Good_value';
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });
  });
});
