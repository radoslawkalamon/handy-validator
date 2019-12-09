import HandyValidator from '../src/index';

describe('Core base tests', () => {
  describe('constructor()', () => {

  });

  describe('addValidator()', () => {

  });

  describe('removeValidator()', () => {

  });

  describe('checkValidator()', () => {

  });

  describe('getValidator()', () => {

  });

  describe('validate()', () => {

  });

  it('Should validate null', () => {
    const HandyVal = new HandyValidator();

    expect(HandyVal.validate('null', null)).toBeTruthy();
    expect(HandyVal.validate('null', 123)).toBeFalsy();
  });
});
