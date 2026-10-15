# 0003 · `ci.yml` is the library shape of the org snippet

## Context

Every loop repository runs the same CI: `snippets/ci.yml` in loewen-digital/agent-loop (apps with the jobs `verify`, `e2e`, `deploy`; libraries with `verify` only, their release stays `release.yml`). The template had its own minimal `ci.yml`: one job without `concurrency`, `paths-ignore`, `timeout-minutes` or a manual trigger. This repo is public and its minutes are free, but every new library starts from this file, so it is the first to follow the snippet (issue #4).

## Decision

`.github/workflows/ci.yml` is the snippet minus the jobs `e2e` and `deploy`, the `tags` trigger and the Cloudflare `env`. One job `verify` (`npm ci`, `npm run check`, `npm test`, `npm run build`, `timeout-minutes: 10`) on every push to `main`, every pull request and on `workflow_dispatch`. Pushes that touch only `docs/**` or `**.md` run nothing. `concurrency` cancels a running branch build when a newer push arrives; the tag condition stays verbatim from the snippet so the file diffs cleanly against it. The tag guard lives in `release.yml`, not here.

## Consequences

- One setup in every loop repo; aligning a library with the snippet later is a diff of two comment blocks.
- `paths-ignore` applies to `push` only: a pull request that changes only Markdown still runs `verify`.
- A library created from the template keeps this file as is; nothing to adapt.
