// @ts-nocheck
import { HandyValidator } from '@src/HandyValidator';
import { StringValidator } from '@validators/string';
import { EqualToStringOperator } from '@validators/string/operators/EqualTo';
import { NotEqualToStringOperator } from '@validators/string/operators/NotEqualTo';
import { ContainsStringOperator } from '@validators/string/operators/Contains';
import { NotContainsStringOperator } from '@validators/string/operators/NotContains';
import { StartsWithStringOperator } from '@validators/string/operators/StartsWith';
import { NotStartsWithStringOperator } from '@validators/string/operators/NotStartsWith';
import { EndsWithStringOperator } from '@validators/string/operators/EndsWith';
import { NotEndsWithStringOperator } from '@validators/string/operators/NotEndsWith';

describe('String validator', () => {
  let HandyVal: HandyValidator;
  const validator = 'string';

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

    it('Number passed - should return false', () => {
      const value = 1;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('NaN passed - should return false', () => {
      const value = NaN;
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('String passed - should return true', () => {
      const value = '';
      expect(HandyVal.validate(validator, value)).toBeTruthy();
    });

    it('Symbol passed - should return false', () => {
      const value = Symbol('Symbol description');
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Object passed - should return false', () => {
      const value = {};
      expect(HandyVal.validate(validator, value)).toBeFalsy();
    });

    it('Function returning String passed - should return false', () => {
      const value = () => 'This is my string';
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
        const value = 'My string!';
        const operatorArguments = [213];
        HandyVal.validate(validator, value, ...operatorArguments);
      }).toThrow(StringValidator.errors.validationRuleNotArray);
    });

    it('operatorArguments unknown operator - should throw error', () => {
      expect(() => {
        const value = 'My string!';
        const operatorArguments = [[123, '<'], [undefined, {}]];
        HandyVal.validate(validator, value, ...operatorArguments);
      }).toThrow(StringValidator.errors.validationRuleUnknownOperator);
    });
  });

  describe('Value validators', () => {
    describe('[=] validator', () => {
      const operator = '=';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 'This is my string', 'That\'s not cool'], [operator, 'is my']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(EqualToStringOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not string - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(EqualToStringOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = 'This is my string';
          const operatorArguments = [[operator, 'This is my string']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return true', () => {
          const value = '我的中文不好';
          const operatorArguments = [[operator, '我的中文不好']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return true [Unicode]', () => {
          const value = '我的中文不好';
          const operatorArguments = [[operator, '\u6211\u7684\u4E2D\u6587\u4E0D\u597D']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = '我的中文不好';
          const operatorArguments = [[operator, '我的中文很好']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return false', () => {
          const value = 'That\'s cool';
          const operatorArguments = [[operator, 'That\'s not cool']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[!=] validator', () => {
      const operator = '!=';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 'This is my string', 'That\'s not cool'], [operator, 'is my']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(NotEqualToStringOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not string - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(NotEqualToStringOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return false', () => {
          const value = 'This is my string';
          const operatorArguments = [[operator, 'This is my string']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return false', () => {
          const value = '我的中文不好';
          const operatorArguments = [[operator, '我的中文不好']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return false [Unicode]', () => {
          const value = '我的中文不好';
          const operatorArguments = [[operator, '\u6211\u7684\u4E2D\u6587\u4E0D\u597D']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return true', () => {
          const value = '我的中文不好';
          const operatorArguments = [[operator, '我的中文很好']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return true', () => {
          const value = 'That\'s cool';
          const operatorArguments = [[operator, 'That\'s not cool']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });
      });
    });

    describe('[~] validator', () => {
      const operator = '~';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 'This is my string', 'That\'s not cool'], [operator, 'is my']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(ContainsStringOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not string - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(ContainsStringOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = 'This is my string';
          const operatorArguments = [[operator, 'my str']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = 'This is my string';
          const operatorArguments = [[operator, 'my rts']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[!~] validator', () => {
      const operator = '!~';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 'This is my string', 'That\'s not cool'], [operator, 'is my']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(NotContainsStringOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not string - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(NotContainsStringOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return false', () => {
          const value = 'This is my string';
          const operatorArguments = [[operator, 'my str']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return true', () => {
          const value = 'This is my string';
          const operatorArguments = [[operator, 'my rts']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });
      });
    });

    describe('[^] validator', () => {
      const operator = '^';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 'This is my string', 'That\'s not cool'], [operator, 'is my']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(StartsWithStringOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not string - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(StartsWithStringOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = 'This is my string!';
          const operatorArguments = [[operator, 'This is']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = 'This is my string!';
          const operatorArguments = [[operator, 'This not']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });

    describe('[!^] validator', () => {
      const operator = '!^';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 'This is my string', 'That\'s not cool'], [operator, 'is my']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(NotStartsWithStringOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not string - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(NotStartsWithStringOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return false', () => {
          const value = 'This is my string!';
          const operatorArguments = [[operator, 'This is']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return true', () => {
          const value = 'This is my string!';
          const operatorArguments = [[operator, 'This not']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });
      });
    });

    describe('[$] validator', () => {
      const operator = '$';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 'This is my string', 'That\'s not cool'], [operator, 'is my']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(EndsWithStringOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not string - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(EndsWithStringOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return true', () => {
          const value = 'This is my string!';
          const operatorArguments = [[operator, 'my string!']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false', () => {
          const value = 'This is my string!';
          const operatorArguments = [[operator, 'not string!']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return false [-1 / length test]', () => {
          const value = 'hello';
          const operatorArguments = [[operator, 'helllo']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return true [2 planets tests]', () => {
          const value = 'Hello planet earth, you are a great planet';
          const operatorArguments = [[operator, 'planet']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });
      });
    });

    describe('[!$] validator', () => {
      const operator = '!$';

      describe('OperatorArguments validations', () => {
        it('OperatorArguments length is not equal to operator callback args length - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 'This is my string', 'That\'s not cool'], [operator, 'is my']];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(NotEndsWithStringOperator.errors.operatorArgumentsLengthInvalid);
        });

        it('OperatorArguments not string - should throw error', () => {
          expect(() => {
            const value = 'This is my string';
            const operatorArguments = [[operator, 123]];
            HandyVal.validate(validator, value, ...operatorArguments);
          }).toThrow(NotEndsWithStringOperator.errors.operatorArgumentsTypesError);
        });
      });

      describe('Validator tests', () => {
        it('should return false', () => {
          const value = 'This is my string!';
          const operatorArguments = [[operator, 'my string!']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });

        it('should return true', () => {
          const value = 'This is my string!';
          const operatorArguments = [[operator, 'not string!']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return true [-1 / length test]', () => {
          const value = 'hello';
          const operatorArguments = [[operator, 'helllo']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
        });

        it('should return false [2 planets tests]', () => {
          const value = 'Hello planet earth, you are a great planet';
          const operatorArguments = [[operator, 'planet']];
          expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
        });
      });
    });
  });

  describe('Groups', () => {
    it('should return true', () => {
      const value = 'Hello';
      const operatorArguments = [['=', 'Hello'], ['!=', 'Bye'], ['~', 'ell']];
      expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
    });

    it('should return true', () => {
      const value = 'This is very tasty string!';
      const operatorArguments = [['^', 'This is'], ['$', 'string!'], ['!~', 'big tasty']];
      expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeTruthy();
    });

    it('should return false', () => {
      const value = 'This is very tasty string!';
      const operatorArguments = [['$', 'This is'], ['^', 'string!'], ['~', 'big tasty']];
      expect(HandyVal.validate(validator, value, ...operatorArguments)).toBeFalsy();
    });
  });
});
