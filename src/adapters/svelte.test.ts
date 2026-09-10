import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { helloStore } from './svelte';

describe('helloStore', () => {
	it('exposes the greeting as a readable store', () => {
		expect(get(helloStore('World'))).toBe('Hello, World!');
	});

	it('rejects an empty name', () => {
		expect(() => helloStore('')).toThrow(TypeError);
	});
});
