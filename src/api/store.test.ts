import { Indexable } from "./indexable";
import { Store } from "./store";

type TestItem = {
  i: number;
};

type ExpandedTestItem = {
  i: number;
  j: string;
};

type UnIndexableFieldTestItem = {
  i: number;
  j: number[];
  k: {
    x: number;
  }
}

const TestItemSeed = {
  i: 0,
}

const ExpandedTestItemSeed = {
  i: 0,
  j: "",
};

const UnIndexableFieldTestItemSeed = {
  i: 0,
  j: [0],
  k: {
    x: 0,
  },
}

describe("testing store", () => {
  test("store item", () => {
    const s = new Store<TestItem>(TestItemSeed);

    const t: TestItem = {
      i: 1,
    };

    s.store(t);

    expect(s.index.i.getBitmap(1).get()).toStrictEqual([0]);
    expect(s.index.i.getBitmap(2).get()).toStrictEqual([]);
  });
});

describe("testing retrieve", () => {
  test("retrieve item", () => {
    const s = new Store<ExpandedTestItem>(ExpandedTestItemSeed);

    const t1: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    };

    s.store(t1);

    const t: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    };

    expect(s.retrieve(t)).toStrictEqual([t1]);
  });
  test("retrieve identical items", () => {
    const s = new Store<ExpandedTestItem>(ExpandedTestItemSeed);

    const t1: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    };

    const t2: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    };

    s.store(t1);
    s.store(t2);

    const t: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    };

    expect(s.retrieve(t)).toStrictEqual([t1, t2]);
  });
  test("retrieve different items", () => {
    const s = new Store<ExpandedTestItem>(ExpandedTestItemSeed)

    const t1: ExpandedTestItem = {
      i: 1,
      j: "Hello",
    }

    const t2: ExpandedTestItem = {
      i: 1,
      j: "World",
    }

    const t3: ExpandedTestItem = {
      i: 1,
      j: "!",
    }

    s.store(t1)
    s.store(t2)
    s.store(t3)

    const retr1: ExpandedTestItem = {
      i: 1,
      j: undefined,
    }

    const retr2: ExpandedTestItem = {
      i: undefined,
      j: "Hello",
    }

    const retr3: ExpandedTestItem = {
      i: undefined,
      j: "World",
    }

    const retr4: ExpandedTestItem = {
      i: undefined,
      j: "!",
    }

    expect(s.retrieve(retr1)).toStrictEqual([t1, t2, t3])
    expect(s.retrieve(retr2)).toStrictEqual([t1])
    expect(s.retrieve(retr3)).toStrictEqual([t2])
    expect(s.retrieve(retr4)).toStrictEqual([t3])
  })
});

describe("testing unindexable fields", () => {
  test("unindexable fields", () => {
    const s = new Store<Indexable<UnIndexableFieldTestItem>>(UnIndexableFieldTestItemSeed);

    const t: UnIndexableFieldTestItem= {
      i: 1,
      j: [2, 3, 4],
      k: {
        x: 5
      }
    };

    s.store(t);

    expect(s.retrieve(t as Indexable<UnIndexableFieldTestItem>)).toStrictEqual([t]);
  });
});
