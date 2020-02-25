import errors from './string.errors';
import strategies from './string.strategies';

const operatorsPermitted: string[] = Object.keys(strategies);
/**
 * Validate validatorArrayGroup for String validator
 */
export default (validatorArrayGroup: string[][]): boolean => {
  if (validatorArrayGroup && !Array.isArray(validatorArrayGroup)) {
    throw new Error(errors.parentNotAnArray);
  }

  validatorArrayGroup.forEach((validatorArray) => {
    if (!Array.isArray(validatorArray)) {
      throw new Error(errors.itemNotAnArray);
    }

    const [validatorOperator] = validatorArray;

    if (!operatorsPermitted.includes(validatorOperator)) {
      throw new Error(errors.unknownOperator);
    }

    if (validatorArray.length !== strategies[validatorOperator].length) {
      throw new Error(errors.itemLengthError);
    }

    if (validatorArray.some((x) => typeof x !== 'string')) {
      throw new Error(errors.itemTypesError);
    }
  });

  return true;
};
