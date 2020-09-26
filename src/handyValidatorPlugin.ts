/* eslint-disable class-methods-use-this */
import { IHandyValidatorPlugin, IValidation } from './interfaces';

export class HandyValidatorPlugin implements IHandyValidatorPlugin {
  validate(value: unknown, ...args: any[]): boolean {
    return false;
  }

  protected processValidations(validations: IValidation[]): void {
    validations.forEach((validation: IValidation) => {
      if (validation.condition === validation.assumption) {
        throw new Error(validation.error);
      }
    });
  }
}
