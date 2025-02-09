import { Index } from ".";
import { fullBitmapFromIDs } from "./bitmap";
import { Indexable } from "./indexable";
import { Key } from "./key";

export class Store<T> {
  items: T[];
  index: Index<T>;

  constructor(seed: T) {
    this.items = []
    this.index = Object.entries(seed).reduce<Index<T>>((prev, curr) => {
      if(["string", "number", "symbol"].includes(typeof curr[1])) {
        prev[curr[0]] = new Key<typeof curr[1]>()
      }
      return prev
    }, {} as Index<T>)
  }

  store(t: T): void {
    const id = this.items.push(t) - 1;

    Object.entries(t).forEach((v) => {
      const index = this.index[v[0]]
      if(index !== undefined) {
        this.index[v[0]].index(v[1], id);
      }
    });
  }

  retrieve(t: Indexable<T>): T[] {
    console.time("bitmap")
    const ids = Object.entries(t)
      .reduce(
        (prev, curr) => {
          let next = prev
          if(curr[1] !== undefined) {
            const index = this.index[curr[0]]
            if(index !== undefined) {
              next = prev.and(index.getBitmap(curr[1]))
            }
          }
          return next
        },
        fullBitmapFromIDs(this.items.map((_, index) => index)),
      )
      .get();
    console.timeEnd("bitmap")

    console.time("results")
    const results = this.items.filter((_, id) => ids.includes(id));
    console.timeEnd("results")

    return results
  }
}
