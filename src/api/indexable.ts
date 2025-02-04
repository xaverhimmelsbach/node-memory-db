export type Indexable<T> = {
  [K in keyof T as T[K] extends string | number | symbol ? K : never]: T[K];
};
