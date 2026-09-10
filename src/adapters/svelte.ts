import { readable, type Readable } from 'svelte/store';
import { hello } from '../index';

/**
 * Example framework adapter. The pattern: `src/adapters/<framework>.ts`, its own
 * entry in `vite.config.ts`, its own subpath in the `exports` map (`./svelte`), and the
 * framework as an optional peer dependency so it never ends up in the bundle.
 */
export function helloStore(name: string): Readable<string> {
	return readable(hello(name));
}
