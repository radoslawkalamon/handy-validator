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
const operatorArguments1 = ['~', 'my'];
const operatorArguments2 = ['$', 'string'];

HandyValidator.validate('string', myString, operatorArguments1, operatorArguments2);
```

## Can throw errors
### String Validator
- `HVP_STRING_OPERATOR_ARGUMENTS_NOT_ARRAY` - operatorArguments is not an Array,
- `HVP_STRING_OPERATOR_ARGUMENTS_UNKNOWN_OPERATOR` - Unknown operator is passed.
### Equal To Operator
- `HVP_STRING_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_STRING_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a String.
### Not Equal To Operator
- `HVP_STRING_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_STRING_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a String.
### Contains Operator
- `HVP_STRING_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_STRING_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a String.
### Not Contains Operator
- `HVP_STRING_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_STRING_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a String.
### Starts With Operator
- `HVP_STRING_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_STRING_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a String.
### Not Starts With Operator
- `HVP_STRING_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_STRING_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a String.
### Ends With Operator
- `HVP_STRING_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_STRING_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a String.
### Not Ends With Operator
- `HVP_STRING_OPERATOR_ARGUMENTS_LENGTH_INVALID` - operatorArguments length is not equal to 2,
- `HVP_STRING_OPERATOR_ARGUMENTS_TYPES_ERROR` - Second argument of a operatorArguments is not a String.