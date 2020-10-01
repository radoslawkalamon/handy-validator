import { IOperatorArguments, IOperatorConditions } from '@src/validators/string/interfaces';

export const processOperatorArgumentsValidations = (operatorConditions: IOperatorConditions[], operatorArguments: IOperatorArguments): void => {
  operatorConditions.forEach((validation: IOperatorConditions) => {
    if (validation.condition(operatorArguments) === validation.assumption) {
      throw new Error(validation.error);
    }
  });
};
