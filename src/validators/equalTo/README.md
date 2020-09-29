# EqualTo Validator (Built-in)

## Usage
```
const myValue = 'Value';
const elements = [1, 2, 3, 'Value'];

HandyValidator.validate('equalTo', myValue, elements);
```

## Can throw errors
- `HVP_EQUAL_TO_ELEMENTS_NOT_ARRAY` - elements is not an Array.