import { HandyValidatorPlugin } from '../../HandyValidatorPlugin';

/**
 * Object Validator
 * @version 2.0.0
 */
export class ObjectValidator extends HandyValidatorPlugin {
  validate(value: unknown): boolean {
    return value !== null && !Array.isArray(value) && typeof value === 'object';
  }
}
