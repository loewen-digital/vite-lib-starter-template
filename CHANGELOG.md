# Changelog

All notable changes to vite-lib-starter-template, newest first. SemVer, 0.x is pre-release. The heading
format is a contract, keep it: `## v<Version> · <YYYY-MM-DD> · <Title>`. Lines under
`## Unreleased` move under the next version heading at release; the version in `package.json`
is the topmost released one here.

## Unreleased

- Releases run from tags: pushing `v<version>` runs tests and build, publishes to npm through trusted publishing (no token, provenance included) and creates the GitHub Release with this file's matching section as notes. A repo created from this template removes `private` and sets `repository`, `bugs`, `homepage` in `package.json` (`/my-loop` does that), publishes the first version by hand and registers the trusted publisher on npmjs.com.
- `LICENSE` (MIT) and a minimal `ci.yml` (`npm ci`, `npm test`, `npm run build` on every push to `main` and every pull request).
- Node 24 is the required version (`engines.node` in `package.json`); CI, deploy and the agent workflow read it from there.
- Agent rules live in `AGENTS.md`; `CLAUDE.md` only imports it. The Codex review rules are a section of the same file.
