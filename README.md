# vite-lib-starter-template

Template for every new loewen-digital library. Vite+ (`vp pack`, `vp check`, `vp test`), TypeScript strict, ESM only, npm.

Create a library from it:

```bash
gh repo create loewen-digital/<name> --template loewen-digital/vite-lib-starter-template --public --clone
```

## What is in the box

- `src/index.ts`: the library entry, with a placeholder `hello` and its test.
- `src/adapters/svelte.ts`: an example framework adapter, exported as `./svelte`. Same pattern for any framework: one file under `src/adapters/`, one entry in `vite.config.ts`, one subpath in `exports`, the framework as an optional peer dependency.
- `vite.config.ts`: the whole toolchain in one file. `pack` builds ESM plus type declarations (tsdown), everything in `dependencies` and `peerDependencies` stays external; `lint` is Oxlint with type-aware checks and full type checking; `fmt` is Oxfmt (tabs, single quotes, width 100).
- TypeScript strict (`tsconfig.json`), tests with Vitest through `vite-plus/test`.
- `.github/workflows/ci.yml` on every push to `main` and every pull request, `release.yml` on every `v*` tag.
- `AGENTS.md`: the rules for coding agents; `CLAUDE.md` only imports it.

## After creating a repository

1. `package.json`: set `name` (`@loewen-digital/<name>`) and `description`; `/my-loop` removes `private` and sets `repository`, `bugs`, `homepage` when it creates the repository.
2. Replace `hello` in `src/index.ts` with the real API. Every public function keeps a test: happy path plus one failure case.
3. Keep the Svelte adapter only if the library needs one. Otherwise delete `src/adapters/svelte.ts` and its test, the `adapters/svelte` entry in `vite.config.ts`, the `./svelte` export and the `svelte` peer and dev dependency in `package.json`.
4. Replace this README with the library's own: install, usage, exports.

## Scripts

| Script           | Does                                                                          |
| ---------------- | ----------------------------------------------------------------------------- |
| `npm run check`  | `vp check`: format check, lint and type check in one pass                     |
| `npm run format` | `vp check --fix`: formats and applies lint autofixes                          |
| `npm test`       | `vp test run`, single run (`npm run test:watch` for watch mode)               |
| `npm run build`  | `vp pack` into `dist/`; `prepack` runs it before `npm pack` and `npm publish` |

## Install

```bash
npm install @loewen-digital/my-lib
```

## Usage

```ts
import { hello } from '@loewen-digital/my-lib';

hello('World'); // 'Hello, World!'
```

With the Svelte adapter:

```ts
import { helloStore } from '@loewen-digital/my-lib/svelte';

const greeting = helloStore('World'); // Readable<string>
```

## Exports

| Subpath    | Import                    | Types                       |
| ---------- | ------------------------- | --------------------------- |
| `.`        | `dist/index.js`           | `dist/index.d.ts`           |
| `./svelte` | `dist/adapters/svelte.js` | `dist/adapters/svelte.d.ts` |

ESM only: every subpath has `types` and `import`, none has `require`. `files` limits the package to `dist`; `npm pack --dry-run` shows what ships.

## Release

`release.yml` publishes every tag `v<version>` to npm through trusted publishing (no `NPM_TOKEN`, provenance included) and creates the GitHub Release from the matching `CHANGELOG.md` section.

1. Move the lines under `## Unreleased` in `CHANGELOG.md` under a new heading `## v<version> · <YYYY-MM-DD> · <title>` and commit.
2. `npm version <patch|minor|major>`: bumps `package.json`, commits, tags `v<version>`.
3. `git push --follow-tags`.

Once per package, before the first tag: `npm publish --access public` by hand, then on npmjs.com under Package Settings, Trusted Publisher, add GitHub Actions with the repository and `release.yml`.
