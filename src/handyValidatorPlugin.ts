/* eslint-disable class-methods-use-this */
export interface HandyValidatorPlugin {
  // errors: {
  //   validate: 'HV_PLUGIN_VALIDATE',
  // };
  validate(value: unknown, ...args: any[]): boolean;
}

export class HandyValidatorPlugin {
  // errors: {
  //   validate: 'HV_PLUGIN_VALIDATE',
  // };

  validate(value: unknown, ...args: any[]): boolean {
    return false;
  }
}
