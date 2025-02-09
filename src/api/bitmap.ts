type Bitset = Record<number, unknown>;

// Bitmap records which data ids match a certain value for a certain key
export class Bitmap {
  bitset: Bitset; // Mapping of ids that have been set for this value

  constructor() {
    this.bitset = {} as Record<number, unknown>;
  }

  // set a datum with id as having this value
  set(id: number): void {
    this.bitset[id] = {};
  }

  // get all data that have this value set
  get(): number[] {
    return Object.entries(this.bitset)
      .map((v) => parseInt(v[0]))
      .filter((v) => !isNaN(v)); // Sanity check
  }

  // bitwise AND with another bitmap
  and(b: Bitmap): Bitmap {
    const values = Object.entries(this.bitset)
      .map((v) => ({
        0: parseInt(v[0]),
        1: !!b.bitset[v[0]], // Is this id set in b as well?
      }))
      .reduce<Bitset>((prev, curr) => {
        if (curr[1]) {
          prev[curr[0]] = {}; // Only set ids that were set in both original bitmaps
        }
        return prev;
      }, {});

    const newB = new Bitmap();
    newB.bitset = values;

    return newB;
  }
}

// Generate a bitmap set for every id of ids. Useful as a base bitmap
export function fullBitmapFromIDs(ids: number[]): Bitmap {
  return ids.reduce((prev, curr) => {
    prev.bitset[curr] = {};
    return prev;
  }, new Bitmap());
}
