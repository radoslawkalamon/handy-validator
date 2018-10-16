'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var txt = {
  ARGUMENTS: {
    VALIDATOR: {
      IS_NOT_A_STRING: 'ARGUMENTS_VALIDATOR_IS_NOT_A_STRING | [...]',
      IS_EMPTY: 'ARGUMENTS_VALIDATOR_IS_EMPTY | [...]',
      ERROR: 'ARGUMENTS_VALIDATOR_ERROR | [...]',
    },
  },
  VALIDATOR: {
    UNKNOWN: 'VALIDATOR_UNKNOWN | %s | [...]',
  },
  STRING: {
    NO_APOSTROPHES: 'STRING_NO_APOSTROPHES | [...]',
  },
  ISEQUALTO: {
    NO_VALUES_PASSED: 'ISEQUALTO_NO_VALUES_PASSED | [...]',
  },
};

var regExp = {
  operators: {
    smallerThanOrEqual: '<=',
    smallerThan: '<',
    biggerThanOrEqual: '>=',
    biggerThan: '>',
    equalTo: '=',
    notEqualTo: '!=',
  },
  numbers: {
    real: /-?\d+[,.]*\d*$/,
    // science: /^-?\d.?\d?e[+-]?\d+$/,
    infinity: /^-?Infinity$/,
    nan: /^-?NaN$/,
  },
  misc: {
    comma: ',',
    textInApostrophe: /'(.*?)'/g,
  },
};

/**
 * Split validator String to Array
 * @param {String} _validator
 * @returns {Array}
 */

function createValidatorArray (_validator = '') {
  if (typeof _validator !== 'string') throw new Error(txt.ARGUMENTS.VALIDATOR.IS_NOT_A_STRING);

  const escapedStringText = 'VALIDATOR_ESC_HANDY_VALIDATOR_';
  const delimiter = '|';

  const textToEsc = _validator.match(regExp.misc.textInApostrophe);
  if (textToEsc !== null) {
    let validator = _validator;
    textToEsc.forEach((element, index) => {
      validator = validator.replace(element, `${escapedStringText}${index}`);
    });

    let validatorArray = validator.split(delimiter);

    textToEsc.forEach((elementToEsc, indexToEsc) => {
      validatorArray = validatorArray.map((validatorArrayEl) => {
        return validatorArrayEl.replace(`${escapedStringText}${indexToEsc}`, elementToEsc);
      });
    });

    return validatorArray;
  }

  return _validator.split(delimiter);
}

/**
 * @param {String} _text
 * @returns {String}
 * @throws {Error} Text doesn't have apostrophes
 */

var stripApostropheFromString = (_text = '') => {
  const textLastIndex = _text.length - 1;

  if (_text[0] === "'" && _text[textLastIndex] === "'") {
    return _text.slice(1, textLastIndex);
  }

  throw new Error(txt.STRING.NO_APOSTROPHES);
};

/**
 * Array validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

function validateArray(_validatorArray, _value) {
  const validatorArray = _validatorArray.map((_element, _index) => {
    if (_index === 0) return Array.isArray(_value);

    // SmallerThan
    if (_element[0] === regExp.operators.smallerThan) {
      const elementNumber = _element.slice(1);

      const NumberMatch = elementNumber.match(regExp.numbers.real);
      if (NumberMatch !== null) {
        return _value.length < parseFloat(NumberMatch[0]);
      }

      const InfinityMatch = elementNumber.match(regExp.numbers.infinity);
      if (InfinityMatch !== null) {
        return _value.length < parseFloat(InfinityMatch[0]);
      }
    }

    // BiggerThan
    if (_element[0] === regExp.operators.biggerThan) {
      const elementNumber = _element.slice(1);

      const NumberMatch = elementNumber.match(regExp.numbers.real);
      if (NumberMatch !== null) {
        return _value.length > parseFloat(NumberMatch[0]);
      }

      const InfinityMatch = elementNumber.match(regExp.numbers.infinity);
      if (InfinityMatch !== null) {
        return _value.length > parseFloat(InfinityMatch[0]);
      }
    }

    // EqualTo
    if (_element[0] === regExp.operators.equalTo) {
      const elementNumber = _element.slice(1);

      const NumberMatch = elementNumber.match(regExp.numbers.real);
      if (NumberMatch !== null) {
        return _value.length === parseFloat(NumberMatch[0]);
      }

      const InfinityMatch = elementNumber.match(regExp.numbers.infinity);
      if (InfinityMatch !== null) {
        return _value.length === parseFloat(InfinityMatch[0]);
      }
    }

    console.warn(txt.VALIDATOR.UNKNOWN, _element);
    return false;
  });

  return validatorArray.indexOf(false) === -1;
}

/**
 * Boolean validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

function validateBoolean(_validatorArray, _value) {
  return typeof _value === 'boolean';
}

/**
 * @param {String} _text
 * @param {Number} _operatorsLength
 * @returns {String}
 */

var prepareString = (_text, _operatorsLength) => {
  const textWithoutOperator = _text.slice(_operatorsLength);
  return stripApostropheFromString(textWithoutOperator);
};

/**
 * isEqualTo validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

function validateIsEqualTo(_validatorArray, _value) {
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

/**
 * Number validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

function validateNumber(_validatorArray, _value) {
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

/**
 * Null validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

function validateNull(_validatorArray, _value) {
  return _value === null && typeof _value === 'object';
}

/**
 * Object validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

function validateObject(_validatorArray, _value) {
  return _value !== null && !Array.isArray(_value) && typeof _value === 'object';
}

/**
 * String validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

function validateString(_validatorArray, _value) {
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

/**
 * Undefined validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

function validateUndefined(_validatorArray, _value) {
  return _value === undefined && typeof _value === 'undefined';
}

/**
 * Run validator against value
 * @param {String} _validator
 * @param {Any} _value
 * @param {Boolean} _falseOnObject
 * @returns {Boolean}
 */

function handyValidator (_validator, _value, _falseOnObject = false) {
  const validator = createValidatorArray(_validator);

  switch (validator[0].toLowerCase()) {
    case 'string': {
      return validateString(validator, _value);
    }
    case 'number': {
      return validateNumber(validator, _value);
    }
    case 'array': {
      return validateArray(validator, _value);
    }
    case 'object': {
      return _falseOnObject === true ? false : validateObject(validator, _value);
    }
    case 'undefined': {
      return validateUndefined(validator, _value);
    }
    case 'null': {
      return validateNull(validator, _value);
    }
    case 'boolean': {
      return validateBoolean(validator, _value);
    }
    case 'isequalto': {
      return validateIsEqualTo(validator, _value);
    }
    default: {
      throw new Error(txt.ARGUMENTS.VALIDATOR.ERROR);
    }
  }
}

/**
 * Return values from isEqualTo validator
 * @param {String} _validator
 * @returns {Array}
 */
function getIsEqualToValues(_validator) {
  const validator = createValidatorArray(_validator);

  switch (validator[0].toLowerCase()) {
    case 'isequalto': {
      return validator.slice(1).map(stripApostropheFromString);
    }
    default: {
      throw new Error(txt.ARGUMENTS.VALIDATOR.ERROR);
    }
  }
}

exports.default = handyValidator;
exports.getIsEqualToValues = getIsEqualToValues;
