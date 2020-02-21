import strategies from './string.strategies';
import validatorArrayGroupTypeGuard from './string.validatorArrayGroup.typeGuard';

/**
 * Number validator
 * @version 1.0.0
 * @param {any} value
 * @param {string[][]} validatorArrayGroup
 * @param {boolean} validateSome
 * @returns {boolean}
 */
export default (value: any, validatorArrayGroup: string[][] = [], validateSome = false): boolean => {
  let validationResultArray;
  if (typeof value !== 'string') {
    return false;
  }

  try {
    validatorArrayGroupTypeGuard(validatorArrayGroup);

    validationResultArray = validatorArrayGroup.map((validatorArray) => {
      const [validatorOperator, validatorValue] = validatorArray;
      const operatorToUse = strategies[validatorOperator];

      const validationResult = operatorToUse(value, validatorValue);
      if (validationResult === false) {
        if (validateSome) {
          return false;
        }
        throw new Error();
      }

      return true;
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    if (e.message !== '') { console.error(e); }
    return false;
  }

  return validateSome
    ? validationResultArray.some((x) => x === true)
    : true;
};
