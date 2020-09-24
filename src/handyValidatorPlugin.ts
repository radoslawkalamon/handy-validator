/* eslint-disable class-methods-use-this */

interface Validation {
  condition: boolean;
  assumption: boolean;
  error: string;
}

export interface HandyValidatorPlugin {
  validate(value: unknown, ...args: any[]): boolean;
}

export class HandyValidatorPlugin {
  validate(value: unknown, ...args: any[]): boolean {
    return false;
  }

  protected processValidations(validations: Validation[]): void {
    validations.forEach((validation: Validation) => {
      if (validation.condition === validation.assumption) {
        throw new Error(validation.error);
      }
    });
  }
}
