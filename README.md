# Handy Value Validator

## Use cases:

### `String` type:

- `String` - value is String
- `<[Number]` - value is shorter than [Number] characters
- `>[Number]` - value is longer than [Number] characters
- `=[String]` - value equals to [String]
- `!=[String]` - value do not equal to [String]
- `~[String]` - value contains [String]
- `!~[String]` - value do not contains [String]
- `^[String]` - value starts with [String]
- `!^[String]` - value do not starts with [String]
- `$[String]` - value ends with [String]
- `!$[String]` - value do not ends with [String]

Use example: `String|<30|^Hello|$World`

### `Number` type:

- `Number` - value is Number
- `<[Number]` - value is smaller than [Number]
- `>[Number]` - value is bigger than [Number]
- `=[Number]` - value equals to [Number]

### `Array` type:

- `Array` - value is Array
- `<[Number]` - Array have more than [Number] elements
- `>[Number]` - Array have less than [Number] elements
- `=[Number]` - Array have exactly [Number] elements

Use example: `Array`

### `Object` type:

- `Object` - value is Object

Use example: `Object`

**IMPORTANT:** Always returns `false` if `_falseOnObject` is set to true!

### `Undefined` type:

- `Undefined` - value is Undefined

Use example: `Undefined`

### `Null` type:

- `Null` - value is Null

Use example: `Null`

### `Boolean` type:

- `Boolean` - value is Boolean

Use example: `Boolean`

### `isEqualTo` special type:

- `isEqualTo` - checks if value is equal to one of provided elements

Use example: `isEqualTo|Value1|Value2|Value3`

## Use Example:

- `Number|<20|>10` - Should be Number smaller than 20 and higher than 10.
- `String|!='Hello World'|<20` - Should be String, not equal to Hello World, and shorter than 20 chars.
- `(String|Number)|^1<20|^2>=20` - Should be String or Number. If Number smaller than 20, if String longer or equal to 20 chars.
- `Float|<25` - Should be Float smaller than 25.

## Roadmap:

- [x] Undefined
- [x] Null
- [x] Boolean
- [ ] String
- [ ] Number
- [ ] Array
- [x] Object
- [ ] isEqualTo special type
- [ ] Groups
