import { Indexable } from "./indexable";
import { Key } from "./key";

export type Index<T extends Indexable<T>> = {
  [K in keyof T]: Key<T[K]>;
};
