/**
 * Object validator
 * @version 1.0.1
 */
export default (value: unknown): boolean => value !== null && !Array.isArray(value) && typeof value === 'object';
