import { remove as removeDiacratics } from 'diacritics';
import { IPalindromeValue } from './interfaces';

export class PalindromeString implements IPalindromeValue {
  value: string;

  constructor(value: string) {
    this.value = this.normalize(value);
    this.processValue();
  }

  public getValuesToValidate(): [string, string] {
    return [
      this.value,
      this.getReversedValue(),
    ];
  }

  public normalize(value: string): string {
    return value.normalize();
  }

  private processValue(): void {
    this.convertToLowercase();
    this.removeDiacratics();
    this.removePunctuation();
    this.removeSpaces();
  }

  private removeDiacratics(): void {
    this.value = removeDiacratics(this.value);
  }

  private removePunctuation(): void {
    const punctuationRegExp = /[\u2000-\u206F\u2E00-\u2E7F\u3000-\u303f\\'!"#$%&()*+,，\-./:;<=>?@[\]^_`{|}~]/g;
    this.value = this.value.replace(punctuationRegExp, '');
  }

  private convertToLowercase(): void {
    this.value = this.value.toLocaleLowerCase();
  }

  private removeSpaces(): void {
    this.value = this.value.replace(/\s+/g, '');
  }

  private getReversedValue(): string {
    return this.value.split('').reverse().join('');
  }
}
