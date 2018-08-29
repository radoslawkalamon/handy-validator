import txt from '../text-strings';
import regExp from '../helpers/regExp';
import prepareString from '../helpers/prepareStringToValidation';

/**
 * String validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

export default function(_validatorArray, _value) {
  const validatorArray = _validatorArray.map((_element, _index) => {
    if (_index === 0) return typeof _value === 'string';

    if (_element.slice(0, regExp.operators.notEqualTo.length) === regExp.operators.notEqualTo) {
      const stringElement = prepareString(_element, regExp.operators.notEqualTo.length);
      return _value !== stringElement;
    }

    if (_element[0] === regExp.operators.equalTo) {
      const stringElement = prepareString(_element, regExp.operators.equalTo.length);
      return _value === stringElement;
    }

    console.warn(txt.VALIDATOR.UNKNOWN, _element);
    return false;
  });

  return validatorArray.indexOf(false) === -1;
}
