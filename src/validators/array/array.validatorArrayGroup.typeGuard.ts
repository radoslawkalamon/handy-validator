import errors from './array.errors';
import strategies from './array.strategies';

const operatorsPermitted: string[] = Object.keys(strategies);
/**
 * Validate validatorArrayGroup for Array validator
 */
export default (validatorArrayGroup: [string, number][]): boolean => {
  if (validatorArrayGroup && !Array.isArray(validatorArrayGroup)) {
    throw new Error(errors.parentNotAnArray);
  }

  validatorArrayGroup.forEach((validatorArray) => {
    if (!Array.isArray(validatorArray)) {
      throw new Error(errors.itemNotAnArray);
    }

    const [validatorOperator, validatorValue] = validatorArray;

    if (!operatorsPermitted.includes(validatorOperator)) {
      throw new Error(errors.unknownOperator);
    }

    if (validatorArray.length !== strategies[validatorOperator].length) {
      throw new Error(errors.itemLengthError);
    }

    if (!Number.isInteger(validatorValue)) {
      throw new Error(errors.itemTypesError);
    }
  });

  return true;
};
