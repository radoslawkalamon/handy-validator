import errors from './number.errors';

/**
 * @param {any[][]} validatorArrayGroup
 * @param {string[]} validatorTypesArray
 * @returns validatorArray
 */
export default (validatorArrayGroup: any[][], validatorTypesArray: string[]): boolean => {
  if (validatorArrayGroup && !Array.isArray(validatorArrayGroup)) {
    throw new Error(errors.parentNotAnArray);
  }

  validatorArrayGroup.forEach((validatorArray) => {
    if (!Array.isArray(validatorArray)) {
      throw new Error(errors.itemNotAnArray);
    }

    if (validatorArray.length !== validatorTypesArray.length) {
      throw new Error(errors.itemLengthError);
    }

    validatorArray.forEach((validatorItem, index) => {
      // eslint-disable-next-line valid-typeof
      if (typeof validatorItem !== validatorTypesArray[index]) {
        throw new Error(errors.itemTypesError);
      }
    });
  });

  return true;
};
