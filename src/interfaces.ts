export interface IValidation {
  condition: () => boolean;
  assumption: boolean;
  error: string;
}

export interface IHandyValidatorPlugin {
  validate(value: unknown, ...args: unknown[]): boolean;
}

export interface IHandyValidator {
  addPlugin(name: string, plugin: IHandyValidatorPlugin): void;
  removePlugin(name: string): void;
  validate(name: string, value: unknown, ...args: unknown[]): boolean;
}
