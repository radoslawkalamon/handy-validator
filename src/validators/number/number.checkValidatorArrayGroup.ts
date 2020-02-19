import errors from './number.errors';
import operators from './number.operators';

const validatorTypesArray: string[] = ['string', 'number'];
const operatorsPermitted: string[] = Object.values(operators);

/**
 * @param {any[][]} validatorArrayGroup
 * @returns validatorArray
 */
export default (validatorArrayGroup: any[][]): boolean => {
  if (validatorArrayGroup && !Array.isArray(validatorArrayGroup)) {
    throw new Error(errors.parentNotAnArray);
  }

  validatorArrayGroup.forEach((validatorArray) => {
    if (!Array.isArray(validatorArray)) {
      throw new Error(errors.itemNotAnArray);
    }

    if (validatorArray.length !== 2) {
      throw new Error(errors.itemLengthError);
    }

    validatorArray.forEach((validatorItem, index) => {
      // eslint-disable-next-line valid-typeof
      if (typeof validatorItem !== validatorTypesArray[index]) {
        throw new Error(errors.itemTypesError);
      }

      if (index === 0 && !operatorsPermitted.includes(validatorItem)) {
        throw new Error(errors.unknownOperator);
      }
    });
  });

  return true;
};
