import { Key } from "./key"

describe("testing index", () => {
  test("index value", () => {
    const k = new Key<string>({})
    k.index("Hello", 1)
    k.index("Hello", 2)
    k.index("World", 3)

    expect(k.values["Hello"].get()).toStrictEqual([1, 2])
    expect(k.values["World"].get()).toStrictEqual([3])
  })
})

describe("testing getBitmap", () => {
  test("existing bitmap", () => {
    const k = new Key<string>({})
    k.index("Hello", 1)

    expect(k.getBitmap("Hello").get()).toStrictEqual([1])
  })
  test("non-existant bitmap", () => {
    const k = new Key<string>({})
    expect(k.getBitmap("Hello").get()).toStrictEqual([])
  })
})
