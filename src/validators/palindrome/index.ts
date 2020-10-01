import { HandyValidatorPlugin } from '@src/HandyValidatorPlugin';
import { IPalindrome } from '@validators/palindrome/interfaces';
import { PalindromeNumber } from '@validators/palindrome/PalindromeNumber';
import { PalindromeString } from '@validators/palindrome/PalindromeString';

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
