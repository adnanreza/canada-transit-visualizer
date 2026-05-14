---
name: feature-complete
description: Commit all working changes on the current branch, push to origin, and open a GitHub PR against main using the loaded spec for context. Adnan reviews and squash-merges manually on GitHub.
argument-hint: ["<type: PR title>"]
disable-model-invocation: true
---

# /feature-complete

Wraps up a feature: commits any uncommitted work, pushes the branch, and opens a PR. **Does not merge** — Adnan reviews and squash-merges on GitHub.

## Preconditions

1. **Must be on a feature branch**, not `main`. Verify with `git rev-parse --abbrev-ref HEAD`. If on `main`, refuse: `Cannot complete from main. Run /feature-load + /feature-start first.`
2. **`.claude/current-feature.md` should exist** for context. If missing, warn but proceed (the user may have run `git` commands manually).

## Steps

1. **Run the full validation suite** by invoking the same checks as `/feature-test`:
   ```bash
   npm run typecheck && npm run lint && npm run build && npm run test && npm run test:e2e
   ```
   **STOP** on any failure. Do not commit. Do not push. Surface the failure and tell the user to fix before re-running.

2. **Determine PR title.**
   - If `$ARGUMENTS` is provided, use it. Must match `^(feat|fix|chore|docs|refactor|perf|style|test|build|ci): .+$`, ≤72 chars.
   - If `$ARGUMENTS` is empty, derive from `.claude/current-feature.md`'s `type` and `title` fields: `<type>: <title>` (lowercase first word, truncate to 72 chars).

3. **Commit any uncommitted changes.**
   - `git status --porcelain` — if non-empty, stage + commit. Otherwise skip.
   - Subject: the PR title (or a `chore: tidy up before PR` if these are last-minute fixups).
   - Body: 1–3 bullets describing the final changes.
   - **NEVER** add `Co-Authored-By: Claude …` or bot footers.

4. **Push the branch.**
   ```bash
   git push -u origin HEAD
   ```

5. **Build the PR body.** Draw from the loaded spec + the diff vs main:
   ```markdown
   ## Summary
   - <bullet — what the PR does, in plain English>
   - <bullet — why, if not obvious from the spec>
   - <bullet — any noteworthy implementation choice>

   ## Spec
   <one-paragraph quote or summary of the spec from .claude/current-feature.md>

   ## Test plan
   - [ ] `npm run test:all` passes
   - [ ] (manual) <one or two feature-specific checks from the spec>
   ```
   **NEVER** add a "🤖 Generated with Claude Code" footer.

6. **Open the PR.**
   ```bash
   gh pr create --base main --title "<title>" --body "$(cat <<'EOF'
   <body>
   EOF
   )"
   ```

7. **Report the PR URL** in one line.

8. **Return to main.** Run `git switch main && git pull` so the working tree is clean and ready for the next `/feature-load`. The local feature branch stays in place until the next `/feature-load` reports it stale (after the PR is squash-merged on GitHub and `origin/<branch>` auto-deletes, the local copy will show `: gone]` and be safe to delete).

## What this skill does NOT do

- Does not merge the PR — Adnan reviews and squash-merges on GitHub manually.
- Does not delete the local branch — that happens after merge via `/feature-load` cleanup.
- Does not delete `.claude/current-feature.md` — left in place until the next `/feature-load`.
- Does not approve its own PR (impossible on GitHub for the PR author anyway).
