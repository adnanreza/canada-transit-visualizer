---
name: feature-review
description: Verify the implementation on the current branch matches every requirement in the loaded spec. Compares diff vs spec, surfaces gaps and over-builds, and produces a suggested PR title + body for /feature-complete.
disable-model-invocation: true
---

# /feature-review

The job: prove (or disprove) that the working branch satisfies **the loaded spec** — no more, no less.

## Preconditions

1. **`.claude/current-feature.md` must exist.** If not, refuse: `No spec loaded. Run /feature-load first.`
2. **Must be on the feature branch**, not `main`. Verify with `git rev-parse --abbrev-ref HEAD`.

## Steps

1. **Re-read the spec** from `.claude/current-feature.md`. Extract the explicit requirements as a checklist.

2. **Read the diff.**
   - `git diff main...HEAD --stat` — files-changed summary
   - `git diff main...HEAD` — full diff
   - `git log main..HEAD --oneline` — working commits on the branch

3. **Build a spec-conformance table.** For each requirement in the spec:
   - **Met** — point to the specific file:line that implements it.
   - **Partial** — what's done, what's missing.
   - **Not met** — call it out plainly.
   - **Over-built** — flag anything in the diff that isn't justified by the spec (scope creep).

4. **Code-quality scan** (secondary — only after spec conformance):
   - Newly added `console.log`, `debugger`, hardcoded secrets / URLs
   - New deps in `package.json` — were they all justified by the spec?
   - Tests added for new components / routes / data paths? (Vitest in `src/**/__tests__/`, Playwright in `e2e/`.) The spec is the goal, but landing without tests is a regression we don't want.
   - Stack-policy violations (Next.js / framework suggestions / Mapbox swap)

5. **Produce a verdict + a PR draft.** Output template:

   ```
   Spec:    <type>/<slug> — <title>
   Diff:    <N files, +X -Y lines>

   Requirements:
     ✓ <requirement> — <file:line>
     ✓ <requirement> — <file:line>
     ⚠ <requirement> — <partial: what's missing>
     ✗ <requirement> — <not met>

   Over-build / scope creep:
     - <file:line> — <what was added that the spec didn't ask for>     (or "none")

   Quality findings:
     - <file:line> — <issue>     (or "none")

   PR draft:
     Title: <Conventional-Commit subject ≤72 chars>
     Body:
       ## Summary
       - <bullet>
       - <bullet>

       ## Test plan
       - [ ] `npm run test:all` passes
       - [ ] (manual) <feature-specific check from the spec>
   ```

6. **If there are ✗ or ⚠ requirements:** report them, do **not** advance to `/feature-complete`. Tell the user what's left to implement.

7. **If everything is ✓ and no over-build:** tell the user `Ready for /feature-complete.`
