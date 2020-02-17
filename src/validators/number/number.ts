import errors from './number.errors';
import strategies from './number.strategies';
import checkValidatorArray from './number.checkvalidatorarray';

/**
 * Number validator
 * @version 1.0.0
 * @param {any} value
 * @param {string, number][]} validatorArrayGroup
 * @returns {boolean}
 */
export default (value: any, validatorArrayGroup: [string, number][]): boolean => {
  if (typeof value !== 'number') { return false; }

  try {
    if (validatorArrayGroup.length > 0) {
      // ForEach used because its seems to be the fastest solution for Array iteration
      // (@ the day 17.02.2020)
      validatorArrayGroup.forEach((validatorArray) => {
        const [validatorType, validatorValue] = checkValidatorArray(validatorArray);
        const operatorToUse = strategies[validatorType];

        const isOperatorUndefined = !operatorToUse;
        if (isOperatorUndefined) {
          throw new Error(errors.unknownOperator);
        }

        const validationResult = operatorToUse(value, validatorValue);
        if (validationResult === false) {
          throw new Error();
        }
      });
    }
  } catch (e) {
    if (e.message !== '') { console.error(e); }
    return false;
  }

  return true;
};
