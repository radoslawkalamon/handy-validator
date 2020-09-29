// @ts-nocheck
import { HandyValidator } from '../../../src/HandyValidator';
import { ArrayValidator } from '../../../src/validators/array';
import { BiggerThanArrayOperator } from '../../../src/validators/array/operators/BiggerThan';
import { BiggerThanEqualArrayOperator } from '../../../src/validators/array/operators/BiggerThanEqual';
import { EqualToArrayOperator } from '../../../src/validators/array/operators/EqualTo';
import { SmallerThanArrayOperator } from '../../../src/validators/array/operators/SmallerThan';
import { SmallerThanEqualArrayOperator } from '../../../src/validators/array/operators/SmallerThanEqual';

describe('Array validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'array';

  beforeAll(() => {
    HandyVal = new HandyValidator();
  });

  describe('Type', () => {
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

    it('Number passed - should return false', () => {
      const value = 1;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('NaN passed - should return false', () => {
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('String passed - should return false', () => {
      const value = '';
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('"[]" String passed - should return false', () => {
      const value = '[]';
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

    it('Function returning Array passed - should return false', () => {
      const value = () => [];
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Array passed - should return true', () => {
      const value = [];
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });
  });

  describe('operatorArguments validations', () => {
    it('operatorArguments is not an Array - should throw error', () => {
      expect(() => {
        const value = [1, 2, 3];
        const operatorArguments = [['<', 123], 'str'];
        HandyVal.validate(validator, value, ...operatorArguments);
      }).toThrow(ArrayValidator.errors.validationRuleNotArray);
    });

    it('operatorArguments unknown operator - should throw error', () => {
      expect(() => {
        const value = [1, 2, 3];
        const operatorArguments = [[123, '<'], [undefined, {}]];
        HandyVal.validate(validator, value, ...operatorArguments);
      }).toThrow(ArrayValidator.errors.validationRuleUnknownOperator);
    });
  });

  describe('Operators', () => {
    describe('[=] validator', () => {
      const operator = '=';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(EqualToArrayOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not integer - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 63.554]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(EqualToArrayOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = [1, 2, 3];
          const operatorArguments = [[operator, 3]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = [1, 2, 3, 4];
          const operatorArguments = [[operator, 8]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[>] validator', () => {
      const operator = '>';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(BiggerThanArrayOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not integer - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 63.554]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(BiggerThanArrayOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = [1, 2, 3, undefined, 12, 333];
          const operatorArguments = [[operator, 2]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = [1, 'string', null, undefined];
          const operatorArguments = [[operator, 12]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[>=] validator', () => {
      const operator = '>=';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(BiggerThanEqualArrayOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not integer - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 63.554]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(BiggerThanEqualArrayOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = [1, 2, 3, undefined, 12, 333];
          const operatorArguments = [[operator, 6]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return true', () => {
          const value = [1, 2, 3, undefined, 12, 333];
          const operatorArguments = [[operator, 2]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = [1, 'string', null, undefined];
          const operatorArguments = [[operator, 12]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[<] validator', () => {
      const operator = '<';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(SmallerThanArrayOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not integer - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 63.554]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(SmallerThanArrayOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = [1, 2, 3, undefined, 12, 333];
          const operatorArguments = [[operator, 12]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = [1, 2, 3, undefined, 12, 333];
          const operatorArguments = [[operator, 5]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[<=] validator', () => {
      const operator = '<=';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 123, 123], [operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(SmallerThanEqualArrayOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not integer - should throw error', () => {
          expect(() => {
            const value = [1, 2, 3];
            const operatorArguments = [[operator, 63.554]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(SmallerThanEqualArrayOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = [1, 2, 3, undefined, 12, 333];
          const operatorArguments = [[operator, 12]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return true', () => {
          const value = [1, 2, 3, undefined, 12, 333];
          const operatorArguments = [[operator, 6]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = [1, 2, 3, undefined, 12, 333];
          const operatorArguments = [[operator, 5]];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });
  });

  describe('Groups', () => {
    it('should return true', () => {
      const value = [1, 2, 3, undefined, 12, 333];
      const operatorArguments = [['>', 5], ['<', 10], ['=', 6]];
      expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
    });

    it('should return false', () => {
      const value = [1, 'string', null, undefined];
      const operatorArguments = [['>', 5], ['<', 10], ['=', 6]];
      expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
    });
  });
});
