import { Indexable } from "../api/indexable"

export interface StoreClient<T> {
  setup(t: T): void
  store(t: T): void
  retrieve(t: Indexable<T>): T[]
}
