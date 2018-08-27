const numberValue = '-*\\d+[,.]*\\d*';
const stringValue = '';

export default {
  numbers: {
    smallerThan: `^<(${numberValue}$)`,
    biggerThan: `^>(${numberValue}$)`,
    equalTo: `^=(${numberValue}$)`,
  },
  string: {
    equalTo: '',
    notEqualTo: '',
  },
};
