import errors from './string.errors';
import strategies from './string.strategies';

const operatorsPermitted = Object.keys(strategies);

/**
 * @param {[string, (string | number)][]} validatorArrayGroup
 * @returns validatorArray
 */
export default (validatorArrayGroup: [string, (string | number)][]): boolean => {
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

    if (typeof validatorOperator !== 'string') {
      throw new Error(errors.itemTypesError);
    }

    if (!operatorsPermitted.includes(validatorOperator)) {
      throw new Error(errors.unknownOperator);
    }
    // eslint-disable-next-line valid-typeof
    if (typeof validatorValue !== strategies[validatorOperator].argumentType) {
      throw new Error(errors.itemTypesError);
    }
  });

  return true;
};
