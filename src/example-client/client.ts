import { Store } from "../api/store";

type Item = {
  str: string;
  num: number;
};

const s = new Store<Item>();

const i: Item = {
  str: "Hello",
  num: 42,
};

console.log(i);

s.store(i);

console.log(s.retrieve(i));
