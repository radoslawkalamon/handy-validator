interface Strategies {
  [key: string]: (x: number, y: number) => boolean;
}

const strategies: Strategies = {
  '=': (x, y) => x === y,
  '>': (x, y) => x > y,
  '>=': (x, y) => x >= y,
  '<': (x, y) => x < y,
  '<=': (x, y) => x <= y,
};

export default strategies;
