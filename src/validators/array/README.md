# Array Validator (Built-in)

## Operators
- `=` - Array length equal to
- `>` - Array length bigger than
- `>=` - Array length bigger than or equal to
- `<` - Array length smaller than
- `<=` - Array length smaller than or equal to

## Usage
```
const myArray = [1,2,3,4];
const validatorArray1 = ['=', 6];
const validatorArray2 = ['<=', 3];

HandyValidator.validate('array', myArray, validatorArray1, validatorArray2);
```

## Can throw errors
- `HV_VAL_ARRAY_TYPE_GUARD_PARENT_NOT_AN_ARRAY` - validatorArrayGroup is not an Array,
- `HV_VAL_ARRAY_TYPE_GUARD_ITEM_NOT_AN_ARRAY` - One of validatorArray is not an Array,
- `HV_VAL_ARRAY_TYPE_GUARD_ITEM_LENGTH_ERROR` - One of validatorArray length is not equal to operator function arguments length,
- `HV_VAL_ARRAY_TYPE_GUARD_ITEM_TYPES_ERROR` - Second argument of one of validatorArray is not an Integer,
- `HV_VAL_ARRAY_TYPE_GUARD_UNKNOWN_OPERATOR` - Unknown operator is passed,