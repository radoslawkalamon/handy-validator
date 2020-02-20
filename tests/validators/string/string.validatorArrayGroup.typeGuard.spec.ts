// @ts-nocheck
import validatorArrayGroupTypeGuard from '../../../src/validators/string/string.validatorArrayGroup.typeGuard';
import errors from '../../../src/validators/string/string.errors';

describe('CheckValidatorArrayGroup tests', () => {
  it('should throw parentNotAnArray if validatorArrayGroup is not an Array', () => {
    expect(() => {
      const validatorArrayGroup = 213;
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.parentNotAnArray);
  });

  it('should throw itemNotAnArray if validatorArray is not an Array', () => {
    expect(() => {
      const validatorArrayGroup = [['<', 123], 'str'];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemNotAnArray);
  });

  it('should throw itemLengthError if validatorArray length is not equail to validatorTypesArray', () => {
    expect(() => {
      const validatorArrayGroup = [['>', 123, 123], ['<', 123]];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemLengthError);
  });

  it('should throw itemTypesError if validatorArray is not equal to validatorTypesArray types', () => {
    expect(() => {
      const validatorArrayGroup = [[123, '<'], [undefined, {}]];
      validatorArrayGroupTypeGuard(validatorArrayGroup);
    }).toThrow(errors.itemTypesError);
  });

  it('should return true if everything is okey', () => {
    const validatorArrayGroup = [['jasd', 'asd'], ['asdasd', 'asdasd']];
    expect(validatorArrayGroupTypeGuard(validatorArrayGroup)).toEqual(true);
  });
});
