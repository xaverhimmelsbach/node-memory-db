import { Bitmap } from "./bitmap";

// Key holds all possible indexed values for a field of type T
export class Key<T extends string | number | symbol> {
  values: Record<T, Bitmap>; // List of indexed values of type T

  constructor() {
    this.values = {} as Record<T, Bitmap>;
  }

  // set the datum with id as having value t for this key
  set(t: T, id: number): void {
    if (!(t in this.values)) {
      // Create new bitmap for value
      this.values[t] = new Bitmap();
    }

    this.values[t].set(id);
  }

  // get bitmap of all data matching value t for this key
  get(t: T): Bitmap {
    if (!(t in this.values)) {
      // t hasn't been indexed yet
      return new Bitmap();
    }

    return this.values[t];
  }
}
