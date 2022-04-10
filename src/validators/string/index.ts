import { HandyValidatorPlugin } from '../../HandyValidatorPlugin';
import { IOperatorArguments, IOperatorClasses } from './interfaces';

import { EqualToStringOperator } from './operators/EqualTo';
import { NotEqualToStringOperator } from './operators/NotEqualTo';
import { ContainsStringOperator } from './operators/Contains';
import { NotContainsStringOperator } from './operators/NotContains';
import { StartsWithStringOperator } from './operators/StartsWith';
import { NotStartsWithStringOperator } from './operators/NotStartsWith';
import { EndsWithStringOperator } from './operators/EndsWith';
import { NotEndsWithStringOperator } from './operators/NotEndsWith';

/**
 * String validator
 * @version 2.0.0
 */
export class StringValidator extends HandyValidatorPlugin {
  static operatorClasses: IOperatorClasses = {
    '=': new EqualToStringOperator(),
    '!=': new NotEqualToStringOperator(),
    '~': new ContainsStringOperator(),
    '!~': new NotContainsStringOperator(),
    '^': new StartsWithStringOperator(),
    '!^': new NotStartsWithStringOperator(),
    $: new EndsWithStringOperator(),
    '!$': new NotEndsWithStringOperator(),
  };

  static errors = {
    operatorArgumentsNotArray: 'HVP_STRING_OPERATOR_ARGUMENTS_NOT_ARRAY',
    operatorArgumentsUnknownOperator: 'HVP_STRING_OPERATOR_ARGUMENTS_UNKNOWN_OPERATOR',
  };

  public validate(value: unknown, ...operatorArgumentsGroup: unknown[]): boolean {
    if (!this.isString(value)) {
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

  private isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  private validateOperatorArgumentsGroup(operatorArgumentsGroup: unknown[]): operatorArgumentsGroup is IOperatorArguments[] {
    operatorArgumentsGroup.forEach((operatorArguments) => {
      const validations = [
        {
          condition: () => this.isArray(operatorArguments),
          assumption: false,
          error: StringValidator.errors.operatorArgumentsNotArray,
        },
        {
          condition: () => this.isOperatorPermitted(operatorArguments as IOperatorArguments),
          assumption: false,
          error: StringValidator.errors.operatorArgumentsUnknownOperator,
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
    const operatorsPermitted: string[] = Object.keys(StringValidator.operatorClasses);
    return operatorsPermitted.includes(operator);
  }

  private doOperatorValidations(operatorArguments: IOperatorArguments) {
    const operator = operatorArguments[0];
    return StringValidator.operatorClasses[operator].validateOperatorArguments(operatorArguments);
  }

  private doOperatorCallback(value: string, operatorArguments: IOperatorArguments) {
    const operator = operatorArguments[0];
    operatorArguments.shift();
    return StringValidator.operatorClasses[operator].callback(value, ...operatorArguments);
  }
}
