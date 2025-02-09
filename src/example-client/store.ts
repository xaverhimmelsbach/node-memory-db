import { Indexable } from "../api/indexable"

export interface Store<T> {
  setup(t: T): void
  store(t: T): void
  retrieve(t: Indexable<T>): T[]
}
