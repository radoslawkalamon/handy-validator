interface Strategies {
  [key: string]: (x: string, y: string) => boolean;
}

const strategies: Strategies = {
  '=': (x, y) => x === y,
  '!=': (x, y) => x !== y,
  '~': (x, y) => x.indexOf(y) > -1,
  '!~': (x, y) => x.indexOf(y) === -1,
  '^': (x, y) => x.indexOf(y) === 0,
  '!^': (x, y) => x.indexOf(y) !== 0,
  $: (x, y) => ((x.length - y.length) < 0 ? false : x.indexOf(y) === (x.length - y.length)),
  '!$': (x, y) => ((x.length - y.length) < 0 ? true : x.indexOf(y) !== (x.length - y.length)),
};

export default strategies;
