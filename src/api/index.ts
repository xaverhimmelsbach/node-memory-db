import { Indexable } from "./indexable";
import { Key } from "./key";

// List of bitmaps for all indexable field of a type
export type Index<T extends Indexable<T>> = {
  [K in keyof T]: Key<T[K]>;
};
