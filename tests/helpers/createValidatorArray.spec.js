/* eslint-disable no-undef */
/* eslint-disable no-console */

import createValidatorArray from '../../src/helpers/createValidatorArray';

describe('HELPERS: createValidatorArray', () => {
  it("should return [''] when passing ''", () => {
    const validator = '';
    const toEqual = [''];
    expect(createValidatorArray(validator)).toEqual(toEqual);
  });

  it("should return ['1323'] when passing '1323'", () => {
    const validator = '1323';
    const toEqual = ['1323'];
    expect(createValidatorArray(validator)).toEqual(toEqual);
  });

  it("should return ['Array'] when passing 'Array'", () => {
    const validator = 'Array';
    const toEqual = ['Array'];
    expect(createValidatorArray(validator)).toEqual(toEqual);
  });

  it("should return ['Number', '=10'] when passing 'Number|=10'", () => {
    const validator = 'Number|=10';
    const toEqual = ['Number', '=10'];
    expect(createValidatorArray(validator)).toEqual(toEqual);
  });

  it("should return ['String', \"!='Hello'\"] when passing \"String|!='Hello'\"", () => {
    const validator = "String|!='Hello'";
    const toEqual = ['String', "!='Hello'"];
    expect(createValidatorArray(validator)).toEqual(toEqual);
  });

  it("should return ['String', \"!='Some string123|HelloWorld!'\", \"='Hello World'\"] when passing \"String|!='Some string123|HelloWorld!'|='Hello World'\"", () => {
    const validator = "String|!='Some string123|HelloWorld!'|='Hello World'";
    const toEqual = ['String', "!='Some string123|HelloWorld!'", "='Hello World'"];
    expect(createValidatorArray(validator)).toEqual(toEqual);
  });

  it("should return ['Number', '<10', '>12', '=15'] when passing 'Number|<10|>12|=15'", () => {
    const validator = 'Number|<10|>12|=15';
    const toEqual = ['Number', '<10', '>12', '=15'];
    expect(createValidatorArray(validator)).toEqual(toEqual);
  });

  it('should throw Error when passing not a string', () => {
    const toThrowError = /^ARGUMENTS_VALIDATOR_IS_NOT_A_STRING/;
    expect(() => {
      const validator = 12323;
      createValidatorArray(validator);
    }).toThrowError(toThrowError);
  });
});
