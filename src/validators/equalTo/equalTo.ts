/**
 * equalTo validator
 * @version 1.0.0
 * @param {any} value
 * @param {any[]} arrayOfElements
 * @returns {boolean}
 */
export default (value: any, arrayOfElements: any[] = []): boolean => arrayOfElements.includes(value);
