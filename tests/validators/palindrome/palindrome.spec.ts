// @ts-nocheck
import HandyValidator from '../../../src/index';
// REMOVE THIS WHEN WORKS ON VERSION 3.2.0 STARTS
import palindromeValidator from '../../../src/validators/palindrome/palindrome';

describe('Palindrome validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'palindrome';

  beforeAll(() => {
    HandyVal = new HandyValidator();
    // REMOVE THIS WHEN WORKS ON VERSION 3.2.0 STARTS
    HandyVal.addValidator(validator, palindromeValidator);
  });

  describe('Type validator', () => {
    it('should return false if passed value is a Boolean', () => {
      const value = true;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return false if passed value is a Null', () => {
      const value = null;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return false if passed value is an Undefined', () => {
      const value = undefined;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return true if passed value is a Number', () => {
      const value = 121;
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true if passed value is a NaN', () => {
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return true if passed value is a String', () => {
      const value = 'LOL';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('should return false if passed value is a Symbol', () => {
      const value = Symbol('Symbol description');
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return false if passed value is an Object', () => {
      const value = {};
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return false if passed value is a Function returning string', () => {
      const value = () => 'LOL';
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return false if passed value is a Function returning number', () => {
      const value = () => 121;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('should return false if passed value is an Array', () => {
      const value = [];
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });
  });
});


// describe('[><] validator', () => {
//   const operator = '><';
//   const validationArguments = [[operator]];

//   it('should return true on "Do geese see God?"', () => {
//     const value = 'Do geese see God?';
//     expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
//   });

//   it('should return true on "我爱妈妈，妈妈爱我。"', () => {
//     const value = '我爱妈妈，妈妈爱我。';
//     expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
//   });

//   it('should return true on "Drape gepard?"', () => {
//     const value = 'Drape gepard?';
//     expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
//   });

//   it('should return true on "Ana, kanna kana."', () => {
//     const value = 'Ana, kanna kana.';
//     expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
//   });

//   it('should return true on "Ada, bagaż Aga bada."', () => {
//     const value = 'Ada, bagaż Aga bada.';
//     expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
//   });

//   it('should return true on "Że też łże jeż? łże też!"', () => {
//     const value = 'Że też łże jeż? łże też!';
//     expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
//   });

//   it('should return true on "А роза упала на лапу Азора"', () => {
//     const value = 'А роза упала на лапу Азора';
//     expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
//   });

//   it('should return true on "І що сало? Ласощі"', () => {
//     const value = 'І що сало? Ласощі';
//     expect(HandyVal.validate(validator, value, validationArguments)).toBeTruthy();
//   });

//   it('should return false on "This is not a palindrome!"', () => {
//     const value = 'This is not a palindrome!';
//     expect(HandyVal.validate(validator, value, validationArguments)).toBeFalsy();
//   });
// });
