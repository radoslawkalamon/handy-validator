import punctuationRegEx from './palindrome.punctuation';

/**
 * Palindrome validator
 * @version 1.0.0
 * @param {any} value
 * @returns {boolean}
 */
export default (value: any): boolean => {
  const permittedTypes = ['string', 'number'];
  const valueType = typeof value;

  if (!permittedTypes.includes(valueType)) {
    return false;
  }

  const valueArray = value
    .toString()
    .toLocaleLowerCase()
    .replace(punctuationRegEx, '')
    .replace(/\s+/g, '')
    .split('');

  return valueArray.length !== 0 && valueArray.join('') === valueArray.reverse().join('');
};
