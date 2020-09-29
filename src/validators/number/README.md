# Number Validator (Built-in)

## Operators
- `=` - Number equal to,
- `>` - Number bigger than,
- `>=` - Number bigger than or equal to,
- `<` - Number smaller than,
- `<=` - Number smaller than or equal to.

## Usage
```
const myNumber = 1234
const operatorArguments1 = ['=', 6];
const operatorArguments2 = ['<=', 3];

HandyValidator.validate('number', myNumber, operatorArguments1, operatorArguments2);
```

## Throws errors
### Number Validator
- `HVP_NUMBER_OPERATOR_ARGUMENTS_NOT_ARRAY` - operatorArguments is not an Array,
- `HVP_NUMBER_OPERATOR_ARGUMENTS_UNKNOWN_OPERATOR` - Unknown operator is passed.
### Bigger Than Operator
- `HVP_NUMBER_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_NUMBER_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a Number.
### Bigger Than Equal Operator
- `HVP_NUMBER_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_NUMBER_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a Number.
### Equal To Operator
- `HVP_NUMBER_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_NUMBER_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a Number.
### Smaller Than Operator
- `HVP_NUMBER_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_NUMBER_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a Number.
### Smaller Than Equal Operator
- `HVP_NUMBER_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_NUMBER_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a Number.