import { Bitmap, fullBitmapFromItems } from "./bitmap";

describe("testing bitmap set", () => {
  test("set entry", () => {
    const b = new Bitmap();
    b.set(1);
    expect(b.bitset[1]).toStrictEqual({});
  });
  test("unset entry", () => {
    const b = new Bitmap();
    expect(b.bitset[1]).toStrictEqual(undefined);
  });
});

describe("testing bitmap get", () => {
  test("get true entries", () => {
    const b = new Bitmap();
    b.set(1);
    b.set(3);
    b.set(5);
    expect(b.get()).toStrictEqual([1, 3, 5]);
  });
  test("get non-existent entries", () => {
    const b = new Bitmap();
    expect(b.get()).toStrictEqual([]);
  });
});

describe("testing bitmap and", () => {
  test("overlapping bitmaps", () => {
    const b1 = new Bitmap();
    b1.set(1);
    b1.set(2);

    const b2 = new Bitmap();
    b2.set(1);
    b2.set(3);

    const expected = new Bitmap();
    expected.bitset = {
      1: {},
    };

    expect(b1.and(b2)).toStrictEqual(expected);
  });
  test("non-overlapping bitmaps", () => {
    const b1 = new Bitmap();
    b1.set(1);
    b1.set(2);

    const b2 = new Bitmap();
    b2.set(3);
    b2.set(4);

    const expected = new Bitmap();

    expect(b1.and(b2)).toStrictEqual(expected);
  });
  test("empty bitmap", () => {
    const b1 = new Bitmap();
    b1.set(1);
    b1.set(2);

    const b2 = new Bitmap();

    const expected = new Bitmap();

    expect(b1.and(b2)).toStrictEqual(expected);
  });
  test("identical bitmaps", () => {
    const b1 = new Bitmap();
    b1.set(1);
    b1.set(2);

    const b2 = new Bitmap();
    b2.set(1);
    b2.set(2);

    const expected = new Bitmap();
    expected.bitset = {
      1: {},
      2: {},
    };

    expect(b1.and(b2)).toStrictEqual(expected);
  });
});

describe("testing fullBitmapFromItems", () => {
  test("from ids", () => {
    const ids = [0, 2, 4];

    const expected = new Bitmap();
    expected.bitset = {
      0: {},
      1: {},
      2: {},
    };

    expect(fullBitmapFromItems(ids)).toStrictEqual(expected);
  });
  test("from empty", () => {
    const ids = [];

    const expected = new Bitmap();

    expect(fullBitmapFromItems(ids)).toStrictEqual(expected);
  });
});
