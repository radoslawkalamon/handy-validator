/**
 * Split validator String to Array
 * @param {String} _validator
 * @returns {Array}
 */

export default function(_validator) {
  // ToDo: String escaping
  return _validator.split('|');
}
