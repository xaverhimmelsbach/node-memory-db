import { Index } from ".";
import { Bitmap } from "./bitmap";
import { Indexable } from "./indexable";
import { Key } from "./key";

// Store of arbitraty data in memory
export class Store<T> {
  items: T[]; // Canonical list of all indexed items
  index: Index<T>; // Indexes for each indexable field of T

  // seed is an empty instance of T used to initialize the indexes
  constructor(seed: T) {
    this.items = [];
    this.index = Object.entries(seed).reduce<Index<T>>((index, seedField) => {
      // Only add indexes for indexable fields
      if (["string", "number", "symbol"].includes(typeof seedField[1])) {
        index[seedField[0]] = new Key<(typeof seedField)[1]>();
      }
      return index;
    }, {} as Index<T>);
  }

  // store an instance of T and index its fields
  store(t: T): void {
    const id = this.items.push(t) - 1;

    Object.entries(t).forEach((v) => {
      const index = this.index[v[0]];
      // Skip unindexable fields
      if (index !== undefined) {
        this.index[v[0]].set(v[1], id);
      }
    });
  }

  // retrieve a list of instances of T matching the values of the given instance. Fields marked as undefined are ignored
  retrieve(t: Indexable<T>): T[] {
    const bitmap = Object.entries(t)
      .reduce<Bitmap>(
        (prev, curr) => {
          let next = prev;
          // Skip ignored fields
          if (curr[1] !== undefined) {
            const index = this.index[curr[0]];
            // Only check indexable fields
            if (index !== undefined) {
              if(prev === null) {
                return index.get(curr[1])
              }
              next = prev.and(index.get(curr[1]));
            }
          }
          return next;
        },
        null,
      )

    let ids = []
    if(bitmap !== null) {
      ids = bitmap.get();
    }

    let results: T[] = [];
    if (ids.length === this.items.length) {
      // Optimization: all items matched
      results = this.items;
    } else {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        results.push(this.items[id]);
      }
    }

    return results;
  }
}
