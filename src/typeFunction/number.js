import txt from '../text-strings';
import regExp from '../helpers/regExp';

/**
 * Number validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

export default function(_validatorArray, _value) {
  const validatorArray = _validatorArray.map((_element, _index) => {
    if (_index === 0) return typeof _value === 'number';

    // >=
    if (_element.slice(0, 2) === regExp.operators.biggerThanOrEqual) {
      const elementNumber = _element.slice(2);

      const NumberMatch = elementNumber.match(regExp.numbers.real);
      if (NumberMatch !== null) {
        return _value >= parseFloat(NumberMatch[0]);
      }

      const InfinityMatch = elementNumber.match(regExp.numbers.infinity);
      if (InfinityMatch !== null) {
        return _value >= parseFloat(InfinityMatch[0]);
      }
    }

    // <=
    if (_element.slice(0, 2) === regExp.operators.smallerThanOrEqual) {
      const elementNumber = _element.slice(2);

      const NumberMatch = elementNumber.match(regExp.numbers.real);
      if (NumberMatch !== null) {
        return _value <= parseFloat(NumberMatch[0]);
      }

      const InfinityMatch = elementNumber.match(regExp.numbers.infinity);
      if (InfinityMatch !== null) {
        return _value <= parseFloat(InfinityMatch[0]);
      }
    }

    // SmallerThan
    if (_element[0] === regExp.operators.smallerThan) {
      const elementNumber = _element.slice(1);

      const NumberMatch = elementNumber.match(regExp.numbers.real);
      if (NumberMatch !== null) {
        return _value < parseFloat(NumberMatch[0]);
      }

      const InfinityMatch = elementNumber.match(regExp.numbers.infinity);
      if (InfinityMatch !== null) {
        return _value < parseFloat(InfinityMatch[0]);
      }
    }

    // BiggerThan
    if (_element[0] === regExp.operators.biggerThan) {
      const elementNumber = _element.slice(1);

      const NumberMatch = elementNumber.match(regExp.numbers.real);
      if (NumberMatch !== null) {
        return _value > parseFloat(NumberMatch[0]);
      }

      const InfinityMatch = elementNumber.match(regExp.numbers.infinity);
      if (InfinityMatch !== null) {
        return _value > parseFloat(InfinityMatch[0]);
      }
    }

    // EqualTo
    if (_element[0] === regExp.operators.equalTo) {
      const elementNumber = _element.slice(1);

      const NumberMatch = elementNumber.match(regExp.numbers.real);
      if (NumberMatch !== null) {
        return _value === parseFloat(NumberMatch[0]);
      }

      const InfinityMatch = elementNumber.match(regExp.numbers.infinity);
      if (InfinityMatch !== null) {
        return _value === parseFloat(InfinityMatch[0]);
      }
    }

    console.warn(txt.VALIDATOR.UNKNOWN, _element);
    return false;
  });

  return validatorArray.indexOf(false) === -1;
}
