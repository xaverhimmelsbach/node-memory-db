import { Store } from "../api/store";
import { genSongs, Song } from "./song";

const SongSeed: Song = {
  title: "",
  artist: "",
  runtime: 0,
  release: new Date(),
}

const s = new Store<Song>(SongSeed);

console.log("Generating songs...")

const songs = genSongs(1_000_000)

console.log("Storing songs...")

songs.forEach(song => s.store(song))

console.log("Searching for 'It Be' by 'The Beatles'...")

console.time("retrieval")
const itBe = s.retrieve({
  title: "It Be",
  artist: "The Beatles",
  runtime: undefined,
})
console.timeEnd("retrieval")

console.log(itBe)

console.log("Searching for all songs by 'The Rolling Stones' that are 3m long...")

console.time("retrieval")
const stones270 = s.retrieve({
  title: undefined,
  artist: "The Rolling Stones",
  runtime: 270,
})
console.timeEnd("retrieval")

console.log("Length: ", stones270.length);

console.log("Searching for all songs by 'Red Hot Chili Peppers'...")

console.time("retrieval")
const rhcp = s.retrieve({
  title: undefined,
  artist: "Red Hot Chili Peppers",
  runtime: undefined,
})
console.timeEnd("retrieval")

console.log("Length: ", rhcp.length);

console.log("Searching for all songs...")

console.time("retrieval")
const all = s.retrieve({
  title: undefined,
  artist: undefined,
  runtime: undefined,
})
console.timeEnd("retrieval")

console.log("Length: ", all.length);

console.log("Searching for non-existant song...")

console.time("retrieval")
const none = s.retrieve({
  title: "E",
  artist: undefined,
  runtime: undefined,
})
console.timeEnd("retrieval")

console.log(none);

