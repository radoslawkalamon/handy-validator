import { HandyValidatorPlugin } from '@src/HandyValidatorPlugin';

/**
 * Undefined validator
 * @version 2.0.0
 */
export class UndefinedValidator extends HandyValidatorPlugin {
  validate(value: unknown): boolean {
    return typeof value === 'undefined' && value === undefined;
  }
}
