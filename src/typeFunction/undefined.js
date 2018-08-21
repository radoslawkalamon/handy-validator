/**
 * Undefined validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

export default function(_validatorArray, _value) {
  return _value === undefined && typeof _value === 'undefined';
}
