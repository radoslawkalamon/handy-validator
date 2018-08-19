# Handy Value Validator

## Use Example:
- `Number|<20|>10` - Should be Number smaller than 20 and higher than 10.
- `String|!='Hello World'|<20` - Should be String, not equal to Hello World, and shorter than 20 chars.
- `(String|Number)|^1<20|^2>=20` - Should be String or Number. If Number smaller than 20, if String longer or equal to 20 chars.
- `Float|<25` - Should be Float smaller than 25.

## Roadmap:
- [] Undefined
- [] Boolean
- [] Number
- [] String
- [] Float
- [] Groups
