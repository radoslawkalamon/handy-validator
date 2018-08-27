import txt from '../text-strings';
import regExp from '../helpers/regExp';

/**
 * Number validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

export default function(_validatorArray, _value) {
  const valueAsNumber = parseFloat(_value);
  const validatorArray = _validatorArray.map((_element, _index) => {
    if (_index === 0) return Number.isNaN(valueAsNumber) === false && typeof _value === 'number';

    const shorterThan = _element.match(regExp.numbers.smallerThan);
    if (shorterThan !== null) {
      return valueAsNumber < parseFloat(shorterThan[1]);
    }

    const longerThan = _element.match(regExp.numbers.biggerThan);
    if (longerThan !== null) {
      return valueAsNumber > parseFloat(longerThan[1]);
    }

    const equalTo = _element.match(regExp.numbers.equalTo);
    if (equalTo !== null) {
      return valueAsNumber === parseFloat(equalTo[1]);
    }

    console.warn(txt.VALIDATOR.UNKNOWN, _element);
    return false;
  });

  return validatorArray.indexOf(false) === -1;
}
