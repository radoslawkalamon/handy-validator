/* eslint-disable class-methods-use-this */
import { HandyValidatorPlugin } from '../../handyValidatorPlugin';

/**
 * Boolean validator
 * @version 2.0.0
 */

export default class BooleanValidator extends HandyValidatorPlugin {
  validate(value: unknown): boolean {
    return typeof value === 'boolean';
  }
}
