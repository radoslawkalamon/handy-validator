module.exports = {
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/no-explicit-any': 0,
    'import/extensions': 0,
    'max-len': [1, { 'code': 160 }],
  },
  globals: {
    beforeAll: false,
    describe: false,
    it: false,
    expect: false,
  }
};
