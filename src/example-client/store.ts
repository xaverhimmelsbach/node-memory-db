import { Indexable } from "../api/indexable";

export interface StoreClient<T> {
  store(t: T): void;
  retrieve(t: Indexable<T>): T[];
}
