export type CountBasket = Record<string, number>;

export interface Laptop {
  brand: string;
  model: string;
  number: number;
  color: string;
  image: string;
  year: string;
  description: object[];
  ram: string;
}

export type Key<T, U> = {
  key: T;
  sort: U;
};
