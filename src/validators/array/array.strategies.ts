interface Strategies {
  [key: string]: (x: any[], y: number) => boolean;
}

const strategies: Strategies = {
  '=': (x, y) => x.length === y,
  '>': (x, y) => x.length > y,
  '>=': (x, y) => x.length >= y,
  '<': (x, y) => x.length < y,
  '<=': (x, y) => x.length <= y,
};

export default strategies;
