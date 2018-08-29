import txt from '../text-strings';

/**
 * @param {String} _text
 * @returns {String}
 * @throws {Error} Text doesn't have apostrophes
 */

export default (_text = '') => {
  const textLastIndex = _text.length - 1;

  if (_text[0] === "'" && _text[textLastIndex] === "'") {
    return _text.slice(1, textLastIndex);
  }

  throw new Error(txt.STRING.NO_APOSTROPHES);
};
