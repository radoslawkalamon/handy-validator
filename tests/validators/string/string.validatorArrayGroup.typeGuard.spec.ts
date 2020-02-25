// @ts-nocheck
import validatorArrayGroupTypeGuard from '../../../src/validators/string/string.validatorArrayGroup.typeGuard';
import errors from '../../../src/validators/string/string.errors';

describe('CheckValidatorArrayGroup tests', () => {
  it('validatorArrayGroup is not an Array - should throw parentNotAnArray', () => {
    expect(() => {
      const validatorArrayGroup = 213;
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.parentNotAnArray);
  });

  it('validatorArray is not an Array - should throw itemNotAnArray', () => {
    expect(() => {
      const validatorArrayGroup = [['=', 'string'], 'str'];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemNotAnArray);
  });

  it('validatorArray length is not equal to operator function args length - should throw itemLengthError', () => {
    expect(() => {
      const validatorArrayGroup = [['!=', 123, 123], ['$', 123]];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemLengthError);
  });

  it('validatorArray types is not equal to string - should throw itemTypesError', () => {
    expect(() => {
      const validatorArrayGroup = [['=', '<'], ['$', {}]];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemTypesError);
  });

  it('validatorArray have unknown operator - should throw unknownOperator', () => {
    expect(() => {
      const validatorArrayGroup = [[null, 'Hello']];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.unknownOperator);
  });

  it('Success - should return true', () => {
    const validatorArrayGroup = [['!=', 'stringstring'], ['!$', 'Hello']];
    expect(validatorArrayGroupTypeGuard(validatorArrayGroup)).toBeTruthy();
  });
});
