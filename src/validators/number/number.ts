import errors from './number.errors';
import strategies from './number.strategies';
import checkValidatorArray from './number.checkvalidatorarray';

/**
 * Number validator
 * @version 1.0.0
 * @param {any} value
 * @param {string, number][]} validatorArrayGroup
 * @param {boolean} validateSome
 * @returns {boolean}
 */
export default (value: any, validatorArrayGroup: [string, number][] = [], validateSome = false): boolean => {
  if (typeof value !== 'number') {
    return false;
  }

  let validationResultArray;
  try {
    if (validatorArrayGroup && !Array.isArray(validatorArrayGroup)) {
      throw new Error(errors.validatorArrayGroupNotAnArray);
    }

    validationResultArray = validatorArrayGroup.map((validatorArray) => {
      const [validatorType, validatorValue] = checkValidatorArray(validatorArray);
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
