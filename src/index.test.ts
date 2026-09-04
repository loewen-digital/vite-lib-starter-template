import { describe, expect, it } from 'vitest';
import { greet } from './index.js';

describe('greet', () => {
  it('greets the given name', () => {
    expect(greet('World')).toBe('Hello, World!');
  });

  it('throws when the name is empty', () => {
    expect(() => greet('   ')).toThrow('greet: name must not be empty');
  });
});
