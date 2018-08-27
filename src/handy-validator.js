import txt from './text-strings';
import createValidator from './helpers/createValidatorArray';

import validatorArray from './typeFunction/array';
import validatorBoolean from './typeFunction/boolean';
import validatorIsEqualTo from './typeFunction/isequalto';
import validatorNumber from './typeFunction/number';
import validatorNull from './typeFunction/null';
import validatorObject from './typeFunction/object';
import validatorString from './typeFunction/string';
import validatorUndefined from './typeFunction/undefined';

/**
 * Run validator against value
 * @param {String} _validator
 * @param {Any} _value
 * @param {Boolean} _falseOnObject
 * @returns {Boolean}
 */

export default function(_validator, _value, _falseOnObject = false) {
  if (typeof _validator === 'undefined') throw new Error(txt.ARGUMENTS.VALIDATOR.IS_UNDEFINED);
  if (typeof _validator !== 'string') throw new Error(txt.ARGUMENTS.VALIDATOR.IS_NOT_A_STRING);
  if (_validator === '') throw new Error(txt.ARGUMENTS.VALIDATOR.IS_EMPTY);

  const validator = createValidator(_validator);

  switch (validator[0].toLowerCase()) {
    case 'string': {
      return validatorString(validator, _value);
    }
    case 'number': {
      return validatorNumber(validator, _value);
    }
    case 'array': {
      return validatorArray(validator, _value);
    }
    case 'object': {
      return _falseOnObject === true ? false : validatorObject(validator, _value);
    }
    case 'undefined': {
      return validatorUndefined(validator, _value);
    }
    case 'null': {
      return validatorNull(validator, _value);
    }
    case 'boolean': {
      return validatorBoolean(validator, _value);
    }
    case 'isequalto': {
      return validatorIsEqualTo(validator, _value);
    }
    default: {
      throw new Error(txt.ARGUMENTS.VALIDATOR.ERROR);
    }
  }
}
