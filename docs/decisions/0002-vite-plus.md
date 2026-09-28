# 0002 · Vite+ is the toolchain, `vp pack` builds the library

## Context

Vite+ 1.0 (MIT, 2026-09) bundles Vite 8, Vitest 5, Oxlint, Oxfmt, tsdown and a task runner behind one CLI (`vp`) and one config file. The template ran six separate tools: Vite library mode, `vite-plugin-dts`, Vitest, `tsc --noEmit`, ESLint with typescript-eslint, Prettier. Eddy decided on 2026-09-28 to move every loop repo to Vite+ and drop the rest, starting with this template.

## Decision

`vite-plus` is the only toolchain dependency. `vp pack` (tsdown) builds the library, `vp check` formats, lints and type-checks, `vp test` runs the tests. The npm scripts stay the interface (`npm run check`, `npm test`, `npm run build`), so the loop rules and workflows do not change. CI keeps `setup-node` with `node-version-file: package.json`; no `setup-vp`, no `vp env`.

## Consequences

- One config file (`vite.config.ts`) and one devDependency instead of ten; `npm run check` takes about a second.
- Lint rules: Oxlint's correctness category plus the ESLint and typescript-eslint recommended rules outside it, listed in `vite.config.ts`.
- tsdown writes a `sourceMappingURL` comment into each `.d.ts` without emitting the map; harmless, left as is.
- `vite` in `package.json` is an npm alias of `@voidzero-dev/vite-plus-core` (with a matching `overrides` entry), as `vp migrate` sets it up for npm.
