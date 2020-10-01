import { HandyValidatorPlugin } from '@src/HandyValidatorPlugin';
import { IOperatorArguments, IOperatorClasses } from '@validators/array/interfaces';
import { EqualToArrayOperator } from '@validators/array/operators/EqualTo';
import { BiggerThanArrayOperator } from '@validators/array/operators/BiggerThan';
import { BiggerThanEqualArrayOperator } from '@validators/array/operators/BiggerThanEqual';
import { SmallerThanArrayOperator } from '@validators/array/operators/SmallerThan';
import { SmallerThanEqualArrayOperator } from '@validators/array/operators/SmallerThanEqual';

/**
 * Array validator
 * @version 2.0.0
 */
export class ArrayValidator extends HandyValidatorPlugin {
  static operatorClasses: IOperatorClasses = {
    '=': new EqualToArrayOperator(),
    '>': new BiggerThanArrayOperator(),
    '>=': new BiggerThanEqualArrayOperator(),
    '<': new SmallerThanArrayOperator(),
    '<=': new SmallerThanEqualArrayOperator(),
  }

  static errors = {
    operatorArgumentsNotArray: 'HVP_ARRAY_OPERATOR_ARGUMENTS_NOT_ARRAY',
    operatorArgumentsUnknownOperator: 'HVP_ARRAY_OPERATOR_ARGUMENTS_UNKNOWN_OPERATOR',
  }

  public validate(value: unknown, ...operatorArgumentsGroup: unknown[]): boolean {
    if (!this.isArray(value)) {
      return false;
    }

    if (this.validateOperatorArgumentsGroup(operatorArgumentsGroup)) {
      for (let i = 0, max = operatorArgumentsGroup.length; i < max; i += 1) {
        const operatorArguments = operatorArgumentsGroup[i];
        const validation = this.doOperatorCallback(value, operatorArguments);
        if (!validation) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  private isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  private validateOperatorArgumentsGroup(operatorArgumentsGroup: unknown[]): operatorArgumentsGroup is IOperatorArguments[] {
    operatorArgumentsGroup.forEach((operatorArguments) => {
      const validations = [
        {
          condition: () => this.isArray(operatorArguments),
          assumption: false,
          error: ArrayValidator.errors.operatorArgumentsNotArray,
        },
        {
          condition: () => this.isOperatorPermitted(operatorArguments as IOperatorArguments),
          assumption: false,
          error: ArrayValidator.errors.operatorArgumentsUnknownOperator,
        },
      ];
      this.processValidations(validations);
      this.doOperatorValidations(operatorArguments as IOperatorArguments);
    });
    return true;
  }

  private isOperatorPermitted(operatorArguments: IOperatorArguments): boolean {
    const operator = operatorArguments[0];
    const operatorsPermitted: string[] = Object.keys(ArrayValidator.operatorClasses);
    return operatorsPermitted.includes(operator);
  }

  private doOperatorValidations(operatorArguments: IOperatorArguments) {
    const operator = operatorArguments[0];
    return ArrayValidator.operatorClasses[operator].validateOperatorArguments(operatorArguments);
  }

  private doOperatorCallback(value: unknown[], operatorArguments: IOperatorArguments) {
    const operator = operatorArguments[0];
    operatorArguments.shift();
    return ArrayValidator.operatorClasses[operator].callback(value, ...operatorArguments);
  }
}
