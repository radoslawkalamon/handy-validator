/**
 * Null validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 */

export default function(_validatorArray, _value) {
  return _value === null && typeof _value === 'object';
}
