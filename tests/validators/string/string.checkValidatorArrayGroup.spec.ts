import checkValidatorArraysGroup from '../../../src/validators/string/string.checkValidatorArrayGroup';
import errors from '../../../src/validators/string/string.errors';

describe('CheckValidatorArrayGroup tests', () => {
  it('should throw parentNotAnArray if validatorArrayGroup is not an Array', () => {
    expect(() => {
      const validatorArrayGroup = 213;
      const validatorTypesArray = ['number', 'string'];
      // @ts-ignore
      checkValidatorArraysGroup(validatorArrayGroup, validatorTypesArray);
    }).toThrow(errors.parentNotAnArray);
  });

  it('should throw itemNotAnArray if validatorArray is not an Array', () => {
    expect(() => {
      const validatorArrayGroup = [['<', 123], 'str'];
      const validatorTypesArray = ['string', 'number'];
      // @ts-ignore
      checkValidatorArraysGroup(validatorArrayGroup, validatorTypesArray);
    }).toThrow(errors.itemNotAnArray);
  });

  it('should throw itemLengthError if validatorArray length is not equail to validatorTypesArray', () => {
    expect(() => {
      const validatorArrayGroup = [['>', 123, 123], ['<', 123]];
      const validatorTypesArray = ['string', 'number'];
      checkValidatorArraysGroup(validatorArrayGroup, validatorTypesArray);
    }).toThrow(errors.itemLengthError);
  });

  it('should throw itemTypesError if validatorArray is not equal to validatorTypesArray types', () => {
    expect(() => {
      const validatorArrayGroup = [[123, '<'], [undefined, {}]];
      const validatorTypesArray = ['number', 'string'];
      checkValidatorArraysGroup(validatorArrayGroup, validatorTypesArray);
    }).toThrow(errors.itemTypesError);
  });

  it('should return true if everything is okey', () => {
    const validatorArrayGroup = [['jasd', 'asd'], ['asdasd', 'asdasd']];
    const validatorTypesArray = ['string', 'string'];
    expect(checkValidatorArraysGroup(validatorArrayGroup, validatorTypesArray)).toEqual(true);
  });
});
