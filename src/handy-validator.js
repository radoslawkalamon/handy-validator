import txt from './text-strings';
import createValidatorArray from './helpers/createValidatorArray';
import stripApostropheFromString from './helpers/stripApostropheFromString';

import validateArray from './typeFunction/array';
import validateBoolean from './typeFunction/boolean';
import validateIsEqualTo from './typeFunction/isequalto';
import validateNumber from './typeFunction/number';
import validateNull from './typeFunction/null';
import validateObject from './typeFunction/object';
import validateString from './typeFunction/string';
import validateUndefined from './typeFunction/undefined';

/**
 * Run validator against value
 * @param {String} _validator
 * @param {Any} _value
 * @param {Boolean} _falseOnObject
 * @returns {Boolean}
 */

export default function (_validator, _value, _falseOnObject = false) {
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
export function getIsEqualToValues(_validator) {
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
