type Bitset = Record<number, unknown>

export class Bitmap {
  values: Bitset

  constructor(values: Bitset) {
    this.values = values
  }

  set(id: number): void {
    this.values[id] = {}
  }

  get(): number[] {
    return Object.entries(this.values)
      .map(v => parseInt(v[0]))
      .filter(v => !isNaN(v))
  }

  and(b: Bitmap): Bitmap {
    const values = Object.entries(this.values)
      .map(v => ({
            0: parseInt(v[0]),
            1: !!b.values[v[0]]
          }))
      .reduce<Bitset>((prev, curr) => {
        if(curr[1]) {
          prev[curr[0]] = {}
        }
        return prev
      }, {})

    return new Bitmap(values)
  }
}

export function fullBitmapFromIDs(ids: number[]): Bitmap {
  return ids.reduce((prev, curr) => {
    prev.values[curr] = {}
    return prev
  }, new Bitmap({}))
} 
