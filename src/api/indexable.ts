export type Indexable<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T as T[K] extends any[] ? never : K]: T[K]
}
