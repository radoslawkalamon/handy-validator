/**
 * Object validator
 * @param {Array} _validatorArray
 * @param {Any} _value
 * @returns {Boolean}
 */

export default function(_validatorArray, _value) {
  return _value !== null && !Array.isArray(_value) && typeof _value === 'object';
}
