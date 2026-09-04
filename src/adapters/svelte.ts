import { greet } from '../index.js';

export interface Readable<T> {
  subscribe(run: (value: T) => void): () => void;
}

export function createGreetStore(name: string): Readable<string> {
  const value = greet(name);

  return {
    subscribe(run) {
      run(value);
      return () => {};
    },
  };
}
