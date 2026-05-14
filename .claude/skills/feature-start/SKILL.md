---
name: feature-start
description: Create a feature branch from the loaded spec and implement the feature against it. Reads .claude/current-feature.md, creates <type>/<slug> off a freshly-pulled main, then drives the implementation iteratively with TaskCreate for progress tracking.
disable-model-invocation: true
---

# /feature-start

Implements the **currently loaded spec** (from `/feature-load`).

## Preconditions

1. **`.claude/current-feature.md` must exist.** If not, refuse with: `No spec loaded. Run /feature-load <spec> first.` and stop.

2. **Working tree must be clean.** Run `git status --porcelain`. If non-empty, ask the user how to proceed (stash / commit elsewhere / abort) and wait.

## Steps

1. **Read the spec.** Parse the frontmatter from `.claude/current-feature.md` to get `type`, `slug`, `title`, and `branch`.

2. **Sync main and create the branch.**
   ```bash
   git switch main && git pull && git switch -c <branch>
   ```
   (`pull.rebase=true` is global → always a fast-forward.)

3. **Plan with `TaskCreate`.** Break the spec's explicit requirements into discrete tasks. Each task should map to a verifiable unit (a component, a route, a data fetcher, a test). Keep tasks small enough that each one ships in ≤5 file edits.

4. **Implement, task by task.**
   - Mark each task `in_progress` when starting, `completed` when done.
   - Commit frequently — at least once per completed task — with Conventional Commit subjects (e.g. `feat: add hex grid layer`). Commit subjects are working notes; the squash commit on merge will use the PR title.
   - **NEVER** add a `Co-Authored-By: Claude …` trailer to commit messages.
   - When introducing a new component, route, or data shape, also add a Vitest test (in `src/**/__tests__/`) and, where it makes sense visually, a Playwright e2e test (in `e2e/`).

5. **Test continuously.** After each non-trivial change, run the relevant test (`npm run test -- <pattern>` for one suite, or full `npm run test` if you changed many files). Don't wait for `/feature-test` to discover failures.

6. **When all spec requirements are met:**
   - Mark all tasks `completed`.
   - Tell the user: `Implementation complete for <branch>. Run /feature-test to validate, then /feature-review.`
   - **Do not** open a PR or push. That's `/feature-complete`.

## Boundaries

- Stay within the spec. If a requirement is ambiguous, **stop** and `AskUserQuestion`. Do not invent scope.
- Do not refactor unrelated code (separate PR, separate `chore/...` branch later).
- Do not add features the spec doesn't ask for, even if they seem like obvious next steps.
- Respect the project's stack preferences (see memory) — no Next.js suggestions, no Mapbox swap, no framework migrations.
