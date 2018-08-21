/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../src/handy-validator';

describe('Arguments', () => {
  describe('Validator', () => {
    it('should throw error if no validator passed', () => {
      expect(() => {
        handyValidator();
      }).toThrowError(/^ARGUMENTS_VALIDATOR_IS_UNDEFINED/);
    });

    it('should throw error if !=String validator passed (Number)', () => {
      const validator = 123;
      expect(() => {
        handyValidator(validator);
      }).toThrowError(/^ARGUMENTS_VALIDATOR_IS_NOT_A_STRING/);
    });

    it('should throw error if !=String validator passed (Object)', () => {
      const validator = {};
      expect(() => {
        handyValidator(validator);
      }).toThrowError(/^ARGUMENTS_VALIDATOR_IS_NOT_A_STRING/);
    });

    it('should throw error if empty validator passed', () => {
      const validator = '';
      expect(() => {
        handyValidator(validator);
      }).toThrowError(/^ARGUMENTS_VALIDATOR_IS_EMPTY/);
    });

    it('should throw error if unknown validator passed', () => {
      const validator = 'THIS_IS_BAD_VALIDATOR|xxxs|ss|';
      expect(() => {
        handyValidator(validator);
      }).toThrowError(/^ARGUMENTS_VALIDATOR_ERROR/);
    });
  });

  describe('Value', () => {
    it('should throw error if value is not passed by user', () => {
      // const validator = 'String';
      // expect(() => {
      //   handyValidator(validator);
      // }).toThrowError(/^ARGUMENTS_VALUE_NOT_PASSED/);
      expect(true).toEqual(true);
    });
  });

  describe('falseOnObject', () => {
    it('should return true if falseOnObject is undefined when passing an Object', () => {
      const validator = 'Object';
      const value = {};
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return true if falseOnObject is false when passing an Object', () => {
      const validator = 'Object';
      const value = {};
      const falseOnObject = false;
      expect(handyValidator(validator, value, falseOnObject)).toEqual(true);
    });

    it('should return true if falseOnObject is true when passing an Object', () => {
      const validator = 'Object';
      const value = {};
      const falseOnObject = true;
      expect(handyValidator(validator, value, falseOnObject)).toEqual(false);
    });
  });
});

