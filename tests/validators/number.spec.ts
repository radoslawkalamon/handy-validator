import HandyValidator from '../../src/index';

let HandyVal: HandyValidator;

beforeAll(() => {
  HandyVal = new HandyValidator();
});

describe('Number validator tests', () => {
  describe('Type validator', () => {
    it('should return false if passed value is a Boolean', () => {
      const validator = 'number';
      const value = true;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Null', () => {
      const validator = 'number';
      const value = null;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Undefined', () => {
      const validator = 'number';
      const value = undefined;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return true if passed value is a Number', () => {
      const validator = 'number';
      const value = 1;
      expect(HandyVal.validate(validator, value)).toEqual(true);
    });

    it('should return true if passed value is a NaN', () => {
      const validator = 'number';
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toEqual(true);
    });

    it('should return false if passed value is a String', () => {
      const validator = 'number';
      const value = '';
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Symbol', () => {
      const validator = 'number';
      const value = Symbol('Symbol description');
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Object', () => {
      const validator = 'number';
      const value = {};
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Function returning undefined', () => {
      const validator = 'number';
      const value = (): number => 3;
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Array', () => {
      const validator = 'number';
      const value: any[] = [];
      expect(HandyVal.validate(validator, value)).toEqual(false);
    });
  });

  describe('Value validators', () => {
    describe('[>=] validator', () => {
      it('should return true if passed value is 6 [VAL: Number|>=3]', () => {
        const validator = 'number';
        const value = 6;
        const validationArguments = [['>=', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is 3 [VAL: Number|>=3]', () => {
        const validator = 'number';
        const value = 3;
        const validationArguments = [['>=', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 1 [VAL: Number|>=3]', () => {
        const validator = 'number';
        const value = 1;
        const validationArguments = [['>=', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -1 [VAL: Number|>=-3]', () => {
        const validator = 'number';
        const value = -1;
        const validationArguments = [['>=', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is -3 [VAL: Number|>=-3]', () => {
        const validator = 'number';
        const value = -3;
        const validationArguments = [['>=', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -340 [VAL: Number|>=-3]', () => {
        const validator = 'number';
        const value = -340;
        const validationArguments = [['>=', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is 13.23 [VAL: Number|>=10.34]', () => {
        const validator = 'number';
        const value = 13.23;
        const validationArguments = [['>=', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is 10.34 [VAL: Number|>=10.34]', () => {
        const validator = 'number';
        const value = 10.34;
        const validationArguments = [['>=', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 6.45 [VAL: Number|>=10.34]', () => {
        const validator = 'number';
        const value = 6.45;
        const validationArguments = [['>=', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -4.23 [VAL: Number|>=-10.34]', () => {
        const validator = 'number';
        const value = -4.23;
        const validationArguments = [['>=', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is -10.34 [VAL: Number|>=-10.34]', () => {
        const validator = 'number';
        const value = -10.34;
        const validationArguments = [['>=', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -16.45 [VAL: Number|>=-10.34]', () => {
        const validator = 'number';
        const value = -16.45;
        const validationArguments = [['>=', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is 120.23 [VAL: Number|>=Infinity]', () => {
        const validator = 'number';
        const value = 120.23;
        const validationArguments = [['>=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is -Infinity [VAL: Number|>=Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['>=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is Infinity [VAL: Number|>=Infinity]', () => {
        const validator = 'number';
        const value = Infinity;
        const validationArguments = [['>=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is 230 [VAL: Number|>=-Infinity]', () => {
        const validator = 'number';
        const value = 230;
        const validationArguments = [['>=', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is Infinity [VAL: Number|>=-Infinity]', () => {
        const validator = 'number';
        const value = Infinity;
        const validationArguments = [['>=', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is -Infinity [VAL: Number|>=-Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['>=', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });
    });

    describe('[<=] validator', () => {
      it('should return true if passed value is 2 [VAL: Number|<=3]', () => {
        const validator = 'number';
        const value = 2;
        const validationArguments = [['<=', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is 3 [VAL: Number|<=3]', () => {
        const validator = 'number';
        const value = 3;
        const validationArguments = [['<=', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 5 [VAL: Number|<=3]', () => {
        const validator = 'number';
        const value = 5;
        const validationArguments = [['<=', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -340 [VAL: Number|<=-3]', () => {
        const validator = 'number';
        const value = -340;
        const validationArguments = [['<=', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is -340 [VAL: Number|<=-340]', () => {
        const validator = 'number';
        const value = -340;
        const validationArguments = [['<=', -340]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -1 [VAL: Number|<=-3]', () => {
        const validator = 'number';
        const value = -1;
        const validationArguments = [['<=', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is 3.23 [VAL: Number|<=10.34]', () => {
        const validator = 'number';
        const value = 3.23;
        const validationArguments = [['<=', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is 10.34 [VAL: Number|<=10.34]', () => {
        const validator = 'number';
        const value = 10.34;
        const validationArguments = [['<=', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 26.45 [VAL: Number|<=10.34]', () => {
        const validator = 'number';
        const value = 26.45;
        const validationArguments = [['<=', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -340.23 [VAL: Number|<=-10.34]', () => {
        const validator = 'number';
        const value = -340.23;
        const validationArguments = [['<=', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is -10.34 [VAL: Number|<=-10.34]', () => {
        const validator = 'number';
        const value = -10.34;
        const validationArguments = [['<=', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -6.45 [VAL: Number|<=-10.34]', () => {
        const validator = 'number';
        const value = -6.45;
        const validationArguments = [['<=', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is 120.23 [VAL: Number|<=Infinity]', () => {
        const validator = 'number';
        const value = 120.23;
        const validationArguments = [['<=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is Infinity [VAL: Number|<=Infinity]', () => {
        const validator = 'number';
        const value = Infinity;
        const validationArguments = [['<=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is -Infinity [VAL: Number|<=Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['<=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 230 [VAL: Number|<=-Infinity]', () => {
        const validator = 'number';
        const value = 236;
        const validationArguments = [['<=', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is Infinity [VAL: Number|<=-Infinity]', () => {
        const validator = 'number';
        const value = Infinity;
        const validationArguments = [['<=', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -Infinity [VAL: Number|<=-Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['<=', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });
    });

    describe('[<] validator', () => {
      it('should return true if passed value is 2 [VAL: Number|<3]', () => {
        const validator = 'number';
        const value = 2;
        const validationArguments = [['<', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 5 [VAL: Number|<3]', () => {
        const validator = 'number';
        const value = 5;
        const validationArguments = [['<', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -340 [VAL: Number|<-3]', () => {
        const validator = 'number';
        const value = -340;
        const validationArguments = [['<', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -1 [VAL: Number|<-3]', () => {
        const validator = 'number';
        const value = -1;
        const validationArguments = [['<', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is 3.23 [VAL: Number|<10.34]', () => {
        const validator = 'number';
        const value = 3.23;
        const validationArguments = [['<', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 26.45 [VAL: Number|<10.34]', () => {
        const validator = 'number';
        const value = 26.45;
        const validationArguments = [['<', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -340.23 [VAL: Number|<-10.34]', () => {
        const validator = 'number';
        const value = -340.23;
        const validationArguments = [['<', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -6.45 [VAL: Number|<-10.34]', () => {
        const validator = 'number';
        const value = -6.45;
        const validationArguments = [['<', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is 120.23 [VAL: Number|<Infinity]', () => {
        const validator = 'number';
        const value = 120.23;
        const validationArguments = [['<', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is -Infinity [VAL: Number|<Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['<', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is Infinity [VAL: Number|<Infinity]', () => {
        const validator = 'number';
        const value = Infinity;
        const validationArguments = [['<', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is 230 [VAL: Number|<-Infinity]', () => {
        const validator = 'number';
        const value = 236;
        const validationArguments = [['<', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is Infinity [VAL: Number|<-Infinity]', () => {
        const validator = 'number';
        const value = Infinity;
        const validationArguments = [['<', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is -Infinity [VAL: Number|<-Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['<', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[>] validator', () => {
      it('should return true if passed value is 6 [VAL: Number|>3]', () => {
        const validator = 'number';
        const value = 6;
        const validationArguments = [['>', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 1 [VAL: Number|>3]', () => {
        const validator = 'number';
        const value = 1;
        const validationArguments = [['>', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -1 [VAL: Number|>-3]', () => {
        const validator = 'number';
        const value = -1;
        const validationArguments = [['>', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -340 [VAL: Number|>-3]', () => {
        const validator = 'number';
        const value = -340;
        const validationArguments = [['>', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is 13.23 [VAL: Number|>10.34]', () => {
        const validator = 'number';
        const value = 13.23;
        const validationArguments = [['>', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 6.45 [VAL: Number|>10.34]', () => {
        const validator = 'number';
        const value = 6.45;
        const validationArguments = [['>', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -4.23 [VAL: Number|>-10.34]', () => {
        const validator = 'number';
        const value = -4.23;
        const validationArguments = [['>', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -16.45 [VAL: Number|>-10.34]', () => {
        const validator = 'number';
        const value = -16.45;
        const validationArguments = [['>', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is 120.23 [VAL: Number|>Infinity]', () => {
        const validator = 'number';
        const value = 120.23;
        const validationArguments = [['>', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is -Infinity [VAL: Number|>Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['>', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is Infinity [VAL: Number|>Infinity]', () => {
        const validator = 'number';
        const value = Infinity;
        const validationArguments = [['>', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is 230 [VAL: Number|>-Infinity]', () => {
        const validator = 'number';
        const value = 230;
        const validationArguments = [['>', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return true if passed value is Infinity [VAL: Number|>-Infinity]', () => {
        const validator = 'number';
        const value = Infinity;
        const validationArguments = [['>', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -Infinity [VAL: Number|>-Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['>', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });

    describe('[=] validator', () => {
      it('should return true if passed value is 3 [VAL: Number|=3]', () => {
        const validator = 'number';
        const value = 3;
        const validationArguments = [['=', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 1 [VAL: Number|=3]', () => {
        const validator = 'number';
        const value = 1;
        const validationArguments = [['=', 3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -3 [VAL: Number|=-3]', () => {
        const validator = 'number';
        const value = -3;
        const validationArguments = [['=', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -340 [VAL: Number|=-3]', () => {
        const validator = 'number';
        const value = -340;
        const validationArguments = [['=', -3]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is 10.34 [VAL: Number|=10.34]', () => {
        const validator = 'number';
        const value = 10.34;
        const validationArguments = [['=', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 6.45 [VAL: Number|=10.34]', () => {
        const validator = 'number';
        const value = 6.45;
        const validationArguments = [['=', 10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -10.34 [VAL: Number|=-10.34]', () => {
        const validator = 'number';
        const value = -10.34;
        const validationArguments = [['=', -10.34]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is -16.45 [VAL: Number|=-10.34]', () => {
        const validator = 'number';
        const validationArguments = [['=', -10.34]];
        const value = -16.45;
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is 120.23 [VAL: Number|=Infinity]', () => {
        const validator = 'number';
        const value = 120.23;
        const validationArguments = [['=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return false if passed value is -Infinity [VAL: Number|=Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is Infinity [VAL: Number|=Infinity]', () => {
        const validator = 'number';
        const value = Infinity;
        const validationArguments = [['=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is 230 [VAL: Number|=-Infinity]', () => {
        const validator = 'number';
        const value = 230;
        const validationArguments = [['=', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });

      it('should return true if passed value is -Infinity [VAL: Number|=-Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['=', -Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
      });

      it('should return false if passed value is Infinity [VAL: Number|=-Infinity]', () => {
        const validator = 'number';
        const value = -Infinity;
        const validationArguments = [['=', Infinity]];
        expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
      });
    });
  });

  // describe('Value validator [UNKNOWN VALIDATOR]', () => {
  //   it('should call console.warn & return false if passed an unknown validator [VAL:Number|THIS_IS_BAD_VALIDATOR|<5]', () => {
  //     jest.spyOn(global.console, 'warn');

  //     const validator = 'Number|THIS_IS_BAD_VALIDATOR|<5';
  //     const value = 4;
  //     const validationArguments = ['THIS_IS_BAD_VALIDATOR', '<5'];

  //     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
  //     expect(console.warn.mock.calls.length).toBe(1);

  //     console.warn.mockRestore();
  //   });
  // });
});

// TODO: NaN cases
// TODO: Group cases
