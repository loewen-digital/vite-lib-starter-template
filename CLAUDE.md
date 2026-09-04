# CLAUDE.md — vite-lib-starter-template

Template repository for loewen-digital libraries. Everything here must be generic: no product code, no library-specific names beyond the placeholder `my-lib`.

## Stack (fixed)

- TypeScript strict, Vite library mode, ESM only. Never CommonJS, never a `require` export, never tsup.
- npm only. `package-lock.json` is committed. Never yarn or pnpm.
- Vitest for tests. Node 22 (`.nvmrc`).
- `exports` map with `types` and `import` per entry; `sideEffects: false`; `files` limited to `dist`.
- Zod for runtime schemas where a library needs them. No React, no framework code in the core; framework adapters live in `src/adapters/<framework>.ts` with their own subpath export.

## Definition of done

- `npm run check`, `npm test`, `npm run build` pass.
- Every public function has a test: happy path plus one failure case.
- README documents install, usage, and the exports map.
- Nothing in `dist/` is committed.

## Agent Loop (GitHub Actions)

Claude runs unattended via `.github/workflows/agent.yml`. Nobody answers questions.

**Issue** (label `ready`):

1. Read the issue: `gh issue view <n> --json title,body,labels,comments`. If acceptance criteria are missing: comment the concrete question, add label `needs-human`, remove `ready`, stop.
2. Branch `claude/issue-<n>-<slug>` from the default branch.
3. Implement following the rules above. Acceptance criteria are binding; a solution proposed in the issue is not. Build what fits this project and its conventions, even where that differs from the proposal, and explain every difference in the PR under "Deviations from the issue". If the need does not belong in this project: comment why, label `needs-human`, remove `ready`, stop. If something is missing in one of our own libraries (fullstack, flatdb, sveltekit-ai-orchestrator, element-js, element-js-ssr-renderer, element-library): open an issue there (`gh issue create --repo <owner/lib>`) that states the need and the context here, with at most a non-binding proposal; add the smallest workaround marked `// UPSTREAM: <issue-url>`, keep going. Never wait for upstream.
4. `npm run check && npm test && npm run build` must pass. After three failed attempts: open a draft PR, label `needs-human`, stop.
5. Review your own diff: security, dead code, error handling, accessibility.
6. Open the PR (`gh pr create`): summary, `Closes #<n>`, test plan, a "Deviations from the issue" section (or "none"), and say explicitly whether auth, payments, schema, or secrets are touched. Do not post `@codex review`: Codex ignores comments from bots. Eddy requests the review.

**Review** (a review on a `claude/*` PR):

1. Read reviews and inline comments since the last commit (`gh pr view <n> --json reviews,comments`, `gh api repos/{owner}/{repo}/pulls/<n>/comments`). Nothing to do: stop, no comment.
2. Fix every point or explain in the thread why not. Never dismiss a security finding.
3. Validation green, push, then one PR comment: `Review findings addressed in <short sha>.` The workflow requests the re-review. After three fix rounds on one PR: `needs-human`, stop.

**Always:**

- Size and safety: before implementing, judge the scope. If it needs more than one PR (several independent parts, more than ~15 files), create sub-issues with `gh issue create` (the first labelled `ready`, the rest unlabelled), comment the list on the parent, and work only the first. Commit and push the branch after the first meaningful step and keep pushing, so nothing is lost when the run hits its turn limit.
- Never ask. Blocked means: comment the question with options, `needs-human`, stop.
- One issue, one branch, one PR. Conventional commits (`feat:`, `fix:`, `chore:`, ...). Never force-push. Never commit secrets.
- Eddy merges, not the agent.
- Never create or modify files under `.github/workflows/`: the App token lacks the `workflows` scope and the push is rejected. Describe the needed workflow change in a `needs-human` issue instead and continue.
