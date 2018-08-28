/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

describe('TYPE: Array', () => {
  describe('Type validator', () => {
    it('should return false if passed value is a Boolean', () => {
      const validator = 'Array';
      const value = true;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Null', () => {
      const validator = 'Array';
      const value = null;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Undefined', () => {
      const validator = 'Array';
      const value = undefined;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Number', () => {
      const validator = 'Array';
      const value = 1;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a String', () => {
      const validator = 'Array';
      const value = '';
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Symbol', () => {
      const validator = 'Array';
      const value = Symbol('Symbol description');
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Object', () => {
      const validator = 'Array';
      const value = {};
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Function returning undefined', () => {
      const validator = 'Array';
      const value = () => [];
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return true if passed value is an Array', () => {
      const validator = 'Array';
      const value = [];
      expect(handyValidator(validator, value)).toEqual(true);
    });
  });

  describe('Value validators', () => {
    describe('[<] validator', () => {
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

      it('should return false if passed value is an 6 elements Array [VAL: Array|<-10]', () => {
        const validator = 'Array|<-10';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is an 6 elements Array [VAL: Array|<6.28]', () => {
        const validator = 'Array|<6.28';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is an 8 elements Array [VAL: Array|<6.28]', () => {
        const validator = 'Array|<6.28';
        const value = [1, 2, 3, 4, 5, 6, 7, 8];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is an 6 elements Array [VAL: Array|<-6.28]', () => {
        const validator = 'Array|<-6.28';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is an 6 elements Array [VAL: Array|<Infinity]', () => {
        const validator = 'Array|<Infinity';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is an 6 elements Array [VAL: Array|<-Infinity]', () => {
        const validator = 'Array|<-Infinity';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(false);
      });
    });
    describe('[>] validator', () => {
      it('should return true if passed value is an 11 elements Array [VAL: Array|>10]', () => {
        const validator = 'Array|>10';
        const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is an 8 elements Array [VAL: Array|>10]', () => {
        const validator = 'Array|>10';
        const value = [1, 2, 3, 4, 5, 6, 7, 8];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is an 6 elements Array [VAL: Array|>-10]', () => {
        const validator = 'Array|>-10';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return true if passed value is an 7 elements Array [VAL: Array|>6.28]', () => {
        const validator = 'Array|>6.28';
        const value = [1, 2, 3, 4, 5, 6, 7];
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is an 5 elements Array [VAL: Array|>6.28]', () => {
        const validator = 'Array|>6.28';
        const value = [1, 2, 3, 4, 5];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is an 6 elements Array [VAL: Array|>-6.28]', () => {
        const validator = 'Array|>-6.28';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is an 6 elements Array [VAL: Array|>Infinity]', () => {
        const validator = 'Array|>Infinity';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is an 6 elements Array [VAL: Array|>-Infinity]', () => {
        const validator = 'Array|>-Infinity';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(true);
      });
    });
    describe('[=] validator', () => {
      it('should return true if passed value is an 10 elements Array [VAL: Array|=10]', () => {
        const validator = 'Array|=10';
        const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is an 8 elements Array [VAL: Array|=10]', () => {
        const validator = 'Array|=10';
        const value = [1, 2, 3, 4, 5, 6, 7, 8];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is an 6 elements Array [VAL: Array|=-10]', () => {
        const validator = 'Array|=-10';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is an 7 elements Array [VAL: Array|=6.28]', () => {
        const validator = 'Array|=6.28';
        const value = [1, 2, 3, 4, 5, 6, 7];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is an 5 elements Array [VAL: Array|=6.28]', () => {
        const validator = 'Array|=6.28';
        const value = [1, 2, 3, 4, 5];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is an 6 elements Array [VAL: Array|=-6.28]', () => {
        const validator = 'Array|=-6.28';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is an 6 elements Array [VAL: Array|=Infinity]', () => {
        const validator = 'Array|=Infinity';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is an 6 elements Array [VAL: Array|=-Infinity]', () => {
        const validator = 'Array|=-Infinity';
        const value = [1, 2, 3, 4, 5, 6];
        expect(handyValidator(validator, value)).toEqual(false);
      });
    });
  });

  describe('Value validator [UNKNOWN VALIDATOR]', () => {
    it('should call console.warn & return false if passed an unknown validator [VAL:Array|THIS_IS_BAD_VALIDATOR|<5]', () => {
      jest.spyOn(global.console, 'warn');

      const validator = 'Array|THIS_IS_BAD_VALIDATOR|<5';
      const value = [1, 2, 3, 4];

      expect(handyValidator(validator, value)).toEqual(false);
      expect(console.warn.mock.calls.length).toBe(1);

      jest.restoreAllMocks();
    });
  });
});
