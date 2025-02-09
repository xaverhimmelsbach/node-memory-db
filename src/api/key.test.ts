import { Key } from "./key";

describe("testing set", () => {
  test("set value", () => {
    const k = new Key<string>();
    k.set("Hello", 1);
    k.set("Hello", 2);
    k.set("World", 3);

    expect(k.values["Hello"].get()).toStrictEqual([1, 2]);
    expect(k.values["World"].get()).toStrictEqual([3]);
  });
});

describe("testing get", () => {
  test("existing bitmap", () => {
    const k = new Key<string>();
    k.set("Hello", 1);

    expect(k.get("Hello").get()).toStrictEqual([1]);
  });
  test("non-existant bitmap", () => {
    const k = new Key<string>();
    expect(k.get("Hello").get()).toStrictEqual([]);
  });
});
