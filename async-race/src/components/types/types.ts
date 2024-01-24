export type CarsAttribute = {
  name: string;
  color: string;
  id?: number;
};

export enum Urls {
  garage = 'https://asyncracing.onrender.com/garage',
  engine = 'https://asyncracing.onrender.com/engine',
  winners = 'https://asyncracing.onrender.com/winners',
}

export type Key = {
  key: string;
  value: number | string;
};

export enum CountCars {
  cars = 100,
}

export type Speed = {
  velocity: number;
  distance: number;
};

export type Interval = Record<number, number>;
export enum RaceCommand {
  start = 'started',
  stop = 'stopped',
}

export enum StartStopPosition {
  startPos = 0,
  stopPos = 200,
}

export enum Sort {
  time = 'time',
  wins = 'wins',
  asc = 'ASC',
  desk = 'DESC',
}

export type Winners = {
  id: number;
  time: number;
  wins: number;
};

export enum StartPage {
  startPage = 1,
}

export enum CounterSort {
  countStart = 0,
  countReset = 1,
  countStop = 11,
}
