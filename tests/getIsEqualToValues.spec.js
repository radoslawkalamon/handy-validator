/* eslint-disable no-undef */
/* eslint-disable no-console */

import { getIsEqualToValues } from '../src/handy-validator';

describe('getIsEqualToValues function', () => {
  describe('Arguments', () => {
    it('should throw error if no validator passed', () => {
      expect(() => {
        getIsEqualToValues();
      }).toThrowError(/^ARGUMENTS_VALIDATOR_ERROR/);
    });

    it('should throw error if !=String validator passed (Number)', () => {
      const validator = 123;
      expect(() => {
        getIsEqualToValues(validator);
      }).toThrowError(/^ARGUMENTS_VALIDATOR_IS_NOT_A_STRING/);
    });

    it('should throw error if !=String validator passed (Object)', () => {
      const validator = {};
      expect(() => {
        getIsEqualToValues(validator);
      }).toThrowError(/^ARGUMENTS_VALIDATOR_IS_NOT_A_STRING/);
    });

    it('should throw error if empty validator passed', () => {
      const validator = '';
      expect(() => {
        getIsEqualToValues(validator);
      }).toThrowError(/^ARGUMENTS_VALIDATOR_ERROR/);
    });

    it('should throw error if unknown validator passed', () => {
      const validator = 'THIS_IS_BAD_VALIDATOR|xxxs|ss|';
      expect(() => {
        getIsEqualToValues(validator);
      }).toThrowError(/^ARGUMENTS_VALIDATOR_ERROR/);
    });
  });

  describe('Validator', () => {
    it('should return empty Array if empty isEqualTo validator passed', () => {
      const validator = 'isEqualTo';
      const value = [];
      expect(getIsEqualToValues(validator)).toEqual(value);
    });

    it("should return ['Good_value', 'Bad_Value'] if isEqualTo validator passed", () => {
      const validator = "isEqualTo|'Good_value'|'Bad_Value'";
      const value = ['Good_value', 'Bad_Value'];
      expect(getIsEqualToValues(validator)).toEqual(value);
    });

    it("should return ['value'] if isEqualTo validator passed", () => {
      const validator = "isEqualTo|'value'";
      const value = ['value'];
      expect(getIsEqualToValues(validator)).toEqual(value);
    });

    it("should return ['String', \"'Some string123|HelloWorld!'\", \"'Hello World'\"] if isEqualTo validator passed", () => {
      const validator = "isEqualTo|'String'|'Some string123|HelloWorld!'|'Hello World'";
      const value = ['String', 'Some string123|HelloWorld!', 'Hello World'];
      expect(getIsEqualToValues(validator)).toEqual(value);
    });
  });
});
