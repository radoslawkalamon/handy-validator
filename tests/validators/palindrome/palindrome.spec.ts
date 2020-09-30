// @ts-nocheck
import { HandyValidator } from '../../../src/HandyValidator';
import { PalindromeValidator } from '../../../src/validators/palindrome';
import { PalindromeNumber } from '../../../src/validators/palindrome/PalindromeNumber';

describe('Palindrome validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'palindrome';

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  describe('Type validator', () => {
    it('Boolean passed - should throw error', () => {
      expect(() => {
        const value = true;
        HandyVal.validate(validator, value);
      }).toThrow(PalindromeValidator.errors.valueNotStringOrNumber);
    });

    it('Null passed - should throw error', () => {
      expect(() => {
        const value = null;
        HandyVal.validate(validator, value);
      }).toThrow(PalindromeValidator.errors.valueNotStringOrNumber);
    });

    it('Undefined passed - should throw error', () => {
      expect(() => {
        const value = undefined;
        HandyVal.validate(validator, value);
      }).toThrow(PalindromeValidator.errors.valueNotStringOrNumber);
    });

    it('Number palindrome passed - should return true', () => {
      const value = 121;
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('NaN passed - should throw error', () => {
      expect(() => {
        const value = NaN;
        HandyVal.validate(validator, value);
      }).toThrow(PalindromeNumber.errors.valueNaN);
    });

    it('String palindrome passed - should return true', () => {
      const value = 'LOL';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('Symbol passed - should throw error', () => {
      expect(() => {
        const value = Symbol('Symbol description');
        HandyVal.validate(validator, value);
      }).toThrow(PalindromeValidator.errors.valueNotStringOrNumber);
    });

    it('Object passed - should throw error', () => {
      expect(() => {
        const value = {};
        HandyVal.validate(validator, value);
      }).toThrow(PalindromeValidator.errors.valueNotStringOrNumber);
    });

    it('Function returning string passed - should throw error', () => {
      expect(() => {
        const value = () => 'LOL';
        HandyVal.validate(validator, value);
      }).toThrow(PalindromeValidator.errors.valueNotStringOrNumber);
    });

    it('Function returning number passed - should throw error', () => {
      expect(() => {
        const value = () => 121;
        HandyVal.validate(validator, value);
      }).toThrow(PalindromeValidator.errors.valueNotStringOrNumber);
    });

    it('Array passed - should throw error', () => {
      expect(() => {
        const value = [];
        HandyVal.validate(validator, value);
      }).toThrow(PalindromeValidator.errors.valueNotStringOrNumber);
    });
  });

  describe('Palindrome validator - Strings', () => {
    it('should return true on "Do geese see God?"', () => {
      const value = 'Do geese see God?';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "我爱妈妈，妈妈爱我。"', () => {
      const value = '我爱妈妈，妈妈爱我。';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "Drape gepard?"', () => {
      const value = 'Drape gepard?';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "Ana, kanna kana."', () => {
      const value = 'Ana, kanna kana.';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "Ada, bagaż Aga bada."', () => {
      const value = 'Ada, bagaż Aga bada.';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "Że też łże jeż? łże też!"', () => {
      const value = 'Że też łże jeż? łże też!';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "А роза упала на лапу Азора"', () => {
      const value = 'А роза упала на лапу Азора';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "І що сало? Ласощі"', () => {
      const value = 'І що сало? Ласощі';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return false on "This is not a palindrome!"', () => {
      const value = 'This is not a palindrome!';
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return true on "пуп пуп"', () => {
      const value = 'пуп пуп';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "アジア"', () => {
      const value = 'アジア';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "dåreråd"', () => {
      const value = 'dåreråd';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on "Eine güldne, gute Tugend: Lüge nie!"', () => {
      const value = 'Eine güldne, gute Tugend: Lüge nie!';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    // @TODO: Add more test language / edge cases string
    // @TODO: Add more false test with edge cases
  });

  describe('Palindrome validator - Numbers', () => {
    it('should return true on 123456707654321', () => {
      const value = 123456707654321;
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true on 123456707654521', () => {
      const value = 123456707654521;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    // @TODO: Add more test edge cases number
    // @TODO: Number.MAX_VALUE | NUMBER.MIN_VALUE
  });
});
