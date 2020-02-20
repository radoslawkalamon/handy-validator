interface Strategies {
  [key: string]: {
    fn: (x: string, y: any) => boolean; // This any should be done properly
    argumentType: string;
  };
}

const strategies: Strategies = {
  '=': {
    fn: (x, y: string): boolean => x === y,
    argumentType: 'string',
  },
  '!=': {
    fn: (x, y: string): boolean => x !== y,
    argumentType: 'string',
  },
  '~': {
    fn: (x, y: string): boolean => x.indexOf(y) > -1,
    argumentType: 'string',
  },
  '!~': {
    fn: (x, y: string): boolean => x.indexOf(y) === -1,
    argumentType: 'string',
  },
  '^': {
    fn: (x, y: string): boolean => x.indexOf(y) === 0,
    argumentType: 'string',
  },
  '!^': {
    fn: (x, y: string): boolean => x.indexOf(y) !== 0,
    argumentType: 'string',
  },
  $: {
    fn: (x, y: string): boolean => ((x.length - y.length) < 0 ? false : x.indexOf(y) === (x.length - y.length)),
    argumentType: 'string',
  },
  '!$': {
    fn: (x, y: string): boolean => ((x.length - y.length) < 0 ? false : x.indexOf(y) !== (x.length - y.length)),
    argumentType: 'string',
  },
  '><': {
    fn: (x, y: string): boolean => x.split('').reverse().join('') === y,
    argumentType: 'string',
  },
  'len=': {
    fn: (x, y: number): boolean => x.length === y,
    argumentType: 'number',
  },
  'len>': {
    fn: (x, y: number): boolean => x.length > y,
    argumentType: 'number',
  },
  'len>=': {
    fn: (x, y: number): boolean => x.length >= y,
    argumentType: 'number',
  },
  'len<': {
    fn: (x, y: number): boolean => x.length < y,
    argumentType: 'number',
  },
  'len<=': {
    fn: (x, y: number): boolean => x.length <= y,
    argumentType: 'number',
  },
};

export default strategies;
