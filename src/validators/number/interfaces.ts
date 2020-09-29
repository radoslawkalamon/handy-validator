export interface INumberOperator {
  callback: (x: number, ...args: any[]) => boolean;
  validateOperatorArguments(operatorArguments: unknown[]): void;
}

export type IOperatorArguments = [string, ...unknown[]];

export interface IOperatorConditions {
  condition: (operatorArguments: IOperatorArguments) => boolean;
  assumption: boolean;
  error: string;
}

export interface IOperatorClasses {
  [key: string]: INumberOperator;
}
