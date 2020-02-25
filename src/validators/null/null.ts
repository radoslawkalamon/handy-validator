/**
 * Null validator
 * @version 1.0.0
 */
export default (value: any): boolean => typeof value === 'object' && value === null;
