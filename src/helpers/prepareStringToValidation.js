import stripApostropheFromString from './stripApostropheFromString';

/**
 * @param {String} _text
 * @param {Number} _operatorsLength
 * @returns {String}
 */

export default (_text, _operatorsLength) => {
  const textWithoutOperator = _text.slice(_operatorsLength);
  return stripApostropheFromString(textWithoutOperator);
};
