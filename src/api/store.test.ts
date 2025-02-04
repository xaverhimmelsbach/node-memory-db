import { Store } from "./store"

type TestItem = {
  i: number
}

describe("testing store", () => {
  test("valid store and retrieve", () => {
    const s = new Store<TestItem>()
    const t: TestItem = {
      i: 1
    }

    s.store(t)

    expect(s.retrieve(t)).toBe(t)
  })
  test("empty retrieve", () => {
    const s = new Store<TestItem>()
    const t: TestItem = {
      i: 1
    }

    expect(s.retrieve(t)).toBe(null)
  })
  test("null retrieve", () => {
    const s = new Store<TestItem>()
    const t: TestItem = {
      i: 1
    }

    s.store(t)

    expect(s.retrieve(null)).toBe(null)
  })
  test("null store", () => {
    const s = new Store<TestItem>()
    const t: TestItem = {
      i: 1
    }

    s.store(null)

    expect(s.retrieve(t)).toBe(null)
  })
})
