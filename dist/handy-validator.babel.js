'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});
var txt = {
  ARGUMENTS: {
    VALIDATOR: {
      IS_NOT_A_STRING: 'ARGUMENTS_VALIDATOR_IS_NOT_A_STRING | [...]',
      IS_EMPTY: 'ARGUMENTS_VALIDATOR_IS_EMPTY | [...]',
      ERROR: 'ARGUMENTS_VALIDATOR_ERROR | [...]'
    }
  },
  VALIDATOR: {
    UNKNOWN: 'VALIDATOR_UNKNOWN | %s | [...]'
  },
  STRING: {
    NO_APOSTROPHES: 'STRING_NO_APOSTROPHES | [...]'
  },
  ISEQUALTO: {
    NO_VALUES_PASSED: 'ISEQUALTO_NO_VALUES_PASSED | [...]'
  }
};
var regExp = {
  operators: {
    smallerThanOrEqual: '<=',
    smallerThan: '<',
    biggerThanOrEqual: '>=',
    biggerThan: '>',
    equalTo: '=',
    notEqualTo: '!='
  },
  numbers: {
    real: /-?\d+[,.]*\d*$/,
    // science: /^-?\d.?\d?e[+-]?\d+$/,
    infinity: /^-?Infinity$/,
    nan: /^-?NaN$/
  },
  misc: {
    comma: ',',
    textInApostrophe: /'(.*?)'/g
  }
};
/**
 * Split validator String to Array
 * @param {String} _validator
 * @returns {Array}
 */

