# Array Validator (Built-in)

## Operators
- `=` - Array length equal to,
- `>` - Array length bigger than,
- `>=` - Array length bigger than or equal to,
- `<` - Array length smaller than,
- `<=` - Array length smaller than or equal to.

## Usage
```
const myNumber = [1, 2, 3, 4]
const operatorArguments1 = ['=', 6];
const operatorArguments2 = ['<=', 3];

HandyValidator.validate('number', myNumber, operatorArguments1, operatorArguments2);
```

## Throws errors
### Number Validator
- `HVP_NUMBER_OPERATOR_ARGUMENTS_NOT_ARRAY` - operatorArguments is not an Array,
- `HVP_NUMBER_OPERATOR_ARGUMENTS_UNKNOWN_OPERATOR` - Unknown operator is passed.
### Bigger Than Operator
- `HVP_ARRAY_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_ARRAY_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not an Integer.
### Bigger Than Equal Operator
- `HVP_ARRAY_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_ARRAY_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not an Integer.
### Equal To Operator
- `HVP_ARRAY_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_ARRAY_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not an Integer.
### Smaller Than Operator
- `HVP_ARRAY_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_ARRAY_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not an Integer.
### Smaller Than Equal Operator
- `HVP_ARRAY_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_ARRAY_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not an Integer.