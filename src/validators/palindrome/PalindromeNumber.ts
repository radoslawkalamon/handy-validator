import { IPalindrome } from '@validators/palindrome/interfaces';

export class PalindromeNumber implements IPalindrome {
  static errors = {
    valueNaN: 'HVP_PALINDROME_VALUE_NAN',
  }

  value: string;

  constructor(value: number) {
    if (Number.isNaN(value)) {
      throw new Error(PalindromeNumber.errors.valueNaN);
    }
    this.value = this.normalize(value);
  }

  public getValuesToValidate(): [string, string] {
    return [
      this.value,
      this.getReversedValue(),
    ];
  }

  private normalize(value: number): string {
    return value.toString();
  }

  private getReversedValue(): string {
    return this.value.split('').reverse().join('');
  }
}
