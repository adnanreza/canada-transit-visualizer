---
name: feature-test
description: Run the full validation suite — typecheck, lint, build, Vitest unit/integration tests, and Playwright visual e2e tests — to verify the working tree is PR-ready.
disable-model-invocation: true
---

# /feature-test

Runs every check a PR needs to pass. Fail fast — stop at the first failure and surface the diagnostic.

## Steps

Execute these **in order** (each depends on the previous succeeding):

1. **`npm run typecheck`** — TypeScript must be clean.
2. **`npm run lint`** — ESLint must be clean.
3. **`npm run build`** — `vite-react-ssg build` must succeed.
4. **`npm run test`** — Vitest unit + integration tests must all pass.
5. **`npm run test:e2e`** — Playwright e2e tests against the production build must all pass.

Steps 1–4 can be batched into a single Bash call chained with `&&`. Step 5 runs separately because it boots a preview server.

## Output

If **all pass:**
```
✓ typecheck         (Xs)
✓ lint              (Xs)
✓ build             (Xs)
✓ vitest      N/N   (Xs)
✓ playwright  N/N   (Xs)
All checks passed.
```

If **anything fails:**
- Surface the first failing block of output (≤40 lines).
- Skip remaining checks.
- **Stop.** Do not advance to `/feature-review` or `/feature-complete`. Do not attempt fixes unless the user asks.

## Notes

- Playwright tests run against `npm run preview` (production build), not the dev server, so they validate what'll actually ship.
- If a Playwright test produces visual artifacts (screenshots, traces), they land in `test-results/` and `playwright-report/` — both gitignored.
- A single failing test does not mean rewrite the test — first determine whether the test is wrong or the implementation is wrong.
