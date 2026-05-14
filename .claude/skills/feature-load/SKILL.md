---
name: feature-load
description: Load a feature spec (file path or inline) into the active workspace so the rest of the /feature-* chain can implement and verify against it. Reads or captures the spec, parses metadata, summarizes scope, asks any clarifying questions, and persists the spec to .claude/current-feature.md.
argument-hint: <spec-file-path | inline spec text>
disable-model-invocation: true
---

# /feature-load

Loads a **spec** — the source of truth for what is being built — into the active workspace. After this, the spec is the contract for `/feature-start`, `/feature-test`, and `/feature-review`.

## Inputs

User invoked `/feature-load $ARGUMENTS`. `$ARGUMENTS` is one of:

1. **A path to a spec file** — typically `specs/<slug>.md`. Detect this when `$ARGUMENTS` matches a file that exists on disk.
2. **Inline spec text** — anything else. Treat the whole argument as the spec body.

## Steps

1. **Resolve the spec content.**
   - If `$ARGUMENTS` is an existing file path → `Read` it, capture the raw markdown.
   - Otherwise → treat `$ARGUMENTS` as the inline spec body.

2. **Parse / infer metadata.** Specs MAY have YAML frontmatter:
   ```yaml
   ---
   type: feat            # one of: feat|fix|chore|docs|refactor|perf|style|test|build|ci
   slug: toronto-isochrones
   title: "Toronto transit isochrones"
   ---
   ```
   If frontmatter is missing or incomplete, **derive** from the spec body and **confirm with the user via `AskUserQuestion`** before proceeding:
   - `type` — `feat` is the safe default for new functionality; pick the right one based on the spec.
   - `slug` — short kebab-case slug from the spec title (≤32 chars).
   - `title` — the first H1 or the first sentence of the spec.

3. **Summarize what's being built.** Output to the user (≤10 lines):
   - One-line restatement of the goal.
   - Bulleted list of explicit requirements pulled from the spec (the things `/feature-review` will check against).
   - Bulleted list of any *open questions / ambiguities* you noticed. These block progress — surface them now, not at review time.

4. **If there are open questions:** use `AskUserQuestion` to resolve them before continuing. Update the spec body inline with the resolved answers so the loaded spec is now unambiguous.

5. **Persist the spec.** Write to `.claude/current-feature.md` (gitignored) with this exact shape:

   ```markdown
   ---
   loaded-at: <ISO8601 timestamp>
   source: <"inline" or original-file-path>
   type: <type>
   slug: <slug>
   title: <title>
   branch: <type>/<slug>
   ---

   # <title>

   <full spec body — including any clarifications added in step 4>
   ```

6. **Confirm in one line:** `Loaded spec: <type>/<slug>. Run /feature-start when ready to implement.`

## What this skill does NOT do

- Does **not** create a git branch (that's `/feature-start`).
- Does **not** write any code (that's `/feature-start`).
- Does **not** modify files in `specs/` (the spec is a frozen contract — clarifications live in `.claude/current-feature.md`).
