import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkgJson from './package.json' with { type: 'json' };

const pkg = pkgJson as {
	dependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
};

// Everything a consumer installs themselves stays out of the bundle:
// node built-ins plus every entry of dependencies and peerDependencies (with subpaths).
const external = [
	/^node:/,
	...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }).map(
		(name) => new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/|$)`)
	)
];

export default defineConfig({
	plugins: [dts({ include: ['src'], exclude: ['src/**/*.test.ts'] })],
	build: {
		target: 'es2022',
		sourcemap: true,
		lib: {
			// One entry per subpath export; the key is the path under dist/.
			entry: {
				index: 'src/index.ts',
				'adapters/svelte': 'src/adapters/svelte.ts'
			},
			formats: ['es']
		},
		rollupOptions: { external }
	}
});
