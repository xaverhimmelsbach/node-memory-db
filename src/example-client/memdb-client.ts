import { StoreClient } from "./store"
import { Store } from "../api/store"
import { Indexable } from "../api/indexable"
import { runBenchmark } from "./bench"

// Client making use of a MemDB Store to store data
class MemDBClient<T> implements StoreClient<T> {
  s: Store<T>

  setup(t: T) {
    this.s= new Store(t)
  }

  store(t: T) {
    this.s.store(t)
  }

  retrieve(t: Indexable<T>): T[] {
    return this.s.retrieve(t)
  }
}

runBenchmark(new MemDBClient)
