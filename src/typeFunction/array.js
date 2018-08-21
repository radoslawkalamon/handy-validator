import txt from '../text-strings';

/**
 * Object validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

export default function(_validatorArray, _value) {
  const validatorArray = _validatorArray.map((_element, _index) => {
    if (_index === 0) return Array.isArray(_value);

    const shorterThanRegExp = /^<(\d+)/;
    const longerThanRegExp = /^>(\d+)/;
    const equalToRegExp = /^=(\d+)/;

    const shorterThan = _element.match(shorterThanRegExp);
    if (shorterThan !== null) {
      return _value.length < parseInt(shorterThan[1]);
    }

    const longerThan = _element.match(longerThanRegExp);
    if (longerThan !== null) {
      return _value.length > parseInt(longerThan[1]);
    }
    
    const equalTo = _element.match(equalToRegExp);
    if (equalTo !== null) {
      if (_validatorArray.length > 2) console.warn(txt.VALIDATOR.RETHINK);
      return _value.length === parseInt(equalTo[1]);
    }
    
    console.warn(txt.VALIDATOR.UNKNOWN, _element);
    return false;
  });

  return validatorArray.indexOf(false) === -1;
}
