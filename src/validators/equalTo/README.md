# EqualTo Validator (Built-in)

## Usage
```
const myValue = 'Value';
const arrayOfElements = [1, 2, 3, 'Value'];

HandyValidator.validate('equalTo', myValue, arrayOfElements);
```

## Can throw errors
- `HV_VAL_EQUALTO_ARRAY_OF_ELEMENTS_NOT_AN_ARRAY` - arrayOfElements is not an Array,