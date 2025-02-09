import { Index } from ".";
import { fullBitmapFromIDs } from "./bitmap";
import { Indexable } from "./indexable";

export class Store<T> {
  items: T[];
  index: Index<T>;

  constructor(items: T[], index: Index<T>) {
    this.items = items;
    this.index = index;
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

    return this.items.filter((_, id) => ids.includes(id));
  }
}
