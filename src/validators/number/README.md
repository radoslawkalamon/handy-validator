# Number Validator (Built-in)

## Operators
- `=` - Number equal to
- `>` - Number bigger than
- `>=` - Number bigger than or equal to
- `<` - Number smaller than
- `<=` - Number smaller than or equal to

## Usage
```
const myNumber = [1,2,3,4];
const validatorArray1 = ['=', 6];
const validatorArray2 = ['<=', 3];
const validatorArrayGroup = [validatorArray1, validatorArray2];
const validateSome = true;

HandyValidator.validate('number', myNumber, validatorArrayGroup, validateSome);
```

## Can throw errors
- `HV_VAL_NUMBER_TYPE_GUARD_PARENT_NOT_AN_ARRAY` - validatorArrayGroup is not an Array,
- `HV_VAL_NUMBER_TYPE_GUARD_ITEM_NOT_AN_ARRAY` - One of validatorArray is not an Array,
- `HV_VAL_NUMBER_TYPE_GUARD_ITEM_LENGTH_ERROR` - One of validatorArray length is not equal to operator function arguments length,
- `HV_VAL_NUMBER_TYPE_GUARD_ITEM_TYPES_ERROR` - Second argument of one of validatorArray is not a Number,
- `HV_VAL_NUMBER_TYPE_GUARD_UNKNOWN_OPERATOR` - Unknown operator is passed,