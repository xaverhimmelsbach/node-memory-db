import { genSongs, Song } from "./song";

describe("generate songs", () => {
  test("generate single song", () => {
    const s = genSongs(1)

    const expected: Song = {
      title: "Learn Prayer",
      artist: "The Beatles",
      runtime: 90,
      release: new Date(1970, 0, 2),
    }

    expect(s).toStrictEqual([expected]);
  });
  test("generate many songs", () => {
    const s = genSongs(1_000_000)

    const expected: Song = {
      title: "Paradise Alabama More Scar Day Good",
      artist: "The Beatles",
      runtime: 90,
      release: new Date(1970, 0, 2),
    }

    expect(s[999_999]).toStrictEqual(expected);
  });
});
