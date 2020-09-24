import { HandyValidatorPlugin } from '../../HandyValidatorPlugin';

/**
 * Null validator
 * @version 2.0.0
 */
export class NullValidator extends HandyValidatorPlugin {
  validate(value: unknown): boolean {
    return typeof value === 'object' && value === null;
  }
}
