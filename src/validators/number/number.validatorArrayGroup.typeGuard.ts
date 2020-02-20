import errors from './number.errors';
import strategies from './number.strategies';

const operatorsPermitted: string[] = Object.keys(strategies);
/**
 * @param {[string, number][]} validatorArrayGroup
 * @returns validatorArray
 */
export default (validatorArrayGroup: [string, number][]): boolean => {
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

    const [validatorOperator, validatorValue] = validatorArray;

    if (typeof validatorOperator !== 'string' || typeof validatorValue !== 'number') {
      throw new Error(errors.itemTypesError);
    }

    if (!operatorsPermitted.includes(validatorOperator)) {
      throw new Error(errors.unknownOperator);
    }
  });

  return true;
};
