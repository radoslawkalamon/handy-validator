/* eslint-disable class-methods-use-this */
import { HandyValidatorPlugin } from '../../handyValidatorPlugin';

/**
 * Object Validator
 * @version 2.0.0
 */
export default class ObjectValidator extends HandyValidatorPlugin {
  validate(value: unknown): boolean {
    return value !== null && !Array.isArray(value) && typeof value === 'object';
  }
}
