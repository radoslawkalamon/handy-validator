import checkValidatorArrays from '../../../src/validators/number/number.checkvalidatorarray';
import NumberErrors from '../../../src/validators/number/number.errors';

describe('Number checkValidatorArrays tests', () => {
  it('should throw validatorArrayNotAnArray if argument is not an Array', () => {
    expect(() => {
      const value = 213;
      checkValidatorArrays(value);
    }).toThrow(NumberErrors.validatorArrayNotAnArray);
  });

  it('should throw validatorArrayLengthError if argument is not 2-elements Array', () => {
    expect(() => {
      const value = [1, null, undefined];
      checkValidatorArrays(value);
    }).toThrow(NumberErrors.validatorArrayLengthError);
  });

  it('should throw validatorArrayItemError if argument is 2-elements [non-string, non-number] Array', () => {
    expect(() => {
      const value = [undefined, null];
      checkValidatorArrays(value);
    }).toThrow(NumberErrors.validatorArrayItemError);
  });

  it('should throw validatorArrayItemError if argument is 2-elements [number, string] Array', () => {
    expect(() => {
      const value = [333, 'string'];
      checkValidatorArrays(value);
    }).toThrow(NumberErrors.validatorArrayItemError);
  });

  it('should return array with string and number', () => {
    const value = ['string', 333];
    expect(checkValidatorArrays(value)).toEqual(value);
  });
});
