import { INumberOperator, IOperatorArguments, IOperatorConditions } from '@validators/number/interfaces';
import { processOperatorArgumentsValidations } from '@validators/number/utils';

export class SmallerThanEqualNumberOperator implements INumberOperator {
  static errors = {
    operatorArgumentsLengthInvalid: 'HVP_NUMBER_OPERATOR_ARGUMENTS_LENGTH_INVALID',
    operatorArgumentsTypesError: 'HVP_NUMBER_OPERATOR_ARGUMENTS_TYPES_ERROR',
  }

  public callback = (x: number, y: number): boolean => x <= y;

  public validateOperatorArguments(operatorArguments: IOperatorArguments): void {
    const operatorConditions: IOperatorConditions[] = [
      {
        condition: this.isOperatorArgumentsLengthCorrect.bind(this),
        assumption: false,
        error: SmallerThanEqualNumberOperator.errors.operatorArgumentsLengthInvalid,
      },
      {
        condition: this.isOperatorSecondArgumentNumber,
        assumption: false,
        error: SmallerThanEqualNumberOperator.errors.operatorArgumentsTypesError,
      },
    ];
    processOperatorArgumentsValidations(operatorConditions, operatorArguments);
  }

  private isOperatorArgumentsLengthCorrect(operatorArguments: IOperatorArguments): boolean {
    return operatorArguments.length === this.callback.length;
  }

  private isOperatorSecondArgumentNumber(operatorArguments: IOperatorArguments): boolean {
    return typeof operatorArguments[1] === 'number';
  }
}
