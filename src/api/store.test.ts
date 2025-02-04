import { Key } from "./key"
import { Store } from "./store"

type TestItem = {
  i: number
}

type ExpandedTestItem = {
  i: number
  j: string
}

describe("testing store", () => {
  test("store item", () => {
    const s = new Store<TestItem>([], {
      i: new Key<number>({})
    })

    const t: TestItem = {
      i: 1
    }

    s.store(t)

    expect(s.index.i.getBitmap(1).get()).toStrictEqual([0])
    expect(s.index.i.getBitmap(2).get()).toStrictEqual([])
  })
})

describe("testing retrieve", () => {
  test("retrieve item", () => {
    const s = new Store<ExpandedTestItem>([], {
      i: new Key<number>({}),
      j: new Key<string>({}),
    })

    const t1: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    }

    s.store(t1)

    const t: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    }

    expect(s.retrieve(t)).toStrictEqual([t1])
  })
  test("retrieve identical items", () => {
    const s = new Store<ExpandedTestItem>([], {
      i: new Key<number>({}),
      j: new Key<string>({}),
    })

    const t1: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    }

    const t2: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    }

    s.store(t1)
    s.store(t2)

    const t: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    }

    expect(s.retrieve(t)).toStrictEqual([t1, t2])
  })
  // TODO: Treat zeroed fields as ignores
  // test("retrieve different items", () => {
  //   const s = new Store<ExpandedTestItem>([], {
  //     i: new Key<number>({}),
  //     j: new Key<string>({}),
  //   })

  //   const t1: ExpandedTestItem = {
  //     i: 1,
  //     j: "Hello",
  //   }

  //   const t2: ExpandedTestItem = {
  //     i: 1,
  //     j: "World",
  //   }

  //   s.store(t1)
  //   s.store(t2)

  //   const t: ExpandedTestItem = {
  //     i: 1,
  //     j: "",
  //   }

  //   expect(s.retrieve(t)).toStrictEqual([t1, t2])
  // })
})
