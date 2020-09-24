/* eslint-disable no-console */
import { HandyValidatorPlugin } from './handyValidatorPlugin';
// Core components
import errors from './handyValidator.errors';
// Built-in Validators
// import arrayValidator from './validators/array/array';
// import booleanValidator from './validators/boolean/boolean';
// import equalToValidator from './validators/equalTo/equalTo';
// import nullValidator from './validators/null/null';
// import numberValidator from './validators/number/number';
// import objectValidator from './validators/object/object';
// // import palindromeValidator from './validators/palindrome/palindrome';
// import stringValidator from './validators/string/string';
import UndefinedValidator from './validators/undefined';

interface Validation {
  condition: boolean;
  assumption: boolean;
  error: string;
}

export interface HandyValidator {
  addPlugin(name: string, plugin: HandyValidatorPlugin): void;
  removePlugin(name: string): void;
  validate(name: string, value: unknown, ...args: unknown[]): boolean;
}

/**
 * Handy Validator
 * @version 4.0.0
 */
export class HandyValidator {
  private plugins: Record<string, HandyValidatorPlugin> = {};

  constructor(loadStandardPlugins = true) {
    if (loadStandardPlugins === true) { this.loadStandardPlugins(); }
  }

  public addPlugin(name: string, plugin: HandyValidatorPlugin): void {
    this.addPluginValidations(name, plugin);
    this.plugins[name] = plugin;
  }

  public removePlugin(name: string): void {
    this.removePluginValidations(name);
    delete this.plugins[name];
  }

  public validate(name: string, value: unknown, ...args: unknown[]): boolean {
    this.validateValidation(name);

    try {
      return this.plugins[name].validate(value, ...args);
    } catch (e) {
      switch (e.message) {
        case 'HELLO_XD':
          throw new Error(errors.validate.errorUndefined);
        default:
          console.error(e);
          throw new Error(errors.validate.errorUndefined);
      }
    }
  }

  private loadStandardPlugins(): void {
    // this.addValidator('array', arrayValidator);
    // this.addValidator('boolean', booleanValidator);
    // this.addValidator('equalTo', equalToValidator);
    // this.addValidator('null', nullValidator);
    // this.addValidator('number', numberValidator);
    // this.addValidator('object', objectValidator);
    // // this.addValidator('palindrome', palindromeValidator);
    // this.addValidator('string', stringValidator);
    this.addPlugin('undefined', new UndefinedValidator());
  }

  private addPluginValidations(name: string, plugin: HandyValidatorPlugin) {
    const validations: Validation[] = [
      {
        condition: this.isStringEmpty(name),
        assumption: true,
        error: errors.addPlugin.nameInvalid,
      },
      {
        condition: this.isPluginValid(plugin),
        assumption: false,
        error: errors.addPlugin.pluginInvalid,
      },
      {
        condition: this.isPluginLoaded(name),
        assumption: true,
        error: errors.addPlugin.pluginAlreadyLoaded,
      },
    ];
    this.processValidations(validations);
  }

  private removePluginValidations(name: string) {
    const validations: Validation[] = [
      {
        condition: this.isStringEmpty(name),
        assumption: true,
        error: errors.removePlugin.nameInvalid,
      },
      {
        condition: this.isPluginLoaded(name),
        assumption: false,
        error: errors.removePlugin.pluginUndefined,
      },
    ];
    this.processValidations(validations);
  }

  private validateValidation(name: string) {
    const validations: Validation[] = [
      {
        condition: this.isPluginLoaded(name),
        assumption: false,
        error: errors.validate.pluginUndefined,
      },
    ];
    this.processValidations(validations);
  }

  // eslint-disable-next-line class-methods-use-this
  private isStringEmpty(string: unknown): boolean {
    return typeof string !== 'string' || string === '';
  }

  // eslint-disable-next-line class-methods-use-this
  private isPluginValid(plugin: HandyValidatorPlugin): boolean {
    return plugin instanceof HandyValidatorPlugin;
  }

  private isPluginLoaded(name: string): boolean {
    return this.isPluginValid(this.plugins[name]);
  }

  // eslint-disable-next-line class-methods-use-this
  private processValidations(validations: Validation[]) {
    validations.forEach((validation: Validation) => {
      if (validation.condition === validation.assumption) {
        throw new Error(validation.error);
      }
    });
  }
}
