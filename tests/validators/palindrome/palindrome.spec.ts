// describe('[><] validator', () => {
//   const operator = '><';
//   const validationArguments = [[operator]];

//   it('should return true on "Do geese see God?"', () => {
//     const value = 'Do geese see God?';
//     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
//   });

//   it('should return true on "我爱妈妈，妈妈爱我。"', () => {
//     const value = '我爱妈妈，妈妈爱我。';
//     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
//   });

//   it('should return true on "Drape gepard?"', () => {
//     const value = 'Drape gepard?';
//     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
//   });

//   it('should return true on "Ana, kanna kana."', () => {
//     const value = 'Ana, kanna kana.';
//     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
//   });

//   it('should return true on "Ada, bagaż Aga bada."', () => {
//     const value = 'Ada, bagaż Aga bada.';
//     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
//   });

//   it('should return true on "Że też łże jeż? łże też!"', () => {
//     const value = 'Że też łże jeż? łże też!';
//     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
//   });

//   it('should return true on "А роза упала на лапу Азора"', () => {
//     const value = 'А роза упала на лапу Азора';
//     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
//   });

//   it('should return true on "І що сало? Ласощі"', () => {
//     const value = 'І що сало? Ласощі';
//     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(true);
//   });

//   it('should return false on "This is not a palindrome!"', () => {
//     const value = 'This is not a palindrome!';
//     expect(HandyVal.validate(validator, value, validationArguments)).toEqual(false);
//   });
// });
