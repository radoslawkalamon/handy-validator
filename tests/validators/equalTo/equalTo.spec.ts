import HandyValidator from '../../../src/index';

let HandyVal: HandyValidator;

beforeAll(() => {
  HandyVal = new HandyValidator();
});

describe('equalTo validator tests', () => {
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
