/* eslint-disable class-methods-use-this */
import { IValidation } from './interfaces';

export class HandyValidatorPlugin {
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
