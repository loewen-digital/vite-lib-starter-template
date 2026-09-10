import { describe, expect, it } from 'vitest';
import { hello } from './index';

describe('hello', () => {
	it('greets by name', () => {
		expect(hello('World')).toBe('Hello, World!');
	});

	it('rejects an empty name', () => {
		expect(() => hello('   ')).toThrow(TypeError);
	});
});
