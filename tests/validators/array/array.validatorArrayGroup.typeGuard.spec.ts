// @ts-nocheck
import validatorArrayGroupTypeGuard from '../../../src/validators/array/array.validatorArrayGroup.typeGuard';
import errors from '../../../src/validators/array/array.errors';

describe('Array validator :: validatorArrayGroupTypeGuard', () => {
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

  it('validatorArray unknown operator - should throw unknownOperator', () => {
    expect(() => {
      const validatorArrayGroup = [[123, '<'], [undefined, {}]];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.unknownOperator);
  });

  it('validatorArray length is not equal to operator function args length - should throw itemLengthError', () => {
    expect(() => {
      const validatorArrayGroup = [['>', 123, 123], ['<', 123]];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemLengthError);
  });

  it('validatorArray not integer - should throw itemTypesError', () => {
    expect(() => {
      const validatorArrayGroup = [['<', 63.554]];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemTypesError);
  });

  it('Success - should return true', () => {
    const validatorArrayGroup = [['<', 123], ['<=', 123]];
    expect(validatorArrayGroupTypeGuard(validatorArrayGroup)).toBeTruthy();
  });
});
