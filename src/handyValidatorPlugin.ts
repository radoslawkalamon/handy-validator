/* eslint-disable class-methods-use-this */
export interface HandyValidatorPlugin {
  validate(value: unknown, ...args: any[]): boolean;
}

export class HandyValidatorPlugin {
  static errors = {
    validate: 'HV_PLUGIN_VALIDATE',
  };

  validate(value: unknown, ...args: any[]): boolean {
    return false;
  }
}
