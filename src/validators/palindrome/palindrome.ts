import punctuationRegEx from './palindrome.punctuation';

/**
 * Palindrome validator
 * @version 1.0.0
 * @param {any} value
 * @returns {boolean}
 */
export default (value: any): boolean => {
  if (typeof value !== 'string') {
    return false;
  }

  const valueArray = value.toLocaleLowerCase().replace(punctuationRegEx, '').replace(/\s+/g, '').split('');
  return valueArray.length !== 0 && valueArray.join('') === valueArray.reverse().join('');
};
