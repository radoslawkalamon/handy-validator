module.exports = {
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '@validators/(.*)': '<rootDir>/src/validators/$1',
    '@src/(.*)': '<rootDir>/src/$1',
  },
};
