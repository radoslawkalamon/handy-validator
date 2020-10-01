// @ts-nocheck
import { HandyValidator } from '@src/HandyValidator';
import { NumberValidator } from '@validators/number';
import { BiggerThanNumberOperator } from '@validators/number/operators/BiggerThan';
import { BiggerThanEqualNumberOperator } from '@validators/number/operators/BiggerThanEqual';
import { EqualToNumberOperator } from '@validators/number/operators/EqualTo';
import { SmallerThanNumberOperator } from '@validators/number/operators/SmallerThan';
import { SmallerThanEqualNumberOperator } from '@validators/number/operators/SmallerThanEqual';

describe('Number validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'number';

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  describe('Type validator', () => {
    it('Boolean passed - should return false', () => {
      const value = true;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Null passed - should return false', () => {
      const value = null;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Undefined passed - should return false', () => {
      const value = undefined;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Number passed - should return true', () => {
      const value = 1;
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('NaN passed - should return true', () => {
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('String passed - should return false', () => {
      const value = '';
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('"123" String passed - should return false', () => {
      const value = '123';
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Symbol passed - should return false', () => {
      const value = Symbol('Symbol description');
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Object passed - should return false', () => {
      const value = {};
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Function returning Number passed - should return false', () => {
      const value = () => 3;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Array passed - should return false', () => {
      const value = [];
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });
  });

  describe('operatorArguments validations', () => {
    it('operatorArguments is not an Array - should throw error', () => {
      expect(() => {
        const value = 15;
        const operatorArguments = [['<', 123], 'str'];
        HandyVal.validate(validator, value, ...operatorArguments);
      }).toThrow(NumberValidator.errors.validationRuleNotArray);
    });

    it('operatorArguments unknown operator - should throw error', () => {
      expect(() => {
        const value = 12.55;
        const operatorArguments = [[123, '<'], [undefined, {}]];
        HandyVal.validate(validator, value, ...operatorArguments);
      }).toThrow(NumberValidator.errors.validationRuleUnknownOperator);
    });
  });

  describe('Value validators', () => {
    describe('[>=] validator', () => {
      const operator = '>=';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 44;
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(BiggerThanEqualNumberOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not number - should throw error', () => {
          expect(() => {
            const value = 50.77;
            const operatorArguments = [[operator, 'string']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(BiggerThanEqualNumberOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = 34.20;
          const operatorArguments = [[operator, 10.22]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return true', () => {
          const value = 367;
          const operatorArguments = [[operator, 367]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = 112.22;
          const operatorArguments = [[operator, 654.22]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[<=] validator', () => {
      const operator = '<=';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 44;
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(SmallerThanEqualNumberOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not number - should throw error', () => {
          expect(() => {
            const value = 50.77;
            const operatorArguments = [[operator, 'string']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(SmallerThanEqualNumberOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = 31.20;
          const operatorArguments = [[operator, 4443.22]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return true', () => {
          const value = 111;
          const operatorArguments = [[operator, 111]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = 979653.11323213;
          const operatorArguments = [[operator, 5123]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[<] validator', () => {
      const operator = '<';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 44;
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(SmallerThanNumberOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not number - should throw error', () => {
          expect(() => {
            const value = 50.77;
            const operatorArguments = [[operator, 'string']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(SmallerThanNumberOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = 11.22;
          const operatorArguments = [[operator, 22.333]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = 6533;
          const operatorArguments = [[operator, 6533]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return false', () => {
          const value = 300;
          const operatorArguments = [[operator, 200]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[>] validator', () => {
      const operator = '>';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 44;
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(BiggerThanNumberOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not number - should throw error', () => {
          expect(() => {
            const value = 50.77;
            const operatorArguments = [[operator, 'string']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(BiggerThanNumberOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = 10e5;
          const operatorArguments = [[operator, 256]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = 34.12;
          const operatorArguments = [[operator, 34.12]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return false', () => {
          const value = -Infinity;
          const operatorArguments = [[operator, Infinity]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[=] validator', () => {
      const operator = '=';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 44;
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(EqualToNumberOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not number - should throw error', () => {
          expect(() => {
            const value = 50.77;
            const operatorArguments = [[operator, 'string']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(EqualToNumberOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = 612;
          const operatorArguments = [[operator, 612]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = 1312;
          const operatorArguments = [[operator, 24134]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return false', () => {
          const value = 10e2;
          const operatorArguments = [[operator, 10e7]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });
  });

  describe('Groups', () => {
    it('should return true', () => {
      const value = 340;
      const operatorArguments = [['<', 10e7], ['>', 100], ['=', 340]];
      expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
    });

    it('should return false', () => {
      const value = 44.3012;
      const operatorArguments = [['>', 70], ['<', 30], ['=', 111], ['=', 222]];
      expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
    });

    it('should return false', () => {
      const value = 100;
      const operatorArguments = [['>', 70], ['=', 50]];
      expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
    });
  });
});
