// @ts-nocheck
import validatorArrayGroupTypeGuard from '../../../src/validators/number/number.validatorArrayGroup.typeGuard';
import errors from '../../../src/validators/number/number.errors';

describe('CheckValidatorArrayGroup tests', () => {
  it('validatorArrayGroup is not an Array - should throw parentNotAnArray', () => {
    expect(() => {
      const validatorArrayGroup = 213;
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.parentNotAnArray);
  });

  it('validatorArray is not an Array - should throw itemNotAnArray', () => {
    expect(() => {
      const validatorArrayGroup = [['<', 123], 'str'];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemNotAnArray);
  });

  it('validatorArray length is not equal to validatorTypesArray - should throw itemLengthError', () => {
    expect(() => {
      const validatorArrayGroup = [['>', 123, 123], ['<', 123]];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemLengthError);
  });

  it('validatorArray have unknown operator - should throw unknownOperator', () => {
    expect(() => {
      const validatorArrayGroup = [[123, '<'], [undefined, {}]];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.unknownOperator);
  });

  it('validatorArray second argument not a number - should throw itemTypesError', () => {
    expect(() => {
      const validatorArrayGroup = [['<', 123], ['<=', 'Hemlo!']];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemTypesError);
  });

  it('Success - should return true', () => {
    const validatorArrayGroup = [['<', 123], ['<=', 123]];
    expect(validatorArrayGroupTypeGuard(validatorArrayGroup)).toBeTruthy();
  });
});
