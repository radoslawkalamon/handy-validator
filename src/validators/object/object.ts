/**
 * Object validator
 * @version 1.0.0
 */
export default (value: any): boolean => value !== null && !Array.isArray(value) && typeof value === 'object';
