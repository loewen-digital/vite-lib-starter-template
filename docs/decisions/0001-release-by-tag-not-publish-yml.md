# 0001 · Release by tag through `release.yml`, no `publish.yml`

## Context

Issue #1 asks for `.github/workflows/publish.yml`: publish to npm on a GitHub Release with provenance, using an `NPM_TOKEN` secret requested from Eddy through a `needs-human` issue. Before the issue was built, `main` got `release.yml` (fb32b9b): a pushed tag `v<version>` runs tests and build, publishes through npm trusted publishing (OIDC, provenance automatic) and creates the GitHub Release from the matching `CHANGELOG.md` section.

## Decision

No `publish.yml`, no `NPM_TOKEN`, no `needs-human` issue for a secret. `release.yml` is the only release path and the README describes it. `ci.yml` is extended with `check` and `lint` instead of being replaced.

## Consequences

- No long-lived secret in any repository created from the template.
- One-time step per package: publish the first version by hand, then register the trusted publisher on npmjs.com.
- The workflow creates the GitHub Release, so a release starts with the tag, not with a Release drafted in the UI.
