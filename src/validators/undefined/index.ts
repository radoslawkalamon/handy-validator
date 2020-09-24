/* eslint-disable class-methods-use-this */
import { HandyValidatorPlugin } from '../../handyValidatorPlugin';

/**
 * Undefined validator
 * @version 2.0.0
 */
export default class UndefinedValidator extends HandyValidatorPlugin {
  validate(value: unknown): boolean {
    return typeof value === 'undefined' && value === undefined;
  }
}
