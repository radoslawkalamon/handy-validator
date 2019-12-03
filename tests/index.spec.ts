import HandyValidator from '../src/index';

describe('Simple test', () => {
  it('Should have superVariable', () => {
    const HandyVal = new HandyValidator();
    expect(HandyVal.superVariable).toEqual('Hello!');
  });
});
