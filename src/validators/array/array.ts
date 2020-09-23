import strategies from './array.strategies';
import validatorArrayGroupTypeGuard from './array.validatorArrayGroup.typeGuard';

/**
 * Array validator
 * @version 1.0.1
 */
export default (value: unknown, validatorArrayGroup: [string, number][] = [], validateSome = false): boolean => {
  let validationResultArray;

  if (!Array.isArray(value)) {
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
