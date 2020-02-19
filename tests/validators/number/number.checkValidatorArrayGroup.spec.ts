import checkValidatorArraysGroup from '../../../src/validators/number/number.checkValidatorArrayGroup';
import operators from '../../../src/validators/number/number.operators';
import errors from '../../../src/validators/number/number.errors';

describe('CheckValidatorArrayGroup tests', () => {
  it('should throw parentNotAnArray if validatorArrayGroup is not an Array', () => {
    expect(() => {
      const validatorArrayGroup = 213;
      // @ts-ignore
      checkValidatorArraysGroup(validatorArrayGroup);
    }).toThrow(errors.parentNotAnArray);
  });

  it('should throw itemNotAnArray if validatorArray is not an Array', () => {
    expect(() => {
      const validatorArrayGroup = [[operators.smallerThan, 123], 'str'];
      // @ts-ignore
      checkValidatorArraysGroup(validatorArrayGroup);
    }).toThrow(errors.itemNotAnArray);
  });

  it('should throw itemLengthError if validatorArray length is not equail to validatorTypesArray', () => {
    expect(() => {
      const validatorArrayGroup = [[operators.biggerThan, 123, 123], [operators.smallerThan, 123]];
      checkValidatorArraysGroup(validatorArrayGroup);
    }).toThrow(errors.itemLengthError);
  });

  it('should throw itemTypesError if validatorArray is not equal to validatorTypesArray types', () => {
    expect(() => {
      const validatorArrayGroup = [[123, operators.smallerThan], [undefined, {}]];
      checkValidatorArraysGroup(validatorArrayGroup);
    }).toThrow(errors.itemTypesError);
  });

  it('should throw unknownOperator if validatorArray have unknown operator', () => {
    expect(() => {
      const validatorArrayGroup = [['UNKNOWN_OPER', 123]];
      checkValidatorArraysGroup(validatorArrayGroup);
    }).toThrow(errors.unknownOperator);
  });

  it('should return true if everything is okey', () => {
    const validatorArrayGroup = [[operators.smallerThan, 123], [operators.smallerThanEqual, 123]];
    expect(checkValidatorArraysGroup(validatorArrayGroup)).toEqual(true);
  });
});
