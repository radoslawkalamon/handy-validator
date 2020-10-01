module.exports = {
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {},
      jest: {
        jestConfigFile: './jest.config.js',
      },
    },
  },
  rules: {
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/ban-ts-ignore': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'max-len': [1, { code: 160 }],
  },
  globals: {
    jest: false,
    beforeAll: false,
    afterAll: false,
    describe: false,
    it: false,
    expect: false,
  },
};
