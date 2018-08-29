import txt from '../text-strings';
import regExp from './regExp';

/**
 * Split validator String to Array
 * @param {String} _validator
 * @returns {Array}
 */

export default function(_validator = '') {
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
