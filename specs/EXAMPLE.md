---
type: feat
slug: example-spec
title: Example spec — anatomy of a feature description
---

# Example spec — anatomy of a feature description

> This file demonstrates the shape `/feature-load` expects. Copy it to a new
> `specs/<your-slug>.md`, fill in the sections, then run
> `/feature-load specs/<your-slug>.md`.

## Goal

One paragraph in plain English. What is being built and **why** does it
exist? The "why" matters — `/feature-review` uses it to detect scope creep.

## Requirements

Each bullet is a discrete, verifiable requirement that `/feature-review`
will check off:

- **R1.** A clear, testable statement of what must be true after the feature
  ships. Should be answerable yes/no by looking at the implementation or
  running a test.
- **R2.** Another such statement. Keep them small and orthogonal — don't
  smush three asks into one bullet.
- **R3.** Visual / UX requirements are fine; they get verified by
  Playwright snapshots or by the manual section of the PR test plan.

## Non-goals

Explicitly call out the obvious adjacent things you are **not** doing in
this feature, so they don't sneak in as scope creep:

- Some related feature that's tempting but out of scope.
- A refactor that would be nice but isn't the job.

## Data / dependencies

If the feature consumes external data or adds new deps, list them here
with sources and rough sizes. `/feature-review` will flag any deps in the
diff that aren't justified by this section.

## Open questions

Anything ambiguous? Drop it here. `/feature-load` will surface these as
blocking questions before `/feature-start` runs.

## Verification

How would a human verify this works end-to-end? This becomes the
"(manual)" line in the PR's test plan.
