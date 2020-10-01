import { HandyValidatorPlugin } from '@src/HandyValidatorPlugin';

/**
 * Boolean validator
 * @version 2.0.0
 */

export class BooleanValidator extends HandyValidatorPlugin {
  validate(value: unknown): boolean {
    return typeof value === 'boolean';
  }
}
