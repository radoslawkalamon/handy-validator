export default {
  operators: {
    smallerThan: '<',
    biggerThan: '>',
    equalTo: '=',
    notEqualTo: '!=',
  },
  numbers: {
    real: /-?\d+[,.]*\d*$/,
    // science: /^-?\d.?\d?e[+-]?\d+$/,
    infinity: /^-?Infinity$/,
    nan: /^-?NaN$/,
  },
  misc: {
    comma: ',',
  },
};
