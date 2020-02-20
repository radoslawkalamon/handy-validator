// @ts-nocheck
import HandyValidator from '../../../src/index';
import equalToErrors from '../../../src/validators/equalTo/equalTo.errors';

describe('equalTo validator tests', () => {
  let HandyVal: HandyValidator;

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  describe('arrayOfElementsNotAnArray Error', () => {
    let HandyValidatorResult: boolean;
    let jestSpy: jest.SpyInstance;

    beforeAll(() => {
      jestSpy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      const validator = 'equalTo';
      const value = 'Value';
      const validationArguments = 'Hemlo!';
      // @ts-ignore
      HandyValidatorResult = HandyVal.validate(validator, value, validationArguments);
    });

    it('should Handy Validator Result be false', () => {
      expect(HandyValidatorResult).toEqual(false);
    });

    it('should call console.error once', () => {
      expect(jestSpy.mock.calls.length).toBe(1);
    });

    it('should console.error message be validatorArrayGroupNotAnArray', () => {
      const mockError = new Error(equalToErrors.arrayOfElementsNotAnArray);
      expect(jestSpy.mock.calls[0][0]).toEqual(mockError);
    });

    afterAll(() => {
      jestSpy.mockRestore();
    });
  });

  describe('Validator tests', () => {
    it('should return true if passed value is equal to one of validationArguments Array', () => {
      const validator = 'equalTo';
      const value = 'Good_value';
      const validationArguments = ['Good_value', 'Bad_Value'];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
    });

    it('should return true if NaN is equal to one of validationArguments Array', () => {
      const validator = 'equalTo';
      const value = NaN;
      const validationArguments = ['Good_value', NaN, 'Bad_Value'];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
    });

    it('should return false if passed value is not equal to one of validationArguments Array', () => {
      const validator = 'equalTo';
      const value = 'Good_value';
      const validationArguments = ['Bad_value_1', 'Bad_value_2', NaN];
      expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
    });

    it('should return false if no validationArguments passed', () => {
      const validator = 'equalTo';
      const value = 'Good_value';
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });
  });
});
