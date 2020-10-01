import { IOperatorArguments, IOperatorConditions } from '@validators/number/interfaces';

export const processOperatorArgumentsValidations = (operatorConditions: IOperatorConditions[], operatorArguments: IOperatorArguments): void => {
  operatorConditions.forEach((validation: IOperatorConditions) => {
    if (validation.condition(operatorArguments) === validation.assumption) {
      throw new Error(validation.error);
    }
  });
};
