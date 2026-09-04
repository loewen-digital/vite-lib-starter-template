import { describe, expect, it } from 'vitest';
import { createGreetStore } from './svelte.js';

describe('createGreetStore', () => {
  it('emits the greeting to subscribers', () => {
    const store = createGreetStore('World');
    const values: string[] = [];
    store.subscribe((value) => values.push(value));
    expect(values).toEqual(['Hello, World!']);
  });

  it('throws when the name is empty', () => {
    expect(() => createGreetStore('')).toThrow('greet: name must not be empty');
  });
});
