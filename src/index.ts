import arrayValidator from './validators/array';
import booleanValidator from './validators/boolean';
import equalToValidator from './validators/equalTo';
import nullValidator from './validators/null';
import numberValidator from './validators/number';
import objectValidator from './validators/object';
import stringValidator from './validators/string';
import undefinedValidator from './validators/undefined';

interface HandyValidator {
  loadedValidators: Record<string, ValidatorCallback>;
  addValidator(name: string, callback: ValidatorCallback): boolean;
  checkValidator(name: string): boolean;
  getValidator(name: string): ValidatorCallback|boolean;
  validate(name: string, value: any, validationArguments?: any[]): boolean;
}
type ValidatorCallback = (value: any, validationArguments: any[]) => boolean;

/**
 * Handy Validator
 * @version 3.0.0
 * @constructor
 */
class HandyValidator {
  loadedValidators: Record<string, ValidatorCallback> = {};

  /**
   * Init Handy Validator
   * @param {boolean} loadBuiltInValidators
   */
  constructor(loadBuiltInValidators = true) {
    // Load BuiltIn validators if needed
    if (loadBuiltInValidators === true) {
      this.addValidator('array', arrayValidator);
      this.addValidator('boolean', booleanValidator);
      this.addValidator('equalTo', equalToValidator);
      this.addValidator('null', nullValidator);
      this.addValidator('number', numberValidator);
      this.addValidator('object', objectValidator);
      this.addValidator('string', stringValidator);
      this.addValidator('undefined', undefinedValidator);
    }
  }

  /**
   * Adds validator plugin
   * @param {string} name
   * @param {Function} callback
   * @return {boolean}
   */
  addValidator(name: string, callback: ValidatorCallback): boolean {
    if (typeof name !== 'string') {
      throw new Error('HV_ADD_VALIDATOR_NAME_NOT_STRING');
    }

    if (name === '') {
      throw new Error('HV_ADD_VALIDATOR_NAME_EMPTY');
    }

    if (typeof callback !== 'function') {
      throw new Error('HV_ADD_VALIDATOR_CALLBACK_NOT_FUNCTION');
    }

    if (typeof this.loadedValidators[name] === 'function') {
      throw new Error('HV_ADD_VALIDATOR_ALREADY_LOADED');
    }

    this.loadedValidators[name] = callback;
    return true;
  }

  /**
   * Removes validator plugin
   * @param {string} name
   * @returns {boolean}
   */
  removeValidator(name: string): boolean {
    if (typeof name !== 'string') {
      throw new Error('HV_REMOVE_VALIDATOR_NAME_NOT_STRING');
    }

    if (name === '') {
      throw new Error('HV_REMOVE_VALIDATOR_NAME_EMPTY');
    }

    if (typeof this.loadedValidators[name] !== 'function') {
      throw new Error('HV_REMOVE_VALIDATOR_VALIDATOR_NOT_DEFINED');
    }

    delete this.loadedValidators[name];

    return true;
  }

  /**
   * Checks if validator is defined
   * @param name
   */
  checkValidator(name: string): boolean {
    return typeof this.loadedValidators[name] === 'function';
  }

  /**
   * Returns validator if defined
   * @param name
   * @returns {ValidatorCallback|boolean}
   */
  getValidator(name: string): ValidatorCallback|boolean {
    return this.loadedValidators[name] || false;
  }

  /**
   * Validates using validator
   * @param {string} name
   * @param {any} value
   * @param {any[]} validationArguments
   * @return {boolean}
   */
  validate(name: string, value: any, validationArguments?: any[]): boolean {
    if (typeof this.loadedValidators[name] !== 'function') {
      throw new Error('HV_VALIDATE_VALIDATOR_NOT_LOADED');
    }

    return this.loadedValidators[name](value, validationArguments || []);
  }
}

export default HandyValidator;
