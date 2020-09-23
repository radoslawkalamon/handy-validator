/**
 * Undefined validator
 * @version 1.0.1
 */
export default (value: unknown): boolean => typeof value === 'undefined' && value === undefined;
