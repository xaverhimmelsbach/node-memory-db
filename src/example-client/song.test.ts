import { genSongs, Song } from "./song";

describe("generate songs", () => {
  test("generate single song", () => {
    const s = genSongs(1);

    const expected: Song = {
      title: "Learn Prayer",
      artist: "The Beatles",
      runtime: 90,
      release: new Date(1970, 0, 2),
    };

    expect(s).toStrictEqual([expected]);
  });
  test("generate many songs", () => {
    const s = genSongs(10);

    const expected: Song = {
      title: "Supernova Loved In Congratulations Easy Fat",
      artist: "Sum41",
      runtime: 99,
      release: new Date(1970, 0, 2),
    };

    expect(s[9]).toStrictEqual(expected);
  });
});
