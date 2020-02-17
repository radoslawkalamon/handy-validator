/**
 * Number validator operator strategies
 */

interface Strategies {
  [key: string]: (x: number, y: number) => boolean;
}

const strategies: Strategies = {
  '<=': (x: number, y: number): boolean => x <= y,
  '>=': (x: number, y: number): boolean => x >= y,
  '<': (x: number, y: number): boolean => x < y,
  '>': (x: number, y: number): boolean => x > y,
  '=': (x: number, y: number): boolean => x === y,
};

export default strategies;
