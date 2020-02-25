# String Validator (Built-in)

## Operators
- `=` - String equal to
- `!=` - String not equal to
- `~` - String contains
- `!~` - String not contains
- `^` - String starts with
- `!^` - String not starts with
- `$` - String ends with
- `!$` - String not ends with

## Usage
```
const myString = 'This is my string';
const validatorArray1 = ['~', 'my'];
const validatorArray2 = ['$', 'string'];
const validatorArrayGroup = [validatorArray1, validatorArray2];
const validateSome = true;

HandyValidator.validate('string', myString, validatorArrayGroup, validateSome);
```

## Can throw errors
- `HV_VAL_STRING_TYPE_GUARD_PARENT_NOT_AN_ARRAY` - validatorArrayGroup is not an Array,
- `HV_VAL_STRING_TYPE_GUARD_ITEM_NOT_AN_ARRAY` - One of validatorArray is not an Array,
- `HV_VAL_STRING_TYPE_GUARD_ITEM_LENGTH_ERROR` - One of validatorArray length is not equal to operator function arguments length,
- `HV_VAL_STRING_TYPE_GUARD_ITEM_TYPES_ERROR` - Second argument of one of validatorArray is not a String,
- `HV_VAL_STRING_TYPE_GUARD_UNKNOWN_OPERATOR` - Unknown operator is passed,