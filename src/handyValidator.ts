import { IValidation, IHandyValidatorPlugin } from './interfaces';
import { HandyValidatorPlugin } from './HandyValidatorPlugin';

// import { ArrayValidator } from './validators/array';
import { BooleanValidator } from './validators/boolean';
import { EqualToValidator } from './validators/equalTo';
import { NullValidator } from './validators/null';
// import { NumberValidator } from './validators/number';
import { ObjectValidator } from './validators/object';
// import { PalindromeValidator } from './validators/palindrome';
// import { StringValidator } from './validators/string';
import { UndefinedValidator } from './validators/undefined';

/**
 * Handy Validator
 * @version 4.0.0
 */
export class HandyValidator {
  static errors = {
    addPlugin: {
      nameInvalid: 'HV_ADD_PLUGIN_NAME_INVALID',
      pluginInvalid: 'HV_ADD_PLUGIN_PLUGIN_INVALID',
      pluginAlreadyLoaded: 'HV_ADD_PLUGIN_PLUGIN_ALREADY_LOADED',
    },
    removePlugin: {
      nameInvalid: 'HV_REMOVE_PLUGIN_NAME_INVALID',
      pluginUndefined: 'HV_REMOVE_PLUGIN_PLUGIN_UNDEFINED',
    },
    validate: {
      pluginUndefined: 'HV_VALIDATE_PLUGIN_UNDEFINED',
    },
  };

  private plugins: Record<string, IHandyValidatorPlugin> = {};

  constructor(loadStandardPlugins = true) {
    if (loadStandardPlugins === true) { this.loadStandardPlugins(); }
  }

  public addPlugin(name: string, plugin: IHandyValidatorPlugin): void {
    this.validateAddPlugin(name, plugin);
    this.plugins[name] = plugin;
  }

  public removePlugin(name: string): void {
    this.validateRemovePlugin(name);
    delete this.plugins[name];
  }

  public validate(name: string, value: unknown, ...args: unknown[]): boolean {
    this.validateValidate(name);
    return this.plugins[name].validate(value, ...args);
  }

  private loadStandardPlugins(): void {
    // this.addValidator('array', arrayValidator);
    this.addPlugin('boolean', new BooleanValidator());
    this.addPlugin('equalTo', new EqualToValidator());
    this.addPlugin('null', new NullValidator());
    // this.addValidator('number', numberValidator);
    this.addPlugin('object', new ObjectValidator());
    // this.addValidator('palindrome', palindromeValidator);
    // this.addValidator('string', stringValidator);
    this.addPlugin('undefined', new UndefinedValidator());
  }

  private validateAddPlugin(name: string, plugin: IHandyValidatorPlugin) {
    const validations = [
      {
        condition: this.isStringEmpty(name),
        assumption: true,
        error: HandyValidator.errors.addPlugin.nameInvalid,
      },
      {
        condition: this.isPluginValid(plugin),
        assumption: false,
        error: HandyValidator.errors.addPlugin.pluginInvalid,
      },
      {
        condition: this.isPluginLoaded(name),
        assumption: true,
        error: HandyValidator.errors.addPlugin.pluginAlreadyLoaded,
      },
    ];
    this.processValidations(validations);
  }

  private validateRemovePlugin(name: string) {
    const validations = [
      {
        condition: this.isStringEmpty(name),
        assumption: true,
        error: HandyValidator.errors.removePlugin.nameInvalid,
      },
      {
        condition: this.isPluginLoaded(name),
        assumption: false,
        error: HandyValidator.errors.removePlugin.pluginUndefined,
      },
    ];
    this.processValidations(validations);
  }

  private validateValidate(name: string) {
    const validations = [
      {
        condition: this.isPluginLoaded(name),
        assumption: false,
        error: HandyValidator.errors.validate.pluginUndefined,
      },
    ];
    this.processValidations(validations);
  }

  private isStringEmpty(string: unknown): boolean {
    return typeof string !== 'string' || string === '';
  }

  private isPluginValid(plugin: IHandyValidatorPlugin): boolean {
    return plugin instanceof HandyValidatorPlugin;
  }

  private isPluginLoaded(name: string): boolean {
    return this.isPluginValid(this.plugins[name]);
  }

  private processValidations(validations: IValidation[]) {
    validations.forEach((validation: IValidation) => {
      if (validation.condition === validation.assumption) {
        throw new Error(validation.error);
      }
    });
  }
}
