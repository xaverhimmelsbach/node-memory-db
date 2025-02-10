import { StoreClient } from "./store";
import { Store } from "../api/store";
import { Indexable } from "../api/indexable";
import { runBenchmark } from "./bench";
import { Song } from "./song";

const SongSeed: Song = {
  title: "",
  artist: "",
  runtime: 0,
  release: new Date(),
};

// Client making use of a MemDB Store to store data
class MemDBClient<T> implements StoreClient<T> {
  s: Store<T>;

  constructor(seed: T) {
    this.s = new Store(seed);
  }

  store(t: T) {
    this.s.store(t);
  }

  retrieve(t: Indexable<T>): T[] {
    return this.s.retrieve(t);
  }
}

runBenchmark(new MemDBClient(SongSeed));
