import { Bitmap } from "./bitmap";

export class Key<T extends string | number | symbol> {
  values: Record<T, Bitmap>;

  constructor() {
    this.values = {} as Record<T, Bitmap>;
  }

  index(t: T, id: number): void {
    if (!(t in this.values)) {
      this.values[t] = new Bitmap();
    }

    this.values[t].set(id);
  }

  getBitmap(t: T): Bitmap {
    if (!(t in this.values)) {
      return new Bitmap();
    }

    return this.values[t];
  }
}
