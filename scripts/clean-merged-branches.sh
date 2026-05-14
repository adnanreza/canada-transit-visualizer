#!/usr/bin/env bash
# Delete local branches whose upstream is gone — typically branches from PRs
# that were squash-merged on GitHub. Squash-merging creates a new commit on
# main with a different SHA, so `git branch -d` doesn't recognize the branch
# as merged and refuses. This script force-deletes only branches whose remote
# counterpart has been deleted (the strongest available signal that the work
# has landed and the branch is safe to drop).

set -euo pipefail

git fetch --prune --quiet

stale=$(git branch -vv | awk '/: gone\]/ {print $1}')

if [ -z "$stale" ]; then
  echo "No stale branches to clean."
  exit 0
fi

current=$(git rev-parse --abbrev-ref HEAD)
if echo "$stale" | grep -qx "$current"; then
  echo "Refusing to delete the current branch ($current)." >&2
  echo "Switch to main (or any non-stale branch) and re-run." >&2
  exit 1
fi

echo "Deleting stale local branches (remote already removed):"
echo "$stale" | sed 's/^/  /'
echo "$stale" | xargs git branch -D
