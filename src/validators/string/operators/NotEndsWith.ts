import { IStringOperator, IOperatorArguments, IOperatorConditions } from '@validators/string/interfaces';
import { processOperatorArgumentsValidations } from '@validators/string/utils';

export class NotEndsWithStringOperator implements IStringOperator {
  static errors = {
    operatorArgumentsLengthInvalid: 'HVP_STRING_OPERATOR_ARGUMENTS_LENGTH_INVALID',
    operatorArgumentsTypesError: 'HVP_STRING_OPERATOR_ARGUMENTS_TYPES_ERROR',
  }

  public callback = (x: string, y: string): boolean => ((x.length - y.length) < 0 ? true : x.lastIndexOf(y) !== (x.length - y.length));

  public validateOperatorArguments(operatorArguments: IOperatorArguments): void {
    const operatorConditions: IOperatorConditions[] = [
      {
        condition: this.isOperatorArgumentsLengthCorrect.bind(this),
        assumption: false,
        error: NotEndsWithStringOperator.errors.operatorArgumentsLengthInvalid,
      },
      {
        condition: this.isOperatorSecondArgumentString,
        assumption: false,
        error: NotEndsWithStringOperator.errors.operatorArgumentsTypesError,
      },
    ];
    processOperatorArgumentsValidations(operatorConditions, operatorArguments);
  }

  private isOperatorArgumentsLengthCorrect(operatorArguments: IOperatorArguments): boolean {
    return operatorArguments.length === this.callback.length;
  }

  private isOperatorSecondArgumentString(operatorArguments: IOperatorArguments): boolean {
    return typeof operatorArguments[1] === 'string';
  }
}
