import { IArrayOperator, IOperatorArguments, IOperatorConditions } from '../interfaces';
import { processOperatorArgumentsValidations } from '../utils';

export class BiggerThanEqualArrayOperator implements IArrayOperator {
  static errors = {
    operatorArgumentsLengthInvalid: 'HVP_ARRAY_OPERATOR_ARGUMENTS_LENGTH_INVALID',
    operatorArgumentsTypesError: 'HVP_ARRAY_OPERATOR_ARGUMENTS_TYPES_ERROR',
  }

  public callback = (x: unknown[], y: number): boolean => x.length >= y;

  public validateOperatorArguments(operatorArguments: IOperatorArguments): void {
    const operatorConditions: IOperatorConditions[] = [
      {
        condition: this.isOperatorArgumentsLengthCorrect.bind(this),
        assumption: false,
        error: BiggerThanEqualArrayOperator.errors.operatorArgumentsLengthInvalid,
      },
      {
        condition: this.isOperatorSecondArgumentInteger,
        assumption: false,
        error: BiggerThanEqualArrayOperator.errors.operatorArgumentsTypesError,
      },
    ];
    processOperatorArgumentsValidations(operatorConditions, operatorArguments);
  }

  private isOperatorArgumentsLengthCorrect(operatorArguments: IOperatorArguments): boolean {
    return operatorArguments.length === this.callback.length;
  }

  private isOperatorSecondArgumentInteger(operatorArguments: IOperatorArguments): boolean {
    return Number.isInteger(operatorArguments[1]);
  }
}