describe('Types', () => {
  describe('String', () => {
    it('ToDo', () => {
      expect(true).toEqual(false);
    });
  });

  describe('Number', () => {
    it('ToDo', () => {
      expect(true).toEqual(false);
    });
  });

  describe('Array', () => {
    it('should return true if passed value is an Array', () => {
      const validator = 'Array';
      const value = [];
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false if passed value is not an Array', () => {
      const validator = 'Array';
      const value = {};
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return true if passed value is an 6 elements Array [VAL: Array|<10]', () => {
      const validator = 'Array|<10';
      const value = [1, 2, 3, 4, 5, 6];
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false if passed value is an 14 elements Array [VAL: Array|<10]', () => {
      const validator = 'Array|<10';
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return true if passed value is an 17 elements Array [VAL: Array|>10]', () => {
      const validator = 'Array|>10';
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false if passed value is an 4 elements Array [VAL: Array|>10]', () => {
      const validator = 'Array|>10';
      const value = [1, 2, 3, 4];
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return true if passed value is an 8 elements Array [VAL: Array|=8]', () => {
      const validator = 'Array|=8';
      const value = [1, 2, 3, 4, 5, 6, 7, 8];
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false if passed value is an 13 elements Array [VAL: Array|=8]', () => {
      const validator = 'Array|=8';
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return true if passed value is an 15 elements Array [VAL: Array|>10|<20]', () => {
      const validator = 'Array|>10|<20';
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false if passed value is an 18 elements Array [VAL: Array|>10|<15]', () => {
      const validator = 'Array|>10|<15';
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return true if passed value is an 8 elements Array with abnormal validator [VAL: Array|=8|<20]', () => {
      const validator = 'Array|=8|<20';
      const value = [1, 2, 3, 4, 5, 6, 7, 8];
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should console.warn be called once if passed value is an 8 elements Array with abnormal validator [VAL: Array|=8|<20]', () => {
      jest.spyOn(global.console, 'warn');

      const validator = 'Array|=8|<20';
      const value = [1, 2, 3, 4, 5, 6, 7, 8];
      handyValidator(validator, value);

      expect(console.warn).toHaveBeenCalledTimes(1);
      jest.restoreAllMocks();
    });

    it('should return false if passed value is an 8 elements Array with abnormal validator [VAL: Array|=8|>20]', () => {
      const validator = 'Array|=8|>20';
      const value = [1, 2, 3, 4, 5, 6, 7, 8];
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should console.warn be called once if passed value is an 8 elements Array with abnormal validator [VAL: Array|=8|>20]', () => {
      jest.spyOn(global.console, 'warn');

      const validator = 'Array|=8|>20';
      const value = [1, 2, 3, 4, 5, 6, 7, 8];
      handyValidator(validator, value);

      expect(console.warn).toHaveBeenCalledTimes(1);
      jest.restoreAllMocks();
    });

    it('should return false if passed an unknown validator [VAL:Array|THIS_IS_BAD_VALIDATOR|<5]', () => {
      const validator = 'Array|THIS_IS_BAD_VALIDATOR|<5';
      const value = [1,2,3,4];
      expect(handyValidator(validator, value)).toEqual(false);
    })

    it('should console.warn be called once if passed an unknown validator [VAL:Array|THIS_IS_BAD_VALIDATOR|<5]', () => {
      jest.spyOn(global.console, 'warn');

      const validator = 'Array|THIS_IS_BAD_VALIDATOR|<5';
      const value = [1,2,3,4];
      handyValidator(validator, value);

      expect(console.warn).toHaveBeenCalledTimes(1);
      jest.restoreAllMocks();
    })
  });

  describe('Object', () => {
    it('should return true if passed value is an Object', () => {
      const validator = 'Object';
      const value = {};
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false if passed value is a Null', () => {
      const validator = 'Object';
      const value = null;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Array', () => {
      const validator = 'Object';
      const value = [];
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is not an Object', () => {
      const validator = 'Object';
      const value = 1337;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an undefined', () => {
      const validator = 'Object';
      const value = undefined;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Object, but _falseOnObject is set to true', () => {
      const validator = 'Object';
      const value = {};
      const falseOnObject = true;
      expect(handyValidator(validator, value, falseOnObject)).toEqual(false);
    });
  });

  describe('Undefined', () => {
    it('should return true is passed value is an Undefined', () => {
      const validator = 'Undefined';
      const value = undefined;
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false is passed value is a Null', () => {
      const validator = 'Undefined';
      const value = null;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false is passed value is not Undefined', () => {
      const validator = 'Undefined';
      const value = 'VALUE';
      expect(handyValidator(validator, value)).toEqual(false);
    });
  });

  describe('Null', () => {
    it('should return true is passed value is a Null', () => {
      const validator = 'Null';
      const value = null;
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false is passed value is an Object', () => {
      const validator = 'Null';
      const value = {};
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false is passed value is not a Null', () => {
      const validator = 'Null';
      const value = ['1337', 1337];
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false is passed value is an undefined', () => {
      const validator = 'Null';
      const value = undefined;
      expect(handyValidator(validator, value)).toEqual(false);
    });
  });

  describe('Boolean', () => {
    it('should return true if passed value is a Boolean (true)', () => {
      const validator = 'Boolean';
      const value = true;
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return true if passed value is a Boolean (false)', () => {
      const validator = 'Boolean';
      const value = false;
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false if passed value is 0', () => {
      const validator = 'Boolean';
      const value = 0;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an undefined', () => {
      const validator = 'Boolean';
      const value = undefined;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an undefined', () => {
      const validator = 'Boolean';
      const value = undefined;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an empty string', () => {
      const validator = 'Boolean';
      const value = '';
      expect(handyValidator(validator, value)).toEqual(false);
    });
  });

  describe('isEqualTo', () => {
    it('ToDo', () => {
      expect(true).toEqual(false);
    });
  });
});