function createValidatorArray() {
  var _validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (typeof _validator !== 'string') throw new Error(txt.ARGUMENTS.VALIDATOR.IS_NOT_A_STRING);
  var escapedStringText = 'VALIDATOR_ESC_HANDY_VALIDATOR_';
  var delimiter = '|';

  var textToEsc = _validator.match(regExp.misc.textInApostrophe);

  if (textToEsc !== null) {
    var validator = _validator;
    textToEsc.forEach(function (element, index) {
      validator = validator.replace(element, "".concat(escapedStringText).concat(index));
    });
    var validatorArray = validator.split(delimiter);
    textToEsc.forEach(function (elementToEsc, indexToEsc) {
      validatorArray = validatorArray.map(function (validatorArrayEl) {
        return validatorArrayEl.replace("".concat(escapedStringText).concat(indexToEsc), elementToEsc);
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


var stripApostropheFromString = function stripApostropheFromString() {
  var _text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var textLastIndex = _text.length - 1;

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
  var validatorArray = _validatorArray.map(function (_element, _index) {
    if (_index === 0) return Array.isArray(_value); // SmallerThan

    if (_element[0] === regExp.operators.smallerThan) {
      var elementNumber = _element.slice(1);

      var NumberMatch = elementNumber.match(regExp.numbers.real);

      if (NumberMatch !== null) {
        return _value.length < parseFloat(NumberMatch[0]);
      }

      var InfinityMatch = elementNumber.match(regExp.numbers.infinity);

      if (InfinityMatch !== null) {
        return _value.length < parseFloat(InfinityMatch[0]);
      }
    } // BiggerThan


    if (_element[0] === regExp.operators.biggerThan) {
      var _elementNumber = _element.slice(1);

      var _NumberMatch = _elementNumber.match(regExp.numbers.real);

      if (_NumberMatch !== null) {
        return _value.length > parseFloat(_NumberMatch[0]);
      }

      var _InfinityMatch = _elementNumber.match(regExp.numbers.infinity);

      if (_InfinityMatch !== null) {
        return _value.length > parseFloat(_InfinityMatch[0]);
      }
    } // EqualTo


    if (_element[0] === regExp.operators.equalTo) {
      var _elementNumber2 = _element.slice(1);

      var _NumberMatch2 = _elementNumber2.match(regExp.numbers.real);

      if (_NumberMatch2 !== null) {
        return _value.length === parseFloat(_NumberMatch2[0]);
      }

      var _InfinityMatch2 = _elementNumber2.match(regExp.numbers.infinity);

      if (_InfinityMatch2 !== null) {
        return _value.length === parseFloat(_InfinityMatch2[0]);
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


var prepareString = function prepareString(_text, _operatorsLength) {
  var textWithoutOperator = _text.slice(_operatorsLength);

  return stripApostropheFromString(textWithoutOperator);
};
/**
 * isEqualTo validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */


function validateIsEqualTo(_validatorArray, _value) {
  var validatorArray = _validatorArray.map(function (_element, _index) {
    if (_index === 0) return false;
    var stringToValidate = prepareString(_element);
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
  var validatorArray = _validatorArray.map(function (_element, _index) {
    if (_index === 0) return typeof _value === 'number'; // >=

    if (_element.slice(0, 2) === regExp.operators.biggerThanOrEqual) {
      var elementNumber = _element.slice(2);

      var NumberMatch = elementNumber.match(regExp.numbers.real);

      if (NumberMatch !== null) {
        return _value >= parseFloat(NumberMatch[0]);
      }

      var InfinityMatch = elementNumber.match(regExp.numbers.infinity);

      if (InfinityMatch !== null) {
        return _value >= parseFloat(InfinityMatch[0]);
      }
    } // <=


    if (_element.slice(0, 2) === regExp.operators.smallerThanOrEqual) {
      var _elementNumber3 = _element.slice(2);

      var _NumberMatch3 = _elementNumber3.match(regExp.numbers.real);

      if (_NumberMatch3 !== null) {
        return _value <= parseFloat(_NumberMatch3[0]);
      }

      var _InfinityMatch3 = _elementNumber3.match(regExp.numbers.infinity);

      if (_InfinityMatch3 !== null) {
        return _value <= parseFloat(_InfinityMatch3[0]);
      }
    } // SmallerThan


    if (_element[0] === regExp.operators.smallerThan) {
      var _elementNumber4 = _element.slice(1);

      var _NumberMatch4 = _elementNumber4.match(regExp.numbers.real);

      if (_NumberMatch4 !== null) {
        return _value < parseFloat(_NumberMatch4[0]);
      }

      var _InfinityMatch4 = _elementNumber4.match(regExp.numbers.infinity);

      if (_InfinityMatch4 !== null) {
        return _value < parseFloat(_InfinityMatch4[0]);
      }
    } // BiggerThan


    if (_element[0] === regExp.operators.biggerThan) {
      var _elementNumber5 = _element.slice(1);

      var _NumberMatch5 = _elementNumber5.match(regExp.numbers.real);

      if (_NumberMatch5 !== null) {
        return _value > parseFloat(_NumberMatch5[0]);
      }

      var _InfinityMatch5 = _elementNumber5.match(regExp.numbers.infinity);

      if (_InfinityMatch5 !== null) {
        return _value > parseFloat(_InfinityMatch5[0]);
      }
    } // EqualTo


    if (_element[0] === regExp.operators.equalTo) {
      var _elementNumber6 = _element.slice(1);

      var _NumberMatch6 = _elementNumber6.match(regExp.numbers.real);

      if (_NumberMatch6 !== null) {
        return _value === parseFloat(_NumberMatch6[0]);
      }

      var _InfinityMatch6 = _elementNumber6.match(regExp.numbers.infinity);

      if (_InfinityMatch6 !== null) {
        return _value === parseFloat(_InfinityMatch6[0]);
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
  return _value === null && _typeof(_value) === 'object';
}
/**
 * Object validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */


function validateObject(_validatorArray, _value) {
  return _value !== null && !Array.isArray(_value) && _typeof(_value) === 'object';
}
/**
 * String validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */


function validateString(_validatorArray, _value) {
  var validatorArray = _validatorArray.map(function (_element, _index) {
    if (_index === 0) return typeof _value === 'string';

    if (_element.slice(0, regExp.operators.notEqualTo.length) === regExp.operators.notEqualTo) {
      var stringElement = prepareString(_element, regExp.operators.notEqualTo.length);
      return _value !== stringElement;
    }

    if (_element[0] === regExp.operators.equalTo) {
      var _stringElement = prepareString(_element, regExp.operators.equalTo.length);

      return _value === _stringElement;
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


function handyValidator(_validator, _value) {
  var _falseOnObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var validator = createValidatorArray(_validator);

  switch (validator[0].toLowerCase()) {
    case 'string':
      {
        return validateString(validator, _value);
      }

    case 'number':
      {
        return validateNumber(validator, _value);
      }

    case 'array':
      {
        return validateArray(validator, _value);
      }

    case 'object':
      {
        return _falseOnObject === true ? false : validateObject(validator, _value);
      }

    case 'undefined':
      {
        return validateUndefined(validator, _value);
      }

    case 'null':
      {
        return validateNull(validator, _value);
      }

    case 'boolean':
      {
        return validateBoolean(validator, _value);
      }

    case 'isequalto':
      {
        return validateIsEqualTo(validator, _value);
      }

    default:
      {
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
  var validator = createValidatorArray(_validator);

  switch (validator[0].toLowerCase()) {
    case 'isequalto':
      {
        return validator.slice(1).map(stripApostropheFromString);
      }

    default:
      {
        throw new Error(txt.ARGUMENTS.VALIDATOR.ERROR);
      }
  }
}

exports.default = handyValidator;
exports.getIsEqualToValues = getIsEqualToValues;
