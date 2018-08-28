/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

describe('TYPE: Number', () => {
  describe('Type validator', () => {
    it('should return false if passed value is a Boolean', () => {
      const validator = 'Number';
      const value = true;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Null', () => {
      const validator = 'Number';
      const value = null;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Undefined', () => {
      const validator = 'Number';
      const value = undefined;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return true if passed value is a Number', () => {
      const validator = 'Number';
      const value = 1;
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false if passed value is a String', () => {
      const validator = 'Number';
      const value = '';
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Symbol', () => {
      const validator = 'Number';
      const value = Symbol('Symbol description');
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Object', () => {
      const validator = 'Number';
      const value = {};
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Function returning undefined', () => {
      const validator = 'Number';
      const value = () => 3;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Array', () => {
      const validator = 'Number';
      const value = [];
      expect(handyValidator(validator, value)).toEqual(false);
    });
  });

  describe('Value validators', () => {
    describe('[<] validator', () => {
      it('should return true if passed value is 2 [VAL: Number|<3]', () => {
        const validator = 'Number|<3';
        const value = 2;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is 5 [VAL: Number|<3]', () => {
        const validator = 'Number|<3';
        const value = 5;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is -340 [VAL: Number|<-3]', () => {
        const validator = 'Number|<-3';
        const value = -340;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is -1 [VAL: Number|<-3]', () => {
        const validator = 'Number|<-3';
        const value = -1;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is 3.23 [VAL: Number|<10.34]', () => {
        const validator = 'Number|<10.34';
        const value = 3.23;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is 26.45 [VAL: Number|<10.34]', () => {
        const validator = 'Number|<10.34';
        const value = 26.45;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is -340.23 [VAL: Number|<-10.34]', () => {
        const validator = 'Number|<-10.34';
        const value = -340.23;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is -6.45 [VAL: Number|<-10.34]', () => {
        const validator = 'Number|<-10.34';
        const value = -6.45;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is 120.23 [VAL: Number|<Infinity]', () => {
        const validator = 'Number|<Infinity';
        const value = 120.23;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return true if passed value is -Infinity [VAL: Number|<Infinity]', () => {
        const validator = 'Number|<Infinity';
        const value = -Infinity;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is Infinity [VAL: Number|<Infinity]', () => {
        const validator = 'Number|<Infinity';
        const value = Infinity;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is 230 [VAL: Number|<-Infinity]', () => {
        const validator = 'Number|<-Infinity';
        const value = 236;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is Infinity [VAL: Number|<-Infinity]', () => {
        const validator = 'Number|<-Infinity';
        const value = Infinity;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is -Infinity [VAL: Number|<-Infinity]', () => {
        const validator = 'Number|<-Infinity';
        const value = -Infinity;
        expect(handyValidator(validator, value)).toEqual(false);
      });
    });
    describe('[>] validator', () => {
      it('should return true if passed value is 6 [VAL: Number|>3]', () => {
        const validator = 'Number|>3';
        const value = 6;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is 1 [VAL: Number|>3]', () => {
        const validator = 'Number|>3';
        const value = 1;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is -1 [VAL: Number|>-3]', () => {
        const validator = 'Number|>-3';
        const value = -1;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is -340 [VAL: Number|>-3]', () => {
        const validator = 'Number|>-3';
        const value = -340;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is 13.23 [VAL: Number|>10.34]', () => {
        const validator = 'Number|>10.34';
        const value = 13.23;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is 6.45 [VAL: Number|>10.34]', () => {
        const validator = 'Number|>10.34';
        const value = 6.45;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is -4.23 [VAL: Number|>-10.34]', () => {
        const validator = 'Number|>-10.34';
        const value = -4.23;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is -16.45 [VAL: Number|>-10.34]', () => {
        const validator = 'Number|>-10.34';
        const value = -16.45;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is 120.23 [VAL: Number|>Infinity]', () => {
        const validator = 'Number|>Infinity';
        const value = 120.23;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is -Infinity [VAL: Number|>Infinity]', () => {
        const validator = 'Number|>Infinity';
        const value = -Infinity;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is Infinity [VAL: Number|>Infinity]', () => {
        const validator = 'Number|>Infinity';
        const value = Infinity;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is 230 [VAL: Number|>-Infinity]', () => {
        const validator = 'Number|>-Infinity';
        const value = 230;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return true if passed value is Infinity [VAL: Number|>-Infinity]', () => {
        const validator = 'Number|>-Infinity';
        const value = Infinity;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is -Infinity [VAL: Number|>-Infinity]', () => {
        const validator = 'Number|>-Infinity';
        const value = -Infinity;
        expect(handyValidator(validator, value)).toEqual(false);
      });
    });
    describe('[=] validator', () => {
      it('should return true if passed value is 3 [VAL: Number|=3]', () => {
        const validator = 'Number|=3';
        const value = 3;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is 1 [VAL: Number|=3]', () => {
        const validator = 'Number|=3';
        const value = 1;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is -3 [VAL: Number|=-3]', () => {
        const validator = 'Number|=-3';
        const value = -3;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is -340 [VAL: Number|=-3]', () => {
        const validator = 'Number|=-3';
        const value = -340;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is 10.34 [VAL: Number|=10.34]', () => {
        const validator = 'Number|=10.34';
        const value = 10.34;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is 6.45 [VAL: Number|=10.34]', () => {
        const validator = 'Number|=10.34';
        const value = 6.45;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is -10.34 [VAL: Number|=-10.34]', () => {
        const validator = 'Number|=-10.34';
        const value = -10.34;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is -16.45 [VAL: Number|=-10.34]', () => {
        const validator = 'Number|=-10.34';
        const value = -16.45;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is 120.23 [VAL: Number|=Infinity]', () => {
        const validator = 'Number|=Infinity';
        const value = 120.23;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return false if passed value is -Infinity [VAL: Number|=Infinity]', () => {
        const validator = 'Number|=Infinity';
        const value = -Infinity;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is Infinity [VAL: Number|=Infinity]', () => {
        const validator = 'Number|=Infinity';
        const value = Infinity;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is 230 [VAL: Number|=-Infinity]', () => {
        const validator = 'Number|=-Infinity';
        const value = 230;
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it('should return true if passed value is -Infinity [VAL: Number|=-Infinity]', () => {
        const validator = 'Number|=-Infinity';
        const value = -Infinity;
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it('should return false if passed value is Infinity [VAL: Number|=-Infinity]', () => {
        const validator = 'Number|=Infinity';
        const value = -Infinity;
        expect(handyValidator(validator, value)).toEqual(false);
      });
    });
  });

  describe('Value validator [UNKNOWN VALIDATOR]', () => {
    it('should call console.warn & return false if passed an unknown validator [VAL:Number|THIS_IS_BAD_VALIDATOR|<5]', () => {
      jest.spyOn(global.console, 'warn');

      const validator = 'Number|THIS_IS_BAD_VALIDATOR|<5';
      const value = 4;

      expect(handyValidator(validator, value)).toEqual(false);
      expect(console.warn.mock.calls.length).toBe(1);

      console.warn.mockRestore();
    });
  });
});
