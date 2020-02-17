import errors from './number.errors';

/**
 * Checks Validator Array
 * @param {any[]} validatorArray
 * @throws errors.validatorArrayNotAnArray
 * @throws errors.validatorArrayLengthError
 * @throws errors.validatorArrayItemError
 * @returns {[string, number]}
 */
export default (validatorArray: any): [string, number] => {
  if (!Array.isArray(validatorArray)) {
    throw new Error(errors.validatorArrayNotAnArray);
  }

  if (validatorArray.length !== 2) {
    throw new Error(errors.validatorArrayLengthError);
  }

  const [validatorType, validatorValue] = validatorArray;
  if (typeof validatorType !== 'string' || typeof validatorValue !== 'number') {
    throw new Error(errors.validatorArrayItemError);
  }

  return [validatorType, validatorValue];
};
