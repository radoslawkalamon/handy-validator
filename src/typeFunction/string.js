import txt from '../text-strings';
import regExp from '../helpers/regExp';

/**
 * String validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

export default function(_validatorArray, _value) {
  const validatorArray = _validatorArray.map((_element, _index) => {
    if (_index === 0) return typeof _value === 'string';

    if (_element.slice(0, 2) === regExp.operators.notEqualTo) {
      const stringElement = _element.slice(2);
      return _value !== stringElement;
    }

    if (_element[0] === regExp.operators.equalTo) {
      const stringElement = _element.slice(1);
      return _value === stringElement;
    }

    console.warn(txt.VALIDATOR.UNKNOWN, _element);
    return false;
  });

  return validatorArray.indexOf(false) === -1;
}
