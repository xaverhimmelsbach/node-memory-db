import { genSongs, Song } from "./song";

describe("generate songs", () => {
  test("generate single song", () => {
    const s = genSongs(1)

    const expected: Song = {
      title: "It Be",
      artist: "The Beatles",
      runtime: 90,
      release: new Date(1970, 0, 2),
    }

    expect(s).toStrictEqual([expected]);
  });
  test("generate many songs", () => {
    const s = genSongs(1_000_000)

    const expected: Song = {
      title: "Let Let",
      artist: "The Beatles",
      runtime: 90,
      release: new Date(1970, 0, 2),
    }

    expect(s[999_999]).toStrictEqual(expected);
  });
  test("ensure unique titles in first 1_000_000", () => {
    const s = genSongs(1_000_000)

    const uniqueTitles = [... new Set(s.map(title => title))]

    expect(s.length).toStrictEqual(uniqueTitles.length);
  });
});
