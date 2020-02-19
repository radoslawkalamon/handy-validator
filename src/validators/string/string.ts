import errors from './string.errors';
import strategies from './string.strategies';
import checkValidatorArrayGroup from './string.checkValidatorArrayGroup';

/**
 * Number validator
 * @version 1.0.0
 * @param {any} value
 * @param {string, string][]} validatorArrayGroup
 * @param {boolean} validateSome
 * @returns {boolean}
 */
export default (value: any, validatorArrayGroup: [string, string][] = [], validateSome = false): boolean => {
  let validationResultArray;
  if (typeof value !== 'string') {
    return false;
  }

  try {
    checkValidatorArrayGroup(validatorArrayGroup, ['string', 'string']);

    validationResultArray = validatorArrayGroup.map((validatorArray) => {
      const [validatorType, validatorValue] = validatorArray;
      const operatorToUse = strategies[validatorType];

      const isOperatorUndefined = !operatorToUse;
      if (isOperatorUndefined) {
        if (validateSome) {
          return false;
        }
        throw new Error(errors.unknownOperator);
      }

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
