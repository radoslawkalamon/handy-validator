/* eslint-disable no-undef */
/* eslint-disable no-console */

import handyValidator from '../../src/handy-validator';

describe('ARGUMENTS: validator', () => {
  it('should throw error if no validator passed', () => {
    expect(() => {
      handyValidator();
    }).toThrowError(/^ARGUMENTS_VALIDATOR_ERROR/);
  });

  it('should throw error if !=String validator passed (Number)', () => {
    const validator = 123;
    expect(() => {
      handyValidator(validator);
    }).toThrowError(/^ARGUMENTS_VALIDATOR_IS_NOT_A_STRING/);
  });

  it('should throw error if !=String validator passed (Object)', () => {
    const validator = {};
    expect(() => {
      handyValidator(validator);
    }).toThrowError(/^ARGUMENTS_VALIDATOR_IS_NOT_A_STRING/);
  });

  it('should throw error if empty validator passed', () => {
    const validator = '';
    expect(() => {
      handyValidator(validator);
    }).toThrowError(/^ARGUMENTS_VALIDATOR_ERROR/);
  });

  it('should throw error if unknown validator passed', () => {
    const validator = 'THIS_IS_BAD_VALIDATOR|xxxs|ss|';
    expect(() => {
      handyValidator(validator);
    }).toThrowError(/^ARGUMENTS_VALIDATOR_ERROR/);
  });
});
