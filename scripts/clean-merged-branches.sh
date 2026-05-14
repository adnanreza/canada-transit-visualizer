#!/usr/bin/env bash
# Delete local AND remote branches whose work has already landed on main:
#
#   LOCAL:  branches whose upstream is "gone" (their remote was deleted —
#           typically because the PR was squash-merged and GitHub's
#           auto-delete-on-merge fired). Squash creates a new commit on
#           main with a different SHA, so `git branch -d` doesn't recognize
#           the merge and refuses; the upstream-gone signal is the strongest
#           available proof that the work has landed and the local branch
#           is safe to drop.
#
#   REMOTE: remote branches on origin whose PR is MERGED. Covers the rare
#           case where GitHub's auto-delete-on-merge didn't fire (the
#           setting was off when the PR merged, or someone re-pushed the
#           branch after merge). PR=MERGED is GitHub's authoritative signal
#           that the work is on main and the branch is dead.
#
# Always preserves `main`. Refuses to delete the current local branch.

set -euo pipefail

have_gh() {
  command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1
}

# ---- LOCAL ----------------------------------------------------------------

git fetch --prune --quiet

local_stale=$(git branch -vv | awk '/: gone\]/ {print $1}')

if [ -n "$local_stale" ]; then
  current=$(git rev-parse --abbrev-ref HEAD)
  if echo "$local_stale" | grep -qx "$current"; then
    echo "Refusing to delete the current branch ($current)." >&2
    echo "Switch to main (or any non-stale branch) and re-run." >&2
    exit 1
  fi
  echo "Deleting stale local branches (remote already removed):"
  echo "$local_stale" | sed 's/^/  /'
  echo "$local_stale" | xargs git branch -D
else
  echo "No stale local branches."
fi

# ---- REMOTE ---------------------------------------------------------------

if ! have_gh; then
  echo "Skipping remote cleanup: gh CLI not available or not authenticated."
  exit 0
fi

remote_branches=$(git ls-remote --heads origin \
  | awk '{sub("refs/heads/","",$2); print $2}' \
  | sort -u)

merged_heads=$(gh pr list --state merged --limit 100 \
  --json headRefName --jq '.[].headRefName' \
  | sort -u)

remote_stale=$(comm -12 \
  <(printf '%s\n' "$remote_branches") \
  <(printf '%s\n' "$merged_heads") \
  | grep -vx 'main' || true)

if [ -z "$remote_stale" ]; then
  echo "No stale remote branches."
  exit 0
fi

echo "Deleting stale remote branches (PRs already merged on GitHub):"
echo "$remote_stale" | sed 's|^|  origin/|'
echo "$remote_stale" | xargs -n1 git push origin --delete
