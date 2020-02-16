/**
 * Null validator
 * @version 1.0.0
 * @param {any} value
 * @returns {boolean}
 */
export default (value: any): boolean => typeof value === 'object' && value === null;
