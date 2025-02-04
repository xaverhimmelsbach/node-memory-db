import { Indexable } from "./indexable"

export class Store<T>{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  store(t: T): void {
    console.log("not implemented")
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  retrieve(t: Indexable<T>): T {
    console.log("not implemented")
    return null
  }
}
