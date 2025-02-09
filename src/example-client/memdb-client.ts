import {Store} from "./store"
import {Store as APIStore} from "../api/store"
import { Indexable } from "../api/indexable"
import { runBenchmark } from "./bench"

class MemDBClient<T> implements Store<T> {
  s: APIStore<T>

  setup(t: T) {
    this.s= new APIStore(t)
  }

  store(t: T) {
    this.s.store(t)
  }

  retrieve(t: Indexable<T>): T[] {
    return this.s.retrieve(t)
  }
}

runBenchmark(new MemDBClient)
