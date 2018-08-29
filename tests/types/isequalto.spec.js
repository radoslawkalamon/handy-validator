/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

describe('TYPE: isEqualTo', () => {
  it("should return true if passed element is equal to one of validator [VAL: isEqualTo|'Good_value'|'Bad_Value']", () => {
    const validator = "isEqualTo|'Good_value'|'Bad_Value'";
    const value = 'Good_value';

    expect(handyValidator(validator, value)).toEqual(true);
  });

  it("should return false if passed element is not equal to any of validator [VAL: isEqualTo|'Bad_value_1'|'Bad_value_2']", () => {
    const validator = "isEqualTo|'Bad_value_1'|'Bad_value_2'";
    const value = 'Good_value';

    expect(handyValidator(validator, value)).toEqual(false);
  });

  it('should call console.warn & return false if passed no elements to validate [VAL: isEqualTo]', () => {
    jest.spyOn(global.console, 'warn');

    const validator = 'isEqualTo';
    const value = 'VALUE_TO_CHECK';

    expect(handyValidator(validator, value)).toEqual(false);
    expect(console.warn.mock.calls.length).toBe(1);

    console.warn.mockRestore();
  });
});
