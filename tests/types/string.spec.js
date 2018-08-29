/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

describe('TYPE: String', () => {
  describe('Type validator', () => {
    it('should return false if passed value is a Boolean', () => {
      const validator = 'String';
      const value = true;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Null', () => {
      const validator = 'String';
      const value = null;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Undefined', () => {
      const validator = 'String';
      const value = undefined;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Number', () => {
      const validator = 'String';
      const value = 1;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return true if passed value is a String', () => {
      const validator = 'String';
      const value = '';
      expect(handyValidator(validator, value)).toEqual(true);
    });

    it('should return false if passed value is a Symbol', () => {
      const validator = 'String';
      const value = Symbol('Symbol description');
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Object', () => {
      const validator = 'String';
      const value = {};
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is a Function returning number', () => {
      const validator = 'String';
      const value = () => 3;
      expect(handyValidator(validator, value)).toEqual(false);
    });

    it('should return false if passed value is an Array', () => {
      const validator = 'String';
      const value = [];
      expect(handyValidator(validator, value)).toEqual(false);
    });
  });

  describe('Value validators', () => {
    describe('[=] validator', () => {
      it("should return true if passed value is 'String123' [VAL: String|='String123']", () => {
        const validator = "String|='String123'";
        const value = 'String123';
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it("should return false if passed value is 'NOT_EQUAL_String' [VAL: String|='String']", () => {
        const validator = "String|='String123'";
        const value = 'NOT_EQUAL_String';
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it("should return true if passed value is 'Some string|HelloWorld!' [VAL: String|='Some string|HelloWorld!']", () => {
        const validator = "String|='Some string|HelloWorld!'";
        const value = 'Some string|HelloWorld!';
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it("should return false if passed value is 'Some string123|HelloWorld!' [VAL: String|='Some string123|HelloWorld!']", () => {
        const validator = "String|='Some string123|HelloWorld!'";
        const value = 'Some string|HelloWorld!';
        expect(handyValidator(validator, value)).toEqual(false);
      });
    });

    describe('[!=] validator', () => {
      it("should return true if passed value is 'NOT_EQUAL_STRING' [VAL: String|!='String123'] ", () => {
        const validator = "String|!='String123'";
        const value = 'NOT_EQUAL_STRING';
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it("should return false if passed value is 'String123' [VAL: String|!='String123'] ", () => {
        const validator = "String|!='String123'";
        const value = 'String123';
        expect(handyValidator(validator, value)).toEqual(false);
      });

      it("should return true if passed value is 'Some string|HelloWorld!' [VAL: String|!='Some string123|HelloWorld!']", () => {
        const validator = "String|!='Some string123|HelloWorld!'";
        const value = 'Some string|HelloWorld!';
        expect(handyValidator(validator, value)).toEqual(true);
      });

      it("should return true if passed value is 'Some string|HelloWorld!' [VAL: String|!='Some string123|HelloWorld!']", () => {
        const validator = "String|!='Some string123|HelloWorld!'";
        const value = 'Some string|HelloWorld!';
        expect(handyValidator(validator, value)).toEqual(true);
      });
    });
  });

  describe('Value validator [UNKNOWN VALIDATOR]', () => {
    it("should call console.warn & return false if passed an unknown validator [VAL: String|THIS_IS_BAD_VALIDATOR|='String123']", () => {
      jest.spyOn(global.console, 'warn');

      const validator = "String|THIS_IS_BAD_VALIDATOR|='String123'";
      const value = 'String123';

      expect(handyValidator(validator, value)).toEqual(false);
      expect(console.warn.mock.calls.length).toBe(1);

      console.warn.mockRestore();
    });
  });
});
