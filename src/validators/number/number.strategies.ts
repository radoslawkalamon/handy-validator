import operators from './number.operators';

interface Strategies {
  [key: string]: (x: number, y: number) => boolean;
}

const strategies: Strategies = {
  [operators.equal]: (x: number, y: number): boolean => x === y,
  [operators.biggerThan]: (x: number, y: number): boolean => x > y,
  [operators.biggerThanEqual]: (x: number, y: number): boolean => x >= y,
  [operators.smallerThan]: (x: number, y: number): boolean => x < y,
  [operators.smallerThanEqual]: (x: number, y: number): boolean => x <= y,
};

export default strategies;
