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
      this.index[v[0]].index(v[1], id);
    });
  }

  retrieve(t: Indexable<T>): T[] {
    const ids = Object.entries(t)
      .reduce(
        (prev, curr) => prev.and(this.index[curr[0]].getBitmap(curr[1])),
        fullBitmapFromIDs(this.items.map((_, index) => index)),
      )
      .get();

    return this.items.filter((_, id) => id in ids);
  }
}
