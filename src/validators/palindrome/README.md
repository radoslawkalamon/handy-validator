# Palindrome Validator (Built-in)

## Usage
```
const possiblyPalindrome = 'Że też łże jeż? łże też!';
HandyValidator.validate('palindrome', possiblyPalindrome);
```

## Throws errors
### Palindrome Validator
- `HVP_PALINDROME_VALUE_NOT_STRING_OR_NUMBER` - palindrome passed to validation is not a string or a number,
### Number Palindrome
- `HVP_PALINDROME_VALUE_NAN` - Number passed to validator is NaN.
### String Palindrome
- This type of validation does not throws errors.