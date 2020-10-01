import { HandyValidatorPlugin } from '@src/HandyValidatorPlugin';
import { IOperatorArguments, IOperatorClasses } from './interfaces';

import { EqualToNumberOperator } from './operators/EqualTo';
import { BiggerThanNumberOperator } from './operators/BiggerThan';
import { BiggerThanEqualNumberOperator } from './operators/BiggerThanEqual';
import { SmallerThanNumberOperator } from './operators/SmallerThan';
import { SmallerThanEqualNumberOperator } from './operators/SmallerThanEqual';

/**
 * Number validator
 * @version 2.0.0
 */
export class NumberValidator extends HandyValidatorPlugin {
  static operatorClasses: IOperatorClasses = {
    '=': new EqualToNumberOperator(),
    '>': new BiggerThanNumberOperator(),
    '>=': new BiggerThanEqualNumberOperator(),
    '<': new SmallerThanNumberOperator(),
    '<=': new SmallerThanEqualNumberOperator(),
  }

  static errors = {
    operatorArgumentsNotArray: 'HVP_NUMBER_OPERATOR_ARGUMENTS_NOT_ARRAY',
    operatorArgumentsUnknownOperator: 'HVP_NUMBER_OPERATOR_ARGUMENTS_UNKNOWN_OPERATOR',
  }

  public validate(value: unknown, ...operatorArgumentsGroup: unknown[]): boolean {
    if (!this.isNumber(value)) {
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

  private isNumber(value: unknown): value is number {
    return typeof value === 'number';
  }

  private validateOperatorArgumentsGroup(operatorArgumentsGroup: unknown[]): operatorArgumentsGroup is IOperatorArguments[] {
    operatorArgumentsGroup.forEach((operatorArguments) => {
      const validations = [
        {
          condition: () => this.isArray(operatorArguments),
          assumption: false,
          error: NumberValidator.errors.operatorArgumentsNotArray,
        },
        {
          condition: () => this.isOperatorPermitted(operatorArguments as IOperatorArguments),
          assumption: false,
          error: NumberValidator.errors.operatorArgumentsUnknownOperator,
        },
      ];
      this.processValidations(validations);
      this.doOperatorValidations(operatorArguments as IOperatorArguments);
    });
    return true;
  }

  private isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  private isOperatorPermitted(operatorArguments: IOperatorArguments): boolean {
    const operator = operatorArguments[0];
    const operatorsPermitted: string[] = Object.keys(NumberValidator.operatorClasses);
    return operatorsPermitted.includes(operator);
  }

  private doOperatorValidations(operatorArguments: IOperatorArguments) {
    const operator = operatorArguments[0];
    return NumberValidator.operatorClasses[operator].validateOperatorArguments(operatorArguments);
  }

  private doOperatorCallback(value: number, operatorArguments: IOperatorArguments) {
    const operator = operatorArguments[0];
    operatorArguments.shift();
    return NumberValidator.operatorClasses[operator].callback(value, ...operatorArguments);
  }
}
