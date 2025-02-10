import { genSongs, Song } from "./song";
import { StoreClient } from "./store";

// run a number of benchmarks on a StoreClient to compare implementations
export function runBenchmark(s: StoreClient<Song>) {
  console.time("Generating songs...");
  const songs = genSongs(1_000_000);
  console.timeEnd("Generating songs...");

  console.time("Storing songs...");
  songs.forEach((song) => s.store(song));
  console.timeEnd("Storing songs...");

  console.time("Searching for 'It Be' by 'The Beatles'...");
  const itBe = s.retrieve({
    title: "It Be",
    artist: "The Beatles",
    runtime: undefined,
  });
  console.timeEnd("Searching for 'It Be' by 'The Beatles'...");
  console.log(itBe);

  console.time(
    "Searching for all songs by 'The Rolling Stones' that are 3m long...",
  );
  const stones270 = s.retrieve({
    title: undefined,
    artist: "The Rolling Stones",
    runtime: 270,
  });
  console.timeEnd(
    "Searching for all songs by 'The Rolling Stones' that are 3m long...",
  );
  console.log("Length: ", stones270.length);

  console.time("Searching for all songs by 'Red Hot Chili Peppers'...");
  const rhcp = s.retrieve({
    title: undefined,
    artist: "Red Hot Chili Peppers",
    runtime: undefined,
  });
  console.timeEnd("Searching for all songs by 'Red Hot Chili Peppers'...");
  console.log("Length: ", rhcp.length);

  console.time("Searching for all songs...");
  const all = s.retrieve({
    title: undefined,
    artist: undefined,
    runtime: undefined,
  });
  console.timeEnd("Searching for all songs...");
  console.log("Length: ", all.length);

  console.time("Searching for non-existant song...");
  const none = s.retrieve({
    title: "E",
    artist: undefined,
    runtime: undefined,
  });
  console.timeEnd("Searching for non-existant song...");
  console.log(none);
}
