# Changelog

All notable changes to vite-lib-starter-template, newest first. SemVer, 0.x is pre-release. The heading
format is a contract, keep it: `## v<Version> · <YYYY-MM-DD> · <Title>`. Lines under
`## Unreleased` move under the next version heading at release; the version in `package.json`
is the topmost released one here.

## Unreleased

- The starter is built (#1): `src/index.ts` with the placeholder `hello` and its test, `src/adapters/svelte.ts` as the pattern for framework adapters (subpath export `./svelte`, `svelte` as optional peer dependency), Vite library build (ESM only, `dist/index.js` plus declarations from `vite-plugin-dts`, everything in `dependencies` and `peerDependencies` stays external), TypeScript strict, Vitest, ESLint flat config and Prettier with the settings of sveltekit-ai-starter-template. Scripts: `check`, `lint`, `format`, `test`, `build`. TypeScript stays on 6.x until typescript-eslint supports 7.
- `ci.yml` runs `npm run check` and `npm run lint` before test and build.
- README: what to change after creating a repository from the template, scripts, exports map, release procedure by tag.
- No `publish.yml` and no `NPM_TOKEN`: releases stay on `release.yml` with trusted publishing ([decision 0001](docs/decisions/0001-release-by-tag-not-publish-yml.md)).
- `AGENTS.md` names Node 24 from `engines.node`; the `.nvmrc` it mentioned never existed.

- Releases run from tags: pushing `v<version>` runs tests and build, publishes to npm through trusted publishing (no token, provenance included) and creates the GitHub Release with this file's matching section as notes. A repo created from this template removes `private` and sets `repository`, `bugs`, `homepage` in `package.json` (`/my-loop` does that), publishes the first version by hand and registers the trusted publisher on npmjs.com.
- `LICENSE` (MIT) and a minimal `ci.yml` (`npm ci`, `npm test`, `npm run build` on every push to `main` and every pull request).
- Node 24 is the required version (`engines.node` in `package.json`); CI, deploy and the agent workflow read it from there.
- Agent rules live in `AGENTS.md`; `CLAUDE.md` only imports it. The Codex review rules are a section of the same file.
