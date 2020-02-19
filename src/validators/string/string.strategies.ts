/**
 * String validator operator strategies
 */

interface Strategies {
  [key: string]: (x: string, y: string) => boolean;
}

const strategies: Strategies = {
  '=': (x: string, y: string) => x === y,
  '!=': (x: string, y: string) => x !== y,
  '~': (x: string, y: string) => x.indexOf(y) > -1,
  '!~': (x: string, y: string) => x.indexOf(y) === -1,
  '^': (x: string, y: string) => x.indexOf(y) === 0,
  '!^': (x: string, y: string) => x.indexOf(y) !== 0,
  $: (x: string, y: string) => ((x.length - y.length) < 0 ? false : x.indexOf(y) === (x.length - y.length)),
  '!$': (x: string, y: string) => ((x.length - y.length) < 0 ? false : x.indexOf(y) !== (x.length - y.length)),
  '><': (x: string, y: string) => [...x].reverse().join('') === y,
};

export default strategies;
