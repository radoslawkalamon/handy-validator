import { HandyValidatorPlugin } from '../../HandyValidatorPlugin';
import { IPalindrome } from './interfaces';
import { PalindromeNumber } from './PalindromeNumber';
import { PalindromeString } from './PalindromeString';

/**
 * Palindrome validator
 * @version 2.0.0
 */
export class PalindromeValidator extends HandyValidatorPlugin {
  static errors = {
    valueNotStringOrNumber: 'HVP_PALINDROME_VALUE_NOT_STRING_OR_NUMBER',
  }

  public validate(value: unknown): boolean {
    let palindrome: IPalindrome;

    switch (typeof value) {
      case 'string':
        palindrome = new PalindromeString(value);
        break;
      case 'number':
        palindrome = new PalindromeNumber(value);
        break;
      default:
        throw new Error(PalindromeValidator.errors.valueNotStringOrNumber);
    }

    const [palindromeProcessed, palindromeProcessedReversed] = palindrome.getValuesToValidate();
    return palindromeProcessed === palindromeProcessedReversed;
  }
}
