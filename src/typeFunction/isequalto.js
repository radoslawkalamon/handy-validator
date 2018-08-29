import txt from '../text-strings';
import prepareString from '../helpers/prepareStringToValidation';

/**
 * isEqualTo validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

export default function(_validatorArray, _value) {
  const validatorArray = _validatorArray.map((_element, _index) => {
    if (_index === 0) return false;

    const stringToValidate = prepareString(_element);
    return _value === stringToValidate;
  });

  if (validatorArray.length < 2) {
    console.warn(txt.ISEQUALTO.NO_VALUES_PASSED);
  }

  return validatorArray.length >= 2 && validatorArray.indexOf(true) !== -1;
}
